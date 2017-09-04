/*-----------------------------------------------------------------------------
* @Description:     订单管理-列表
* @Version:         1.0.0
* @author:          lily(529116421@qq.com)
* @date             2016.10.12
* ==NOTES:=============================================
* v1.0.0(2016.10.12):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/leave-message-management/leave-message-list', function(S, List){
    PW.namespace('page.LeaveMessageManagement.List');
    PW.page.LeaveMessageManagement.List = function(param){
        new List(param);
    }
}, {
    requires:[
        'leave-message/list'
    ]
});
/*-----------------------------------------------------------------*/
KISSY.add('leave-message/list', function(S){
    var
        DOM = S.DOM, $ = S.all, query = DOM.query,
        on = S.Event.on,
        Pagination = PW.mod.Pagination, 
        Calendar = PW.mod.Calendar,
        config = {},
        el = {
            //搜索表单
            searchForm: '.J_searchForm',
            //回复状态的全选按钮
            statusToggleEl: '.J_statusToggle',
            //回复状态的checkbox
            statusSelectEl: '.J_statusCheckbox'
        };
        
    function List(param){
        this.opts = S.merge(config, param);
        this.pagination;
        this._init();
    }

    S.augment(List, {
        _init: function(){
            this._initPagi();
            this._initCalender();
            this._initSelectAll();
            this._builtEvt();
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
        _initSelectAll: function(){
            var
                that = this;

            PW.mod.Selectall.client({
                root: el.searchForm,
                select: el.statusSelectEl,
                toggleTrigger: el.statusToggleEl
            });
        },
        _initCalender(){
            var
                that = this;

            S.each(query('.date'),function(i){
                Calendar.client({
                    renderTo: i, //默认只获取第一个
                    select: {
                        rangeSelect: false, //是否允许区间选择
                        dateFmt: 'YYYY-MM-DD',
                        showTime: false //是否显示时间
                    }
                });
            });
        },
        _builtEvt: function(){
            var
                that = this;

            on(el.searchForm, 'submit', function(){
                that._reloadPagi();
                return false;
            });
        },
        /**
         * 搜索重新加载分页
         * @return {[type]} [description]
         */
        _reloadPagi: function(){
            var
                that = this,
                searchData = DOM.serialize(el.searchForm),
                opts = S.mix(that.opts, {
                    extraParam: searchData
                });

            that.pagination.reload(opts);
        }
    })
    return List;
}, {
    requires:[
        'mod/pagination',
        'mod/selectall',
        'mod/calendar'
    ]
})