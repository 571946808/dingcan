/*-------------------------------------------------------------------
* @Description:     菜品管理-每日菜品添加
* @Version:         1.0.0
* @author:          daiql(1649500603@qq.com)
* @date             2016.08.30
* ==NOTES:=============================================
* v1.0.0(2016.08.30):
     初始生成
  (2016.09.12):添加开启点餐功能
* --------------------------------------------------------------------*/
KISSY.add('page/dish-management/daily-dish-add', function(S, Add){
	PW.namespace('page.DishManagement.DailyDishAdd');
	PW.page.DishManagement.DailyDishAdd = function(param){
		new Add(param);
	}
}, {
	requires: [
		'daily-dish/add'
	]
});
/*---------------------------------------------------------------*/
KISSY.add('daily-dish/add', function(S){
	var
		$ = S.all, DOM = S.DOM, get = DOM.get, query = DOM.query,
		on = S.Event.on, delegate = S.Event.delegate,
		DailyDishIO = PW.pio.DishManagement.DailyDish,
		Dialog = PW.widget.Dialog,
		Juicer = PW.mod.Juicer,
		config = {},
		el = {
			//店面触发器
			storeTrigger: '.J_storeBtn',
			//选择审核状态触发器
			checkTrigger: '.J_check',
			//当前店面显示元素
			currentStoreEl: '.J_currentStore',
			//菜品分类模板
			dishClassifyTpl: '#J_dishClassifyTpl',
			//菜品分类渲染元素
			dishClassifyRenderEl: '.J_dishClassifyRender',
			//当前店面元素
			currentStoreEl: '.J_currentStore',
			//当前时间元素
			currentDateEl: '.J_date',
			//当前星期元素
			currentWeekEl: '.J_week',
			//是否开启点餐
			isCanOrderBtn: '.isCanOrder input',
			//隐藏idInp
			idEl: '.idInp',
			//显示状态
			statusTipEl: '.J_statusTip'
		},
		DATA_STORE_ID = 'data-store-id',
		TIP = ['','','','您已将审核状态设置为不通过！', '您已将审核状态设置为通过！'];

	function Add(param){
		this.opts = S.merge(config, param);
		this._init();
	}

	S.augment(Add, {
		_init: function(){
			this._initData();
			this._addEventListener();
		},
		_addEventListener: function(){
			var
				that = this;

			on(el.storeTrigger, 'click', function(e){
				that._getStoreDishList(e.currentTarget, null);
			});

			delegate(document, 'click', el.isCanOrderBtn, function (e) {
				that._controlCanOrder(e.target);
			});

			delegate(document, 'change', el.checkTrigger, function (e) {
				that._check(e.target);
			});
		},
		_initData: function(){
			var
				that = this,
				tbodyEls = query('tbody'),
				trs,
				tipStr = '<tr><td colspan="4" class="no-dish">此分类下暂无菜品！</td></tr>',
				tipEl;
			
			S.each(tbodyEls, function(elem){
				trs = DOM.children(elem);
				if(trs.length == 0){
					tipEl = DOM.create(tipStr);
					DOM.append(tipEl, elem);
				}
			});
		},
		/**
		 * 点击某个店面，获取该店面的菜品列表
		 * @param  {[type]} ev      [description]
		 * @param  {[type]} storeId [description]
		 * @return {[type]}         [description]
		 */
		_getStoreDishList: function(ev, storeId){
			var
				that = this,
				storeId = storeId || DOM.attr(ev, DATA_STORE_ID);

			DailyDishIO.getStoreDishList({storeId: storeId}, function(rs, data, errMsg){
				if(rs){
					that._renderStoreDishList(ev, data);
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 渲染菜品列表
		 * @param  {[type]} ev   [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		_renderStoreDishList: function(ev, data){
			var
				that = this,
				storeId,
				storeName,
				currentStoreEl = get(el.currentStoreEl),
				dishClassifyTpl = DOM.html(el.dishClassifyTpl),
				listStr = Juicer.client(dishClassifyTpl, {
					list: data
				});

			if(ev){
				storeId = DOM.attr(ev, DATA_STORE_ID);
				storeName = S.trim(DOM.text(ev));
				DOM.attr(currentStoreEl, DATA_STORE_ID, storeId);
				DOM.text(currentStoreEl, storeName);
			}
			DOM.text(el.currentDateEl, data.date);
			DOM.text(el.currentWeekEl, data.week);
			DOM.html(el.dishClassifyRenderEl, listStr);
		},
		/**
		 * 控制是否可点餐
		 * @param e
		 * @private
		 */
		_controlCanOrder: function (e) {
			var
				that = this,
				siblingEl = DOM.siblings(e,'input'),
				tip = DOM.text(DOM.next(e, 'span')),
				id = DOM.val(el.idEl),
				oldStatus,
				old;

			DailyDishIO.isCanOrder({
				id: Number(id),
				canOrder: e.value
			}, function (rs, data, errMsg) {
				if(rs){
					Dialog.alert("您已成功设置"+ tip + '点餐！', function () {
						DOM.attr(e, 'checked', 'checked');
						DOM.removeAttr(siblingEl, 'checked');
					});
					that._controlEvent(tip);
				}else{
					Dialog.alert(errMsg, function () {
						old = data.oldCanOrder;
						oldStatus = DOM.filter(el.isCanOrderBtn, function (item) {
							return DOM.val(item) == old;
						});
						DOM.attr(oldStatus[0], 'checked', 'checked');
						DOM.removeAttr(DOM.siblings(oldStatus[0], 'input')[0], 'checked');
					});
				}
			});
		},
		/**
		 * 点击开启，禁用添加、删除和编辑功能；点击关闭，开启添加、删除和编辑功能
		 * @param tip
		 * @private
		 */
		_controlEvent: function (tip) {
			var
				that = this;

			if(S.trim(tip) == '开启'){
				DOM.attr(el.checkTrigger, 'disabled', 'disabled');
				DOM.addClass(el.addTrigger, 'disabled');
				DOM.addClass(el.editTrigger, 'disabled');
				DOM.addClass(el.delTrigger, 'disabled');
			}else{
				DOM.removeAttr(el.checkTrigger, 'disabled');
				DOM.removeClass(el.addTrigger, 'disabled');
				DOM.removeClass(el.editTrigger, 'disabled');
				DOM.removeClass(el.delTrigger, 'disabled');
			}
		},
		/**
		 * 选择审核状态
		 * @param ev
         * @private
         */
		_check: function (ev) {
			var
				that = this,
				id = DOM.val(el.idEl);

			if(ev.value != -1){
				DailyDishIO.sendStatusAjax({
					auditStatus: ev.value,
					id: id
				}, function (rs, data, errMsg) {
					if(rs){
						Dialog.alert(TIP[ev.value], function () {
							DOM.text(el.statusTipEl, data.auditStatusStr);
							that._controlCanOrderAfterAudit(ev);
						});
					}else{
						Dialog.alert(errMsg);
					}
				});
			}
		},
		/**
		 * 选择审核后，是否可使用启动点餐功能
		 * @param ev
         * @private
         */
		_controlCanOrderAfterAudit: function (ev) {
			var
				that = this;

			//如果审核通过，点餐管理功能可用
			if(ev.value == 4){
				if(DOM.hasAttr(el.isCanOrderBtn, 'disabled')){
					DOM.removeAttr(el.isCanOrderBtn, 'disabled');
				}
			}else{
				if(!DOM.hasAttr(el.isCanOrderBtn, 'disabled')){
					DOM.attr(el.isCanOrderBtn, 'disabled', 'disabled');
				}
			}
		}
	});
	return Add;
}, {
	requires: [
        'mod/juicer',
        'mod/defender',
        'widget/dialog',
		'pio/dish-management/daily-dish'
	]
});