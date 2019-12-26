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

<body>

<div class="container" style="background-color: #ffffff;">
    <%@include file="newheader.jsp" %>
    <div class="row clearfix">

        <div class="jumbotron" style="margin-left: 30px;margin-right: 30px;padding: 15px">
            <img src="${host}/css/sketch.jpg" style="float:right; width:170px;height: 140px;margin-left: 2%" >
<p class="text-justify" style="font-size: 18px;margin: 20px;line-height: 30px">
<%--<img src="${host}/css/sketch.jpg" align="right" width="170px"--%>
                     <%--height="140px" style="margin: -25px -25px -15px 10px">--%>
                Combined Genome-Wide Association Study (CGWAS) is a webserver which combines summary statistics from multiple single-trait GWASs to detect SNPs simultaneously associated with multiple traits, which might be undetectable in single-trait GWASs.
                <a href="${host}/documentation"> More about CGWAS</a>.
            </p>
        </div>

    </div>
        <div class="row">
    <div class="col-md-12">
        <div class="panel-default panel">
            <div class="panel-body">
                <h4 style="color: #1995dc;"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                    Figures
                </h4>
                <div class="col-md-4">
                    <div class="callout callout-info">
                        <h2>Combine manhattan plot</h2>
                        <p style="font-size: 15px;text-align:left">The figure shows GWAS and CGWAS result.<a class="btn"
                                                                                                     href="${host}/documentation"
                                                                                                     style="font-size:15px;font-weight:bold">View
                            details »</a></p>
                    </div>
                    <div class="col-md-12">
                        <img src="${host}/supply/css/cmht.jpg" width="350"
                             height="300" align="left" style="margin-left: -15px"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="callout callout-info">
                        <h2>Bar plot</h2>
                        <p style="font-size: 15px;text-align:left">The best phenotypes combination for each SNP.<a
                                class="btn" href="${host}/documentation" style="font-size:15px;font-weight:bold">View
                            details »</a>
                        </p>
                    </div>
                    <img src="${host}/supply/css/bar.jpg" style="margin-left: 25px" width="350" height="300"/>
                </div>
                <div class="col-md-4">
                    <div class="callout callout-info">
                        <h2>Chromosome plot</h2>
                        <p style="font-size: 15px;text-align:left">The distribution of all significant loci.<br><a class="btn"
                                                                                                         href="${host}/documentation"
                                                                                                         style="font-size:15px;font-weight:bold">View
                            details »</a>
                        </p>
                    </div>
                    <img src="${host}/supply/css/Chrosome.jpg" style="margin-left: 15px"
                         width="350" height="300"/>
                </div>
            </div>
        </div>
    </div>
        </div>

    <div class="row">
        <div class="col-md-6" style="margin-left: 15px;margin-right: -25px;padding-right: 35px">
            <div class="panel-danger panel">
                <div class="panel-heading">
                    <%--<h4>Upload File(default parameters or <a href="${host}/submit">customized</a>)</h4>--%>
                        <h4>Run CGWAS</h4>
                </div>
                <div class="panel-body" style="padding-bottom: 0px">
                    <div style="text-align: center;padding-top: 15px;padding-bottom: 25px">
                        <a href="${host}/submit"><i class="fa fa-upload" aria-hidden="true" style="font-size: 60px;color: #0e8c8c"></i></a><br>
                        <strong>Begin your cgwas job from here.</strong>
                    </div>
                    <%--<div class="col-md-12">--%>
                        <%--<form action="${host}/run" method="post" class="form-horizontal" enctype="multipart/form-data">--%>
                            <%--<div class="form-group">--%>
                                <%--<label class="control-label col-md-4">File (gz format):</label>--%>
                                <%--<div class="col-md-8">--%>
                                    <%--<input type="file" name="file" class="form-control" required/>--%>
                                <%--</div>--%>
                            <%--</div>--%>


                            <%--<div class="form-group">--%>
                                <%--<label class="control-label col-md-4">Input your email:</label>--%>
                                <%--<div class="col-md-8">--%>
                                    <%--<input name="email" class="form-control" required/>--%>
                                <%--</div>--%>
                            <%--</div>--%>


                            <%--<div class="form-group" style="margin-bottom: 3px">--%>
                                <%--<div class="col-md-5">--%>
                                    <%--(<a style="color: #337ab7;padding-right: 0px"--%>
                                        <%--href="${host}/file/example.input.tar.gz">Example.input.tar.gz<i--%>
                                        <%--class="fa fa-download"></i></a>)--%>
                                <%--</div>--%>
                                <%--<div class="col-md-2 col-md-offset-5">--%>
                                    <%--<button type="submit" style="margin-top: 10px;margin-bottom: 0px"--%>
                                            <%--class="btn btn-danger btn-block">Submit--%>
                                    <%--</button>--%>
                                <%--</div>--%>
                            <%--</div>--%>


                        <%--</form>--%>
                    <%--</div>--%>
                </div>
            </div>
        </div>
        <div class="col-md-6" style="margin-left:-15px;margin-right: 5px;padding-right: 5px;padding-left: 45px;">
            <div class="panel-success panel">
                <div class="panel-heading">
                    <h4>Download Results</h4>
                </div>
                <div class="panel-body">
                    <div class="col-md-12">
                        <%--<form action="${host}/results" method="post" class="form-horizontal">--%>
                        <div class="form-group">
                            <label class="control-label col-md-4">Your Job ID:</label>
                            <div class="col-md-8">
                                <input name="inputid" id="inputid" placeholder="Please input the Job ID "
                                       class="form-control" required/>

                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                Note:Results will be preserved for one week.(<a style="color: #337ab7;padding-right: 0px" href="${host}/file/data/example.output.tar.gz">example.output.tar.gz</a>)
                            </div>
                            <%--<p   class="col-md-7" style="margin-top:5px;text-align: left;font-size: 13px;">--%>
                            <%--(Note:Results will be preserved for one week)--%>
                            <%--</p>--%>
                            <div class="col-md-2 col-md-offset-10">
                                <button id="btn1" style="margin-top: 25px;margin-bottom: 0px;width: 140%"
                                        class="btn btn-success btn-block">Download
                                </button>

                                <%--<a style="font-size: 18px" href="${host}/supply/cgwas_V1.4.zip"--%>
                                <%--download="Result.tar.gz">download</a>--%>
                            </div>
                        </div>

                        <%--</form>--%>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>


    <div class="row clearfix">
        <div class="col-md-6" style="margin-left: 15px;margin-right: -25px;padding-right: 35px">
            <%--<div class="panel-default panel">--%>
                <%--<div class="panel-body">--%>
                    <%--<h4 class="text-primary"><span class="glyphicon glyphicon-flag" aria-hidden="true"></span>--%>
                        <%--Citation--%>
                    <%--</h4>--%>
                    <%--<ul>--%>
                        <%--&lt;%&ndash;<li>CGWAS: a algorithm of human gwas. <em>Nucleic Acids Res</em> 2019. <a&ndash;%&gt;--%>
                        <%--&lt;%&ndash;href="https://www.ncbi.nlm.nih.gov/pubmed/30329098"&ndash;%&gt;--%>
                        <%--&lt;%&ndash;target="_blank">[PMID=30329098]</a>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                        <%--<li>Kost J T,Mcdermott M P.Combining dependent P-values[J].Statistics & Probability Letters,2002,60(2):183-190.--%>
                        <%--</li>--%>
                            <%--<li>CGWAS methods article will be published on bioaRchive at the end of December 2019.--%>
                            <%--</li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
            <%--</div>--%>
            <div class="panel-default panel">
                <div class="panel-body">
                    <h4 class="text-primary"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                        Contact
                    </h4>
                    <ul>
                        <%--<li>CGWAS: a algorithm of human gwas. <em>Nucleic Acids Res</em> 2019. <a--%>
                        <%--href="https://www.ncbi.nlm.nih.gov/pubmed/30329098"--%>
                        <%--target="_blank">[PMID=30329098]</a>--%>
                        <%--</li>--%>
                        <li>If you have any question or suggestion, welcome to contact us.</li><br>
                        <strong class="text-success" style="font-size: 16px"> Email: liufan@big.ac.cn</strong>

                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4" style="margin-left:1%;margin-right:5px;padding-right: 5px">
            <div class="panel-default panel">
                <div class="panel-body" >
                    <h4 class="text-primary"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
                        Global
                        Visitors</h4>
                    <script type="text/javascript"
                            src="//rf.revolvermaps.com/0/0/7.js?i=5wfcx6pv2y0&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;sx=0"
                            async="async" ></script>
                </div>
            </div>
        </div>
    </div>
    <div class="footer" style="color: #6ca6e0;">
        <strong style="margin-left: 40%">Copyright © 2019 FanLiu Lab</strong>
    </div>
</div>
<script type="text/javascript">
    var $eleBtn1 = $("#btn1");
    $eleBtn1.click(function () {
        var id = $("#inputid").val();
    if(id.length == 0){
        alert("Please input Job ID");
        $("#inputid").focus();
    }else{
        console.log(id);
        <%--var $url="${host}"+"/file/"+$id+".output.tar.gz";--%>
        <%--window.open('${host}/supply/'+$id);--%>
        // window.open('https://bigd.big.ac.cn/cgwas/file/' + id + '.cgwas.tar.gz');
        window.open('https://bigd.big.ac.cn/cgwas/job/' + id );
    }
    });
    // $eleBtn2.click(function(){
    //     var $eleForm = $("<form method='get'></form>");
    //
    //     $eleForm.attr("action","https://codeload.github.com/douban/douban-client/legacy.zip/master");
    //
    //     $(document.body).append($eleForm);
    //
    //     //提交表单，实现下载
    //     $eleForm.submit();
    // });
</script>

</body>
</html>
