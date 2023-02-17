<template>
  <div id="mapCard" v-loading="loading">
    <!-- 地图 -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1768.223388671875 -1660.6993408203125 912 424.92242431640625"
      id="svgMap"
      :height="mapHeight < 750 ? '750px' : mapHeight"
      width="100%"
    ></svg>

    <!-- 全部楼层地图 -->
    <div class="all_floor" v-show="active">
      <img src="../assets/img/1F.png" alt="" @click="chooseHa1f" />
      <img src="../assets/img/1F.png" alt="" @click="chooseHa1f" />
      <img src="../assets/img/HA2F.png" alt="" @click="chooseHa2f" />
      <img src="../assets/img/HB2F.png" alt="" @click="chooseHb2f" />
      <img src="../assets/img/HA3F.png" alt="" @click="chooseHa3f" />
      <img src="../assets/img/HB3F.png" alt="" @click="chooseHb3f" />
    </div>

    <!-- 切换楼层按钮 -->
    <div class="floor-btn">
      <el-button type="primary" :plain="all" @click="changeAll">全部</el-button>
      <el-button type="primary" :plain="ha1f1" @click="chooseHa1f"
        >HA-1F</el-button
      >
      <!-- <el-button type="primary" :plain="ha1f2" @click="chooseHa1f1"
        >HA-1FLCM1内物流</el-button
      > -->
      <el-button type="primary" :plain="ha2f" @click="chooseHa2f"
        >HA-2F</el-button
      >
      <el-button type="primary" :plain="ha3f" @click="chooseHa3f"
        >HA-3F</el-button
      >
      <el-button type="primary" :plain="hb2f" @click="chooseHb2f"
        >HB-2F</el-button
      >
      <el-button type="primary" :plain="hb3f" @click="chooseHb3f"
        >HB-3F</el-button
      >
    </div>
    <!-- 切换楼层按钮 -->


    <!-- 全屏地图按钮 -->
    <div class="full-btn" @click="changefull">
      <i class="el-icon-full-screen" id="#fullmap" style="color: #fff"></i>
    </div>

    <!-- 搜索框 -->
    <div id="searchMapArea" style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="searchContent"
        id="searchInput"
      >
        <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="locateSearchObject"
          type="primary"
        ></el-button>
      </el-input>
    </div>

    <!-- agv左侧信息面板 -->
    <div class="agvInfo" v-show="isShow">
      <div class="info-title">
        <div class="agv_title">{{ agvClicked }}</div>
        <div @click="closeInfo"><i class="el-icon-circle-close"></i></div>
      </div>
      <div class="agv_list">
        <div>任务单号: {{ agvClickedInfo.taskId }}</div>
        <div>当前位置: {{ agvClickedInfo.agvArea }}</div>
        <div>任务状态: {{ agvClickedInfo.taskStatus }}</div>
        <div>From-To: {{ agvClickedInfo.fromto }}</div>
        <div>当前电量: {{ agvClickedInfo.batteryLevel }}</div>
        <div>当前卡号: {{ agvClickedInfo.now }}</div>
        <div>速度: {{ agvClickedInfo.speed }}</div>
        <div>载货状态: {{ agvClickedInfo.cargo }}</div>
        <div>异常状态: {{ agvClickedInfo.abnormal }}</div>
      </div>
    </div>
    <!-- agv左侧信息面板 -->

    <!-- 地图放大缩小按钮 -->
    <div id="btn-area">
      <el-button
        size="mini"
        @click="svgPanZoomTop"
        icon="el-icon-top"
        type="primary"
      ></el-button>
      <el-button
        size="mini"
        @click="svgPanZoomBottom"
        icon="el-icon-bottom"
        type="primary"
      ></el-button>
      <el-button
        size="mini"
        @click="svgPanZoomLeft"
        icon="el-icon-back"
        type="primary"
      ></el-button>
      <el-button
        size="mini"
        @click="svgPanZoomRight"
        icon="el-icon-right"
        type="primary"
      ></el-button>
      <el-button
        id="scale-up"
        size="mini"
        @click="svgPanZoomScaleUp"
        icon="el-icon-zoom-in"
        type="primary"
      ></el-button>
      <el-button
        id="scale-down"
        @click="svgPanZoomScaleDown"
        size="mini"
        icon="el-icon-zoom-out"
        type="primary"
      ></el-button>
      <el-button
        id="reset-btn"
        @click="svgPanZoomReset"
        size="mini"
        icon="el-icon-location-outline"
        type="primary"
      ></el-button>
    </div>
    <!-- 地图放大缩小按钮 -->
  </div>
</template>

<script>
import "../assets/js/map";
import * as d3 from "../assets/js/d3.min";
import "../assets/js/jquery.svg.pan.zoom";

export default {
  props: ["agv"],
  data() {
    return {
      viewBoxInitWidth: 0,
      viewBoxInitHeight: 0,
      isShow: false,
      active: true,
      all: false,
      ha1f1: true,
      ha1f2: true,
      ha2f: true,
      hb2f: true,
      ha3f: true,
      hb3f: true,
      minX: null,
      minY: null,
      maxX: null,
      maxY: null,
      scale: null,
      mapObj: null,
      svgPanZoom: null,
      searchPointRes: {
        pointName: "",
        pointList: [],
        selectNum: 0,
        lastPoint: null
      },
      searchAgvRes: {
        agvName: "",
        agvList: [],
        selectNum: 0,
        lastAgv: null
      },
      svgNS: "http://www.w3.org/2000/svg",
      oParent: null,
      oSvg: null,
      agvInfoClick: null,
      mapData: [],
      agvListDate: [],
      // map height
      mapHeight: window.innerHeight * 0.83,
      // map width
      mapWidth: window.innerWidth,
      loading: false,
      searchOptions: [
        {
          value: "point",
          label: "点位"
        },
        {
          value: "agv",
          label: "车号"
        }
      ],
      searchSelect: "point",
      searchContent: "",
      agvClicked: "",
      agvClickedInfo: {},
      agvInfoCardData: [
        {
          agvValue: "",
          agvKey: ""
        }
      ],
      agvForkList: [],
      agvGreenPath: {},
      // 计时器
      timer: [],
      // 上次浏览时间
      lastBrowseDate: 0,
      // 清除timer延时器
      lastBrowseTimeouter: [],
      hiddenTimer: [],
      browseInterval: 1000 * 60 * 5,
      // 任务模板搜索参数
      taskModelQueryInfo: {
        query: {}
      },
      // 任务模板名搜索框
      modelNameSearch: "",
      // 可释放agv
      agvOptions: [],
      receiveTrafficData: {},
      Ha1fBtn1: {
        floor: "HA1F",
        area: "HA1F",
        MapHref: require("../assets/img/1F.svg"),
        temp1: {
          currentPoint: "Point-0002",
          map_x: 556202,
          map_y: 226343,
          targetPoint: []
        },
        temp: {
          currentPoint: "Point-0001",
          map_x: 101202,
          map_y: 356343,
          targetPoint: []
        }
      },
      Ha2fBtn: {
        floor: "HA2F",
        area: "HA2F",
        MapHref: require("../assets/img/HA2F.svg"),
        temp1: {
          currentPoint: "Point-0002",
          map_x: 556202,
          map_y: 226343,
          targetPoint: []
        },
        temp: {
          currentPoint: "Point-0001",
          map_x: 101202,
          map_y: 356343,
          targetPoint: []
        }
      },
      Ha3fBtn: {
        floor: "HA3F",
        area: "HA3F",
        MapHref: require("../assets/img/HA3F.svg"),
        temp1: {
          currentPoint: "Point-0002",
          map_x: 556202,
          map_y: 226343,
          targetPoint: []
        },
        temp: {
          currentPoint: "Point-0001",
          map_x: 101202,
          map_y: 356343,
          targetPoint: []
        }
      },
      Hb2fBtn: {
        floor: "HB2F",
        area: "HB2F",
        MapHref: require("../assets/img/HB2F.svg"),
        temp1: {
          currentPoint: "Point-0002",
          map_x: 523947,
          map_y: 76717,
          targetPoint: []
        },
        temp: {
          currentPoint: "Point-0001",
          map_x: 68947,
          map_y: 233559,
          targetPoint: []
        }
      },
      Hb3fBtn: {
        floor: "HB3F",
        area: "HB3F",
        MapHref: require("../assets/img/HB3F.svg"),
        temp1: {
          currentPoint: "Point-0002",
          map_x: 526231,
          map_y: 80665,
          targetPoint: []
        },

        temp: {
          currentPoint: "Point-0001",
          map_x: 71231,
          map_y: 210665,
          targetPoint: []
        }
      },
      floor: "",
      mileage: 0,
      todaymileage: 0,
      fullscreen: false,
      d: 0,
      c: 0,
      agvForm: []
    };
  },
  created() {},
  mounted() {
    // this.mapInit(this.Ha1fBtn1);
    this.checkDocVis();
  },
  beforeDestroy() {
    this.cleanTimer();
    this.cleanHiddenTimer();
  },
  methods: {
    changefull() {
      this.$emit("full", "1");
    },
    // 检测 document visible
    checkDocVis() {
      document.onvisibilitychange = () => {
        // let browseInterval = 1000 * 60 * 30
        // let browseInterval = 1000 * 60 * 5
        let browseInterval = this.browseInterval;

        if (document.visibilityState == "visible") {
          if (this.lastBrowseTimeouter.length > 0) {
            for (let i = 0; i < this.lastBrowseTimeouter.length; i++) {
              clearInterval(this.lastBrowseTimeouter.pop());
            }
            this.cleanHiddenTimer();
          }

          if (window.sessionStorage.mapDataSwitch == "off") {
            window.sessionStorage.mapDataSwitch = "on";
            window.location.reload();
          }
        } else {
          if (window.sessionStorage.mapDataSwitch == "off") {
            this.cleanTimer();
          }
          this.lastBrowseTimeouter.push(
            setTimeout(() => {
              this.cleanTimer();
              window.sessionStorage.mapDataSwitch = "off";
            }, browseInterval)
          );
          this.lastBrowseTimeouter.push(
            setTimeout(() => {
              window.location.reload();
            }, browseInterval * 2)
          );
        }
      };
    },
    async changeAll() {
      await this.cleanTimer();
      this.loading = true;
      this.all = false;
      this.ha1f1 = true;
      this.ha2f = true;
      this.ha3f = true;
      this.hb2f = true;
      this.hb3f = true;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      this.active = true;
      this.$emit('mileage');
      setTimeout(() => {
        this.loading = false;
      }, 500);
      await this.cleanTimer();
      this.timer.push(
      setInterval(() => {
        this.$emit('mileage');
      }, 10000)
    );
      this.$emit("floor", "", this.mileage, this.todaymileage, 50);
    },
    async chooseHa2f() {
      await this.cleanTimer();
      this.active = false;
      this.loading = true;
      this.all = true;
      this.ha1f1 = true;
      this.ha2f = false;
      this.ha3f = true;
      this.hb2f = true;
      this.hb3f = true;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      await this.cleanTimer();
      await this.mapInit(this.Ha2fBtn);
      this.$emit("floor", "HA2F", this.mileage, this.todaymileage, 6);
    },
    async chooseHa1f() {
      await this.cleanTimer();
      this.active = false;
      this.loading = true;
      this.all = true;
      this.ha1f1 = false;
      this.ha2f = true;
      this.ha3f = true;
      this.hb2f = true;
      this.hb3f = true;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      await this.mapInit(this.Ha1fBtn1);
      this.$emit("floor", "HA1F", this.mileage, this.todaymileage, 11);
    },
    // async chooseHa1f1() {
    //   await this.cleanTimer();
    //   this.active = false;
    //   this.loading = true;
    //   this.all = true;
    //   this.ha1f1 = true;
    //   this.ha1f2 = false;
    //   this.ha2f = true;
    //   this.ha3f = true;
    //   this.hb2f = true;
    //   this.hb3f = true;
    //   this.mapObj = null;
    //   this.scale = null;
    //   this.isShow = false;
    //   this.agvGreenPath = {};
    //   const map = document.getElementById("svgMap");
    //   map.innerHTML = "";
    //   this.mapData = [];
    //   await this.cleanTimer();
    //   await this.mapInit(this.Ha1fBtn2);
    //   this.$emit("floor", "HA1F2", this.mileage, this.todaymileage, 4);
    // },
    async chooseHa3f() {
      await this.cleanTimer();
      this.active = false;
      this.loading = true;
      this.all = true;
      this.ha1f1 = true;
      this.ha2f = true;
      this.ha3f = false;
      this.hb2f = true;
      this.hb3f = true;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      await this.cleanTimer();
      await this.mapInit(this.Ha3fBtn);
      this.$emit("floor", "HA3F", this.mileage, this.todaymileage, 6);
    },
    async chooseHb2f() {
      await this.cleanTimer();
      this.active = false;
      this.loading = true;
      this.all = true;
      this.ha1f1 = true;
      this.ha2f = true;
      this.ha3f = true;
      this.hb2f = false;
      this.hb3f = true;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      await this.cleanTimer();
      await this.mapInit(this.Hb2fBtn);
      this.$emit("floor", "HB2F", this.mileage, this.todaymileage, 16);
    },
    async chooseHb3f() {
      await this.cleanTimer();
      this.active = false;
      this.loading = true;
      this.all = true;
      this.ha1f1 = true;
      this.ha2f = true;
      this.ha3f = true;
      this.hb2f = true;
      this.hb3f = false;
      this.mapObj = null;
      this.scale = null;
      this.isShow = false;
      this.agvGreenPath = {};
      const map = document.getElementById("svgMap");
      map.innerHTML = "";
      this.mapData = [];
      await this.cleanTimer();
      await this.mapInit(this.Hb3fBtn);
      this.$emit("floor", "HB3F", this.mileage, this.todaymileage, 11);
    },
    // 地图初始化
    mapInit(e) {
      this.oParent = document.getElementById("mapDiv");
      this.oSvg = document.getElementById("svgMap");
      this.getMapInfo(e.floor, e.temp, e.temp1, e.MapHref, e.area);
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.reConnectMapInfo(e.floor, e.temp, e.temp1, e.MapHref, e.area);
      setTimeout(() => {
        if (window.sessionStorage.mapDataSwitch == "off") {
          this.cleanTimer();
          this.hiddenTimer.push(
            setInterval(() => {
              if (document.visibilityState == "hidden") {
                window.location.reload();
              }
            }, this.browseInterval * 2.1)
          );
        }
      }, 5000);
    },
    // 断线重连
    reConnectMapInfo(floor, temp, temp1, MapHref, area) {
      this.timer.push(
        setInterval(() => {
          if (this.mapData.length == 0) {
            this.getMapInfo(floor, temp, temp1, MapHref, area);
          }
        }, 10000)
      );
    },
    // agv实时移动
    agvMoveRT(area) {
      this.getAgvState(area);
      this.timer.push(
        setInterval(() => {
          this.getAgvState(area);
        }, 3000)
      );
    },
    // 获取地图信息
    async getMapInfo(floor, temp, temp1, MapHref, area) {
      const { data: res } = await this.$http.post("/aaa/getMapInfo", {
        floor: floor
      });
      if(floor === 'HB3F') {
        const { data: res1 } = await this.$http.post("/api/getMapInfo", {
          floor: ''
        });
        res1.forEach(v => {
          res.push(v)
        })
      }
      this.mapData = res;
      // this.mapData = mapdata;
      this.mapData.push(temp);
      this.mapData.push(temp1);
      await this.handleYAxis();
      await this.createMap(this.mapData, this.oSvg, MapHref, area);
      this.svgPanZoom = await $("#svgMap").svgPanZoom();
      this.agvMoveRT(area);
    },
    // 获取agvList信息
    async getAgvState(area) {
      const { data: res } = await this.$http.post("/aaa/getSystemInfo", {
        query: {},
        pagenum: "",
        pagesize: "",
        floor: area
      });
      if(area === 'HB3F') {
        const { data: res1 } = await this.$http.post("/api/getSystemInfo", {
        query: {},
        pagenum: "",
        pagesize: "",
        floor: ''
      });
        res1.forEach(v => {
          res.push(v)
        })
      }
      // const { data: res } = await this.$http.post("/getSystemInfo")
      // this.agvListDate = res.data;
      this.agvListDate = res;
      res.forEach(v => {
        this.c += parseInt(v.agvList.mileage);
        this.d += parseFloat(v.agvList.mileage - v.agvList.todaymileage);
      });
      this.mileage = this.c;
      this.todaymileage = this.d;
      this.c = 0;
      this.d = 0;
      this.agvListDate.forEach((agv,index) => {
        if (
          agv.agvList.abnormal === "充电中停止" ||
          agv.agvList.abnormal === "管制点停止" ||
          agv.agvList.abnormal === "障碍物阻挡停止" ||
          agv.agvList.abnormal !== ""
        ) {
          this.agvForm.push(agv)
          this.agvListDate.splice(index,1)
        }
      });
      this.agvForm.forEach(v=> {
        this.agvListDate.push(v)
      })
      this.$emit("mile", this.mileage, this.todaymileage);
      this.agvMove(this.mapData, this.agvListDate, this.oSvg, area);
    },
    // 清除timer
    cleanTimer() {
      for (let i = 0; i < this.timer.length; i++) {
        clearInterval(this.timer.pop());
      }
    },
    // 清除hiddenTimer
    cleanHiddenTimer() {
      for (let i = 0; i < this.hiddenTimer.length; i++) {
        clearInterval(this.hiddenTimer.pop());
      }
    },
    // svg ↑
    svgPanZoomScaleUp() {
      let vBWidth = Number(
        document
          .getElementById("svgMap")
          .getAttribute("viewBox")
          .split(" ")[2]
      );

      if (vBWidth >= this.viewBoxInitWidth / 4) {
        this.svgPanZoom.zoomIn();
      }
    },
    // svg ↓
    svgPanZoomScaleDown() {
      let vBWidth = Number(
        document
          .getElementById("svgMap")
          .getAttribute("viewBox")
          .split(" ")[2]
      );

      if (vBWidth < this.viewBoxInitWidth) {
        this.svgPanZoom.zoomOut();
      }
    },
    // svg ♨
    svgPanZoomReset() {
      this.svgPanZoom.reset();
    },
    svgPanZoomTop() {
      this.svgPanZoom.panDown();
    },
    svgPanZoomBottom() {
      this.svgPanZoom.panUp();
    },
    svgPanZoomLeft() {
      this.svgPanZoom.panRight();
    },
    svgPanZoomRight() {
      this.svgPanZoom.panLeft();
    },

    createSvgTag(tag, objAttr) {
      var oTag = document.createElementNS(this.svgNS, tag);
      for (var attr in objAttr) {
        oTag.setAttribute(attr, objAttr[attr]);
      }
      return oTag;
    },
    handleYAxis() {
      let newMapData = this.mapData.map(point => {
        point.map_y = -point.map_y;
        return point;
      });
      this.mapData = newMapData;
    },

    // 检测搜索栏
    searchInputChange() {
      if (this.modelNameSearch !== "") {
        this.taskModelQueryInfo.query.taskModelName = this.modelNameSearch;
      } else {
        this.taskModelQueryInfo.query = {};
      }
      this.getTaskModel();
    },

    structmapData(mapData) {
      const ret = {};
      this.mapData.forEach(point => {
        const pointName = point.currentPoint;
        ret[pointName] = point;
      });
      return ret;
    },

    structAgvListDate(agvListDate) {
      const ret = {};
      agvListDate.forEach(agv => {
        const agvName = agv.agvList.agvId;
        ret[agvName] = agv.agvList;
      });
      return ret;
    },

    getScale(mapData) {
      const map = document.getElementById("svgMap");
      const winX = map.clientWidth;
      const winY = map.clientHeight;
      let maxX = null;
      let maxY = null;
      let minX = null;
      let minY = null;

      mapData.forEach(point => {
        if (point.map_x > maxX || maxX == null) {
          maxX = point.map_x;
        }
        if (point.map_y > maxY || maxY == null) {
          maxY = -Math.abs(point.map_y);
        }
        if (point.map_x < minX || minX == null) {
          minX = point.map_x;
        }
        if (point.map_y < minY || minY == null) {
          minY = -Math.abs(point.map_y);
        }
      });

      if (minX == maxX && minX != null) {
        maxX += 10;
      }

      if (minY == maxY && minY != null) {
        maxY += 10;
      }

      const scale1 = winX / Math.abs(maxX - minX);
      const scale2 = winY / Math.abs(maxY - minY);
      const scaleRes = scale1 > scale2 ? scale2 : scale1;
      return {
        scale: scaleRes,
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },

    switchAngle(radian) {
      return (radian * 180) / Math.PI;
    },

    switchRadian(angle) {
      return (angle * Math.PI) / 180;
    },

    objectFocus(point, oSvg, pointSize, pointFontSize, scale) {
      const pointStrokeColor = "#98999c";
      // let pointInfoFontColor = '#804000'
      const pointInfoFontColor = "#804000";
      const pointFontBgColor = "#d5d5d5";
      const pointFontBgStrokeColor = "#383838";

      // let pointFontSize = pointFontSize
      const pointSelect = document.getElementById(point.currentPoint);
      if (pointSelect != null) {
        pointSelect.setAttribute("stroke", pointStrokeColor);
        pointSelect.setAttribute("stroke-width", pointFontSize / 10);
        pointSelect.setAttribute("stroke-opti", 0.8);
      }

      const fontTagIsExist = document.getElementById(
        point.currentPoint + "Info"
      );
      if (fontTagIsExist == null) {
        // let pointNumIndex = point.currentPoint.indexOf('-')
        // let realPointNum = Number(point.currentPoint.substring(pointNumIndex +1)) + 1000000000
        const pointFontInitX = point.map_x * scale;
        const pointFontInitY = point.map_y * scale - pointSize - pointFontSize;
        const pointFontTag = this.createSvgTag("text", {
          id: point.currentPoint + "Font",
          class: "pointFontTag",
          x: pointFontInitX,
          y: pointFontInitY,
          "font-size": pointFontSize,
          fill: pointInfoFontColor,
          "text-anchor": "middle"
          // 'style': 'cursor: pointer;',
        });

        pointFontTag.innerHTML = point.currentPoint;

        const pointFontBgHeight = pointFontSize * 1.8;
        const pointFontBgWidth =
          String(point.currentPoint).length * pointFontSize * 0.8;
        const pointFontBgInitX = point.map_x * scale - pointFontBgWidth / 2;
        const pointFontBgInitY =
          point.map_y * scale -
          pointFontBgHeight / 2 -
          pointSize -
          pointFontSize * 1.3;
        const pointFontBgTag = this.createSvgTag("rect", {
          id: point.currentPoint + "FontBg",
          class: "pointFontBgTag",
          x: pointFontBgInitX,
          y: pointFontBgInitY,
          width: pointFontBgWidth,
          height: pointFontBgHeight,
          rx: (pointFontSize * 2) / 5,
          ry: (pointFontSize * 2) / 5,
          fill: pointFontBgColor,
          stroke: pointFontBgStrokeColor,
          opacity: 0.8,
          "stroke-width": pointFontSize / 10
        });

        const pointInfoTag = this.createSvgTag("g", {
          id: point.currentPoint + "Info",
          style: "cursor: pointer;"
        });

        pointInfoTag.appendChild(pointFontBgTag);
        pointInfoTag.appendChild(pointFontTag);
        //
        //

        oSvg.appendChild(pointInfoTag);
      }
    },

    objectBlur(point, oSvg) {
      const pointSelect = document.getElementById(point.currentPoint);
      // console.log(point);
      if (pointSelect != null) {
        pointSelect.removeAttribute("stroke");
        pointSelect.removeAttribute("stroke-width");
        pointSelect.removeAttribute("stroke-opti");
      }
      // console.log(pointSelect);
      const fontTag = document.getElementById(point.currentPoint + "Info");
      if (fontTag != null) {
        oSvg.removeChild(fontTag);
      }
    },

    agvInfoCardUpdate(agv) {
      this.agvClicked = agv.agvList.agvId;
      this.agvClickedInfo = agv.agvList;
    },
    // 装箱情况list回调
    forkLayerExistBoxOrNot(rowObj) {
      if (rowObj.row.existBox == 1) {
        return { background: "rgb(160, 207, 255)" };
      } else {
        return { background: "rgb(217, 236, 255)" };
      }
    },
    closeInfo() {
      this.isShow = false;
    },
    agvClick(agv) {
      this.agvInfoCardUpdate(agv);
      this.isShow = true;
    },

    agvFocus(agv, oSvg) {
      const agvSelect = document.getElementById(agv.agvId);
      const agvInfoSelect = document.getElementById(agv.agvId + "Info");
      if (agvSelect != null && agvInfoSelect != null) {
        oSvg.removeChild(agvSelect);
        oSvg.removeChild(agvInfoSelect);
      }
      oSvg.appendChild(agvSelect);
      oSvg.appendChild(agvInfoSelect);
    },

    setScaleAndViewBox(mapData, oSvg) {
      const getScaleRes = this.getScale(mapData);
      this.scale = getScaleRes.scale;
      this.minX = getScaleRes.minX;
      this.minY = getScaleRes.minY;
      this.maxX = getScaleRes.maxX;
      this.maxY = getScaleRes.maxY;
      // 正中间
      // const oSvgWidth = Math.abs(this.maxX - this.minX) * this.scale * 1.1
      // const oSvgHeight = Math.abs(this.maxY - this.minY) * this.scale * 1.1
      // const oSvgX = (this.minX) * this.scale - (oSvgWidth * 0.05)
      // const oSvgY = (this.minY) * this.scale - (oSvgHeight * 0.05)

      // 偏左&放大
      const svgClientWidth = oSvg.clientWidth;
      const svgClientHeight = oSvg.clientHeight;
      const oSvgWidth = Math.abs(this.maxX - this.minX) * this.scale;
      const oSvgHeight = Math.abs(this.maxY - this.minY) * this.scale;
      const oSvgX =
        this.minX * this.scale + oSvgWidth * 0.00001 + svgClientWidth * 0.001;
      const oSvgY =
        this.minY * this.scale + oSvgHeight * 0.1 + svgClientHeight * 0.05;
      // const oSvgX = svgClientWidth * 0.21
      // const oSvgY = svgClientHeight * 0.13

      const viewBoxAttr =
        oSvgX + " " + oSvgY + " " + oSvgWidth + " " + oSvgHeight;
      this.viewBoxInitWidth = oSvgWidth;
      this.viewBoxInitHeight = oSvgHeight;
      oSvg.setAttribute("viewBox", viewBoxAttr);
    },

    createMap(mapData, oSvg, MapHref, area) {
      // const backgroundMapHref = './map_resource/img/map.jpg'

      const pointSize = 2;
      let pointColor = "#eee";
      const pointOpacity = 0.7;
      let pathColor = "rgb(6,235,0)";
      const pathWidth = 3;
      const pathOpacity = 0.6;
      const pointFontSize = 5;
      let backgroundMapHref = null;

      try {
        backgroundMapHref = MapHref;
      } catch (error) {
        console.log(error);
      }

      if (this.mapObj == null || this.floor != area) {
        this.floor = area;
        this.mapObj = this.structmapData(mapData);
      }
      if (this.scale == null) {
        this.setScaleAndViewBox(mapData, oSvg);
      }
      const scale = this.scale;
      const mapObj = this.mapObj;

      // 底图绘制
      if (
        mapObj["Point-0001"] != null &&
        mapObj["Point-0002"] != null &&
        backgroundMapHref != null
      ) {
        const p1 = mapObj["Point-0001"];
        const p2 = mapObj["Point-0002"];
        const backgroundMapX = p1.map_x * scale;
        const backgroundMapY = -Math.abs(p1.map_y) * scale;
        const backgroundMapWidth = Math.abs(p2.map_x - p1.map_x) * scale;
        const backgroundMapHeight = Math.abs(p2.map_y - p1.map_y) * scale;
        const backgroundMapTag = this.createSvgTag("image", {
          id: "backgroundMap",
          // 'class':'agvTag',
          x: backgroundMapX,
          y: backgroundMapY,
          width: backgroundMapWidth,
          height: backgroundMapHeight,
          // 'style': 'cursor: pointer;',
          href: backgroundMapHref
          // 'href':{'baseVal':"./img/agv.png"},
        });
        oSvg.appendChild(backgroundMapTag);
      } else {
        // oSvg.style.background = '#303133'
        pointColor = "#171746";
      }

      // path绘制
      this.mapData.forEach(point => {
        // console.log('point',point);
        const startPoint = point.map_x * scale + " " + point.map_y * scale;
        if (
          Object.prototype.toString
            .call(point.targetPoint)
            .indexOf("String") !== -1
        ) {
          point.targetPoint = JSON.parse(point.targetPoint);
        }

        if (point.BezierControlPoints != null) {
          if (
            Object.prototype.toString
              .call(point.BezierControlPoints)
              .indexOf("String") !== -1
          ) {
            point.BezierControlPoints = JSON.parse(point.BezierControlPoints);
          }
        } else {
          point.BezierControlPoints = [];
        }

        point.targetPoint.forEach(tp => {
          // console.log('tp',tp);
          if (!mapObj[tp]) {
            return false;
          }
          const endPoint =
            mapObj[tp].map_x * scale + " " + mapObj[tp].map_y * scale;
          let tagDAttr = "";
          if (
            point.BezierControlPoints[point.targetPoint.indexOf(tp)] != null
          ) {
            tagDAttr = "M" + startPoint + " C";
            point.BezierControlPoints[point.targetPoint.indexOf(tp)].forEach(
              aPoint => {
                tagDAttr =
                  tagDAttr + " " + aPoint.x * scale + " " + aPoint.y * scale;
              }
            );
            tagDAttr = tagDAttr + " " + endPoint;
          } else {
            tagDAttr = "M" + startPoint + "L" + endPoint;
          }

          const pathTag = this.createSvgTag("path", {
            id: point.currentPoint + "---" + tp,
            class: "pathTag",
            d: tagDAttr,
            stroke: pathColor,
            "stroke-width": pathWidth,
            fill: "none",
            opacity: pathOpacity,
            // style: 'cursor: pointer;visibility:hidden;',
            style: "visibility:hidden;"
          });
          oSvg.appendChild(pathTag);
        });
      });

      // point绘制
      this.mapData.forEach(point => {
        if (
          point.currentPoint === "Point-0001" ||
          point.currentPoint === "Point-0002"
        ) {
          return false;
        }
        const pointTag = this.createSvgTag("rect", {
          id: point.currentPoint,
          class: "pointTag",
          x: point.map_x * scale - (1 / 2) * pointSize,
          y: point.map_y * scale - (1 / 2) * pointSize,
          fill: pointColor,
          width: pointSize,
          height: pointSize,
          opacity: pointOpacity,
          // 'stroke':"black",
          // 'stroke-width':"1"
          style: "cursor: pointer;"
        });
        pointTag.onmouseenter = () => {
          this.objectFocus(point, oSvg, pointSize, pointFontSize, scale);
        };

        pointTag.onmouseleave = () => {
          this.objectBlur(point, oSvg);
        };

        oSvg.appendChild(pointTag);
      });
    },

    agvMove(mapData, agvListDate, oSvg, area) {
      const agvImgWidth = 26;
      const agvImgHeight = 16;
      const agvFontSize = 6;
      const agvImg = require("../assets/img/AGV000.png");
      const agvFontColor = "#804000";
      const agvFontBgColor = "#d5d5d5";
      const agvFontBgOpacity = 0.8;
      const agvFontStrokeColor = "#383838";

      if (this.mapObj == null || this.floor != area) {
        this.floor = area;
        this.mapObj = this.structmapData(mapData);
      }
      if (this.scale == null) {
        this.setScaleAndViewBox(mapData, oSvg);
      }
      const scale = this.scale;
      const mapObj = this.mapObj;

      const agvImgCEdge = Math.sqrt(
        Math.pow(agvImgHeight, 2) + Math.pow(agvImgWidth, 2)
      );

      agvListDate.forEach(agv => {
        if (
          agv.agvList.onLine === "on" &&
          agv.agvList.now !== "" &&
          this.mapObj[agv.agvList.now] != null
        ) {
          const pointNowName = agv.agvList.now;
          const agvNowPoint = mapObj[pointNowName];
          const pointToName = agv.agvList.to;
          const agvToPoint = mapObj[pointToName];
          const pointYetName = agv.agvList.yet;
          const agvYetPoint = mapObj[pointYetName];

          if (agvNowPoint != null) {
            // 隐藏的线
            if (this.agvGreenPath[agv.agvList.agvId] == null) {
              this.agvGreenPath[agv.agvList.agvId] = [];
            } else {
              this.agvGreenPath[agv.agvList.agvId].forEach(agPath => {
                const toHiddenPath = document.getElementById(agPath);
                if (toHiddenPath != null) {
                  toHiddenPath.setAttribute(
                    "style",
                    // 'cursor: pointer;visibility:hidden;'
                    "visibility:hidden;"
                  );
                }
              });
              this.agvGreenPath[agv.agvList.agvId] = [];
            }
            // 路线绘制
            if (
              agv.agvList.taskList != null &&
              agv.agvList.taskList.length !== 0
            ) {
              const taskIndex = 0;
              const taskList = agv.agvList.taskList;

              // 要绿的线
              for (
                let i = taskIndex;
                i < agv.agvList.taskList.length - 1;
                i++
              ) {
                const toLightPathId = taskList[i] + "---" + taskList[i + 1];
                this.agvGreenPath[agv.agvList.agvId].push(toLightPathId);
                const toLightPath = document.getElementById(toLightPathId);
                if (toLightPath != null) {
                  toLightPath.setAttribute(
                    "style",
                    // 'cursor: pointer;visibility:visible;'
                    "visibility:visible;"
                  );
                }
              }
            }

            // agvNowPoint.headingAngleForMap = JSON.parse(agvNowPoint.headingAngleForMap)
            let agvAngle = 0;
            const agvSysAngle = agv.agvList.headingAngle;
            // 角度为空则自动判断
            if (agvSysAngle != null) {
              agvAngle = this.switchRadian(Number(agvSysAngle));
            } else {
              if (agvToPoint != null && agvToPoint !== 0) {
                // let angleIndex = agvNowPoint.targetPoint.indexOf(agvToPoint.currentPoint)
                // if (angleIndex != -1) {
                //   agvAngle = Number(agvNowPoint.headingAngleForMap[angleIndex])
                // }
                agvAngle = -Math.atan2(
                  agvToPoint.map_y * scale - agvNowPoint.map_y * scale,
                  agvToPoint.map_x * scale - agvNowPoint.map_x * scale
                );
              } else if (agvYetPoint != null && agvYetPoint !== 0) {
                agvAngle = -Math.atan2(
                  agvNowPoint.map_y * scale - agvYetPoint.map_y * scale,
                  agvNowPoint.map_x * scale - agvYetPoint.map_x * scale
                );
              } else {
                const agvFakeToPoint = mapObj[agvNowPoint.targetPoint[0]];
                if (agvFakeToPoint != null) {
                  agvAngle = -Math.atan2(
                    agvFakeToPoint.map_y * scale - agvNowPoint.map_y * scale,
                    agvFakeToPoint.map_x * scale - agvNowPoint.map_x * scale
                  );
                }
              }
            }

            const agvX = agvNowPoint.map_x * scale;
            const agvY = agvNowPoint.map_y * scale;

            // let agvX = agvNowPoint.map_x*scale - Math.cos(agvAngle - Math.atan2(agvImgHeight , agvImgWidth)) * (agvImgCEdge / 2)
            // let agvY = agvNowPoint.map_y*scale + Math.sin(agvAngle - Math.atan2(agvImgHeight , agvImgWidth)) * (agvImgCEdge / 2)
            const fontX = agvNowPoint.map_x * scale;
            // let fontY = agvNowPoint.map_y*scale
            // let fontY = agvNowPoint.map_y*scale + (agvImgCEdge / 2)
            // while (agvAngle < 0) {
            //   agvAngle += 2 * Math.PI;
            // }
            const fontY =
              agvNowPoint.map_y * scale -
              Math.abs(
                Math.sin(agvAngle - Math.atan2(agvImgHeight, agvImgWidth))
              ) *
                (agvImgCEdge / 2);

            const agvOnSvg = document.getElementById(agv.agvList.agvId);
            if (agvOnSvg == null) {
              const agvImgTag = this.createSvgTag("image", {
                id: agv.agvList.agvId + "Img",
                class: "agvImgTag",
                x: -agvImgWidth / 2,
                y: -agvImgHeight / 2,
                width: agvImgWidth,
                height: agvImgHeight,
                style: "cursor: pointer;",
                href: agvImg
                // 'href':{'baseVal':"./img/agv.png"},
              });

              const agvBgTag = this.createSvgTag("circle", {
                id: agv.agvList.agvId + "Bg",
                class: "agvBgTag",
                // cx: -agvImgWidth / 2,
                // cy: -agvImgHeight / 2,
                r: agvImgWidth / 2,
                fill: "none"
                // stroke:"red",
                // 'stroke-width':"5",
                // 'stroke-opacity':"0.1",
              });

              const agvTag = this.createSvgTag("g", {
                id: agv.agvList.agvId,
                style: "cursor: pointer;"
              });

              agvTag.appendChild(agvBgTag);
              agvTag.appendChild(agvImgTag);

              const agvFontInitX = 0;
              const agvFontInitY = -agvFontSize * 1.5;
              const agvFontTag = this.createSvgTag("text", {
                id: agv.agvList.agvId + "Font",
                class: "agvFontTag",
                x: agvFontInitX,
                y: agvFontInitY,
                "font-size": agvFontSize,
                fill: agvFontColor,
                "text-anchor": "middle"
                // 'style': 'cursor: pointer;',
              });

              agvFontTag.innerHTML = agv.agvList.agvId;

              const agvFontBgHeight = agvFontSize * 1.8;
              // let agvFontBgWidth = agvFontSize * 4.5
              const agvFontBgWidth =
                String(agv.agvList.agvId).length * agvFontSize * 0.8;
              const agvFontBgInitX = -agvFontBgWidth / 2;
              const agvFontBgInitY = -agvFontBgHeight / 2 - agvFontSize * 1.8;
              const agvFontBgTag = this.createSvgTag("rect", {
                id: agv.agvList.agvId + "FontBg",
                class: "agvFontBgTag",
                x: agvFontBgInitX,
                y: agvFontBgInitY,
                width: agvFontBgWidth,
                height: agvFontBgHeight,
                rx: (agvFontSize * 2) / 5,
                ry: (agvFontSize * 2) / 5,
                fill: agvFontBgColor,
                opacity: agvFontBgOpacity,
                stroke: agvFontStrokeColor,
                "stroke-width": agvFontSize / 10
              });

              const agvInfoTag = this.createSvgTag("g", {
                id: agv.agvList.agvId + "Info",
                style: "cursor: pointer;"
              });

              agvInfoTag.appendChild(agvFontBgTag);
              agvInfoTag.appendChild(agvFontTag);

              // agvTag.onmouseenter = () => {
              //   agvFocus(agv, oSvg)
              // }
              // agvInfoTag.onmouseleave = () => {
              //   agvBlur(agv, oSvg)
              // }
              agvTag.onclick = () => {
                this.agvClick(agv);
              };
              agvTag.ondblclick = () => {
                this.$router.push("/agvc");
              };
              agvInfoTag.onclick = () => {
                this.agvClick(agv);
              };
              agvInfoTag.ondblclick = () => {
                this.$router.push("/agvc");
              };
              oSvg.appendChild(agvTag);
              oSvg.appendChild(agvInfoTag);

              d3.select("#" + agv.agvList.agvId)
                // .transition()
                // .duration(1000)
                .attr(
                  "transform",
                  `translate(${agvX},${agvY})  rotate(${-this.switchAngle(
                    agvAngle
                  )})`
                );

              d3.select("#" + agv.agvId + "Info")
                // .transition()
                // .duration(1000)
                .attr("transform", `translate(${fontX},${fontY})`);

              if (
                agv.agvList.abnormal === "" &&
                agv.agvList.moveStatus === "運行"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniGreen 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "" &&
                agv.agvList.taskStatus === "閒置中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniYellow 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "充电中停止" ||
                agv.agvList.taskStatus === "充電中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniCharge 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "管制点停止" ||
                agv.agvList.abnormal === "障碍物阻挡停止" ||
                agv.agvList.abnormal === "货架读码校准失败" ||
                agv.agvList.abnormal === "按下急停按钮停止" ||
                agv.agvList.abnormal === "地面读码校准失败" ||
                agv.agvList.abnormal === "移动目标位置错误" ||
                agv.agvList.abnormal === "按键管制停止"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniIdle 3s linear infinite;"
                );
                this.agv.forEach(v=> {
                if(v === agv.agvList.agvId) {
                   d3.select("#" + v + "Bg").attr(
                  "style",
                  "animation: aniOrange 3s linear infinite;"
                );
                }
              })
              } else if (
                agv.agvList.abnormal === "" &&
                agv.agvList.moveStatus === "停止" &&
                agv.agvList.taskStatus === "任務中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniIdle 3s linear infinite;"
                );
              } else if (agv.agvList.abnormal !== "") {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniRed 3s linear infinite;"
                ); 
              }
              
            } else {
              // agv移动
              d3.select("#" + agv.agvList.agvId)
                .transition()
                .duration(3000)
                .attr(
                  "transform",
                  `translate(${agvX},${agvY})  rotate(${-this.switchAngle(
                    agvAngle
                  )})`
                );

              // Info移动
              d3.select("#" + agv.agvList.agvId + "Info")
                .transition()
                .duration(3000)
                .attr("transform", `translate(${fontX},${fontY})`);
              if (
                agv.agvList.abnormal === "" &&
                agv.agvList.moveStatus === "運行"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniGreen 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "" &&
                agv.agvList.taskStatus === "閒置中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniYellow 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "充电中停止" ||
                agv.agvList.taskStatus === "充電中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniCharge 3s linear infinite;"
                );
              } else if (
                agv.agvList.abnormal === "管制点停止" ||
                agv.agvList.abnormal === "障碍物阻挡停止" ||
                agv.agvList.abnormal === "货架读码校准失败" ||
                agv.agvList.abnormal === "按下急停按钮停止" ||
                agv.agvList.abnormal === "地面读码校准失败" ||
                agv.agvList.abnormal === "移动目标位置错误" ||
                agv.agvList.abnormal === "按键管制停止"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniIdle 3s linear infinite;"
                );
                 this.agv.forEach(v=> {
                if(v === agv.agvList.agvId) {
                   d3.select("#" + v + "Bg").attr(
                  "style",
                  "animation: aniOrange 3s linear infinite;"
                );
                }
              })
              } else if (
                agv.agvList.abnormal === "" &&
                agv.agvList.moveStatus === "停止" &&
                agv.agvList.taskStatus === "任務中"
              ) {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniIdle 3s linear infinite;"
                );
              } else if (agv.agvList.abnormal !== "") {
                d3.select("#" + agv.agvList.agvId + "Bg").attr(
                  "style",
                  "animation: aniRed 3s linear infinite;"
                ); 
              }
            }
          }
        } else {
          const notExistAgv = document.getElementById(agv.agvList.agvId);
          const notExistAgvFont = document.getElementById(
            agv.agvList.agvId + "Info"
          );

          // if (notExistAgv != null) {
          //   oSvg.removeChild(notExistAgv);
          //   oSvg.removeChild(notExistAgvFont);
          // }

          // 隐藏的线
          if (this.agvGreenPath[agv.agvList.agvId] == null) {
            this.agvGreenPath[agv.agvList.agvId] = [];
          } else {
            this.agvGreenPath[agv.agvList.agvId].forEach(agPath => {
              const toHiddenPath = document.getElementById(agPath);
              if (toHiddenPath != null) {
                toHiddenPath.setAttribute(
                  "style",
                  // 'cursor: pointer;visibility:hidden;'
                  "visibility:hidden;"
                );
              }
            });
            this.agvGreenPath[agv.agvList.agvId] = [];
          }
        }

        // const agvInfoCard = document.getElementById('agvInfoCard')
        if (
          // agvInfoCard.style.visibility === 'visible' &&
          this.isShow == true &&
          this.agvClicked === agv.agvList.agvId
        ) {
          this.agvInfoCardUpdate(agv);
        }
      });
    },

    // 定位到选定物
    locateSearchObject() {
      if (this.searchSelect === "point") {
        this.locatePoint(this.searchContent);
      } else if (this.searchSelect === "agv") {
        this.locateAgv(this.searchContent);
      }
    },

    // 定位点位
    locatePoint(pointName) {
      const pointSize = 3;
      const pointFontSize = 5;
      const searchPointRes = this.searchPointRes;
      // let pointName = document.getElementById('pointName').value

      if (searchPointRes.pointName !== pointName) {
        searchPointRes.pointList = [];
        searchPointRes.selectNum = 0;
        searchPointRes.pointName = pointName;
        this.mapData.forEach(point => {
          if (
            point.currentPoint === "Point-0001" ||
            point.currentPoint === "Point-0002"
          ) {
            return false;
          }
          if (point.currentPoint.indexOf(pointName) !== -1) {
            searchPointRes.pointList.push(point);
          }
        });
      }

      const selectNum = searchPointRes.selectNum;
      const pointListLen = searchPointRes.pointList.length;
      const pointList = searchPointRes.pointList;
      const lastPoint = searchPointRes.lastPoint;
      if (pointListLen > 0) {
        if (lastPoint != null) {
          // let tempPoint = document.getElementById(searchPointRes.lastPoint.currentPoint)
          // tempPoint.removeAttribute('stroke')
          // tempPoint.removeAttribute('stroke-width')
          // tempPoint.removeAttribute('stroke-opti')
          this.objectBlur(searchPointRes.lastPoint, this.oSvg);
        }

        searchPointRes.selectNum = (selectNum + 1) % pointListLen;
        const selectPoint = pointList[selectNum];
        // document.getElementById(selectPoint.currentPoint).setAttribute('stroke' , 'red')
        // document.getElementById(selectPoint.currentPoint).setAttribute('stroke-width' , 2)
        // document.getElementById(selectPoint.currentPoint).setAttribute('stroke-opti' , 2)
        this.objectFocus(
          selectPoint,
          this.oSvg,
          pointSize,
          pointFontSize,
          this.scale
        );
        searchPointRes.lastPoint = selectPoint;
        // console.log(selectPoint)
        this.svgPanZoom.setCenter(
          selectPoint.map_x * this.scale,
          selectPoint.map_y * this.scale
        );
      } else {
        this.$notify.error({
          title: "错误",
          message: "找不到此点位"
        });
      }
    },

    // 定位agv
    locateAgv(agvName) {
      const searchAgvRes = this.searchAgvRes;

      if (searchAgvRes.agvName !== agvName) {
        searchAgvRes.agvList = [];
        searchAgvRes.selectNum = 0;
        searchAgvRes.agvName = agvName;
        this.agvListDate.forEach((agv,index) => {
          if (
            agv.agvList.agvId.indexOf(agvName) !== -1 &&
            agv.agvList.onLine === "on" &&
            agv.agvList.now !== "" &&
            this.mapObj[agv.agvList.now] != null
          ) {
            searchAgvRes.agvList.push(agv.agvList);
            this.agvListDate.splice(index,1)
            this.agvListDate.push(agv)
            const bigAgv =  document.getElementById(agv.agvList.agvId + "Img")
            bigAgv.setAttribute('height','30');
            bigAgv.setAttribute('width','50');
            bigAgv.setAttribute('x','-25');
            bigAgv.setAttribute('y','-15');
            const bigAgvBg =  document.getElementById(agv.agvList.agvId + "Bg")
            bigAgvBg.setAttribute('r','20');
            const bigAgvFont =  document.getElementById(agv.agvList.agvId + "FontBg")
            bigAgvFont.setAttribute('height','22');
            bigAgvFont.setAttribute('rx','4.8');
            bigAgvFont.setAttribute('ry','4.8');
            bigAgvFont.setAttribute('x',-(String(agv.agvList.agvId).length * 12 * 0.8)/2);
            bigAgvFont.setAttribute('y', '-32.6');
            bigAgvFont.setAttribute('width',String(agv.agvList.agvId).length * 12 * 0.8);
            const bigFont =  document.getElementById(agv.agvList.agvId + "Font")
            bigFont.setAttribute('font-size','12');
            bigFont.setAttribute('x','0');
            bigFont.setAttribute('y','-18');
          }
        });
      }

      const selectNum = searchAgvRes.selectNum;
      const agvListLen = searchAgvRes.agvList.length;
      const agvList = searchAgvRes.agvList;
      // const lastAgv = searchAgvRes.lastAgv
      if (agvListLen > 0) {
        searchAgvRes.selectNum = (selectNum + 1) % agvListLen;
        const selectAgv = agvList[selectNum];
        searchAgvRes.lastAgv = selectAgv;
        const selectAgvTag = document.getElementById(selectAgv.agvId);
        const transformAttr = selectAgvTag.getAttribute("transform");
        // console.log(transformAttr)
        if (transformAttr != null) {
          const agvX = transformAttr.substring(
            transformAttr.indexOf("(") + 1,
            transformAttr.indexOf(",")
          );
          const agvY = transformAttr.substring(
            transformAttr.indexOf(",") + 1,
            transformAttr.indexOf(")")
          );
          // console.log(agvX)
          // console.log(agvY)
          this.svgPanZoom.setCenter(agvX, agvY);
        }
      } else {
        this.$notify.error({
          title: "错误",
          message: "找不到此AGV"
        });
      }
    }
    //
  }
};
</script>

<style lang="less" scoped>
#mapCard {
  position: relative;
}
.full-btn {
  position: absolute;
  top: 1%;
  right: 1%;
  font-size: 32px;
  cursor: pointer;
  z-index: 100000;
}
.all_floor {
  position: absolute;
  top: 5%;
  left: 20px;
  display: flex;
  flex-wrap: wrap;
  img {
    width: 48%;
    height: 230px;
    margin: 5px;
    border: 1px solid #00bbec;
    cursor: pointer;
  }
}
#searchMapArea {
  position: absolute;
  right: 2%;
  bottom: 10px;
  z-index: 5;
  opacity: 0.9;
  width: 300px;
  .el-select {
    width: 75px !important;
    background-color: #66b1ff;
    color: #fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  /deep/.el-input-group__prepend {
    border-left: 0;
  }
  /deep/.el-input-group__append,
  .el-input-group__prepend {
    background-color: #66b1ff;
    color: #fff;
    border: 0;
  }
}
.agvInfo {
  position: absolute;
  right: 2%;
  top: 3%;
  width: 350px;
  height: 500px;
  background-color: rgba(0, 101, 252, 0.6);
  z-index: 100000;
  .info-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .agv_title {
      font-size: 26px;
      color: #fff;
      font-weight: bold;
    }
    i {
      font-size: 26px;
      color: #fff;
      cursor: pointer;
    }
  }
  .agv_list {
    div {
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
  }
}

#btn-area {
  padding: 0px;
  position: absolute;
  left: 1%;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 200000;
  display: flex;
  opacity: 0.7;
  el-button {
    margin: 10px 0;
    // font-weight: bold;
  }
}

.floor-btn {
  position: absolute;
  top: 1%;
  left: 1%;
  display: flex;
  opacity: 0.8;
  .el-button {
    // margin: 10px;
    font-weight: bold;
  }
}
</style>
