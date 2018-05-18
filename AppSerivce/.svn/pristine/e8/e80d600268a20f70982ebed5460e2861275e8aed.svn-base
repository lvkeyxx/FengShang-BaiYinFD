//http://echarts.baidu.com/echarts2/doc/example/line5.html
/*

 * The MIT License (MIT)

 *

 * Copyright (c) 2014-2015 abel533@gmail.com

 *

 * Permission is hereby granted, free of charge, to any person obtaining a copy

 * of this software and associated documentation files (the "Software"), to deal

 * in the Software without restriction, including without limitation the rights

 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

 * copies of the Software, and to permit persons to whom the Software is

 * furnished to do so, subject to the following conditions:

 *

 * The above copyright notice and this permission notice shall be included in

 * all copies or substantial portions of the Software.

 *

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

 * THE SOFTWARE.

 */


package com.utility;


import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.json.GsonOption;
import com.github.abel533.echarts.series.Bar;
import com.github.abel533.echarts.series.Line;
import org.json.JSONObject;


/**

 * @author liuzh

 */

public class LineTest5 {

    public String line() {

        //地址:http://echarts.baidu.com/doc/example/line5.html

    	GsonOption option = new GsonOption();

        option.legend("高度(km)与气温(°C)变化关系");



//        option.toolbox().show(true).feature(
//
//                Tool.mark,
//
//                Tool.dataView,
//
//                new MagicType(Magic.line, Magic.bar),
//
//                Tool.restore,
//
//                Tool.saveAsImage);



        option.calculable(true);

        option.tooltip().trigger(Trigger.axis).formatter("Temperature : <br/>{b}km : {c}°C");



        ValueAxis valueAxis = new ValueAxis();

        valueAxis.axisLabel().formatter("{value} °C");

        option.xAxis(valueAxis);



        CategoryAxis categoryAxis = new CategoryAxis();

        categoryAxis.axisLine().onZero(false);

        categoryAxis.axisLabel().formatter("{value} km");

        categoryAxis.boundaryGap(false);

        categoryAxis.data(0, 10, 20, 30, 40, 50, 60, 70, 80);

        option.yAxis(categoryAxis);



        Line line = new Line();

        line.smooth(true).name("高度(km)与气温(°C)变化关系")

                .data(15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5)

                .itemStyle().normal().lineStyle().shadowColor("rgba(0,0,0,0.4)");

        option.series(line);
        
        
        JSONObject json = new JSONObject(option);
        

/*        option.exportToHtml("line5.html");

        option.view();*/
		
		return json.toString();

    }
    
    
    public String bar(){
    	GsonOption option = new GsonOption();
 	   CategoryAxis categoryAxis = new CategoryAxis();
 	   categoryAxis.data("北京","天津","上海","山东","辽宁","内蒙古","河南","河北","江苏","浙江","西藏","新疆");
 	   option.xAxis(categoryAxis);
 	   ValueAxis valueAxis = new ValueAxis();
 	   valueAxis.axisLabel().formatter("{value} %");
 	   option.yAxis(valueAxis);
 	   Bar bar = new Bar();
 	   bar.name("平台建设情况");
 	   bar.data(2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3);
 	   option.series(bar);
 	   JSONObject json = new JSONObject(option);

// 	   JSONArray json = JSONArray.fromObject(option);
 	   return json.toString();

    }

}
