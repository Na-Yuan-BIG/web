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
    d3.selectAll("#bar_yAxis").remove();
    d3.selectAll("#bar_xAxis").remove();
    d3.selectAll("#batText").remove();
    d3.selectAll("#linePoints").remove();
    d3.selectAll("#barlines").remove();
    d3.selectAll("#legend").remove();
    d3.selectAll("#ylab_bar").remove();
    // add legend
    svg.append("image")
        .attr("xlink:href",websiteUrl+"/css/legend.jpg")
        .attr("x",0.7*width)
        .attr("y",0)
        .attr("height",40)
        .attr("id" , "legend");
    line_log=[];
    line_p=[];
    bar_id=[];
    bar_log=[];
    bar_p=[];
    // //information显示
    // informationtip.html("<strong>Chrosome</strong>:"+ info_chr+"<br>" +" <strong>rsID</strong>:"+rsid+" <a href='https://www.ncbi.nlm.nih.gov/snp/?term="+rsid+"' target='_BLANK'>learn more in NCBI</a>"+"<br>"+" <strong>BP</strong>:"+info_bp +"<br>"+"<strong> combineP</strong>:"+info_combp+"<br>--------------------<br><strong> singleP</strong>:"+info_singp)
    //     .style("opacity",1.0);
    var loca = bar_snp.indexOf(rsid);
    //指定线段的画图参数
    var line_p = $.extend(true , [] , Cps[loca]);
    for(var j =0;j<line_p.length;j++){
        line_log.push(-Math.log(parseFloat(line_p[j]))/Math.log(10))
    };
    //指定柱状图颜色
    var bar_color = rep("#0066CC" ,chords_cp_n[loca] ).concat(rep("#99CCCC" ,Phes[1].length-chords_cp_n[loca] ));
    bar_color.unshift("red");

    //指定柱状图的参数
    bar_p = $.extend(true , [] , Sps[loca]);
    bar_p.unshift(parseFloat(info_combp));
    for(var j =0;j<bar_p.length;j++){
        bar_log.push(-Math.log(parseFloat(bar_p[j]))/Math.log(10))
    };
    //柱状图横坐标
    bar_id = $.extend(true , [] , Phes[loca]);
    bar_id.unshift("Suggest CP");
    //准备坐标轴
    bar_xScale = d3.scaleBand().domain(bar_id).range([0.6*width,(width-padding)]);
    bar_yScale = d3.scaleLinear().domain([0, 1.2*d3.max(line_log)]).range([h,padding]);
    bar_xAxis = d3.axisBottom().scale(bar_xScale);
    bar_yAxis = d3.axisLeft().scale(bar_yScale);
    var half = (bar_xScale(bar_id[1])- bar_xScale(bar_id[0]))/4;
    //**********************
    //开始画图
    //**********************
    //画柱状图
    var barwidth = d3.min([30 , (0.4*width-padding)/(bar_log.length*1.5)]);
    barset = svg.selectAll("ellipse")
        .data(bar_log)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return bar_xScale(bar_id[i])+half;
        })
        .attr("y", function(d) {
            return bar_yScale(d);
        })
        .attr("width", barwidth)
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
        .attr("id" , "bars");
    //绘制折线图
    //x轴的点用数据下标表示
    line_generator=d3.line()
        			.x(function(d,i){return bar_xScale(bar_id[i+1])+2*half;})
        			.y(function(d){return bar_yScale(d)});
    var g=svg.append("g");
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
            return bar_xScale(bar_id[i+1])+2*half;
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
        .attr("id" , "linePoints");

    //添加横坐标
     svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,"+h+")")
        .call(bar_xAxis)
        .selectAll("text")
        .attr("x", 0)
	    .attr("y", 10)
	    .attr("dy", ".35em")
	    //旋转x轴label
	    .attr("transform", "rotate(45)")
	    .style("text-anchor", "start")
	    .attr("id" , "bar_xAxis");
    //添加y轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+0.6*width+",0)")
        .call(bar_yAxis)
        .attr("id" , "bar_yAxis");
    //添加Y轴说明
    svg.append("text")
        .text("-log(P)")
        .attr("x" , 0.6*width-padding*3/4)
        .attr("y" , h/2)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90 "+(0.6*width-padding*3/4)+" "+h/2+" )")
        .attr("id" , "ylab_bar");
};
function reset(){
    //delete arrow2
    ldplot == "T";
    cgwas_status = 1;
    iter = 0;
    // informationtip.style("opacity",0.0);
    d3.selectAll('svg').remove();//清空页面上次遗留的图像
    //重新添加画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width)
        .attr("height", 2*height)
        .attr("xmlns", "http://www.w3.org/2000/svg");
   //开始画图
    cmhtPlot(chr,snp,bp,cp,sp,cgwas_status);
};
function boom(iter){
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
	//iter 向左右平移的时候用的参数
	loc = snp.indexOf(rscenter);
	loc_chr = chr[loc];
	loc_bp = bp[loc];
	loca_start = bp[loc]-rsrange-0.25*iter*rsrange;
	loca_end = bp[loc]+rsrange-0.25*iter*rsrange;
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
					.range([0, width*mhtwidth]);
	//修改X轴坐标
	//xAxis = d3.axisBottom().scale(xScale).ticks(6);
	//设定每个染色体区间为零，以便于画局部的x轴
    cmhtPlot(boom_chr,boom_snp,boom_bp,boom_cp,boom_sp,cgwas_status);
	var hsnps = [rscenter];
	Highlight(hsnps , "blue");
    //####################
    //------------------
	//insert gene
    //---------------------
    //####################
    qurryGene = selectgene(boom_chr[0], loca_start , loca_end);
    loading(svg , 2*padding,height);
    //暂停，等待基因信息加载
    setTimeout("insertGene()",5000);

};
function cmhtPlot(chr,snp,bp,cp,sp,cgwas_status){
    d3.selectAll('svg').remove();//清空页面上次遗留的图像
    d3.selectAll("#ylab").remove();
    //开始计算画图元素
    //插入局部注释工具
    add();
    toolstatus = 1;
    //获取宽度
    var tipHeight =jQuery('#addld').offset().top;
    //添加全局画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width)
        .attr("height", 2*height)
        .attr("xmlns", "http://www.w3.org/2000/svg");
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
            .attr("transform", "translate("+padding+",15)")
            .attr("id" , "xlable");
    }else{
        xAxis = d3.axisBottom().scale(xScale).ticks(6);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+padding+","+h+")")
            .call(xAxis)
        	.selectAll("text")
		    .attr("y", 0)
		    .attr("x", 9)
		    .attr("dy", ".35em")
		    //旋转x轴label
		    .attr("transform", "rotate(45)")
		    .style("text-anchor", "start");
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
                return -200;
            };
        })
        .attr("transform", "translate("+padding+",0)")
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
            //append line
            if (cgwas_status == -1){
            	//横纵两条线段
            	var lines;
            	if(cp[i]>=5e-8 && cp[i]<=1e-3){
               		var y = Yup1Scale(-Math.log(parseFloat(cp[i]))/Math.log(10));
               		lines = [[padding , y , xScale(bp[i])+padding , y],[xScale(bp[i])+padding , y , xScale(bp[i])+padding , height+padding+h/2]];
            	}else if(cp[i]<5e-8 ){
                	var y = Yup2Scale(-Math.log(parseFloat(cp[i]))/Math.log(10));
                	lines = [[padding , y , xScale(bp[i])+padding , y],[xScale(bp[i])+padding , y , xScale(bp[i])+padding , height+padding+h/2]];
            	}else{
                	return [[0,0,0,0],[0,0,0,0]];
            	};
            	//add lines
            	svg.selectAll("ellipse")
            		.data([1,2])
            		.enter()
            		.append("line")
				    .attr("x1",function(d , j){
				    	return lines[j][0]
				    })
				    .attr("y1",function(d , j){
				    	return lines[j][1]
				    })
				    .attr("x2",function(d , j){
				    	return lines[j][2]
				    })
				    .attr("y2",function(d , j){
				    	return lines[j][3]
				    })
				    .attr("stroke",d3.rgb(208,208,208))         //线的颜色
				    .attr("stroke-width","2px")     //线的宽度
				    .attr("id","annoLine")
            };
        })
        .on("mouseout", function(d , i) {
        	//delete lines
        	d3.selectAll("#annoLine").remove();
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
            //insert annotation

            selectano(chr[i],bp[i]);
        });
    //添加yup1轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+padding+",0)")
        .call(Yup1Axis);
    //添加yup2轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+padding+",0)")
        .call(Yup2Axis);
    svg.append("text")
        .text("-log(P)")
        .attr("x" , padding/3)
        .attr("y" , (h+10))
        .attr("dy", ".35em")
        .attr("transform", "rotate(-90 "+padding/3+" "+(h+10)+" )")
        .attr("id" , "ylab");

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
        .attr("transform", "translate("+padding+",0)")
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
             //append line
            if (cgwas_status == -1){
            	//横纵两条线段
            	var lines;
            	if(sp[i]>=5e-8 ){
               		var y = Ydown1Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
               		lines = [[padding , y , xScale(bp[i])+padding , y],[xScale(bp[i])+padding , y , xScale(bp[i])+padding , height+padding+h/2]];
            	}else if(cp[i]<5e-8 ){
                	var y = Ydown2Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
                	lines = [[padding , y , xScale(bp[i])+padding , y],[xScale(bp[i])+padding , y , xScale(bp[i])+padding , height+padding+h/2]];
            	}else{
                	return [[0,0,0,0],[0,0,0,0]];
            	};
            	//add lines
            	svg.selectAll("ellipse")
            		.data([1,2])
            		.enter()
            		.append("line")
				    .attr("x1",function(d , j){
				    	return lines[j][0]
				    })
				    .attr("y1",function(d , j){
				    	return lines[j][1]
				    })
				    .attr("x2",function(d , j){
				    	return lines[j][2]
				    })
				    .attr("y2",function(d , j){
				    	return lines[j][3]
				    })
				    .attr("stroke",d3.rgb(208,208,208))         //线的颜色
				    .attr("stroke-width","2px")     //线的宽度
				    .attr("id","annoLine")
            };
        })
        .on("mouseout", function(d , i) {
        	d3.selectAll("#annoLine").remove();
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
            //inset annotation
            selectano(chr[i],bp[i]);
        });
    //添加yup1轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+padding+",0)")
        .call(Ydown1Axis);
    //添加yup2轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+padding+",0)")
        .call(Ydown2Axis);
    //添加初始注释信息
    if( cgwas_first_stat == "example"){
        selectano(15 ,52901284);
        barplot("rs58018557");
    };
};
function cmhtFile(){
    //load cmht files
    var objFile = document.getElementById("cmht");
    if(objFile.value == "") {
        alert("please load your mht.txt ");
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
                var rows = fileString[j].split(",") //每行进行拆分
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
            alert("Done, "+snp.length+"SNPs have been finded !");
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
            bar_num = (header.split(",").length - 3)/3;
            //开始按行遍历
            for(var j=1;j<barString.length;j++){
                var rows = barString[j].split(",") //每行进行拆分
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
function cmht(stat){
	//delete last svg
	d3.selectAll("svg").remove();
	cgwas_status = 1;
    //注释框
    tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip");
    // informationtip = d3.select("#info")
    //     .append("div")
    //     .attr("class","informationtip")
    //     .style("opacity",0.0);
    width=$(window).width()*0.7;
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width)
        .attr("height", 2*height)
        .attr("xmlns", "http://www.w3.org/2000/svg");
    loading(svg , width*0.4 , 100);
    if(stat == "local"){
        //load local data
        cgwas_first_stat = stat;
        cmhtFile();
    }else if(stat == "server"){
        //待修改，与苑老师主界面保持一致
        cgwas_first_stat = stat;
        var userid = document.getElementById("userid").value;
        loadcgwas(userid);
    }else if(stat =="example"){
        var userid = "example";
        cgwas_first_stat = stat;
        loadcgwas(userid);
    };    
    //begin to plot
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
	iter = iter+1;
	boom(iter);
};
function rightmove(){
	iter = iter-1;
	boom(iter);
};
function Highlight_snp(){
	var hsnp = document.getElementById("Hsnp").value;
	//若是在全局的层面下进行Highlight
	var hsnps =hsnp.split(",");
	Highlight(hsnps ,"#9933CC");
};
function Highlight(hsnps ,hcol){
//输入为snp Array,并且里面的元素都存在于图上
    //修改上面的点
    if(cgwas_status ==1){	
        circle_up.filter(function(d, i) { // filter返回偶数的元素
                return hsnps.indexOf(snp[i]) !== -1 ;
            })
        .style("fill", hcol)
        .attr("r" , 4)
        .attr("mouseout" , function(d){
            d3.select("this")
                .attr("fill" ,hcol)
                .attr("r" , 4);
        });
        circle_down.filter(function(d, i) { // filter返回偶数的元素
                return hsnps.indexOf(snp[i]) !== -1 ;
            })
        .style("fill", hcol)
        .attr("r" , 4)
        .attr("mouseout" , function(d){
            d3.select("this")
                .attr("fill" ,hcol)
                .attr("r" , 4);
        });
    }else if(cgwas_status ==-1){
        circle_up.filter(function(d, i) { // filter返回偶数的元素
                return hsnps.indexOf(boom_snp[i]) !== -1 ;
            })
        .style("fill", hcol)
        .attr("r" , 4)
        .attr("mouseout" , function(d){
            d3.select("this")
                .attr("fill" ,hcol)
                .attr("r" , 4);
        });
        circle_down.filter(function(d, i) { // filter返回偶数的元素
                return hsnps.indexOf(boom_snp[i]) !== -1 ;
            })
        .style("fill", hcol)
        .attr("r" , 4)
        .attr("mouseout" , function(d){
            d3.select("this")
                .attr("fill" ,hcol)
                .attr("r" , 4);
        });
    }
};
function insertGene(){
    //移去loading
    d3.selectAll("#loading").remove();
    d3.selectAll("#blockGene").remove();
    d3.selectAll("#geneName").remove();
    //begin to deal with gene
    var Chr = [];
    var geneName = [];
    var geneStart = [];
    var geneEnd = [];
    qurryGene = qurryGene.split("\n");
    for(var i=0;i<qurryGene.length;i++){
        var sub = qurryGene[i].split("\t");
        if(sub.length>1){
            Chr.push(sub[0]);
            geneStart.push(sub[1]);
            geneEnd.push(sub[2]);
            geneName.push(sub[3]);
        };
    };
    geneStart = changeInt(geneStart);
    geneEnd = changeInt(geneEnd);
    var genecolor = getColors(geneName.length);

    //计算超出范围的基因位置	
	var gStart=rep(1 , geneName.length);
	var gEnd=rep(1 , geneName.length);
	//替换成在范围内的基因区间，用于画图
	for(var i=0;i<geneName.length;i++){
		//change start and end of each gene
		if(geneStart[i]<loca_start){
			gStart[i] = loca_start;
		}else{
			gStart[i] = geneStart[i];
		};
		if(geneEnd[i]>loca_end){
			gEnd[i] = loca_end;
		}else{
			gEnd[i] = geneEnd[i]
		};
	};
	//insert gene
	var geneY = (padding+h)/(2*geneName.length);
	svg.selectAll("ellipse")
		.data(geneName)
		.enter()
		.append("rect")
		.attr("x" , function(d , i){
			return xScale(gStart[i]);
		})
		.attr("y" , function(d , i){
			return 2*h+padding/2+geneY*i;
		})
		.attr("width" , function(d , i){
			return xScale(gEnd[i])-xScale(gStart[i]);
		})
		.attr("height" , 4)
		.attr("fill" , function(d , i){
            return genecolor[i];
        })
        .on( "mouseover", function(d , i){
            tooltip.html("Chr : "+Chr[i]+"<br>start : " +geneStart[i] +"<br>end : "+geneEnd[i]+"<br>gene name : "+geneName[i])
                .style("left", (d3.event.pageX+20) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",1.0);
            d3.select("this")
                .attr("fill", "red");
        })
        .on("mouseout" ,function(d , i){
            tooltip.style("opacity",0.0);
            d3.select("this")
                .attr("fill", genecolor[i])})
		.attr("transform", "translate("+padding+",0)")
		.attr("id" , "blockGene");
	//insert gene name
	svg.selectAll("ellipse")
		.data(geneName)
		.enter()
		.append("text")
		.text(function(d){
            return d;
        })
		.attr("x" , function(d , i){
			return (xScale(gStart[i])+xScale(gEnd[i]))/2;
		})
		.attr("y" , function(d , i){
			return 2*h+padding/2+geneY*i-6;
		})
		.attr("width" , function(d , i){
			return xScale(gEnd[i])-xScale(gStart[i]);
		})
		.attr("transform", "translate("+padding+",0)")
        .attr("font-size", "8px")	
		.attr("id" , "geneName");
};
function selectano(chr,bp){
    $.ajax({
        // url:"192.168.72.25:9888/cgwas/variant",
        url:'https://bigd.big.ac.cn/cgwas/variant',
        type: "post",
        dataType: "json",
        async: false,
        cache:false,
        data: {
            "chr":chr,
            "bp":bp,
        },
        success: function (msg) {
          var  tableStr="<table  id=\"tableInfo\" class=\"table \" style=\"margin-top: 2px\">";
            tableStr=tableStr+"<thead>\n" +
                "                    <tr>\n" +
                "                        <th>Chrom</th>\n" +
                "                        <th>Start</th>\n" +
                "                        <th>End</th>\n" +
                "                        <th>Ref</th>\n" +
                "                        <th>Alt</th>\n" +
                "                        <th>Func</th>\n" +
                "                        <th>Gene</th>\n" +
                "                        <th>GeneDetail</th>\n" +
                "                        <th>ExonicFunc</th>\n" +
                "                        <th>AAChange</th>\n" +
                "                        <th>ensGene</th>\n" +
                "                        <th>snp138</th>\n" +
                "                        <th>dbSNP</th>\n" +
                "                        <th>1000G_EAS</th>\n" +
                "                        <th>1000G_SAS</th>\n" +
                "                        <th>1000G_AFR</th>\n" +
                "                        <th>1000G_AMR</th>\n" +
                "                        <th>1000G_EUR</th>\n" +
                "                        <th>PubMedID</th>\n" +
                "                        <th>Journal</th>\n" +
                "                        <th>Disease</th>\n" +
                "                    </tr>\n" +
                "                    </thead>\n" +
                "                <tbody>\n" +
                "                <tr>";
            $.each(msg, function (index, item) {
                $.each(item, function (indexcol, col) {
                    tableStr = tableStr +"<td>" + col + "</td>";
                });
                // console.log(item);
                // $("#tableInfo").append("<td>" + item + "</td>");
            });
            tableStr = tableStr + "</tr>"+"</tbody>"+"</table>";
            $("#tableAjax").html(tableStr);
        },error: function (e) {
            alert("请求失败: " + e.toString());
        }
    });
    // var tableinfo = $('#tableInfo').DataTable({
    //     searching: false,
    //     paging: false,
    //     "ordering": false,
    //     "info": false,
    //     "stateSave": false,
    //     buttons: [{
    //         extend: 'excelHtml5',
    //         filename: "SnpAnnotation",
    //         exportOptions: {columns: ':visible'}
    //     }]
    // });
    // $('#download-1').on('click', function () {
    //     tableinfo.button('.buttons-excel').trigger();
    // });
};
function selectgene(chr,start,end){
    var result='';
    $.ajax({
        // url:"192.168.72.25:9888/cgwas/gene",
        url:'https://bigd.big.ac.cn/cgwas/gene',
        type: "post",
        dataType: "json",
        async: false,
        cache:false,
        data: {
            "chr":chr,
            "start":start,
            "end":end,
        },
        success: function (msg) {
            // console.log("数据对象"+msg);
            for (var i=0;i<msg.length;i++) {
                // console.log("chrom:" + msg[i].chrom+"start"+msg[i].varStart);
                result += msg[i].chrom + "\t" + msg[i].varStart+"\t" +msg[i].varEnd+"\t"+msg[i].refGene+"\n" ;
                //gene画图：
                // result +=msg[i].chrom+ "\t" + msg[i].varStart+"\t" +msg[i].varEnd+"\t"+msg[i].refGene;
                 console.log(result);
                //此处可直接写插入的html注释表格信息
            }
        },error: function (e) {
            alert("请求失败: " + e.toString());
        }
    });
    return result;
};

// $(function process() {
//     chr="1";
//     bp="16515";
//     start="16515";
//     end="19391";
//    // selectano(chr,bp);
// //     var genedata=selectgene(chr,start,end);
// //     console.log(anodata);
// //     console.log(genedata);
// });
//#################################
////重置参数
//--------------------------------
//load files
//--------------------------------
//##################################
//load phes
//

function loadcgwas(userid){
    //load cgwasdata    
    chr=[];
    snp=[];
    bp=[];
    cp=[];
    sp = [];
    var cgwasdata = get_data(userid , "Mht.txt");
    cgwasdata = del(cgwasdata.split("\n") , "");
    for(var i = 1;i<cgwasdata.length;i++){
        var rows = cgwasdata[i].split(",");
        chr.push(parseFloat(rows[0]));
        bp.push(parseFloat(rows[1]));
        snp.push(rows[2]);
        //放入combine p的值
        cp.push(parseFloat(rows[3]));
        //放入single p的值
        sp.push(parseFloat(rows[4]));
    };
    //load bardata
    bar_snp = [];
    chords_cp_n = [];
    chords_sp_n = [];
    Cps = [];
    Phes = [];
    Sps = [];
    var bardata = get_data(userid , "Nbar.txt");
    bardata = del(bardata.split("\n"),  "");
    var bar_num = (bardata[0].split(",").length - 3)/3;
    for(var j=0;j<bardata.length;j++){
        var rows = bardata[j].split(",") //每行进行拆分
        //字符串不为空则添加到数组内，顺便添加判断元素
        bar_snp.push(rows[0]);
        chords_cp_n.push(parseFloat(rows[1]));
        chords_sp_n.push(parseFloat(rows[2]));
        Cps.push(rows.slice(3 , bar_num+3).map(Number));
        Phes.push(rows.slice(bar_num+3,2*bar_num+3));
        Sps.push(rows.slice(2*bar_num+3).map(Number));
    };
};
function loadChrosome(userid){
    //load phe data
    Phes = [];
    var phesdata = get_data(userid , "1_pheno.txt");        
    var phesdata=del(phesdata.split("\n") , "");    // 读取文件内容并拆分为字符串
    //开始按行遍历
    for(var i=0;i<phesdata.length;i++){
        var sub1 = phesdata[i].split("\r") //每行进行拆分
        //字符串不为空则添加到数组内，顺便添加判断元素
        Phes.push(sub1[0]);
    };
    //load snp data
    chr = [];
    bp = [];
    snp = [];
    gwas_phes = [];
    gwas_pvalue = [];
    var rows2 = get_data(userid , "2_TopSNP_gwas.txt"); 
    rows2 = del(rows2.split("\n") , "");
    //get gwas files
    for(var j=0;j<rows2.length;j++ ){
        rows2[j] = rows2[j].replace("\r" , "");
        var sub2 = del(rows2[j].split(","),  "");
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
    //load significant data
    c_chr=[];
    c_bp = [];
    c_snp = [];
    cgwas_pvalue = [];
    cgwas_phes = [];
    var rows3 = get_data(userid , "3_TopSNP_cgwas.txt"); 
    rows3 = del(rows3.split("\n") , "");
    //get gwas files
    for(var k=0;k<rows3.length;k++ ){
        rows3[k] = rows3[k].replace("\r" , "");
        var sub3 = del(rows3[k].split(",") , "");
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
function Chrosome(stat){
	d3.selectAll("svg").remove();
    //注释框
    width=$(window).width()*0.7;
    svg = d3.select("#draw")
                .append("svg")
                .attr("width" , width)
                .attr("height" , height)
                .attr("xmlns", "http://www.w3.org/2000/svg");
    tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip");
    loading(svg , 0.45*width , 0.1*width);
    //load data
    if(stat == "local"){
        getphes();
    }else if(stat =="server"){
        var userid = document.getElementById("userid").value;
        loadChrosome(userid);
    }else if(stat =="example"){
        var userid = "example";
        loadChrosome(userid);
    };
    setTimeout("insertChromsome()" , 5000);
};
function getphes(){
    Phes=[];
    //get gwas data
    chr=[];
    bp=[];
    snp=[];
    gwas_phes=[];
    gwas_pvalue=[];
    //get cgwas data
    c_chr=[];
    c_bp=[];
    c_snp=[];
    cgwas_pvalue=[];
    cgwas_phes=[];

    //load phe data
    var objFile = document.getElementById("Phenotypes");
    if(objFile.value != "") {
        var files1 = $('#Phenotypes').prop('files'); //获取到文件列表
        var reader1 = new FileReader(); //新建一个FileReader
        reader1.readAsText(files1[0], "UTF-8");
        reader1.onload = function(evt){ //读取完文件之后会回来这里
            //开始处理数据
            var rows1=evt.target.result.split("\n");	// 读取文件内容并拆分为字符串
            rows1 = del(rows1 , "");
            //开始按行遍历
            for(var j=0;j<rows1.length;j++){
                var sub1 = rows1[j].split("\r") //每行进行拆分
                //字符串不为空则添加到数组内，顺便添加判断元素
                Phes.push(sub1[0]);
            };
        };
    }else{
    	alert("Please upload 1_pheno.txt !");
    };
    //load snp data
    var objFile2 = document.getElementById("topGwas");
    if(objFile.value != ""){
        var files2 = $('#topGwas').prop('files'); //获取到文件列表
        var reader2 = new FileReader(); //新建一个FileReader,获取结果
        reader2.readAsText(files2[0], "UTF-8");
        reader2.onload = function(evt){ //读取完文件之后会回来这里
            var rows2 = reader2.result.split("\n");
            var rows2 = del(rows2 , "");
            //get gwas files
            for(var j=0;j<rows2.length;j++ ){
                rows2[j] = rows2[j].replace("\r" , "");
                var sub2 = del(rows2[j].split(","),  "");
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
    }
    else{
    	alert("Please upload 2_TopSNP_gwas.txt !");
    };

    //load significant data
    var objFile3 = document.getElementById("topCgwas");
    if(objFile3.value != "") {
        var files3 = $('#topCgwas').prop('files'); //获取到文件列表
        var reader3 = new FileReader(); //新建一个FileReader,获取结果
        reader3.readAsText(files3[0], "UTF-8");
        reader3.onload = function(evt){ //读取完文件之后会回来这里
            var rows3 = reader3.result.split("\n");
            var rows3 = del(rows3 , "");
            //get gwas files
            for(var k=0;k<rows3.length;k++ ){
                rows3[k] = rows3[k].replace("\r" , "");
                var sub3 = del(rows3[k].split(",") , "");
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
    }else{
    	alert("Please upload 3_TopSNP_cgwas.txt !");
    };
};
function insertChromsome(){
    d3.selectAll("svg").remove();
    width=$(window).width()*0.7;
    //表型信息也可是CGWAS的function生成的一列文件
    //添加全局画布
    svg= d3.select("#draw")
        .append("svg")
        .attr("width", width)
        .attr("height", 2*height)
        .attr("xmlns", "http://www.w3.org/2000/svg");
    xScale=d3.scaleBand()
        .domain(sep(1,24))
        .rangeRound([padding,  0.7*width]);
    //barwidth = xScale(2)-xScale(1);
    barwidth = 10;
    heightScale = d3.scaleLinear()
        .domain([0, 249250621])
        .range([0, 0.7*height]);
    //染色体宽度的比例尺   
    widthScale =d3.scaleLinear()
        .domain([0, 249250621])
        .range([0, 0.7*width]);     
    //definite colors of each phenotyopes
    phenoColors = getColors(Phes.length);
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
        .attr("height",function(d){return heightScale(chrLength[d-1])})
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
        .attr("transform", "translate("+0.85*width+","+1.5*padding+")")
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
        .attr("x", 0)
        .attr("y",function(d , i){
            return 80+30*i;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("transform", "translate("+0.95*width+","+1.5*padding+")")
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
            return phenoColors[i];
        })
        .attr("transform", "translate("+0.85*width+","+1.5*padding+")")
        .attr("id" , "phenotype");
    //controler
    annotation();
    add();
    toolstatus_chrom=1;
};
function Changechr(){
	//改变底部注释的染色体信息
    //insert chrosome button
    d3.selectAll("#chr_buton").remove();
    d3.selectAll("#chr_annotated").remove();
    d3.selectAll("#chr_loci").remove();
    d3.selectAll("#gwas_pheno").remove();
    d3.selectAll("#cgwas_pheno").remove();
    d3.selectAll("#chrosome_name").remove();

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
        .attr("width", widthScale(chrLength[i]))
        .attr("transform", "translate("+padding+",0)")
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
    //insert anno_pvalue
    svg.selectAll("ellipse")
        .data(loci)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return widthScale(bp[d])
        })
        .attr("y", 3/2*height+5)
        .attr("width", 1.5)
        .attr("height", 35)
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
        .attr("transform", "translate("+padding+",0)")
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
            .attr("cx", widthScale(bp[loci[j]]))
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
            .attr("transform", "translate("+padding+",0)")
            .attr("id" , "gwas_pheno");

        //insert cgwas phenotypes
        svg.selectAll("ellipse")
            .data(cgwas_phes[loci[j]])
            .enter()
            .append("circle")
            .attr("cx", widthScale(bp[loci[j]]))
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
            .attr("transform", "translate("+padding+",0)")
            .attr("id" , "gwas_pheno");
    };
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
        .attr("transform", "translate("+0.85*width+","+1.5*padding+")")
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
                    return xScale(d)+2;
                })
                .attr("y", function(d , m){
                    return height-heightScale(chrLength[d-1])+heightScale(gbp[m]);
                })
                .attr("width", 10)
                .attr("height", 2)
                .attr("fill" , function(d , m){
                    return gcolors[m];
                })
                .on( "mouseover", function(d,m){
                    tooltip.html("Chr : "+d+"<br>BP : " +gbp[m] +"<br>SNP : " + gsnp[m] + "<br>gwas_phenotypes : "+gphe[m]+"<br>gwas_pvalue : "+gpvalue[m])
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
        .attr("transform", "translate("+0.85*width+","+1.5*padding+")")
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
                    return xScale(d)+2;
                })
                .attr("y", function(d , m){
                    return height-heightScale(chrLength[d-1])+heightScale(cgbp[m]);
                })
                .attr("width", 10)
                .attr("height", 2)
                .attr("fill" , function(d , m) {
                    return cgcolors[m];
                })
                .on( "mouseover", function(d,m){
                    tooltip.html("Chr : "+d+"<br>BP : " +cgbp[m] +"<br>SNP : " + cgsnp[m] + "<br>cgwas_phenotypes : "+cgphe[m]+"<br>cgwas_pvalue : "+cgpvalue[m])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity",1.0);
                    d3.select("this")
                        .attr("height", 5);
                })
                .on("mouseout" ,function(){
                    tooltip.style("opacity",0.0);
                    d3.select("this")
                        .attr("height", 1.5);
                })
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
function getColors(n){
    var result=[];
    //define color function
    var a = d3.rgb(255, 0, 0);
    var b = d3.rgb(255, 165, 0);
    var c = d3.rgb(255, 255, 0);
    var d = d3.rgb(0, 255, 0);
    var e = d3.rgb(0, 127, 255);
    var f = d3.rgb(0, 0, 255);
    var g = d3.rgb(139, 0, 255);
    var compute1 = d3.interpolate(a,b);
    var compute2 = d3.interpolate(b,c);
    var compute3 = d3.interpolate(c,d);
    var compute4 = d3.interpolate(d,e);
    var compute5 = d3.interpolate(e,f);
    var compute6 = d3.interpolate(f,g);
    var compute7 = d3.interpolate(g,a);
    var iter = 70/n;
    for(var i=0;i<n;i++){
        var int = parseInt(iter*i/10)+1;
        var float = iter*i/10-parseInt(iter*i/10);
        result.push(eval("compute"+int+"("+float+")"))
    };
    return result;
};
