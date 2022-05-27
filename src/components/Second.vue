<template>
    <!-- <Map></Map> -->
    <div>
      <!-- <img src="../assets/img/HA2F.svg" alt=""> -->
    </div>
</template>

<script>
// import Map from "../views/Map.vue"
export default {
  data() {
    return {
      display: false,
      drawerWidth: "1000px",
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
        }
      ],
      mileage:0,
      agvListDate: [{
        agvList:{
          mileage: 10
        }
      },
      {
        agvList:{
          mileage: 10
        }
      },
      {
        agvList:{
          mileage: 10
        }
      },
      {
        agvList:{
          mileage: 10
        }
      },
      {
        agvList:{
          mileage: 10
        }
      },
      {
        agvList:{
          mileage: 10
        }
      },
      ]
    };
  },
  components:{
    // Map
  },
  mounted() {
    // this.getPie3();
    this.agvListDate.forEach(agv=> {
        this.mileage += agv.agvList.mileage
      })
    console.log(this.mileage);
  },
  methods: {
    getMap() {
      var echarts = require("echarts");

      var ROOT_PATH =
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      $(function() {
        let svg = document.getElementById("svg1");
        console.log(svg);
        echarts.registerMap("MacOdrum-LV5-floorplan-web", { svg: svg });
        option = {
          title: {
            text: "Visit Route",
            left: "center",
            bottom: 10
          },
          tooltip: {},
          geo: {
            map: "MacOdrum-LV5-floorplan-web",
            roam: true,
            emphasis: {
              itemStyle: {
                color: undefined
              },
              label: {
                show: false
              }
            }
          },
          series: [
            {
              name: "Route",
              type: "lines",
              coordinateSystem: "geo",
              geoIndex: 0,
              emphasis: {
                label: {
                  show: false
                }
              },
              polyline: true,
              lineStyle: {
                color: "green",
                width: 8,
                opacity: 1,
                type: "solid"
              },
              effect: {
                show: true,
                period: 4,
                // color: "#a10000",
                constantSpeed: 0,
                trailLength: 0,
                loop: false,
                symbolSize: [15, 30],
                symbol:
                  "image://data:image/png;base64,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"
              },
              data: [
                {
                  coords: [
                    // [651.5,212.5],
                    // [651.5,594.453],
                    [247.75, 212.5],
                    [651.5, 212.5],
                    [651.5, 594.453],
                    [982.5, 593.953]
                  ]
                }
              ]
            }
          ]
        };
        myChart.setOption(option);
      });

      option && myChart.setOption(option);
    },
    async getPie3(floor) {
      let pie3 = this.$echarts.init(document.getElementById("pie3"));
      let echartsid = document.getElementById("pie3");
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 548, name: "撞车" },
              { value: 775, name: "多车管制" },
              { value: 775, name: "充电失败" },
              { value: 775, name: "防撞条触发" },
              { value: 679, name: "脱码警告", selected: true }
            ]
          },
          {
            name: "Access From",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30
            },
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center"
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: [
              { value: 148, name: "AGV004" },
              { value: 335, name: "AGV007" },
              { value: 310, name: "AGV006" },
              { value: 251, name: "AGV005" },
              { value: 234, name: "AGV003" },
              { value: 147, name: "AGV002" }
            ]
          }
        ]
      };
      pie3.setOption(option);
      let listener = function() {
        pie3.resize();
      };
      EleResize.on(echartsid, listener);
    },
  }
};
</script>

<style lang="less" scoped>

</style>
