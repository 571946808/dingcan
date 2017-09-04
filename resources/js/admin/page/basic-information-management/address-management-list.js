/*-----------------------------------------------------------------------------
 * @Description:     基本信息管理-地址管理
 * @Version:         2.0.0
 * @author:          yudan(862669640@qq.com)
 * @date             2016.8.31
 * ==NOTES:=============================================
 * v1.0.0 2016.8.31:
 初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('page/basic-information-management/address-management-list', function(S, List){
    PW.namespace('page.AddressManagement.List');
    PW.page.AddressManagement.List = function(param){
        new List(param);
    }
},{
    requires: [
        'address-management/list'
    ]
});
KISSY.add('address-management/list', function (S) {
    var
        $ = S.all,
        DOM = S.DOM,
        on = S.Event.on,
        delegate = S.Event.delegate,
        Pagination = PW.mod.Pagination,
        config = {};

    function List(param) {
        this.opts = S.merge(config, param);
        this.pagination;
        this._init();
    }
    S.augment(List, {
        _init: function () {
            this._initPagi();
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
        }
    });
    return List;
},{
    requires:[
        'mod/pagination'
    ]
});


