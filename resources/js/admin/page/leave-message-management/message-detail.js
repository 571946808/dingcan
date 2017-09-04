/*-----------------------------------------------------------------------------
 * @Description:     留言详情
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.10.14
 * ==NOTES:=============================================
 * v1.0.0(2016.10.14):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add("page/leave-message-management/message-detail", function(S, Core){
 	PW.namespace("page.MessageDetail");
 	PW.page.MessageDetail = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'message-detail/core'
 	]
 });
/********************************************************************/
KISSY.add('message-detail/core', function(S){
	var 
		DOM = S.DOM, $ = S.all, get = DOM.get,
        on = S.Event.on,
        Defender = PW.mod.Defender,
		el = {
			//表单元素
			submitForm: '.J_searchForm',
            //错误提示El
            errorEl: '.J_error',
			//提交回复按钮
			submitTrigger: '.J_sendBtn'
		};
        
	function Core(param){
		this.defender = Defender.client(el.submitForm, {});
        this.btn = DOM.data(el.submitTrigger, 'btn');
        this._init();
	}

	S.augment(Core, {
		_init: function(){
			this._buildEvt();
		},
        
		_buildEvt: function(){
			var 
				that = this;
			
            //提交表单
            on(el.submitTrigger, 'click', function(e){
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

            that.defender.validAll(function(rs){
                if(rs){
                    form.submit();
                }else{
                    that.btn.reset();
                    return false;
                }
            });
        }
	});
	return Core;	
},{
    requires:[
        'mod/defender',
        'widget/btn',
        'mod/ext'
    ]
});		