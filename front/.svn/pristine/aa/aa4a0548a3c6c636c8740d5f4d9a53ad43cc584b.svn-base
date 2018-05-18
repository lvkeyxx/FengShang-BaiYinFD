angular.module('BaiYin.common.eCharts', [])
.factory('kpi_echarts', [function() {
    var pageInit = {};
    pageInit.kpiEcharts = function(dataInfo, idname) {
        var myChart = echarts.init(document.getElementById(idname));
        var option = {
            title: dataInfo.title,
            tooltip: {},
            grid:{
                top:'25%',
                left:'15%',
                right:'15%',
                bottom:'15%'
            },
            tooltip: {
                trigger:'axis'//显示每个点
            },
            legend: {
                data: ['销量']
            },
            xAxis: dataInfo.xAxis,
            yAxis: dataInfo.yAxis,
            series: dataInfo.series
        };
        myChart.setOption(option)
    };
    return pageInit;
}])