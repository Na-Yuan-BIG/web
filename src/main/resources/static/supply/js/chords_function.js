function chordsplot(){
	width=$(window).width();
	rightmove=0.1*width;
	zhushi_status = 0;
	d3.selectAll('svg').remove();//清空页面上次遗留的图像
	//重新添加画布
	//添加全局画布
	svg= d3.select("body")
				.append("svg")
				.attr("width", width-10)
				.attr("height", 2*height);
	//加载loading
	loading(svg , 0.5*width-200 ,200);
	tooltip = d3.select("body")
		.append("div")
		.attr("class","tooltip");
	//先处理bar文件
	bar_file();
	//延迟4秒，等上一个文件执行完毕再执行下一个
	setTimeout("cmht_file('chords')" , 4000);
	
};
function chordsbuild(chordsSNP){
	//选取一个表型排布信息
	pheorder = Phes[0];
	//定义颜色生成器
	var cheng =  d3.rgb(255,97,0);
	var lan =  d3.rgb(65,105,255);
	var qing =  d3.rgb(0,255,255);
	var zong =  d3.rgb(128,42,42);
	var lv =  d3.rgb(34,139,34);
	var zi =  d3.rgb(160,32,240);
	var huang =  d3.rgb(255,135,18);
	var c1 = d3.interpolate(cheng,lan);
	var c2 = d3.interpolate(lan,qing);
	var c3 = d3.interpolate(qing,zong);
	var c4 = d3.interpolate(zong,lv);
	var c5 = d3.interpolate(lv,zi);
	var c6 = d3.interpolate(zi,huang);
	var c7 = d3.interpolate(huang,cheng);
	var cir_color = Math.ceil(pheorder.length/7);
	for(var j = 1 ; j<=cir_color ; j++){
		pathcolor.push(c1(1/cir_color * j));
		pathcolor.push(c2(1/cir_color * j));
		pathcolor.push(c3(1/cir_color * j));
		pathcolor.push(c4(1/cir_color * j));
		pathcolor.push(c5(1/cir_color * j));
		pathcolor.push(c6(1/cir_color * j));
		pathcolor.push(c7(1/cir_color * j));
	};
	cpmatrix_1 = [];
	cpmatrix_2 = [];
	cpmatrix_log = [];
	spmatrix_1 = [];
	spmatrix_2 = [];
	spmatrix_log = [];
	var cp_count = 0;
	var sp_count = 0;

	for(var i = 0; i< chordsSNP.length ; i++){
		var loc = bar_snp.indexOf(chordsSNP[i]);
		if(loc != -1){
			//提取loc_phe
			var loc_phe = Phes[loc];
			var loc_Sps = Sps[loc];
			var loc_n_cp = chords_cp_n[loc];
			var loc_n_sp = chords_sp_n[loc];
			var cp_chord = rep(1 , pheorder.length+chordsSNP.length);
			var sp_chord = rep(1 , pheorder.length+chordsSNP.length);
			for(var j = 0 ; j<loc_phe.length ; j++){
				//生成该列的弦矩阵
				if(j<loc_n_cp){
					cp_chord.splice(pheorder.indexOf(loc_phe[j])+chordsSNP.length , 1 , loc_Sps[j])
				};
				if(j<loc_n_sp){
					sp_chord.splice(pheorder.indexOf(loc_phe[j])+chordsSNP.length , 1 , loc_Sps[j])
				};				
			};
			//写入矩阵			
			cpmatrix_1[i] = cp_chord;
			spmatrix_1[i] = sp_chord;
		}else{
			alert("Sorry , "+ chordsSNP[i] + " has not been found !");
		};
	};
	for(var i = 0 ; i<pheorder.length ; i++){
		var cp_chord = col(cpmatrix_1 , i+chordsSNP.length).concat(rep(1,pheorder.length));
		var sp_chord = col(spmatrix_1 , i+chordsSNP.length).concat(rep(1,pheorder.length));
		cpmatrix_2[i] = cp_chord;
		spmatrix_2[i] = sp_chord;
		};

	cpmatrix_1 = cpmatrix_1.concat(cpmatrix_2);
	spmatrix_1 = spmatrix_1.concat(spmatrix_2);

	cpmatrix_log = nagtive_log10(cpmatrix_1);

	spmatrix_log = nagtive_log10(spmatrix_1);	

	//开始画图
	var chord_layout = d3.layout.chord()
						.padding(0.03) //节点之间的间隔
						.matrix(cpmatrix_log); //输入矩阵
	groups = chord_layout.groups();
	chords = chord_layout.chords();
	var huan;
	var xuan;
	//删除loading图片
	d3.selectAll('image').remove();
	chrods_plot(huan , xuan , cpmatrix_log , cpmatrix_1 ,spmatrix_log, rightmove , groups , chords , chordsSNP , pheorder);
	//chrods_plot(huan_s , xuan_s , spmatrix_log , spmatrix_1 , 700 , groups_s , chords_s , mass);

};
function chrods_plot(huan , xuan , logmatrix , matrix ,splogmatrix, rightmove , groups ,chords , chordsSNP , pheorder){
		mass = chordsSNP.concat(pheorder);
		outer_arc = d3.svg.arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);

		var g_outer = svg.append("g");
		huan = g_outer.selectAll("path")
			.data(groups)
			.enter()
			.append("path")
			.style("fill", function(d , i) {
				if(d.index >= chordsSNP.length){
					return pathcolor[d.index-chordsSNP.length];
				}else{
					return "#333333";
				};
			})
			.attr("d", outer_arc)
			.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")")
			.on("mouseover" , function(d, i) {
				//标亮选中点              
				d3.select(this)
					.style("fill", "orange");   

				//注释框
				if(i < chordsSNP.length){
					var snp_id = mass[i];
					var loc_id = snp.indexOf(snp_id);
					tooltip.html("<strong>&emsp;Chrosome : </strong>:"+chr[loc_id]+"&emsp;"+"<br>"+
								"<strong>&emsp;BP : </strong>:"+bp[loc_id]+"&emsp;"+"<br>"+
								"<strong>&emsp;rsID : </strong>:"+snp_id+"&emsp;"+"<br>")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY + 20) + "px")
					.style("opacity",1.0);
				}else{
					
					tooltip.html("<strong>Phenotype : </strong>:"+ pheorder[i-chordsSNP.length])
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY + 20) + "px")
					.style("opacity",1.0);
				};
				
				//标亮本snp出发的所有点
				
				if(d.index < chordsSNP.length){
					text = [];
					//渲染其他与之相关的弦
					var subchords = xuan.filter(function(v , j) {return chords[j].source.index == i;}).style("fill", "red");
					for(var t =0;t<subchords[0].length ; t++){
						text.push(subchords[0][t].__data__.target.index);
					};

					//渲染剩余的环
					for(var t =0;t<text.length ; t++){
						huan.filter(function(v , j) {
							return groups[j].index == text[t]})
							.style("fill" , "red");
					};
				}else{
					text = [];
					//渲染其他与之相关的弦
					var subchords = xuan.filter(function(v , j) {return chords[j].target.index == i;}).style("fill", "red");
					for(var t =0;t<subchords[0].length ; t++){
						text.push(subchords[0][t].__data__.source.index);
					};

					//渲染剩余的环
					for(var t =0;t<text.length ; t++){
						huan.filter(function(v , j) {
							return groups[j].index == text[t]})
							.style("fill" , "red");
					};
				};

			})
			.on("mouseout" , function(d, i) {
				//颜色恢复
				
					//把所有的环重新渲染
					var a = d3.select(huan);
					//不知道这里为啥是3层的关系
					a = a[0][0][0];
					for(var j = 0;j<a.length;j++){
						if(j<chordsSNP.length){
							a[j].style.fill = "#333333";
						}else{
							a[j].style.fill = pathcolor[j-chordsSNP.length];
						}
					};
					//若是点击了环
					if(zhushi_status == 1){
						a[heiglight_huan].style.fill = "red";
					};
					
					//把所有的弦重新渲染
					var a = d3.select(xuan);
					a = a[0][0][0];

					for(var j = 0;j<a.length;j++){
						if(logmatrix[a[j].__data__.source.index][a[j].__data__.target.index] != 0 && splogmatrix[a[j].__data__.source.index][a[j].__data__.target.index] ==0){
							a[j].style.fill =  pathcolor[a[j].__data__.target.index-chordsSNP.length];
						}else{
							a[j].style.fill =  "#8b7e66";
						};
					};
					
				tooltip.style("opacity" , 0.0);
			})
			.on("click" , function(d,i){
				//需要标亮的环
				heiglight_huan = i;
				if(i <chordsSNP.length){
					//注释snp的信息
					var snp_id = mass[i];
					var chr_id = chr[snp.indexOf(snp_id)];
					var bp_id = bp[snp.indexOf(snp_id)];			
					var combine_p_id = d3.min(Cps[bar_snp.indexOf(snp_id)]);
					
						
						//表型信息
					var result = pheorder.slice(0 , pheorder.length);
						//是否显著
					var loc_n_cp = chords_cp_n[bar_snp.indexOf(snp_id)];
					var loc_n_sp = chords_sp_n[bar_snp.indexOf(snp_id)];
					var cp_sig = rep("signif" , loc_n_cp).concat(rep("--" , pheorder.length-loc_n_cp));
					var sp_sig = rep("signif" , loc_n_sp).concat(rep("--" , pheorder.length-loc_n_sp));
					var pvalue_sig = Sps[bar_snp.indexOf(snp_id)];
					

					//更换新的顺序
					var phe_sig = Phes[bar_snp.indexOf(snp_id)];
					var cp_sig_new = rep("--" , pheorder.length);
					var sp_sig_new = rep("--" , pheorder.length);
					var pvalue_sig_new = rep(1 , pheorder.length);

					for(var k = 0; k<pheorder.length ; k++){
						var ord = pheorder.indexOf(phe_sig[k]);
						cp_sig_new.splice(ord , 1,cp_sig[k]);
						sp_sig_new.splice(ord , 1 ,sp_sig[k]);
						pvalue_sig_new.splice(ord , 1 , pvalue_sig[k]);
					};
					//写入result
					result = ["Phenotype" ].concat(pheorder).concat(["CGWAS"]).concat(cp_sig_new).concat(["SGWAS"]).concat(sp_sig_new).concat(["P-value"]).concat(pvalue_sig_new);
					//添加注释信息
					snpzhushi(svg , chr_id , bp_id ,snp_id, combine_p_id, pheorder ,result);					
				}else{
					//注释表型的信息
					//
					var phe_id = pheorder[i-chordsSNP.length];
					var list = ["CHR" , "BP" , "RSid" , "P-value" , "Find by"];
					var cp_id = cpmatrix_1[chordsSNP.length+pheorder.indexOf(phe_id)].slice(0 , chordsSNP.length);
					var sp_id = spmatrix_1[chordsSNP.length+pheorder.indexOf(phe_id)].slice(0 , chordsSNP.length);
					for(var j =  0 ; j<cp_id.length ; j++){
						if(cp_id[j] != 1 ){
							var snpfind = chordsSNP[j];
							list.push(chr[snp.indexOf(snpfind)]);
							list.push(bp[snp.indexOf(snpfind)]);
							list.push(snpfind);
							//找对应表型在对应snp里面的P-value
							var loa = Phes[bar_snp.indexOf(snpfind)].indexOf(phe_id);
							list.push(Sps[bar_snp.indexOf(snpfind)][loa]);

							if(sp_id[j] != 1){
								list.push("cp and sp");
							}else{
								list.push("cp");
							};
						};
					};
					//添加注释信息
					phezhushi(svg , list);
				}
			})
			.attr("stroke","white")
			.attr("stroke-width", 2);			


			var inner_chord = d3.svg.chord()
									.radius(innerRadius);

			xuan = svg.append("g")
				.attr("class", "chord")
				.selectAll("path")
				.data(chords)
				.enter()
				.append("path")
				.attr("d", inner_chord)
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")")
				.style("fill", function(d) {
					if(logmatrix[d.source.index][d.target.index] != 0 && splogmatrix[d.source.index][d.target.index] == 0){
						return pathcolor[d.target.index-chordsSNP.length];
					}else{
						return "#8b7e66";
					};

				//return color20(d.source.index);
				})
				.style("opacity", 4)
				.on("mouseover", function(d, i) {
					tooltip.html("<strong>P-value : </strong>:"+matrix[d.source.index][d.target.index])
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY + 20) + "px")
				.style("opacity",1.0);
				//把两头的环渲染
					huan[0][d.source.index].style.fill = "red";
					huan[0][d.target.index].style.fill = "red";
				d3.select(this)
					.style("fill", "red");
				})
			.on("mouseout", function(d, i) {
				tooltip.style("opacity" , 0.0); 
				d3.select(this)
					.style("fill",function(d){
					if(logmatrix[d.source.index][d.target.index] != 0 && splogmatrix[d.source.index][d.target.index] == 0){
						return pathcolor[d.target.index-chordsSNP.length];
					}else{
						return "#8b7e66";
					};
				})
				huan[0][d.source.index].style.fill = "#333333";
				huan[0][d.target.index].style.fill = pathcolor[d.target.index-chordsSNP.length];
				})
				.attr("stroke","white")                 
				.attr("stroke-width", 0) ;

				//添加表型标签
				//     
			svg.selectAll("text")  
				.data(groups)  
				.enter()  
				.append("text")  
				.each( function(d,i) {   
				    d.angle = (d.startAngle + d.endAngle) / 2;   
				    d.name = mass[i];  
				})  
				.attr("dy",".35em")  
				.attr("transform", d =>`
					rotate(${(d.angle * 180 / Math.PI - 90)})
					translate(${innerRadius + 26})
					${d.angle > Math.PI ? "rotate(180)" : ""}
				`)
				.attr("text-anchor", d => d.angle > Math.PI ? "end" : null) 
				.text(function(d , i){
					if(i < chordsSNP.length){
						return "";
					}else{
						return d.name ;}  
				});  
				//**********
				//添加注释框
				//**********
				var lagend = mass.splice(chordsSNP.length , pheorder.length);
				var lagend_col = [];
				for(var i =0 ;i<lagend.length ; i++){
					lagend_col.push(pathcolor[i]);
				};
				lagend.splice(0,0,"single ");
				lagend_col.splice(0,0,"#8b7e66");

				svg.selectAll("rect")
					.data(lagend_col)
					.enter()
					.append("rect")
					.attr("x" , 400)
					.attr("y" , function(d,i){
						return 20*i ;
					})
					.attr("width" , 40)
					.attr("height" , 15)
					.style("fill" , function(d){
						return d;
					})
					.attr("transform", "translate(-50,-250)");

                svg.selectAll("circle")
					.data(lagend)
					.enter()
                	.append("text")
                	.attr("x" , 450)
					.attr("y" , function(d,i){
						return 20*i+10 ;
					})
					.text(function(d){
						return d;
					})
					.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
				//**********
				//添加注释信息
				//**********
					//两个标点
				svg.selectAll("circle")
					.data([1,2])
					.enter()
                	.append("rect")
                	.attr("x" , function(d,i){
						return 200*i+xBase-20 ;
					})
					.attr("y" ,0)
					.attr("width" , 5)
					.attr("height" , 50)
					.attr("fill" , "blue")
					.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
					//注释信息
				svg.selectAll("ellipse")
					.data(["SNP : "+chordsSNP.length,"Phenotype : "+pheorder.length])
					.enter()
                	.append("text")
                	.attr("x" ,function(d,i){
						return 200*i+xBase+10 ;
					})
					.attr("y" , 8)
					.text(function(d){
						return d;
					})
					.attr("font-family", "sans-serif")
					.attr("font-size", "25px")
					.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
};
function snpzhushi(svg ,  chr , bp , snp , cp, penotype ,result){	

	if(zhushi_0 != 1){
		var a = d3.selectAll(zhushi_0);
		a[0].remove();
	};
	if(zhushi_1 != 1){
		var a = d3.selectAll(zhushi_1);
		a[0].remove();	
	};
	if(beijing_0 != 1){
		var a = d3.selectAll(beijing_0);
		a[0].remove();
	};
	if(beijing_1 != 1){
		var a = d3.selectAll(beijing_1);
		a[0].remove();	
	};
		//添加snp位点注释框
	beijing_0 = svg.selectAll("ellipse")
					.data([1,2])
					.enter()
					.append("rect")
					.attr("x" ,xBase-10)
					.attr("y" , function(d,i){
						return yBase-120+40*(i%6);
					})
					.style("fill" , function(d, i){
						if(i%2 == 1){
							return "#CCCC33";
						}else{
							return "#CC9933";
						}
					})
					.style("opacity" , 0.5)
					.attr("width" , 650)
					.attr("height" , 40)
					.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
		//添加背景颜色框
		var b = rep(1 , pheorder.length+1);
		beijing_1 = svg.selectAll("ellipse")
				.data(b)
				.enter()
				.append("rect")
				.attr("x" ,xBase-10)
				.attr("y" , function(d,i){
					return yBase+40+40*(i%(pheorder.length+1)) ;
				})
				.style("fill" , function(d, i){
					if(i ==0){
						return "#0000FF";
					}else{
						if(i%2 == 1){
							return "#0099CC";
						}else{
							return "#00CCCC";
						}
					}
				})
				.style("opacity" , 0.5)
				.attr("width" , 650)
				.attr("height" , 40)
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");	
	
	
	//snp位点的注释信息
	zhushi_0 = svg.selectAll("ellipse")
				.data(["chr","bp","snp", "CombineP",chr,bp,snp , cp])
				.enter()
				.append("text")
				.attr("x" ,function(d,i){
					return 150*(i%4)+xBase+20 ;
				})
				.attr("y" , function(d,i){
					return yBase-90+40*parseInt(i/4) ;
				})
				.text(function(d){
					return d;
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "20px")
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
	zhushi_1 = svg.selectAll("ellipse")
				.data(result)
				.enter()
				.append("text")
				.attr("x" ,function(d,i){
					return 150*parseInt(i/(pheorder.length+1))+xBase+20 ;
				})
				.attr("y" ,function(d,i){
					return 40*(i%(pheorder.length+1))+yBase+70
					 ;
				})
				.text(function(d){
					return d;
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "20px")
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
	zhushi_status = 1;
};
function phezhushi(svg , list){
	if(zhushi_0 != 1){
		var a = d3.selectAll(zhushi_0);
		a[0].remove();
	};
	if(zhushi_1 != 1){
		var a = d3.selectAll(zhushi_1);
		a[0].remove();	
	};
	if(beijing_0 != 1){
		var a = d3.selectAll(beijing_0);
		a[0].remove();
	};
	if(beijing_1 != 1){
		var a = d3.selectAll(beijing_1);
		a[0].remove();	
	};
		//添加snp位点注释框
	beijing_0 =	svg.selectAll("ellipse")
				.data(rep(1 , parseInt(list.length/5)))
				.enter()
				.append("rect")
				.attr("x" , xBase)
				.attr("y" , function(d,i){
					return yBase-120+40*i;
				})
				.style("fill" , function(d, i){
					if(i ==0){
						return "#996600";
					}else{
						if(i%2 == 1){
							return "#CCCC33";
						}else{
							return "#CC9933";
						}
					}
				})
				.style("opacity" , 0.5)
				.attr("width" , 650)
				.attr("height" , 40)
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
	//snp位点的注释信息
	zhushi_0 = svg.selectAll("ellipse")
				.data(list)
				.enter()
				.append("text")
				.attr("x" ,function(d,i){
					return 120*(i%5)+xBase+20 ;
				})
				.attr("y" , function(d,i){
					return yBase-130+40*(parseInt(i/5)+1);
				})
				.text(function(d){
					return d;
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "15px")
				.attr("transform" , "translate("+3*rightmove+","+2*rightmove+")");
};