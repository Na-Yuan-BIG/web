<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
    <title>CGWAS</title>
    <link href="${host}/css/doc.css" rel="stylesheet"/>
    <style type="text/css">
        li {
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
                    <li><a href="#us"><strong>Ⅵ.&nbsp;Contact</strong></a></li>
                </ul>
            </div>
        </div>
        <div class="col-md-9" id="lists">
            <div class="col-md-12">
                <h1 id="about" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅰ.&nbsp;What is
                    CGWAS</h1>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    Combined Genome-Wide Association Study (CGWAS) is a webserver which combines summary statistics from
                    multiple single-trait GWASs to detect SNPs simultaneously associated with multiple traits, which
                    might be undetectable in single-trait GWASs.
                </p>
                <br>
                <br>
                <h1 id="manual" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅱ.&nbsp;Input Data
                    format</h1>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    In order to run CGWAS, user need to upload a compressed file which contains two types of files: SNP
                    information file and GWAS summary statistic file
                    (<a href="${host}/file/data/input.zip"><strong class="text-success">input.zip</strong></a>).
                <ol>
                    <%--<li>CGWAS expect two types of files: SNP information file and GWAS summary statistic file.<br><br></li>--%>
                    <li>The SNP information file is a space or tab delimited file whose name must be lowercase “snp”,
                        and with three columns below:<br>
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
                    </ul>
                    <br>
                </ol>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;"> The name of each file should be the
                    corresponding phenotype and should have a header row (BETA,P). All files must have the same rows.
                    After all the files are prepared and put in one folder, user need to compress this folder into
                    tar.gz or zip format.<br><br>
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
                <h1 id="data" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅲ.&nbsp;Example
                    Data</h1>

                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    Two sets of example data are offered for user to get used to this web. The first data set includes 5
                    traits as well as 10000 SNPs, user can download it at “Run CGWAS” page. It shows the standard format
                    of input data, and can finish analyzing within 3 minutes.
                </p>
                <br>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    The second data set is an example of standard output data(Mht.txt, Nbar.txt, 1_pheno.txt,
                    2_TopSNP_gwas.txt, 3_TopSNP_cgwas.txt), which can be downloaded in “CGWAS plot” and “Chromosome
                    plot” pages. User can simply get the result of this data by clicking “Demo Run” at the head of each
                    page.
                </p>
                <br><br>
                <h1 id="step" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅳ.&nbsp;Run
                    Steps</h1>

                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                <ol>
                    <li>Upload input file.<br><br></li>
                    <li>User can check the status of the task through the provided hyperlink. If an email is provided,
                        the website will also send an email notification as soon as the task is completed. <br><br></li>
                    <li>Set parameters:<br></li>
                    <strong> Note: These parameters will affect computational efficiency and results. We recommend user
                        using default parameters.</strong><br><br>
                    <ul>
                        <li><strong>Number of simulations: </strong>Number of simulations used to empirically derive the
                            distribution of the test statistics under the null hypothesis of no association. This is
                            used to control the genome-wide type-I error rate. The default value is 1000, which is
                            sufficient in most settings tested. The larger value will result in a more accurate type-I
                            error but increases the computational burden. Value range: [1000, 2000].<br></li>

                        <li><strong>Genome-wide significant threshold: </strong>The p-value threshold controlling for 5%
                            type-I error rate at the genome-wide and phenome-wide level. To be consistent with
                            traditional single-trait GWAS of millions of SNPs, the default value is 5e-8, which has been
                            adjusted using simulations. For smaller numbers of SNPs, this threshold should be consistent
                            with the one used for single-trait GWAS. Value range:(0,0.05)<br></li>

                        <li><strong>Genome-wide suggestive threshold: </strong>The p-value threshold for suggestive
                            evidence of association at the genome-wide and phenome-wide level. The default value is 1e-6,
                            which has been adjusted using simulations. This value should be consistent with the one used
                            in single trait GWAS.Value range: (0, 1).<br></li>

                        <li><strong>P-value filter for the output file: </strong>Transmitting large data over network
                            requires time. This filter reduces the file size. The default value is 1e-3, which has been
                            adjusted using simulations. Value range: (0, 0.05).<br></li>

                        <li><strong>Max N SNPs in Manhattan plot & P-value filter for Manhattan plot : </strong>Plotting
                            requires computation power, the max N SNPs set the max number of SNPs and the p-value filter
                            reduces the number of SNPs in the CGWAS Manhattan plot. Only the intersecting set of SNPs
                            satisfying both Max N SNPs and P-value filter will be plotted. The default value of Max N
                            SNPs in Manhattan plot is 30000 and P-value filter for Manhattan plot is 5e-4, which has been
                            adjusted different browser. <br></li>

                        <li><strong>Suggest subset of associated traits: </strong>For each SNP, CGWAS will suggest a
                            specific combination of a subset of phenotypes with which this SNP is associated. This can
                            be the combination which yielded the minimal combined p-value or the associated phenotypes
                            (p<0.05) after the Bonferroni correction of the total number of phenotypes. The default
                            value is Bonferroni of N traits. <br></li>

                        <li><strong>Genomic control of inflation factors: </strong>This optionally perform the genomic
                            control analysis on the input GWAS files to pre-adjust for genomic inflation. Note for very
                            large data-sets and highly polygenic phenotypes, inflations in single-trait GWASs may be
                            expected.The CGWAS will choose this option by default. <br></li>

                        </li>
                    </ul>
<br>
                To testing the <strong> example data set</strong>, the paraments "Genome-wide significant threshold" and "Genome-wide suggestive threshold" should be set more than 5e-6 and 1e-4 respectly because of the small number of SNPs. Other paraments can keep the default.
<br>
                    <br>
                    <li>Check output.</li>
                    <br><br>

                </ol>
                </p>

                <br><br>
                <h1 id="output" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">
                    Ⅴ.&nbsp;Output</h1>
                <p class="text-success" style="font-size: 20px" id="res"><strong><i class="fas fa-snowflake"></i>Result files</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    The downloaded results file contains a CGWAS result file named <strong> AllHits.csv </strong>and a  folder named <strong>plotdata</strong>.
                </p>
                <ol>
                    <li>AllHits.csv shows the combining summary statistics of SNPs.</li>
                    <br>
                    <ul>
                        <li>The first 4 columns represent basic information of SNPs.</li>
                        <li><strong>Loci:</strong> CGWAS default 500kb as one loci.</li>
                        <li><strong>MinCorrSp:</strong>  The corrected MinSp.</li>
                        <li><strong>MinCorrCp:</strong>  The corrected MinCp.</li>
                        <li><strong>MinSp:</strong>  Most significant P-value of single trait GWAS for each SNP.</li>
                        <li><strong>MinCp:</strong>  Most significant accumulatively combined p-value of CGWAS for each SNP.</li>
                        <li><strong>MinSpTrait:</strong>  Most significant associated phenotype of single trait GWAS for each SNP</li>
                        <li><strong>SpSigType:</strong>  single trait GWAS result for each SNP. (0: not suggestive, 1: suggestive, 2: significant)</li>
                        <li><strong>CpSigType:</strong>  CGWAS result for each SNP. (0: not suggestive, 1: suggestive, 2: significant)</li>
                        <li><strong>MinCpNum:</strong>  The associated phenotypes for each SNP based on CGWAS.</li>
                        <li><strong>RankN:</strong>  The Nth phenotypes.</li>
                        <li><strong>SpN:</strong>  The Nth P-value of single trait GWAS.</li>
                        <li><strong>CpN:</strong>  The Nth P-value of CGWAS.</li>
                    </ul>
                    <br>
                    <li>plotdata is used to upload on website to visualize the results.</li>
                </ol>


                <br><br>
                <p class="text-success" style="font-size: 20px" id="man"><strong><i class="fas fa-snowflake"></i>Combine
                    manhattan plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    The CGWAS results are displayed in a Manhattan plot at the upper part of the figure. The results
                    from all GWASs are displayed in a signal ‘composite’ Manhattan plot at the lower part of the figure,
                    where for each SNP, only the most significant p-value is shown.
                </p>
                <img src="${host}/supply/css/cmht.jpg" style="margin-left: 20%" width="500" height="400" hspace="5"
                     vspace="5">

                <hr>
            </div>

                <p class="text-success" style="font-size: 20px" id="ld"><strong><i class="fas fa-snowflake"></i>Local
                    plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    Regional association plot containing known genes and Linkage Disequilibrium information aligned with
                    hg19.
                </p>
                <img src="${host}/css/local.png" style="margin-left: 20%" width="400" hspace="5" vspace="5">
                <hr>


                <p class="text-success" style="font-size: 20px" id="bar"><strong><i class="fas fa-snowflake"></i>Bar
                    plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    For each SNP, its combined p-value (red) and the p-values from individual GWASs are shown in a bar
                    plot. This SNP is suggested to be associated with a set of phenotypes (blue). The dot indicates the
                    accumulatively combined p-value until the currently ranked phenotype.
                </p>
                <img src="${host}/supply/css/bar.jpg" style="margin-left: 20%" width="400" hspace="5" vspace="5">
                <hr>



                <p class="text-success" style="font-size: 20px" id="chrom"><strong><i class="fas fa-snowflake"></i>Chromosome
                    plot</strong></p>
                <p class="text-justify" style="margin-right: 15px;font-size: 16px;">
                    Significant results in relation to their chromosomal positions are displayed in this figure.
                </p>
                <img src="${host}/supply/css/Chrosome.jpg" style="margin-left: 20%" width="400" hspace="5" vspace="5">



                <img src="${host}/css/chr.png" style="margin-left: 20%" width="400" hspace="5" vspace="5">
                <hr>


            <br><br>

            <h1 id="us" style="margin-top: 0;padding-top:0;font-size: 20px;font-weight:bold;">Ⅳ.&nbsp;Contact</h1>

            <p class="text-justify" style="font-size: 16px">If you have any question or suggestion/comment, please feel
                free to contact us via email (liufan@big.ac.cn).</p>
            <p class="text-justify" style="font-size: 16px"><strong>Visiting Address: </strong>
                <br>Beijing Institute of Genomics, Chinese Academy of Sciences
                <br>Beichen West Road 1-104, Chaoyang, Beijing, 100101, P.R. China
                <br>Tel: +86-010-84097876
                <br>Fax: +86-010-84097720</p>
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
