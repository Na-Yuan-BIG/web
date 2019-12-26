<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
</head>

<body data-spy="scroll" data-target="#myScrollspy">
<div class="container" style="background-color: #ffffff;">
    <%@include file="newheader.jsp" %>
    <div class="panel panel-default" style="margin-left: 15px;margin-right: 15px;background-color: #d3dff5">
        <div class="panel-heading">
            <h3 class="panel-title">Results For Job Id: <strong>${md5}</strong></h3>
        </div>

        <div class="panel-body">

            <input name="flag" value="1" style="display: none">
            <div style="padding: 10px;margin:5px 25px 5px 25px;background-color: #eee">
                <h4><strong style="color:#369">Job is ${stat}.</strong></h4>
            </div>

            <hr>
            <c:choose>
                <c:when test="${stat=='done'}">
                    <div class="alert alert-success text-center">
                        <a style="font-size: 18px" href="${host}/file/${md5}.cgwas.tar.gz"
                           download="${md5}.cgwas.tar.gz">Download your cgwas output files.</a>
                    </div>
                </c:when>
                <c:otherwise>
                    <p style="font-size: 18px;margin-left: 20px">Please wait for the job to finish.</p>
                </c:otherwise>
            </c:choose>


        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="footer" style="color: #6ca6e0;">
        <strong style="margin-left: 40%">Copyright © 2019 FanLiu Lab</strong>
    </div>

</div>


<script type="text/javascript">

    function selectano(chr,bp){
        var result='';
        $.ajax({
            url:"${host}/variant",
            type: "post",
            dataType: "json",
            async: false,
            cache:false,
            data: {
                "chr":chr,
                "bp":bp,
            },
            success: function (msg) {
                // console.log("数据对象"+msg);
                for (var i=0;i<msg.length;i++) {
                    // console.log("chrom:" + msg[i].chrom+"start"+msg[i].varStart);
                    result += msg[i].chrom + "\t" + msg[i].varStart;
                    console.log(result);
                    //此处可直接写插入的html注释表格信息
                }
            },error: function (e) {
                alert("请求失败: " + e.toString());
            }
        });
        return result;
    };

</script>

</body>
</html>
