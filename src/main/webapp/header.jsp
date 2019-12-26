
<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<meta name="title" content="Filamentous Fungal Gene Expression Database" />
<meta name="keywords" content="Filamentous Fungi, Fungi, gene expression, microarray, database" />
<meta name="description" content="Filamentous Fungal Gene Expression Database is a xXXXX" />
<meta name="institution" content="BIG Data Center, BIG, CAS" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
<!DOCTYPE html>
<html>
<head>
    <link rel="icon" type="image/x-icon" href="favicon.ico"/>
    <%--<script src="https://bigd.big.ac.cn/js/headerfooter.js"></script>--%>

    <link href="${host}/sui/semantic.min.css" rel="stylesheet"/>
    <link href="${host}/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="${host}/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="${host}/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="${host}/css/fontawesome-all.min.css" rel="stylesheet"/>
    <%--<link href="${host}/css/select2.min.css" rel="stylesheet"/>--%>
    <%--<link href="${host}/css/select2-bootstrap.min.css" rel="stylesheet"/>--%>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
    <link href="https://cdn.datatables.net/buttons/1.5.1/css/buttons.dataTables.min.css" rel="stylesheet">
    <link href="${host}/css/main.css" rel="stylesheet"/>
    <link href="${host}/css/my.css" rel="stylesheet"/>
    <%--<link href=" https://cdn.bootcss.com/datatables-colvis/1.1.2/css/dataTables.colVis.css" rel="stylesheet">--%>





    <%--<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>--%>
    <%--<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>--%>
    <%--<!--jquery.dataTable.min.js 依赖于  jquery-3.2.1.min.js，所以需要先引用后者-->--%>

    <%--<script src="https://code.jquery.com/jquery-3.3.1.js"></script>--%>
    <%--<link rel="stylesheet" type="text/css" href="${host}/css/datatables.css">--%>
    <%--<script type="text/javascript" charset="utf8" src="${host}/js/datatables.js"></script>--%>


    <%--<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet"/>--%>
    <%--<link href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css" rel="stylesheet"/>--%>


    <script src="${host}/js/jquery-1.11.3.js"></script>
    <%--<script src="${host}/js/jquery.validate.js"></script>--%>
    <script src="${host}/sui/semantic.min.js"></script>
    <script src="${host}/js/bootstrap.min.js"></script>
    <script src="${host}/js/jquery.dataTables.min.js"></script>
    <script src="${host}/js/dataTables.bootstrap.min.js"></script>
    <%--<script src="https://bigd.big.ac.cn/js/headerfooter.js"></script>--%>
    <script src="https://bigd.big.ac.cn/cdn/js/headerfooter-full-center.js"></script>
    <%--<script src="${host}/js/headerfooter.js"></script>--%>
    <%--<script src="${host}/js/jquery.serialize-object.js"></script>--%>
    <%--<script src="${host}/js/echarts.min.js"></script>--%>
    <%--<script src="https://cdn.bootcss.com/datatables-colvis/1.1.2/js/dataTables.colVis.min.js"></script>--%>
    <%--<script src="https://cdn.bootcss.com/datatables-colvis/1.1.2/js/dataTables.colVis.min.js"></script>--%>
    <%--<script language="javascript" src="//www.biodalliance.org/release-0.13/dalliance-compiled.js"></script>--%>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.5/svg.min.js"></script>--%>
    <script src="${host}/js/dataTables.buttons.min.js"></script>
    <%--<script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"></script>--%>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>--%>

    <script src="${host}/js/jszip.min.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>--%>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>--%>
    <%--<script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>--%>
    <script src="${host}/js/buttons.html5.min.js"></script>
    <%--<script src=" https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>--%>


</head>

<body>
<a href="${host}/" ><img src="${host}/supply/css/logo.jpg" class="img-rounded" style="margin-left:1%" width="250" height="50"></a>
<%--<header style="background:url('${host}/img/web.png') no-repeat; background-color: #5db4b5;background-position: 100% 8%">--%>

    <%--&lt;%&ndash;<header style="background: url('${host}/img/pop3.jpg') no-repeat; background-color: #008B8B;>&ndash;%&gt;--%>
    <%--<div class="page-header" style="border-bottom: none">--%>
        <%--<h1 style=" color: #ffffff;font-size: 42px"><%=db_name%><br/>--%>
            <%--&lt;%&ndash;<small style="color:#fafafa;font-size:20px;"><%=db_desc%>&ndash;%&gt;--%>
            <%--&lt;%&ndash;</small>&ndash;%&gt;</h1>--%>
    <%--</div>--%>

    <nav class="navbar navbar-default" id="header-nav">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-target="#db" data-toggle="collapse"
                    aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>


        <div class="collapse navbar-collapse" id="db">
            <ul class="nav navbar-nav">
                <li><a href="${host}/"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="${host}/submit"><i class="fas fa-seedling"></i> Run CGWAS</a></li>
                <li><a href="${host}/cgwas"><i class="fas fa-search"></i> CGWAS plot</a></li>
                <li><a href="${host}/chrom"><i class="fas fa-eye"></i> Chromosome plot</a></li>
                <li><a href="${host}/documentation"><i class="fas fa-info-circle"></i> Documentation</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li style="color: #ffffff;font-size:14px"><a>Version 1.0 (Nov. 2019)</a></li>
            </ul>
        </div>
    </nav>
</header>

</body>
