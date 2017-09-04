/*-----------------------------------------------------------------------------
 * @Description:     基本信息管理-用户信息管理
 * @Version:         1.0.0
 * @author:          hj(435043636@qq.com)
 * @date             2016.8.30
 * ==NOTES:=============================================
 * v1.0.0 2016.8.30:
   初始生成
   2016.10.28 提示信息修复--zhangxiangnan(571946808@qq.com)
 * ---------------------------------------------------------------------------*/
KISSY.add('page/basic-information-management/user-information-list', function(S, List){
	PW.namespace('page.UserManagement.List');
	PW.page.UserManagement.List = function(param){
		new List(param);
	};
},{
	requires:[
		'user-management/list'
	]
});
/* ---------------------------------------------------------------------------*/
KISSY.add('user-management/list', function(S){
	var 
		DOM = S.DOM,
		$=S.all,
		delegate = S.Event.delegate,
		Pagination = PW.mod.Pagination,
		UserManagementIO = PW.io.BasicInfoManagement.userManagement,
		Dialog = PW.widget.Dialog,
		Selectall = PW.mod.Selectall,
		config = {
		},
		el = {
			//所属店面显示区域
			storeGroupEl: '.J_storeGroup',
			//全选用户类型触发器
			selectAllTypeTrigger: '.J_selectAllType',
			//全选所属店面触发器
			selectAllStoreTrigger: '.J_selectAllStore',
			//用户类型
			userTypeEl: '.J_userType',
			//店面
			chooseStoreEl: '.J_chooseStore',
			//店面Inps
			chooseStoreGroups: '.J_chooseStoreGroups input',
			//搜索表单
			searchForm: '.J_searchForm',
			//操作表单
			operForm: '.J_operForm',
			//控制是否显示“所属店面”触发器
			showStoreTrigger: '.J_controlShowStore',
			//搜索触发器
			searchTrigger: '.J_search',
			//删除触发器
			delTrigger: '.J_del',
			//提示条
            tipContainer: '.J_tip'
		},
		DATA_USER_ID = 'data-user-id';

	function List(param){
		this.opts = S.merge(config, param);
		this.pagination;
		this._init();
	}
	S.augment(List, {
		_init: function(){
			this._selectAll();
			this._initPagi();
			this._buildEvt();
			this._hideTip();
		},
		_buildEvt: function(){
			var 
				that = this;
			//控制是否显示“所属店面”
			delegate(document, 'click', el.showStoreTrigger, function () {
				that._consoleStoreShow();
			});
			//全选时控制是否显示“所属店面”
			delegate(document, 'click', el.selectAllTypeTrigger, function () {
				that._consoleStoreShow();
			});
			//搜索
			on(el.searchForm, 'submit', function(){
				that._searchReloadPagi();
				return false;   //阻止表单提交
			});
			//删除用户
			delegate(document, 'click', el.delTrigger, function(e){
				that._del(e.target);
			});
		},
		/**
		 * 提示信息隐藏
		 * @private
		 */
		_hideTip: function(){
			var
				that = this,
				tipEl = S.one(el.tipContainer);

			if(tipEl){
				setTimeout(function(){
					DOM.remove(el.tipContainer);
				}, 2000);
			}
		},
		/**
		 * 初始化分页
		 * @private
         */
		_initPagi: function(){
			var
				that = this,
				opts = that.opts;
			that.pagination = Pagination.client(opts);
		},
		/**
		 * 搜索刷页
		 * @private
         */
		_searchReloadPagi: function () {
			var
				that = this,
				data = DOM.serialize(el.searchForm);

			opts = S.mix(that.opts, {
				extraParam: data
			});
			that.pagination.reload(opts);
		},
		/**
		 * 用户类型全选
		 * @private
		 */
		_selectAll: function () {
		    Selectall.client({
		        root: el.searchForm,
		        select: el.userTypeEl,
		        toggleTrigger: el.selectAllTypeTrigger
		    });
		},
		/**
		 * 控制是否显示“店面”
		 * @private
		 */
		_consoleStoreShow: function () {
			var
				showStoreTriggerEl = DOM.get(el.showStoreTrigger),
				isAllChooseEl = DOM.get(el.selectAllTypeTrigger),
				chooseStoreGroupsEl = DOM.query(el.chooseStoreGroups);

			if(showStoreTriggerEl.checked == true && isAllChooseEl.checked == false){
				//展开
				$(el.storeGroupEl).removeClass('hidden');
				S.each(chooseStoreGroupsEl, function (item) {
					item.checked = true;
				});
				Selectall.client({
					root: el.searchForm,
					select: el.chooseStoreEl,
					toggleTrigger: el.selectAllStoreTrigger
				});
			}else{
				//收起
				S.each(chooseStoreGroupsEl, function (item) {
					item.checked = false;
				});
				$(el.storeGroupEl).addClass('hidden');
			}
		},
		/**
		 * 删除用户
		 * @param e
         * @private
         */
		_del: function(e){
			var
				that =  this,
				tr = $(e).parent('tr'),
				id = $(tr).attr(DATA_USER_ID);

			Dialog.confirm("确定要删除该用户信息吗？", function(){
				//发送id ajax
				UserManagementIO.delUserInfo({
					id: id
				}, function(rs, errMsg){
					if(rs){
						that.pagination.reload(that.opts);
						Dialog.alert("删除成功！");
					}else{
						Dialog.alert(errMsg);
					}
				});
			})
		}
	});
	return List;
},{
	requires:[
		'mod/pagination',
		'widget/dialog',
		'mod/selectall',
		'pio/basic-information-management/user-management'
	]
});

