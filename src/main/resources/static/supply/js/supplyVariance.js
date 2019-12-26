//附加参数存储位置
var surplyLocation='supply/';
//定义网页存放地址
//  var websiteUrl="http://192.168.72.25:9800/";
var websiteUrl="https://bigd.big.ac.cn/cgwas/file";

//定义画局部图所选择的地区
var Area=[];
//定义用户临时文件夹
var userTime;
//定义局部曼哈顿图所需要的参数
var blockChr;
var blockStart;
var blockEnd;
var blockbp=[];
var blocksnp=[];
var blocklogp=[];
var blockp=[];
var blockchr;
var chr=[];
var snp=[];
var p=[];
var bp=[];
var logp=[];
//坐标轴下侧single P数据
var sp ;
var sp_chr;
var sp_snp;
var sp_bp ;
var fileString=[];
var header;
var sep;//定义分隔符
//------------------
//定义CGWAS所需要的参数
//------------------
//manhattan 图的宽度
var mhtwidth = 0.5;
	//点的集合
	//
	var toolstatus = 0;
	var toolstatus_chrom = 0;
	var circle_up;
	var circle_down;
	//定义参数
	var Ydown1Axis;
	var Ydown2Axis;
	var xAxis;
	var Yup1Axis;
	var Yup2Axis;
	var upcol = [d3.rgb(237,173,15) , d3.rgb(138 , 130 , 3)];  //自定义颜色,可以开放接口
	var downcol = [d3.rgb(119,238,0) , d3.rgb(68,139,0)];
	//曼图的坐标轴和文字的个数
	var g_length;
	var text_length;
	//测试
	var click ;
	var click_col ;
	//combine p
	var cp=[];
	var logcp=[];
	var sp=[];
	var logsp=[];
	var line_generator;


	//boom放大
	var qurryGene;
	var ldstatus = "f";
	var boom_chr ;
	var boom_bp ;
	var boom_snp ;
	var boom_cp;

	var boom_sp;
	var boom_sp_chr ;
	var boom_sp_bp ;
	var boom_sp_snp ;
	var cgwas_status = 1;
	var loc;
	var loc_chr;
	var loc_bp;
	//Hlight
	var status = 1;

	//left right move
	var iter = 0;
	//bar plot
	var bar_set;
	var bar_snp=[];
	var Sps={};
	var Phes={};
	var Cps={};
	var bar_num;
	var point_set;

//定义子SVG
var CircleSet = [];
var loca;
var line_log;
var line_p;
var bar_id;
var bar_log;
var bar_p;
//准备坐标轴
var bar_xScale;
var bar_yScale;
var bar_xAxis;
var bar_yAxis;
//开始画图		
var barset
//定义Circle的集合
var AllCircles;
//定义注释框
var tooltip;
var informationtip;
//定义X轴
var xAxis;
//定义y轴
var yAxis;
//定义曼哈顿图所需的参数
var widedata;
var height = 600;
var w = 800;
var wideBar = 800;
var h = height/2;
var padding = 60;
var svg;      								//定义全局存在的画布
var line;     								//定义全局存在的线段
var circle;   								//定义全局存在的点
var xScale;	  								//定义全局比例尺
var yScale;
var y2Scale;
var lineScale;								//定义全局添加线段比例尺
//定义布局位置
var chrLength=[249250621,243199373,198022430,191154276,180915260,171115067,159138663,146364022,141213431,135534747,135006516,133851895,115169878,107349540,102531392,90354753,81195210,78077248,59128983,63025520,48129895,51304566,155270560,16571];
var block = [0,249250621,492449994,690472424,881626700,1062541960,1233657027,1392795690,1539159712,1680373143,1815907890,1950914406,2084766301,2199936179,2307285719,2409817111,2500171864,2581367074,2659444322,2718573305,2781598825,2829728720,2881033286];
var block_rate = [0.08051570,0.07856095,0.06396740,0.06174877,0.05844125,0.05527548,0.05140673,0.04728013,0.04561633,0.04378193,0.04361130,0.04323832,0.03720345,0.03467724,0.03312083,0.02918739,0.02622858,0.02522138,0.01910050,0.02035920,0.01554745,0.01657297,0.06933672];
var xlables = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var labelScale = [0 , 0.0805157,0.1590767,0.2230440,0.2847928,0.3432341,0.3985096,0.4499163,0.4971964,0.5428127,0.5865947,0.6302060,0.6734443,0.7106477,0.7453250,0.7784458,0.8076332,0.8338618,0.8590832,0.8781837,0.8985429,0.9140903,0.9306633,1.0000000];
var block;									
var xLabels;
var colors;
//画chrods所需的参数
var ChordsStatus;
var chordsSNP = [];
var chords_cp_n = [];
var chords_sp_n = [];
var cpmatrix_1 = [];
var cpmatrix_2 = [];
var spmatrix_1 = [];
var spmatrix_2 = [];
//chrosome plot 所需的函数
var Phes=[];
var gwas_phes=[];
var gwas_pvalue=[];

var cgwas_phes=[];
var cgwas_pvalue=[];
var c_chr=[];
var c_bp=[];
var c_snp=[];


//读文件状态监测参数
var pathcolor = [];
//画combine组合的参数
var  innerRadius = 500 / 2 ;
var outerRadius = innerRadius * 1.05;
var text;
var text_huan;
var pheorder;
var zhushi_0 = 1;
var zhushi_1=1;		//注释信息
var beijing_0 = 1;
var beijing_1 = 1;
var zhushi_status;
//注释框的基本位置
var xBase = 600;
var yBase = 200;
var highlight_huan = 0;

var	width;
var	left_move;
var lm;
var ldplot = "F";

var trydata;
var xScale;
var heightScale;
var widthScale;
var chr_stat=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var gwas_stat;
var cgwas_stat;
var barwidth;
var phenoColors=[];

