/*-----------------------------------------------------------------------------
 * @Description:     订单详情
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.10.11
 * ==NOTES:=============================================
 * v1.0.0(2016.10.11):
 初始生成
 * ------------------------------------------------------------*/
KISSY.add('page/order/order-detail', function(S, Core){
	PW.namespace('page.Order.OrderDetail');
	PW.page.Order.OrderDetail = function(){
        new Core();
    }
}, {
	requires:[
		"order-detail/core"
		]
	}
);
/* ------------------------------------------------------------*/
KISSY.add("order-detail/core", function(S){
	var
		$ = S.all, DOM = S.DOM,
        on = S.Event.on,
        OrderDetailIO = PW.io.Order.orderDetail,
		el = {
            //表单提交触发器
            submitTrigger: '.J_submitComment',
            //评价输入元素
            commentInpEl: '.J_commentInp',
            //订单id
            orderIdInp: '.J_orderId'
        };

	function Core(){
    	this._init();		
	}	
    S.augment(Core, {
        _init: function(){
            this._buildEvt();
        },
        _buildEvt: function(){
            var
                that = this;

            on(el.submitTrigger, 'tap', function(){
                that._submitComment();
            });
        },
        _submitComment: function(){
            var
                that = this,
                orderId = DOM.val(el.orderIdInp),
                commentText = DOM.val(el.commentInpEl);

            if(commentText){
                OrderDetailIO.sendOrderComment({comment:commentText, orderId: orderId}, function(rs, errMsg){
                    if(rs){
                        location.reload();
                    }else{
                        alert(errMsg);
                    }
                });
            }else{
                alert('请输入订单评价');
            }
        }
    });			
	return Core;
}, {
	requires:[
		'mod/ext',
        'pio/order/order-detail'
		]
	}
);