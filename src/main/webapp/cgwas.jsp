<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <style type="text/css">


        table td {
            max-width: 125px;
            word-wrap: break-word;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        table td:hover {
            white-space: normal;
            overflow: auto;
        }
    </style>

    <%--<link href="${host}/css/dataTables.bootstrap.min.css" rel="stylesheet">--%>
    <%--<link href="https://cdn.datatables.net/buttons/1.5.1/css/buttons.dataTables.min.css" rel="stylesheet">--%>

    <link rel="stylesheet" href="${host}/supply/css/supply.css"/>

    <%--<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">--%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


</head>

<body>

<div class="container" style="background-color: #ffffff;">
    <jsp:include page="newheader.jsp"/>
    <div class="panel panel-default" style="margin-left: 29px;margin-right: 30px ;border: solid 1px #888;">
        <div class="panel-heading" style="margin-left: 1px">
            <text class="panel-title">
                <i class="fa fa-bar-chart"></i><strong> CGWAS Plot</strong></text>
            <button class="btn btn-info" id="cgwasbtn" name="btnSave" onclick="cmht('example')">Demo Run</button>
            <%--<text style="font-size:13px;float:right;width:500px;" >Only compatible with Chrome,Firefox and Edge(new beta version)</text>--%>
        </div>
        <div class="panel-body" style="background-color:#d3dff5;margin-left:1px;margin-bottom:1px;">

            <div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:10px;background-color: #eee;border: #ccc">
                <div class="form-inline">
                    <label class="col-md-2"
                           style="
                  font-size:18px;margin-left: 10px;margin-top:-10px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">
                        Plot p-value
                    </label>
                </div>
                <br>
                <div class="row" style="margin-top: 15px;padding-bottom: 10px">
                    <label class="col-md-3" style="margin-left: 15px;width: 286px">Genome-wide significant threshold:
                        </label>
                    <div class="col-md-2">
                        <input id="gt" name="gt" placeholder="5e-8" class="form-control col-md-1"
                               style="margin-top: -5px;width: 60%"><label class="col-md-1"
                                                                           style="color: #bbb">(0,0.05)</label>
                    </div>

                    <label class="col-md-offset-1  col-md-3" style="width: 289px;margin-left: 7%;">Genome-wide suggestive threshold:
                 </label>
                    <div class="col-md-2">
                        <input id="st" name="st" placeholder="1e-6" class="form-control col-md-1"
                               style="margin-top: -5px;width: 60%;"><label class="col-md-1"
                                                                           style="color: #bbb">(0,1)</label>
                    </div>

                </div>


            </div>

            <br>
            <div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:30px;background-color: #eee;border: #ccc">
                <br>
                <div class="form-inline">
                    <label class="col-md-2"
                           style="width:19%;font-size:18px;margin-left: 10px;margin-top:-30px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Load
                        CGWAS Data</label>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6" style="border-right: 3px solid #ccc;">
                        <div class="form-group">
                            <label class="col-md-3" style="margin-top: 5px;width: 28%;">Input Mht.txt</label>
                            <div class="col-md-5" style="margin-left: -30px">
                                <input type="file" name="cmht" id="cmht" class="form-control"
                                       placeholder="please input file"/>
                            </div>
                            <label class="col-md-3" style="margin-top: 5px;margin-left: -20px;color: darkgrey">(<a
                                    href="${host}/file/example/Mht.txt" style="color: darkgrey">
                                Mht.txt <i class="fa fa-download"></i></a>)</label>
                        </div>
                        <br>
                        <br>
                        <div class="form-group">
                            <label class="col-md-3" style="margin-top: 5px;width: 28%;">Input Nbar.txt</label>
                            <div class="col-md-5" style="margin-left: -30px">
                                <input type="file" name="barfile" id="barfile" class="form-control"
                                       placeholder="please input file"/>
                            </div>
                            <label class="col-md-3" style="margin-top: 5px;margin-left: -20px;color: darkgrey">(<a
                                    href="${host}/file/example/Nbar.txt" style="color: darkgrey">
                                Nbar.txt <i class="fa fa-download"></i></a>)</label>
                        </div>
                        <br><br>
                        <button type="submit" style="margin-left:35%;width:100px;height:40px;" onclick="cmht('local')">
                            <strong>LocalPlot</strong>
                        </button>

                    </div>
                    <div class="col-md-5">
                        <label class="col-md-4" style="margin-top: 5px;">Input job id</label>
                        <div class="col-md-8" style="margin-left: -30px">
                            <input name="userid" id="userid" class="form-control"
                                   placeholder="please input JobID"/>
                        </div>
                        <br><br><br><br><br>
                        <button type="submit" style="margin-left:35%;margin-top:5px;width:100px;height:40px;" onclick="cmht('ser' +
                 'ver')"><strong>ServerPlot</strong></button>
                    </div>

                </div>

                <%--<div class="form-group">--%>
                <%--<label class="col-md-offset-1 col-md-3" style="margin-top: 5px;">Input your manhattan data</label>--%>
                <%--<div class="col-md-4" style="margin-left: -50px;">--%>
                <%--<input type="file" name="cmht" id="cmht" class="form-control" placeholder="please input file"--%>
                <%--required/>--%>
                <%--</div>--%>
                <%--<label class="col-md-3" style="margin-top: 5px;margin-left: -20px;color: darkgrey">(<a--%>
                <%--href="${host}/file/1.txt" style="color: darkgrey">--%>
                <%--Example.manhattan.data <i class="fa fa-download"></i></a>)</label>--%>
                <%--</div>--%>
                <%--<br>--%>
                <%--<br>--%>
                <%--<div class="form-group">--%>
                <%--<label class="col-md-offset-1 col-md-3" style="margin-top: 5px;">Input your bar data</label>--%>
                <%--<div class="col-md-4" style="margin-left: -50px;">--%>
                <%--<input type="file" name="barfile" id="barfile" class="form-control"--%>
                <%--placeholder="please input file"--%>
                <%--required/>--%>
                <%--</div>--%>
                <%--<label class="col-md-3" style="margin-top: 5px;margin-left: -20px;color: darkgrey">(<a--%>
                <%--href="${host}/file/2.txt" style="color: darkgrey">--%>
                <%--Example.bar.data <i class="fa fa-download"></i></a>)</label>--%>
                <%--</div>--%>
                <%--</div>--%>

                <%--<div style="padding-left: 32%;margin-top: 20px">--%>
                <%--<button type="submit" style="width:80px;height:40px;" onclick="cmht('local')"><strong>plot</strong>--%>
                <%--</button>--%>
                <%--<button id="reset" style="margin-left:15% ;width:80px;height:40px;"><strong>reset</strong></button>--%>
                <%--<button  type="submit" style="margin-left:15% ;width:100px;height:40px;" onclick="cmht('ser' +--%>
                <%--'ver')"><strong>serverplot</strong></button>--%>
            </div>
        </div>
    </div>
    <!--添加分析-->
    <br>

    <%--<div id="run" ></div>--%>

    <div id="ScriptDiv">
        <%--<hr>--%>
        <%--<div style="border: solid 1px #888;padding: 10px;margin:5px 25px 5px 25px;background-color: #eee">--%>
        <%--<h2><strong style="color:#369">Available CGWAS Results</strong></h2>--%>
        <%--</div>--%>


        <%--<div style="margin-top: 25px;margin-left: 10px;margin-right:10px;font-size: 16px;background-color: #eee;height: 47px">--%>
        <%--&lt;%&ndash;<div class="form-inline">&ndash;%&gt;--%>
        <%--<div class="col-md-4 col-sm-4" style="width:35%;margin-top: 10px;padding-right: 0px;margin-right: -5px;">--%>
        <%--<text size="2" color="Gray">add lines:</text>--%>
        <%--<input id="lineValue" type="text" style="width:50px" placeholder="pvalue">--%>

        <%--<button type="submit" onclick="addLines()">add</button>--%>

        <%--<text size="2" color="Gray">highlight:</text>--%>
        <%--<input id="Hsnp" type="text" style="width:60px"  placeholder="rsID">--%>

        <%--<button type="submit" onclick="Highlight_snp()" >start</button>--%>
        <%--</div>--%>
        <%--<div class="col-md-4 col-sm-4" style="width:40%;margin-top: 10px;margin-right: -20px;padding-right: 0px;border-left: 3px solid #ccc">--%>
        <%--<text size="2" color="Gray">center snp:</text>--%>

        <%--<input id="rscenter" type="text" style="width:60px" placeholder="rsID">--%>

        <%--<text size="2" color="Gray">region(kb) :</text>--%>

        <%--<input id="rsrange" type="text" style="width:40px">--%>

        <%--<a type="button"  href="#info" onclick="boom(0)">+</a>--%>

        <%--<a type="button"  style="color:#333" href="#info" onclick="leftmove()">&lt;&lt;</a>--%>

        <%--<a type="button"  href="#info" onclick="rightmove()">&gt;&gt;</a>--%>

        <%--<a type="button"  href="#info" onclick="reset()">reset</a>--%>
        <%--</div>--%>
        <%--<div class="col-md-4 col-sm-4" style="width:18%;margin-top: 10px;margin-right:-20px;padding-right: 0px;border-left: 3px solid #ccc">--%>
        <%--<text size="2" color="Gray">ldplot:</text>--%>
        <%--<select id="ldarea">--%>
        <%--<option value="AFR">AFR</option>--%>
        <%--<option value="AMR">AMR</option>--%>
        <%--<option value="EUR">EUR</option>--%>
        <%--<option value="EAS">EAS</option>--%>
        <%--<option value="SAS">SAS</option>--%>
        <%--</select>--%>
        <%--<button  id="addld" onclick="add_ld()">add now</button>--%>

        <%--</div>--%>
        <%--<br>--%>
        <%--<div class="col-md-3" style="margin-top:15px;margin-left:78%;width:22%;height:30px;background-color: #eee;">--%>
        <%--<button id="pic"  >download</button>--%>
        <%--<text style="margin-left: 15px">Excel</text><button  onclick="process()">download</button>--%>
        <%--</div>--%>
    </div>

    <div id="info" class="table-responsive" style="width:96%;margin-top: 20px;margin-left: 15px">


        <div id="tableAjax"></div>


    </div>

    <div id="draw"></div>
    <canvas id="canvas" style="display: none"></canvas>

    <%--<div class="footer" style="color: white;background-color:#3fc2cf;margin-top: 50px">--%>
    <%--<strong style="margin-left: 20px">Copyright © 2019 FanLiu Lab</strong>--%>
    <%--</div>--%>

</div>


<%--<script src="${host}/js/jszip.min.js"></script>--%>
<%--<script src="${host}/js/buttons.html5.min.js"></script>--%>
<%--<script src="${host}/js/dataTables.buttons.min.js"></script>--%>
<%--<script src="${host}/js/jquery.dataTables.min.js"></script>--%>
<%--<script src="${host}/js/dataTables.bootstrap.min.js"></script>--%>

<%--<script src="${host}/supply/js/jquery-3.3.1.min.js"></script>--%>
<script src="${host}/supply/js/cgwasD3/d3.js"></script>
<script src="${host}/supply/js/supplyVariance.js"></script>
<script src="${host}/supply/js/supplyFunction.js"></script>
<script src="${host}/supply/js/supplyCGWAS1210.js"></script>


<script type="text/javascript">
    //插入局部查询语句
    function add() {
        if (toolstatus == 0) {

            var sHTML = '<hr>\n' +
                '        <div style="border: solid 1px #888;padding: 10px;margin:5px 25px 5px 25px;background-color: #eee">\n' +
                '            <h2><strong style="color:#369">Available CGWAS Results</strong></h2>\n' +
                '        </div>\n' +
                '\n' +
                '\n' +
                '        <div style="margin-top: 25px;margin-left: 10px;margin-right:10px;font-size: 16px;background-color: #eee;height: 47px">\n' +
                '            <%--<div class="form-inline">--%>\n' +
                '                <div class="col-md-4 col-sm-4" style="width:38%;margin-top: 10px;padding-right: 0px;margin-right: -5px;">\n' +
                '                    <text size="2" color="Gray">add lines:</text>\n' +
                '                    <input id="lineValue" type="text" style="width:50px" placeholder="pvalue">\n' +
                '\n' +
                '                    <button type="submit" onclick="addLines()">add</button>\n' +
                '\n' +
                '                    <text size="2" color="Gray">highlight:</text>\n' +
                '                    <input id="Hsnp" type="text" style="width:60px"  placeholder="rsID">\n' +
                '\n' +
                '                    <button type="submit" onclick="Highlight_snp()" >start</button>\n' +
                '                </div>\n' +
                '                <div class="col-md-4 col-sm-4" style="width:41%;margin-top: 10px;margin-right: -20px;padding-right: 0px;border-left: 3px solid #ccc">\n' +
                '                    <text size="2" color="Gray">center snp:</text>\n' +
                '\n' +
                '                    <input id="rscenter" type="text" style="width:60px" placeholder="rsID">\n' +
                '\n' +
                '                    <text size="2" color="Gray">region(kb) :</text>\n' +
                '\n' +
                '                    <input id="rsrange" type="text" style="width:40px">\n' +
                '\n' +
                '                    <a type="button" style="color:#333"   href="#info" onclick="boom(0)">+</button>\n' +
                '\n' +
                '                    <a  type="button" style="color:#333" href="#info" onclick="leftmove()">&lt;&lt;</button>\n' +
                '\n' +
                '                    <a type="button" href="#info" style="color:#333"  onclick="rightmove()">&gt;&gt;</a>\n' +
                '\n' +
                '                    <button type="submit" onclick="reset()">reset</button>\n' +
                '                </div>\n' +
                '                <div class="col-md-3 col-sm-3" style="width:18%;margin-top: 10px;margin-right:-20px;padding-right: 0px;border-left: 3px solid #ccc">\n' +
                '                    <text size="2" color="Gray">ldplot:</text>\n' +
                '                    <select id="ldarea">\n' +
                '                        <option value="AFR">AFR</option>\n' +
                '                        <option value="AMR">AMR</option>\n' +
                '                        <option value="EUR">EUR</option>\n' +
                '                        <option value="EAS">EAS</option>\n' +
                '                        <option value="SAS">SAS</option>\n' +
                '                    </select>\n' +
                '                    <button id="addld" style="width:30%"  onclick="add_ld()">add</button>\n' +
                '                </div>\n' +
                '\n' +
                " <br>\n" +
                "                <div class=\"col-md-3\" style=\"margin-top:15px;margin-left:78%;width:20%;height:30px;background-color: #eee;\">\n" +
                ' <button id="pic" onclick="svgdown()" >download</button>' +
                "                <text style=\"margin-left: 15px\">Excel<i class=\"fas fa-download fa-fw i-hover\" id=\"download-1\" onclick=\"process()\" style=\"color:#337ab7 \"></i> </text>\n" +
                "                </div>"
            '        </div>';

            // var sHTML = ' <hr>\n' +（）
            //     '        <div style="border: solid 1px #888;padding: 10px;margin:5px 25px 5px 25px;background-color: #eee">\n' +
            //     '            <h2><strong style="color:#369">Available CGWAS Results</strong></h2>\n' +
            //     '        </div>\n' +
            //     '\n' +
            //     '\n' +
            //     '        <div style="margin-top: 15px;font-size: 16px">\n' +
            //     '            <strong style="margin-left: 25px;">Options:</strong>\n' +
            //     '            <text size="2" color="Gray">add lines: </text><input id="lineValue" type ="text" style="width:60px">\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="addLines()">add</button>\n' +
            //     '\n' +
            //     '            <text size="2"  color="Gray">highlight: </text><input id="Hsnp" type ="text" style="width:60px">\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="Highlight_snp()">start</button>\n' +
            //     '\n' +
            //     '            <text size="2" color="Gray">center snp: </text>\n' +
            //     '\n' +
            //     '            <input id="rscenter" type ="text"style="width:120px">\n' +
            //     '\n' +
            //     '            <text size="2" color="Gray">region(kb): </text>\n' +
            //     '\n' +
            //     '            <input id="rsrange" type ="text"style="width:60px">\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="boom(0)">+</button>\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="leftmove()">&lt;&lt;</button>\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="rightmove()">&gt;&gt;</button>\n' +
            //     '\n' +
            //     '            <button type="submit" onclick="reset()">reset</button>\n' +
            //     '\n' +
            //     '            <text size="2" color="Gray">ldplot: </text>\n' +
            //     '            <select  id="ldarea">\n' +
            //     '                <option value="AFR">AFR</option>\n' +
            //     '                <option value="AMR">AMR</option>\n' +
            //     '                <option value="EUR">EUR</option>\n' +
            //     '                <option value="EAS">EAS</option>\n' +
            //     '                <option value="SAS">SAS</option>\n' +
            //     '            </select>\n' +
            //     '            <button id="addld"  onclick="add_ld()">add now</button>\n' +
            //     '        </div>';
            // ScriptDiv.insertAdjacentHTML("afterBegin", sHTML);
            $("#ScriptDiv").prepend(sHTML);
        }
    }
</script>

<script type="text/javascript">


    function svgdown() {
        function funcDownload(content, filename) {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        }

        var svg = document.getElementById('draw').innerHTML;
        console.log(svg);
        // var ss = document.querySelector('').outerHTML;
        funcDownload(svg, 'cgwas.html');


        // var svg = document.getElementById('draw').innerHTML;
        //
        // var canvas = document.getElementById('canvas');
        // var c = canvas.getContext('2d');
        //
        // //新建Image对象
        // var img = new Image();
        //
        // //svg内容
        // img.src = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
        // // img.src = 'data:image/svg+xml,' + svg;//svg内容中不能有中文字符
        //
        // //svg编码成base64
        // img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));//svg内容中可以有中文字符
        // // img.src = 'data:image/svg+xml;base64,' + window.btoa(svg);//svg内容中不能有中文字符
        //
        // //图片初始化完成后调用
        // img.onload = function() {
        //     //将canvas的宽高设置为图像的宽高
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //
        //     //canvas画图片
        //     c.drawImage(img, 0, 0);
        //
        //     //将图片添加到body中
        //     // document.body.appendChild(img);
        //
        //     var a = document.createElement('a');
        //     a.href = canvas.toDataURL('image/png');  //将画布内的信息导出为png图片数据
        //     a.download = "CGWAS.png";  //设定下载名称
        //     a.click(); //点击触发下载
        //     //
        // }

    };

</script>


<script type="text/javascript">
    $("#userid").click(function () {
        document.getElementById("userid").style.backgroundColor = "#FFF";
        document.getElementById("cmht").style.backgroundColor = "#ccc";
        document.getElementById("barfile").style.backgroundColor = "#ccc";
// $("#cmht").attr("disabled", true);
        // $("#barfile").attr("disabled", true);
    });
    $("#cmht").click(function () {
        document.getElementById("cmht").style.backgroundColor = "#FFF";
        document.getElementById("barfile").style.backgroundColor = "#FFF";
        document.getElementById("userid").style.backgroundColor = "#ccc";
        // $("#userid").attr("disabled", true);
    });
    $("#barfile").click(function () {
        document.getElementById("cmht").style.backgroundColor = "#FFF";
        document.getElementById("barfile").style.backgroundColor = "#FFF";
        document.getElementById("userid").style.backgroundColor = "#ccc";
        // $("#userid").attr("disabled", true);
    });
    // $("#reset").click(function() {
    //     $("#cmht").attr("disabled", false);
    //     $("#barfile").attr("disabled", false);
    //     $("#userid").attr("disabled", false);
    //     $("#userid").val("");
    //     $("#cmht").val("");
    //     $("#barfile").val("");
    // });


    <%--function selectano(chr,bp){--%>
    <%--var result='';--%>
    <%--$.ajax({--%>
    <%--url:"${host}/variant",--%>
    <%--type: "post",--%>
    <%--dataType: "json",--%>
    <%--async: false,--%>
    <%--cache:false,--%>
    <%--data: {--%>
    <%--"chr":chr,--%>
    <%--"bp":bp,--%>
    <%--},--%>
    <%--success: function (msg) {--%>
    <%--var tableStr="<table  id=\"tableInfo\" class=\"table \" style=\"margin-top: 2px\">";--%>
    <%--tableStr=tableStr+"<thead>\n" +--%>
    <%--"                    <tr>\n" +--%>
    <%--"                        <th>Chrom</th>\n" +--%>
    <%--"                        <th>Start</th>\n" +--%>
    <%--"                        <th>End</th>\n" +--%>
    <%--"                        <th>Ref</th>\n" +--%>
    <%--"                        <th>Alt</th>\n" +--%>
    <%--"                        <th>Func</th>\n" +--%>
    <%--"                        <th>Gene</th>\n" +--%>
    <%--"                        <th>GeneDetail</th>\n" +--%>
    <%--"                        <th>ExonicFunc</th>\n" +--%>
    <%--"                        <th>AAChange</th>\n" +--%>
    <%--"                        <th>ensGene</th>\n" +--%>
    <%--"                        <th>snp138</th>\n" +--%>
    <%--"                        <th>dbSNP</th>\n" +--%>
    <%--"                        <th>1KGP_EAS</th>\n" +--%>
    <%--"                        <th>1KGP_SAS</th>\n" +--%>
    <%--"                        <th>1KGP_AFR</th>\n" +--%>
    <%--"                        <th>1KGP_AMR</th>\n" +--%>
    <%--"                        <th>1KGP_EUR</th>\n" +--%>
    <%--"                        <th>PubMedID</th>\n" +--%>
    <%--"                        <th>Journal</th>\n" +--%>
    <%--"                        <th>Disease</th>\n" +--%>
    <%--"                    </tr>\n" +--%>
    <%--"                    </thead>\n" +--%>
    <%--"                <tbody>\n" +--%>
    <%--"                <tr>";--%>
    <%--$.each(msg, function (index, item) {--%>
    <%--$.each(item, function (indexcol, col) {--%>
    <%--tableStr = tableStr +"<td>" + col + "</td>";--%>
    <%--});--%>
    <%--// console.log(item);--%>
    <%--// $("#tableInfo").append("<td>" + item + "</td>");--%>
    <%--});--%>
    <%--tableStr = tableStr + "</tr>"+"</tbody>"+"</table>";--%>
    <%--$("#tableAjax").html(tableStr);--%>
    <%--var tableinfo = $('#tableInfo').DataTable({--%>
    <%--searching: false,--%>
    <%--paging: false,--%>
    <%--"ordering": false,--%>
    <%--"info": false,--%>
    <%--"stateSave": false,--%>
    <%--buttons: [{--%>
    <%--extend: 'excelHtml5',--%>
    <%--filename: "SnpAnnotation",--%>
    <%--exportOptions: {columns: ':visible'}--%>
    <%--}]--%>
    <%--});--%>
    <%--$('#download-1').on('click', function () {--%>
    <%--tableinfo.button('.buttons-excel').trigger();--%>
    <%--});--%>

    <%--},error: function (e) {--%>
    <%--alert("请求失败: " + e.toString());--%>
    <%--}--%>
    <%--});--%>
    <%--return result;--%>
    <%--};--%>

    function process() {
        // chr = "1";
        // bp = "16515";
        // start = "16515";
        // end = "19391";
        // // var anodata=selectano(chr,bp);
        var tableinfo = $('#tableInfo').DataTable({
            searching: false,
            paging: false,
            "ordering": false,
            "info": false,
            "stateSave": false,
            buttons: [{
                extend: 'excelHtml5',
                filename: "SnpAnnotation",
                exportOptions: {columns: ':visible'}
            }]
        });
        tableinfo.button('.buttons-excel').trigger();
        // $('#download-1').on('click', function () {
        //     tableinfo.button('.buttons-excel').trigger();
        // });
    }


</script>


</body>
</html>
