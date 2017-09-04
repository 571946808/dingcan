/*-----------------------------------------------------------------------------
 * @Description:     今日订单
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.9.18
 * ==NOTES:=============================================
 * v1.0.0(2016.9.18):
 初始生成
 * ---------------------------------------------------------------------------*/
 KISSY.add('page/store/today-order', function (S, Scroll, Core) {
    PW.namespace('page.Store.TodayOrder');
    PW.page.Store.TodayOrder = function (param) {
        new Scroll();
        new Core();
    }
}, {
    requires:[
        'today-order/scroll',
        'today-order/core'
    ]
});
/*滚动条相关操作*/
KISSY.add('today-order/scroll', function (S) {
    var
        DOM = S.DOM,
        Juicer = PW.mod.Juicer.client,
        OrderIO = PW.io.Store,
        el = {
            //渲染刷分页模板
            orderListTemp: '#orderListTpl',
            //模板容器
            scrollContainer: '.J_scroll'
        };
    function Scroll() {
        scroll = {
            page: 0
        };
        this._init();
    }
    S.augment(Scroll, {
        _init: function () {
            this._initIscroll();
            this._load();
        },
        _initIscroll: function () {
            var
                that = this;

            // 滚动条对象
            that.iscroll = PW.module.Iscroll.client({
                // 滚动条所包括的范围
                id: "wrapper",
                pullDownAction: that._refresh,
                pullUpAction: that._load,
                // 是否懒加载
                isLazyLoad: false
            }).iscroll;
        },
        /**
         * 上拉操作: 请求更多
         * @private
         */
        _load: function(){
            var
                // this指向iscroll
                that = this,
                iscroll = this.iscroll,
                page = scroll.page,
                orderListTpl,
                orderListStr,
                orderListDOM;

            S.mix(scroll, {
                page: page + 1
            });
            // 发送请求
            OrderIO.getTodayOrderList({
                page: scroll.page,
                pageSize: 5
            }, function(rs, list, errMsg){
                if(rs){
                    orderListTpl = DOM.html(el.orderListTemp);
                    orderListStr = Juicer(orderListTpl, {
                        list: list
                    });
                    orderListDOM = DOM.create(orderListStr);
                    DOM.append(orderListDOM, el.scrollContainer);
                    iscroll.refresh();
                }else{
                    var
                        pullUpEl = get('#pullUp', 'body'),
                        pullUpLabel = get('.pullUpLabel', pullUpEl),
                        loader = get('.loader', pullUpEl);

                    DOM.css(loader, 'display', 'none');
                    DOM.removeClass(pullUpEl, 'loading');
                    DOM.text(pullUpLabel, '亲,您已经看完了!');
                    alert(errMsg);
                }
            });
        },
        /**
         * 下拉操作,页面刷新
         * @private
         */
        _refresh: function(){
            var
                that = this;

            window.location.reload();
        }
    });
    return Scroll;
},{
    requires: [
        'pio/store/today-order',
        'module/iscroll',
        'mod/juicer',
        'core'
    ]
});

/*基本操作*/
KISSY.add('today-order/core', function (S) {
    var
        $ = S.all,
        DOM = S.DOM,
        on = S.Event.on,
        delegate = S.Event.delegate,
        OrderIO = PW.io.Store,
        el = {
            //li链接触发器
            linkTrigger: '.J_link',
            //link resource
            linkHref: '.link',
            //搜索表单
            searchForm: '#wrapper'
        };
        
    function Core() {
        this._buildEvent();
    }
    S.augment(Core, {
        _buildEvent: function () {
            var
                that = this;
            delegate(document, 'tap', el.linkTrigger, function (e) {
                that._link(e.target);
            });
        },
        /**
         * 打开订单详情链接
         * @param ev
         * @private
         */
        _link: function (ev) {
            var
                that = this,
                tiggerLi,
                linkHref,
                linkEl;

            if(DOM.parent(ev, 'li') == undefined){
                linkEl = DOM.children(ev ,'a');
                linkHref = DOM.attr(linkEl, 'href');
               window.location.href = linkHref;                    
            }else{
                tiggerLi = DOM.parent(ev, 'li');
                linkEl = DOM.children(tiggerLi ,'a');
                linkHref = DOM.attr(linkEl, 'href');
                window.location.href = linkHref;  
            }
        }
    });
    return Core;
},{
    requires:[
        'core',
        'pio/store/today-order'
    ]
});