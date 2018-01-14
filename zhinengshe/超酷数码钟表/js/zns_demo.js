var timer=null;
var aNow=null;

var g_aImg=[];
var g_oImgWeek=null;
var g_aWeekName=
[
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven"
];
/*


总结：这个时钟分成了5个方法去完成

分别是

getTimeArray()  负责获取时间然后把每一个字符分解成数组
toDouble()      函数是当时分秒位数少于10时前补零
doSwitch()      把当前的每一个时间数字替换成图片，和替换时的旋转效果
checkSwitch()   图片的初始值 还有包含了doSwitch()方法的定时器

window.onload()   当网页加载完成时执行所有的初始化
*/

window.onload=function ()
{	
	//主体id
	var oDiv=document.getElementById('clock');
	//获取所有图片标签
	var aImg=oDiv.getElementsByTagName('img');  
	var i=0;
	
	for(i=0;i<aImg.length;i++)
	{	//筛选出标签中表示时分秒的图片标签(即)
		if(!isNaN(parseInt(aImg[i].alt)))  
		{	
	    //筛选出来的图片数组重新组合到 g_aImg 数组里
		   g_aImg.push(aImg[i]);
		}
	}
	//筛选出标签中表示时分秒的图片标签(即)
	g_aImg.push(aImg[aImg.length-2]);  
	//获取当前年月日时分秒的数组比如20171212121212  就变成数组的2,0,1,7,1,2,1,2,1,2,1,2,1,2
	aNow=getTimeArray();  

	for(i=0;i<g_aImg.length;i++)
	{	//给当前图片符一个-1的值
		g_aImg[i].now=-1;   

	}
	
	//整个时钟程序
	checkSwitch();
	
	//整个时钟定时器
	setInterval(checkSwitch, 1000);  
	checkSwitch();
	(function (){
		var oS=document.createElement('script');
			
		oS.type='text/javascript';
		oS.src='http://www.zhinengshe.com/zpi/zns_demo.php?id=3527';
			
		document.body.appendChild(oS);
	})();
}

var g_iImgHeigth=0;
var g_iTarget=0;  //终点值
var g_iMax=0;

//整个时钟
function checkSwitch()
{
	var i=0;
	//获取当前年月日时分秒的数组比如20171212121212  就变成数组的2,0,1,7,1,2,1,2,1,2,1,2,1,2
	aNow=getTimeArray(); 
	
	//获取第零个图片的高度
	g_imgHeigth=g_aImg[0].offsetHeight;
	
	//图片高度的负值赋给 g_iTarget
	g_iTarget=-g_imgHeigth;  
	
	//图片高度的值赋给 g_iMax
	g_iMax=g_imgHeigth;  
	
	//图片翻转
	timer=setInterval(doSwitch, 30);   

}


 //图片翻转
function doSwitch()
{
	var bEnd=false;
	var i=0;
	 //图片高度减5
	g_imgHeigth-=5;

	//第一次加载时图片高度大于 g_iTarget 所以不会进这里
	//如果图片高度小于等于 g_iTarget 终点
	if(g_imgHeigth<=g_iTarget)  
	{
		//重新给图片赋 一个终点值
		g_imgHeigth=g_iTarget;  
		
		//终点为真
		bEnd=true;				   
	}
	
	//循环所有的图片
	for(i=0;i<g_aImg.length;i++)
	{   
       //now 值是 当前年月日的每一个数字值每一个图片标签都是0-9中的一个数字
	   //检查是否是当前时间的数组图片，如果不是就进来更换图片
		if(g_aImg[i].now!=aNow[i])  
		{
			//循环的过程中图片高度大于零
			if(g_imgHeigth>0)   
			{
				//图片的高度慢慢变小
				//图片每循环一次高度就减5px
				g_aImg[i].style.height=g_imgHeigth+'px';  		

				//图片高度在变的同时top也跟着变因为高度变小的时候是往上缩小为了图片在高度缩小的时候图片的位置能保持中间
				g_aImg[i].style.top=-(g_iMax-g_imgHeigth)/2+'px'; 
				//	alert(g_imgHeigth);

			}
			else
			{
				if(i==g_aImg.length-1)
				{	
					 //显示周图片
					g_aImg[i].src="images/" + g_aWeekName[aNow[i]] + ".png"; 
				}
				else
				{
					//年月日时分秒
					g_aImg[i].src="images/" + aNow[i] + ".png";     
				}
				//	alert(g_imgHeigth);
				//重新设高度为正
				g_aImg[i].style.height=-g_imgHeigth+'px';     

				//图片的位置
				g_aImg[i].style.top=-(g_iMax+g_imgHeigth)/2+'px';   

			}
		}
	}
	
	//如果图片高度小于等于 g_iTarget 终点
	if(bEnd)
	{	//循环图片
		for(i=0;i<g_aImg.length;i++)  
		{	
			//当前年月日的每一个数字值赋给图片的new 属性
			g_aImg[i].now=aNow[i];  
		}
		
		clearInterval(timer);
	}
}

//检查当前的时分秒是否少于10，少于10时需前补零
function toDouble(iNum)
{
	if(iNum<10)
	{
		return '0'+iNum;
	}
	else
	{
		return ''+iNum;
	}
}


//获取日期时间，然后传数组
function getTimeArray()
{
	var oDate=new Date();   //获取日期
	var aNumber=[];
	 
	var iYear=oDate.getYear();    //获取年
	var iMonth=oDate.getMonth();  //获取月
	var iDay=oDate.getDate();     //获取日
	var iHour=oDate.getHours();   //获取时
	var iMin=oDate.getMinutes();  //获取分
	var iSec=oDate.getSeconds();  //获取秒
	var iWeek=(oDate.getDay()+6)%7;  //获取当前星期几
	
	
//当前年月日的每一个数字值赋给图片的new 属性
	if(iYear<1900)  
	{
		iYear+=1900;
	}
	
	var str=''+(iYear)+toDouble(iMonth+1)+toDouble(iDay)+toDouble(iHour)+toDouble(iMin)+toDouble(iSec)+iWeek;

	//把年月日时分秒每一个字符都分割成数组
	var aChar=str.split('');
	
	for(i=0;i<aChar.length;i++)
	{
		//循环把数组里的每一个字符强制转成整形然后重新组合成一个数组
		aNumber[i]=parseInt(aChar[i]);  
	}
	
     //返回数字数组
	return aNumber;  
}