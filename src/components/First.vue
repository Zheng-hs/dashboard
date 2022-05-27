<template>
  <div class="first">
    <div class="main clearfix">
      <div class="aside-left fl">
        <div class="top left-top">
          <h3>任务状态</h3>
          <div id="pie2" style="width: 90%; height: 80%;margin-left:10px"></div>
        </div>
        <div class="bottom left-bottom">
          <div class="bottom-in"><h3>环境安全</h3></div>
          <el-carousel height="330px" :interval="switchtime">
            <el-carousel-item>
              <div
                id="bar2"
                style="width: 100%; height: 110%;"
                ref="chart"
              ></div>
            </el-carousel-item>
            <el-carousel-item>
              <el-table
            :data="safeList1"
            :row-class-name="tableRowClassName"
            @row-click="goMap"
            style="width: 95%"
            height="320"
          >
            <!-- <el-table-column prop="level" label="异常等级" width="70">
            </el-table-column> -->
            <el-table-column prop="agvId" label="影响车辆" width="70">
            </el-table-column>
            <el-table-column prop="code" label="分类" width="60">
              <template slot-scope="scope">
                <span style="color: red" v-if="scope.row.code === '电压(异常)'||scope.row.code === '电流(异常)'">{{
                  scope.row.code
                }}</span>
                <span v-else style="color: #ff7b00">{{
                  scope.row.code
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="area" label="发生区域" width="80">
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.area === 'HA1F'">{{
                  "HA1F 物料仓"
                }}</span>
                <span v-else-if="scope.row.area === 'HB2F'">{{
                  "HB2F 集散中心-SMT"
                }}</span>
                <span v-else>{{ scope.row.area }}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="warn" label="管控值" width="60">
            </el-table-column>
            <el-table-column prop="real" label="实际值" width="60">
            </el-table-column>
            <!-- <el-table-column prop="time" label="持续时间" width="70">
              <template slot-scope="scope"
                >{{ (scope.row.time / 60).toFixed(1) }}min</template
              >
            </el-table-column> -->
          </el-table>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="middle-map fl">
        <div class="map-wrap">
          <div class="middle-top">
            <div class="top-num">
              <div class="top">
                <div class="onagv">
                  <h1>AGV在线数量</h1>
                  <div class="onagv-num">
                    <count-to
                      :start-val="0"
                      :end-val="agvNum"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>辆</p>
                  </div>
                </div>
                <div class="erragv">
                  <h1>异常车数</h1>
                  <div class="erragv-num">
                    <count-to
                      :start-val="0"
                      :end-val="erragv"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>辆</p>
                  </div>
                </div>
              </div>
              <div class="top1">
                <div class="traffic">
                  <h1>流量</h1>
                  <div class="traffic-num">
                    <count-to
                      :start-val="0"
                      :end-val="traffic"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>趟</p>
                  </div>
                </div>
                <div class="ct">
                  <h1>C/T</h1>
                  <div class="ct-num">
                    <count-to
                      :start-val="0"
                      :end-val="ct"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>min/趟</p>
                  </div>
                </div>
              </div>
              <div class="top2">
                <div class="mileage">
                  <h1>当日里程</h1>
                  <div class="mileage-num">
                    <count-to
                      :start-val="0"
                      :end-val="tkm"
                      :duration="1000"
                      class="card-panel-num"
                    />
                    <p>km</p>
                  </div>
                </div>
                <div class="rate">
                  <h1>累计里程</h1>
                  <div class="rate-num">
                    <count-to
                      :start-val="0"
                      :end-val="km"
                      :duration="1000"
                      class="card-panel-num"
                    />
                    <p>km</p>
                  </div>
                </div>
              </div>
              <div class="top3">
                <div class="abnormal">
                  <div class="abnormal-classify">
                    <div class="abnormal1">
                      <h1>Down</h1>
                      <div class="abnormal-num">
                        <count-to
                          :start-val="0"
                          :end-val="abnormal"
                          :duration="3000"
                          class="card-panel-num"
                        />
                        <p>次</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="down">
                  <div class="ab">
                    <h1>Down%</h1>
                    <div class="down-num">
                      <count-to
                        :start-val="0"
                        :end-val="down"
                        :duration="3000"
                        class="card-panel-num"
                      />
                      <p>%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="top4">
                <div class="abnormal2">
                  <h1>Ab_Normal IDLE</h1>
                  <div class="abnormal-num">
                    <count-to
                      :start-val="0"
                      :end-val="abidle"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>次</p>
                  </div>
                </div>

                <div class="ab">
                  <h1>Ab_Normal IDLE%</h1>
                  <div class="down-num">
                    <count-to
                      :start-val="0"
                      :end-val="normal"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>%</p>
                  </div>
                </div>
              </div>
              <div class="top5">
                <div class="mtbf">
                  <h1>MTBF</h1>
                  <div class="mtbf-num">
                    <count-to
                      :start-val="0"
                      :end-val="mtbf"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>min</p>
                  </div>
                </div>
                <div class="mttr">
                  <h1>MTTR</h1>
                  <div class="mttr-num">
                    <count-to
                      :start-val="0"
                      :end-val="mttr"
                      :duration="3000"
                      class="card-panel-num"
                    />
                    <p>min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="map" style="overflow-x:hidden; overflow-y:hidden;">
            <fullscreen
              class="fullscreen_warp"
              :fullscreen.sync="fullscreen"
              :teleport="teleport"
              :page-only="pageOnly"
            >
              <Map
                @floor="changeFloor"
                @mile="getMile"
                @full="toggle"
                @mileage="getMileage"
                ref="child"
                :agv="abList"
              ></Map>
            </fullscreen>
          </div>
        </div>
      </div>
      <div class="aside-right fl">
        <div class="pie clearfix">
          <div class="pie1 fl">
            <h3>AGV状态</h3>
            <div class="agv-num">AGV在线数量: {{ agvNum }}/{{ allNum }}</div>
            <div
              id="pie1"
              style="width: 90%; height: 80%;  margin-top: 20px; margin-left:20px"
            ></div>
          </div>
        </div>
        <div class="trend">
          <h3>异常状态</h3>
          <!-- <el-carousel height="360px" :interval="switchtime">
            <el-carousel-item>
              <div id="pie3" style="width: 100%; height: 95%"></div>
            </el-carousel-item>
            <el-carousel-item> -->
          <el-table
            :data="tableData1"
            :row-class-name="tableRowClassName"
            @row-click="goMap"
            style="width: 95%"
            height="320"
          >
            <!-- <el-table-column prop="level" label="异常等级" width="70">
            </el-table-column> -->
            <el-table-column prop="status" label="分类" width="60">
              <template slot-scope="scope">
                <span style="color: red" v-if="scope.row.status === 'DOWN'">{{
                  scope.row.status
                }}</span>
                <span v-else style="color: #ff7b00">{{
                  scope.row.status
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="异常代码" width="80">
            </el-table-column>
            <el-table-column prop="area" label="发生区域" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.area === 'HA1F'">{{
                  "HA1F 物料仓"
                }}</span>
                <span v-else-if="scope.row.area === 'HB2F'">{{
                  "HB2F 集散中心-SMT"
                }}</span>
                <span v-else>{{ scope.row.area }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="agvId" label="影响车辆" width="70">
            </el-table-column>
            <el-table-column prop="time" label="持续时间" width="70">
              <template slot-scope="scope"
                >{{ (scope.row.time / 60).toFixed(1) }}min</template
              >
            </el-table-column>
          </el-table>
          <!-- </el-carousel-item>
          </el-carousel> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EleResize } from "/Dashboard/dashboard/static/js/esresize";
import { component } from "vue-fullscreen";
import "../util/shuffling";
import CountTo from "vue-count-to";
import Map from "../views/Map.vue";
export default {
  components: {
    CountTo,
    Map,
    fullscreen: component
  },
  computed: {},
  created() {
    // this.getSpanArr(this.tableData1);
  },
  mounted() {
    this.getTime();
    this.getAgvStatus();
    this.getTask();
    this.getErr();
    this.getList();
    this.getMileage();
    this.getSafe();
    setTimeout(() => {
          this.getBar2();
        }, 1000);
    
    this.timer.push(
      setInterval(() => {
        this.getTime();
        this.getAgvStatus();
        this.getTask();
        this.getErr();
        this.getList();
        this.getMileage();
        this.getSafe();
      }, 10000)
    );
  },
  beforeDestroy() {
    this.cleanTimer();
  },
  data() {
    return {
      endtime: "",
      starttime: "",
      time: 0,
      mtbf: 0,
      agvNum: 0,
      erragv: 0,
      abnormal: 0,
      traffic: 0,
      gettaskList: [],
      abnormalList: [],
      taskalltime: 0,
      ct: 0,
      errTime: 0,
      abidleTime: 0,
      mttr: 0,
      abidle: 0,
      normal: 0,
      down: 0,
      floor: "",
      // 计时器
      timer: [],
      currentPage4: 1,
      tableData1: [],
      spanArr: [], //遍历数据时，根据相同的标识去存储记录
      pos: 0, // 二维数组的索引
      switchtime: 10000,
      km: 0,
      allNum: 33,
      area: "",
      fullscreen: false,
      teleport: true,
      pageOnly: true,
      list1: [],
      list2: [],
      tkm: 0,
      run: 0,
      charge: 0,
      idles: 0,
      nidle: 0,
      abnidle: 0,
      downs: 0,
      statuslist: [],
      a: 0,
      b: 0,
      currentList: [],
      voltageList: [],
      safeList: [],
      safeList1: [],
      abList: []
    };
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen;
      // this.fullscreen = fullscreen.isFullscreen
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    async goMap(row) {
      if (row.area === "HA1F") {
        await this.$refs.child.chooseHa1f();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      } else if (row.area === "HA1F LCM1內物流") {
        await this.$refs.child.chooseHa1f1();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      } else if (row.area === "HA2F LCM1內物流") {
        await this.$refs.child.chooseHa2f();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      } else if (row.area === "HA3F LCM1內物流") {
        await this.$refs.child.chooseHa3f();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      } else if (row.area === "HB2F") {
        await this.$refs.child.chooseHb2f();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      } else if (row.area === "HB3F LCM2內物流") {
        await this.$refs.child.chooseHb3f();
        setTimeout(() => {
          this.$refs.child.locateAgv(row.agvId);
        }, 2000);
      }
    },
    getPie1() {
      let pie1 = this.$echarts.init(document.getElementById("pie1"));
      let echartsid = document.getElementById("pie1");
      var pieRich = {
        big: {
          fontSize: 26,
          lineHeight: 40,
          fontFamily: "Rubik"
        },
        small: {
          fontSize: 20
        }
      };
      var pieOption1 = {
        legend: {
          x: "left",
          data: [],
          top: "80%",
          left: "center",
          itemWidth: 22,
          itemHeight: 14,
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "65%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            color: [
              "#06eb00",
              "#24feb4",
              "#428f04",
              "#eff86b",
              "#ff7b00",
              "red"
            ],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                color: "#fff",
                formatter: function(params, ticket, callback) {
                  return (
                    "{big|" + params.value + "}\n{small|" + params.name + "}"
                  );
                },
                // '{a|这段文本采用样式a}'
                rich: pieRich
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      };
      var statuslist = this.statuslist.map(v => v.name);
      pieOption1["legend"]["data"] = statuslist;
      pieOption1.series[0].data = this.statuslist;
      function createExample(pieOption1, tooltipOption) {
        // 基于准备好的dom，初始化echarts图表
        // 为echarts对象加载数据
        pie1.setOption(pieOption1);
        tools.loopShowTooltip(pie1, pieOption1, tooltipOption); //第一个参数需要改一下
      }
      createExample(pieOption1, {
        loopSeries: true,
        // 间隔时间
        interval: 3000
      });
      let listener = function() {
        pie1.resize();
      };
      EleResize.on(echartsid, listener);
    },
    async getAgvStatus(floor) {
      if (floor !== undefined) {
        this.floor = floor;
      }
      const { data: res } = await this.$http.post("/getstatusList", {
        floor: this.floor,
        type: ""
      });
      // this.statuslist = res
      this.agvNum = res.length;
      let i = 0;
      let j = 0;
      let k = 0;
      let a = 0;
      let b = 0;
      let c = 0;
      this.run = 0;
      this.charge = 0;
      this.nidle = 0;
      this.idles = 0;
      this.abnidle = 0;
      this.downs = 0;
      res.forEach(v => {
        if (v.status === "RUN") {
          i++;
          this.run = i;
        } else if (v.status === "CHARGE") {
          j++;
          this.charge = j;
        } else if (v.status === "Normal IDLE") {
          k++;
          this.nidle = k;
        } else if (v.status === "IDLE") {
          a++;
          this.idles = a;
        } else if (v.status === "Ab_Normal IDLE") {
          b++;
          this.abnidle = b;
        } else if (v.status === "DOWN") {
          c++;
          this.downs = c;
        }
      });
      this.list1 = [];
      var temp = {
        name: "RUN",
        value: this.run
      };
      var temp1 = {
        name: "CHARGE",
        value: this.charge
      };
      var temp2 = {
        name: "Normal IDLE",
        value: this.nidle
      };
      var temp3 = {
        name: "IDLE",
        value: this.idles
      };
      var temp4 = {
        name: "Ab_Normal IDLE",
        value: this.abnidle
      };
      var temp5 = {
        name: "DOWN",
        value: this.downs
      };
      this.list1.push(temp);
      this.list1.push(temp1);
      this.list1.push(temp2);
      this.list1.push(temp3);
      this.list1.push(temp4);
      this.list1.push(temp5);
      if (JSON.stringify(this.statuslist) != JSON.stringify(this.list1)) {
        this.statuslist = this.list1;
        document.getElementById("pie1").removeAttribute("_echarts_instance_");
        this.getPie1();
      }
    },
    async getTask(floor) {
      if (floor !== undefined) {
        this.floor = floor;
      }
      const { data: res } = await this.$http.post("/gettaskList", {
        starttime: this.starttime,
        endtime: this.endtime,
        floor: this.floor
      });
      this.taskalltime = parseFloat(res[0]["value"]);
      res.shift();
      this.traffic = parseInt(res[0]["value"]);
      res.shift();
      if (this.traffic === 0) {
        this.ct = 0;
      } else {
        this.ct = this.taskalltime / this.traffic;
      }
      if (JSON.stringify(this.list2) != JSON.stringify(res)) {
        this.list2 = res;
        document.getElementById("pie2").removeAttribute("_echarts_instance_");
        this.getPie2();
      }
    },
    getPie2() {
      let pie2 = this.$echarts.init(document.getElementById("pie2"));
      pie2.clear();
      let echartsid = document.getElementById("pie2");
      var pieRich = {
        big: {
          fontSize: 26,
          lineHeight: 40,
          fontFamily: "Rubik"
        },
        small: {
          fontSize: 20
        }
      };
      var pieOption2 = {
        legend: {
          x: "left",
          data: [],
          top: "80%",
          left: "center",
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "65%"],
            // hoverAnimation:false,
            // hoverOffset: 5,
            avoidLabelOverlap: false,
            color: ["#06eb00", "red", "#24feb4", "#961f1f"],
            center: ["50%", "35%"],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                color: "#fff",
                formatter: function(params, ticket, callback) {
                  return (
                    "{big|" + params.value + "}\n{small|" + params.name + "}"
                  );
                },
                // '{a|这段文本采用样式a}'
                rich: pieRich
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      };

      var tasklist = this.list2.forEach(v => v.name);
      pieOption2["legend"]["data"] = tasklist;
      pieOption2.series[0].data = this.list2;

      function createExample(pieOption2, tooltipOption) {
        // 基于准备好的dom，初始化echarts图表
        // 为echarts对象加载数据
        pie2.clear();
        pie2.setOption(pieOption2);
        tools.loopShowTooltip(pie2, pieOption2, tooltipOption); //第一个参数需要改一下
      }
      createExample(pieOption2, {
        loopSeries: true,
        // 间隔时间
        interval: 3000
      });
      let listener = function() {
        pie2.resize();
      };
      EleResize.on(echartsid, listener);
    },
    getBar2() {
      let bar2 = this.$echarts.init(document.getElementById("bar2"));
      let echartsid = document.getElementById("bar2");

      var option = {
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "异常", "警告", "正常"],
            this.voltageList,
            this.currentList,
            ["温度", 0, 0, this.agvNum]
          ]
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff"
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.3)"
            }
          },
          axisLabel: {
            color: "#fff"
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: "bar",
            color: "red",
            label: {
              show: true,
              position: "inside",
              color: "#fff"
            }
          },
          {
            type: "bar",
            color: "#ff7b00",
            label: {
              show: true,
              position: "inside",
              color: "#fff"
            }
          },
          {
            type: "bar",
            color: "#06eb00",
            label: {
              show: true,
              position: "inside",
              color: "#fff"
            }
          }
        ]
      };
      bar2.setOption(option);
      bar2.on("click", param => {
        console.log(param);
      });
      let listener = function() {
        bar2.resize();
      };
      EleResize.on(echartsid, listener);
    },
    async getSafe(floor) {
       if (floor !== undefined) {
        this.floor = floor;
      }
      const {data: res} = await this.$http.post('/getSafeList',{floor:this.floor})
      // const res = [
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F LCM1内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F LCM1內物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: 50,
      //     current: 50,
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: "",
      //     current: "",
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: "",
      //     current: "",
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: "",
      //     current: "",
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   },
      //   {
      //     agvId: "agv001",
      //     voltage: "",
      //     current: "",
      //     temperature: 40,
      //     area: "HA1F内物流",
      //     status: "充电",
      //     time: 30
      //   }
      // ];
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;

      res.forEach(v => {
        if (v.voltage === "" || v.current === "") {
          a++;
        } else if (v.voltage > 56.5 && v.voltage < 37.5) {
          b++;
        }else if (
          v.voltage >= 37.5 &&
          v.voltage <= 56.5 &&
          v.voltage < 39.4 &&
          v.voltage > 54.4
        ) {
          c++;
        } else if (v.current >55 && v.current < -55) {
          d++;
        } else if (v.current > 49.5 && v.current <= 55 && v.current >= -55 && v.current < -49.5) {
          e++;
        }
      });
      this.voltageList = ["电压", b, c, a];
      this.currentList = ["电流", d, e, a];
      this.safeList = res.filter(v => v.voltage !== "" || v.current !== "");
      this.safeList1 = [];
      this.safeList.forEach(v => {
        if (v.voltage > 56.5 && v.voltage < 37.5) {
          this.safeList1.push({
            agvId: v.agvId,
            code: "电压(异常)",
            area: v.area,
            warn: '56.5>x>37.5',
            real: v.voltage
          });
        } else if ( v.voltage >= 37.5 &&
          v.voltage <= 56.5 &&
          v.voltage < 39.4 &&
          v.voltage > 54.4) {
          this.safeList1.push({
            agvId: v.agvId,
            code: "电压(警告)",
            area: v.area,
            warn: '54.5>x,x<39.4',
            real: v.voltage
          });
        } else if (v.current >55 && v.current < -55) {
          this.safeList1.push({
            agvId: v.agvId,
            code: "电流(异常)",
            area: v.area,
            warn: 'x>55,x<-55',
            real: v.current
          });
        } else if (v.current > 49.5 && v.current <= 55 && v.current >= -55 && v.current < -49.5) {
          this.safeList1.push({
            agvId: v.agvId,
            code: "电流(警告)",
            area: v.area,
            warn: 'x>49.5,x<-49.5',
            real: v.current
          });
        }
      });
      this.getBar2();
    },
    async getErr(floor) {
      if (floor !== undefined) {
        this.floor = floor;
      }
      const { data: res } = await this.$http.post("/getMissionList", {
        starttime: this.starttime,
        endtime: this.endtime,
        floor: this.floor
      });
      this.errTime = res[0]["value"];
      res.shift();
      this.abidleTime = res[0]["value"];
      res.shift();
      this.abnormal = parseInt(res[0]["value"]);
      if (this.abnormal === 0) {
        this.mtbf = this.time * this.agvNum;
        this.mttr = 0;
      } else {
        this.mtbf = (this.time / this.abnormal ) * this.agvNum;
        this.mttr = this.errTime / this.abnormal;
      }
      res.shift();
      this.abidle = parseInt(res[0]["value"]);
      res.shift();
      if (this.agvNum === 0) {
        this.down = 0;
        this.normal = 0;
      } else {
        this.down = (this.errTime / (this.time * this.agvNum)) * 100;
        this.normal = (this.abidleTime / (this.time * this.agvNum)) * 100;
      }
    },
    async changeFloor(data, mileage, today, agv) {
      await this.cleanTimer();
      this.getTime();
      this.getAgvStatus(data);
      this.getTask(data);
      this.getErr(data);
      this.getList(data);
      this.getSafe(data);
      this.km = mileage;
      this.tkm = today;
      this.allNum = agv;
      this.timer.push(
        setInterval(() => {
          this.getTime();
          this.getAgvStatus(data);
          this.getTask(data);
          this.getErr(data);
          this.getList(data);
          this.getSafe(data);
        }, 10000)
      );
    },
    // 清除timer
    cleanTimer() {
      for (let i = 0; i < this.timer.length; i++) {
        clearInterval(this.timer.pop());
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    async getList(floor) {
      if (floor !== undefined) {
        this.floor = floor;
      }
      const { data: res } = await this.$http.post("/getstatusList", {
        floor: this.floor,
        type: "DOWN"
      });
      // const res = [
      //   {
      //     agvId:"agv006",
      //     status:"Ab_Normal IDLE",
      //     code:"防撞条触发",
      //     area:"HA1F LCM1內物流",
      //     time: 30
      // },
      // ]
      this.tableData1 = res.filter(
        v => v.status === "DOWN" || v.status === "Ab_Normal IDLE"
      );
      this.erragv = this.tableData1.length;
      this.tableData1.forEach(agv => {
        if(agv.status === "Ab_Normal IDLE") {
          this.abList.push(agv.agvId)
        }
      })
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleChange(val) {
      console.log(`当前页: ${val}`);
    },
    async getMileage() {
      const { data: res } = await this.$http.post("/getSystemInfo", {
        query: {},
        pagenum: "",
        pagesize: "",
        floor: ""
      });

      res.forEach(agv => {
        this.a += parseInt(agv.agvList.mileage);
        this.b += parseFloat(agv.agvList.mileage - agv.agvList.todaymileage);
      });
      this.km = this.a;
      this.tkm = this.b;
      this.a = 0;
      this.b = 0;
    },
    getMile(data, today) {
      this.km = data;
      this.tkm = today;
    },
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf1 = new Date().getMinutes();
      let ss1 = new Date().getSeconds();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.time = (hh - 8) * 60 + mf1 + ss1 / 60;
      this.endtime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      this.starttime = yy + "-" + mm + "-" + dd + " " + "08:00:00";
    }
  }
};
</script>

<style lang="less" scoped>
.first {
  padding: 0 0.5%;
}
.fl {
  float: left;
  // color: #6acf3b;
}
.el-table {
  margin-top: 40px;
  margin-left: 10px;
}
.fr {
  float: right;
  color: #ff3300;
}
@media screen and (max-height: 780px) {
  .left-score-image {
    width: 190px;
    height: 135px;
    margin-left: 36px;
    margin-top: 10px;
  }
}
@font-face {
  font-family: DigifaceWide;
  src: url("../assets/fonts/digifaw.ttf");
}
/deep/.el-table .warning-row {
  background: rgba(38, 66, 105, 0.5);
}
/deep/.cell {
  text-align: center;
}
/deep/.el-table .success-row {
  //这里可以修改颜色
  background-image: linear-gradient(
    to left,
    rgba(3, 58, 141, 0.685) 0%,
    rgba(15, 30, 56, 0.8) 65%,
    rgba(22, 58, 109, 0.699) 100%
  );
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.main {
  color: #fff;
}
.main .aside-left {
  position: relative;
  width: 19%;
  height: 100%;
}

.main .aside-right {
  position: relative;
  width: 20%;
  height: 100%;
}

.main .aside-left h3 {
  padding-top: 6.5%;
  padding-left: 6%;
}

.left-top {
  position: relative;
  opacity: 0.9;
  background: rgba(18, 22, 64, 0.5);
  height: 490px;
}

.left-top h3 {
  font-size: 25px;
}

.left-top:after {
  position: absolute;
  right: 0;
  bottom: -5.4%;
  width: 5%;
  min-width: 20px;
  height: 13%;
  min-height: 50px;
  background: url("../assets/bor1_1_xie.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}

.left-top:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/bor1_1.png") no-repeat;
  background-size: 100% 100%;
  z-index: -1;
  content: "";
}

.left-bottom {
  position: relative;
  bottom: 0;
  opacity: 0.9;
  height: 490px;
}

.left-bottom:before {
  content: "";
  position: absolute;
  top: 5.6%;
  right: -2%;
  z-index: 100;
  width: 15%;
  height: 7%;
  background: url("../assets/bor1_2_square.png") no-repeat;
  background-size: 100%;
  z-index: 10;
}

.left-bottom h3 {
  margin-top: 0;
  font-size: 25px;
}

.left-bottom:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 104%;
  background: url("../assets/bor1_2.png") no-repeat;
  background-size: 100% 97%;
  z-index: -1;
  content: "";
}
.tit {
  height: 6%;
  margin: 3% 0;
  font-size: 14.08px;
  color: #2edbff;
}
.tit span {
  display: inline-block;
  height: 100%;
  // margin: 10px;
  width: 100px;
}
.tit span:first-child {
  width: 40px;
  padding-left: 18.08px;
}
.middle-map {
  position: relative;
  width: 60%;
  height: 100%;
  margin: 0 0.5%;
}

.middle-map h3 {
  height: 9%;
}

.middle-map .map-wrap {
  position: relative;
  opacity: 0.9;
  height: 100%;
  border-top: 4px solid #ffffff00;
  border-bottom: 4px solid #ffffff00;
  // background: rgba(18, 22, 64, 0.5);
  background-size: 100% 100%;
}

.middle-map .map-wrap h3 {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  padding: 0 3%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

.middle-map .map-wrap h3 dl {
  width: 19%;
  padding: 0.4% 0.2% 0 0.4%;
  border-left: 2px solid #00bbec;
}

#fl1 {
  border-right: 2px solid #00bbec;
}

.middle-map .map-wrap h3 dl dt {
  font-size: 20px;
  color: #00bbec;
  margin-bottom: 5%;
  text-align: center;
}

.middle-map .map-wrap h3 dl dd {
  font-family: DigifaceWide;
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin: 0;
}
#sales-data {
  text-align: left;
  margin-left: 20px;
}
#sales-data1 {
  text-align: right;
  position: absolute;
  width: 190px;
  top: 61px;
}

.middle-top {
  margin-top: 12px;
  margin-bottom: 10px;
  .top-num {
    display: flex;
    justify-content: space-around;
    .top {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      margin-right: 10px;
      .onagv {
        flex: 1;
        // border-bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .onagv-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #06eb00;
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
      .erragv {
        flex: 1;
        display: flex;
        border-top: 2px solid rgb(0, 187, 236);
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .erragv-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }
    .top1 {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      margin-right: 10px;
      .traffic {
        flex: 1;
        // border-bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .traffic-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #06eb00;
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
      .ct {
        flex: 1;
        display: flex;
        border-top: 2px solid rgb(0, 187, 236);
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .ct-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }
    .top2 {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      margin-right: 10px;
      .mileage {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .mileage-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }

      .rate {
        flex: 1;
        border-top: 2px solid rgb(0, 187, 236);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .rate-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: #06eb00;
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }
    .top3 {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      margin-right: 10px;
      .abnormal1 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .abnormal-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
      .ab {
        flex: 1;
        border-top: 2px solid rgb(0, 187, 236);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .down-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }

    .top4 {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      margin-right: 10px;
      .abnormal2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .abnormal-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
      .ab {
        flex: 1;
        border-top: 2px solid rgb(0, 187, 236);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .down-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }
    .top5 {
      flex: 1;
      border: 2px solid rgb(0, 187, 236);
      margin-top: 10px;
      .mtbf {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 22px;
          margin: 0;
        }
        .mtbf-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
      .mttr {
        flex: 1;
        border-top: 2px solid rgb(0, 187, 236);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        h1 {
          font-size: 24px;
          margin: 0;
        }
        .mttr-num {
          display: flex;
          justify-content: center;
          width: 100%;
          color: rgb(6, 235, 0);
          .card-panel-num {
            font-size: 30px;
            font-weight: bold;
            margin-right: 10px;
          }
          p {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
          }
        }
      }
    }
  }
}

.middle-map .map-wrap .title-map {
  position: absolute;
  left: 50%;
  top: 20%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  font-size: 0.5625em;
}
.fullscreen_warp {
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  z-index: 100000000;
  position: relative;
  height: 100%;
}
#map {
  height: 760px;
  width: 100%;
  // margin-top: 150px;
  border: 2px solid rgb(0, 187, 236);
}
#mapCard {
  height: 100%;
}
#map img {
  width: 100%;
  height: 100%;
}

iframe {
  width: 99.7%;
  border: 2px solid rgb(0, 187, 236);
  height: 84.8%;
}
.main .aside-right .pie,
.main .aside-right .trend {
  position: relative;
}

.main .aside-right .keys {
  position: relative;
  height: 20%;
  margin-bottom: 2.5%;
}

.main .aside-right .keys h3 {
  height: 40%;
  padding-top: 6%;
  margin-left: 5%;
}

.main .aside-right .keys .con {
  height: 42%;
  margin: 0 20px;
  background: #081d5d;
}

.main .aside-right .keys .con dl {
  width: 33.3%;
  height: 100%;
  padding: 10px 0 0 10px;
}

.main .aside-right .keys .con dl dt {
  height: 40%;
  font-size: 24px;
  color: #128df0;
}

.main .aside-right .keys .con dl dd {
  height: 60%;
  font-family: Rubik;
  font-size: 28px;
  font-weight: 300;
  color: #fff;
}

.main .aside-right .keys .con .middle {
  position: relative;
}

.main .aside-right .keys .con .middle:before,
.main .aside-right .keys .con .middle:after {
  position: absolute;
  top: 20%;
  width: 1px;
  height: 60%;
  background: rgba(255, 255, 255, 0.1);
  content: "";
}

.main .aside-right .keys .con .middle:before {
  left: 0;
}

.main .aside-right .keys .con .middle:after {
  right: 0;
}

.main .aside-right .pie {
  position: relative;
  height: 500px;
  // top: 10px;
  margin-bottom: 2.5%;
  background: url("../assets/bg1_1.png") no-repeat;
  background-size: cover;
}

.main .aside-right .pie:before {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/bor1_4.png") no-repeat;
  background-size: 100% 100%;
  content: "";
  color: #3232321a;
}

.main .aside-right .pie h3 {
  // height: 16%;
  // text-align: center;
  padding: 0;
  margin: 0;
  font-size: 25px;
  padding-left: 40px;
}
.agv-num {
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  right: 10px;
  top: 35px;
}
.main .aside-right .pie .pie1 {
  width: 100%;
  height: 100%;
  padding-top: 8%;
}

.main .aside-right .pie .pie2 {
  width: 50%;
  height: 100%;
  padding-top: 8%;
}

.main .aside-right .pie .legend {
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 80%;
  min-width: 280px;
  font-size: 0.3125em;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

.main .aside-right .pie .legend span {
  position: relative;
  margin-right: 1%;
}

.main .aside-right .pie .legend span:before {
  display: inline-block;
  position: relative;
  top: 1px;
  width: 1em;
  height: 1em;
  margin-right: 1%;
  content: "";
}

.main .aside-right .pie .legend span:nth-of-type(1):before {
  background: #0239a7;
}

.main .aside-right .pie .legend span:nth-of-type(2):before {
  background: #fff;
}

.main .aside-right .pie .legend span:nth-of-type(3):before {
  background: #24feb4;
}

.main .aside-right .pie .legend span:nth-of-type(4):before {
  background: #23539b;
}

.main .aside-right .pie .legend span:nth-of-type(5):before {
  background: #3c9de4;
}

.main .aside-right .area-rank {
  position: relative;
  height: 320px;
  margin-bottom: 2.3%;
  background: url("../assets/bg1_3.png") no-repeat;
  background-size: cover;
}

.main .aside-right .area-rank:after {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/bor1_5.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}

.main .aside-right .area-rank h3 {
  height: 10px;
  padding-top: 7%;
  margin-left: 5%;
  margin-bottom: 0;
  font-size: 20px;
}

.main .aside-right .area-rank .con {
  position: relative;
  height: 75%;
  margin: 0 0 5% 5%;
  font-size: 0.3125em;
  color: #07bffb;
}

#bar2 {
  margin: 0;
}

.main .aside-right .area-rank .con .bar .bar-in {
  display: block;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#2690cf),
    to(#00fecc)
  );
  background: linear-gradient(to right, #2690cf, #00fecc);
}

.main .aside-right .area-rank .con .rank-value {
  font-size: 1em;
}

@media screen and (max-width: 3850px) {
  .main .aside-right .area-rank .con .rank-value {
    width: 100px;
    margin-left: 30px;
  }
}

@media screen and (max-width: 1930px) {
  .main .aside-right .area-rank .con .rank-value {
    width: 50px;
    margin-left: 15px;
  }
}

.main .aside-right .trend {
  position: absolute;
  // bottom: 0;
  width: 100%;
  height: 500px;
  background: url("../assets/bg1_3.png") no-repeat;
  background-size: cover;
}

.main .aside-right .trend:before {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/bor1_6.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}

.main .aside-right .trend h3 {
  height: 10px;
  padding-top: 5%;
  margin-left: 5%;
  font-size: 25px;
}
.el-carousel {
  margin: 10px;
}
.main-bottom {
  width: 100%;
  height: 5px;
}
.status_circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(6, 235, 0);
  border: 0;
  margin-left: 50%;
}
.status_circle1 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  border: 0;
  margin-left: 50%;
}
.status_circle2 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(255, 174, 0);
  border: 0;
  margin-left: 50%;
}
.main-bottom span {
  display: inline-block;
  height: 100%;
  background: #02336b;
}

.pressRotate {
  -webkit-animation: mymove 0.5s ease-in;
  animation: mymove 0.5s ease-in;
}

@keyframes mymove {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }

  100% {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}

@-webkit-keyframes mymove {
  0% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }

  100% {
    -webkit-transform: rotateX(360deg);
    transform: rotateX(360deg);
  }
}
</style>
