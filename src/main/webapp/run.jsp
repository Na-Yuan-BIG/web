<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <style type="text/css">
    </style>
</head>

<body data-spy="scroll" data-target="#myScrollspy">
<div class="container" style="background-color: #ffffff;">
    <%@include file="newheader.jsp" %>
    <div class="panel panel-default" style="margin-left: 15px;margin-right: 15px;background-color: #d3dff5">
        <div class="panel-heading">
            <h3 class="panel-title"><strong>Task submitted</strong></h3>
        </div>
        <div class="panel-body">
            <div class="panel panel-default" style="background-color: #dff0d8">
                <div class="panel-body">
                    <p class="text-justify" style="font-size: 18px;">
                        Your submission is successfull.<br><br>
                        <%--<span><%=(int)(Math.floor(Math.random()*1000000))%> </span>--%>
                        <%--Job ID:<strong style="color: #9f3a38">${md5}</strong>,please save it and retrieve your results after completion.--%>
                        Job ID:<strong style="color: #9f3a38">${md5}</strong>,please save it and retrieve your results
                        after completion.
                    </p>
                </div>
            </div>

            <input name="flag" value="1" style="display: none">
            <p class="text-justify" style="font-size: 18px;margin-top: 20px">
                CGWAS is running, you can query the running status from: <a href="${host}/job/${md5}"
                                                                                          style="color: #9f3a38">https://bigd.big.ac.cn/cgwas/job/${md5}</a>.
                <br>

             <c:choose>
                <c:when test="${email!='864214960@qq.com'}">
                    <c:if test="${not empty email}">
                    <p style="color: #9f3a38;font-size: 18px">If the Job is finished, you will receive an email from
                cgwas@big.ac.cn, please check.</p>
                    </c:if>
                </c:when>
            <c:otherwise>
            </c:otherwise>
            </c:choose>

            </p>

        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="footer" style="color: #6ca6e0">
        <strong style="margin-left: 40%">Copyright © 2019 FanLiu Lab</strong>
    </div>

</div>
<script type="text/javascript">

</script>
</body>
</html>
