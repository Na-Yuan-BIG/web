Chrosome//the function used in cgwas
function barplot(rsid){
	var loca = snp.indexOf(rsid);
	var info_chr = chr[loca];
	var info_bp = bp[loca];
	var info_combp = cp[loca];
	var info_singp = "large than 1e-3";
	if(sp_snp.indexOf(rsid) != -1){
		var info_singp = sp[sp_snp.indexOf(rsid)];
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
	d3.selectAll("g").data(rep(1 , g_length)).exit().remove();d3.selectAll("g").data(rep(1 , g_length)).exit().remove();
	
	//delete legend and add new legend
	d3.selectAll("#legend").remove();
	svg.append("image")
			.attr("xlink:href","http://192.168.118.86:9800/file/css/legend.jpg")
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
	informationtip.html("<table class=\"table table-striped\" style=\"width: 40%;margin-top:2px;\"> <tbody> <tr> <td>Location </td> <td>"+ info_chr+":"+info_bp+" </td> </tr> <tr> <td>rsID </td> <td>"+rsid+" (<a href='https://www.ncbi.nlm.nih.gov/snp/?term="+rsid+"' target='_BLANK'>NCBI</a>、<a target=\"_blank\" href='https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="+rsid+"'>dbSNP</a>)</td> </tr> <tr> <td>combineP </td> <td>"+info_combp+" </td> </tr> <tr> <td>singleP </td> <td>"+info_singp+" </td> </tr> </tbody> </table>")
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
		line_generator=d3.line()
			.x(function(d,i){return bar_xScale(i+1)+half;//x轴的点用数据下标表示
			})
			.y(function(d){return bar_yScale(d)});

                         //.interpolate("linear")
	var g=svg.append("g").attr("transform", "translate("+0.5*width+",0)");


	g.append("path")
		.attr("d",line_generator(line_log))
		.attr('stroke', 'black')
		.attr('stroke-width', 1)
		.attr("fill","none");
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
function bar_file(){
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

function cmhtplot_2(chr,snp,bp,cp,sp,sp_chr,sp_snp,sp_bp){	
	d3.selectAll('svg').remove();//清空页面上次遗留的图像
	//插入局部注释工具
	add();
	toolstatus = 1;
	//获取宽度
	var tipHeight =jQuery('#addld').offset().top;
	informationtip = d3.select("#info")
			.append("div")
			.attr("class","informationtip")
			.style("opacity",0.0);
			// .style("left", (0.5*width)+ "px")
			// .style("top", (tipHeight+h+2*padding) + "px");


	//添加全局画布
	svg= d3.select("#draw")
				.append("svg")
				.attr("width", width-80)
				.attr("height", 2*height);


		//******************
		//处理文件并画CombineP
		//******************
		//开始添加combine p以下的点
		circle_up = svg.selectAll("rect")
			.data(chr)
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){
				if(cgwas_status == "local"){
					return xScale(bp[i]);}
				else{
					return (xScale(bp[i])+labelScale[chr[i]-1]*(0.4*width-2*padding));
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
			.attr("transform", "translate("+left_move+",0)")
			.attr("r" , 2)
			.attr("fill" ,function(d , i){return upcol[d%2]})
			.on("mouseover", function(d , i){
				
				tooltip.html("<strong>Chrosome</strong>:"+ chr[i]+"<br>" +" <strong>rsID</strong>:"+snp[i]+" <strong>BP</strong>:"+bp[i] +"<br>"+" <strong> combineP</strong>:"+cp[i]+"<br>--------------------<br><strong> singleP</strong>:"+sp[i])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);
				//把single的点也渲染了
				circle_down.filter(function(v , j) {return sp_snp[j] == snp[i];})
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
					.attr("transform", "translate("+leftMove+",0)")
					.attr("id" , "arrow2");
				};	

			})
			.on("mouseout", function(d , i) {
				d3.select(this)
					.attr("r", 1.5)
					.attr("fill" ,function(d){return upcol[d%2]});
				//把single的点也渲染了
				circle_down.filter(function(v , j) {return sp_snp[j] == snp[i];})
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

				//添加X轴
				lm = padding+left_move;
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+lm+","+h+")")
					.call(xAxis);
				
				//添加yup1轴
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+lm+",0)")
					.call(Yup1Axis);
				//添加yup2轴
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+lm+",0)")
					.call(Yup2Axis);
			//******************
			//处理文件并画SingleP
			//******************
		circle_down = svg.selectAll("rect")
			.data(sp_chr)
			.enter()
			.append("circle")
			.attr("cx" , function(d , i){
				if(cgwas_status == "local"){
					return xScale(bp[i]);}
				else{
					return (xScale(bp[i])+labelScale[chr[i]-1]*(0.4*width-2*padding));
				}
			})
			.attr("cy" , function(d , i){
				if(sp[i]>=5e-8 && sp[i]<=1e-3){
					return Ydown1Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
				}else if(sp[i]<5e-8 ){
					return Ydown2Scale(-Math.log(parseFloat(sp[i]))/Math.log(10));
				}else{
					return "null";
				};
			})
			.attr("transform", "translate("+left_move+",0)")
			.attr("r" , 2)
			.attr("fill" ,function(d , i){return downcol[d%2]})
			.on("mouseover", function(d , i){
				tooltip.html("<strong>Chrosome</strong>:"+ chr[i]+"<br>" +" <strong>rsID</strong>:"+snp[i]+"<br>"+" <strong>BP</strong>:"+bp[i] +"<br>"+" <strong> singleP</strong>:"+sp[i]+"<br>--------------------<br><strong> combineP</strong>:"+cp[i])
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px")
						.style("opacity",1.0);
				//把combine的点也渲染了
				circle_up.filter(function(v , j) {return snp[j] == sp_snp[i];})
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
					.attr("transform", "translate("+leftMove+",0)")
					.attr("id" , "arrow2");
				};					
			})
			.on("mouseout", function(d , i) {
				d3.select(this)
					.attr("r", 2)
					.attr("fill" ,function(d){return downcol[d%2]});
				//把single的点也渲染了
				circle_up.filter(function(v , j) {return snp[j] == sp_snp[i];})
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
					document.getElementById("rscenter").value=sp_snp[i];
					//把前一个点的颜色改变
					if(click !=null){
						click.attr("r" ,2)
						.attr("fill" , click_col);
					};	
					//开始给新的点赋值				
					click = d3.select(this);
					click_col = downcol[sp_chr[i]%2];
					click.attr("r" , 4)
						.attr("fill" , "red");
					//开始画柱状图
					barplot(snp[i]);
					});
				//添加yup1轴
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+lm+",0)")
					.call(Ydown1Axis);
				//添加yup2轴
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+lm+",0)")
					.call(Ydown2Axis);
				g_length = d3.selectAll("g")._groups[0].length;
				text_length = d3.selectAll("text")._groups[0].length;
};
function reset(){
	//delete arrow2
	ldplot == "T";
	cgwas_status = "whole";
	circle = 0;
	informationtip.style("opacity",0.0);
	d3.selectAll('svg').remove();//清空页面上次遗留的图像
	//重新添加画布
	svg= d3.select("#draw")
				.append("svg")
				.attr("width", width-10)
				.attr("height", 2*height);

	//重新定义x轴
	xScale = d3.scaleLinear()
					.domain([0, 3095677412])
					.range([padding, width*0.4-2*padding]);

	var labelRange = [];
	for(var i = 0 ; i<=23 ; i++ ){
		labelRange.push(labelScale[i]*(width*0.4-2*padding));
	};
	//定义23条染色体的具体位置
	xLabels = d3.scaleOrdinal()
					.domain(xlables)
					.range(labelRange);

	//
	xAxis = d3.axisBottom()
					.scale(xLabels);
	//开始画图
	cmhtplot_2(chr,snp,bp,cp,sp,sp_chr,sp_snp,sp_bp);		
};
function cmht_file(status){
	var objFile = document.getElementById("cmht");

	if(objFile.value == "") {
		alert("please load your CGWAS result ");
		d3.selectAll("svg").remove();
	}else{
		var files = $('#cmht').prop('files'); //获取到文件列表

		//获取画图参数
		width=$(window).width();

		left_move=$(window).width()*0.1;

			//*********************
			//Combine snp 所需要的参数
			//*********************
				chr=[];
				snp=[];
				bp=[];
				cp=[];

				sp = [];
				sp_chr =[];
				sp_snp = [];
				sp_bp = [];

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
						if(parseFloat(rows[3]) <= 1e-3){
							chr.push(parseFloat(rows[0]));
							bp.push(parseFloat(rows[1]));
							snp.push(rows[2]);
							//放入combine p的值
							cp.push(parseFloat(rows[3]));
						};
						if(parseFloat(rows[4]) <= 1e-3){
							sp_chr.push(parseFloat(rows[0]));
							sp_bp.push(parseFloat(rows[1]));
							sp_snp.push(rows[2]);
							//放入single p的值
							sp.push(parseFloat(rows[4]));
						};						
					};
				};
				//判断应该画什么样式的图
				if(status == "cgwas"){
					//开始计算画图元素
					snp_length = snp.length;
					alert("Done, "+snp_length+"SNPs have been found !");

					//开始画图
					var y_low = 7;
					//取cp和sp中的最小值的对数 来作为Y坐标轴的最大值
					var y_minP = d3.min([d3.min(cp) , d3.min(sp)]);
					var y_summit = Math.ceil(-Math.log(parseFloat(y_minP))/Math.log(10));
					//定义x轴比例,按照输入的起止数据作为坐标轴起终点
					xScale = d3.scaleLinear()
									.domain([0, 3095677412])
									.range([padding, width*0.4-2*padding]);

					var labelRange = [];
					for(var i = 0 ; i<=23 ; i++ ){
						labelRange.push(labelScale[i]*(width*0.4-2*padding));
					};
					//定义23条染色体的具体位置
					xLabels = d3.scaleOrdinal()
									.domain(xlables)
									.range(labelRange);
					//
					xAxis = d3.axisBottom()
									.scale(xLabels);
					//定义y轴比
					Yup1Scale = d3.scaleLinear().domain([3, y_low]).range([h, h/2]);
					Yup2Scale = d3.scaleLinear().domain([y_low, y_summit]).range([h/2, padding]);			
					
					//定义上侧y1轴
					Yup1Axis = d3.axisLeft().scale(Yup1Scale).ticks(6);
					//定义上侧y2轴
					Yup2Axis = d3.axisLeft().scale(Yup2Scale).ticks(5);
					//下方
					Ydown1Scale = d3.scaleLinear().domain([3, y_low]).range([h+20, 3*h/2]);
					Ydown2Scale = d3.scaleLinear().domain([y_low, y_summit]).range([3*h/2, 2*h-padding]);
					//定义上侧y1轴
					Ydown1Axis = d3.axisLeft().scale(Ydown1Scale).ticks(6);
					//定义上侧y2轴
					Ydown2Axis = d3.axisLeft().scale(Ydown2Scale).ticks(5);
					cmhtplot_2(chr,snp,bp,cp,sp,sp_chr , sp_snp , sp_bp);
				}else if(status == "chords"){
					if(ChordsStatus == "t1"){
						//先重写chordsSNP
						chordsSNP =[];
						//若是通过上传snp文件来处理
						var chordsfile = document.getElementById("chordsfile");
						if(chordsfile.value != "") {
							var files = $('#chordsfile').prop('files');
							var reader = new FileReader(); //新建一个FileReader
							reader.readAsText(files[0], "UTF-8"); 
							reader.onload = function(evt){ //读取完文件之后会回来这里
								fileString=evt.target.result.split("\r\n");	// 读取文件内容并拆分为字符串
								chordsSNP = chordsSNP.concat(fileString);
								alert(chordsSNP.length + " SNPs have been found ! ");
								chordsbuild(chordsSNP);
							};							
						}else{
							//直接输入snp数据来处理
							var chordsnp = document.getElementById("chordsRSid").value;
							chordsSNP = chordsnp.split(",");
							alert(chordsSNP.length + " SNPs have been found ! ");
							chordsbuild(chordsSNP);
						};
					}
					else if(ChordsStatus == "t2"){
						//先重写chordsSNP
						chordsSNP =[];
						var chordsCP = document.getElementById("chordsCP").value;
						var chordsSP = document.getElementById("chordsSP").value;
						if( chordsCP != ""){
							chordsCP = parseFloat(chordsCP);
							for(var i = 0 ; i<cp.length ; i++){
								if(cp[i]< chordsCP){
									chordsSNP.push(snp[i]);
								};
							}
						}else if(chordsSP != ""){
							chordsSP = parseFloat(chordsSP);
							for(var i = 0 ; i<sp.length ; i++){
								if(sp[i]< chordsSP){
									chordsSNP.push(snp[i]);
								};
							};
						};
						alert(chordsSNP.length + " SNPs have been found ! ");
						chordsbuild(chordsSNP);
						
					}else if(ChordsStatus == "t3"){
						//先重写chordsSNP
						chordsSNP =[];
						var chords_chr = parseFloat(document.getElementById("chords_chr").value);
						var chords_start = 1000*parseFloat(document.getElementById("chords_start").value);
						var chords_end = 1000*parseFloat(document.getElementById("chords_end").value);
						for(var i = 0 ;i<snp.length ; i++){
							if(chr[i] == chords_chr && bp[i]>chords_start && bp[i]<chords_end){
								chordsSNP.push(snp[i]);
							};
						};
						alert(chordsSNP.length + " SNPs have been found ! ");
						chordsbuild(chordsSNP);

					}else if(ChordsStatus == "t4"){
						//先重写chordsSNP
						chordsSNP =[];
						var chords_core = document.getElementById("chords_core").value;						
						var chords_ragion = 1000*parseFloat(document.getElementById("chords_ragion").value);
						var chords_chr = chr[snp.indexOf(chords_core)];
						var chords_start = bp[snp.indexOf(chords_core)] - chords_ragion;
						var chords_end = bp[snp.indexOf(chords_core)] + chords_ragion;
						for(var i = 0 ;i<snp.length ; i++){
							if(chr[i] == chords_chr && bp[i]>chords_start && bp[i]<chords_end){
								chordsSNP.push(snp[i]);
							};
						};
						alert(chordsSNP.length + " SNPs have been found ! ");
						chordsbuild(chordsSNP);
					}else{
						alert("Please input screening condition !")
					}
					;
				};
		};
	}			
};

function cmhtplot(){
	//注释框
	tooltip = d3.select("body")
			.append("div")
			.attr("class","tooltip");
	width=$(window).width();



	// svg = d3.select("body")
	// 			.append("svg")
	// 			.attr("width", 1300)
	// 			.attr("height", 500);

    svg = d3.select("#run")
		.append("svg")
        .attr("width", 1300)
        .attr("height", 500);

	loading(svg , 850 , 100);
	//处理bar图所需要的数据
	bar_file();
	//处理表格文件
	//延迟4秒，等上一个文件执行完毕再执行下一个
	setTimeout("cmht_file('cgwas')" , 4000);

};
function boom(circle){
	cgwas_status = "local";
	d3.selectAll('svg').remove();//清空页面上次遗留的图像
	
	
	//开始处理数据
	var rscenter = document.getElementById("rscenter").value;
	var rsrange = 1000*parseInt(document.getElementById("rsrange").value);
	boom_chr = [];
	boom_bp = [];
	boom_snp = [];
	boom_cp=[];

	boom_sp=[];
	boom_sp_chr = [];
	boom_sp_bp = [];
	boom_sp_snp = [];

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
		};
		//再写singleP的结果
		if(sp_bp[i]){
			if(sp_bp[i]>=loca_start && sp_bp[i]<=loca_end && sp_chr[i]==loc_chr){
				boom_sp_chr.push(sp_chr[i]);
				boom_sp_bp.push(sp_bp[i]);
				boom_sp_snp.push(sp_snp[i]);
				boom_sp.push(sp[i]);
			};
		};
	};
	//定义x轴比例,按照输入的起止数据作为坐标轴起终点
	xScale = d3.scaleLinear()
					.domain([d3.max([0, loca_start]), loca_end])
					.range([padding, width*0.4-2*padding]);
	//修改X轴坐标
	//xAxis = d3.axisBottom().scale(xScale).ticks(6);
	//设定每个染色体区间为零，以便于画局部的x轴
	cmhtplot_2(boom_chr,boom_snp,boom_bp,boom_cp,boom_sp,boom_sp_chr,boom_sp_snp,boom_sp_bp);
	var hsnps = [rscenter];
	Highlight(svg , hsnps , "blue");
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
function Chrosome(){
	//imput data:chr;bp;snp;cp_n = [];sp_n = [];cps = [];phes = [];sps = [];
	width=$(window).width();
	leftMove = width*0.1;
	var Phes = ["weight","waist","hip","bmi","gly.hem","height","sleep.time","creatinine","chol","ldl"];
	//添加全局画布
	svg= d3.select("body")
				.append("svg")
				.attr("width", width)
				.attr("height", 2*height);
	//insert chrosome image
	svg.append("image")
		.attr("xlink:href",websiteUrl+"/css/chrosome.png")
		.attr("x",0)
		.attr("y",0)
		.attr("width",width-2*leftMove-2*padding)
		.attr("height",height)
		.attr("transform", "translate(0,"+2*padding+")")
		.attr("id" , "Chrom_bg");


	

	//#################
	//layout 
	//#################
	svg.append("image")
		.attr("xlink:href",websiteUrl+"/css/off.png")
		.attr("x",0)
		.attr("y",0)
		.attr("width",50)
		.attr("height",40)
		.attr("transform", "translate("+8*leftMove+","+padding+")")
		.attr("id" , "button_all");
	svg.append("text")
		.text("Select all")
		.attr("x", 60)
		.attr("y", 30)
		.attr("font-family", "sans-serif")
		.attr("font-size", "20px")
		.attr("fill", "black")
		.attr("transform", "translate("+8*leftMove+","+padding+")")
		.attr("id" , "text_all");

	svg.selectAll("ellipse")
			.data(["GWAS","CGWAS"])
			.enter()
			.append("text")
			.text(function(d){
				return d;
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d , i){
				return -20+80*i
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
			.attr("transform", "translate("+8*leftMove+","+1.5*padding+")")
			.attr("id" , "text_phe");



	//phenotype button
	svg.selectAll("ellipse")
			.data(Phes)
			.enter()
			.append("image")
			.attr("xlink:href",websiteUrl+"/css/off.png")
			.attr("text-anchor", "middle")
			.attr("x", -40)
			.attr("y",function(d , i){
				return 60+30*i;
			})
			.attr("width",50)
			.attr("height",40)
			.attr("transform", "translate("+8*leftMove+","+1.5*padding+")")
			.attr("id" , "button_gwas");
	//phenotype button
	svg.selectAll("ellipse")
			.data(Phes)
			.enter()
			.append("image")
			.attr("xlink:href",websiteUrl+"/css/off.png")
			.attr("text-anchor", "middle")
			.attr("x", 40)
			.attr("y",function(d , i){
				return 60+30*i;
			})
			.attr("width",50)
			.attr("height",40)
			.attr("transform", "translate("+8*leftMove+","+1.5*padding+")")
			.attr("id" , "button_cgwas");
	//phenotype phe
	var zoom = 100/Phes.length;
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
			.attr("transform", "translate("+8*leftMove+","+1.5*padding+")")
			.attr("id" , "phenotype");
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