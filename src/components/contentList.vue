<style scoped>
.box {
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    border-radius: 3px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
    min-height: 600px;
}
.item{text-align: left; border-top: 1px solid #e2e2e2;padding: 10px 65px 10px 60px ;position: relative;min-height: 40px;}
.item:first-child{ border: none }
.imgBox{width: 40px; border-radius: 3px; overflow: hidden; height: 40px; position: absolute; left: 10px;top: 10px;border:1px solid #eee;}
.imgBox img{width: 40px; border-radius: 3px; overflow: hidden; height: 40px;}
.imgBox:active{ opacity: 0.5 }

.small{font-size: 12px;color: #888;display: block;margin-top:3px;}
.item:active{background: #f5f5f5}
.item p{padding-top: 0px;overflow: hidden;  
display: -webkit-box;   
text-overflow: ellipsis;  
-webkit-line-clamp: 2;  
-webkit-box-orient: vertical; }
.small a{color: #888}
.item .linkA a{  display: block; }
.item p a:hover{color: #000}
.count_livid{ position: absolute; right: 11px; top: 50%;height: 18px;font-size: 11px; padding: 0 7px; line-height: 18px;background: #aab0c6;border-radius: 15px;font-weight: bold;color: #fff;margin-top: -9px; }
.addMore{ border-top: 1px solid #e2e2e2; padding: 10px; outline: none;-webkit-tap-highlight-color:rgba(0,0,0,0) }
.addMore:active{background: #e2e2e2}
.tab{font-size: 12px;background: #e5e5e5;padding: 0px 5px;color: #888;border-radius: 2px;}
</style>

<template>
    <div class="box">
        <slideBar></slideBar>
        <div class="cell item" style="" v-for="item in arrList">
            <!-- <div class="imgBox">
                <img :src="item.author.avatar_url" alt="">
            </div> -->
            <router-link  :to="{ path: 'user', query : { loginname: item.author.loginname }}" tag="div" class="imgBox">
                <img :src="item.author.avatar_url" alt="">
            </router-link>
            <p class="linkA">
               <router-link  :to="{ path: 'info', query : { id: item.id }}"><em class="tab" v-if="item.good">精华</em>  <em class="tab" v-show="item.tab">{{tabJson[item.tab]}}</em> {{item.title}}</router-link>
            </p>
            <router-link  :to="{ path: 'info', query : { id: item.id }}" tag="span" class="small fade">
                <strong><a href="#">{{item.author.loginname}}</a></strong> &nbsp;•&nbsp; 
                {{item.create_at | formTime}}
            </router-link>
            <router-link  :to="{ path: 'info', query : { id: item.id }}"  class="count_livid">{{item.reply_count}}</router-link>
        </div>
        <div class="addMore" @click="getMore" v-if="arrList.length">
            {{moreTitle}}
        </div>
        <Load v-show="!getOff || !arrList.length"></Load>
    </div>
</template>

<script>
import Load from './loading'
import slideBar from './sideBar'
export default {
    data () {
        return {
            arrList : [],
            moreTitle : '加载更多...',
            page : 1,
            limit : 20, //每页数据
            getOff : true, //数据获取开关
            tabJson : {
                "share" :'分享',
                "ask" : '问答',
                "good" : '精华',
                "job" : "招聘"
            },
            clickOff : false,
            tabArr : ['','good','share','ask','job']
        }
    },
    components :{
        Load,slideBar
    },
    methods : {
        getList(){
            if(window.localStorage.getItem('jump__')) {
                window.localStorage.removeItem('jump__')
                return
            }
            if(!this.clickOff){
                this.arrList = []
            }
            this.ajax.get(this.HOST +'/api/v1/topics',{
                params:{
                    tab : this.tabArr[window.localStorage.getItem('active__')],
                    page:this.page,
                    limit :this.limit
                }
            }).then((res)=> {
                if(res.data.data.length == 0){
                    this.moreTitle = '没有内容啦';
                }else{
                    this.getOff = true;
                    this.clickOff = false
                    this.arrList = this.arrList.concat(res.data.data);
                    console.log(res)
                }
            }).catch((res)=> {
                console.log(res);
            });
        },
        getMore(){
            if(this.getOff){
                console.log( window.localStorage.removeItem('jump__') )
                this.clickOff = true
                this.getOff = false
                this.page++;
                this.getList();
            }
            
        }
    },
    mounted(){
        this.getList();
    },
    //路由更新的时候执行，即路由发生变化的时候
    beforeRouteUpdate (to, from, next) {
        this.getList();
        next();
    }
}
</script>

