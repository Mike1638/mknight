<template>
  <div id="app">
    <router-view />
    <div class="boxwrapper" v-if="isqrshow" @click="qrclose">
      <div class="qrcode" v-if="isqrshow" >
        <img src="./assets/MKQRCode.png" alt="">
        <div class="tip">请使用手机浏览，体验更佳</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component} from "vue-property-decorator";
@Component({})
export default class App extends Vue{
    qrshow:Boolean = false
    get isqrshow(){
      return this.qrshow
    }
    qrclose(e: MouseEvent){
      if(e.target == e.currentTarget){
        this.qrshow = false
      }
    }
    created(){
      if(document.documentElement.clientWidth >500){
        this.qrshow  = true
      }
    }
}
</script>

<style lang="scss">
@import "~@/assets/styles/reset.scss";
@import "~@/assets/styles/helper.scss";
body{
  font-family:$font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:16px;
  color: #333;
  line-height: 1.5;
  background: #f5f5f5;
}
.boxwrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(127, 127, 127,0.5);
}
.qrcode{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background: #f5f5f5;
  img{
    width: 450px;
    height: 450px;
  }
  .tip{
     padding-bottom: 4px;
     color: #20508a;
  }
  .qrcodecolse{
    padding-bottom: 4px;
    color:red;
    cursor: pointer;
  }
}
</style>
