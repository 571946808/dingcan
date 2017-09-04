/*-----------------------------------------------------------------------------
 * @Description:     查看历史订单记录
 * @Version:         1.0.0
 * @author:          hujun(435043636@qq.com)
 * @date             2016.9.8
 * ==NOTES:=============================================
 * v1.0.0(2016.9.8):
 初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('page/submit-order', function (S, Core) {
    PW.namespace('page.submitOrder');
    PW.page.submitOrder = function ( ) {
        new Core();
    }
}, {
    requires:[
        'order/core'
    ]
});

/*基本操作*/
KISSY.add('order/core', function (S) {
    var
        DOM = S.DOM,
        delegate = S.Event.delegate,
        SubmitOrder = PW.io.SubmitOrder,
        el = {
            //个人信息
            personalInfoEl: '.personal-info span',
            //地址信息
            addressInfoEl: '.address-detail-info',
            //提交按钮
            submitOrderBtn: '.J_submitOrder',
            //保存提交信息的表单
            saveInfoForm: '.J_saveInfoForm',
            //点击跳转地址选择或添加触发器
            linkTrigger: '.J_link',
            //链接地址
            linkHrefEl: '.J_linkHref'
        };

    function Core() {
        this._init();
    }
    S.augment(Core, {
        _init: function () {
            this._buildEvent();
        },
        _buildEvent: function () {
            var
                that = this;
            //提交订单
            delegate(document, 'tap', el.submitOrderBtn, function (e) {
                that._sendAjax(e.target);
            });
            //点击跳转地址列表或添加地址
            delegate(document, 'tap', el.linkTrigger, function (e) {
               that._link(e.target);
            });
        },
        /**
         * 提交订单发ajax
         * @private
         */
        _sendAjax: function (ev) {
            var
                that = this,
                linkHref = DOM.attr(el.submitOrderBtn, 'href');
            S.log(ev);

            SubmitOrder.submitOrder({}, function (rs, errMsg) {
                if(rs){
                    //点击按钮一次后禁掉
                    DOM.replaceClass(ev, 'submit-order', 'disabled-submit-order');
                    DOM.attr(ev, 'disabled', 'disabled');
                    //提交成功跳页
                    window.location.href = linkHref;
                }else{
                    alert(errMsg);
                }
            });
        },
        /**
         * 点击链接跳转
         * @private
         */
        _link: function (e) {
            var
                that = this,
                divEl = DOM.parents(e, 'div'),
                linkEl = DOM.get(el.linkHrefEl, divEl[0]),
                linkResource = DOM.attr(linkEl, 'href');

            window.location.href = linkResource;
        }
    });
    return Core;
},{
    requires:[
        'mod/ext',
        'pio/submit-order'
    ]
});