import Vue from 'vue';
import V_Echarts from './directives/echarts';

const App = new Vue({

    el: '#app',

    data: {
        barChartOptions: {
            tooltip: {},
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            series: [
                {
                    name: 'Num',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10]
                }
            ]
        },
        lineChartOptions: {
            tooltip : {
                trigger: 'axis'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Num',
                    type:'line',
                    areaStyle: {normal: {}},
                    data: [52, 54, 60, 61, 65, 62, 80, 85, 90, 99, 40, 30, 20, 10, 0]
                }
            ]
        }
    },

    mounted: function () {
        const _this = this;

        // simulate realtime data change in line chart
        setInterval(function () {
            _this.updateLineChartData();
        }, 1000);

        // you can access an Echarts instance at the `mounted` stage of the parent VM,
        // by accessing the `echartsInstance` property of the element
        // that v-echarts directive is bind with
        const barChartElement = document.querySelector('#this-is-bar-chart');
        console.log(barChartElement.echartsInstance);
    },

    directives: {
        'echarts': V_Echarts
    },

    methods: {
        updateLineChartData: function () {
            const _this = this;
            // creat a fresh object with properties from the original object
            const newLineChartOptions = Object.assign({}, _this.lineChartOptions);

            // modify properties of the new object 
            // update xAxis data
            newLineChartOptions.xAxis[0].data.push(
                _this.lineChartOptions.xAxis[0].data[_this.lineChartOptions.xAxis[0].data.length - 1] + 1
            );
            newLineChartOptions.xAxis[0].data.shift();

            // update series data
            newLineChartOptions.series[0].data.push(Math.round(Math.random() * 100));
            // shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
            newLineChartOptions.series[0].data.shift();

            // assign the new object to variable `lineChartOptions`, Vue.js will detect the change
            // and Echarts will update the chart properly
            _this.lineChartOptions = newLineChartOptions;
        }
    },

});
