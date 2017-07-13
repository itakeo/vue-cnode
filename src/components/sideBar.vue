<style scoped>
.sideBar{
    width: 100%;   padding: 6px 0;
}
.sideBar a{display: inline-block;margin:4px 5px; padding: 4px 12px;background: #f0f0f0; border-radius: 3px;}
.sideBar a:active,.sideBar a.active{background: #000;color: #fff}
</style>

<template>
    <div class="sideBar"> 
        <a href="javascript:;" :class="index == active ? 'active' : ''" @click="routeFn(index)" v-for="(item , index) in tab">{{item}}</a>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active : 0,
            tab : ['全部','精华','分享','问答','招聘']
        }
    },
    methods:{
        routeFn(n){
            this.active = n;
            window.localStorage.setItem('active__',n);
            this.$router.push({path : '/',query : {type : this.active}})
        },
        changeActive (){
            this.active = this.$route.query.type || 0;
        }
    },
    mounted(){
        this.changeActive()
    },
    //返回修改选择状态
    watch :{
        '$route' : 'changeActive'
    }
}
</script>

