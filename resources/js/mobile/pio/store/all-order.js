/*-----------------------------------------------------------------------------
 * @Description:     全部订单
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.9.23
 * ==NOTES:=============================================
 * v1.0.0(2016.9.23):
 初始生成
 * ---------------------------------------------------------------------------*/
 KISSY.add('pio/store/all-order', function(S){
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
         * 获取订单列表
         * @param data
         * @param callback
         */
        getAllOrderList: function(data, callback){
            var 
                dishIO = urls.getAllOrderList;

            dishIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.list,
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