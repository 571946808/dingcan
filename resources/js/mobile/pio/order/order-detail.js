KISSY.add('pio/order/order-detail', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.Order
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Order.orderDetail');
    S.mix(PW.io.Order.orderDetail, {
        /**
         * 提交订单评价
         * @param data
         * @param callback
         */
        sendOrderComment: function(data, callback){
             var
                 delAddressIO = urls.sendOrderComment;
             delAddressIO.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 )
             })
        }
    });
}, {
    requires:[
        'mod/ext',
        'mod/connector'
    ]
});