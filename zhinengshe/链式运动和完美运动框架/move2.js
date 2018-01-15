
function getStyle(obj, name)   //获取ID样式 (id名,属性名)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}


//startMove(oDiv, {width: 400, height: 400})

//运动框架
function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);  //清楚定时器
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')  //属性等于opacity
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100); //parseFloat() 函数可解析一个字符串，并返回一个浮点数。  round向上取整
			}
			else
			{	//获取属性值
				cur=parseInt(getStyle(obj, attr)); //parseInt() 函数可解析一个字符串，并返回一个整数。
			}
			
			var speed=(json[attr]-cur)/6;  //目标点 减去 属性值 除以6
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr]) //如果有值不等于目标点
				bStop=false;
			
			if(attr=='opacity') //如果属性是透明度
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';  //
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);  //清除定时
						
			if(fnEnd)fnEnd();      //如果有函数传进来，就执行函数
		}
	}, 30);
}