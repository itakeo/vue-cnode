<style scoped>
.infoBox {text-align: left; min-height: 500px;}
.topTit{padding: 12px; border-bottom: 1px solid #eee}
.topTit h1{font-weight: bold;font-size: 18px;text-align: left;margin-bottom: 8px;}
.small{font-size: 12px;color: #888;display: block;margin-top:3px;}
.infoCon{padding: 12px; line-height: 1.5;font-size: 13px;}
.infoContent,.msg {
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    border-radius: 3px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
}
.msg{margin-top: 15px; min-height: auto;}
.cell{font-size: 12px; position: relative; padding: 12px 52px 12px 58px;min-height: 58px; border-bottom: 1px solid #eee;color: #888}
.cell:last-child{ border: none }
.cell p{font-size: 13px;color: #333}
.userIMg{width: 34px;height: 34px;overflow: hidden; background: red;position: absolute; left: 12px;top: 12px;}
.zan img{width: 14px;margin-right: 3px;}
.zan{ position: absolute; right: 10px; top: 12px; }
.userIMg img{width: 34px;height: 34px;}
.titleMsg{padding:10px 12px;font-weight: bold; border-bottom: 1px solid #eee}
.noMsg{ text-align: center; padding: 15px;color: #999; }
</style>

<template>
    <div class="infoBox">
        <div class="infoContent"   v-show="dataInfo">
            <div class="topTit">
                <h1>{{dataInfo.title}}</h1>
                <span class="small fade">
                    <strong>
                        <a href="#">{{loginname}}</a>
                    </strong> &nbsp;•&nbsp; 
                    {{dataInfo.create_at | formTime}}
                    <span style="float:right">浏览次数({{dataInfo.visit_count}})</span>
                </span>
            </div>
            <div class="infoCon" v-html="dataInfo.content"></div>
        </div>
        <div class="msg"   v-show="dataInfo">
            <div class="titleMsg">{{msgArr.length}}条留言信息</div>
            <div class="noMsg" v-show="!msgArr.length">一条留言都没有耶~~快来留言吧！</div>
            <div class="cell" v-for="(item,index) in msgArr">
                <div class="userIMg"><img :src="item.author.avatar_url" alt=""></div>
                <span style="color:#222">{{item.author.loginname}}</span>&nbsp;&nbsp;{{index+1}}楼&nbsp;•&nbsp; {{item.create_at | formTime}}
                <div v-html="item.content"></div>
                <div class="zan"><img src="../images/zan.png" alt="">{{item.ups.length}}</div>
            </div>

        </div>
        <Load v-show="!getOff"></Load>
    </div>
</template>

<script>
import Load from './loading'
export default {
    data () {
        return {
            getOff : false,
            dataInfo : '',
            loginname : '匿名',
            msgArr : []
        }
    },
    components :{
        Load
    },
    methods:{
        getList(){
            this.getOff = false
            this.dataInfo = '',
            this.loginname = '匿名',
            this.msgArr = []
            this.ajax.get(this.HOST +'/api/v1/topic/'+this.$route.query.id,{
                params:{
                    mdrender: true
                }
            }).then((res)=> {
                this.dataInfo = res.data.data
                this.loginname = res.data.data.author.loginname
                this.getOff = true
                this.msgArr = res.data.data.replies
                console.log(res.data.data)
            }).catch((res)=> {
                console.log(res);
            }); 
        }
    },
    mounted(){
        this.getList();
        document.body.scrollTop = 0
    },
    //路由<keep-alive>的时候，会缓存状态，利用activated来更新数据
    activated(){
        this.getList();
        document.body.scrollTop = 0
    },
    //离开的时候执行，可用于后退
    beforeRouteLeave (to, from, next){
        window.localStorage.setItem('jump__',1);
        next();
    }
}
</script>

