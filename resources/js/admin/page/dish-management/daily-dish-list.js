/*-------------------------------------------------------------------
* @Description:     菜品管理-每日菜品列表页
* @Version:         1.0.0
* @author:          daiql(1649500603@qq.com)
* @date             2016.08.30
* ==NOTES:=============================================
* v1.0.0(2016.08.30):
     初始生成
* --------------------------------------------------------------------*/
KISSY.add('page/dish-management/daily-dish-list', function(S, List){
	PW.namespace('page.DishManagement.DailyDishList');
	PW.page.DishManagement.DailyDishList = function(param){
		new List(param);
	}
}, {
	requires: [
		'daily-dish/list'
	]
});
/*---------------------------------------------------------------*/
KISSY.add('daily-dish/list', function(S){
	var
		$ = S.all, DOM = S.DOM, get = DOM.get, query = DOM.query,
		on = S.Event.on, delegate = S.Event.delegate,
		Pagination = PW.mod.Pagination,
		config = {},
		el = {
			//搜索表单
			searchForm: '.J_searchForm'
		};

	function List(param){
		this.opts = S.merge(config, param);
		this.pagination;
		this._init();
	}

	S.augment(List, {
		_init: function(){
			this._initPagi();
			this._initSelect();
			this._addEventListener();
		},
		/**
		 * 添加事件监听
		 */
		_addEventListener: function(){
			var
				that = this;

			on(el.searchForm, 'submit', function(){
				that._reloadPagi();
				return false;
			});
		},
		/**
		 * 初始化分页
		 * @return {[type]} [description]
		 */
		_initPagi: function(){
			var
				that = this,
				opts = that.opts;

			that.pagination = Pagination.client(opts);
		},
		/**
		 * 初始化多选
		 * @return {[type]} [description]
		 */
		_initSelect: function(){
            var
                that = this;

            PW.mod.Selectall.client({
                root: el.searchForm,
                select: '.J_storeName',
                toggleTrigger: '.J_selectAll'
            });
        },
        /**
         * 重新加载分页
         * @return {[type]} [description]
         */
		_reloadPagi: function(){
			var
				that = this,
				param = {
					extraParam: DOM.serialize(el.searchForm)
				},
				opts = S.mix(that.opts, param);

			that.pagination.reload(opts);
		}
	});

	return List;
}, {
	requires: [
		'mod/pagination',
		'mod/selectall'
	]
});