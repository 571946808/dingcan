/*-----------------------------------------------------------------------------
 * @Description:     新增留言
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.10.13
 * ==NOTES:=============================================
 * v1.0.0(2016.10.13):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add("page/my/message-add", function(S, Core){
 	PW.namespace("page.MessageAdd");
 	PW.page.MessageAdd = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'message-add/core'
 	]
 });
/********************************************************************/
KISSY.add('message-add/core', function(S){
	var 
		DOM = S.DOM, $ = S.all, get = DOM.get,
        on = S.Event.on,
		el = {
			//表单元素
			submitForm: '.J_submitForm',
            //留言信息
            messageAddEl: '.J_messageAdd',
            //错误提示El
            errorEl: '.J_error',
			//提交按钮
			submitTrigger: '.J_submitBtn',
            //注册成功的提示
            msgEl: '.J_msg'
		};

	function Core(param){
		this._init();
        this._Msgclear();
	}

	S.augment(Core, {
		_init: function(){
			this._buildEvt();
		},
        /**
         * 提示信息消失
         * @return {[type]} [description]
         */
        _Msgclear: function(){
            var that = this;
                msg = S.one(el.msgEl);
            if(msg){
                window.setTimeout(function(){
                    $(el.msgEl).remove();
                },1500);
            }
        },
		_buildEvt:function(){
			var 
				that = this;
			
            //提交表单
			on(el.submitTrigger, 'tap', function(){
                    that._submitForm();
                    return false;
			});
		},                 
        
        /**
         * 提交表单
         * @return {[type]} [description]
         */
        _submitForm: function(){
            var
                that = this,
                form = get(el.submitForm);
                textarea = DOM.val(el.messageAddEl);

            if(textarea == ""){
                DOM.text(el.errorEl, '留言内容不能为空，请重新输入');
                DOM.show(el.errorEl);
                return false;                
            }else{
                form.submit();
            }
        }
	});
	return Core;	
},{
    requires:[
        'mod/ext'
    ]
});		