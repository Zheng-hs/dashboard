<template>
  <div class="bg">
    <el-container>
      <el-header>
        <div class="title_img">
          <img id="logo" :src="require('@/assets/logo1.png')" alt="" />
        </div>
        <div class="gifImg">
          <h1>FS二维码AGV物流监控系统</h1>
        </div>
        <div class="menu">
          <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
          >
            <el-menu-item index="/agvc">车辆即时状态</el-menu-item>
            <el-menu-item index="/first">第一屏</el-menu-item>
            <el-menu-item index="/second">第二屏</el-menu-item>
            <el-menu-item index="/third">第三屏</el-menu-item>
            <el-menu-item index="/agv">第四屏</el-menu-item>
          </el-menu> -->

          <el-button type="primary" plain>事前</el-button>
          <el-button type="primary">事中</el-button>
          <el-button type="primary" plain @click="gonew">事后</el-button>>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/first",
      // 是否折叠
      isCollapse: true,
      activePath: "",
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getLogo() {
      let logo = document.querySelector("#logo");
      logo.setAttribute("src", require("../assets/logo1.png"));
    },
    gonew() {
      window.location.href = 'http://fsrserver.cminl.oa:40021/int-portal/TableauNL_IE_AGVflow.html'; 
    }
  },
  mounted() {
    // this.getLogo()
  }
};
</script>

<style lang="less" scoped>
.bg {
  height: 100%;
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
}
.title_img img {
  // width: 350px;
  height: 65px;
  padding: 15px;
  padding-left: 40px;
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
  font-size: 42px;
  padding-bottom: 12px;
  padding-top: 10px;
  font-family: system-ui;
  font-style: oblique;
  text-shadow: 0px 1px 0.5em #05c3ff, 0px 2px 0px #05c3ff, 0px 3px 0px #05c3ff,
    0px 4px 0px #05c3ff, 0px 5px 10px rgba(5, 195, 255, 0.9);
  // text-shadow: 0 0 0.5em #05c3ff, 0 0 0.2em #5c5c5c;
}
.gifImg:after {
  content: "";
  top: 41.5%;
  left: 50%;
  -webkit-transform: translate(-50%, 20%);
  transform: translate(-50%, 20%);
  display: block;
  position: absolute;
  width: 36.5%;
  min-width: 700px;
  height: 100%;
  background: url(../assets/header.gif) no-repeat center center;
  background-size: 120%;
}
.gifImg .month-tip {
  // margin-top: 5px;
  font-size: 24px;
  color: #fff;
}
.menu {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 12px;
  width: 19.5%;
  // height: 50px;
  // z-index: 20000;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // flex-wrap: wrap;
  opacity: 0.8;
  .el-button {
    margin: 2.5px;
    width: 135px;
    font-size: 20px;
    font-weight: bold;
  }
}

.el-menu {
  background-color: rgba(255, 255, 255, 0);
  // display: none;
}

.el-menu-item {
  padding: 0 30.08px;
  font-size: 14px;
}
.el-menu-item i {
  color: #fff;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom-color: rgba(255, 255, 255, 0);
  color: royalblue;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
}

.el-container {
  height: 100%;
}
.toggle-button {
  width: 50px;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  padding: 8px;
}
</style>
