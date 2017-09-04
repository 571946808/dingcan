/*-----------------------------------------------------------------------------
 * @Description:     注册
 * @Version:         1.0.0
 * @author:          yud(862669640@qq.com)
 * @date             2016.09.18
 * ==NOTES:=============================================
 * v1.0.0(2016.09.18):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add("page/register", function(S, Core){
 	PW.namespace("page.Register");
 	PW.page.Register = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'register/core'
 	]
 });
/********************************************************************/
KISSY.add('register/core', function(S){
	var 
		DOM = S.DOM, $ = S.all, get = DOM.get,
        on = S.Event.on,
        RegisterIO = PW.io.Register,
		el = {
			//表单元素
			submitForm:'.J_submitForm',
			//手机号
			phoneEl: '.J_phone',
			//发送触发器
			sendBtnTrigger: '.J_sendBtn',
			//密码元素
			passwordEl: '.J_password',
			//确认密码
			confirmPasswordEl: '.J_confirmPassword',
			//验证码
			validCodeEl:'.J_validCode',
			//错误验证
			errorEl: '.J_error',
			//注册按钮
			submitTrigger: '.J_registerBtn',
             //隐藏的input
            registerTypeEl:'.J_registerType'
		},
        REGISTER_TYPE = 'register-type';

	function Core(param){
		this._init();
	}

	S.augment(Core, {
		_init: function(){
			this._buildEvt();
			this.rightPhone = false;
			this.rightValidCode = false;
			this.rightPassword = false;
			this.rightConfirmPassword = false;
		},
		_buildEvt:function(){
			var 
				that = this;
			//验证手机号
            on(el.phoneEl, 'blur', function(){
                that._validPhone();
            }); 
			//获取验证码
			on(el.sendBtnTrigger, 'tap',function(e){
                if(that._validPhone()){
                    that._getValidCode(e.target);
                }else{
                    that._validPhone();
                }
			});
			//验证密码
            on(el.passwordEl, 'blur', function(){
                that._validPassword();
            });
			//验证确认密码
			on(el.confirmPasswordEl, 'blur', function(){
                that._validconfirmPassword();
            });
			//验证验证码
			on(el.validCodeEl, 'blur', function(){
                that._validValidCode();
            });		
            //提交注册表单
			on(el.submitTrigger, 'tap', function(){
                if(that._validValidCode()){
                    that._submitForm();
                }else{
                    that._validValidCode();
                }
				return false;
			});
		},
		/**
            * 验证手机号
            * @return {[type]} [description]
         */
        _validPhone: function(){
            var
                that = this,
                reg = /^[1]{1}[34578]{1}[0-9]{9}$/,
                input = DOM.val(el.phoneEl);

            if(!reg.test(input)){
                DOM.text(el.errorEl, '请输入合法的手机号');
                DOM.show(el .errorEl);
                that.rightPhone = false;
                return false;
            }else{
                DOM.hide(el.errorEl);
                that.rightPhone = true;
                return true;
            }
        },
        /**
         * 验证密码
         * @return {[type]} [description]
         */
        _validPassword: function(){
            var
                that = this,
                length = DOM.val(el.passwordEl).length;

            if(that.rightPhone){
            	if(length<6 || length>15){
            		that.rightPassword = false;
	                DOM.text(el.errorEl, '请输入6到15位的密码');
	                DOM.show(el.errorEl);
	            }else{
	            	that.rightPassword = true;
	                DOM.hide(el.errorEl);
            	}
            }else{
                that._validPhone();
            }
        },
        /**
         * 确认密码
         * @return {[type]} [description]
         */
        _validconfirmPassword: function(){
            var
                that = this,
                pwd = DOM.val(el.passwordEl),
                confirmPwd = DOM.val(el.confirmPasswordEl);

            if(that.rightPhone){
                if(that.rightPassword){
                    if(confirmPwd!== pwd){
                        that.rightConfirmPassword = false;
                        DOM.text(el.errorEl, '两次密码输入不一致');
                        DOM.show(el.errorEl);
                    }else{
                        that.rightConfirmPassword = true;
                        DOM.hide(el.errorEl);
                    }
                }else{
                    that._validPassword();
                }
            }else{
                that._validPhone();
            }
        },
        /**
         * 验证码验证
         * @return {[type]} [description]
         */
        _validValidCode: function(){
            var
                that = this,
                length = DOM.val(el.validCodeEl).length;

            if(that.rightPhone){
                if(that.rightPassword){
                    if(that.rightConfirmPassword){
                        if(length ==  4){
                            that.rightValidCode = true;
                            DOM.hide(el.errorEl);
                            return true;
                        }else{
                            that.rightValidCode = false;
                            DOM.text(el.errorEl, '请输入正确的验证码');
                            DOM.show(el.errorEl);
                            return false;
                        }
                    }else{
                        that._validconfirmPassword();
                    }
                }else{
                    that._validPassword();
                }
            }else{
                that._validPhone();
            }    
        },
        /**
         * 发送ajax获取验证码
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _getValidCode: function(e){
        	var 
        		that = this,
                type = DOM.attr(el.registerTypeEl, REGISTER_TYPE),
                data = { 
                    phone: DOM.val(el.phoneEl), 
                    registerType : type
                };

            RegisterIO.register(data, function(rs, errMsg){
                if(!rs){
                    alert(errMsg);
                }
                else{
                    $(e).attr("disabled","true");
                    DOM.removeClass(e, "send-phone");
                    DOM.addClass(e,"to-grey");
                    setTimeout(function (){
                        $(e).attr("disabled","false");
                        DOM.removeClass(e, "to-grey");
                        DOM.addClass(e, "send-phone");
                    },60000);
                }
            }); 
        },
        /**
         * 提交注册表单
         * @return {[type]} [description]
         */
        _submitForm: function(){
            var
                that = this,
                form = get(el.submitForm);

            if(that.rightPhone&&that.rightValidCode&&that.rightPassword&&that.rightConfirmPassword){
                form.submit();
            }else{
                that._validValidCode();
            }
        }
	});
	return Core;	
},{
    requires:[
        'mod/ext',
        'pio/register'
    ]
});		