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


    <link href="${host}/css/select2.min.css" rel="stylesheet"/>
    <link href="${host}/css/select2-bootstrap.min.css" rel="stylesheet"/>
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


        <div class="panel-body" style="margin-bottom: 20px">
            <form action="${host}/run" method="post" class="form-horizontal" enctype="multipart/form-data">
                <div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:0px;background-color: #eee;border: #ccc;height: 170px">

                    <div class="form-inline">
                        <label class="col-md-2"
                               style="font-size:18px;margin-left: 10px;margin-top:-10px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Upload
                            file
                        </label>
                    </div>

                <%--<div style="margin-top:20px;margin-left: 20px;margin-right: 20px;padding-bottom:0px;background-color: #eee;border: #ccc">--%>
                    <%--<br>--%>
                    <%--<div class="form-inline">--%>
                        <%--<label class="col-md-2"--%>
                               <%--style="--%>
                  <%--font-size:18px;margin-left: 10px;margin-top:-30px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Upload--%>
                            <%--file--%>
                        <%--</label>--%>
                    <%--</div>--%>
                    <br>
                    <p class="text-justify" style="margin-left:20px;font-size: 14px;color:#369">
                        <strong> The current version doesn't accept upload files larger than 1G in size.</strong>
                    </p>
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

                    <div class="form-group">
                        <label class="col-md-offset-1 col-md-3" style="margin-top: 5px;width:20%">Input your
                            email</label>
                        <div class="col-md-4" style="margin-left: -50px;">
                            <input name="email" id="email" class="form-control"
                                   placeholder="please input email"/>
                        </div>
                    </div>

                    <br>
                </div>


                <div style="margin-top:50px;margin-left: 20px;margin-right: 20px;margin-bottom:50px;background-color: #eee;border: #ccc;height: 274px">

                    <div class="form-inline">
                        <label class="col-md-2"
                               style="font-size:18px;margin-left: 10px;margin-top:-10px;background-color: #ccc;color:#369;height: 26px;border: #B0BED9">Set
                            parameters
                        </label>
                    </div>


                    <br>
                    <p class="text-justify" style="margin-left: 20px;font-size: 14px;color:#369"><strong>Default
                        parameters are preset.</strong></p>

                    <div class="row" style="margin-top: 30px;">

                        <label class="col-md-offset-1 col-md-3" style="width: 28%;">Number of simulations:
                           </label>
                        <div class="col-md-2">
                            <input id="simuNum" name="simuNum" placeholder="1000" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">[1000,2000]</label>
                        </div>
                        <label class="col-md-3" style="width: 28%;">Genome-wide significant threshold:
                            </label>
                        <div class="col-md-2">
                            <input id="gt" name="gt" placeholder="5e-8" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">(0,0.05)</label>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 15px;" >
                        <label class="col-md-offset-1   col-md-3" style="width: 28%">Genome-wide suggestive threshold:
                            </label>
                        <div class="col-md-2">
                            <input id="st" name="st" placeholder="1e-6" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">(0,1)</label>
                        </div>

                        <label class="col-md-3" style="width: 28%">P-value filter for the output file: </label>
                        <div class="col-md-2">
                            <input id="ot" name="ot" placeholder="1e-3" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">(0,0.001)</label>
                        </div>

                    </div>
                    <div class="row" style="margin-top: 15px;padding-bottom: 5px">
                        <label class="col-md-offset-1  col-md-3" style="width: 28%">Max N SNPs in Manhattan plot:</label>
                        <div class="col-md-2">
                            <input id="maxn" name="maxn" placeholder="30000" class="form-control col-md-1"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">[1,30000]</label>
                        </div>

                        <label class="col-md-3" style="width: 28%">P-value filter for Manhattan plot:</label>
                        <div class="col-md-2">
                            <input id="ht" name="ht" class="form-control col-md-1" placeholder="5e-4"
                                   style="margin-top: -5px;width: 60%;margin-left:-30%;"><label class="col-md-1"
                                                                               style="color: #bbb">(0,0.05)</label>
                        </div>
                    </div>


                    <div class="row" style="margin-top: 15px;padding-bottom: 25px">
                        <label class="col-md-offset-1  col-md-3" style="width: 28%">Suggest subset of associated traits:</label>
                        <div class="col-md-2">
                            <select name="at" class="form-control" id="at" style="margin-left:-30%;">
                                <option value="0" selected>Bonferroni of N traits</option>
                                <option value="1">Min combined P</option>
                            </select>
                        </div>
                        <label class="col-md-3" style="width: 28%">Genomic control of inflation factors:
                        </label>
                        <div class="col-md-2">
                            <input type="checkbox" checked="checked" id="factor" name="factor" class="form-control"
                                   value="1" style="margin-top: -5px;width: 55%;margin-left:-30%;">
                        </div>
                    </div>


                    <input name="md5" id="md5" style="display: none">
                    <div style="padding-left: 35%;margin-top: 15px;">
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

<script type="text/javascript" src="${host}/js/md5.js"></script>


<script type="text/javascript">
    $(function () {
        timestamp = (new Date()).valueOf();
        console.log(timestamp);
        a = '"' + timestamp + '"';
        hash = hex_md5(a);
        console.log(hash);
        $('#md5').val(hash);
    });
</script>

<script type="text/javascript">

    function check(form) {

        if (form.file.value.length == 0) {
            alert("Please input file");
            form.file.focus();
            return false;
        } else {
            if (form.simuNum.value.length > 0 && (form.simuNum.value < 1000 || form.simuNum.value > 2000)) {
                alert("Please input \"Number of simulations\" in [1000,2000]");
                form.simuNum.focus();
                return false;
            }
            else {
                if (form.gt.value.length > 0 && (form.gt.value <= 0 || form.gt.value >= 0.05)) {
                    alert("Please input \"Genome-wide significant threshold\" in (0,0.05)");
                    form.gt.focus();
                    return false;
                } else {
                    if (form.st.value.length > 0 && (form.st.value <= 0 || form.st.value >= 1)) {
                        alert("Please input \"Genome-wide suggestive threshold\" in (0,1)");
                        form.st.focus();
                        return false;
                    } else {
                        if (form.ot.value.length > 0 && (form.ot.value <=0 || form.ot.value >= 0.001)) {
                            alert("Please input \"P-value filter for the output file\" in (0,0.001)");
                            form.ot.focus();
                            return false;
                        }
                        else {
                            if (form.maxn.value.length > 0 && (form.maxn.value < 1 || form.maxn.value > 30000)) {
                                alert("Please input \"Max N SNPs in Manhattan plot\" in [1,30000]");
                                form.maxn.focus();
                                return false;
                            }
                            else {
                                if (form.ht.value.length > 0 && (form.ht.value <= 0 || form.ht.value >= 0.05)) {
                                    alert("Please input \"Genomic control of inflation factors\" in (0,0.05)");
                                    form.maxn.focus();
                                    return false;
                                }else{
                                    $("#bg").show();
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</script>

</body>
</html>
