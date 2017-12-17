# Vue-Echarts

A custom directive for using [Echarts](http://echarts.baidu.com/) in Vue.js apps.

![banner](https://raw.githubusercontent.com/panteng/vue-echarts/master/banner.jpg)

[Demo](http://panteng.github.io/vue-echarts)

## Usage

1. Download this repo and copy file `./directives/echarts.js` into your project.

2. Register Vue-Echarts as a directive in your `main.js`:

        // javascript
        import Vue from 'vue';
        import V_Echarts from './directives/echarts';

        const App = new Vue({
            ...
            directives: {
                'echarts': V_Echarts
            }
            ...
        }
       
3. Echarts need a dom element to draw charts. You can use a `<div>` for that. Make sure you give a proper width and height for this `<div>`.
    
        // template
        <div class="chart"></div>
        
        // css
        .chart {
            width: 100%;
            height: 400px;
        }

4. Add `v-echarts` directive to this `div`. And assign the object of echart options to `v-echarts`. This object should be defined in javascript.
 
        // template
        <div class="chart" v-echarts="chartOption"></div>
        
        // javascript
        vm.chartOption = {
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
        };
    
6. For realtime charts, since Vue cannot detect property addition or deletion, we cannot just modify the `chartOption` object. However we can do something like this:

        var _this = this;
        // creat a fresh object with properties from the original object
        var newChartOption = Object.assign({this.chartOption);

        // modify properties of the new object
        newChartOption.xAxis[0].data.push(Math.round(_this.chartOption.xAxis[0].data[_this.chartOption.xAxis[0].data.length - 1] + 1));
        newChartOption.xAxis[0].data.shift();
        newChartOption.series[0].data.push(Math.round(Math.random() * 100));
        newChartOption.series[0].data.shift();
        
        // assign the new object to the old object, Vue will detect the change
        _this.chartOption = newChartOption;

## License

MIT