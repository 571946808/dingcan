/*-----------------------------------------------------------------------------
 * @Description:     店面管理--店面管理列表
 * @Version:         2.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.9.02
 * ==NOTES:=============================================
 * v1.0.0(2016.9.02):
 * 	初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('pio/basic-information-management/store-management-list', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.BasicInfoManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.BasicInfoManagement');
    S.mix(PW.io.BasicInfoManagement, {
        /**
         * 删除店面
         * @param data
         * @param callback
         */
        delStore: function(data, callback){
             var
                 storeIO = urls.delStore;
             storeIO.io(data, function(rs){
                 callback(
                     rs.code == 0,
                     rs.errMsg
                 );
             });
        },
        /**
         * 转换店面的状态
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        convertStoreStatus: function(data, callback){
            var
                storeIO = urls.convertStoreStatus;
            storeIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        }
    });

},{
    requires: [
        'mod/ext',
        'mod/connector'
    ]
});