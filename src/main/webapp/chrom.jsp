<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <style type="text/css">
        .table {
            border: 2px solid grey !important; /* 整体表格边框 */
        }
    </style>

    <%--<script src=" http://html2canvas.hertzen.com/dist/html2canvas.js"></script>--%>
    <link rel="stylesheet" href="${host}/supply/css/supply.css"/>

</head>

<body>

<div class="container" style="background-color: #ffffff;">
    <jsp:include page="newheader.jsp"/>
    <div class="panel panel-default" style="margin-left: 29px;margin-right: 30px ;border: solid 1px #888;">
        <div class="panel-heading" style="margin-left: 1px">
            <text class="panel-title">
                <i class="fa fa-line-chart"></i><strong> Chromsome Plot</strong></text>
                <button class="btn btn-info"  id="cgwasbtn" name="btnSave" onclick="Chrosome('example')" >Demo Run</button>
            <text style="font-size:13px;float:right;width:500px;">Only compatible with Chrome,Firefox and Edge(new beta version)</text>
            <%--background-color:	#556B2F;border-color: #D2B48C--%>
        </div>
        <div class="panel-body" style="background-color:#d3dff5;margin-left:1px;margin-bottom:1px;">
            <div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:30px;background-color: #eee;border: #ccc">
                <br>
                <div class="form-inline">
                    <label class="col-md-3"
                           style="width:26%;font-size:18px;margin-left: 10px;margin-top:-30px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Load
                        Chromsome Data(.txt)</label>
                </div>
                <br>


                <div class="row">
                    <div class="col-md-7" style="border-right: 3px solid #ccc;padding-right: 0">
                        <div class="form-group" style="margin-left: 1%">
                            <label class="col-md-4" style="margin-top: 5px;width: 35%;">Input 1_pheno</label>
                            <div class="col-md-4" style="margin-left: -4%;padding: 0">
                                <input type="file" name="Phenotypes" id="Phenotypes" class="form-control"
                                       placeholder="please input file"
                                       required/>
                            </div>
                            <label class="col-md-4" style="margin-top: 5px;margin-left: -10px;color: darkgrey;">(<a
                                    href="${host}/file/example/1_pheno.txt" style="color: darkgrey">
                                1_pheno.txt <i class="fa fa-download"></i></a>)</label>
                        </div>
                        <br>
                        <br>
                        <div class="form-group" style="margin-left: 1%">
                            <label class="col-md-4" style="margin-top: 5px;width: 35%;">Input 2_TopSNP_gwas</label>
                            <div class="col-md-4" style="margin-left: -4%;padding: 0" >
                                <input type="file" name="topGwas" id="topGwas" class="form-control"
                                       placeholder="please input file"
                                       required/>
                            </div>
                            <label class="col-md-4" style="margin-top: 5px;margin-left: -10px;color: darkgrey;width: 35%;">(<a
                                    href="${host}/file/example/2_TopSNP_gwas.txt" style="color: darkgrey">
                                2_TopSNP_gwas.txt <i class="fa fa-download"></i></a>)</label>
                        </div>
                        <br>
                        <br>
                        <div class="form-group" style="margin-left: 1%">
                            <label class="col-md-4" style="margin-top: 5px;width: 35%;">Input 3_TopSNP_cgwas</label>
                            <div class="col-md-4" style="margin-left: -4%;padding: 0">
                                <input type="file" name="topCgwas" id="topCgwas" class="form-control"
                                       placeholder="please input file"
                                       required/>
                            </div>
                            <label class="col-md-4" style="margin-top: 5px;margin-left: -10px;color: darkgrey;width: 36%;">(<a
                                    href="${host}/file/example/3_TopSNP_cgwas.txt" style="color: darkgrey">
                                3_TopSNP_cgwas.txt <i class="fa fa-download"></i></a>)</label>
                        </div>

                        <br><br>
                        <button type="submit" style="margin-left:35%;width:100px;height:40px;" onclick="Chrosome('local')"><strong>LocalPlot</strong>
                        </button>
                    </div>
                    <div class="col-md-5">
                        <label class="col-md-4" style="margin-top: 5px;">Input job id</label>
                        <div class="col-md-8" style="margin-left: -30px">
                            <input name="userid" id="userid" class="form-control"
                                   placeholder="please input JobID"/>
                        </div>
                        <br><br> <br><br> <br><br><br><br>
                        <button type="submit" style="margin-left:35%;margin-top:5px;width:100px;height:40px;" onclick="Chrosome('server')"><strong>ServerPlot</strong>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--添加分析-->
    <br>

    <div id="run" ></div>

        <div id="ScriptDiv">
    <%--<input class="button"  id="picc"  type="button" value="download">--%>

    <div id="draw">

     <%--<svg width="1344" height="1200" xmlns="http://www.w3.org/2000/svg">--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/chrosome/chr1.png" x="68" y="180" height="420" id="Chrom_bg"></image>--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/chrosome/chr15.png" x="572" y="391.91089606151877" height="208.08910393848126" id="Chrom_bg"></image>--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/chrosome/chr16.png" x="608" y="409.49797376833817" height="190.50202623166183" id="Chrom_bg"></image>--%>
        <%--<text text-anchor="middle" x="218.66666666666666" y="620" font-family="sans-serif" font-size="10px" id="text_chr">5</text>--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/unselect.png" x="69.66666666666667" y="640" width="10" height="10" id="chr_buton"></image>--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/unselect.png" x="105.66666666666667" y="640" width="10" height="10" id="chr_buton"></image>--%>
        <%--<text x="552" y="720" font-family="sans-serif" font-size="30px" fill="black" id="chrosome_name">chrosome : 0</text>--%>
        <%--<rect width="20" height="10" x="-80" y="75" fill="rgb(255, 0, 0)" transform="translate(1142.3999999999999,90)" id="phenotype"></rect>--%>
        <%--<rect width="20" height="10" x="-80" y="105" fill="rgb(255, 115, 0)" transform="translate(1142.3999999999999,90)" id="phenotype"></rect>--%>
        <%--<image xlink:href="https://bigd.big.ac.cn/cgwas/file/css/off.png" text-anchor="middle" x="-40" y="150" width="50" height="40" transform="translate(1142.3999999999999,90)" id="button_gwas"></image>--%>
    <%--</svg>--%>

    </div>


    <canvas id="canvas"  style="display: none"></canvas>
    <%--<div class="footer" style="color: white;background-color:#3fc2cf;margin-top: 50px">--%>
    <%--<strong style="margin-left: 20px">Copyright © 2019 FanLiu Lab</strong>--%>
    <%--</div>--%>

</div>


        <script src="${host}/supply/js/cgwasD3/d3.js"></script>
        <script src="${host}/supply/js/supplyVariance.js"></script>
        <script src="${host}/supply/js/supplyFunction.js"></script>
        <script src="${host}/supply/js/supplyCGWAS1210.js"></script>





</body>
<script  type="text/javascript">
    function add() {
        if(toolstatus_chrom == 0){
            var sHTML=' <input class="button" id="picc" onclick="svgdown()" style="margin-left: 80%" type="button" value="download">';
            $("#ScriptDiv").prepend(sHTML);
        };
    }


    function svgdown() {

        function funcDownload (content, filename) {
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
        // var ss = document.querySelector('').outerHTML;
        funcDownload(svg, 'chrom.html');


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
        document.getElementById("userid").style.backgroundColor= "#FFF";
        document.getElementById("topCgwas").style.backgroundColor= "#ccc";
        document.getElementById("topGwas").style.backgroundColor= "#ccc";
        document.getElementById("Phenotypes").style.backgroundColor= "#ccc";

        // $("#topCgwas").attr("disabled", true);
        // $("#topGwas").attr("disabled", true);
        // $("#Phenotypes").attr("disabled", true);
    });
    $("#topCgwas").click(function () {
        document.getElementById("userid").style.backgroundColor= "#ccc";
        document.getElementById("topCgwas").style.backgroundColor= "#FFF";
        document.getElementById("topGwas").style.backgroundColor= "#FFF";
        document.getElementById("Phenotypes").style.backgroundColor= "#FFF";
    });
    $("#topGwas").click(function () {
        document.getElementById("userid").style.backgroundColor= "#ccc";
        document.getElementById("topCgwas").style.backgroundColor= "#FFF";
        document.getElementById("topGwas").style.backgroundColor= "#FFF";
        document.getElementById("Phenotypes").style.backgroundColor= "#FFF";
    });
    $("#Phenotypes").click(function () {
        document.getElementById("userid").style.backgroundColor= "#ccc";
        document.getElementById("topCgwas").style.backgroundColor= "#FFF";
        document.getElementById("topGwas").style.backgroundColor= "#FFF";
        document.getElementById("Phenotypes").style.backgroundColor= "#FFF";
    });
    // $("#reset").click(function () {
    //     $("#topGwas").attr("disabled", false);
    //     $("#topCgwas").attr("disabled", false);
    //     $("#Phenotypes").attr("disabled", false);
    //     $("#userid").attr("disabled", false);
    //     $("#userid").val("");
    //     $("#Phenotypes").val("");
    //     $("#topGwas").val("");
    //     $("#topCgwas").val("");
    // });

</script>




</html>
