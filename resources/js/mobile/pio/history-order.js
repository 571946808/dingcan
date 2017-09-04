/*-----------------------------------------------------------------------------
 * @Description:     查看历史订单记录
 * @Version:         1.0.0
 * @author:          hujun(435043636@qq.com)
 * @date             2016.9.8
 * ==NOTES:=============================================
 * v1.0.0(2016.9.8):
 初始生成
 * ---------------------------------------------------------------------------*/
 KISSY.add('pio/history-order', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.HistoryOrder;
    }catch(e){
        S.log('地址信息错误');
        return;
    }
    PW.namespace('io.HistoryOrder');

    S.mix(PW.io.HistoryOrder, {
        conn: urls,
        /**
         * 获取订单列表
         * @param data
         * @param callback
         */
        getOrderList: function(data, callback){
            var 
                dishIO = urls.getOrderList;

            dishIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.list,
                    rs.errMsg
                )
            })
        },
        /**
         * 删除订单
         */
        delOrder: function (data, callback) {
            var
                delOrderIO = urls.delOrder;

            delOrderIO.io(data, function(rs){
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
})