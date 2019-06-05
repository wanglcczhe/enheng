;(function(){
	class ShoppingCart{
		constructor(){
			this.body=document.querySelector("dl");
			this.url="http://localhost/lecuntao/src/root/data/goods.json";
			this.init();
			this.addEvent();
		}
		init(){
			var that=this;
			$.ajax({
				url:this.url,
				success:function(res){
					that.res=res;
					that.getCookie();
				}
			})
		}
		getCookie(){
			this.goods=JSON.parse(getCookie("goods"));
			this.show();				
		}
		show(){
			var str="";
			for(var i=0;i<this.res.length;i++){
				for(var j=0;j<this.goods.length;j++){
					if(this.res[i].goodsId==this.goods[j].id){					
						str+=`<dd index="${this.goods[j].id}">
									<input type="checkbox"/>
										<p class="goods">
											<img src="${this.res[i].src}"/>
											<a href="#">${this.res[i].msg}</a>
										</p>
									<i>${this.res[i].price}</i>
									<input type="number" min="1" id="num" value="${this.goods[j].num}">
									<b class="delete">删除</b>
							</dd>`
					}						
				}
			}
			this.body.innerHTML=str;
		}
		addEvent(){
			var that=this;
			this.body.addEventListener("click",function(eve){
				var e=eve||window.event;
				var target=e.target||e.srcElement;
				if(target.className=="delete"){
					that.id=target.parentNode.getAttribute("index");
					target.parentNode.remove();
					that.changeCookie(function(i){
                        that.goods.splice(i,1)
                    })						
				}
			})
			this.body.addEventListener("input",function(eve){
				var e=eve||window.event;
				var target=e.target||e.srcElement;
				if(target.type=="number"){
					that.id=target.parentNode.getAttribute("index");
					that.changeCookie(function(i){
                        that.goods[i].num =target.value;				
					})
				}	
			
			})
		}	
		changeCookie(callback){
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id == this.id){
                    callback(i)
                    break;
                }
            }
            setCookie("goods",JSON.stringify(this.goods))
       }			
	}
		new ShoppingCart();	
})();
