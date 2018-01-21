
//创建一个对象方法（构造函数）
function LimitDrag(id)
{
	//继承Drag对象
	Drag.call(this, id);	//继承属性
}

for(var i in Drag.prototype)
{	//循环Drag对象 里面的所有方法 赋给LimitDrag对象
	LimitDrag.prototype[i]=Drag.prototype[i];
}

//给 LimitDrag 对象添加一个 fnMove 方法  
//覆盖Drag父类中的 fnMove 方法
LimitDrag.prototype.fnMove=function (ev)
{
	var oEvent=ev||event;
	//clientX 鼠标在窗口中的x坐标 减去 鼠标在div上的x坐标位置 等于 当前div的left位置
	var l=oEvent.clientX-this.disX;
	//clientY 鼠标在窗口中的Y坐标 减去 鼠标在div上的Y坐标位置 等于 当前div的top位置
	var t=oEvent.clientY-this.disY;
	
	//当div的left等于零时
	if(l<0)
	{	//left 等于零
		l=0;
	} //当div的left大于 浏览器可视区的宽度减去div的宽度时
	else if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth)
	{	//当div的left等于 浏览器可视区的宽度减去div的宽度时
		l=document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}
	
	this.oDiv.style.left=l+'px';
	this.oDiv.style.top=t+'px';
};