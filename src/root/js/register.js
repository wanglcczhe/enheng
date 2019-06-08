;(function(){
	class Register{
        constructor(){
            this.user = document.querySelector("#user");
            this.pass = document.querySelector("#pass");
            this.btn = document.querySelector("#sub");
            this.msg = document.querySelector(".msg");
            this.init()
        }
        init(){
            var that = this;
            this.btn.onclick = function(){
                that.getUserMsg()
            }
        }
        getUserMsg(){
            this.usermsg = localStorage.getItem("usermsg");
            this.setUserMsg()
        }
        setUserMsg(){
            if(this.usermsg == null){
                this.usermsg = [{
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                }]
                this.msg.innerHTML = "注册成功";
            }else{
                this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
                for(var i=0;i<this.usermsg.length;i++){
                    if(this.usermsg[i].user == this.user.value){
                        this.msg.innerHTML = "亲！用户名已存在";
                        return;
                    }
                }
                this.msg.innerHTML = "注册成功";
                this.usermsg.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
            }
            localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
        }
    }
    new Register();
	
})();
