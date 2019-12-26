<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <style type="text/css">
        /*#bg{ display: none; position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:300; -moz-opacity: 0.2; opacity:.2; filter: alpha(opacity=50);}*/
        .loading {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1002;
        }

        #bg {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 300;
            background-image: url(${host}/css/load.gif);
            background-repeat: no-repeat;
            background-position: center;
            background-color: #000;
            background-color: rgba(255, 255, 255, 0.6);
            filter: alpha(opacity=50);
        }

        #bar-warp {
            /*width: 200px;*/
            width: 16%;
            height: 30px;
            border: 1px solid green;
        }

        #bar {
            width: 0px;
            height: 30px;
            background: green;
        }

    </style>
</head>

<body data-spy="scroll" data-target="#myScrollspy">
<div class="container" style="background-color: #ffffff;">
    <%@include file="newheader.jsp" %>
    <div id="bg"></div>
    <div class="panel panel-default" style="margin-left: 15px;margin-right: 15px;background-color: #d3dff5">
        <div class="panel-heading">
            <text class="panel-title"><strong>Submit CGWAS task</strong></text>
            <%--<button class="btn btn-info" id="btnSave" name="btnSave" >Demo Run</button>--%>
        </div>


        <div class="panel-body">
            <form action="${host}/run" method="post" class="form-horizontal" enctype="multipart/form-data">
                <div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:0px;background-color: #eee;border: #ccc">
                    <br>
                    <div class="form-inline">
                        <label class="col-md-2"
                               style="
                  font-size:18px;margin-left: 10px;margin-top:-30px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Upload
                            file
                        </label>
                    </div>
                    <br>


                    <div class="form-group">


                        <label class="col-md-offset-1 col-md-3" style="margin-top: 5px;width:20%">Input your
                            data</label>
                        <div class="col-md-4" style="margin-left: -50px;">
                            <input type="file" name="file" id="file" class="form-control"
                                   placeholder="please input file" required/>
                            <%--onchange="upfile()"--%>
                        </div>
                        <label class="col-md-3" style="margin-top: 5px;margin-left: -20px;color: darkgrey">( Example:<a
                                href="${host}/file/data/input.zip" style="color: darkgrey">
                            input.zip </a> )</label>
                    </div>

                    <%--<div class="form-group">--%>
                        <%--<label class="col-md-offset-3 col-md-3" style="color:green"> Upload progress </label>--%>
                        <%--<div id="bar-warp" style="margin-left: 40%">--%>
                            <%--<div id="bar"></div>--%>

                        <%--</div>--%>
                        <%--<span id="precent" style="margin-left: 40%"></span>--%>
                        <%--<br/>--%>
                    <%--</div>--%>
                    <div class="form-group">
                        <label class="col-md-offset-1 col-md-3" style="margin-top: 5px;width:20%">Input your
                            email</label>
                        <div class="col-md-4" style="margin-left: -50px;">
                            <input name="email" id="email" class="form-control"
                                   placeholder="please input email"/>
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 0">
                        <p class="text-justify" style="margin-left: 40px;font-size: 14px;color:#369"><strong> Note:The
                            maximum support for uploading files is 1G, we are developing to support large
                            file.</strong></p>
                    </div>
                    <br>
                </div>


                <div style="margin-top:50px;margin-left: 20px;margin-right: 20px;margin-bottom:50px;background-color: #eee;border: #ccc;height: 284px">

                    <div class="form-inline">
                        <label class="col-md-2"
                               style="font-size:18px;margin-left: 10px;margin-top:-10px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Set
                            parameters
                        </label>
                    </div>


                    <br>
                    <p class="text-justify" style="margin-left: 20px;font-size: 14px;color:#369"><strong>*Note:Default parameters are preset.</strong></p>
                    <%--<div class="row" style="margin-top: 15px;">--%>
                    <%--<label class="col-md-offset-1 col-md-1" >traitName</label>--%>
                    <%--<label class="col-md-offset-1 col-md-2" style="width:17%;padding-right: 0px;border-left: 3px solid #ccc">traitName char</label>--%>
                    <%--<div class="col-md-6">--%>
                    <%--<input   id="traitName"  placeholder="trait name association file name" class="form-control"  style="margin-top: -5px;width: 98%" >--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="row" style="margin-top: 20px;">

                        <label class="col-md-offset-1 col-md-1">Simulation</label>
                        <label class="col-md-offset-1 col-md-2"
                               style="width:20%;padding-right: 0px;border-left: 3px solid #ccc">simulate time</label>
                        <div class="col-md-2">
                            <input id="simuNum" name="simuNum" placeholder="1000" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-21%;"><label class="col-md-1"
                                                                                                style="color: #bbb">[1000,2000]</label>
                        </div>
                        <label class="col-md-2" style="width:20%;padding-right: 0px;">estimate proportion</label>
                        <div class="col-md-2">
                            <input id="simuReg" name="simuReg" placeholder="0.8" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-31%;"><label class="col-md-1"
                                                                                                style="color: #bbb">(0,1)</label>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 15px;">
                        <label class="col-md-offset-1 col-md-1">Threshold</label>
                        <label class="col-md-offset-1 col-md-3"
                               style="padding-right: 0px;border-left: 3px solid #ccc;width: 20%">genome wide
                            significant</label>
                        <div class="col-md-2">
                            <input id="gt" name="gt" placeholder="NA" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-21%;"><label class="col-md-1"
                                                                                                style="color: #bbb">(0,0.05)</label>
                        </div>

                        <label class="col-md-2" style="width:20%;padding-right: 0px;">suggestive
                            significant</label>
                        <div class="col-md-2">
                            <input id="st" name="st" placeholder="NA" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-31%;"><label class="col-md-1"
                                                                                                style="color: #bbb">(0,0.05)</label>
                        </div>

                    </div>
                    <div class="row" style="margin-top: 15px;padding-bottom: 5px">
                        <label class="col-md-offset-3 col-md-3"
                               style="padding-right: 0px;border-left: 3px solid #ccc;width: 20%">output
                            threshold</label>
                        <div class="col-md-2">
                            <input id="ot" name="ot" placeholder="NA" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-21%;"><label class="col-md-1"
                                                                                                style="color: #bbb">(0,0.05)</label>
                        </div>

                        <label class="col-md-2" style="width:20%;padding-right: 0px;">graphic
                            display</label>
                        <div class="col-md-2">
                            <input id="ht" name="ht" class="form-control col-md-1" placeholder="0.0005"
                                   style="margin-top: -5px;width: 60%;margin-left:-31%;"><label class="col-md-1"
                                                                                                style="color: #bbb">(0,0.001)</label>
                        </div>


                        <%--<label class="col-md-2" style="width:20%;margin-left:-4%;padding-right: 0px;">fix single cgwas</label>--%>
                        <%--<div class="col-md-1">--%>
                        <%--<input  type="checkbox" id="fix"  name="fix" class="form-control" value="1"--%>
                        <%--style="margin-top: -5px;width: 55%;margin-left:-100%;">--%>
                        <%--</div>--%>

                        <%--<label class="col-md-2" style="width:20%;margin-left:-4%;padding-right: 0px;">inflation factors</label>--%>
                        <%--<div class="col-md-2">--%>
                        <%--<input   id="clv"  placeholder="" class="form-control"  style="margin-top: -5px;width: 75%" >--%>
                        <%--</div>--%>
                    </div>


                    <div class="row" style="margin-top: 15px;padding-bottom: 5px">
                        <label class="col-md-offset-1 col-md-1">Correction</label>
                        <label class="col-md-offset-1 col-md-1"
                               style="padding-right: 0px;border-left: 3px solid #ccc;width: 20%">GWAS correction</label>
                        <div class="col-md-1">
                            <input type="checkbox" id="fix" name="fix" class="form-control" value="1" style="margin-top: -5px;width: 55%;margin-left:-50%;" >
                        </div>
                        <%--<label class="col-md-2" style="width:20%;margin-left:-4%;padding-right: 0px;">inflation num</label>--%>
                    </div>
                    <div class="row" style="margin-top: 15px;padding-bottom: 20px">

                        <label class="col-md-offset-3 col-md-1"
                               style="padding-right: 0px;border-left: 3px solid #ccc;width: 20%">inflation
                            factor</label>
                        <div class="col-md-1">
                            <input type="checkbox" onclick="qaq(this);" id="factor" name="factor" class="form-control"
                                   value="1"  style="margin-top: -5px;width: 55%;margin-left:-50%;">
                        </div>
                        <%--<label class="col-md-2" style="width:20%;margin-left:-4%;padding-right: 0px;">inflation num</label>--%>
                        <div class="col-md-5">
                            <input id="num" name="num" placeholder="vector correction inflation of phenotype"
                                   class="form-control"
                                   style="margin-top: -5px;width: 90%;display: none">
                        </div>
                    </div>

                    <input name="md5" id="md5" style="display: none" >
                    <div style="padding-left: 35%;margin-top: 0px">
                        <button type="submit" style="width:100px;height:40px;" onclick="return check(this.form)">
                            <strong>submit</strong>
                        </button>
                        <button id="reset" type="reset" style="margin-left:15% ;width:80px;height:40px;">
                            <strong>reset</strong></button>
                    </div>


                </div>


            </form>
        </div>
    </div>

    <br>

    <div class="loading"><img src="${host}/css/load.gif"></div>
    <%--<div class="loadingWrap"><img src="${host}/css/load.gif"></div>--%>

    <br>
    <br>
    <div class="footer" style="color: #6ca6e0;">
        <strong style="margin-left: 40%">Copyright © 2019 FanLiu Lab</strong>
    </div>

</div>

<script type="text/javascript">
    // function upfile(){
    //     var pic=document.getElementsByTagName('input')[0].files[0];
    //     var fd=new FormData();
    //     var xhr=new XMLHttpRequest();
    //     xhr.open('post','run',true);
    //
    //     xhr.onreadystatechange=function (){
    //         //readystate为4表示请求已完成并就绪
    //         if(this.readyState==4){
    //             document.getElementById('precent').innerHTML="100%";
    //             // document.getElementById('precent').innerHTML=this.responseText;
    //             //在进度条下方插入百分比
    //         }
    //     }
    //
    //     xhr.upload.onprogress=function (ev){
    //         //如果ev.lengthComputable为true就可以开始计算上传进度
    //         //上传进度 = 100* ev.loaded/ev.total
    //         if(ev.lengthComputable){
    //             var precent=100 * ev.loaded/ev.total;
    //             console.log(precent);
    //             //更改进度条，及百分比
    //             document.getElementById('bar').style.width=precent+'%';
    //             document.getElementById('precent').innerHTML=Math.floor(precent)+'%';
    //         }
    //     }
    //     fd.append('pic',pic);
    //
    //     xhr.send(fd);
    //
    // }
</script>

<script type="text/javascript" src="${host}/js/md5.js"></script>

<script type="text/javascript" >
    $(function () {
        timestamp = (new Date()).valueOf();
        console.log(timestamp);
        a='"'+timestamp+'"';
        hash = hex_md5(a);
        console.log(hash);
        $('#md5').val(hash);
    });
</script>

<script type="text/javascript">

    function qaq(chk) {
        var t1 = document.getElementById('num');
        if (chk.checked) {
            t1.style.display = 'block';
        } else {
            t1.style.display = 'none';
        }
    }


    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    // $(function () {
    //     $("#btnSave").click(function () {
    //         $("#bg").show();
    //         $.ajax({
    //             async: false,
    //             url: "http://localhost:9800/demoResults",
    //             type: "post",
    //             data: {},
    //             success: function (mes) {
    //                 $("#bg").show();
    //                 window.setTimeout("window.location='http://localhost:9800/demoResults'", 2000);
    //                 // window.location.href="http://localhost:9800/demoResults";
    //             },
    //             // beforSend:function(){
    //             //     $("<div class=\"loadingWrap\"></div>").appendTo("body");
    //             //     wait(7000);
    //             // },
    //             // complete: function(){
    //             //     $(".loadingWrap").remove();
    //             // }
    //         })
    //     })
    // })

    function check(form) {

        if (form.file.value.length == 0) {
            alert("Please input file");
            form.file.focus();
            return false;
        } else {
            if (form.simuNum.value.length > 0 && (form.simuNum.value < 1000 || form.simuNum.value > 2000)) {
                alert("Please input simulation time in [1000,2000]");
                form.simuNum.focus();
                return false;
            }
            else {
                if (form.simuReg.value.length > 0 && (form.simuReg.value < 0 || form.simuReg.value > 1)) {
                    alert("Please input estimation proportion in (0,1)");
                    form.simuReg.focus();
                    return false;
                } else {
                    if (form.gt.value.length > 0 && (form.gt.value < 0 || form.gt.value > 0.05)) {
                        alert("Please input genome wide significant in (0,0.05)");
                        form.gt.focus();
                        return false;
                    } else {
                        if (form.st.value.length > 0 && (form.st.value < 0 || form.st.value > 0.05)) {
                            alert("Please input suggestive significant in (0,0.05)");
                            form.st.focus();
                            return false;
                        } else {
                            if (form.ot.value.length > 0 && (form.ot.value < 0 || form.ot.value > 0.05)) {
                                alert("Please input \"output threshold\" in (0,0.05)");
                                form.ot.focus();
                                return false;
                            }
                            else {
                                if (form.ht.value.length > 0 && (form.ht.value < 0 || form.ht.value > 0.001)) {
                                    alert("Please input graphic display in (0,0.001)");
                                    form.st.focus();
                                    return false;
                                }
                                else {
                                    $("#bg").show();
                                    return true;
                                    // $.ajax({
                                    //     async: false,
                                    //     url: "https://bigd.big.ac.cn/cgwas/run",
                                    //     type: "post",
                                    //     data: {},
                                    //     success: function (mes) {
                                    //         $("#bg").show();
                                    //         // window.setTimeout("window.location='http://localhost:9800/demoResults'", 2000);
                                    //         // window.location.href="http://localhost:9800/demoResults";
                                    //     },
                                    //     beforSend:function(){
                                    //         $("<div class=\"loadingWrap\"></div>").appendTo("body");
                                    //         // wait(7000);
                                    //     },
                                    //     // complete: function(){
                                    //     //     $(".loadingWrap").remove();
                                    //     // }
                                    // })
                                }
                            }
                        }
                    }
                }
            }
        }





        // var pic = document.getElementsByTagName('input')[0].files[0];
        // var fd = new FormData();
        // var xhr = new XMLHttpRequest();
        // xhr.open('post', 'https://bigd.big.ac.cn/cgwas/run', true);
        //
        // xhr.onreadystatechange = function () {
        //     //readystate为4表示请求已完成并就绪
        //     if (this.readyState == 4) {
        //         document.getElementById('precent').innerHTML = "100%";
        //         // document.getElementById('precent').innerHTML=this.responseText;
        //         //在进度条下方插入百分比
        //     }
        // }
        //
        // xhr.upload.onprogress = function (ev) {
        //     //如果ev.lengthComputable为true就可以开始计算上传进度
        //     //上传进度 = 100* ev.loaded/ev.total
        //     if (ev.lengthComputable) {
        //         var precent = 100 * ev.loaded / ev.total;
        //         console.log(precent);
        //         //更改进度条，及百分比
        //         document.getElementById('bar').style.width = precent + '%';
        //         document.getElementById('precent').innerHTML = Math.floor(precent) + '%';
        //     }
        // }
        // fd.append('pic', pic);
        //
        // xhr.send(fd);

    }

    // $('#reset').click(function(){
    //         $("#file").attr("disabled", false);
    //         $("#file").val("");
    //         $("#email").val("");
    //         $("#simuNum").val("");
    //
    // });

</script>

</body>
</html>
