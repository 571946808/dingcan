/*-----------------------------------------------------------------------------
 * @Description:     设置默认收货地址
 * @Version:         2.0.0
 * @author:          yud（862669640@qq.com）
 * @date             2016.9.18
 * ==NOTES:=============================================
 * v1.0.0(2016.9.18):
 * 	初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('pio/address-management', function(S){
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
         * 设置默认收货地址
         * @param data
         * @param callback
         */
        defaultAddress: function(data, callback){
             var
                 defaultAddressIO = urls.defaultAddress;
            defaultAddressIO.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 )
             })
        },
        /**
         * 修改地址
         * @param data
         * @param callback
         */
        modifyAddress: function(data, callback){
             var
                 modifyAddressIO = urls.modifyAddress;
            modifyAddressIO.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 )
             })
        },
         /**
         * 删除收货地址
         * @param data
         * @param callback
         */
        deleteAddress: function(data, callback){
             var
                 deleteAddress = urls.deleteAddress;
             deleteAddress.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 )
             })
        },
        /**
         * 设置订单送餐地址
         */
        chooseAddress: function (data, callback) {
            var
                chooseAddressIO = urls.chooseAddress;

            chooseAddressIO.io(data, function (rs) {
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
