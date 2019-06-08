;(function(){
	"use strict"
//初始化	
	class Init{
		constructor(){
			this.user = document.querySelector("header h3 span");
			this.withdraw=document.querySelector("header h3 i");
			this.getmsg();
			this.addEvent();
		}
		getmsg(){
			this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
			this.verification(); 		
		}
		addEvent(){
			this.withdraw.onclick = ()=>{
                for(var i=0;i<this.usermsg.length;i++){
                    if(this.name == this.usermsg[i].user){
                        this.usermsg[i].onoff = 0;
                        this.user.style.display = "none";
                        this.withdraw.style.display = "none";
                        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                        return ;
                    }
                }
            }
		}
		verification(){
			for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].onoff == 1){
                    this.user.innerHTML = this.usermsg[i].user;
                    this.name = this.usermsg[i].user;                   
                    return;
                }
           }									
		}		
	}
	
	
	new Init();
//切换省份	
	var cp=document.getElementById("changeP");
	var prov=document.querySelector("#province");
	cp.onmouseover=function(){
		prov.style.display="block";	
		
	}
	prov.onmouseout=function(){
		prov.style.display="none";	
	}
	cp.onmouseout=function(){
		prov.style.display="none";	
	}
//楼层	
	$(".floor").children("p").click(function(){
		$("html").animate({
            scrollTop:$("div.fl").eq($(this).index()).offset().top
        })
    })
	$(".floor").children("h3").click(function(){
		$("html").animate({
            scrollTop:0
        })
   })
	
//搜索框	
	class SearchBox{
		constructor(){
			this.oUl=document.getElementById("list");
			this.text=document.getElementById("txt");
			this.url="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
			this.init();		
		}
		init(){
			var that=this;
			this.text.onblur=function(){
				that.text.value="";				
			}
			this.text.oninput=function(){
				that.value=this.value;
				that.load();
			}
		}
		load(){
			var that=this;
			$.ajax({
				url:this.url,
				data:{
					wd:this.value,
				},
				success:function(res){
					that.res=res;
					that.show();
				},
				dataType:"jsonp",
				jsonp:"cb"
				
			})
		}
		show(){
			var str="";
			for(var i=0;i<this.res.s.length;i++){
				str+=`<li>${this.res.s[i]}</li>`
					
			}
			this.oUl.innerHTML=str;
			this.str=str;
			this.list(this.str);
		}
		list(){
			var ospan = this.text
			var oul = this.oUl;
			
			oul.innerHTML=this.str;
			var ali = document.querySelectorAll("#search form .search-res li");
			
			var index = 0;
			ospan.innerHTML = ali[index].innerHTML;
			ali[index].className = "active";
			
			var onOff = 0;
			ospan.onclick = function(eve){
				var e = eve || window.event;
				if(e.stopPropagation){
					e.stopPropagation()
				}else{
					e.cancelBubble = true;
				}				
				if(onOff == 0){
					oul.style.display = "block";
					setActive()
					onOff = 1;
				}else{
					oul.style.display = "none";
					onOff = 0;
				}
			}
			document.onclick = function(){
				oul.style.display = "none";
				onOff = 0
			}
			for(var i=0;i<ali.length;i++){
				ali[i].index = i;
				ali[i].onmouseover = function(){
					index = this.index;
					setActive()
				}
				ali[i].onclick = function(){
					ospan.innerHTML = this.innerHTML;
					index = this.index;
				}
			}
			document.onkeydown = function(eve){
				if(oul.style.display === "none") return;
				
				var e = eve || window.event
				var code = e.keyCode || e.which;
				if(code === 38){
					if(index == 0){
						index = 0
					}else{
						index--
					}
					setActive()
					ospan.innerHTML = ali[index].innerHTML
				}
				if(code === 40){
					if(index == ali.length-1){
						index = ali.length-1
					}else{
						index++;
					}
					setActive()
					ospan.innerHTML = ali[index].innerHTML
				}
				if(code == 13){
					oul.style.display = "none";
					onOff = 0
				}
			}
			function setActive(){
				for(var j=0;j<ali.length;j++){
					ali[j].className = "";
				}
				ali[index].className = "active-l";
			}		
		}		
	}
	new SearchBox();
	
//轮播图	
	class Banner{
		constructor(){
			this.bbox=$(".banner")
			this.img = $(".banner .imgbox a");
			this.left = $(".banner s");
			this.right = $(".banner i");			
			this.index = 0;
			this.fan = this.img.length-1;
			this.addEvent();
			this.autoplay();
			
		}
		addEvent(){
			var that=this;
			this.left.click(function(){
				that.changeIndex("l")
			})
			this.right.click(function(){
				that.changeIndex("r")
			})
						
		}
		changeIndex(type){
			if(type=="r"){
				if(this.index==this.img.length-1){
					this.index=0;
					this.fan=this.img.length-1
				}else{
					this.index++;
					this.fan=this.index-1;
				}
				this.show(1);
			}else{
				if(this.index==0){
					this.index=this.img.length-1;
					this.fan=0;
				}else{
					this.index--;
					this.fan=this.index+1;
				}
				this.show(-1);
			}					
		}
		show(t){
			this.img.eq(this.fan).css({left:0}).animate({
				left:-1536*t
			})
			this.img.eq(this.index).css({left:1536*t}).stop().animate({
				left:0			
			})
			this.listmove();
		}
		autoplay(){
			var timer;
			var that=this;
			timer=setInterval(()=>{
				this.right.trigger("click")
			},2000)
			this.bbox.hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(() => {
                    that.right.trigger("click")                   
                }, 2000);
            })
		}
		listmove(){
			
			
		}
				
		
	}
	

	new Banner();
//商品
	class Goods{
		constructor(){
			this.cont=document.querySelector("#main .daily ul");
			this.url="http://localhost/lecuntao/src/root/data/goods.json";
			this.sc=document.querySelector(".shoppingcart b");
			this.init();
			this.addEvent();		
		}
		init(){
			var that=this;
			$.ajax({
				url:this.url,
				success:function(res){
					that.res=res;
					that.show();
				}
			})			
		}
		show(){
			var str="";
			for(var i=0;i<this.res.length;i++){
				str+=`<li class="box" index="${this.res[i].goodsId}">
						<a href="details.html">
							<b>${this.res[i].name}</b>
							<i>${this.res[i].msg}</i>
							<img src="${this.res[i].src}"/>														
						</a>
						<s class="btn">添加到购物车</s>
					</li>`			
			}
			this.cont.innerHTML=str;			
		}
		addEvent(){
			var that=this;
			this.cont.addEventListener("click",function(eve){
				var e=eve||window.event;
				var target=e.target||e.srcElment;
				if(target.className=="btn"){}
					that.id=target.parentNode.getAttribute("index");
					that.setCookie();
			})		
		}
		setCookie(){
			this.goods=getCookie("goods");
			if(this.goods){
				this.goods=JSON.parse(this.goods)
				var onoff=true;
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id==this.id){
						this.goods[i].num++;
						onoff=false;
					}						
				}
				if(onoff){
					this.goods.push({
						id:this.id,
						num:1
					})
				}
			}else{
				this.goods=[{
					id:this.id,
					num:1
				}]
			}
			setCookie("goods",JSON.stringify(this.goods));
			getCookie("goods");
				
		}	
			
	}
	







	new Goods();






















	
})();
