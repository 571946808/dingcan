/*-----------------------------------------------------------------------------
 * @Description:     留言详情
 * @Version:         1.0.0
 * @author:          yud(862669640@qq.com)
 * @date             2016.10.14
 * ==NOTES:=============================================
 * v1.0.0(2016.10.14):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add("page/my/message-details", function(S, Core){
 	PW.namespace("page.MessageDetails");
 	PW.page.MessageDetails = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'message-details/core'
 	]
 });
/********************************************************************/
KISSY.add('message-details/core', function(S){
	var 
		DOM = S.DOM, $ = S.all, get = DOM.get,
        on = S.Event.on,
		el = {
			//表单元素
			submitForm: '.J_submitForm',
            //回复信息
            replyMessageEl: '.J_replyMessage',
            //错误提示El
            errorEl: '.J_error',
			//提交按钮
			submitTrigger: '.J_sendBtn',
            //注册成功的提示
            msgEl: '.J_msg'
		};

	function Core(param){
		this._init();
	}

	S.augment(Core, {
		_init: function(){
			this._buildEvt();
		},
        
		_buildEvt:function(){
			var 
				that = this;
			
            //提交表单
			on(el.submitTrigger, 'tap', function(){
                that._submitForm();
			});
		},                 
        
        /**
         * 提交表单
         * @return {[type]} [description]
         */
        _submitForm: function(){
            var
                that = this,
                form = get(el.submitForm),
                input = DOM.val(el.replyMessageEl);
            console.log(form);
            if(input == ""){
                DOM.text(el.errorEl, '回复内容不能为空');
                DOM.show(el.errorEl);             
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