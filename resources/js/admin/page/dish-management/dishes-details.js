/*-------------------------------------------------------------------
* @Description:     菜品管理-每日菜品
* @Version:         1.0.0
* @author:          daiql(1649500603@qq.com)
* @date             2016.08.31
* ==NOTES:=============================================
* v1.0.0(2016.08.31):
     初始生成
* --------------------------------------------------------------------*/
KISSY.add('page/dish-management/dishes-details', function(S, Core){
	PW.namespace('page.DishManagement.DishesDetails');
	PW.page.DishManagement.DishesDetails = function(param){
		new Core(param);
	}
}, {
	requires: [
		'dishes-details/core'
	]
});
/*---------------------------------------------------------------*/
KISSY.add('dishes-details/core', function(S){
	var
		$ = S.all, DOM = S.DOM, get = DOM.get, query = DOM.query,
		on = S.Event.on, delegate = S.Event.delegate,
		config = {},
		el = {
			//菜品分类元素
			dishTypeEl: '.J_dishType',
			//跨行单元格元素
			rowspanEl: 'td[rowspan]'
		};

	function Core(param){
		this.opts = S.merge(config, param);
		this._init();
	}

	S.augment(Core, {
		_init: function(){
			this._initRowspans();
		},
		/**
		 * 初始化单元格跨行
		 * @return {[type]} [description]
		 */
		_initRowspans: function(){
			var
				that = this,
				dishTypeEls = query(el.dishTypeEl);

			S.each(dishTypeEls, function(elem){
				that._setRowspans(elem);
			});
		},
		/**
		 * 设置单元格跨行
		 * @param {[type]} ev [description]
		 */
		_setRowspans: function(ev){
			var
				that = this,
				next = DOM.next(ev),
				rowspanEl = get(el.rowspanEl, ev),
				len = 1;

			while( next && !DOM.hasClass(next, 'J_dishType') ){
				next = DOM.next(next);
				len ++;
			}
			DOM.attr(rowspanEl, 'rowspan', len);
		}
	});

	return Core;
}, {
	requires: [
		'mod/ext'
	]
})