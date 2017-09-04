/*-----------------------------------------------------------------------------
* @Description:     餐台二维码列表页
* @Version:         1.0.0
* @author:          hujun(435043636@qq.com)
* @date             2015.10.21
* ==NOTES:=============================================
* v1.0.0(2015.10.28):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/table-two-dimension-code', function(S, List){
	PW.namespace('page.CodeManagement');
	PW.page.CodeManagement = function(param){
		new List(param);
	};
},{
	requires: [
		'table-two-dimension-code/list'
	]
});

KISSY.add('table-two-dimension-code/list',function(S){
	var	
		DOM = S.DOM, $=S.all, 
		on = S.Event.on, delegate = S.Event.delegate,
		Defender = PW.mod.Defender,
		Dialog = PW.widget.Dialog,
		config = {
		},
		el = {
			//操作表单
			form: '.J_webDomain',
			//生成二维码按钮
			createCodeTrigger:"#J_createBtn",
			//复制按钮
			copyTrigger:".J_copyBtn",
            //提示信息
            msgEl: '.J_msg'
		};
		
	function List(param){
		this.opts = S.merge(config, param);
		this._validForm;
		this._init();
	}

	S.augment(List, {
		_init: function(){
            this._msgClear();
            this._bulidEvt();
            this._validForm = Defender.client(el.form, {});
        },
        /**
         * 定时清除提示信息
         * @return {[type]} [description]
         */
        _msgClear: function(){
            var 
                that = this,
                msg = S.one(el.msgEl);
            if(msg){
                window.setTimeout(function(){
                    $(el.msgEl).remove();
                }, 2000);
            }
        },
        _bulidEvt: function(){
        	var 
        		that = this;
        	//生成二维码按钮触发
        	on(el.createCodeTrigger, 'click', function(){
				that._submitHandler();
			});	
			on(el.createCodeTrigger,'keydown',function(e){
				if(e.keyCode==13){
					that._submitHandler();
				}else{
					return false;
				}
			});
			// 复制
			delegate(document, 'click', el.copyTrigger, function(e){
				that._copyToClipboard(e.target);
			});
        },
        _submitHandler : function(){
            var 
                that = this;
                form = DOM.get(el.form);

            that._validForm.validAll(function(rs){
				if (rs){
					form.submit();
				}else{
					return false;
				}
			})     
        },
        _copyToClipboard : function(e){
            var 
                that = this,
				inputEl = DOM.prev(e, 'input'),
				inputDOM = document.createElement("input");
			
			// 设置元素内容
      		inputDOM.setAttribute("value", inputEl.value);

			// 将元素插入页面进行调用
      		document.body.appendChild(inputDOM);

			// 选择并复制
			inputDOM.select();
			document.execCommand("copy");

			// 删除创建元素
			document.body.removeChild(inputDOM);

			Dialog.alert("复制成功!");
        }
	});
	return List;
},{
	requires:[	
		'mod/defender',
		'widget/dialog'
	]
});

