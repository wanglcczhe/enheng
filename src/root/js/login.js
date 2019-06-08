;(function(){
	class Login{
        constructor(){
            this.user = document.querySelector("#user");
            this.pass = document.querySelector("#pass");
            this.btn = document.querySelector("#btn");
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
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            this.check()
        }
        check(){
            for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].user == this.user.value && this.usermsg[i].pass == this.pass.value){
                    this.usermsg[i].onoff = 1;
                    localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                    this.msg.innerHTML = "登录成功，2秒后跳转到首页";
                    setTimeout(() => {
                        location.href = "index.html";
                    }, 2000);
                    return;
                }
            }
            this.msg.innerHTML = "账号或密码错误，请重新登录或去注册"
        }
    }


    new Login;
	
})();



