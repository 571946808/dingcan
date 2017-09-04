/*-------------------------------------------------------------------
* @Description:     菜品管理-每日菜品添加
* @Version:         1.0.0
* @author:          daiql(1649500603@qq.com)
* @date             2016.08.30
* ==NOTES:=============================================
* v1.0.0(2016.08.30):
     初始生成
  (2016.09.12):-开启点餐功能  -by hj
  (2016.10.11):+录入菜品后提交菜品功能  -by hj
* --------------------------------------------------------------------*/
KISSY.add('page/dish-management/daily-dish-add-input', function(S, Add){
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
		DailyDishIO = PW.pio.DishManagement.DailyDishAdd,
		Defender = PW.mod.Defender,
		Dialog = PW.widget.Dialog,
		Juicer = PW.mod.Juicer,
		config = {},
		el = {
			//店面触发器
			storeTrigger: '.J_storeBtn',
			//当前店面显示元素
			currentStoreEl: '.J_currentStore',
			//菜品分类模板
			dishClassifyTpl: '#J_dishClassifyTpl',
			//菜品分类渲染元素
			dishClassifyRenderEl: '.J_dishClassifyRender',
			//添加菜品模板
			addDishTpl: '#addDishTpl',
			//添加表单
			addForm: '.J_addForm',
			//添加菜品触发器
			addTrigger: '.J_addBtn',
			//编辑菜品触发器
			editTrigger: '.J_editBtn',
			//删除菜品触发器
			delTrigger: '.J_delBtn',
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
			//隐藏storeId
			storeId: '.storeId',
			//提交
			submitTrigger: '.J_submit',
			//状态提示：
			statusTipEl: '.J_statusTip'
		},
		DATA_STORE_ID = 'data-store-id',
		DATA_DISH_ID = 'data-dish-id',
		DATA_DISH_TAG_ID = 'data-dish-tag-id';

	function Add(param){
		this.opts = S.merge(config, param);
		this.dialogTitle = '';
		this.UpdateStatus = 0;
		this.defender;
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

			delegate(document, 'click', el.addTrigger, function(e){
				that.dialogTitle = '添加';
				that.UpdateStatus = 0;
				that._openDialog(e.currentTarget);
			});

			delegate(document, 'click', el.editTrigger, function(e){
				that.dialogTitle = '编辑';
				that.UpdateStatus = 1;
				that._openDialog(e.currentTarget);
			});

			delegate(document, 'click', el.delTrigger, function(e){
				that._sendDelReq(e.currentTarget);
			});

			delegate(document, 'click', el.submitTrigger, function (e) {
				that._sendSubmitAjax(e.target);
			});
		},
		/**
		 * 提交订单时发送ajax请求
		 * @private
         */
		_sendSubmitAjax: function (ev) {
			var
				that = this,
				id = DOM.val(el.idEl),
				storeId = DOM.val(el.storeId);
				labelEl = DOM.next(ev, 'label');

			DailyDishIO.submitAddDish({
				storeId: storeId,
				id: id
			}, function (rs, data, errMsg) {
				if(rs){
					Dialog.alert("您已成功提交当前录入的菜品", function () {
						DOM.text(el.statusTipEl, data.auditStatusStr);
						DOM.attr(ev, 'disabled', 'disabled');
						DOM.text(labelEl, '( 当前所添加菜品已完成提交，请等待审核 )');
						DOM.addClass(el.addTrigger, 'disabled');
						DOM.addClass(el.editTrigger, 'disabled');
						DOM.addClass(el.delTrigger, 'disabled');
					});
				}else{
					Dialog.alert(errMsg);
				}
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
		 * 打开对话框
		 * @param  {[type]} ev [description]
		 * @return {[type]}    [description]
		 */
		_openDialog: function(ev){
			var
				that = this,
				addDishTpl = DOM.html(el.addDishTpl),
				form,
				oldData,
				renderStr,
				settings = {
					title: that.dialogTitle + '菜品',
					header: true,
					width: 800,
					top: 100,
					hasAutoScroll: true,
					footer: {
						btns: [
							{
								text: '确定',
								clickHandler: function(e, me){
									that._validForm(ev, me);
								}
							},
							{
								text: '取消',
								clickHandler: function(e, me){
									me.close();
								}
							}
						]
					},
					afterOpenHandler: function(e, me){
						that.defender = Defender.client(el.addForm, {});
					}
                };

            if(that.UpdateStatus == 0){
            	renderStr = Juicer.client(addDishTpl, {
            		list: null
            	});
            	Dialog.alert(renderStr, function(){}, settings);
            }else{
				form = DOM.parent(ev, 2);
            	oldData = DOM.serialize(form);
            	renderStr = Juicer.client(addDishTpl, {
            		list: oldData
            	});
            	Dialog.alert(renderStr, function(){}, settings);
            }
		},
		/**
		 * 验证表单
		 * @param  {[type]} ev [description]
		 * @param  {[type]} me [description]
		 * @return {[type]}    [description]
		 */
		_validForm: function(ev, me){
			var
				that = this;

			that.defender.validAll(function(rs){
				if(rs){
					if(that.UpdateStatus == 0){
						that._sendAddDishInfo(ev, me);
					}else{
						that._sendEditDishInfo(me);
					}
				}else{
					return false;
				}
			});
		},
		/**
		 * 发送添加的菜品信息
		 * @param  {[type]} ev [description]
		 * @param  {[type]} me [description]
		 * @return {[type]}    [description]
		 */
		_sendAddDishInfo: function(ev, me){
			var
				that = this,
				dishTagEl = DOM.parent(ev, 2),
				dishTagId = DOM.attr(dishTagEl, DATA_DISH_TAG_ID),
				storeId = DOM.attr(el.currentStoreEl, DATA_STORE_ID);
				data = DOM.serialize(el.addForm);

			S.mix(data, {
				storeId: storeId,
				dishTagId: dishTagId
			});
			
			DailyDishIO.sendAddDishInfo(data, function(rs, errMsg){
				if(rs){
					that._getStoreDishList(null, storeId);
					me.close();
					Dialog.alert('添加成功！');
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 发送编辑的菜品信息
		 * @param  {[type]} me [description]
		 * @return {[type]}    [description]
		 */
		_sendEditDishInfo: function(me){
			var
				that = this,
				data = DOM.serialize(el.addForm),
				storeId = DOM.attr(el.currentStoreEl, DATA_STORE_ID);
			
			DailyDishIO.sendEditDishInfo(data, function(rs, errMsg){
				if(rs){
					that._getStoreDishList(null, storeId);
					me.close();
					Dialog.alert('编辑成功！');
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 发送删除菜品的请求
		 * @param  {[type]} ev [description]
		 * @return {[type]}    [description]
		 */
		_sendDelReq: function(ev){
			var
				that = this,
				trEl = DOM.parent(ev, 2),
				id = DOM.attr(trEl, DATA_DISH_ID);
			
			DailyDishIO.delDish({id: id}, function(rs, errMsg){
				if(rs){
					that._removeDish(ev);
					Dialog.alert('删除成功！');
				}else{
					Dialog.alert(errMsg);
				}
			});
		},
		/**
		 * 删除菜品
		 * @param  {[type]} ev [description]
		 * @return {[type]}    [description]
		 */
		_removeDish: function(ev){
			var
				that = this,
				trEl = DOM.parent(ev, 2),
				tbodyEl = DOM.parent(trEl),
				trs = DOM.children(tbodyEl),
				tipEl = DOM.create('<tr><td colspan="4" class="no-dish">此分类下暂无菜品！</td></tr>');
			
			if(trs.length == 1){
				DOM.remove(trEl);
				DOM.append(tipEl, tbodyEl);
			}else{
				DOM.remove(trEl);
			}
		}
	});

	return Add;
}, {
	requires: [
        'mod/juicer',
        'mod/defender',
        'widget/dialog',
		'pio/dish-management/daily-dish-input'
	]
});