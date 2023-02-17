<template>
  <div class="container">
    <div class="gifImg">
      <h1>AGV即时状态</h1>
    </div>
    <div class="main clearfix">
      <div class="aside-left fl">
        <div class="top left-top">
          <h3 class="agvstate">AGV状态</h3>
          <div class="btngroup">
            <!-- <el-button class="all" @click="drawer = true">展开全部</el-button> -->
            <span><i class="el-icon-warning-outline"></i></span>
            <span><i class="el-icon-refresh"></i></span>
            <span><i class="el-icon-download"></i></span>
            <span @click="drawer = true"><i class="el-icon-full-screen"></i></span>
          </div>
          <el-drawer
            title="全部车辆"
            size="85%"
            :visible.sync="drawer"
            append-to-body
            :direction="direction"
            :before-close="handleClose"
          >
            <div class="drawer-body">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-input
                    placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getUserList"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getUserList"
                    ></el-button>
                  </el-input>
                </el-col>
              </el-row>

              <el-table
                :data="tableData"
                border
                :row-class-name="tableRowClassName"
                style="width: 95%"
                :height="600"
                :cell-style="styleCar"
                @current-change="handleCurrentChange"
              >
                <el-table-column prop="agvList.agvId" label="车号">
                </el-table-column>
                <el-table-column prop="agvList.abnormal" label="异常状态"> </el-table-column>
                <el-table-column prop="agvList.agvArea" label="当前位置">
                </el-table-column>
                <el-table-column prop="agvList.taskId" label="任务单号" >
                </el-table-column>
                <el-table-column prop="agvList.taskStatus" label="任务状态">
                </el-table-column>
                <el-table-column prop="agvList.fromto" label="From-To">
                </el-table-column>
                <el-table-column prop="agvList.now" label="当前卡号">
                </el-table-column>
                <el-table-column prop="agvList.speed" label="速度"> </el-table-column>
                <el-table-column prop="agvList.batteryLevel" label="电量">
                </el-table-column>
                <el-table-column prop="agvList.cargo" label="载货状态"> </el-table-column>
              </el-table>
              <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                background
              >
              </el-pagination> -->
            </div>
          </el-drawer>

          <div class="table">
            <el-table
              :data="tableData1"
              :row-class-name="tableRowClassName"
              style="width: 100%"
              :cell-style="styleCar"
            >
              <!-- <el-table-column type="index" width="40"></el-table-column> -->
              <el-table-column prop="code" label="设备编号" width="120">
              </el-table-column>
              <el-table-column prop="taskState" label="任务状态" width="120">
              </el-table-column>
              <el-table-column prop="carState" label="设备状态" width="120">
              </el-table-column>
              <el-table-column prop="location" label="位置" width="90">
              </el-table-column>
              <!-- <el-table-column prop="id" label="任务ID"> </el-table-column> -->
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="5"
                layout="sizes, total, prev, pager, next"
                :total="10"
                small
                background
              >
              </el-pagination>
          </div>
        </div>
        <div class="bottom left-bottom">
          <div class="bottom-in">
            <h3 class="agvstate">车辆操作</h3>
            <div class="btn">
              <el-button class="all" @click="dialogTableVisible = true"
                >打开监控</el-button
              >
            </div>
          </div>
          <div class="btn-group">
            <el-button>启动车辆</el-button>
            <el-button>停止车辆</el-button>
            <el-button>车辆充电</el-button>
            <el-button>回待命区</el-button>
            <el-button>测试按钮</el-button>
            <el-button>测试按钮</el-button>
            <el-button>测试按钮</el-button>
            <el-button>测试按钮</el-button>
            <el-button>测试按钮</el-button>
          </div>
        </div>
      </div>
      <div class="middle-map fl">
        <div class="car-container">
          <div class="car">
            <div class="car-message">
              <div class="car-name">
                <h1>AGV006</h1>
              </div>
              <div class="nav-text">
                <h1 class="title" ref="acp" style="">前防撞条</h1>
                <div class="line"></div>
                <div>
                  <div ref="acp1" style="">状态：正常</div>
                </div>
              </div>
              <div class="drive-text">
                <h1 class="title" style="" ref="acp2">左驱动轮组</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp3">状态：正常</div>
                  <div style="" ref="acp4">转速：XXX</div>
                </div>
              </div>
              <div class="jackup-text">
                <h1 class="title" style="" ref="acp5">顶升模组</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp6">状态：正常</div>
                </div>
              </div>
              <div class="battery-text">
                <h1 class="title" style="" ref="acp18">后防撞条</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp19">状态：正常</div>
                </div>
              </div>
            </div>
            <div class="car-body">
              <img src="../assets/agv3.png" alt="" />
              <div class="top-nav">
                <div class="top1"></div>
              </div>
              <div
                class="center"
                @mouseover="mousuOver2"
                @mouseleave="mouseLeave2"
              ></div>
              <div
                class="circle"
                @mouseover="mousuOver3"
                @mouseleave="mouseLeave3"
              ></div>
              <div class="battery"></div>
              <div
                class="drive-left"
                @mouseover="mousuOver4"
                @mouseleave="mouseLeave4"
              ></div>
              <div
                class="drive-right"
                @mouseover="mousuOver5"
                @mouseleave="mouseLeave5"
              ></div>
              <div class="stop-left">
                <div class="bottom"></div>
                <div class="middle"></div>
                <div class="top"></div>
              </div>
              <div class="stop-right">
                <div class="top1"></div>
                <div class="middle1"></div>
                <div class="bottom1"></div>
              </div>
              <div
                class="article-crash-top"
                @mouseover="mousuOver"
                @mouseleave="mouseLeave"
              ></div>
              <div
                class="article-crash-bottom"
                @mouseover="mousuOver1"
                @mouseleave="mouseLeave1"
              ></div>
            </div>
            <div class="car-message-right">
              <div class="nav-text">
                <h1 class="title" style="" ref="acp11">障碍物传感器</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp12">状态：异常</div>
                </div>
              </div>
              <div class="drive-text">
                <h1 class="title" style="" ref="acp13">右驱动轮组</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp14">状态：正常</div>
                  <div style="" ref="acp15">转速：XXX</div>
                </div>
              </div>
              <div class="jackup-text">
                <h1 class="title" style="" ref="acp16">扫码模组</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp17">状态：正常</div>
                </div>
              </div>
              <div class="battery-text">
                <h1 class="title" style="" ref="acp7">电池模组</h1>
                <div class="line"></div>
                <div>
                  <div style="" ref="acp8">状态：异常</div>
                  <div style="" ref="acp9">电量：80%</div>
                  <div style="" ref="acp10">温度：37.5°</div>
                </div>
              </div>
            </div>
          </div>
          <div class="video" v-show="videoShow">
            <div class="video-header">
              <div class="title">
                视频监控
              </div>
              <div @click="videoShow = false">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <div>
              <vueMiniPlayer
                ref="vueMiniPlayer"
                :video="video"
                :mutex="true"
                @fullscreen="handleFullscreen"
              />
            </div>
          </div>
          <div class="car-bottom">
            <div class="left-dial">
              <el-progress
                type="circle"
                :percentage="80"
                :format="changeTitle"
              ></el-progress>
              <el-progress
                type="circle"
                :percentage="85"
                color="rgb(19,206,102)"
                :format="changeElectricity"
              ></el-progress>
            </div>
            <div id="speed" style="width: 70%;height:100%"></div>
            <div class="box">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
              <div class="line4"></div>
            </div>
            <div class="right-dial">
              <el-progress
                type="circle"
                :percentage="100"
                :format="changeArea"
              ></el-progress>
              <el-progress
                type="circle"
                :percentage="65"
                color="rgb(19,206,102)"
                :format="changeTask"
              ></el-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="aside-right fl">
        <div class="pie clearfix">
          <div class="pie1 fl">
            <h3>任务状态</h3>
            <div class="step" style="height: 300px;">
              <el-steps
                direction="vertical"
                :active="1"
                finish-status="success"
              >
                <el-step title="上一卡号" description="正在上料中"></el-step>
                <el-step
                  title="当前卡号"
                  description="正在对接中，持续时间30秒"
                ></el-step>
                <el-step
                  title="下一卡号"
                  description="这是一段很长很长很长的描述性文字"
                ></el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <div class="trend">
          <h3>车辆日志</h3>

          <div class="log">
            <el-tabs
              v-model="activeName"
              type="border-card"
              @tab-click="handleClick"
            >
              <el-tab-pane label="正常信息" name="first">
                <div class="right">
                  <span> 2021/11/20 18:00</span><span>空闲中</span>
                </div>

                <div class="right">
                  <span> 2021/11/20 15:34</span><span>回流任务完成</span>
                </div>
                <div class="right">
                  <span> 2021/11/20 15:04</span><span>在卡号243242下料</span>
                </div>
                <div class="right">
                  <span> 2021/11/20 14:34</span><span>在卡号243233上料</span>
                </div>

                <div class="right">
                  <span> 2021/11/20 13:34</span><span>接到任务回流任务</span>
                </div>
                <div class="right">
                  <span> 2021/11/20 12:54</span><span>完成任务</span>
                </div>

                <div class="right">
                  <span> 2021/11/20 11:34</span><span>在卡号243242下料</span>
                </div>

                <div class="right">
                  <span> 2021/11/20 09:34</span><span>在卡号24323上料</span>
                </div>

                <div class="right">
                  <span> 2021/11/20 08:34</span><span>接到任务2000213</span>
                </div>
              </el-tab-pane>
              <el-tab-pane label="警告信息" name="second">
                <div class="warn">
                  <span> 2021/11/20 18:00</span><span>路线异常</span>
                </div>

                <div class="warn">
                  <span> 2021/11/20 16:54</span><span>障碍物报警</span>
                </div>

                <div class="warn">
                  <span> 2021/11/20 11:34</span><span>障碍物报警</span>
                </div>

                <div class="warn">
                  <span> 2021/11/20 09:34</span><span>路线异常</span>
                </div>
                <div class="warn">
                  <span> 2021/11/20 09:00</span><span>障碍物报警</span>
                </div>

                <div class="warn">
                  <span> 2021/11/20 08:34</span><span>路线异常</span>
                </div>
              </el-tab-pane>
              <el-tab-pane label="异常信息" name="third">
                <div class="leave">
                  <span> 2021/11/20 19:34</span><span>断网</span>
                </div>
                <div class="leave">
                  <span> 2021/11/20 17:14</span><span>车子脱轨</span>
                </div>
                <div class="leave">
                  <span> 2021/11/20 14:34</span><span>车子脱轨</span>
                </div>
                <div class="leave">
                  <span> 2021/11/20 10:34</span><span>断网</span>
                </div>
                <div class="leave">
                  <span> 2021/11/20 08:54</span><span>车子脱轨</span>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="视频监控" :visible.sync="dialogTableVisible" width="60%">
      <div>
        <vueMiniPlayer
          ref="vueMiniPlayer"
          :video="video"
          :mutex="true"
          @fullscreen="handleFullscreen"
        />
      </div>
      <div class="btnlist">
        <el-button>车辆前进</el-button>
        <el-button>车辆后退</el-button>
        <el-button>车辆旋转</el-button>
        <el-button>车辆上料</el-button>
        <el-button>车辆下料</el-button>
        <el-button>车辆充电</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EleResize } from "/Dashboard/dashboard/static/js/esresize";
export default {
  data() {
    return {
      drawer: false,
      dialogTableVisible:false,
      videoShow: false,
      activeName: "first",
      currentPage4: 1,
      direction: "ltr",
      isShow: false,
      show: false,
      code: false,
      battery: false,
      display: false,
      drawerWidth: "1000px",
      queryInfo: {
        query: "",
        // 当前的页数
        currPage: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      tableData: [],
      tableData1: [
        {
          name: "二维码AGV",
          code: "AGV1",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102"
        },
        {
          name: "二维码AGV",
          code: "AGV2",
          taskState: "任务中",
          carState: "离线",
          location: "电梯口",
          id: "202102"
        },
        {
          name: "二维码AGV",
          code: "AGV3",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102"
        },
        {
          name: "二维码AGV",
          code: "AGV4",
          taskState: "任务中",
          carState: "离线",
          location: "电梯口",
          id: "202102"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102"
        },
        {
          name: "二维码AGV",
          code: "AGV6",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102"
        }
      ],
      video: {
        url: "http://47.105.206.28/videos/wangkun.mp4",
        cover: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
        muted: false,
        loop: false,
        preload: "auto",
        poster: "",
        volume: 1,
        autoplay: false
      }
    };
  },
  mounted() {
    this.getAgvList()
    this.getSpeed();
  },
  computed: {
    $video() {
      return this.$refs.vueMiniPlayer.$video;
    }
  },
  methods: {
    handleClose(done) {
      done();
    },
    async getAgvList() {
      const { data: res } = await this.$http.post("/getSystemInfo", {
        query: {},
        pagenum: "",
        pagesize: "",
        floor: ''
      });
      this.tableData = res

    },
    handleFullscreen() {},
    changeTask(percentage) {
      return "任务进度" + "\n" + "\n" + percentage + "%";
    },
    changeArea() {
      return "所属区域" + "\n" + "\n" + "LCM3";
    },
    changeElectricity(percentage) {
      return "电量" + "\n" + "\n" + percentage + "%";
    },
    changeTitle(percentage) {
      return "总里程" + "\n" + "\n" + "20km";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    backHome() {
      this.$router.push("/first");
    },
    styleCar({ row, column, rowIndex, columnIndex }) {
      if (row.carState == "离线") {
        // return { color: "red ", fontWeight: "bold" };
      }
    },
    mousuOver() {
      var acps = this.$refs.acp;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp1;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave() {
      var acps = this.$refs.acp;
      acps.style.color = "";
      var acps1 = this.$refs.acp1;
      acps1.style.color = "";
    },
    mousuOver1() {
      var acps = this.$refs.acp18;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp19;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave1() {
      var acps = this.$refs.acp18;
      acps.style.color = "";
      var acps1 = this.$refs.acp19;
      acps1.style.color = "";
    },
    mousuOver2() {
      var acps = this.$refs.acp5;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp6;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave2() {
      var acps = this.$refs.acp5;
      acps.style.color = "";
      var acps1 = this.$refs.acp6;
      acps1.style.color = "";
    },
    mousuOver3() {
      var acps = this.$refs.acp16;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp17;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave3() {
      var acps = this.$refs.acp16;
      acps.style.color = "";
      var acps1 = this.$refs.acp17;
      acps1.style.color = "";
    },
    mousuOver4() {
      var acps2 = this.$refs.acp2;
      acps2.style.color = "rgb(6, 255, 0)";
      var acps = this.$refs.acp3;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp4;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave4() {
      var acps2 = this.$refs.acp2;
      acps2.style.color = "";
      var acps = this.$refs.acp3;
      acps.style.color = "";
      var acps1 = this.$refs.acp4;
      acps1.style.color = "";
    },
    mousuOver5() {
      var acps2 = this.$refs.acp13;
      acps2.style.color = "rgb(6, 255, 0)";
      var acps = this.$refs.acp14;
      acps.style.color = "rgb(6, 255, 0)";
      var acps1 = this.$refs.acp15;
      acps1.style.color = "rgb(6, 255, 0)";
    },
    mouseLeave5() {
      var acps2 = this.$refs.acp13;
      acps2.style.color = "";
      var acps = this.$refs.acp14;
      acps.style.color = "";
      var acps1 = this.$refs.acp15;
      acps1.style.color = "";
    },
    getSpeed() {
      var chartDom = document.getElementById("speed");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        // backgroundColor: "#000",
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          // left
          {
            name: "gauge 0",
            type: "gauge",
            min: -200,
            max: 250,
            startAngle: -30,
            endAngle: -315,
            splitNumber: 9,
            radius: "55%",
            center: ["21%", "55%"],
            axisLine: {
              lineStyle: {
                color: [[1, "#AE96A6"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {},
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            title: {
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              color: "#fff",
              offsetCenter: [0, "-40%"]
            },
            progress: {
              show: true,
              width: 3,
              itemStyle: {
                color: "#fff"
              }
            },
            data: [
              {
                value: 20,
                name: "rpm*1000"
              }
            ]
          },
          {
            name: "gauge 1",
            type: "gauge",
            min: 0,
            max: 20,
            startAngle: -140,
            endAngle: -305,
            splitNumber: 5,
            radius: "55%",
            center: ["21%", "55%"],
            axisLine: {
              lineStyle: {
                color: [[1, "#AE96A6"]]
              }
            },
            splitLine: {
              distance: -7,
              length: 12,
              lineStyle: {
                color: "#fff",
                width: 4
              }
            },
            axisTick: {
              distance: -8,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            axisLabel: {
              distance: 14,
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "Arial",
              color: "#fff"
            },
            anchor: {},
            pointer: {
              icon:
                "path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z",
              width: 5,
              length: "40%",
              offsetCenter: [0, "-58%"],
              itemStyle: {
                color: "#f00",
                shadowColor: "rgba(255, 0, 0)",
                shadowBlur: 5,
                shadowOffsetY: 2
              }
            },
            title: {
              color: "#fff",
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "Arial",
              offsetCenter: [15, 30]
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: "速度档位：\n \n Lv5"
              }
            ]
          },
          // middle
          {
            name: "gauge 2",
            type: "gauge",
            min: 0,
            max: 8,
            z: 10,
            startAngle: 210,
            endAngle: -30,
            splitNumber: 8,
            radius: "70%",
            center: ["50%", "50%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                color: [
                  [0.825, "#fff"],
                  [1, "#f00"]
                ]
              }
            },
            splitLine: {
              distance: 20,
              length: 15,
              lineStyle: {
                color: "auto",
                width: 4,
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 15,
                shadowOffsetY: -10
              }
            },
            axisTick: {
              distance: 20,
              length: 8,
              lineStyle: {
                color: "auto",
                width: 2,
                shadowColor: "rgba(255, 255, 255)",
                shadowBlur: 10,
                shadowOffsetY: -10
              }
            },
            axisLabel: {
              distance: 10,
              fontSize: 35,
              fontWeight: 800,
              fontFamily: "Arial",
              color: "#fff"
            },
            anchor: {},
            pointer: {
              icon:
                "path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z",
              width: 10,
              offsetCenter: [0, "-10%"],
              length: "75%",
              itemStyle: {
                color: "#f00",
                shadowColor: "rgba(255, 0, 0)",
                shadowBlur: 5,
                shadowOffsetY: 3
              }
            },
            title: {
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              offsetCenter: [0, "-40%"]
            },
            data: [
              {
                value: 1.1,
                name: "m/s"
              }
            ],
            detail: {
              show: false
            }
          },
          {
            name: "gauge 3",
            type: "gauge",
            min: 0,
            max: 8,
            z: 10,
            splitNumber: 8,
            radius: "70%",
            axisLine: {
              lineStyle: {
                width: 14,
                color: [[1, "#AE96A6"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {},
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              offsetCenter: ["15%", "50%"],
              formatter: "{a|{value}}{b|m/s}",
              rich: {
                a: {
                  fontSize: 42,
                  fontWeight: 800,
                  fontFamily: "Arial",
                  color: "#fff",
                  align: "center",
                  padding: [0, 5, 0, 0]
                },
                b: {
                  fontSize: 14,
                  fontWeight: 800,
                  fontFamily: "Arial",
                  color: "#fff",
                  padding: [0, 0, 20, 0]
                }
              }
            },
            // value is speed
            data: [
              {
                value: 1.1,
                name: ""
              }
            ]
          },
          // right
          {
            name: "gauge 4",
            type: "gauge",
            min: 0,
            max: 8,
            startAngle: 135,
            endAngle: -150,
            splitNumber: 8,
            radius: "55%",
            center: ["79%", "55%"],
            axisLine: {
              lineStyle: {
                color: [[1, "#AE96A6"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {},
            pointer: {
              show: false
            },
            title: {},
            detail: {
              offsetCenter: ["-15%", 0],
              formatter: [
                "{a|                  }",
                "{a|电流        80}{b|      A}",
                "{a|温度        37.5}{b|   ℃}",
                "{a|电压        00.0}{b|  V}",
                "{a|}"
              ].join("\n"),
              rich: {
                a: {
                  fontSize: 14,
                  fontWeight: 800,
                  fontFamily: "Arial",
                  lineHeight: 22,
                  color: "#fff",
                  align: "left"
                },
                b: {
                  fontWeight: 600,
                  fontFamily: "Arial",
                  lineHeight: 22,
                  color: "#fff",
                  align: "left"
                }
              }
            },
            progress: {
              show: true,
              width: 3,
              itemStyle: {
                color: "#fff"
              }
            },
            data: [
              {
                value: 250,
                name: ""
              }
            ]
          },
          {
            name: "gauge 5",
            type: "gauge",
            min: 0,
            max: 1,
            startAngle: 125,
            endAngle: 55,
            splitNumber: 2,
            radius: "54%",
            center: ["79%", "55.3%"],
            axisLine: {
              lineStyle: {
                width: 9,
                color: [
                  [0.15, "#f00"],
                  [1, "rgba(255, 0, 0, 0)"]
                ]
              }
            },
            splitLine: {
              distance: -14,
              length: 16,
              lineStyle: {
                color: "#fff",
                width: 4
              }
            },
            axisTick: {
              distance: -14,
              length: 10,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            axisLabel: {
              distance: 12,
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "Arial",
              color: "#fff",
              formatter: function(value) {
                if (value === 0.5) {
                  return "2/4";
                }
                if (value === 1) {
                  return "4/4";
                }
                return value + "";
              }
            },
            progress: {
              show: true,
              width: 5,
              itemStyle: {
                color: "#fff"
              }
            },
            // anchor: {
            //   show: true,
            //   itemStyle: {},
            //   offsetCenter: ["-22%", "-57%"],
            //   size: 18,
            //   icon:
            //     "path://M1.11979167,1.11111112 C1.11979167,0.497461393 1.61725306,0 2.23090279,0 L12.2309028,0 C12.8445525,1.43824153e-08 13.3420139,0.497461403 13.3420139,1.11111112 L13.3420139,10 L15.5642361,10 C16.7915356,10 17.7864583,10.9949228 17.7864583,12.2222222 L17.7864583,16.6666667 C17.7865523,17.28025 18.2839861,17.7776077 18.8975694,17.7776077 C19.5111527,17.7776077 20.0085866,17.28025 20.0086805,16.6666667 L20.0086805,8.88888888 L17.7864583,8.88888888 C17.1728086,8.88888888 16.6753472,8.3914275 16.6753472,7.77777779 L16.6753472,3.79333333 L15.6197917,2.73777777 C15.1859413,2.30392741 15.1859413,1.60051702 15.6197917,1.16666667 L15.6197917,1.16666667 C16.053642,0.732816318 16.7570524,0.732816318 17.1909028,1.16666667 L21.9053472,5.88111112 C22.1140468,6.08922811 22.2312072,6.37193273 22.2309028,6.66666667 L22.2309028,16.6666667 C22.2309028,18.5076158 20.7385186,20 18.8975695,20 C17.0566203,20 15.5642361,18.5076158 15.5642361,16.6666667 L15.5642361,12.2222222 L13.3420139,12.2222222 L13.3420139,17.7777778 L13.3420139,17.7777778 C13.9556636,17.7777778 14.453125,18.2752392 14.453125,18.8888889 L14.453125,18.8888889 C14.453125,19.5025386 13.9556636,20 13.3420139,20 L1.11979165,20 C0.506141934,20 0.00868054688,19.5025386 0.00868054687,18.8888889 L0.00868054687,18.8888889 C0.00868054688,18.2752392 0.506141934,17.7777778 1.11979165,17.7777778 L1.11979167,17.7777778 L1.11979167,1.11111112 Z M3.34201388,2.22222221 L3.34201388,8.88888888 L11.1197917,8.88888888 L11.1197917,2.22222221 L3.34201388,2.22222221 Z"
            // },
            pointer: {
              show: false
            },
            title: {},
            detail: {
              offsetCenter: ["10%", "-56%"],
              formatter: "{a|}{b|}",
              rich: {
                a: {
                  fontSize: 15,
                  fontWeight: 800,
                  fontFamily: "Arial",
                  color: "#fff"
                },
                b: {
                  fontWeight: 600,
                  fontFamily: "Arial",
                  color: "#fff"
                }
              }
            },
            data: [
              {
                value: 0.85,
                name: ""
              }
            ]
          },
          {
            name: "gauge 6",
            type: "gauge",
            min: -120,
            max: -60,
            startAngle: 230,
            endAngle: 310,
            clockwise: false,
            splitNumber: 2,
            radius: "55%",
            center: ["79%", "55%"],
            axisLine: {
              lineStyle: {
                color: [
                  [1, "#AE96A6"],
                  [1.1, "#f00"]
                ]
              }
            },
            splitLine: {
              distance: -8,
              length: 12,
              lineStyle: {
                color: "#fff",
                width: 4
              }
            },
            axisTick: {
              splitNumber: 3,
              length: 8,
              distance: -8,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            axisLabel: {
              distance: 14,
              fontSize: 18,
              fontWeight: 800,
              fontFamily: "Arial",
              color: "#fff",
              formatter: function(value) {
                return -value + "";
              }
            },
            anchor: {
              show: true,
              itemStyle: {},
              offsetCenter: [0, "55%"],
              size: 20,
              icon:
                "path://M-34.1-1.1L-34.1-1.1c0-0.3-0.3-0.6-0.6-0.6h-3.6v-1.5c0-0.5-0.2-0.9-0.6-1.1s-0.9-0.2-1.3,0c-0.4,0.2-0.6,0.7-0.6,1.1V7.9c0,0,0,0.1,0,0.1c-0.8,0.5-1.2,1.5-0.9,2.5c0.3,0.9,1.1,1.6,2.1,1.6c1,0,1.8-0.6,2.1-1.5c0.3-0.9,0-1.9-0.8-2.5V6.3h3.5c0.4,0,0.7-0.3,0.7-0.7l0,0c0-0.4-0.3-0.7-0.7-0.7h-3.5V2.9h3.5c0.4,0,0.7-0.3,0.7-0.7l0,0c0-0.4-0.3-0.7-0.7-0.7h-3.5v-2.1h3.6C-34.4-0.5-34.1-0.8-34.1-1.1z M-44.9,11.6c-0.7,0-1.4-0.2-2-0.6c-0.4-0.3-0.9-0.4-1.4-0.4c-0.4,0-0.9,0.2-1.2,0.4c-0.4,0.2-1.4-0.9-0.9-1.3c0.6-0.4,1.3-0.6,2-0.7c0.8,0,1.5,0.2,2.2,0.5c0.4,0.3,0.9,0.4,1.3,0.4c0.6,0,1.1-0.2,1.5-0.6s1.6,0.7,0.9,1.3S-44,11.6-44.9,11.6L-44.9,11.6z M-34.3,11.6c-0.7,0-1.4-0.3-2-0.7c-0.6-0.4,0.5-1.6,0.9-1.3s0.8,0.4,1.2,0.4c0.5,0,1-0.1,1.4-0.4c0.6-0.3,1.3-0.5,2-0.6h0c0.9,0,1.7,0.3,2.4,0.9c0.7,0.5-0.5,1.6-0.9,1.3c-0.4-0.3-1-0.6-1.5-0.6h0c-0.5,0-0.9,0.2-1.3,0.4c-0.6,0.3-1.3,0.5-2,0.6H-34.3z M-33.5,16.3c-0.7,0-1.4-0.3-1.9-0.8c-0.4-0.3-0.6-0.5-1-0.5c-0.4,0-0.7,0.2-1,0.4c-0.6,0.5-1.3,0.7-2,0.7c-0.7,0-1.4-0.3-1.9-0.8c-0.2-0.3-0.6-0.4-0.9-0.4c-0.4,0-0.7,0.1-1.1,0.5c-0.6,0.5-1.3,0.7-2.1,0.7c-0.7-0.1-1.4-0.4-1.9-0.9c-0.4-0.3-0.6-0.5-1-0.5c-0.3,0-0.6,0.2-0.9,0.4s-1.6-0.7-1.1-1.2c0.5-0.5,1.2-0.8,1.9-0.9c1-0.1,1.6,0.4,2.1,0.8c0.3,0.3,0.6,0.5,1,0.5c0.4,0,0.6-0.1,1-0.4c0.6-0.5,1.4-0.8,2.1-0.8c0.7,0,1.4,0.3,1.9,0.8c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.6-0.1,1-0.4c0.6-0.5,1.3-0.7,2-0.7c0.8,0,1.5,0.3,2,0.9c0.4,0.3,0.6,0.4,0.9,0.4c0.3,0,0.7-0.2,1.1-0.5c0.5-0.4,1.2-0.9,2.3-0.8c0.7,0,1.4,0.3,1.9,0.7c0.5,0.4-0.7,1.5-1,1.3s-0.6-0.4-1-0.4c-0.4,0-0.7,0.2-1.2,0.5C-32,15.9-32.7,16.2-33.5,16.3L-33.5,16.3z"
            },
            pointer: {
              icon:
                "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 15,
              length: "4",
              offsetCenter: [0, "-90%"],
              itemStyle: {
                color: "#f00"
              }
            },
            title: {},
            detail: {
              show: false
            },
            data: [
              {
                value: -120,
                name: ""
              }
            ]
          }
        ]
      };
      let listener = function() {
        myChart.resize();
      };
      EleResize.on(chartDom, listener);

      option && myChart.setOption(option);
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
    getUserList() {},
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@-webkit-keyframes twinkling {
  /*透明度由0到1*/
  0% {
    opacity: 0.2; /*透明度为0*/
  }
  100% {
    opacity: 0.6; /*透明度为1*/
  }
}
/deep/.el-table .warning-row {
  background: rgba(38, 66, 105, 0.5);
}

/deep/.el-table .success-row { //这里可以修改颜色
  background-image: linear-gradient(to left, rgba(3, 58, 141, 0.685) 0%,rgba(15, 30, 56, 0.8) 65%, rgba(22, 58, 109, 0.699) 100%);
}
.container {
  background-image: url("../assets/bg.png");
  background-color: #001142;
  background-size: 100% 100%;
  height: 100%;
  padding: 10px;
}
.table-title {
  //   margin-top: 20px;
  color: rgb(6, 255, 0);
  font-size: 28px;
  font-weight: bold;
}
.all-car {
  flex: 1;
}
.car-title {
  position: absolute;
  top: 0;
  left: 30px;
  width: 320px;
  height: 140px;
  background: url("../assets/tip-bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h1 {
    margin-right: 50px;
    color: #fefefe;
    font-size: 40px;
    padding: 12px 0;
    font-family: system-ui;
    font-style: oblique;
    text-shadow: 0px 1px 0.5em #05c3ff, 0px 2px 0px #05c3ff, 0px 3px 0px #05c3ff,
      0px 4px 0px #05c3ff, 0px 5px 10px rgba(5, 195, 255, 0.9);
  }
}
.back {
  position: absolute;
  font-size: 30px;
  color: #fff;
  left: 50px;
  padding: 20px;
  text-shadow: 0px 1px 0.5em #05c3ff, 0px 2px 0px #05c3ff, 0px 3px 0px #05c3ff,
    0px 4px 0px #05c3ff, 0px 5px 10px rgba(5, 195, 255, 0.9);
  cursor: pointer;
}
.gifImg {
  width: 100%;
  position: relative;
  top: 0;
  min-height: 50px;
  overflow: hidden;
  text-align: center;
  // color: #33333300;
}
.gifImg h1 {
  margin: 0;
  color: #fefefe;
  font-size: 50px;
  padding: 12px 0;
  font-family: system-ui;
  font-style: oblique;
  text-shadow: 0px 1px 0.5em #05c3ff, 0px 2px 0px #05c3ff, 0px 3px 0px #05c3ff,
    0px 4px 0px #05c3ff, 0px 5px 10px rgba(5, 195, 255, 0.9);
  // text-shadow: 0 0 0.5em #05c3ff, 0 0 0.2em #5c5c5c;
   background-image: linear-gradient(to left, #0d48a1da 0%,#073daa52 25%,#1b4599a8 50%,#1a47a1a8 75%, #0d56e9a8 100%);
  margin-bottom: 8px;
}

// .gifImg:after {
//   content: "";
//   top: 38%;
//   left: 50%;
//   -webkit-transform: translate(-50%, 20%);
//   transform: translate(-50%, 20%);
//   display: block;
//   position: absolute;
//   width: 36.5%;
//   min-width: 700px;
//   height: 100%;
//   background: url(../assets/header.gif) no-repeat center center;
//   background-size: 100%;
// }
.car-container {
  // display: flex;
  width: 100%;
}

.car {
  flex: 1;
  position: relative;
  top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // border: 2px solid #05c3ff;
  // background: rgba(34, 98, 194, 0.3) linear-gradient(to right, rgba(44, 83, 141, 0.4), rgba(2, 59, 112, 0.2));;
background-image: linear-gradient(to left, #0d48a1da 0%,#073daa52 25%, #295dfc6c 50%,#1a47a1a8 75%,#0d48a1da 100%);
  padding: 10px 0;
  .car-message {
    // margin-top: 12px;
    .car-name {
      background: url("../assets/tip-bg.png") no-repeat;
      background-size: 100% 100%;
      height: 110px;
      width: 250px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        margin-left: 30px;
      }
    }
    .nav-text {
      border: 2px solid #05c3ff;
      border-radius: 10px;
      width: 400px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // height: 120px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        // margin-top: 0px;
        text-align: center;
        width: 120px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
      }
    }
    .drive-text {
      width: 400px;
      // height: 120px;
      border: 2px solid #05c3ff;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        // margin-top: 0px;
        text-align: center;
        width: 120px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
      }
    }
    .jackup-text {
      width: 400px;
      // height: 120px;
      border: 2px solid #05c3ff;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        // margin-top: 0px;
        text-align: center;
        width: 120px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
      }
    }
    .battery-text {
      width: 400px;
      border: 2px solid #05c3ff;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // height: 120px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        text-align: center;
        width: 120px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
      }
    }
  }
  .car-message-right {
    margin-top: 90px;
    .nav-text {
      border: 2px solid #05c3ff;
      border-radius: 10px;
      width: 400px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // height: 120px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: red;
        // margin-top: 0px;
        text-align: center;
        width: 145px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: red;
        margin-left: 10px;
        // text-align: center;
        width: 140px;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
        width: 0px;
      }
    }
    .drive-text {
      border: 2px solid #05c3ff;
      border-radius: 10px;
      width: 400px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // height: 120px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        width: 145px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
        width: 115px;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
        width: 0px;
      }
    }
    .jackup-text {
      border: 2px solid #05c3ff;
      border-radius: 10px;
      width: 400px;
      margin: 10px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // height: 120px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        width: 145px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 10px;
        // text-align: center;
        width: 115px;
      }
      .line {
        height: 60px;
        border-right: 2px solid #05c3ff;
        width: 0px;
      }
    }
    .battery-text {
      border: 2px solid #05c3ff;
      border-radius: 10px;
      width: 400px;
      margin: 10px;
      // height: 100px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: red;
        width: 145px;
        text-align: center;
        // width: 130px;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: red;
        margin-left: 10px;
        // text-align: center;
        width: 115px;
      }
      .line {
        height: 70px;
        border-right: 2px solid #05c3ff;
        width: 0px;
      }
    }
  }
  .car-body {
    position: relative;

    img {
      height: 450px;
      width: 390px;
    }
    .top-nav {
      position: absolute;
      width: 62px;
      height: 39px;
      // background-color: green;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      align-items: flex-end;
      top: 1px;
      left: 170px;
      .top1 {
        width: 30px;
        height: 30px;
        // background-color: red;
        border-radius: 8px;
        cursor: pointer;
        z-index: 10;
        background-color: rgba(255, 0, 0);
        -webkit-animation: twinkling 1s infinite ease-in-out;
      }
      .top1:hover {
        width: 30px;
        height: 30px;
        background-color: rgba(255, 0, 0, 0.6);
        border-radius: 8px;
        cursor: pointer;
      }
    }
    .center {
      width: 146px;
      height: 145px;
      // background-color: #05c3ff;
      border-radius: 50%;
      position: absolute;
      left: 130px;
      top: 150px;
      cursor: pointer;
    }
    .center:hover {
      width: 78px;
      height: 78px;
      // background-color: #05c3ff;
      border-radius: 50%;
      border: 34px solid rgba(6, 255, 0, 0.5);
      position: absolute;
      left: 130px;
      top: 148px;
      cursor: pointer;
    }
    .circle {
      width: 70px;
      height: 70px;
      // background-color: rgba(255, 255, 255,.3);
      border-radius: 50%;
      position: absolute;
      left: 168px;
      top: 185px;
      cursor: pointer;
    }
    .circle:hover {
      background-color: rgba(6, 255, 0, 0.5);
    }
    .battery {
      width: 170px;
      height: 78px;
      // background-color: red;
      position: absolute;
      top: 320px;
      left: 115px;
      cursor: pointer;
      z-index: 10;
      background-color: rgba(255, 0, 0);
      -webkit-animation: twinkling 1s infinite ease-in-out;
      //   ;-webkit-animation:twinkling 2.1s infinite ease-in-out;
      // animation:twinkling 2.1s infinite ease-in-out;
      // -webkit-animation-fill-mode:both;
      // animation-fill-mode:both;
    }
    .battery:hover {
      background-color: rgba(255, 0, 0, 0.5);
    }
    // @-webkit-keyframes twinkling {
    // 	0% {
    // 	opacity:0.2;
    // 	filter:alpha(opacity=20);
    // 	-webkit-transform:scale(1);
    // }
    // 50% {
    // 	opacity:0.5;
    // 	filter:alpha(opacity=50);
    // 	-webkit-transform:scale(1.12);
    // }
    // 100% {
    // 	opacity:0.2;
    // 	filter:alpha(opacity=20);
    // 	-webkit-transform:scale(1);
    // }
    // }@keyframes twinkling {
    // 	0% {
    // 	opacity:0.2;
    // 	filter:alpha(opacity=20);
    // 	-webkit-transform:scale(1);
    // }
    // 50% {
    // 	opacity:0.5;
    // 	filter:alpha(opacity=50);
    // 	-webkit-transform:scale(1.12);
    // }
    // 100% {
    // 	opacity:0.2;
    // 	filter:alpha(opacity=20);
    // 	-webkit-transform:scale(1);
    // }
    // }

    .drive-left {
      width: 25px;
      height: 80px;
      position: absolute;
      cursor: pointer;
      // background-color: #05c3ff;
      left: 43px;
      top: 180px;
      border-radius: 3px;
    }
    .drive-left:hover {
      background-color: rgba(6, 255, 0, 0.5);
    }
    .drive-right {
      width: 25px;
      height: 80px;
      position: absolute;
      cursor: pointer;
      // background-color: #05c3ff;
      left: 336px;
      top: 180px;
      border-radius: 3px;
    }
    .drive-right:hover {
      background-color: rgba(6, 255, 0, 0.5);
    }
    .stop-left {
      display: flex;
      align-items: center;
      position: absolute;
      top: 80px;
      left: 40px;
      cursor: pointer;
      z-index: 20;
      .bottom {
        width: 22px;
        height: 30px;
        // background-color: rgba(6, 255, 0,.5);
      }
      .middle {
        width: 2px;
        height: 15px;
        // background-color: rgba(6, 255, 0,.5);
      }
      .top {
        width: 12px;
        height: 20px;
        // background-color: rgba(6, 255, 0,.5);
        border-radius: 3px;
      }
    }
    .stop-left:hover {
      .bottom,
      .middle,
      .top {
        background-color: rgba(6, 255, 0, 0.5);
      }
    }
    .stop-right {
      display: flex;
      align-items: center;
      position: absolute;
      top: 335px;
      left: 328px;
      cursor: pointer;
      z-index: 20;
      .bottom1 {
        width: 22px;
        height: 30px;
        // background-color: rgba(6, 255, 0,.5);
      }
      .middle1 {
        width: 2px;
        height: 15px;
        // background-color: rgba(6, 255, 0,.5);
      }
      .top1 {
        width: 12px;
        height: 20px;
        // background-color: rgba(6, 255, 0,.5);
        border-radius: 3px;
      }
    }
    .stop-right:hover {
      .bottom1,
      .middle1,
      .top1 {
        background-color: rgba(6, 255, 0, 0.5);
      }
    }
    .article-crash-top {
      width: 315px;
      height: 100px;
      border-top: 6px solid rgb(50, 50, 50);
      border-top-left-radius: 70%;
      border-top-right-radius: 70%;
      position: absolute;
      top: 5px;
      left: 45px;
      cursor: pointer;
    }
    .article-crash-top:hover {
      border-top: 6px solid rgba(6, 255, 0, 0.5);
    }
    .article-crash-bottom {
      width: 315px;
      height: 100px;
      border-bottom: 6px solid rgb(50, 50, 50);
      border-bottom-left-radius: 70%;
      border-bottom-right-radius: 70%;
      position: absolute;
      bottom: 20px;
      left: 45px;
      cursor: pointer;
    }
    .article-crash-bottom:hover {
      border-bottom: 6px solid rgba(6, 255, 0, 0.5);
    }
  }
}
.car-bottom {
  height: 470px;
  width: 100%;
  margin-top: 18px;
  // border: 2px solid #05c3ff;
  background-image: linear-gradient(to left, #0d48a1da 0%,#073daa52 25%, #295dfc6c 50%,#1a47a1a8 75%,#0d48a1da 100%);
  display: flex;
  justify-content: center;
  position: relative;
  .box {
    .line1 {
      width: 950px;
      height: 350px;
      border-top: 3px solid #05c3ff;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      position: absolute;
      top: 30px;
      left: 190px;
    }
    .line2 {
      position: absolute;
      width: 260px;
      height: 1px;
      border-bottom: 2px solid #05c3ff;
      transform: rotate(75deg);
      left: 96px;
      top: 319px;
    }
    .line3 {
      position: absolute;
      width: 260px;
      height: 1px;
      border-bottom: 2px solid #05c3ff;
      transform: rotate(105deg);
      left: 978px;
      top: 319px;
    }
    .line4 {
      width: 810px;
      height: 60px;
      border-top: 3px solid #05c3ff;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      position: absolute;
      top: 420px;
      left: 260px;
    }
  }
  .left-dial {
    width: 180px;
    margin-top: 55px;
    text-align: center;
  }
  .right-dial {
    width: 180px;
    margin-top: 55px;
    text-align: center;
  }
}
.first {
  padding: 0 0.5%;
}
.fl {
  float: left;
}

.fr {
  float: right;
}

@font-face {
  font-family: DigifaceWide;
  src: url("../assets/fonts/digifaw.ttf");
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
  bottom: 20px;
}

.main .aside-right {
  position: relative;
  width: 20%;
  height: 100%;
  bottom: 20px;
}

.main .aside-left h3 {
  padding-top: 5%;
  padding-left: 5%;
}

.left-top {
  position: relative;
  opacity: 0.9;
   background: linear-gradient(
    45deg,
    rgba(1, 38, 94, 0.6),
    rgba(6, 82, 197, 0.6)
  );
  height: 473px;
  margin-bottom: 15px;
  margin-top: 25px;
}

.left-top h3 {
  font-size: 18px;
  // margin-top: 30px;
}
.btn .all {
  background-color: #1f68ddc0;
  border-color: #1f68ddc0;
  color: #fff;
}
.btngroup {
  position: absolute;
  right: 20px;
  top: 25px;
  span {
    margin:0 5px;
    i {
      color: #fff;
      // font-weight: bold;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.agvstate {
  margin-bottom: 0;
}
.table {
  position: absolute;
  margin-left: 10px;
  width: 95%;
  // border: 2px solid #05c3ff;
  // border-bottom: 0;
}
.btn {
  position: absolute;
  right: 50px;
  top: 15px;
}
/deep/.el-input__inner {
  background-color: transparent;
  border: 0;
}
/deep/.el-pagination button, .el-pagination span:not([class*=suffix]) {
  line-height: 0;
  color: #fff;
}
/deep/.el-pagination .el-select .el-input .el-input__inner {
  height: 20px;
  color: #fff;
}
/deep/.el-input--mini .el-input__icon {
  line-height: 20px;
  color: #fff;
}
/deep/.el-select .el-input .el-select__caret {
  color: #fff;
  font-weight: bold;
}
/deep/.el-pagination__total {
  color: #fff;
}
// .left-top:after {
//   position: absolute;
//   right: 0;
//   bottom: -5.4%;
//   width: 5%;
//   min-width: 20px;
//   height: 13%;
//   min-height: 50px;
//   background: url("../assets/bor1_1_xie.png") no-repeat;
//   background-size: 100% 100%;
//   content: "";
// }

// .left-top:before {
//   position: absolute;
//   top: -9px;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: url("../assets/bor1_5.png") no-repeat;
//   background-size: 100% 100%;
//   z-index: -1;
//   content: "";
// }

.left-bottom {
  position: relative;
  bottom: 2px;
  opacity: 0.9;
  height: 470px;
  background: linear-gradient(
    45deg,
    rgba(1, 38, 94, 0.6),
    rgba(6, 82, 197, 0.6)
  );
}

// .left-bottom:before {
//   content: "";
//   position: absolute;
//   top: 5.6%;
//   right: -2%;
//   z-index: 100;
//   width: 15%;
//   height: 7%;
//   background: url("../assets/bor1_2_square.png") no-repeat;
//   background-size: 100%;
//   z-index: 10;
// }
.btn-group {
  position: absolute;
  width: 360px;
  top: 180px;
  left: 30px;
  .el-button {
    margin: 10px;
    background-color: #1f68ddc0;
    border: #1f68ddc0;
    color: #fff;
  }
}
.left-bottom h3 {
  margin-top: 0;
  font-size: 18px;
}

// .left-bottom:after {
//   position: absolute;
//   top: -9px;
//   left: 0;
//   width: 100%;
//   height: 104%;
//   background: url("../assets/bor1_2.png") no-repeat;
//   background-size: 100% 97%;
//   z-index: -1;
//   content: "";
// }
.tit {
  height: 5%;
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

.middle-map .map-wrap .title-map {
  position: absolute;
  left: 50%;
  top: 20%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  font-size: 0.5625em;
}

.main .aside-right .pie,
.main .aside-right .trend {
  position: relative;
}


.main .aside-right .pie {
  position: relative;
  height: 474px;
  top: 25px;
  margin-bottom: 24px;
  // background: url("../assets/bg1_1.png") no-repeat;
  // background-size: cover;
   background: linear-gradient(
    45deg,
    rgba(6, 82, 197, 0.6),
    rgba(1, 38, 94, 0.6)
  );
}

// .main .aside-right .pie:before {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: url("../assets/bor1_4.png") no-repeat;
//   background-size: 100% 100%;
//   content: "";
//   color: #3232321a;
// }
.pie1 {
  position: absolute;
  // top: 10px;
  width: 95%;
}
.main .aside-right .pie h3 {
  padding-top: 0;
  font-size: 18px;
  padding-left: 5%;
  margin-top: 18px;
}

.main .aside-right .pie .pie1 .step {
  margin-top: 50px;
  margin-left: 80px;
}



.main .aside-right .trend {
  position: relative;
  bottom: -14px;
  width: 100%;
  height: 470px;
  // background: url("../assets/bg1_3.png") no-repeat;
  background: linear-gradient(
    to left,
    rgba(1, 38, 94, 0.6),
    rgba(6, 82, 197, 0.6)
  );
  // background-size: cover;
}

// .main .aside-right .trend:before {
//   position: absolute;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background: url("../assets/bor1_6.png") no-repeat;
//   background-size: 100% 100%;
//   content: "";
// }

.main .aside-right .trend h3 {
  height: 10px;
  padding-top: 5%;
  margin-left: 5%;
  font-size: 18px;
}
.log {
  position: absolute;
  top: 80px;
  left: 30px;
  width: 85%;
  div {
    // text-align: center;
    margin: 10px 0;
  }
  span {
    margin: 15px;
    font-size: 16px;
  }
}
.drawer-body {
  margin-left: 20px;
}
.right {
  color: #fff;
}
.leave {
  color: red;
}
.warn {
  color: rgb(241, 207, 9);
}
.main-bottom {
  width: 100%;
  height: 5px;
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

.video {
  position: absolute;
  width: 1330px;
  height: 480px;
  top: 0;
  background: linear-gradient(45deg, rgba(44, 83, 141), rgba(34, 98, 194));
  z-index: 10000000;
  .video-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    div {
      color: #fff;
      font-size: 26px;
      font-weight: bolder;
      i {
        cursor: pointer;
      }
    }
  }
}
/deep/.el-dialog {
  background: linear-gradient(45deg, rgba(44, 83, 141,.8), rgba(34, 98, 194,.8));
  margin-top: 10vh !important;
}
/deep/.el-dialog__title {
  color: #fff;
  font-size: 26px;
  font-weight: bolder;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-size: 26px;
  font-weight: bolder;
}
/deep/._progress ._slider[data-v-165d5d46] {
  width: 90%;
}
.btnlist {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  .el-button {
    margin: 10px;
    background-color: #1f68ddc0;
    border: #1f68ddc0;
    color: #fff;
  }
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
