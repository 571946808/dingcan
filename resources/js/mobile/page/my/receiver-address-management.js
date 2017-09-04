/*-----------------------------------------------------------------------------
 * @Description:     地址管理
 * @Version:         1.0.0
 * @author:          yudan（862669640@qq.com）
 * @date             2016.09.14
 * ==NOTES:=============================================
 * v1.0.0(2016.09.14):
   初始生成
 	(2016.09.20)订单中选择地址js  ——by hj
 * ------------------------------------------------------------*/
 KISSY.add('page/my/receiver-address-management',function(S, Core, Choose){
 	PW.namespace('page.ReceiverAddressManagement');
 	PW.page.ReceiverAddressManagement = function(param){
 		new Core(param);
		new Choose(param);
 	}
 },{
 	requires:[
 		'receiver-address-management/core',
		'order-address-choose/choose'
 	]
 });
/*---------------------------------------------------------------------------*/
KISSY.add('receiver-address-management/core', function(S){
	var
		DOM = S.DOM,
		on = S.Event.on,
		ReceiverAddressIO = PW.io.ReceiverAddress,
		config = {},
		el = {
			// 复选框元素
			defaultEl: '.J_default',
			// 修改地址元素
			modifyEl: '.J_modify',
			//地址删除
			delTrigger: '.J_del',
			//ul
			addressListUl: '.address-list-container'
		},
		// 收货地址ID
		DATA_ADDRESS_ID = 'data-address-id';

	function Core(param){
		this._init();
	}

	S.augment(Core, {
		_init: function(){
			this._addEventListener();
		},
		/**
		 * 添加事件监听
		 */
		_addEventListener: function(){
			var
				that = this;
			//默认选中
			on(el.defaultEl, 'tap', function(e){
				that._defaultAddress(e.target);
			});
			// 删除
			on(el.delTrigger, 'tap', function(e){
                that._deleteAddress(e.target);
				e.stopPropagation();
			});
		},
		/**
		 * 删除收货地址
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_deleteAddress: function(e){
			var
				that = this,
				confirmDelAddress = confirm("确定删除该地址？"),
				liEls = DOM.parent(e, 'li'),
				id = DOM.attr(liEls, DATA_ADDRESS_ID);

			if(confirmDelAddress == true){
				ReceiverAddressIO.deleteAddress({
					id: id
				}, function(rs, errMsg){
					if(!rs){
						alert(errMsg);
					}else{
						DOM.remove(liEls);
					}
				});
			}
		},
		/**
		 * 设置默认收货地址
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_defaultAddress: function(e){
			var
				that = this,
				checked = DOM.prop(e, "checked"),
				liEls = DOM.parents(e, 'li'),
				checkedId = DOM.attr(liEls[0], DATA_ADDRESS_ID);
			if(checked == false){
				ReceiverAddressIO.defaultAddress({
					id: checkedId
				}, function(rs, errMsg){
					if(!rs){
						alert(errMsg);
					}else{
						alert('设置默认收货地址成功！');
						that._clearCheckboxCache();
						window.location.reload();
					}
				});
			}
		},
		/**
		 * 解决重刷页面后，checkbox仍有缓存的问题
		 * @private
         */
		_clearCheckboxCache:function () {
			var
				that = this,
				checkboxEls = query('input[type="checkbox"]', el.addressListUl),
				checkboxEl;

			for(var i = 0; i < checkboxEls.length; i++){
				checkboxEl = checkboxEls[i];
				DOM.removeAttr(checkboxEl, 'checked');
			}
		}
	});
	return Core;
},{
	requires: [
		'pio/address-management',
		'widget/btn'
	]
});
/**
 * 订餐中选择送餐地址
 */
KISSY.add('order-address-choose/choose', function (S) {
	var
		DOM = S.DOM,
		on = S.Event.on,
		ReceiverAddressIO = PW.io.ReceiverAddress,
		el = {
			//选中标记div
			choosedMarkEl: '.choosed-mark',
			//选择触发器（li元素）
			chooseTrigger: '.J_choose',
			//选择后跳转的地址
			afterChooseLinkEl: '.J_afterChooseLink'
		},
		// 选中地址
		DATA_CHOOSE_ID = 'data-choose-id';
	
	function Choose() {
		this._init();
	}
	S.augment(Choose, {
		_init: function () {
			this._buildEvent();
		},
		_buildEvent: function () {
			var
				that = this;
			on(el.chooseTrigger, 'tap', function (e) {
				that._choose(e.target);
			});
		},
		/**
		 * 选择送餐地址
		 * @param e
         * @private
         */
		_choose: function (e) {
			var
				liEl = DOM.parents(e, 'li'),
				choosedMarkEls = DOM.query(el.choosedMarkEl),
				choosedMarkEl = DOM.get(el.choosedMarkEl, liEl),
				id = DOM.attr(liEl, DATA_CHOOSE_ID),
				linkHref = DOM.attr(el.afterChooseLinkEl, 'href');

			ReceiverAddressIO.chooseAddress({
				id: id
			}, function (rs, errMsg) {
				if(rs){
					DOM.addClass(choosedMarkEls, 'hidden');
					DOM.removeClass(choosedMarkEl, 'hidden');
					window.location.href = linkHref;
				}else{
					alert(errMsg);
				}
			});
		}
	});
	return Choose;
},{
	requires: [
		'pio/address-management'
	]
});