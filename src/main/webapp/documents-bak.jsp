<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <link href="${host}/css/doc.css" rel="stylesheet"/>
    <style type="text/css">
        li{
            font-size: 16px;
        }
    </style>
</head>
<body data-spy="scroll" data-target="#myScrollspy">
<div class="container" style="background-color: #ffffff">
    <jsp:include page="newheader.jsp"/>
    <div class="row">
        <div class="col-md-3 col-sm-12 hidden-sm hidden-xs" style="padding-right: 0px;width: 23%">

            <h4 class="text-primary" style="margin-left: 15px"><i class="fa fa-info-circle"></i>CGWAS Documentation</h4>
            <div class="bs-docs-sidebar" style="margin-left: 15px" role="complementary">
                <ul class="nav  bs-docs-sidenav">
                    <li><a href="#about"><strong>Ⅰ.&nbsp;What is CGWAS</strong></a></li>
                    <li><a href="#manual"><strong>Ⅱ.&nbsp;Input Data format</strong></a></li>
                    <li><a href="#data"><strong>Ⅲ.&nbsp;Example Data</strong></a></li>
                    <li><a href="#step"><strong>Ⅳ.&nbsp;Run Steps</strong></a></li>
                    <li><a href="#output"><strong>Ⅴ.&nbsp;Output</strong></a></li>
                    <li><a href="#contact"><strong>Ⅵ.&nbsp;Contact</strong></a></li>
                    <%--<li><a href="#chr"><strong>Chrods plot</strong></a></li>--%>
                </ul>
            </div>
        </div>
        <div class="col-md-9" id="lists" >
            <div class="col-md-12">
                <h1 id="about" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅰ.&nbsp;What is CGWAS</h1>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    CGWAS is a webserver which combines a set of summary statistic results produced by GWAS to integrate association analyses and detect SNPs associated with multiple traits. This method shows greatly increased power in detecting SNPs that have effect (may be weak in single trait GWAS) on multiple traits while type I error is well controlled through large scale simulation.
                </p>
<br>
                <br>
                <h1 id="manual" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅱ.&nbsp;Input Data format</h1>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                In order to run CGWAS, user need to upload a compressed file which contains two types of files: SNP information file and GWAS summary statistic file
               (<a href="${host}/file/data/input.zip"><strong class="text-success">input.zip</strong></a>).
                <ol>
                <%--<li>CGWAS expect two types of files: SNP information file and GWAS summary statistic file.<br><br></li>--%>
                <li>The SNP information file is a space or tab delimited file whose name must be lowercase “snp”, and with three columns below:<br>
                    <ul>
                        <li>CHR: the Chromosome of each SNP, range from 1 to 24 (23 for X, 24 for Y)<br></li>
                        <li>BP: Base-pair position of each SNP.<br></li>
                        <li>SNP: rsID of each SNP.<br></li>
                    </ul>
                The SNP information file should have a header row (CHR,BP,SNP).<br><br>
            </li>

                <li>The GWAS summary statistic files are space or tab delimited file with two columns:<br></li>
                <ul>
                    <li>BETA: The BETA of each GWAS result file.<br></li>
                    <li>P: The P-value of each GWAS result file.<br></li>
                </ul><br>
            </ol>
               <p class="text-justify" style="margin-right: 15px;font-size: 16px;"> The name of each file should be the corresponding phenotype and should have a header row (BETA,P).    All files must have the same rows. After all the files are prepared and put in one folder, user need to compress this folder into tar.gz or zip format.<br><br>
                </p>




                <%--<p class="text-justify" style="margin-right: 15px;font-size: 16px;">--%>
                    <%--a)&nbsp;CGWAS expect two types of files: SNP information file and GWAS summary statistic file.<br><br>--%>
                    <%--b)&nbsp;The SNP information file is a space or tab delimited file with first three columns are mandatory:<br>--%>
                    <%--&nbsp; &nbsp;Chromosome, Base-pair position, rsID or snp identifier<br>--%>
                    <%--&nbsp; &nbsp;i.&nbsp;The SNP information file should have a header row.<br>--%>
                    <%--&nbsp;&nbsp;ii.&nbsp;Chromosome should be coded according to PLINK format, for example autosomes are coded 1 to 22, X for 23, Y for 24.<br>--%>
                    <%--&nbsp;iii.&nbsp;Base-pair position are expected to correspond to positive integers within the range of typical human chromosome size.<br><br>--%>
                    <%--c)&nbsp;The GWAS summary statistic file is a space or tab delimited file with first two  columns are mandatory:<br>--%>
                    <%--&nbsp; &nbsp;i.&nbsp;The GWAS summary statistic file should have a header row.<br>--%>
                    <%--&nbsp; &nbsp;ii.&nbsp;Each phenotype should give a summary statistic file with each line indicate a SNP for this phenotype. The SNPs in each file should have same number and be in same order as SNP information file.<br>--%>
                    <%--&nbsp;&nbsp;iii.&nbsp;The effect column represent coefficients for quantitative traits and odds ratio for case/control traits.<br>--%>
                    <%--&nbsp;&nbsp;iv.&nbsp;P is the p-value for the test.<br><br>--%>
                    <%--d)&nbsp;All these file should be compressed to <strong class="text-success">tar.gz or zip </strong> format.<br><br>--%>
                <%--</p>--%>
<br><br>
                <h1 id="data" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅲ.&nbsp;Example Data</h1>

                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    Two sets of example data are offered for user to get used to this web. The first data set includes 5 traits as well as 10000 SNPs, user can download it at “Run CGWAS” page. It shows the standard format of input data, and can finish analyzing within 3 minutes.
                </p>
                <br>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                   The second data set is an example of standard output data(Mht.txt, Nbar.txt, 1_pheno.txt, 2_TopSNP_gwas.txt, 3_TopSNP_cgwas.txt), which can be downloaded in “CGWAS plot” and “Chromosome plot” pages. User can simply get the result of this data by clicking “Demo Run” at the head of each page.
                </p>
                <br><br>
                <h1 id="step" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅳ.&nbsp;Run Steps</h1>

                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    <ol>
                <li>Upload input file.<br><br></li>
                <li>User can check the status of the task through the provided hyperlink. If an email is provided, the website will also send an email notification as soon as the task is completed. <br><br></li>
                <li>Set parameters:<br></li>
                    <strong> Note: These parameters will affect computational efficiency and  results. We recommend user using default parameters.</strong><br>
                    <ul>
                   <li><strong>Simulate time: </strong>The inflation of CGWAS output will be reliably adjusted when simulated time is more than 1000. The running time is linearly correlated with simulated time at the meantime. Value range: [1000, 2000].<br>
                   </li>
                   <li><strong>Estimate proportion: </strong>Indicate the proportion of simulation results that will be used to estimate the Null hypothesis. Value range:(0,1)<br></li>
            <li><strong>Genome wide significant P-value: </strong>Value range: (0, 0.05). The default value is max(5e-8, 0.05/snpNumber).<br></li>
            <li><strong>Suggestive significant: </strong>Value range: (0, 0.05). The default value is max(1.6e-6, 1/snpNumber).<br></li>
            <li> <strong>Output threshold: </strong>SNPs with P-value smaller than this threshold will be displayed in output file. Value range: (0, 0.05).<br></li>
            <li><strong>Graphic display: </strong>SNPs with P-value smaller than this threshold will be displayed in output graph. Value range: (0, 0.001).<br></li>
            <li><strong>GWAS correction: </strong>A Boolean variance indicating whether to apply a strict correction for associated phenotypes. Leave it unelected as default unless user want to apply an additional strict correction to narrow down the number of associated phenotypes.<br></li>
            <li><strong>Inflation factor: </strong>A Boolean variance indicating whether to correct inflation of single GWASs or not. If user select it, a vector of correction factor is needed. The correction factor should be a set of numbers separated by space.<br>
            </li>
            </ul>
                   <br>
                <li>Check output.</li>
                        <br><br>

            </ol>
                </p>

                <br><br>
                <h1 id="output" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅴ.&nbsp;Output</h1>

                <p class="text-success" style="font-size: 20px" id="man"><strong><i class="fas fa-snowflake"></i>Combine manhattan plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;" >
                    This figure shows distribution of GWAS and CGWAS result, user can use it to analyze the differences between GWAS and CGWAS dynamically as well as interactively.<br>
                    <ul>
                    <li>The points above X axis are CGWAS result while the points below are GWAS results (each point represents the most significant result among all the phenotypes), users can query the annotated information and corresponding bar plot by simply click the SNPs of interest. <br>
                    </li><li>The annotation include:Chromosome, bp, allele, Function, Gene, GeneDetail, ExonicFunc, ensGene, dbSNP, frequency based on the 1000 Genomes Project and related reports in GWASCatalog.
            </li>
            </ul>
                    <br>
                    <br>
                </p>
                <img src="${host}/supply/css/cmht.jpg" style="margin-left: 20%" width="500"  height="400" hspace="5" vspace="5">

                <hr>
            </div>
            <div class="col-md-12">
                <p class="text-success" style="font-size: 20px" id="ld"><strong><i class="fas fa-snowflake"></i>Local plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;" >
                    User can click on the SNP of interest, then input the magnification interval (kb) and again click on “+”, the wed interface will show detail information with the gene distribution (hg19) of this region. User can also query linkage disequilibrium based on the 1000 Genomes Project, including African, American, East Asian, European, South Asian with LD tool above.
                </p>
                <img src="${host}/css/local.png" style="margin-left: 20%"   width="400" hspace="5" vspace="5">
                <hr>
            </div>
            <div class="col-md-12">
                <p class="text-success" style="font-size: 20px" id="bar"><strong><i class="fas fa-snowflake"></i>Bar plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;" >
                    The figure shows the best phenotypes combination of each SNP. Users can get the bar plot by clicking the interest point.<br>                    
                    <li>The red bar represents the Suggesting combine P-value for this SNP, the blue bar represents the recommended phenotypes combination suggested by CGWAS, and the value of each bar represents the P-value corresponding in GWAS. The upper polyline represents the Combine P-value of CGWAS.
                    </li>
            </p>
                <img src="${host}/supply/css/bar.jpg" style="margin-left: 20%"  width="400" hspace="5" vspace="5">
                <hr>
            </div>

            <div class="col-md-12">
                <p class="text-success" style="font-size: 20px" id="chrom"><strong><i class="fas fa-snowflake"></i>Chromosome plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;" >
                    This figure shows the distribution of all statistically significant loci among the whole chromosome. Users can click on the phenotype of interest, and the wed will show the distribution of the significant results obtained by GWAS and CGWAS among the chromosome, which can help to compare the differences between GWAS and CGWAS results.
                </p>
                <img src="${host}/supply/css/Chrosome.jpg" style="margin-left: 20%"  width="400" hspace="5" vspace="5">
                <hr>
            </div>
            <div class="col-md-12">
                <p class="text-success" style="font-size: 20px" id="chr"><strong><i class="fas fa-snowflake"></i>Chr plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;" >
                    User can simply click the button below each chromosome to compare the differences between of GWAS and CGWAS results in this specific chromosome.
                </p>
                <img src="${host}/css/chr.png" style="margin-left: 20%"  width="400" hspace="5" vspace="5">
                <hr>
            </div>

                <br><br>

            <h1 id="contact" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅵ.&nbsp;Contact</h1>
            <p class="text-justify" style="font-size: 16px">If you have any question or suggestion/comment, please feel free to contact us via email (cgwas@big.ac.cn).</p>
            <p class="text-justify" style="font-size: 16px"><strong>Address:</strong>
                <br>FanLiu Lab
                <br>Beijing Institute of Genomics, Chinese Academy of Sciences
                <br>No.1 Beichen West Road, Chaoyang District
                <br>Beijing 100101, China
                <br>Tel: +86 (10) 84097876
                <br>Fax: +86 (10) 84097720</p>
            <img src="${host}/css/address.jpg"/>

            <br><br>
        </div>
    </div>
    <div class="footer" style="color: #6ca6e0;">
        <strong style="margin-left: 40%">Copyright © 2019 FanLiu Lab</strong>
    </div>
</div>
<script src="${host}/js/doc.js"></script>
</body>
</html>
