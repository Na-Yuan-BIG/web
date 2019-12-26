<%--
  Created by IntelliJ IDEA.
  User: yuanna
  Date: 2019/10/22
  Time: 14:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>hello</title>
</head>
<body>
test information
This is
</body>

<div class="container" style="background-color: #ffffff;">
    <%@include file="newheader.jsp" %>
</div>
<script type="text/javascript">
    $(function process() {
        blockchr = "10";
        blockstart = "54165611";
        blockend = "54239646";
        blockarea = "AFR";
        $.ajax({
            type: "get",
            url: "https://bigd.big.ac.cn/cgwas/ldplot",
            data: {
                blockchr: blockchr,
                blockstart: blockstart,
                blockend: blockend,
                area: blockarea,
            },
            async: false,
            success: function (msg) {
                $.each(msg, function (index, item) {
                    console.log(msg)
                    console.log("item+"+item);
                })
//insertFigure(msg);
            }, error: function (e) {
                alert("请求失败: " + e.toString());
            }
        });
    })
</script>



</html>
