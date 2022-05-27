<template>
  <div class="container">
    <div class="gifImg">
      <div class="back" @click="backHome">
        <i class="el-icon-s-home"></i>
      </div>
      <h1>AGV即时状态</h1>
    </div>
    <div class="car-container">
      <div class="car">
        <div class="car-head">
          <div class="top-cirle"></div>
          <div class="top">
            <div class="line2"></div>
            <div class="straight-line1"></div>
            <div class="table2">
              <div class="title1">
                <div class="title-circle1"></div>
                <div class="title-text1">前防撞条</div>
              </div>
              <el-table
                border
                style="width: 100%"
                :data="tableData1"
                :show-header="showHeader"
              >
                <el-table-column prop="state" label="状态"> </el-table-column>
                <el-table-column prop="area" label="正常"> </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="cirle">
            <div class="line1"></div>
            <div class="straight-line"></div>
            <div class="table1">
              <div class="title1">
                <div class="title-circle"></div>
                <div class="title-text">前障碍物传感器</div>
              </div>
              <el-table border :data="tableData" style="width: 100%">
                <el-table-column prop="state" label="状态"> </el-table-column>
                <el-table-column prop="area" label="异常"> </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="car-body">
          <div class="car-back">
            <div class="navigation">
              <div class="line3"></div>
              <div class="straight-line2"></div>
              <div class="table3">
                <div class="title1">
                  <div class="title-circle"></div>
                  <div class="title-text">前磁导航</div>
                </div>
                <el-table
                  border
                  :data="tableData2"
                  :show-header="showHeader"
                  style="width: 100%"
                >
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="异常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="body-circle">
              <div class="line4"></div>
              <div class="straight-line3"></div>
              <div class="table4">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">前牵引棒</div>
                </div>
                <el-table border style="width: 100%" :data="tableData3">
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="正常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="box1">
              <div class="line5"></div>
              <div class="straight-line4"></div>
              <div class="table5">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">前驱动轮组</div>
                </div>
                <el-table border style="width: 100%" :data="tableData4">
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="正常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="box2">
              <div class="line6"></div>
              <div class="straight-line5"></div>
              <div class="table6">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">电池组</div>
                </div>
                <el-table border style="width: 100%" :data="tableData5">
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="正常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="box3">
              <div class="line7"></div>
              <div class="straight-line6"></div>
              <div class="table7">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">后驱动轮组</div>
                </div>
                <el-table border style="width: 100%" :data="tableData4">
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="正常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="body-circle2">
              <div class="line8"></div>
              <div class="straight-line7"></div>
              <div class="table8">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">后牵引棒</div>
                </div>
                <el-table border style="width: 100%" :data="tableData3">
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="正常"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="nav">
              <div class="line9"></div>
              <div class="straight-line8"></div>
              <div class="table9">
                <div class="title1">
                  <div class="title-circle1"></div>
                  <div class="title-text1">后磁导航</div>
                </div>
                <el-table
                  border
                  :data="tableData6"
                  :show-header="showHeader"
                  style="width: 100%"
                >
                  <el-table-column prop="state" label="状态"> </el-table-column>
                  <el-table-column prop="area" label="异常"> </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="car-footer">
          <div class="footer-circle">
            <div class="line10"></div>
            <div class="straight-line9"></div>
            <div class="table10">
              <div class="title1">
                <div class="title-circle1"></div>
                <div class="title-text1">后障碍物传感器</div>
              </div>
              <el-table border :data="tableData" style="width: 100%">
                <el-table-column prop="state" label="状态"> </el-table-column>
                <el-table-column prop="area" label="正常"> </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="circle2"></div>
          <div class="footer">
            <div class="line11"></div>
            <div class="straight-line10"></div>
            <div class="table11">
              <div class="title1">
                <div class="title-circle1"></div>
                <div class="title-text1">后防撞条</div>
              </div>
              <el-table
                border
                style="width: 100%"
                :data="tableData1"
                :show-header="showHeader"
              >
                <el-table-column prop="state" label="状态"> </el-table-column>
                <el-table-column prop="area" label="正常"> </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="car-state">
        <div class="car-text">
          <div class="system-state">
            <div class="state-title">
              <i class="el-icon-warning"></i>
              <span>系统状态</span>
            </div>
            <div class="abnormal">
              <div>管制异常</div>
              <div>线路异常：漏读卡</div>
              <div>通讯异常：在线(on line)、离线(off line)</div>
              <div>资源异常：风淋门、电梯、卷帘门、AGVC</div>
            </div>
          </div>
          <div class="carbody-state">
            <div class="state-title">
              <i class="el-icon-warning"></i>
              <span>车体状态</span>
            </div>
            <div class="abnormal">
              <div>网络地址：<span>10.189.124.196</span></div>
              <div>调度连接：<span>已连接</span></div>
              <div>运行模式：<span>调度</span></div>
              <div>导航模式： <span>磁条</span></div>
              <div>任务单号： <span>XXXXXXX</span></div>
              <div>运行速度： <span>0.4m/min</span></div>
            </div>
          </div>
        </div>
        <div class="abnormal-vehicle">
          <div class="table-title">
            <i class="el-icon-warning"></i>
            <span>车辆异常履历</span>
          </div>
          <el-table
            :data="tableData7"
            border
            style="width: 80%"
            :cell-style="styleBack"
          >
            <el-table-column prop="num" label="序号"> </el-table-column>
            <el-table-column prop="record" label="异常记录"> </el-table-column>
            <el-table-column prop="time" label="异常起始时间">
            </el-table-column>
            <el-table-column prop="continuous" label="异常持续时间">
            </el-table-column>
          </el-table>
        </div>
        <div class="all-car">
          <div class="table-title" style="margin-top: 20px">
            <i class="el-icon-truck"></i>
            <span>所有车辆</span>
          </div>
          <el-table
            :data="tableData8"
            border
            style="width: 80%"
            :cell-style="styleCar"
          >
            <el-table-column prop="name" label="设备名称"> </el-table-column>
            <el-table-column prop="code" label="设备编号"> </el-table-column>
            <el-table-column prop="ip" label="IP" width="100">
            </el-table-column>
            <el-table-column prop="taskState" label="任务状态">
            </el-table-column>
            <el-table-column prop="carState" label="设备状态">
            </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          state: "区域",
          area: 2
        }
      ],
      tableData1: [
        {
          state: "状态",
          area: "正常"
        }
      ],
      tableData2: [
        {
          state: "状态",
          area: "异常"
        }
      ],
      tableData3: [
        {
          state: "位置",
          area: "上升"
        }
      ],
      tableData4: [
        {
          state: "转速",
          area: "XXXX"
        },
        {
          state: "过载",
          area: ""
        }
      ],
      tableData5: [
        {
          state: "电量",
          area: "80%"
        },
        {
          state: "温度",
          area: "37.5°"
        },
        {
          state: "电压",
          area: "24V"
        }
      ],
      tableData6: [
        {
          state: "状态",
          area: "正常"
        }
      ],
      tableData7: [
        {
          num: 1,
          record: "脱轨",
          time: "2021.08.10/07:24",
          continuous: "240s"
        },
        {
          num: 2,
          record: "路线异常",
          time: "2021.08.10/10:35",
          continuous: "300s"
        },
        {
          num: 3,
          record: "障碍物报警",
          time: "2021.08.10/12:24",
          continuous: "30s"
        },
        {
          num: 4,
          record: "断网",
          time: "2021.08.10/14:25",
          continuous: "60s"
        }
      ],
      tableData8: [
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
        }
      ],
      showHeader: false
    };
  },
  methods: {
    styleBack({ row, column, rowIndex, columnIndex }) {
      if (row.num == 2) {
        return { color: "red " };
      }
    },
    styleCar({ row, column, rowIndex, columnIndex }) {
      if (row.carState == "离线") {
        return { color: "red " };
      }
    },
    backHome() {
        this.$router.push('/first')
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
  position: absolute;
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
  position: relative;
  top: 200px;
  width: 65%;
  //   flex: 1.9;
}
.car-state {
  position: absolute;
  left: 1300px;
  .state-title {
    margin-top: 100px;
    color: rgb(6, 255, 0);
    font-size: 28px;
    font-weight: bold;
  }
  .abnormal {
    color: rgb(6, 255, 0);
    font-size: 20px;
    font-weight: bold;
    div {
      margin: 10px;
      span {
        color: #fff;
      }
    }
  }
}
.table-title {
  //   margin-top: 20px;
  color: rgb(6, 255, 0);
  font-size: 28px;
  font-weight: bold;
}
.car-text {
  display: flex;
  .system-state {
    margin-right: 60px;
  }
}
.car-head {
  position: relative;
  display: flex;
  justify-content: center;
  .top-cirle {
    width: 320px;
    height: 140px;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    background-color: rgba(9, 138, 212, 0.6);
  }
  .top {
    width: 200px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background: #2edbff;
    position: absolute;
    bottom: -5px;
    .line2 {
      position: relative;
      width: 100px;
      height: 100px;
      background: linear-gradient(
        45deg,
        transparent 49.5%,
        #ffffff 49.5%,
        #ffffff 50.5%,
        transparent 50.5%
      );
      top: -88px;
      left: -88px;
    }
    .straight-line1 {
      width: 50px;
      border-top: 1px solid #fff;
      position: absolute;
      top: -88px;
      left: -138px;
    }
    .table2 {
      position: absolute;
      width: 200px;
      top: -120px;
      left: -350px;
      .title1 {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .title-circle1 {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgb(6, 255, 0);
        }
        .title-text1 {
          font-size: 20px;
          color: rgb(6, 255, 0);
          padding-left: 5px;
          font-weight: bold;
        }
      }
    }
  }
  .cirle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    border: 1px solid #000;
    position: absolute;
    z-index: 10;
    bottom: -15px;
    .line1 {
      position: relative;
      width: 150px;
      height: 150px;
      background: linear-gradient(
        135deg,
        transparent 49.5%,
        #ffffff 49.5%,
        #ffffff 50.5%,
        transparent 50.5%
      );
      top: -138px;
      left: 8px;
    }
    .straight-line {
      width: 100px;
      border-top: 1px solid #fff;
      position: absolute;
      top: -138px;
      left: 158px;
    }
    .table1 {
      position: absolute;
      width: 200px;
      top: -150px;
      left: 265px;
      .title1 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: red;
        }
        .title-text {
          font-size: 20px;
          color: red;
          padding-left: 5px;
          font-weight: bold;
        }
      }
    }
  }
}
.car-body {
  display: flex;
  justify-content: center;
  .car-back {
    height: 400px;
    width: 200px;
    border-radius: 30px;
    border: 1px solid #000;
    background-color: #2edbff;
    position: relative;
    display: flex;
    justify-content: center;
    top: 3px;
    .navigation {
      width: 150px;
      height: 20px;
      background-color: red;
      border: 1px solid #000;
      border-radius: 5px;
      position: absolute;
      top: 20px;
      .line3 {
        position: relative;
        width: 100px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(165deg);
        left: 140px;
      }
      .straight-line2 {
        width: 80px;
        border-top: 1px solid #fff;
        position: absolute;
        top: -12px;
        left: 238px;
      }
      .table3 {
        position: absolute;
        width: 200px;
        top: -24px;
        left: 330px;
        .title1 {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .title-circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: red;
          }
          .title-text {
            font-size: 20px;
            color: red;
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .body-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgb(6, 255, 0);
      border: 1px solid rgb(50, 50, 50);
      position: absolute;
      top: 55px;
      .line4 {
        position: relative;
        width: 200px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(15deg);
        top: -15px;
        left: -180px;
      }
      .straight-line3 {
        width: 50px;
        border-top: 1px solid #fff;
        position: absolute;
        top: -39px;
        left: -224px;
      }
      .table4 {
        position: absolute;
        width: 200px;
        top: -60px;
        left: -435px;
        .title1 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .box1 {
      width: 150px;
      height: 65px;
      background-color: rgb(6, 255, 0);
      position: absolute;
      top: 100px;
      border-radius: 10px;
      border: 1px solid rgb(50, 50, 50);
      .line5 {
        position: relative;
        width: 150px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(175deg);
        left: 90px;
        top: 20px;
      }
      .straight-line4 {
        width: 80px;
        border-top: 1px solid #fff;
        position: absolute;
        top: 13px;
        left: 239px;
      }
      .table5 {
        position: absolute;
        width: 200px;
        top: -4px;
        left: 330px;
        .title1 {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .box2 {
      width: 180px;
      height: 30px;
      background-color: rgb(6, 255, 0);
      position: absolute;
      top: 185px;
      border-radius: 10px;
      border: 1px solid rgb(50, 50, 50);
      .line6 {
        position: relative;
        width: 400px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(5deg);
        top: -5px;
        left: -380px;
      }
      .straight-line5 {
        width: 30px;
        border-top: 1px solid #fff;
        position: absolute;
        top: -22px;
        left: -404px;
      }
      .table6 {
        position: absolute;
        width: 200px;
        top: -60px;
        left: -615px;
        .title1 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .box3 {
      width: 150px;
      height: 65px;
      background-color: rgb(6, 255, 0);
      position: absolute;
      top: 235px;
      border-radius: 10px;
      border: 1px solid rgb(50, 50, 50);
      .line7 {
        position: relative;
        width: 150px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(10deg);
        left: 90px;
        top: 60px;
      }
      .straight-line6 {
        width: 80px;
        border-top: 1px solid #fff;
        position: absolute;
        top: 74px;
        left: 239px;
      }
      .table7 {
        position: absolute;
        width: 200px;
        top: 60px;
        left: 330px;
        .title1 {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .body-circle2 {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgb(6, 255, 0);
      border: 1px solid rgb(50, 50, 50);
      position: absolute;
      bottom: 55px;
      .line8 {
        position: relative;
        width: 200px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(25deg);
        top: -25px;
        left: -180px;
      }
      .straight-line7 {
        width: 50px;
        border-top: 1px solid #fff;
        position: absolute;
        top: -66px;
        left: -221px;
      }
      .table8 {
        position: absolute;
        width: 200px;
        top: -85px;
        left: -435px;
        .title1 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
    .nav {
      width: 150px;
      height: 20px;
      background-color: rgb(6, 255, 0);
      border: 1px solid #000;
      border-radius: 5px;
      position: absolute;
      bottom: 20px;
      .line9 {
        position: relative;
        width: 160px;
        height: 1px;
        border-bottom: 1px solid #fff;
        transform: rotate(165deg);
        top: 30px;
        left: -130px;
      }
      .straight-line8 {
        width: 30px;
        border-top: 1px solid #fff;
        position: absolute;
        top: 51px;
        left: -158px;
      }
      .table9 {
        position: absolute;
        width: 200px;
        top: 25px;
        left: -375px;
        .title1 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .title-circle1 {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(6, 255, 0);
          }
          .title-text1 {
            font-size: 20px;
            color: rgb(6, 255, 0);
            padding-left: 5px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.car-footer {
  position: relative;
  display: flex;
  justify-content: center;
  .footer-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(6, 255, 0);
    border: 1px solid #000;
    position: absolute;
    z-index: 10;
    top: -10px;
    .line10 {
      position: relative;
      width: 200px;
      height: 1px;
      border-bottom: 1px solid #fff;
      transform: rotate(150deg);
      top: 65px;
      left: -180px;
    }
    .straight-line9 {
      width: 50px;
      border-top: 1px solid #fff;
      position: absolute;
      top: 115px;
      left: -218px;
    }
    .table10 {
      position: absolute;
      width: 200px;
      top: 105px;
      left: -440px;
      .title1 {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .title-circle1 {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgb(6, 255, 0);
        }
        .title-text1 {
          font-size: 20px;
          color: rgb(6, 255, 0);
          padding-left: 5px;
          font-weight: bold;
        }
      }
    }
  }
  .circle2 {
    width: 320px;
    height: 140px;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    background-color: rgba(9, 138, 212, 0.6);
    margin-top: 1px;
  }
  .footer {
    width: 200px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 5px;
    background: #2edbff;
    position: absolute;
    margin-top: 1px;
    .line11 {
      position: relative;
      width: 170px;
      height: 1px;
      border-bottom: 1px solid #fff;
      transform: rotate(35deg);
      left: 140px;
      top: 60px;
    }
    .straight-line10 {
      width: 40px;
      border-top: 1px solid #fff;
      position: absolute;
      top: 110px;
      left: 295px;
    }
    .table11 {
      position: absolute;
      width: 200px;
      top: 100px;
      left: 355px;
      .title1 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title-circle1 {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgb(6, 255, 0);
        }
        .title-text1 {
          font-size: 20px;
          color: rgb(6, 255, 0);
          padding-left: 5px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
