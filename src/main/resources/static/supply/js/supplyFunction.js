//selectAll()  勾选复选框里面所有的选项
//loadTxt()可以获取本地上传的TXT文件，并且遍历（添加筛选条件）之后以{chr,snp,p,bp,logp}的形式输出结果
//findAll(a,x) 返回数组A里面所有能匹配上x的位置
//arrayBetween(array,max,min)  查找array里面所有介于max和min之间的数
//arraySelect(array , index)   在array里面索引index的位置的元素
//arrayFilter(array , max , min) 在array中筛选max和min之间的值
//
//mhtPlot() 根据上下文返回的chr，snpID，logp，bp来画曼哈顿图
//col(matrix, n)  取matrix的第n列
function nagtive_log10(matrix) {
    var i = matrix.length;
    var j = matrix[0].length;
    var result = [];
    for (var a = 0; a < i; a++) {
        var subresult = [];
        for (var b = 0; b < j; b++) {
            subresult.push(-Math.log(matrix[a][b]) / Math.log(10))
        }
        result.push(subresult);
    }
    ;
    return result;
};

function col(matrix, n) {
    var row = matrix.length;
    var result = [];
    for (var i = 0; i < row; i++) {
        result.push(matrix[i][n])
    }
    ;
    return (result);
};

function rep(str, n) {
    var result = [];
    for (var i = 1; i <= n; i++) {
        result.push(str);
    }
    ;
    return result;
};

function sep(a, b) {
    var result = [];
    for (var j = a; j <= b; j++) {
        result.push(j);
    }
    ;
    return result;
};

function selectAll(checkallNode, item) {
    var itemNodes = document.getElementsByName(item);
    for (var i = 0; i < itemNodes.length; i++) {
        itemNodes[i].checked = checkallNode.checked;
    }
};

function findAll(a, x) {
    var results = [],
        len = a.length,
        pos = 0;
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) {//未找到就退出循环完成搜索
            break;
        }
        results.push(pos);//找到就存储索引
        pos += 1;//并从下个位置开始搜索
    }
    return results;
};

function arraySelect(array, index) {
    var result = [];
    for (var i = 0; i < index.length; i++) {
        result.push(array[index[i]])
    }
    return result;
};

function arrayFilter(array, max, min) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] <= max && array[i] >= min) {
            result.push(array[i])
        }
    }
};
Array.prototype.find_array = function (e) {
    for (i = 0; i < this.length; i++) {
        if (this[i] == e)
            return true;
    }
    return false;
};

//若是选择画ld，则可以指定area，否则不能指定
function input_area() {
    if (document.getElementById("addld").checked) {
        ldstatus = "t";
        document.getElementById("ldarea").disabled = false;
    } else {
        ldstatus = "f";
        document.getElementById("ldarea").disabled = true;
    }
    ;
};

function loading(AssignSvg, figureX, figureY) {
    //重新画图
    AssignSvg.append("image")
        .attr("xlink:href", websiteUrl + "/css/loading.gif")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 300)
        .attr("height", 300)
        .attr("transform", "translate(" + figureX + "," + figureY + ")")
        .attr("id", "loading");
};

function addLines() {
    var lineValues = document.getElementById("lineValue").value;
    if (lineValues != "") {             //判断线的坐标是否为空
        lineValues = lineValues.split(",").map(Number);
        lineColors = ["#000000", "#003399", "#CC0033", "#990066", "#CCCCCC", "#666666"];
        for (var i = 0; i < lineValues.length; i++) {
            //定义线的比例
            var line = lineValues[i];
            var linep = -Math.log(line) / Math.log(10);
            var upLocation;
            var downLocation;
            if (line <= 5e-8) {
                //线的坐标
                var upLocation = [padding, Yup2Scale(linep), w, Yup2Scale(linep)];
                var downLocation = [padding, Ydown2Scale(linep), w, Ydown2Scale(linep)]
            } else {
                //线的坐标
                var upLocation = [padding, Yup1Scale(linep), w, Yup1Scale(linep)];
                var downLocation = [padding, Ydown1Scale(linep), w, Ydown1Scale(linep)]
            }
            ;
            //坐标轴上方
            svg.append("line")
                .attr("x1", upLocation[0])
                .attr("y1", upLocation[1])
                .attr("x2", upLocation[2])
                .attr("y2", upLocation[3])
                .attr("transform", "translate(" + left_move + ",0)")
                .attr("stroke", lineColors[i % 6])
                .attr("stroke-width", 1)
                .on("mouseover", function (d, i) {
                    tooltip.html("<strong>line value : </strong>:" + line)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0);
                    d3.select(this)
                        .attr("stroke-width", 2);
                })
                .on("mouseout", function (d, i) {
                    tooltip.style("opacity", 0.0);
                    d3.select(this)
                        .attr("stroke-width", 1);
                });
            //坐标轴下方
            svg.append("line")
                .attr("x1", downLocation[0])
                .attr("y1", downLocation[1])
                .attr("x2", downLocation[2])
                .attr("y2", downLocation[3])
                .attr("transform", "translate(" + left_move + ",0)")
                .attr("stroke", lineColors[i % 6])
                .attr("stroke-width", 1).on("mouseover", function (d, i) {
                tooltip.html("<strong>line value : </strong>:" + line)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity", 1.0);
                d3.select(this)
                    .attr("stroke-width", 2);
            })
                .on("mouseout", function (d, i) {
                    tooltip.style("opacity", 0.0);
                    d3.select(this)
                        .attr("stroke-width", 1);
                });
        }
        ;
    } else {
        alert("Sorry , please check your line colors ,line value and try again！");
    }
};

function highLight(ElementSet, SnpList, HightSnp, color) {
    //highLight(CircleSet[a] , snpSimulate , snphight , "red");
    ElementSet.filter(function (d, i) {
        return SnpList[i] == HightSnp;
    })
        .attr("fill", color);
};

function loadPdf() {
    var fileNme = document.getElementById("plotName").value;
    console.info(fileNme);
    html2canvas(document.body, {
        onrendered: function (canvas) { //过html2canvas将html渲染成canvas，然后获取图片数据
            var imgData = canvas.toDataURL('image/png', 1.0); //背景是白色，初始化pdf，设置相应格式
            var doc = new jsPDF("p", "mm", "a4");
            doc.addImage(imgData, 'png', 0, 0, 210, 210);
            doc.save(fileNme + '.pdf');	//输出保存名
        }
    });
};

function ldPlot(blockarea, blockchr, blockstart, blockend, svg) {
    var load;
    //获取要查询的地区
    leftMove = $(window).width() * 0.1;

    //定义插入图片函数
    function insertFigure(userTime) {
        //插入结果图片
        if (userTime) {
            //关掉加载框，删去上次产生的图片
            d3.select("#ldPicture").remove();
            d3.select("#loading").remove();
            //开始重新画图
            // var userTime = JSON.parse(userTime);
            ldplot = "T";
            //插入ldPlot
            svg.append("image")
                .attr("xlink:href", websiteUrl + "/userdata/" + userTime + "/result.jpg")
                .attr("x", padding)
                .attr("y", height + padding + h / 2)
                .attr("width", width * mhtwidth)
                .attr("id", "ldPicture");

            //insert centre arrow
            //get centre snp
            var rscenter = document.getElementById("rscenter").value;

            //ajax删除文件
        }
    };

    function getusertime(blockchr, blockstart, blockend, blockarea) {
        var result='';
        //传递数据并且画图
        $.ajax({
            type: "post",
            url: "https://bigd.big.ac.cn/cgwas/ldplot",
            data: {
                blockchr: blockchr,
                blockstart: blockstart,
                blockend: blockend,
                area: blockarea,
            },
            datatype: 'json',
            async: false,
            beforeSend: loading(svg, 250, height + h / 2 + padding),
            success: function (msg) {
                $.each(msg, function (index, item) {
                    console.log(item);//insertFigure(item);
                    result=item;
                    //
                })
                //insertFigure(msg);
            }, error: function (e) {
                alert("请求失败: " + e.toString());
            },
        });
        return result;
    };
    var filedir = getusertime(blockchr, blockstart, blockend, blockarea);
    var filename="/asnas/pmod/bigyuann/cgwas/userdata/"+filedir +"/result.jpg";
    var fname = "/userdata/" + filedir + "/result.jpg";
    var i = 0;
    var ldrun = setInterval(function () {
        $.ajax({
            type: "post",
            url: "https://bigd.big.ac.cn/cgwas/done",
            dataType: "text",
            data: {
                filename: filename
            },
            success: function (result) {
                console.log(result);
                i++;
                if (result == "exists") {
                    var src = "https://bigd.big.ac.cn/cgwas/file" + fname;
                    console.log(src);
                    clearInterval(ldrun);
                    insertFigure(filedir);//插入在这里
                } else {
                    if (i == 200) {
                        clearInterval(ldrun);
                        alert("something is wrong,if you need further infromation contact cgwas@big.ac.cn");
                    }
                }
            },
            error: function () {
                alert("This variation is no linkage disequilibrium in 1K interval,if you need further infromation contact CGVD@big.ac.cn");
                clearInterval(ldrun);
            }
        });
    }, 2000);
}

function ajaxData(userid, type) {
    if (type = "cgwas") {

    }
    ;
    if (type = "chrosome") {

    }
    ;
};

function get_data(userid, type) {
    var result = '';
    $.ajax({
        type: "get",
        // url: "http://192.168.118.86:9800/cgwas/file/1_pheno.txt",
        url: 'https://bigd.big.ac.cn/cgwas/file/' + userid + '/workDir/Result/plotdata/' + type,
        dataType: "text",
        async: false,
        data: {},
        success: function (msg) {
            result = msg;
            //此处可以简单处理msg；替换之类
        }
    });
    return result;
};

