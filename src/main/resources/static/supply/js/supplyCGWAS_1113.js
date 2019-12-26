
//页面级XMLHttp对象
var xmlhttp;

//向服务器发送信息函数
function getPage(pageURL) {
    xmlhttp = createXMLHttp();
    if (xmlhttp)
    {
        xmlhttp.onreadystatechange = setPageData;
        xmlhttp.open('GET', pageURL);
        xmlhttp.send(null);
    }else{
        alert("XMLHttpRequest对象为空");
    }
}
//回调函数，获得从服务器回发的文档信息并显示在disp层中
function setPageData(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var word = xmlhttp.responseText;
        document.getElementById("disp").innerHTML = word ;
        console.log(word);
    }
}
//创建XMLHttp对象，用于读取远程文档
function createXMLHttp(){
    try {
        return new ActiveXObject ("Microsoft.XMLHTTP");
    }catch(e){
        try {
            return new XMLHttpRequest();
        }catch(e) {
            return null;
        }
    }
    return null;
};
window.onload=function(){ getPage("http://192.168.118.86:9800/file/1.txt"); }

//the function used in cgwas
function barplot(rsid){
    var loca = snp.indexOf(rsid);
    var info_chr = chr[loca];
    var info_bp = bp[loca];
    var info_combp = cp[loca];
    var info_singp = "large than 1e-3";
    if(snp.indexOf(rsid) != -1){
        var info_singp = sp[snp.indexOf(rsid)];
    };
    //删掉上次注释的bar图
    d3.selectAll("#bars").remove();
    //删掉柱图上方椭圆
    d3.selectAll("ellipse").remove();
    //删掉坐标
    d3.select("#bar_yAxis").remove();
    //删掉注释
    d3.selectAll("#batText").remove();
    d3.selectAll("#linePoints").remove();
    d3.selectAll("#barlines").remove();
    //delete legend and add new legend
    d3.selectAll("#legend").remove();
    svg.append("image")
        .attr("xlink:href","http://192.168.118.86/file/css/legend.jpg")
        .attr("x",0)
        .attr("y",80)
        .attr("width",150)
        .attr("height",80)
        .attr("transform", "translate("+0.8*width+",0)")
        .attr("id" , "legend");
    line_log=[];
    line_p=[];
    bar_id=[];
    bar_log=[];
    bar_p=[];
    //information显示
    informationtip.html("<strong>Chrosome</strong>:"+ info_chr+"<br>" +" <strong>rsID</strong>:"+rsid+" <a href='https://www.ncbi.nlm.nih.gov/snp/?term="+rsid+"' target='_BLANK'>learn more in NCBI</a>"+"<br>"+" <strong>BP</strong>:"+info_bp +"<br>"+"<strong> combineP</strong>:"+info_combp+"<br>--------------------<br><strong> singleP</strong>:"+info_singp)
        .style("opacity",1.0);
    var loca = bar_snp.indexOf(rsid);
    //指定线段的画图参数
    var line_p = $.extend(true , [] , Cps[loca]);
    for(var j =0;j<line_p.length;j++){
        line_log.push(-Math.log(parseFloat(line_p[j]))/Math.log(10))
    };

    //指定柱状图颜色
    var bar_color = rep("#0066CC" ,chords_cp_n[loca] ).concat( rep("#99CCCC" ,Phes[1].length-chords_cp_n[loca] ));
    bar_color.unshift("red");

    //指定柱状图的参数
    bar_p = $.extend(true , [] , Sps[loca]);
    bar_p.unshift(parseFloat(info_combp));
    for(var j =0;j<bar_p.length;j++){
        bar_log.push(-Math.log(parseFloat(bar_p[j]))/Math.log(10))
    };
    //柱状图横坐标
    bar_id = $.extend(true , [] , Phes[loca]);
    bar_id.unshift("CombineP");
    //准备坐标轴
    bar_xScale = d3.scaleBand().domain(d3.range(bar_log.length)).rangeRound([padding,(0.3*width-padding)]);
    bar_yScale = d3.scaleLinear().domain([0, 1.2*d3.max(line_log)]).range([ h,padding]);
    bar_xAxis = d3.axisBottom().scale(bar_xScale);
    bar_yAxis = d3.axisLeft().scale(bar_yScale);
    var half = (bar_xScale(1)- bar_xScale(0))/4;
    //**********************
    //开始画图
    //**********************
    //画柱状图
    barset = svg.selectAll("rect")
        .data(bar_log)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return bar_xScale(i);
        })
        .attr("y", function(d) {
            return bar_yScale(d);
        })
        .attr("width", 30)
        .attr("height", function(d) {
            return h-bar_yScale(d);
        })
        .attr("fill" , function(d,i){return bar_color[i];})
        .on( "mouseover", function(d , i){
            tooltip.html("<strong>Single Pvalue</strong>:"+bar_p[i])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            d3.select(this)
                .attr("fill" , "orange");
        })
        .on("mouseout" , function(d , i){
            tooltip.style("opacity",0.0);
            d3.select(this)
                .attr("fill" , bar_color[i]);
        })
        .attr("transform", "translate("+0.5*width+",0)")
        .attr("id" , "bars");
    //绘制折线图
    //x轴的点用数据下标表示
    line_generator=d3.line()
        .x(function(d,i){return bar_xScale(i+1)+half;})
        .y(function(d){return bar_yScale(d)});
    var g=svg.append("g").attr("transform", "translate("+0.5*width+",0)");
    g.append("path")
        .attr("d",line_generator(line_log))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr("fill","none")
        .attr("id" , "barlines");
    //绘制点图
    svg.selectAll("ellipse")
        .data(line_log)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return bar_xScale(i+1)+half;
        })
        .attr("y", function(d) {
            return bar_yScale(d)-2.5;
        })
        .attr("width" , 5)
        .attr("height" , 5)
        .attr("fill" , "black")
        .on( "mouseover", function(d , i){
            tooltip.html("<strong>Combine Pvalue</strong>:"+line_p[i])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            d3.select(this)
                .attr("r" , 8)
                .attr("fill" , "orange");
        })
        .on("mouseout" , function(d , i){
            tooltip.style("opacity",0.0);
            d3.select(this)
                .attr("r" ,5)
                .attr("fill" , "black");
        })
        .attr("transform", "translate("+0.5*width+",0)")
        .attr("id" , "linePoints");

    //添加横坐标
    svg.selectAll("ellipse")
        .data(bar_id)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return bar_xScale(i)+half;
        })
        .attr("y", h+20)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", "translate("+0.5*width+",0)")
        .attr("id" , "batText");
    //添加y轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(0.5*width+padding)+",0)")
        .call(bar_yAxis)
        .attr("id" , "bar_yAxis");
};

function reset(){
    //delete arrow2
    ldplot == "T";
    cgwas_status = 1;
    circle = 0;
    informationtip.style("opacity",0.0);
    d3.selectAll('svg').remove();//清空页面上次遗留的图像
    //重新添加画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width-10)
        .attr("height", 2*height);

   //开始画图
    cmhtPlot(chr,snp,bp,cp,sp,cgwas_status);
};
function boom(circle){
	cgwas_status = -1;
	d3.selectAll('svg').remove();//清空页面上次遗留的图像
	//开始处理数据
	var rscenter = document.getElementById("rscenter").value;
	var rsrange = 1000*parseInt(document.getElementById("rsrange").value);
	boom_chr = [];
	boom_bp = [];
	boom_snp = [];
	boom_cp=[];
	boom_sp=[];
	//circle 向左右平移的时候用的参数
	if(snp.indexOf(rscenter) != -1){
			loc = snp.indexOf(rscenter);
			loc_chr = chr[loc];
			loc_bp = bp[loc];
			loca_start = bp[loc]-rsrange-0.25*circle*rsrange;
			loca_end = bp[loc]+rsrange-0.25*circle*rsrange;
	}else {
		alert("the P-value of "+ rscenter+" is higher than 0.001 !");
	};

	//把区间内数据写入结果中

	for(var i = 0;i<bp.length ;i++){
		//先写combineP的结果
		if(bp[i]>=loca_start && bp[i]<=loca_end && chr[i]==loc_chr){
			boom_chr.push(chr[i]);
			boom_bp.push(bp[i]);
			boom_snp.push(snp[i]);
			boom_cp.push(cp[i]);
            boom_sp.push(sp[i]);
		};
		//再写singleP的结果
		};
	//定义x轴比例,按照输入的起止数据作为坐标轴起终点
	xScale = d3.scaleLinear()
					.domain([d3.max([0, loca_start]), loca_end])
					.range([padding, width*0.4-2*padding]);
	//修改X轴坐标
	//xAxis = d3.axisBottom().scale(xScale).ticks(6);
	//设定每个染色体区间为零，以便于画局部的x轴
    cmhtPlot(boom_chr,boom_snp,boom_bp,boom_cp,boom_sp,cgwas_status);
	var hsnps = [rscenter];
	Highlight(svg , hsnps , "blue");
};
function cmhtPlot(chr,snp,bp,cp,sp,cgwas_status){
    d3.selectAll('svg').remove();//清空页面上次遗留的图像
    //开始计算画图元素
    alert("Done, "+snp.length+"SNPs have been finded !");
    var mhtwidth=0.3;
    //插入局部注释工具
    add();
    toolstatus = 1;
    //获取宽度
    var tipHeight =jQuery('#addld').offset().top;
    informationtip = d3.select("#info")
        .append("div")
        .attr("class","informationtip")
        .style("opacity",0.0)
        .style("left", (0.5*width)+ "px")
        .style("top", (tipHeight+h+2*padding) + "px");
    //添加全局画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width-10)
        .attr("height", 2*height);
    //开始画图
    var y_low = 7;
    //取cp和sp中的最小值的对数 来作为Y坐标轴的最大值
    var y_minP = d3.min([d3.min(cp) , d3.min(sp)]);
    var y_summit = Math.ceil(-Math.log(parseFloat(y_minP))/Math.log(10));
    //定义x轴比例,按照输入的起止数据作为坐标轴起终点
    if(cgwas_status ==1){
        xScale = d3.scaleLinear()
            .domain([0, 3095677412])
            .range([0, width*mhtwidth]);
        //添加x坐标轴
        svg.selectAll("ellipse")
            .data(sep(1,23))
            .enter()
            .append("text")
            .text(function(d){
                return d;
            })
            .attr("x" , function(d){
                return (labelScale[d-1]+labelScale[d])/2*mhtwidth*width;
            })
            .attr("y" , function(d  , i){
                return h+i%2*10
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("transform", "translate("+(left_move+padding)+",15)")
            .attr("id" , "xlable");
    }else{
        xAxis = d3.axisBottom().scale(xScale).ticks(6);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+(left_move)+","+h+")")
            .call(xAxis);
    };

    //定义y轴比
    Yup1Scale = d3.scaleLinear().domain([3, y_low]).range([h, h/2]);
    Yup2Scale = d3.scaleLinear().domain([y_low, y_summit]).range([h/2, padding]);

    //定义上侧y1轴
    Yup1Axis = d3.axisLeft().scale(Yup1Scale).ticks(6);
    //定义上侧y2轴
    Yup2Axis = d3.axisLeft().scale(Yup2Scale).ticks(5);
    //下方
    Ydown1Scale = d3.scaleLinear().domain([0, y_low]).range([h+20, 3*h/2]);
    Ydown2Scale = d3.scaleLinear().domain([y_low, y_summit]).range([3*h/2, 2*h-padding]);
    //定义上侧y1轴
    Ydown1Axis = d3.axisLeft().scale(Ydown1Scale).ticks(6);
    //定义上侧y2轴
    Ydown2Axis = d3.axisLeft().scale(Ydown2Scale).ticks(5);
    //******************
    //处理文件并画CombineP
    //******************
    //开始添加combine p显著的点
    circle_up = svg.selectAll("rect")
        .data(chr)
        .enter()
        .append("circle")
        .attr("cx" , function(d , i){
            //-1 代表局部作图
            if(cgwas_status == -1){
                return xScale(bp[i]);}
            else{
                return (xScale(bp[i])+labelScale[chr[i]-1]*(mhtwidth*width));
            }
        })
        .attr("cy" , function(d , i){
            if(cp[i]>=5e-8 && cp[i]<=1e-3){
                return Yup1Scale(-Math.log(parseFloat(cp[i]))/Math.log(10));
            }else if(cp[i]<5e-8 ){
                return Yup2Scale(-Math.log(parseFloat(cp[i]))/Math.log(10));
            }else{
                return "null";
            };
        })
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .attr("r" , 2)
        .attr("fill" ,function(d , i){return upcol[d%2]})
        .on("mouseover", function(d , i){
            tooltip.html("<strong>Chrosome</strong>:"+ chr[i]+"<br>" +" <strong>rsID</strong>:"+snp[i]+" <strong>BP</strong>:"+bp[i] +"<br>"+" <strong> combineP</strong>:"+cp[i]+"<br>--------------------<br><strong> singleP</strong>:"+sp[i])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            //把single的点也渲染了
            circle_down.filter(function(v , j) {return snp[j] == snp[i];})
                .attr("r", 4)
                .attr("fill", "red");
            d3.select(this)
                .attr("r", 4)
                .attr("fill" , "red");
            //append arrow2
            if (ldplot == "T") {
                //delete arrow2
                d3.select("#arrow2").remove();
                //insert new arrow2
                svg.selectAll("ellipse")
                    .data([i])
                    .enter()
                    .append("image")
                    .attr("xlink:href",websiteUrl+"/css/arrow2.jpg")
                    .attr("x",xScale(bp[i])-5)
                    .attr("y",height+20)
                    .attr("width",10)
                    .attr("height",20)
                    .attr("transform", "translate("+(leftMove+padding)+",0)")
                    .attr("id" , "arrow2");
            };
        })
        .on("mouseout", function(d , i) {
            d3.select(this)
                .attr("r", 1.5)
                .attr("fill" ,function(d){return upcol[d%2]});
            //把single的点也渲染了
            circle_down.filter(function(v , j) {return snp[j] == snp[i];})
                .attr("r", 1.5)
                .attr("fill", downcol[d%2]);
            tooltip.style("opacity",0.0)
                .style("left", 0+"px")
                .style("top", 0+"px");
            if(click !=null){
                click.attr("r" ,4)
                    .attr("fill" , "red");
            };
        })
        .on("click" , function(d , i) {
            //把前一个点的颜色改变
            document.getElementById("rscenter").value=snp[i];
            if(click !=null){
                click.attr("r" ,3)
                    .attr("fill" , click_col);
            };
            //开始给新的点赋值
            click = d3.select(this);
            click_col = upcol[chr[i]%2];
            click.attr("r" , 4)
                .attr("fill" , "red");
            //开始画柱状图
            barplot(snp[i]);
        });
    //添加yup1轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .call(Yup1Axis);
    //添加yup2轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .call(Yup2Axis);
    //******************
    //处理文件并画SingleP
    //******************
    circle_down = svg.selectAll("rect")
        .data(chr)
        .enter()
        .append("circle")
        .attr("cx" , function(d , i){
            if(cgwas_status == -1){
                return xScale(bp[i]);}
            else{
                return (xScale(bp[i])+labelScale[chr[i]-1]*(mhtwidth*width));
            }
        })
        .attr("cy" , function(d , i){
            if(sp[i]>=5e-8){
                return Ydown1Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
            }else if(sp[i]<5e-8 ){
                return Ydown2Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
            }else{
                return "null";
            };
        })
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .attr("r" , 2)
        .attr("fill" ,function(d , i){return downcol[d%2]})
        .on("mouseover", function(d , i){
            tooltip.html("<strong>Chrosome</strong>:"+ chr[i]+"<br>" +" <strong>rsID</strong>:"+snp[i]+"<br>"+" <strong>BP</strong>:"+bp[i] +"<br>"+" <strong> singleP</strong>:"+sp[i]+"<br>--------------------<br><strong> combineP</strong>:"+cp[i])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            //把combine的点也渲染了
            circle_up.filter(function(v , j) {return snp[j] == snp[i];})
                .attr("r", 4)
                .attr("fill", "red");
            d3.select(this)
                .attr("r", 4)
                .attr("fill" , "red");
            //append arrow2
            if (ldplot == "T") {
                //delete arrow2
                d3.select("#arrow2").remove();
                //insert new arrow2
                svg.selectAll("ellipse")
                    .data([i])
                    .enter()
                    .append("image")
                    .attr("xlink:href",websiteUrl+"/css/arrow2.jpg")
                    .attr("x",xScale(bp[i])-5)
                    .attr("y",height+20)
                    .attr("width",10)
                    .attr("height",20)
                    .attr("transform", "translate("+(left_move+padding)+",0)")
                    .attr("id" , "arrow2");
            };
        })
        .on("mouseout", function(d , i) {
            d3.select(this)
                .attr("r", 2)
                .attr("fill" ,function(d){return downcol[d%2]});
            //把single的点也渲染了
            circle_up.filter(function(v , j) {return snp[j] == snp[i];})
                .attr("r", 2)
                .attr("fill", upcol[d%2]);
            tooltip.style("opacity",0.0)
                .style("left", 0+ "px")
                .style("top", 0 + "px");
            if(click !=null){
                click.attr("r" , 4)
                    .attr("fill" , "red");
            };
        })
        .on("click" , function(d , i) {
            //填充rs框
            document.getElementById("rscenter").value=snp[i];
            //把前一个点的颜色改变
            if(click !=null){
                click.attr("r" ,2)
                    .attr("fill" , click_col);
            };
            //开始给新的点赋值
            click = d3.select(this);
            click_col = downcol[chr[i]%2];
            click.attr("r" , 4)
                .attr("fill" , "red");
            //开始画柱状图
            barplot(snp[i]);
        });
    //添加yup1轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .call(Ydown1Axis);
    //添加yup2轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+(left_move+padding)+",0)")
        .call(Ydown2Axis);
};

function cmhtFile(){
    //load cmht files
    var objFile = document.getElementById("cmht");
    if(objFile.value == "") {
        alert("please load your CGWAS result ");
        d3.selectAll("svg").remove();
    }else{
        var files = $('#cmht').prop('files'); //获取到文件列表
        //获取画图参数
        //*********************
        //Combine snp 所需要的参数
        //*********************
        chr=[];
        snp=[];
        bp=[];
        cp=[];
        sp = [];

        var length;
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsText(files[0], "UTF-8");
        reader.onload = function(evt){ //读取完文件之后会回来这里
            fileString=evt.target.result.split("\n");	// 读取文件内容并拆分为字符串

            //******************
            //处理文件并画CombineP
            //******************
            for(var j=1;j<fileString.length;j++){
                var rows = fileString[j].split(" ") //每行进行拆分
                //字符串不为空则添加到数组内，顺便添加判断元素
                if( rows.length > 1){
                    chr.push(parseFloat(rows[0]));
                    bp.push(parseFloat(rows[1]));
                    snp.push(rows[2]);
                    //放入combine p的值
                    cp.push(parseFloat(rows[3]));
                    //放入single p的值
                    sp.push(parseFloat(rows[4]));
                };
            };
        };
    };
    //load bar files
    var objFile = document.getElementById("barfile");
    if(objFile.value != "") {
        var files = $('#barfile').prop('files'); //获取到文件列表
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsText(files[0], "UTF-8");
        reader.onload = function(evt){ //读取完文件之后会回来这里
            //重置参数
            bar_snp = [];
            chords_cp_n = [];
            chords_sp_n = [];
            Cps = [];
            Phes = [];
            Sps = [];

            //开始处理数据
            var barString=evt.target.result.split("\n");	// 读取文件内容并拆分为字符串
            var header = barString[0];

            bar_num = (header.split(" ").length - 3)/3;
            //开始按行遍历
            for(var j=1;j<barString.length;j++){
                var rows = barString[j].split(" ") //每行进行拆分
                //字符串不为空则添加到数组内，顺便添加判断元素
                bar_snp.push(rows[0]);
                chords_cp_n.push(parseFloat(rows[1]));
                chords_sp_n.push(parseFloat(rows[2]));
                Cps[j-1]=rows.slice(3 , bar_num+3).map(Number);
                Phes[j-1]=rows.slice(bar_num+3,2*bar_num+3);
                Sps[j-1]=rows.slice(2*bar_num+3).map(Number);
            };
            file_status = "done";
        };
    };
};
function cmht(){
    //注释框
    tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip");
    width=$(window).width();
    left_move=$(window).width()*0.1;
    loading(svg , 850 , 100);
    //处理文件
    cmhtFile();

    setTimeout("cmhtPlot(chr,snp,bp,cp,sp,cgwas_status)" , 6000);
};
function add_ld(){
	var AreaData = document.getElementById("ldarea").value;
	//查找对应染色体的位置
	var blockchr = boom_chr[0];
	var blockstart = d3.min(boom_bp);
	var blockend = d3.max(boom_bp);
	ldPlot(AreaData , blockchr , blockstart , blockend , svg);
};
function leftmove(){
	circle = circle+1;
	boom(circle);
};
function rightmove(){
	circle = circle-1;
	boom(circle);
};
function Highlight_snp(){
	var hsnp = document.getElementById("Hsnp").value;
	//若是在全局的层面下进行Highlight
	var hsnps =hsnp.split(",");
	Highlight(svg , hsnps ,"#9933CC");
};
function Highlight(svg , hsnps ,hcol){	
	if(cgwas_status == "whole"){
		var delist = [];
		for(var i = 0 ; i<hsnps.length ; i++){			
			if(snp.indexOf(hsnps[i]) == -1){
				//删除未发现的元素
				delist.push(hsnps[i]);
			};
		};
		var notfind = "Sorry , can't find ";
		for(var i = 0; i<delist.length ; i++){
			notfind = notfind+delist[i]+","
			hsnps.splice(hsnps.indexOf(delist[i]) , 1);
		};
		//判断是否存在未找到的点，若有，则提示
		if(delist.length !=0){			
			alert(notfind+" please check it carefully !");
		};
		//标记现有的rectangle的个数
		var rect_length = d3.selectAll("rect")._groups[0].length;
		//标记cp		
		svg.selectAll("rect")
			.data(rep(1 , rect_length).concat(hsnps))
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){				
				return (xScale(bp[snp.indexOf(d)])+labelScale[chr[snp.indexOf(d)]-1]*(0.4*width-2*padding));})
			.attr("cy" , function(d , i){
				if(cp[snp.indexOf(d)]>=5e-8 && cp[snp.indexOf(d)]<=1e-3){
					return Yup1Scale(-Math.log(cp[snp.indexOf(d)])/Math.log(10));
				}else if(cp[snp.indexOf(d)]<5e-8 ){
					return Yup2Scale(-Math.log(cp[snp.indexOf(d)])/Math.log(10));
				};				
			})
			.attr("r" , 6)
			.attr("fill" , hcol)
			.attr("transform", "translate("+left_move+",0)")
			.on("mouseover", function(d , i){
				tooltip.html("<strong>Chrosome</strong>:"+ chr[snp.indexOf(d)]+"<br>" +" <strong>rsID</strong>:"+d+"<br>"+" <strong>BP</strong>:"+bp[snp.indexOf(d)] +"<br>"+" <strong> combineP</strong>:"+cp[snp.indexOf(d)]+"<br>--------------------<br><strong> singleP</strong>:"+sp[sp_snp.indexOf(d)])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);			
			})
			.on("mouseout", function(d , i) {
				tooltip.style("opacity",0.0)
						.style("left", 0+"px")
						.style("top", 0+"px");
					})
			.on("click" , function(d , i) {
					//把前一个点的颜色改变
					document.getElementById("rscenter").value=d;		
					//开始画柱状图
					barplot(d);
				});

			//标记sp
		svg.selectAll("rect")
			.data(rep(1 , rect_length).concat(hsnps))
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){return (xScale(sp_bp[sp_snp.indexOf(d)])+labelScale[sp_chr[sp_snp.indexOf(d)]-1]*(0.4*width-2*padding));})
			.attr("cy" , function(d , i){
				if(sp[sp_snp.indexOf(d)]>=5e-8 && sp[sp_snp.indexOf(d)]<=1e-3){
					return Ydown1Scale(-Math.log(sp[sp_snp.indexOf(d)])/Math.log(10));
				}else if(sp[sp_snp.indexOf(d)]<5e-8 ){
					return Ydown2Scale(-Math.log(sp[sp_snp.indexOf(d)])/Math.log(10));
				};				
			})
			.attr("r" , 6)
			.attr("fill" , hcol)
			.attr("transform", "translate("+left_move+",0)")
			.on("mouseover", function(d , i){
				tooltip.html("<strong>Chrosome</strong>:"+ sp_chr[sp_snp.indexOf(d)]+"<br>" +" <strong>rsID</strong>:"+d+"<br>"+" <strong>BP</strong>:"+sp_bp[sp_snp.indexOf(d)] +"<br>"+" <strong> combineP</strong>:"+cp[snp.indexOf(d)]+"<br>--------------------<br><strong> singleP</strong>:"+sp[sp_snp.indexOf(d)])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);			
			})
			.on("mouseout", function(d , i) {
				tooltip.style("opacity",0.0)
						.style("left", 0+"px")
						.style("top", 0+"px");
					})
			.on("click" , function(d , i) {
					//把前一个点的颜色改变
					document.getElementById("rscenter").value=d;		
					//开始画柱状图
					barplot(d);
				});					
	}else if(cgwas_status == "local"){
		var delist = [];
		for(var i = 0 ; i<hsnps.length ; i++){			
			if(boom_snp.indexOf(hsnps[i]) == -1){
				//删除未发现的元素
				delist.push(hsnps[i]);
			};
		};
		var notfind = "Sorry , can't find ";
		for(var i = 0; i<delist.length ; i++){
			notfind = notfind+delist[i]+","
			hsnps.splice(hsnps.indexOf(delist[i]) , 1);
		};
		if(delist.length !=0){			
			alert(notfind+" please check it carefully !");
		};

		//标记cp				
		svg.selectAll("ellipse")
			.data(hsnps)
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){
				return xScale(boom_bp[boom_snp.indexOf(d)]);})
			.attr("cy" , function(d , i){
				if(boom_cp[boom_snp.indexOf(d)]>=5e-8 && boom_cp[boom_snp.indexOf(d)]<=1e-3){
					return Yup1Scale(-Math.log(boom_cp[boom_snp.indexOf(d)])/Math.log(10));
				}else if(boom_cp[boom_snp.indexOf(d)]<5e-8 ){
					return Yup2Scale(-Math.log(boom_cp[boom_snp.indexOf(d)])/Math.log(10));
				};				
			})
			.attr("r" , 6)
			.attr("fill" , hcol)
			.attr("transform", "translate("+left_move+",0)")
			.on("mouseover", function(d , i){
				tooltip.html("<strong>Chrosome</strong>:"+ boom_chr[boom_snp.indexOf(d)]+"<br>" +
					" <strong>rsID</strong>:"+d+"<br>"+" <strong>BP</strong>:"+boom_bp[boom_snp.indexOf(d)] +
					"<br>"+" <strong> combineP</strong>:"+boom_cp[boom_snp.indexOf(d)]+"<br>--------------------<br><strong> singleP</strong>:"+
					boom_sp[boom_sp_snp.indexOf(d)])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);			
			})
			.on("mouseout", function(d , i) {
				tooltip.style("opacity",0.0)
						.style("left", 0+"px")
						.style("top", 0+"px");
					})
			.on("click" , function(d , i) {
					//把前一个点的颜色改变
					document.getElementById("rscenter").value=d;		
					//开始画柱状图
					barplot(d);
				});

			//标记sp
		svg.selectAll("rect")
			.data(rep(1 , rect_length).concat(hsnps))
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){return xScale(boom_sp_bp[boom_sp_snp.indexOf(d)]);})
			.attr("cy" , function(d , i){
				if(boom_sp[boom_sp_snp.indexOf(d)]>=5e-8 && boom_sp[boom_sp_snp.indexOf(d)]<=1e-3){
					return Ydown1Scale(-Math.log(boom_sp[boom_sp_snp.indexOf(d)])/Math.log(10));
				}else if(boom_sp[boom_sp_snp.indexOf(d)]<5e-8 ){
					return Ydown2Scale(-Math.log(boom_sp[boom_sp_snp.indexOf(d)])/Math.log(10));
				};				
			})
			.attr("r" , 6)
			.attr("fill" , hcol)
			.attr("transform", "translate("+left_move+",0)")
			.on("mouseover", function(d , i){
				tooltip.html("<strong>Chrosome</strong>:"+ boom_sp_chr[boom_sp_snp.indexOf(d)]+
					"<br>" +" <strong>rsID</strong>:"+d+"<br>"+" <strong>BP</strong>:"+
					boom_sp_bp[boom_sp_snp.indexOf(d)] +"<br>"+" <strong> combineP</strong>:"+
					boom_cp[boom_snp.indexOf(d)]+"<br>--------------------<br><strong> singleP</strong>:"+
					boom_sp[boom_sp_snp.indexOf(d)])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);			
			})
			.on("mouseout", function(d , i) {
				tooltip.style("opacity",0.0)
						.style("left", 0+"px")
						.style("top", 0+"px");
					})
			.on("click" , function(d , i) {
					//把前一个点的颜色改变
					document.getElementById("rscenter").value=d;		
					//开始画柱状图
					barplot(d);
				});
	};	
	
};
function hideExcept(tn){
	ChordsStatus = tn;
	var list = ["t1" , "t2" , "t3" , "t4"];
	var position = list.indexOf(tn);
	list.splice(position,1);
	//先全部正常
	document.getElementById("t1").bgColor = "white";
	document.getElementById("t2").bgColor = "white";
	document.getElementById("t3").bgColor = "white";
	document.getElementById("t4").bgColor = "white";
	for(var i  = 0;i<list.length;i++){
		document.getElementById(list[i]).bgColor = "#C0C0C0";
	};
};

//#################################
//--------------------------------
//load files
//--------------------------------
//##################################
//load phes
function getphes(){
    //load phe data
    var objFile = document.getElementById("Phenotypes");
    if(objFile.value != "") {
        var files1 = $('#Phenotypes').prop('files'); //获取到文件列表
        var reader1 = new FileReader(); //新建一个FileReader
        reader1.readAsText(files1[0], "UTF-8");
        reader1.onload = function(evt){ //读取完文件之后会回来这里
            //开始处理数据
            var rows1=evt.target.result.split("\n");	// 读取文件内容并拆分为字符串
            //开始按行遍历
            for(var j=0;j<rows1.length;j++){
                var sub1 = rows1[j].split("\r") //每行进行拆分
                //字符串不为空则添加到数组内，顺便添加判断元素
                Phes.push(sub1[0]);
            };
        };
    };
    //load snp data
    var objFile2 = document.getElementById("topGwas");
    if(objFile.value != ""){
        var files2 = $('#topGwas').prop('files'); //获取到文件列表
        var reader2 = new FileReader(); //新建一个FileReader,获取结果
        reader2.readAsText(files2[0], "UTF-8");
        reader2.onload = function(evt){ //读取完文件之后会回来这里
            var rows2 = reader2.result.split("\n");
            //get gwas files
            for(var j=0;j<rows2.length;j++ ){
                rows2[j] = rows2[j].replace("\r" , "");
                var sub2 = del(rows2[j].split("\t"),  "");
                var n = sub2.length;
                chr.push(sub2[0]);
                bp.push(sub2[1]);
                snp.push(sub2[2]);
                //get phes and p-value
                var gphe =[];
                var gpvalue=[];
                for(var l=0;l<(n-3)/2;l++){
                    gphe.push(sub2[2*l+3]);
                    gpvalue.push(sub2[2*l+1+3]);
                }
                gwas_phes.push(gphe);
                gwas_pvalue.push(changeFloat(gpvalue));
            };
            chr=changeInt(chr);
            bp = changeInt(bp);
        };
    };

    //load significant data
    var objFile3 = document.getElementById("topCgwas");
    if(objFile3.value != "") {
        var files3 = $('#topCgwas').prop('files'); //获取到文件列表
        var reader3 = new FileReader(); //新建一个FileReader,获取结果
        reader3.readAsText(files3[0], "UTF-8");
        reader3.onload = function(evt){ //读取完文件之后会回来这里
            var rows3 = reader3.result.split("\n");
            //get gwas files
            for(var k=0;k<rows3.length;k++ ){
                rows3[k] = rows3[k].replace("\r" , "");
                var sub3 = del(rows3[k].split("\t") , "");
                var n = sub3.length;
                c_chr.push(sub3[0]);
                c_bp.push(sub3[1]);
                c_snp.push(sub3[2]);
                cgwas_pvalue.push(sub3[3]);
                cgwas_phes.push(sub3.slice(4,n));
            };
            c_chr=changeInt(c_chr);
            c_bp = changeInt(c_bp);
            cgwas_pvalue = changeFloat(cgwas_pvalue);
        };
    };
};
function insertChromsome(){
    d3.selectAll("svg").remove();
    width=$(window).width();
    leftMove = width*0.1;
    //表型信息也可是CGWAS的function生成的一列文件
    //添加全局画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width)
        .attr("height", 2*height);
    xScale=d3.scaleBand()
        .domain(sep(1,24))
        .rangeRound([padding,  width-4*leftMove-2*padding]);
    barwidth = xScale(2)-xScale(1);
    heightScale= d3.scaleLinear()
        .domain([0, 249250621])
        .range([padding, height]);
    //definite colors of each phenotyopes
    var zoom = 100/Phes.length;
    for(var i=0;i<Phes.length;i++){
        phenoColors.push(colors[(i%100)*zoom]);
    };
    //insert chrosome image
    svg.selectAll("ellipse")
        .data(sep(1,24))
        .enter()
        .append("image")
        .attr("xlink:href",function(d){
            return(websiteUrl+"/css/chrosome/chr"+d+".png");
        })
        .attr("x",function(d){
            //center location，move left 10
            return xScale(d)})
        .attr("y",function(d){
            return(height-heightScale(chrLength[d-1]))
        })
        .attr("width",padding)
        .attr("height",function(d){return heightScale(chrLength[d-1])})
        .attr("transform", "translate("+leftMove+",0)")
        .attr("id" , "Chrom_bg");
    //insert chrID
    svg.selectAll("ellipse")
        .data(sep(1,22).concat(["x" , "Y"]))
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d , i){
            return xScale(i+1)+barwidth*2/3;
        })
        .attr("y", height+padding/3)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("transform", "translate("+leftMove+",0)")
        .attr("id" , "text_chr");
    //插入整条染色体注释信息
    Changechr();
    //#################
    //layout
    //#################
    svg.selectAll("ellipse")
        .data(["GWAS","CGWAS"])
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d , i){
            return -20+80*i;
        })
        .attr("y", 40)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", "translate("+8*leftMove+","+1.5*padding+")")
        .attr("id" , "text_all");
    //add phenotypes
    //phenotype text
    svg.selectAll("ellipse")
        .data(Phes)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("x", 110)
        .attr("y",function(d , i){
            return 80+30*i;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", "translate("+7*leftMove+","+1.5*padding+")")
        .attr("id" , "text_phe");
    //*********************
    //---------------------
    //phenotype button
    //---------------------
    //*********************
    gwas_stat = rep(-1 , Phes.length);
    cgwas_stat = rep(-1 , Phes.length);
    svg.selectAll("ellipse")
        .data(Phes)
        .enter()
        .append("rect")
        .attr("width",20)
        .attr("height",10)
        .attr("x", -80)
        .attr("y",function(d , i){
            return 75+30*i;
        })
        .attr("fill" , function(d , i){
            return colors[(i%100)*zoom];
        })
        .attr("transform", "translate("+7*leftMove+","+1.5*padding+")")
        .attr("id" , "phenotype");
    //controler
    annotation();
};
function Changechr(){
    //insert chrosome button
    d3.selectAll("#chr_buton").remove();
    d3.selectAll("#chr_annotated").remove();
    d3.selectAll("#chr_loci").remove();
    d3.selectAll("#gwas_pheno").remove();
    d3.selectAll("#cgwas_pheno").remove();
    d3.selectAll("#chrosome_name").remove();

    //colors[(i%100)*zoom

    //在染色体的底部，插入选择button
    svg.selectAll("ellipse")
        .data(chr_stat)
        .enter()
        .append("image")
        .attr("xlink:href",function(d , i){
            if(d == -1){return (websiteUrl+"/css/unselect.png")}
            else{return (websiteUrl+"/css/select.png")}
        })
        .attr("x", function(d , i){
            return xScale(i+1)+barwidth*2/3-5;
        })
        .attr("y", height+padding*2/3)
        .attr("width",10)
        .attr("height",10)
        .on("click" , function(d , i){
            chr_stat = rep(-1,24);
            chr_stat[i] = chr_stat[i]*(-1);
            Changechr();
        })
        .attr("transform", "translate("+leftMove+",0)")
        .attr("id" , "chr_buton");

    //##############################
    //------------------------------
    //insert chrosome that annotated
    //------------------------------
    //##############################
    //insert chrosome figure
    var i = chr_stat.indexOf(1);
    var loci = findAll(chr,i+1);
    svg.append("image")
        .attr("xlink:href", websiteUrl+"/css/chrosomeHertial/chr"+(i+1)+".png")
        .attr("x", 0)
        .attr("y", 3/2*height)
        .attr("height",50)
        .attr("transform", "translate("+(leftMove+padding)+",0)")
        .attr("id" , "chr_annotated");
    //insert the chrosome name
    svg.selectAll("ellipse")
        .data([i])
        .enter()
        .append("text")
        .text(function(d){
            if(d==22 ){
                return "chrosome : X";
            }else if(d==23){
                return "chrosome : Y";
            }else{
                return "chrosome : "+(d+1);
            }
        })
        .attr("x", width/2-2*padding)
        .attr("y",height+2*padding)
        .attr("font-family", "sans-serif")
        .attr("font-size", "30px")
        .attr("fill", "black")
        .attr("id" , "chrosome_name");

    //inset gwas and cgwas zoom

    svg.append("text")
        .text("gwas")
        .attr("x", 0)
        .attr("y",1.4*height)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .attr("transform", "translate("+(leftMove+padding)+",0)")
        .attr("id" , "chrosome_name");
    svg.append("text")
        .text("cgwas")
        .attr("x", 0)
        .attr("y",1.5*height+2*padding)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .attr("transform", "translate("+(leftMove+padding)+",0)")
        .attr("id" , "chrosome_name");
    //insert anno_pvalue
    //center_left_move是第n条染色体中心相对于第一条偏移的量
    svg.selectAll("ellipse")
        .data(loci)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return heightScale(bp[d])
        })
        .attr("y", 3/2*height+5)
        .attr("width", 1.5)
        .attr("height", 40)
        .attr("fill" , "black")
        .on( "mouseover", function(d){
            tooltip.html("Chr : "+chr[d]+"<br>BP : " +bp[d] +"<br>SNP : "+snp[d]+"<br>gwas_phenotype : "+gwas_phes[d]+"<br>gwas_pvalue : "+gwas_pvalue[d]+"<br>   ---------------"+"<br>cgwas_phenotype : "+cgwas_phes[d]+"<br>cgwas_pvalue : "+cgwas_pvalue[d])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            d3.select("this")
                .attr("width", 5);
        })
        .on("mouseout" ,function(){
            tooltip.style("opacity",0.0);
            d3.select("this")
                .attr("width", 1.5)})
        .attr("transform", "translate("+leftMove+",0)")
        .attr("id" , "chr_loci");
    //#####################
    //insert gwas phenotype
    //#####################
    for(var j=0;j<loci.length;j++){
        //insert gwas phenotypes
        svg.selectAll("ellipse")
            .data(gwas_phes[loci[j]])
            .enter()
            .append("circle")
            .attr("cx", heightScale(bp[loci[j]]))
            .attr("cy", function(d , i){
                return 3/2*height-i*12
            })
            .attr("r", 6)
            .attr("fill" , function(d ){
                return phenoColors[Phes.indexOf(d)];
            })
            .on("mouseover", function(d){
                tooltip.html("Phenotypes_gwas :"+d)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity",1.0);
                d3.select("this")
                    .attr("r", 10);
            })
            .on("mouseout" ,function(){
                tooltip.style("opacity",0.0);
                d3.select("this")
                    .attr("r", 6)})
            .attr("transform", "translate("+leftMove+",0)")
            .attr("id" , "gwas_pheno");

        //insert cgwas phenotypes
        svg.selectAll("ellipse")
            .data(cgwas_phes[loci[j]])
            .enter()
            .append("circle")
            .attr("cx", heightScale(bp[loci[j]]))
            .attr("cy", function(d , i){
                return 3/2*height+40+12+i*12
            })
            .attr("r", 6)
            .attr("fill" , function(d){
                return phenoColors[Phes.indexOf(d)];
            })
            .on("mouseover", function(d){
                tooltip.html("Phenotypes_CGWAS :"+d)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity",1.0);
                d3.select("this")
                    .attr("r", 10);
            })
            .on("mouseout" ,function(){
                tooltip.style("opacity",0.0);
                d3.select("this")
                    .attr("r", 6)})
            .attr("transform", "translate("+leftMove+",0)")
            .attr("id" , "gwas_pheno");
    };
};
function Chrosome(){
    //注释框
    d3.selectAll("svg").remove();
    tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip");
    //load data
    getphes();
    width=$(window).width();


    loading(svg , 0.4*width , 0.1*width);
    setTimeout("insertChromsome()" , 5000);
};
function annotation(){
    d3.selectAll("#button_gwas").remove();
    d3.selectAll("#button_cgwas").remove();
    d3.selectAll("#gwas_loci").remove();
    d3.selectAll("#cgwas_loci").remove();
    //gwas button
    svg.selectAll("ellipse")
        .data(gwas_stat)
        .enter()
        .append("image")
        .attr("xlink:href",function(d){
            if(d == -1){
                return(websiteUrl+"/css/off.png");
            }else{
                return(websiteUrl+"/css/on.png");
            }
        })
        .attr("text-anchor", "middle")
        .attr("x", -40)
        .attr("y",function(d , i){
            return 60+30*i;
        })
        .attr("width",50)
        .attr("height",40)
        .attr("transform", "translate("+7*leftMove+","+1.5*padding+")")
        .attr("id" , "button_gwas")
        .on("click" , function(d , i){
            //delete all annotated information
            d3.selectAll("#gwas_loci").remove();
            d3.selectAll("#cgwas_loci").remove();

            //reannotated again
            var gchr=[];
            var gbp=[];
            var gsnp=[];
            var gcolors = [];
            var gphe=[];
            var gpvalue=[];
            gwas_stat[i]=gwas_stat[i]*(-1);
            cgwas_stat=rep(-1 , cgwas_stat.length);

            //change gwas button
            d3.select(this)
                .attr("xlink:href",function(d){
                    if(gwas_stat[i] == -1){
                        return(websiteUrl+"/css/off.png");
                    }else{
                        return(websiteUrl+"/css/on.png");
                    }
                });
            //change cgwas button
            d3.selectAll("#button_cgwas")
                .attr("xlink:href",websiteUrl+"/css/off.png");

            //change picture

            d3.selectAll("#gwas_loci").remove();
            //以表型作为关键词进行遍历
            var phe_loca = findAll(gwas_stat , 1);
            for(var j=0;j<phe_loca.length;j++){
                //遍历所有的行
                var p_selct = Phes[phe_loca[j]];
                for(var k=0;k<chr.length;k++){
                    if(gwas_phes[k].indexOf(p_selct) !=-1){
                        gchr.push(chr[k]);
                        gbp.push(bp[k]);
                        gsnp.push(snp[k]);
                        gcolors.push(phenoColors[phe_loca[j]]);
                        gphe.push(gwas_phes[k]);
                        gpvalue.push(gwas_pvalue[k]);
                    };
                };
            };
            //开始插入图形
            svg.selectAll("ellipse")
                .data(gchr)
                .enter()
                .append("rect")
                .attr("x",function(d){
                    return xScale(d)+(barwidth)/3+6
                })
                .attr("y", function(d , i){
                    return height-heightScale(chrLength[d-1])+heightScale(gbp[i])
                })
                .attr("width", 20)
                .attr("height", 1.5)
                .attr("fill" , function(d , i){
                    return gcolors[i];
                })
                .on( "mouseover", function(d,i){
                    tooltip.html("Chr : "+d+"<br>BP : " +gbp[i] +"<br>SNP : " + gsnp[i] + "<br>gwas_phenotypes : "+gphe[i]+"<br>gwas_pvalue : "+gpvalue[i])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity",1.0);
                    d3.select("this")
                        .attr("height", 5);
                })
                .on("mouseout" ,function(){
                    tooltip.style("opacity",0.0);
                    d3.select("this")
                        .attr("height", 1.5)})
                .attr("transform", "translate("+leftMove+",0)")
                .attr("id" , "gwas_loci");
        });
    //cgwas_button
    svg.selectAll("ellipse")
        .data(cgwas_stat)
        .enter()
        .append("image")
        .attr("xlink:href",function(d){
            if(d == -1){
                return(websiteUrl+"/css/off.png");
            }else{
                return(websiteUrl+"/css/on.png");
            }
        })
        .attr("text-anchor", "middle")
        .attr("x", 40)
        .attr("y",function(d , i){
            return 60+30*i;
        })
        .attr("width",50)
        .attr("height",40)
        .attr("transform", "translate("+7*leftMove+","+1.5*padding+")")
        .attr("id" , "button_cgwas")
        .on("click" , function(d , i){
            //delete all annotated loci
            d3.selectAll("#gwas_loci").remove();
            d3.selectAll("#cgwas_loci").remove();
            //reannotated again
            var cgchr=[];
            var cgbp=[];
            var cgsnp=[];
            var cgcolors = [];
            var cgphe=[];
            var cgpvalue=[];

            //change cgwa stat and reset gwas stat
            cgwas_stat[i]=cgwas_stat[i]*(-1);
            gwas_stat=rep(-1 , gwas_stat.length);

            //change button
            d3.select(this)
                .attr("xlink:href",function(d){
                    if(cgwas_stat[i] == -1){
                        return(websiteUrl+"/css/off.png");
                    }else{
                        return(websiteUrl+"/css/on.png");
                    }
                });
            //change gwas button
            d3.selectAll("#button_gwas")
                .attr("xlink:href",websiteUrl+"/css/off.png");
            d3.selectAll("#gwas_loci").remove();
            //以表型作为关键词进行遍历
            var phe_loca = findAll(cgwas_stat , 1);
            for(var j=0;j<phe_loca.length;j++){
                //遍历所有的行
                var p_selct = Phes[phe_loca[j]];
                for(var k=0;k<chr.length;k++){
                    if(cgwas_phes[k].indexOf(p_selct) !=-1){
                        cgchr.push(chr[k]);
                        cgbp.push(bp[k]);
                        cgsnp.push(snp[k]);
                        cgcolors.push(phenoColors[phe_loca[j]]);
                        cgphe.push(cgwas_phes[k]);
                        cgpvalue.push(cgwas_pvalue[k]);
                    };
                };
            };
            //开始插入图形
            svg.selectAll("ellipse")
                .data(cgchr)
                .enter()
                .append("rect")
                .attr("x",function(d){
                    return xScale(d)+(barwidth)/3+6
                })
                .attr("y", function(d , i){
                    return height-heightScale(chrLength[d-1])+heightScale(cgbp[i])
                })
                .attr("width", 20)
                .attr("height", 1.5)
                .attr("fill" , function(d , i){
                    return cgcolors[i];
                })
                .on( "mouseover", function(d,i){
                    tooltip.html("Chr : "+d+"<br>BP : " +cgbp[i] +"<br>SNP : " + cgsnp[i] + "<br>cgwas_phenotypes : "+cgphe[i]+"<br>cgwas_pvalue : "+cgpvalue[i])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity",1.0);
                    d3.select("this")
                        .attr("height", 5);
                })
                .on("mouseout" ,function(){
                    tooltip.style("opacity",0.0);
                    d3.select("this")
                        .attr("height", 1.5)})
                .attr("transform", "translate("+leftMove+",0)")
                .attr("id" , "cgwas_loci");
        });
};
function diff(a , b){
    if(a.length != b.length){
        alert("the length of vector must be same !");
    }else{
        var result = [];
        for(var i =0;i<a.length;i++){
            result.push(a[i] - b[i]);
        }
    }
    return result;
};
function addarray(a , b){
    if(a.length != b.length){
        alert("the length of vector must be same !");
    }else{
        var result = [];
        for(var i =0;i<a.length;i++){
            result.push(a[i] + b[i]);
        }
    };
    return result;
};
function divide(a , n){
    result = [];
    for(var i =0;i<a.length;i++){
        result.push(a[i]/n);
    }
    return result;
};
function multi(a , n){
    var result = [];
    for(var i =0;i<a.length;i++){
        result.push(a[i]*n);
    }
    return result;
};
function changeInt(array){
    var result = [];
    for(var i=0;i<array.length;i++){
        result.push(parseInt(array[i]));
    };
    return(result);
};
function changeFloat(array){
    var result = [];
    for(var i=0;i<array.length;i++){
        result.push(parseFloat(array[i]));
    };
    return(result);
};
function above(a , n){
    result = [];
    for(var i=0;i<a.length;i++){
        if(a[i]>n){
            result.push(i);
        }
    }
    return result;
};
function below(a , n){
    result = [];
    for(var i=0;i<a.length;i++){
        if(a[i]<n){
            result.push(i);
        }
    }
    return result;
};
function del(a , n){
    result = [];
    for(var i = 0;i<a.length;i++){
        if(a[i] != n){
            result.push(a[i]);
        }
    }
    return result;
};