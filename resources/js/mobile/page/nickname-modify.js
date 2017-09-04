 /*-----------------------------------------------------------------------------
 * @Description:     修改昵称
 * @Version:         1.0.0
 * @author:          yud(862669640@qq.com)
 * @date             2016.10.12
 * ==NOTES:=============================================
 * v1.0.0(2016.09.12):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add("page/nickname-modify", function(S, Core){
 	PW.namespace("page.NicknameModify");
 	PW.page.NicknameModify = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'nickname-modify/core'
 	]
 });
/********************************************************************/
KISSY.add('nickname-modify/core', function(S){
	var 
		DOM = S.DOM, $ = S.all, get = DOM.get,
        on = S.Event.on,
		el = {
			//表单元素
			submitForm: '.J_submitForm',
            //昵称元素
            nicknameEl: '.J_nickname',
			//注册按钮
			submitTrigger: '.J_submitBtn',
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
			//验证昵称
            on(el.nicknameEl, 'keyup', function(){
                that._validNickname();
            }); 
			
            //提交表单
			on(el.submitTrigger, 'tap', function(){
                    that._submitForm();
			});
		},
                 
		/**
            * 验证昵称
            * @return {[type]} [description]
         */
        _validNickname: function(){
            var
                that = this,
                input = DOM.val(el.nicknameEl);

            if(input == ""){
                $(el.submitTrigger).attr("disabled","true");
                DOM.removeClass(el.submitTrigger, "to-blue");
                DOM.addClass(el.submitTrigger, "to-grey");
                return false;
            }else{
                $(el.submitTrigger).attr("disabled","false");
                DOM.removeClass(el.submitTrigger, "to-grey");
                DOM.addClass(el.submitTrigger, "to-blue");
                return true;
            }
        },
        
        /**
         * 提交表单
         * @return {[type]} [description]
         */
        _submitForm: function(){
            var
                that = this,
                form = get(el.submitForm);

            if(that._validNickname()){
                form.submit();
            }else{
                that._validNickname();
            }
        }
	});
	return Core;	
},{
    requires:[
        'mod/ext',
    ]
});		