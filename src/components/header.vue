<style scoped>
#Top {
    background-color: #444;
    font-size: 15px;
    font-weight: 500;
    padding: 0 20px;
    position: relative;overflow: hidden;
    position: fixed; width: 100%;left: 0;top: 0;z-index: 999
}
.content {
    margin: 0 auto;
    padding: 10px 0;
}
.logo{height: 26px; float: right;}
.rightIcon{ width: 56px;height: 100%;position: absolute;right: 0;top: 0; }
.rightIcon:active{background: #666;}
.rightIcon:after{
  content: '';
  width: 23px;
  display: block; position: absolute; right: 15px;top: 13px;
  height: 17px; border-top: 1px solid #fff;border-bottom: 1px solid #fff;
}
.rightIcon:before{
  content: '';
  width: 23px;
  display: block; position: absolute; right: 15px;top: 22px;
  height: 1px; border-top: 1px solid #fff; 
}
.back{
  width: 60px;height: 100%;position: absolute;left: 0;top: 0; cursor: pointer;
}
.back:after{
  content: '';
    width: 0;
    height: 0;display: block;
    border-color: transparent transparent #fff  #fff ;
    border-style: solid;
    border-width: 13px 13px 3px 3px;
    transform: rotate(45deg);
    position: absolute; left: 20px;top: 15px;
    -webkit-transform: rotate(45deg);
}
.header .content{overflow: hidden;}
</style>

<template>
  <div class="header" id="Top">
    <div class="content">
      <img src="../images/cnodejs_light.svg" class="logo" alt=""> 
      <div class="back" v-show="showBack" @click="backFn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      showBack: +sessionStorage.getItem('his')
    }
  },
  watch :{
    '$route' : function(){

      if(sessionStorage.getItem('hisOff')==1){//判断路由变化，1的时候为正常进入
        //历史记录+1
        var num = +sessionStorage.getItem('his')+1;
        sessionStorage.setItem('his',num);
        this.showBack = 1
        console.log('前进了',sessionStorage.getItem('his'));
      }else{ //判断路由变化，0的时候，代表点击后退
        //历史记录-1
        var num = +sessionStorage.getItem('his')-1;
        sessionStorage.setItem('his',num);
        sessionStorage.setItem('hisOff',1);
        //如果为0的话，代表已经到达最顶层，隐藏后退按钮
        if(sessionStorage.getItem('his') == 0){
          this.showBack = 0
        }
        console.log('后退了',sessionStorage.getItem('his'));
      }
    }
  },
  methods:{
     backFn(){
        //后退，修改状态
        sessionStorage.setItem('hisOff',0);
        this.$router.go(-1);
     }
  },
  created(){
    sessionStorage.setItem('his',sessionStorage.getItem('his') || 0);
    sessionStorage.setItem('hisOff',1);
  }
}
</script>

