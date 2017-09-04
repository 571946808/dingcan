/*-----------------------------------------------------------------------------
 * @Description:     基本信息管理-用户信息管理
 * @Version:         2.0.0
 * @author:          hj(435043636@qq.com)
 * @date             2016.8.30
 * ==NOTES:=============================================
 * v1.0.0 2016.8.30:
 初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('page/basic-information-management/user-information-list', function(S, List){
    PW.namespace('page.UserManagement.List');
    PW.page.UserManagement.List = function(param){
        new List(param);
    }
},{
    requires: [
        'user-management/list'
    ]
});
KISSY.add('user-management/list', function (S) {
    var
        $ = S.all,
        DOM = S.DOM,
        on = S.Event.on,
        delegate = S.Event.delegate,
        Pagination = PW.mod.Pagination,
        Dialog = PW.widget.Dialog,
        Selectall = PW.mod.Selectall,
        BasicInfoIO = PW.io.BasicInfoManagement.UserInfoList,
        config = {},
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
            //搜索表单
            searchForm: '.J_searchForm',
            //操作表单
            operForm: '.J_operForm',
            //控制是否显示“所属店面”触发器
            showStoreTrigger: '.J_controlShowStore',
            //搜索触发器
            searchTrigger: '.J_search',
            //删除触发器
            delTrigger: '.J_del'
        },
        DATA_USER_ID = 'data-user-id';

    function List(param) {
        this.opts = S.merge(config, param);
        this.pagination;
        this._init();
    }
    S.augment(List, {
        _init: function () {
            this._selectAll();
            this._buildEvt();
            this._initPagi();
        },
        _buildEvt: function () {
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
            delegate(document, 'click', el.searchTrigger, function() {
                that._searchReloadPagi();
            });
            //删除用户类型
            delegate(document, 'click', el.deleteTrigger, function (e) {
                that._deleteUser(e.target);
            });
        },
        /**
         * 分页初始化
         * @private
         */
        _initPagi: function () {
            var
                that = this,
                opts = that.opts;

            that.pagination = Pagination.client(opts);
        },
        // /**
        //  * 用户类型全选
        //  * @private
        //  */
        // _selectAll: function () {
        //     var
        //         that = this;
        //
        //     Selectall.client({
        //         root: el.searchForm,
        //         select: el.userTypeEl,
        //         toggleTrigger: el.selectAllTypeTrigger
        //     });
        // },
        // _consoleStoreShow: function () {
        //     if(DOM.hasClass(el.storeGroupEl, 'hidden')){
        //         $(el.storeGroupEl).removeClass('hidden');
        //         Selectall.client({
        //             root: el.searchForm,
        //             select: el.chooseStoreEl,
        //             toggleTrigger: el.selectAllStoreTrigger
        //         });
        //     }else{
        //         $(el.storeGroupEl).addClass('hidden');
        //     }
        // },
        // _searchReloadPagi: function () {
        //     var
        //         that = this,
        //         data = DOM.serialize(el.searchForm);
        //     console.log(data);
        //     opts = S.mix(that.opts, {
        //         extraParam: data
        //     });
        //     that.pagination.reload(opts);
        // },
        _deleteUser: function (e) {
            var
                that = this,
                trEl = $(e).parent('tr'),
                id = DOM.attr(trEl, DATA_USER_ID);

            Dialog.confirm("确定要删除该用户信息吗？", function(){
                //发ajax
                BasicInfoIO.delUserInfo({id: id}, function(rs, errMsg){
                    if(rs){
                        that.pagination.reload(that.opts);
                    }else{
                        Dialog.alert(errMsg);
                    }
                });
            });
        }
    });
    return List;
},{
    requires:[
        'mod/pagination',
        'widget/dialog',
        'mod/selectall',
        'pio/basic-information-management/user-information-list'
    ]
});


