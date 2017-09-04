/*-----------------------------------------------------------------------------
* @Description:     店面管理-店面管理列表
* @Version:         2.0.0
* @author:          lily(529116421@qq.com)
* @date             2016.9.2
* ==NOTES:=============================================
* v1.0.0(2016.9.2):
     初始生成
* ---------------------------------------------------------------------------*/

KISSY.add('page/basic-information-management/store-management-list', function(S, List){
	PW.namespace('page.BasicInfoManagement.StoreManagement.List');
	PW.page.BasicInfoManagement.StoreManagement.List = function(param){
		new List(param);
	};
},{
	requires: [
		'store-management/list'
	]
});

KISSY.add('store-management/list', function(S){
	var
		DOM = S.DOM, $ = S.all, on = S.Event.on, delegate = S.Event.delegate,
		Dialog = PW.widget.Dialog,
		BasicInfoManagementIO = PW.io.BasicInfoManagement,
		config = {
			triggerEl: '',
			placement: ''
		},
		el = {
			// 数据存放容器
			dataContainer: '#J_template',
			// 删除触发器
			delTrigger: '.J_del',
			// 状态转换触发器
			convertTrigger: '.J_convert',
			// 店面状态
			statusEl: '.J_status',
			//提示元素
        	tipEl: '.J_tip'
		},
		// id
		DATA_STORE_ID = 'data-store-id',
		// 店面状态
		DATA_STORE_STATUS = 'data-store-status',
		TIP = [
			'确定删除此店面吗？',
			'确定启用此店面吗？',
			'确定禁用此店面吗？',
			'暂无数据！'
		],
		SUCCESS_TIP = [
			'删除成功！',
			'启用成功！',
			'禁用成功！'
		];

	function List(param){
		this.opts = S.merge(config, param);
		this._init();
	}	

	S.augment(List, {
		_init: function(){
			this._bulidEvt();
			this._tip();
			this._hideTip();
		},
		_bulidEvt: function(){
			var
				that = this;
			// 删除
			delegate(document, 'click', el.delTrigger, function(e){
				that._delStore(e.target);
			});
			// 状态转换
			delegate(document, 'click', el.convertTrigger, function(e){
				that._convertStore(e.currentTarget);
			});
		},
		/**
		 * 转换店面状态
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_convertStore: function(e){
			var
				that = this,
				tr = DOM.parent(e, 'tr'),
				id = DOM.attr(tr, DATA_STORE_ID),
				statusEl = DOM.get(el.statusEl, tr),
				status = DOM.attr(statusEl, DATA_STORE_STATUS),
				tipObj = that._getTip(status);
			
			Dialog.confirm(tipObj.tip, function(){
				BasicInfoManagementIO.convertStoreStatus({
					id: id,
					status: tipObj.newStatus
				}, function(rs, errMsg){
					if(rs){
						Dialog.alert(tipObj.successTip);
						that._updateStoreStatus(e, statusEl, tipObj.newStatus);
					}else{
						Dialog.alert(errMsg);
					}
				});
			});
		},
		/**
		 * 获取相应提示和新状态
		 * @param  {[type]} status [description]
		 * @return {[type]}        [description]
		 */
		_getTip: function(status){
			var
				that = this,
				tip,
				successTip,
				newStatus;

			if(status == 1){
				tip = TIP[2];
				successTip = SUCCESS_TIP[2];
				newStatus = 2;
			}else if(status == 2){
				tip = TIP[1];
				successTip = SUCCESS_TIP[1];
				newStatus = 1;
			}
			return {
				// 提示框内容
				tip: tip,
				// 操作成功后的提示内容
				successTip: successTip,
				// 新状态
				newStatus: newStatus
			}
		},
		/**
		 * 更新店面状态
		 * @param  {[type]} e         [description]
		 * @param  {[type]} statusEl  [description]
		 * @param  {[type]} newStatus [description]
		 * @return {[type]}           [description]
		 */
		_updateStoreStatus: function(triggerEl, statusEl, newStatus){
			var
				that = this,
				convertText,
				triggerText;
			if(newStatus == 2){
				convertText = '禁用';
				triggerText = '<i class="fa fa-check"></i>&nbsp;启用';
			}else if(newStatus == 1){
				convertText = '启用';
				triggerText = '<i class="fa fa-circle"></i>&nbsp;禁用';
			}
			DOM.html(statusEl, convertText);
			DOM.html(triggerEl, triggerText);
			DOM.attr(statusEl, DATA_STORE_STATUS, newStatus);
		},
		/**
		 * 删除店面
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_delStore: function(e){
			var
				that = this,
				tr = DOM.parent(e, 'tr'),
				id = DOM.attr(tr, DATA_STORE_ID);

			Dialog.confirm(TIP[0], function(){
				BasicInfoManagementIO.delStore({
					id: id
				}, function(rs, errMsg){
					if(rs){
						DOM.remove(tr);
						Dialog.alert(SUCCESS_TIP[0]);
						that._tip();
					}else{
						Dialog.alert(errMsg);
					}
				});
			});
		},
		/**
		 * 隐藏提示信息
		 * @return {[type]} [description]
		 */
		_hideTip: function(){
			var
				that = this,
				msg = S.one(el.tipEl);
			
			if( msg ){
				setTimeout(function(){
					DOM.remove(el.tipEl);
				}, 2000);
			}
		},
		/**
		 * 暂无内容提示
		 * @return {[type]} [description]
		 */
		_tip: function(){
			var 
				that = this,
				trArray = DOM.query('tr', el.dataContainer),
				newTr = '<tr class="J_tipMessage"><td class="text-center" colspan="10">暂无内容</td></tr>',
				count = $(trArray).length;
			if(count == 0){
				$(el.dataContainer).append($(newTr));
			}else{
				DOM.remove('.J_tipMessage');
			}
		}
	});

	return List;
},{
	requires: [
		'widget/dialog',
		'pio/basic-information-management/store-management-list'
	]
});