             /*-----------------------------------------------------------------------------
 * @Description:     修改密码
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.09.10
 * ==NOTES:=============================================
 * v1.0.0(2016.09.10):
 初始生成
 * ------------------------------------------------------------*/
KISSY.add('page/my/password-modify', function(S, Core){
    PW.namespace('page.PasswordModify');
    PW.page.PasswordModify = function(param){
        new Core(param);
    }
}, {
    requires:[
        'password-modify/core'
    ]
});
/*-------------------------------------------------------------*/
KISSY.add('password-modify/core', function(S){
    var
        DOM = S.DOM,
        on = S.Event.on,
        PasswordModifyIO = PW.io.PasswordModify,
        el = {
            //旧密码El
            passwordEl: '.J_passwordOld',
            //新密码El
            newPasswordEl: '.J_passwordNew',
            //确认密码El
            confirmPasswordEl: '.J_passwordConfirm',
            //错误提示El
            errorEl: '.J_error',
            //用户id
            partyIdEl: '.J_partyId',
            //确认修改btn
            passwordModifyTrigger: '.J_passwordModify'
        };

    function Core(param){
        this._init();
    }

    S.augment(Core, {
        _init: function(){
            this._bulidEvt();
        },
        _bulidEvt: function(){
            var
                that = this;

            on(el.passwordEl, 'blur', function(){
                that._validPasswordOld();
            });
            on(el.newPasswordEl, 'blur', function(){
                that._validPasswordNew();
            });
            on(el.confirmPasswordEl, 'blur', function(){
                that._validconfirmPassword();
            });
            on(el.passwordModifyTrigger, 'tap', function(){
                that._modify();
            });
        },
        /**
         * 验证旧密码
         * @return {[type]} [description]
         */
        _validPasswordOld: function(){
            var
                that = this,
                length = DOM.val(el.passwordEl).length;

            if(length<6 || length>15){
                DOM.text(el.errorEl, '旧密码错误，请重新输入');
                DOM.show(el.errorEl);
                return false;
            }else{
                DOM.hide(el.errorEl);
                return true;
            }
        },
        /**
         * 验证新密码
         * @return {[type]} [description]
         */
        _validPasswordNew: function(){
            var
                that = this,
                length = DOM.val(el.newPasswordEl).length;

            if(length<6 || length>15){
                DOM.text(el.errorEl, '请输入6到15位的新密码');
                DOM.show(el.errorEl);
                return false;
            }else{
                DOM.hide(el.errorEl);
                return true;
            }
        },
        /**
         * 确认密码
         * @return {[type]} [description]
         */
        _validconfirmPassword: function(){
            var
                that = this,
                newPwd = DOM.val(el.newPasswordEl),
                confirmPwd = DOM.val(el.confirmPasswordEl);

            if(newPwd !== confirmPwd){
                DOM.text(el.errorEl, '两次密码输入不一致');
                DOM.show(el.errorEl);
                return false;
            }else{
                DOM.hide(el.errorEl);
                return true;
            }
        },
        /**
         * 确认修改操作
         * @return {[type]} [description]
         */
        _modify: function(){
            var
                that = this,
                data = {
                    oldPwd: DOM.val(el.passwordEl),
                    newPwd: DOM.val(el.newPasswordEl),
                    confirmPwd: DOM.val(el.confirmPasswordEl),
                    partyId: DOM.val(el.partyIdEl)
                };
                
            if(that._validPasswordOld()){
                if(that._validPasswordNew()){
                    if(that._validconfirmPassword()){
                        that._sendData(data);
                    }
                }
            }
        },
        /**
         * ajax发送密码数据
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        _sendData: function(data){
            PasswordModifyIO.modify(data, function(rs, errMsg){
                if(!rs){
                    DOM.text(el.errorEl, errMsg);
                    DOM.show(el.errorEl);
                }else{
                    alert('密码修改成功！');
                    window.history.go(-1);
                }
            });
        }
    });

    return Core;
}, {
    requires:[
        'mod/ext',
        'pio/password-modify'
    ]
});