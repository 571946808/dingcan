/**
 * Created by hj on 2016/9/19.
 */
KISSY.add('pio/submit-order', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.SubmitOrder;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.SubmitOrder');
    S.mix(PW.io.SubmitOrder, {
        conn: urls,
        /**
         * 提交订单发ajax
         * @param data
         * @param callback
         */
        submitOrder: function(data, callback){
            var
                submitOrderIO = urls.submitOrder;

            submitOrderIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        }
    })
}, {
    requires:[
        'mod/ext',
        'mod/connector'
    ]
});