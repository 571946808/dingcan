/*-----------------------------------------------------------------------------
 * @Description:     便利店端--订单详情
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.09.12
 * ==NOTES:=============================================
 * v1.0.0(2016.09.12):
 初始生成
 * ----------------------------------------------------------*/
KISSY.add('page/store/order-detail', function(S, Core){
	PW.namespace('page.Store.OrderDetail');
	PW.page.Store.OrderDetail =  function(param){
		new Core(param);
	}
}, {
	requires:[
		'order-detail/core'
	]
})

KISSY.add('order-detail/core', function(S){
	var
		DOM = S.DOM, $ = S.all,
		on = S.Event.on, delegate = S.Event.delegate,
		detach = S.Event.detach,
		OrderIO = PW.io.Store,
		el = {
			//删除触发器
			delTrigger: '.J_del',
			//确认触发器
			confirmTrigger: '.J_confirm',
			//页面container
			containerEl: '.container',
			//订单状态
			statusEl: '.J_status',
			//拒绝触发器
			refuseTrigger: '.J_refuse'
		},
		DATA_ORDER_ID = 'data-order-id';

	function Core(param){
		this._init();
	}
	S.augment(Core, {
		_init: function(){
			this._bulidEvt();
		},
		_bulidEvt: function(){
			var
				that = this,
				id = DOM.attr(el.containerEl, DATA_ORDER_ID);

			delegate(document, 'tap', el.delTrigger, function(){
				that._delOrder(id);
			});
			on(el.confirmTrigger, 'tap', function(){
				that._confirmOrder(id);
			});
			on(el.refuseTrigger, 'tap', function(){
				that._refuseOrder(id);
			})
		},
		/**
		 * 删除订单
		 * @return {[type]} [description]
		 */
		_delOrder: function(id){
			var
				that = this,
				respones = confirm('确定删除该订单？');

			if(respones){
				OrderIO.delOrder({id: id}, function(rs, errMsg){
					if(!rs){
						alert(errMsg);
					}
				});
			}
		},
		/**
		 * 确认订单
		 * @return {[type]} [description]
		 */
		_confirmOrder: function(id){
			var
				that = this,
				respones = confirm('确定完成该订单？');

			if(respones){
				OrderIO.confirmOrder({id: id}, function(rs, errMsg){
					if(rs){
						// DOM.text(el.statusEl, '已完成');
						// DOM.text(el.confirmTrigger, '已完成');
						// detach(el.confirmTrigger);
						// DOM.remove(el.refuseTrigger);
						// DOM.show(el.delTrigger);
						location.reload();
					}else{
						alert(errMsg);
					}
				});
			}
		},
		/**
		 * 拒绝订单
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		_refuseOrder: function(id){
			var
				that = this,
				respones = confirm('确定拒绝该订单？');

			if(respones){
				OrderIO.refuseOrder({id: id}, function(rs, errMsg){
					if(rs){
						location.reload();
					}else{
						alert(errMsg);
					}
				});
			}
		}
	})
	return Core;
}, {
	requires: [
		'mod/ext',
		'pio/store/order-detail'
	]
})