# Vue-Echarts

A simple yet flexible custom directive for using [Echarts](http://echarts.baidu.com/) in Vue.js apps.

![banner](https://raw.githubusercontent.com/panteng/vue-echarts/master/banner.jpg)

## Demo
[Click Here](http://panteng.github.io/vue-echarts)

## Usage

1. Download this repo and copy file `./directives/echarts.js` into your project.

2. Register Vue-Echarts as a directive in your `main.js`:

        // this is your main.js file

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

        // this is your index.html file
        <div id="this-is-bar-chart" class="chart"></div>

        // this is your style.css file
        .chart {
            width: 100%;
            height: 400px;
        }

4. Add `v-echarts` directive to this `div`. And assign an object of Echarts options to `v-echarts`. This object should be defined in your main.js file.

        // this is your index.html file
        <div id="this-is-bar-chart" class="chart" v-echarts="barChartOptions"></div>

        // this is your main.js file
        ...
        const App = new Vue({
            ...
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
                }
            }
            ...
        }

    At this point, you should see a beautiful bar chart in your browser.

5. For dynamic data updating, you need to reassign a new object of Echarts options to the variable `barChartOptions`, EVERY TIME when there's an update in data.
Don't modify the old `barChartOptions` object, that won't trigger reactivity in Vue, thus Echarts won't update the chart. See the code in main.js file for more details.

6. If you need to access an Echarts instance, you can do it by:

        // this is your main.js file

        ...
        mounted: function () {
            const barChartElement = document.querySelector('#this-is-bar-chart');
            console.log(barChartElement.echartsInstance);
            // you can access an Echarts instance at the `mounted` stage of the parent VM,
            // by accessing the `echartsInstance` property of the element
            // that v-echarts directive is bind with
        }
        ...

## License

MIT
