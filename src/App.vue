<style>
#Wrapper {
    background-repeat: repeat-x;
    text-align: center;
    padding:60px 12px 15px 12px;
    overflow: hidden;width: 100%;
}
#Wrapper .content {
    width: 100%;
}
.toTop{ position: fixed; right: 17px; bottom: 30px; width: 40px;height: 40px;border-radius: 50%; background: rgba(0,0,0,.8);z-index: 120;transition: all .3s ease;border: none;
-webkit-transition: all .3s ease }
.toTop:active{
  transform: scale(1.3);
  -webkit-transform: scale(1.3);
}
.toTop:after{
  content: '';
  display: block;
  width: 0;
height: 0;
border-color: #fff #fff transparent transparent;
border-style: solid;
border-width: 3px 3px 13px 13px;
transform: rotate(-45deg);
-moz-transform: rotate(-45deg);
-webkit-transform: rotate(-45deg);
position: absolute; left: 12px;top: 17px;
}
</style>
<template>
  <div id="app">
    <topHeader></topHeader>

    <div id="Wrapper">
      <div class="content">
        <wrapContent></wrapContent>
      </div>
    </div>
    
    <footerCom></footerCom>
    <button class="toTop" @click="toTop"></button>
  </div>
</template>

<script>
import topHeader from './components/header'
import footerCom from './components/footer'
import wrapContent from './components/content'
export default {
  data () {
    return {}
  },
  components:{
    topHeader,wrapContent,footerCom
  },
  methods:{
    toTop(){
      document.body.scrollTop = 0
    }
  }
}
</script>

<style>
*{margin:0px;padding:0px;box-sizing:border-box}html,body{font-size:14px;color:#333;font-family:"PingHei","PingFang SC","Helvetica Neue","Helvetica","STHeitiSC-Light","Arial",sans-serif,"microsoft YaHei","宋体",Arial;background:#e8e8e8}a{color:#333;text-decoration:none;cursor:pointer}a:hover{color:#222;text-decoration:none!important}a:focus,input:focus,textarea:focus{outline:none}input,button,textarea{font-family:"microsoft YaHei","宋体",Arial;font-size:14px}img,a img{border:0px;vertical-align:middle}ul{list-style:none;margin:0px;padding:0px}ul li{list-style:none;margin:0px;padding:0px}form{margin:0;padding:0;list-style:none}.color6{color:#666666!important}.borderbottom{border-bottom:none!important}em{font-style:normal}table{border-collapse:collapse;border-spacing:0;margin:0;padding:0}.clear{clear:both}.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.clearfix{zoom:1}.markdown-text img{max-width:100%;margin:5px 0}.markdown-text p,.preview p{line-height:1.5;margin:8px 0;font-size:13px;overflow-wrap:break-word;white-space:pre-wrap}.markdown-text > *:last-child,.preview > *:last-child,textarea#title{margin-bottom:1em}.markdown-text > *:first-child,.preview > *:first-child{margin-top:0}.markdown-text li,.preview li{font-size:14px;line-height:1.5}.markdown-text li code,.markdown-text p code,.preview li code,.preview p code{background-color:#fcfafa;color:#000;padding:4px 6px}.markdown-text img{cursor:pointer}.markdown-text h1 code,.markdown-text h2 code,.markdown-text h3 code,.markdown-text h4 code,.markdown-text h5 code,.markdown-text h6 code{color:inherit;font-size:inherit}
</style>
