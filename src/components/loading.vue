<style>
.loading{ position: fixed; left: 0;top: 0;z-index: 10000;background: rgba(0,0,0,.0);width: 100%;height: 100%; }
.loading:after{
	content: '';display: block; width: 38px;height: 38px;border: 4px solid rgba(0,0,0,.6);
	border-radius: 50%; border-top: 4px solid cyan;position: absolute; left: 50%;top: 50%;
	margin-left: -19px;margin-top: -19px;background: rgba(0,0,0,.6);
	-webkit-animation: turn 1s linear infinite;
	animation: turn 1s linear infinite;
}
@-webkit-keyframes turn
{
	0%   {-webkit-transform:rotate(0deg)}
	100% {-webkit-transform:rotate(360deg)}
}
@keyframes turn{
	0%   {transform:rotate(0deg)}
	100% {transform:rotate(360deg)}
}

</style>

<template>
  <div class="loading" ontouchmove="return false"></div>
</template>

<script>
export default {
  name: 'load',
  data () {
    return {
       
    }
  }
}
</script>

