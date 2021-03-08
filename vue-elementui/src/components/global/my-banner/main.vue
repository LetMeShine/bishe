<template>
    <!--轮播功能-->
    <div class="banner">
        <img v-for="(v,i) in items" :key="i" :src="v" v-show="cur === i">
        <div class="banner-circle">
            <ul>
                <li class="fl" v-for="(v,i) in items" :key="i" :class="{'selected':cur===i}"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-banner",
        props: {
            // 轮播图集合
            items: {
                type: Array,
                default: () => [require('@/assets/img/1.jpg')]
            }
        },
        data(){
            return {
                cur: 0,// 当前图片下标
                timer: null,//定时器初始化
            }
        },
        methods: {
            /**
            * @description 自动播放
            */
            autoPlay(){
                this.timer = setInterval(this.play,2000);
            },
            /**
            * @description 下一页动播放
            */
            play(){
                this.cur++;
                this.cur = this.cur === this.items.length ? 0 : this.cur;
            }
        },
        mounted(){
            this.autoPlay();
        },
        destroyed(){
            // 清除定时器
            clearInterval(this.timer);
        }
    }
</script>

<style scoped>
    .banner {
        position: relative;
        width: 640px;
        height: 200px;
    }
    .banner-circle {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul {
        padding: 0;
    }
    li {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #eee;
        margin-right: 3px;
    }
    .selected {
        background-color: #ccc;
    }

</style>