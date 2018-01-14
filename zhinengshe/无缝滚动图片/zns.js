var g_bMoveLeft=true;
var g_oTimer=null;
var g_oTimerOut=null;

var g_bPause=true;  	//间隔停顿
var g_iPauseTime=1000;
var g_iSpeed=2;     //速度

window.onload=function ()
{
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var aA=oDiv.getElementsByTagName('a');
	
	var oChk=document.getElementById('chk_pause');
	var oPauseTime=document.getElementById('pause_time');
	var oSpeed=document.getElementById('sel_speed');
	
	var i=0;
	
	var str=oUl.innerHTML+oUl.innerHTML;// ul内所有li的长度加ul内所有li的长度(相当于复制了一份li添加到后面)
	
	oUl.innerHTML=str;//把li新的长度付给ul
	
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';//ul的宽度等于 单个li的宽度 乘以 li的个数
	
	//做一个循环，让每一个li都有startMove和stopMove
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function ()    //当鼠标移上第i个li时停止滚动
		{
			stopMove();
		};
		
		aLi[i].onmouseout=function ()   //当鼠标移开li时开始滚动
		{
			startMove(g_bMoveLeft);
		};
	}
	
	

	
	//左边按钮
	aA[0].onmouseover=function ()    //鼠标移动到左边按钮
	{
		startMove(true);    			//传true 往左走
	};
	
	
	
	
	
	//右边按钮
	aA[1].onmouseover=function ()   //鼠标移动到右边时 
	{
		startMove(false);        //传false 往右走
	};
	
	

	
	startMove(true);  //传true 表示默认左走
	
	
	//间隔停顿
	oChk.onclick=function () 
	{
		g_bPause=oChk.getElementsByTagName('input')[0].checked;   //判断间隙停顿 打钩 就执行间隙停顿
	};
	
	//滚动速度
	oSpeed.onchange=function ()
	{
		g_iSpeed=parseInt(this.value);  //获取当前选择的速度值 2：慢，5：中，10：块。
	};
	
	//选择 停顿间隔时间 100：短，1000：中，3000：长。 
	oPauseTime.onchange=function ()
	{
		g_iPauseTime=parseInt(this.value);   //获取当前停顿间隔时间 100：短，1000：中，3000：长。
	};
};

function startMove(bLeft)
{
	g_bMoveLeft=bLeft;   //判断为真就 左走 假就往 右走
	
	if(g_oTimer)  //每执行一次都要清楚一次定时器
	{
		clearInterval(g_oTimer);
	}
	//在执行定时器
	g_oTimer=setInterval(doMove, 30);   //定时器赋给g_oTimer变量
}

function stopMove()      //停止走动
{
	clearInterval(g_oTimer);//清除定时器
	g_oTimer=null;
}



//运动框架
function doMove()
{
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	
	var l=oUl.offsetLeft;

	if(g_bMoveLeft) //判断为真就 左走 
	{
		l-=g_iSpeed;
		if(l<=-oUl.offsetWidth/2)
		{
			l+=oUl.offsetWidth/2;
		}
	}
	else  
	{
		// 假就往 右走
		l+=g_iSpeed;
		if(l>=0)
		{
			l-=oUl.offsetWidth/2;
		}
	}
	
	if(g_bPause)   //为真执行间隙停顿 
	{
		if(Math.abs(l-Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth)<Math.ceil(g_iSpeed/2))
		{
			stopMove();
			g_oTimerOut=setTimeout
			(
				function ()
				{
					startMove(g_bMoveLeft);
				}, g_iPauseTime
			);
			
			l=Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth;
		}
	}
	
	oUl.style.left=l+'px';
}