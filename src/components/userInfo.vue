<style scoped>
.cell2{ 
	background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    border-radius: 3px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);text-align: left;margin-bottom: 15px;
}
.title{padding: 12px;text-align: left; border-bottom: 1px solid #eee;font-weight: bold}
.item{position: relative;min-height: 62px;padding: 12px 12px 12px 60px ;}
.imgBox2{width: 40px; border-radius: 3px; overflow: hidden; height: 40px; position: absolute; left: 10px;top: 10px;border:1px solid #eee;}
.imgBox2 img{width: 40px; border-radius: 3px; overflow: hidden; height: 40px;}
.imgBox2:active{ opacity: 0.5 }
.userInfo{min-height: 400px;}

.item{text-align: left; border-top: 1px solid #e2e2e2;padding: 10px 12px 10px 60px ;position: relative;min-height: 62px;}
.cell2 .item:nth-of-type(2){ border: none }
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
.item .linkA a{  display: block;overflow: hidden;  
white-space: nowrap;  
text-overflow: ellipsis;  }
.item p a:hover{color: #000}
.count_livid{ position: absolute; right: 11px; top: 50%;height: 18px;font-size: 11px; padding: 0 7px; line-height: 18px;background: #aab0c6;border-radius: 15px;font-weight: bold;color: #fff;margin-top: -9px; }
.linkB{display: block;}
</style>

<template>
	<div class="userInfo">
		<div v-show="userData.loginname">
			<div class="cell2">
				<div class="title">个人信息</div>
				<div class="item">
					<div class="imgBox2">
		                <img :src="userData.avatar_url" alt="">
		            </div>
		            {{userData.loginname}} 
		            <p>注册时间：{{userData.create_at | formTime}}  &nbsp;•&nbsp;  积分:{{userData.score}}</p>
				</div>
			</div>
			
			<div class="cell2">
				<div class="title">最近参与的话题</div>
				<div class="cell item" style="" v-for="item in userData.recent_replies">
					<router-link  :to="{ path: 'info', query : { id: item.id }}"  class="linkB">
			            <div class="imgBox">
			                <img :src="item.author.avatar_url" alt="">
			            </div>
			            <p class="linkA">
			            	{{item.title}}
			            </p>
			            <span class="small fade">
			                <strong>{{item.author.loginname}}</strong> &nbsp;•&nbsp; {{item.last_reply_at | formTime}}
			            </span>
			        </router-link>
		        </div>
			</div>
			<div class="cell2">
				<div class="title">最近创建的话题</div>
				<div class="cell item" style="" v-for="item in userData.recent_topics">
					<router-link  :to="{ path: 'info', query : { id: item.id }}"  class="linkB">
			            <div class="imgBox">
			                <img :src="item.author.avatar_url" alt="">
			            </div>
			            <p class="linkA">
			               {{item.title}} 
			            </p>
			            <span class="small fade">
			                <strong>{{item.author.loginname}}</strong> &nbsp;•&nbsp; 
			                {{item.last_reply_at | formTime}}
			            </span>
			        </router-link>
		        </div>
			</div>
		</div>
		<Load v-show="!userData.loginname"></Load>
	</div>
</template>

<script>
import Load from './loading'
export default {
	name: 'userInfo',
	data () {
		return {
			userData : []
		}
	},
    components :{
        Load
    },
	methods :{
		getInfo(){
			if(window.localStorage.getItem('jump__')) {
                window.localStorage.removeItem('jump__')
                return
            }
			this.userData = []
			this.ajax.get(this.HOST +'/api/v1/user/'+this.$route.query.loginname).then((res)=> {
	        	this.userData = res.data.data
	            console.log(res.data.data)
	        }).catch((res)=> {
	            console.log(res);
	        });
		}
	},
	mounted(){
		this.getInfo()
		console.log( this.$route.query.loginname)
	    
	},
	activated(){
        this.getInfo();
        document.body.scrollTop = 0
    },
    //离开的时候执行，可用于后退
    beforeRouteLeave (to, from, next){
        window.localStorage.setItem('jump__',1);
        next();
    }
}
</script>

