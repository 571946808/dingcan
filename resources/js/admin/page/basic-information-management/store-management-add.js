/*-----------------------------------------------------------------------------
* @Description:     店面管理-添加店面
* @Version:         2.0.0
* @author:          lily(529116421@qq.com)
* @date             2016.9.2
* ==NOTES:=============================================
* v1.0.0(2016.9.2):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add("page/basic-information-management/store-management-add", function(S,Add){
	PW.namespace("page.BasicInfoManagement.StoreManagementAdd");
	PW.page.BasicInfoManagement.StoreManagementAdd = function(param){
		new Add(param);
	}
},{
	requires: [
		'store-management/add'
	]
});
/*---------------------------------------------------------------------------*/
KISSY.add("store-management/add", function(S){
	var
		DOM = S.DOM, get = DOM.get, query = DOM.query, $ = S.all,
		on = S.Event.on,
		Defender = PW.mod.Defender,
		config = {},
		el = {
			//表单元素
			submitForm: '.J_submitForm',
			//提交触发器
			submitTrigger: '.J_submitBtn'
		};

	function Add(param){
		this.defender = Defender.client(el.submitForm, {});
		this.btn = DOM.data(el.submitTrigger, 'btn');
		this._init();
	}

	S.augment(Add, {
		_init: function(){
			this._addEventListener();
		},
		/**
		 * 添加事件监听
		 */
		_addEventListener: function(){
			var
				that = this;

			that.btn.on('loading',function(){
				that._valid();
				return false;
			});			
		},
		/**
		 * 提交表单
		 * @return {[type]} [description]
		 */
		_valid: function(){
			var
				that = this,
				form = get(el.submitForm);

			that.defender.validAll(function(rs){
				if(rs){
					setTimeout(function(){
						form.submit();
					},2000);
				}else{
					that.btn.reset();
					return false;
				}
			});
		}
	});
	return Add;
},{
	requires: [
		'mod/defender',
		'widget/btn'
	]
});