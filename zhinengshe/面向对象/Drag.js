//创建一个对象函数
function Drag(id)
{	//保存当前需要操作的元素this 到_this
	var _this=this;
	this.disX=0;
	this.disY=0;
	
	//获取元素id
	this.oDiv=document.getElementById(id);
	
	//给当前oDiv添加onmousedown事件
	this.oDiv.onmousedown=function (ev)
	{	//在onmousedown事件里调用当前对象的fnDown方法
		_this.fnDown(ev);

		return false;
	};
};

//给 Drag 对象添加 fnMove方法
Drag.prototype.fnDown=function (ev)
{	//保存当前需要操作的元素this 到_this
	var _this=this;
	var oEvent=ev||event;
	//clientX 鼠标在窗口中的x坐标 减去 div 的左边距  等于鼠标在div上的x坐标位置
	this.disX=oEvent.clientX-this.oDiv.offsetLeft;
	//clientY 鼠标在窗口中的y坐标 减去 div 的上边距  等于 鼠标在div上的y坐标位置
	this.disY=oEvent.clientY-this.oDiv.offsetTop;
	
	//添加 onmousemove 事件
	document.onmousemove=function (ev)
	{	//在 onmousemove 里面调用当前对象的fnMove 方法
		_this.fnMove(ev);
	};

	//添加 onmouseup 事件
	document.onmouseup=function ()
	{	//在 onmouseup 里面调用当前对象的fnUp 方法
		_this.fnUp();
	};
};

//给 Drag 对象添加 fnMove 方法
Drag.prototype.fnMove=function (ev)
{
	var oEvent=ev||event;
	//clientX 鼠标在窗口中的x坐标 减去 鼠标在div上的x坐标位置 等于 当前div的left位置
	this.oDiv.style.left=oEvent.clientX-this.disX+'px';
	//clientY 鼠标在窗口中的Y坐标 减去 鼠标在div上的Y坐标位置 等于 当前div的top位置
	this.oDiv.style.top=oEvent.clientY-this.disY+'px';
};

//给 Drag 对象添加 fnUp 方法
Drag.prototype.fnUp=function ()
{
	document.onmousemove=null;
	document.onmouseup=null;
};