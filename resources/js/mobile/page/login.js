/*-----------------------------------------------------------------------------
 * @Description:     登录
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.09.09
 * ==NOTES:=============================================
 * v1.0.0(2016.09.09):
 初始生成
 * ------------------------------------------------------------*/
KISSY.add('page/login', function(S, Core){
    PW.namespace('page.Login');
    PW.page.Login = function(param){
        new Core(param);
    }
}, {
    requires:[
        'login/core'
    ]
});
/*-------------------------------------------------------------*/
KISSY.add('login/core', function(S){
    var
        DOM = S.DOM, $ = S.all,
        on = S.Event.on,
        LoginIO = PW.io.Login,
        el = {
            //用户类型触发器
            userTypeTrigger: '.J_userType',
            //用户名El
            phoneEl: '.J_phone',
            //密码El
            passwordEl: '.J_password',
            //用户名和密码公共类
            userInfoEl: '.user-info',
            //错误提示El
            errorEl: '.J_error',
            //登录btn
            loginTrigger: '.J_login',
            //用户类型组El
            typeGroupEL: '.J_typeGroup',
            //注册成功的提示
            successTipEl: '.J_successTip',
            //注册，忘记密码El
            registerEl: '.J_register'
        },
        DATA_USER_TYPE = 'data-user-type';

    function Core(param){
        this._init();
    }

    S.augment(Core, {
        _init: function(){
            this._clearTip();
            this._bulidEvt();
        },
        _clearTip: function(){
            var
                that = this,
                hasTip = S.one(el.successTipEl);

            if(hasTip){
                setTimeout(function(){
                    DOM.remove(el.successTipEl);
                }, 2000)
            }
        },
        _bulidEvt: function(){
            var
                that = this;

            on(el.userTypeTrigger, 'tap', function(e){
                that._changeUserType(e.currentTarget);
            });

            on(el.phoneEl, 'blur', function(){
                that._validPhone();
            });

            on(el.passwordEl, 'blur', function(){
                that._validPassword();
            });
            on(el.loginTrigger, 'tap', function(){
                setTimeout(function(){
                    that._login();
                }, 50);
            });
            on(document, 'keyup', function(e){
                if(event.keyCode == "13"){
                    that._login();
                }
            })
        },
        /**
         * 改变用户类型
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _changeUserType: function(ele){
            var
                that = this,
                spanEls = DOM.siblings(ele),
                userType = DOM.attr(ele, DATA_USER_TYPE);
        
            DOM.removeClass(spanEls, 'active');
            DOM.addClass(ele, 'active');
            if(userType == 1){
                DOM.hide(el.registerEl);
            }else{
                DOM.show(el.registerEl);
            }
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
                DOM.text(el.errorEl, '手机号错误，请重新输入');
                DOM.show(el.errorEl);
                return false;
            }else{
                DOM.hide(el.errorEl);
                return true;
            }
        },
        _validPassword: function(){
            var
                that = this,
                length = DOM.val(el.passwordEl).length;

            if(length<6 || length>15){
                DOM.text(el.errorEl, '请输入6到15位的密码');
                DOM.show(el.errorEl);
                return false;
            }else{
                DOM.hide(el.errorEl);
                return true;
            }
        },
        /**
         * 登录操作
         * @return {[type]} [description]
         */
        _login: function(){
            var
                that = this,
                typeEl = DOM.get('.active', el.typeGroupEL),
                type = DOM.attr(typeEl, DATA_USER_TYPE),
                data = {
                    phone: DOM.val(el.phoneEl),
                    password: DOM.val(el.passwordEl),
                    type: type
                };

            if(that._validPhone()){
                if(that._validPassword()){
                     that._sendData(data);
                }
            }
        },
        /**
         * ajax发送登录数据
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _sendData: function(data){
            LoginIO.login(data, function(rs, data, errMsg){
                if(!rs){
                    DOM.text(el.errorEl, errMsg);
                    DOM.show(el.errorEl);
                }else{
                    window.location.href = data.src;
                }
            });
        }
    });

    return Core;
}, {
    requires:[
        'mod/ext',
        'pio/login'
    ]
});