/*-----------------------------------------------------------------------------
* @Description:     订单管理-列表
* @Version:         1.0.0
* @author:          jiangx(631724595@qq.com)
* @date             2016.8.30
* ==NOTES:=============================================
* v1.0.0(2016.8.30):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/order-management/order-management', function(S, Core){
    PW.namespace('page.orderManegement.orderManegement');
    PW.page.orderManegement.orderManegement = function(param){
        new Core(param);
    }
}, {
    requires:[
        'order-management/core'
    ]
});
/*-----------------------------------------------------------------*/
KISSY.add('order-management/core', function(S){
    var
        DOM = S.DOM, $ = S.all, query = DOM.query,
        on = S.Event.on, delegate = S.Event.delegate,
        Defender = PW.mod.Defender,
        Pagination = PW.mod.Pagination, 
        Dialog = PW.widget.Dialog,
        Juicer = PW.mod.Juicer,
        Calendar = PW.mod.Calendar,
        OrderIO = PW.io.OrderManagement,
        el = {
            //搜索表单
            searchForm: '.J_searchForm',
            //回复评价表单
            commentForm: '.J_commentForm',
            //查看详情触发器
            detailTrigger: '.J_view',
            //菜品详情
            dishTpl: '#dishTpl',
            //菜品详情
            replyTpl: '#replyTpl',
            //菜品详情
            checkTpl: '#checkTpl',
            //便利店的全选按钮
            storeToggleEl: '.J_storeToggle',
            //便利店的checkbox
            storeSelectEl: '.J_storeCheckbox',
            //订单状态的全选按钮
            statusToggleEl: '.J_statusToggle',
            //订单状态的checkbox
            statusSelectEl: '.J_statusCheckbox',
            //评价状态的全选按钮
            commentToggleEl: '.J_commentToggle',
            //评价状态的checkbox
            commentSelectEl: '.J_commentCheckbox',
            //修改订单状态
            changeStatusTrigger: '.J_changeStatus',
            //查看评价按钮
            checkCommentTrigger: '.J_checkComment',
            //回复评价按钮
            replyCommentTrigger: '.J_replyComment',
            //订单状态select
            orderStatusEl: '#order-status',
            //菜品状态Td
            dishStatusEl: '.J_dishStatus',
            //操作Td
            operEl: '.J_oper',
            //取消触发器
            cancelTrigger: '.J_cancel',
            // 保存触发器
            saveTrigger: '.J_save'
        },
        DATA_ORDER_ID = 'data-order-id';
        
    function Core(param){
        this.opts = S.merge(config, param);
        this.pagination;
        this.hasEdit = 0;//0可以编辑，1不能编辑
        this.commentId;
        this._init();
    }

    S.augment(Core, {
        _init: function(){
            this._initPagi();
            this._initCalender();
            this._initSelectAll();
            this._bulitEvt();
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
                select: el.storeSelectEl,
                toggleTrigger: el.storeToggleEl
            });
            PW.mod.Selectall.client({
                root: el.searchForm,
                select: el.statusSelectEl,
                toggleTrigger: el.statusToggleEl
            });
            PW.mod.Selectall.client({
                root: el.searchForm,
                select: el.commentSelectEl,
                toggleTrigger: el.commentToggleEl
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
        _bulitEvt: function(){
            var
                that = this;

            on(el.searchForm, 'submit', function(){
                that._reloadPagi();
                return false;
            });

            delegate(document, 'click', el.detailTrigger, function(e){
                if(!that.hasEdit){
                    that.hasEdit = 1;
                    that._viewDetail(e.target);
                }else{
                    Dialog.alert('操作失败：已存在编辑项，请保存或取消后再操作！');
                }
            });

            delegate(document, 'click', el.changeStatusTrigger, function(e){
                if(!that.hasEdit){
                    that.hasEdit = 1;
                    that._changeStatus(e.currentTarget);
                }else{
                    Dialog.alert('操作失败：已存在编辑项，请保存或取消后再操作！');
                }
            });

            delegate(document, 'click', el.replyCommentTrigger, function(e){
                if(!that.hasEdit){
                    that.hasEdit = 1;
                    that._replyComment(e.currentTarget);
                }else{
                    Dialog.alert('操作失败：已存在编辑项，请保存或取消后再操作！');
                }
            });
            
            delegate(document, 'click', el.checkCommentTrigger, function(e){
                if(!that.hasEdit){
                    that.hasEdit = 1;
                    that._checkComment(e.currentTarget);
                }else{
                    Dialog.alert('操作失败：已存在编辑项，请保存或取消后再操作！');
                }
            });

            delegate(document, 'click', el.cancelTrigger, function(e){
                that._cancel(e.target);
            });

            delegate(document, 'click', el.saveTrigger, function(e){
                that._save(e.target);
            })
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
        },
        /**
         * 查看菜品详情
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _viewDetail: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                id = $(tr).attr(DATA_ORDER_ID);

            OrderIO.getDishDetail({id: id}, function(rs, list, errMsg){
                if(rs){
                    that._openDlg(list,el.dishTpl);
                }else{
                    Dialog.alert(errMsg);
                }
            })
        },
        /**
         * 查看评价
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _replyComment: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                id = $(tr).attr(DATA_ORDER_ID);

                OrderIO.getReplyComment({id: id}, function(rs, list, errMsg){
                if(rs){
                    commentId=list.commentId;     
                    that._openReplyDlg(list,el.replyTpl,ele);                    
                }else{
                    Dialog.alert(errMsg);
                }
            })
        },
        /**
         * 查看菜品详情
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _checkComment: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                id = $(tr).attr(DATA_ORDER_ID);

            OrderIO.getCheckComment({id: id}, function(rs, list, errMsg){
                if(rs){
                    that._openDlg(list,el.checkTpl);
                }else{
                    Dialog.alert(errMsg);
                }
            })
        },
        /**
         * 查看详情与评价弹出框
         * @param  {[type]} list [description]
         * @return {[type]}      [description]
         */
        _openDlg: function(list,element){
            var
                that = this,
                tpl = DOM.html(element),
                dishStr = Juicer.client(tpl, {
                    list: list
                });
                settings = {
                        title: '查看',
                        header: true,
                        width: 800,
                        top: 100,
                        hasAutoScroll: true,
                        footer: {
                            btns: [
                                {
                                    text: '关闭',
                                    clickHandler: function(ev, me){
                                        me.close();
                                    }
                                }
                            ]
                        }
                    };

            Dialog.alert(dishStr, function(){
                that.hasEdit = 0;
            },settings);
        },
        /**
         * 回复评价弹出框
         * @param  {[type]} list [description]
         * @return {[type]}      [description]
         */
        _openReplyDlg: function(list,element,ele){
            var
                that = this,
                tpl = DOM.html(element),
                dishStr = Juicer.client(tpl, {
                    list: list
                });
                settings = {
                        title: '回复留言',
                        header: true,
                        width: 800,
                        top: 100,
                        hasAutoScroll: true,
                        footer: {
                            btns: [
                                {
                                    text: '确定',
                                    clickHandler: function(ev, me){
                                        that._validForm(ev, me, ele);
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
                            that.defender = Defender.client(el.commentForm, {});
                        }
                    };

                Dialog.alert(dishStr, function(){
                    that.hasEdit = 0;
                },settings);
        },
        /**
         * 验证表单
         * @param  {[type]} ev [description]
         * @param  {[type]} me [description]
         * @return {[type]}    [description]
         */
        _validForm: function(ev, me, ele){
            var
                that = this;

            that.defender.validAll(function(rs){
                if(rs){
                    that._sendCommentInfo(ev, me, ele);
                }else{
                    return false;
                }
            });
        },
        /**
         * 发送回复评价的信息
         * @param  {[type]} ev [description]
         * @param  {[type]} me [description]
         * @return {[type]}    [description]
         */
        _sendCommentInfo: function(ev, me, ele){
            var
                that = this,
                data = DOM.serialize(el.commentForm);                
                S.mix(data, {
                    commentId: commentId
                });
            OrderIO.sendCommentInfo(data, function(rs, errMsg){
                if(rs){
                    me.close();                   
                    that._changeReplyBtn(ele);
                    Dialog.alert('保存成功！');
                }else{
                    Dialog.alert(errMsg);
                }
            });
        },
        /**
         * 修改点击回复评价后的按钮
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _changeReplyBtn: function(ele){
            var 
                that = this;
            DOM.html($(ele),'<i class="fa fa-comment-o"></i>&nbsp;查看评价');
            DOM.addClass($(ele), 'J_checkComment');
            DOM.removeClass($(ele), 'J_replyComment');
        },
        /**
         * 修改操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _changeStatus: function(ele){
            var
                that = this;
                tr = DOM.parent(ele, 'tr'),
                orderStatusEl = DOM.html(el.orderStatusEl),
                newTr = DOM.clone(tr, true),
                dishStatusEl = DOM.get(el.dishStatusEl, newTr),
                operEL = DOM.get(el.operEl, newTr);
                operStr = '<a href="javascript:;" class="label-info J_save"><i class="fa fa-save"></i>&nbsp;保存</a>&nbsp;'
                         +'<a href="javascript:;" class="label-info J_cancel"><i class="fa fa-undo"></i>&nbsp;取消</a>';
            
            DOM.html(operEL, operStr);
            DOM.html(dishStatusEl, orderStatusEl);
            DOM.insertAfter(newTr, tr);
            DOM.hide(tr);
        },
        /**
         * 取消操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _cancel: function(ele){
            var
                that = this,
                tr = DOM.parent(ele, 'tr'),
                prev = $(tr).prev('tr');

            DOM.remove(tr);
            DOM.show(prev);
            that.hasEdit = 0;
        },
        /**
         * 保存操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _save: function(ele){
            var
                that = this,
                tr = DOM.parent(ele, 'tr');
                id = DOM.attr(tr, DATA_ORDER_ID),
                select = DOM.get('select', tr),
                status = DOM.val(select),
                statusText = select.options[select.selectedIndex].text;

            OrderIO.changeStatus({id: id, status:status}, function(rs, errMsg){
                if(rs){
                    that._renderChangeData(statusText, tr);
                    that.hasEdit = 0;
                }else{
                    Dialog.alert(errMsg);
                }
            });
        },
        /**
         * 修改成功后渲染
         * @param  {[type]} status [description]
         * @param  {[type]} tr     [description]
         * @return {[type]}        [description]
         */
        _renderChangeData: function(status, tr){
            var
                that = this,
                prevTr = DOM.prev(tr),
                dishStatusEl = DOM.get(el.dishStatusEl, prevTr),
                aEl = DOM.get(el.changeStatusTrigger, prevTr);
                
            DOM.removeClass(aEl, 'J_changeStatus');
            DOM.addClass(aEl, 'disable-change');
            DOM.text(dishStatusEl, status);
            DOM.remove(tr);
            DOM.show(prevTr);
        }
    })
    return Core;
}, {
    requires:[
        'mod/defender',
        'widget/dialog',
        'mod/pagination',
        'mod/selectall',
        'mod/calendar',
        'pio/order-management/order-management'
    ]
})