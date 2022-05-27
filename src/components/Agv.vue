<template>
  <div class="container">
    <div class="gifImg">
      <h1>AGV即时状态</h1>
      <div class="car-title">
        <h1>AGV006</h1>
      </div>
    </div>
    <div class="car-container">
      <div class="car">
        <div class="car-message">
          <div class="nav-text">
            <h1 class="title">前防撞条</h1>
            <div>状态：正常</div>
          </div>
          <div class="drive-text">
            <h1 class="title">左驱动轮组</h1>
            <div>状态：正常</div>
            <div>转速：XXX</div>
          </div>
          <div class="jackup-text">
            <h1 class="title">顶升模组</h1>
            <div>状态：正常</div>
            <!-- <div>转速：XXX</div> -->
          </div>
          <div class="battery-text">
            <h1 class="title">电池</h1>
            <div>状态：异常</div>
            <div>电量：80%</div>
            <div>温度：37.5°</div>
          </div>
        </div>
        <div class="car-body">
          <img src="../assets/agv3.png" alt="" />
          <div class="top-nav">
            <div class="top1" id="top" @click="getNav"></div>
          </div>
          <div class="center" id="jack-up" @click="getJackup"></div>
          <div class="circle" id="center-cricle" @click="getCode"></div>
          <div class="battery" @click="getBattery"></div>
          <div class="drive-left"></div>
          <div class="drive-right"></div>
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
          <div class="article-crash-top"></div>
          <div class="article-crash-bottom"></div>
        </div>
        <div class="car-message-right">
          <div class="nav-text">
            <h1 class="title">障碍物传感器</h1>
            <div>状态：正常</div>
          </div>
          <div class="drive-text">
            <h1 class="title">右驱动轮组</h1>
            <div>状态：正常</div>
            <div>转速：XXX</div>
          </div>
          <div class="jackup-text">
            <h1 class="title">扫码模组</h1>
            <div>状态：正常</div>
            <!-- <div>转速：XXX</div> -->
          </div>
          <div class="battery-text">
            <h1 class="title">后防撞条</h1>
            <div>状态：正常</div>
          </div>
        </div>
        <div id="speed" style="width: 80%;height:100%"></div>
      </div>
      <div class="all-car">
        <div class="table-title" style="margin-top: 20px">
          <i class="el-icon-truck"></i>
          <span>所有车辆</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 95%"
          :cell-style="styleCar"
        >
          <el-table-column prop="name" label="设备名称"> </el-table-column>
          <el-table-column prop="code" label="设备编号"> </el-table-column>
          <el-table-column prop="ip" label="IP" width="100"> </el-table-column>
          <el-table-column prop="taskState" label="任务状态"> </el-table-column>
          <el-table-column prop="carState" label="设备状态"> </el-table-column>
          <el-table-column prop="location" label="位置"> </el-table-column>
          <el-table-column prop="id" label="任务ID"> </el-table-column>
          <el-table-column prop="electricity" label="电量"> </el-table-column>
          <el-table-column prop="num" label="充电次数"> </el-table-column>
          <el-table-column prop="mileage" label="里程"> </el-table-column>
          <el-table-column prop="rate" label="充电速率"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { EleResize } from "/Dashboard/dashboard/static/js/esresize";
export default {
  data() {
    return {
      isShow: false,
      show: false,
      code: false,
      battery: false,
      tableData: [
        {
          name: "二维码AGV",
          code: "AGV2",
          ip: "10.189.10.2",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV1",
          ip: "10.189.10.3",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV3",
          ip: "10.189.10.6",
          taskState: "待指派",
          carState: "离线",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV6",
          ip: "10.189.10.2",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202101",
          electricity: "50%",
          num: "5次",
          mileage: "1500m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
        {
          name: "二维码AGV",
          code: "AGV5",
          ip: "10.189.10.2",
          taskState: "待指派",
          carState: "充电",
          location: "电梯口",
          id: "202102",
          electricity: "50%",
          num: "4次",
          mileage: "1480m",
          rate: "2min/%"
        },
      ],
      tableData1: [
        {
          name: "二维码AGV",
          code: "AGV2",
          taskState: "任务中",
          carState: "正常",
          location: "电梯口",
          id: "202102",
        },
      ]
    };
  },
  mounted() {
    this.getSpeed();
  },
  methods: {
    backHome() {
      this.$router.push("/first");
    },
    getNav() {
      // var top1 = document.getElementById('top')
      this.isShow = !this.isShow;
      // top1.style.backgroundColor = "green"
    },
    getJackup() {
      this.show = !this.show;
    },
    getCode() {
      this.code = !this.code;
    },
    getBattery() {
      this.battery = !this.battery;
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
                "{a|电量        0}{b|      %}",
                "{a|温度        0.0}{b|   ℃}",
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
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  height: 100%;
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
  // position: relative;
  // top: 0;
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
}
.gifImg:after {
  content: "";
  top: 38%;
  left: 50%;
  -webkit-transform: translate(-50%, 20%);
  transform: translate(-50%, 20%);
  display: block;
  position: absolute;
  width: 36.5%;
  min-width: 700px;
  height: 100%;
  background: url(../assets/header.gif) no-repeat center center;
  background-size: 100%;
}
.car-container {
  display: flex;
}
.car {
  flex: 1;
  position: relative;
  top: 120px;
  width: 75%;
  #speed {
    margin-left: 110px;
    margin-top: 10px;
  }
  .car-message {
    .nav-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 10px;
      top: -60px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        // margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .nav-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .drive-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 10px;
      top: 100px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .drive-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .jackup-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 10px;
      top: 260px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .jackup-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .battery-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 10px;
      top: 420px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 60px;
        // text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: red;
        margin-left: 20px;
        text-align: center;
      }
    }
    .battery-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 430px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
  }
  .car-message-right {
    .nav-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 820px;
      top: -60px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        // margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .nav-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .drive-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 820px;
      top: 100px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .drive-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .jackup-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 820px;
      top: 260px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .jackup-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 400px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
    .battery-text {
      // background-image: url('../assets/bg11.png');
      width: 200px;
      // height: 120px;
      position: absolute;
      left: 820px;
      top: 420px;
      .title {
        font-size: 24px;
        font-weight: bolder;
        color: #fff;
        margin-left: 60px;
        // text-align: center;
      }
      div {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-left: 20px;
        text-align: center;
      }
    }
    .battery-text:after {
      background: url("../assets/bg11.png") no-repeat;
      position: absolute;
      width: 350px;
      height: 430px;
      background-size: 100% 100%;
      left: -50px;
      top: -130px;
      content: "";
    }
  }
  .car-body {
    position: relative;
    left: 350px;
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
      }
      .top1:hover {
        width: 30px;
        height: 30px;
        background-color: rgba(255, 0, 0, 0.5);
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
    }
    .battery:hover {
      background-color: rgba(255, 0, 0, 0.5);
    }
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
</style>
