<!--
 * @Date: 2022-03-08 12:25:40
 * @Author: Bruce
 * @Description: "首页的管理"
-->

<template>
    <div id="home">
        <el-space direction="vertical" :sizr="20">
        <h1>首页</h1>
        <div id="bar" class="bar-class"></div>
        <div id="line" class="line-class"></div>
        </el-space>
    </div>
</template>

<script>
import * as echarts from "echarts"
export default {
    /* eslint-disable */
    name: "Home",
    mounted(){
        this.loadBoardPosterCount();
        this.load7DayPosterCount();
    },
    methods:{
        loadBoardPosterCount(){
            this.$http.getBoardPosterCount().then(resp => {
                let result = resp["data"]
                let code = result["code"]
                if(code === 200){
                    let data = result["data"]
                    let board_names = data["board_names"]
                    let board_counts = data["board_counts"]
                    var chartDom = document.getElementById('bar');
                    var myChart = echarts.init(chartDom);
                    var option;
                    option = {
                        title: {
                            text: "模块帖子数量",
                            x: "center"
                        },
                        xAxis: {
                            type: 'category',
                            data: board_names
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: board_counts,
                            type: 'bar'
                            }
                        ]
                    };
                    option && myChart.setOption(option);
                }
            })
            
        },
        load7DayPosterCount(){
            this.$http.getDay7PosterCount().then(resp => {
                let result = resp["data"]
                let code = result["code"]
                if(code === 200){
                    let data = result["data"]
                    let poster_date = data["poster_date"]
                    let poster_count = data["poster_count"]
                    var chartDom = document.getElementById('line');
                    var myChart = echarts.init(chartDom);
                    var option;
                    option = {
                        title: {
                            text: "近7天帖子数量",
                            x: "center"
                        },
                        xAxis: {
                            type: 'category',
                            data: poster_date,
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: poster_count,
                            type: 'line'
                            }
                        ]
                    };
                    option && myChart.setOption(option);
                }
            })
            
        }
    }
}
</script>

<style scoped>
.bar-class{
    height:300px;
    width: 100%;
}
.line-class{
    height:300px;
    width: 100%;
    margin-top: 50px;
}
.el-space{
    display: block;
}
</style>