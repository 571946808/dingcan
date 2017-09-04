/*-----------------------------------------------------------------------------
 * @Description:     收货地址删除
 * @Version:         2.0.0
 * @author:          yud（862669640@qq.com）
 * @date             2016.9.09
 * ==NOTES:=============================================
 * v1.0.0(2016.9.09):
 * 	初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('pio/address-del', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.ReceiverAddress
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.ReceiverAddress');
    S.mix(PW.io.ReceiverAddress, {
        /**
         * 删除收货地址
         * @param data
         * @param callback
         */
        delAddress: function(data, callback){
             var
                 delAddressIO = urls.delAddress;
             delAddressIO.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 )
             })
        }
    });

},{
    requires: [
        'mod/ext',
        'mod/connector'
    ]
});
