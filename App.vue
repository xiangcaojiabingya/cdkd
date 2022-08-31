<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  globalData: {
    openReader: true, //阅读器开关
    openFaceAndOcr: true, //人脸核身开关
    countdownTime: 60, //验证码倒计时
  },
};
</script>

<style lang="scss">
@import "common/css/common.scss";
 @import "uview-ui/index.scss";

/*每个页面公共css */
page {
  background-color: #f2f2f2;
  width: 100%;
}

:root {
  --color-orange-text: #ff6619;
  --color-orange2-text: #d24122;
  --color-orange3-text: #ff661a;
  --color-orange4-text: #ff8547;
  --color-orange5-text: #ff872c;
  --color-orange5-text: #ff872c;
  --color-orange-disabled: rgba(255, 102, 26, 0.5);
  --bgColor: #f2f2f2;
  --lineColor: #e6e6e6;
  --fontColor: #333;
  --fontColor1: #666;
  --fontColor2: #999;
  --fontColor3: rgb(252, 82, 82);
  --warn-bg: #fff9db;
  --warn-bg1: #fff3eb;
  --warnFontcColor: #ccaa00;
  --white: #fff;
}
</style>
