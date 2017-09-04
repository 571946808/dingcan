/*-----------------------------------------------------------------------------
 * @Description:     便利店端--订单详情
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.09.12
 * ==NOTES:=============================================
 * v1.0.0(2016.09.12):
 初始生成
 * ----------------------------------------------------------*/
KISSY.add('pio/store/order-detail', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.Store;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Store');
    S.mix(PW.io.Store, {
        conn: urls,
        /**
         * 删除订单
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delOrder: function(data, callback){
            var
                OrderIO = urls.delOrderDetail;
            OrderIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 确认订单
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        confirmOrder: function(data, callback){
            var
                OrderIO = urls.confirmOrder;
            OrderIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 拒绝订单
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        refuseOrder: function(data, callback){
            var
                OrderIO = urls.refuseOrder;
            OrderIO.io(data, function(rs){
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
})