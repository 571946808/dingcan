/*-----------------------------------------------------------------------------
 * @Description:     修改密码
 * @Version:         1.0.0
 * @author:          lily(529116421@qq.com)
 * @date             2016.9.10
 * ==NOTES:=============================================
 * v1.0.0(2016.9.10):
 初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('pio/password-modify', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.PasswordModify;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.PasswordModify');
    S.mix(PW.io.PasswordModify, {
        conn: urls,
        /**
         * 确认修改
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        modify: function(data, callback){
            var
                PasswordModifyIO = urls.modify;
            PasswordModifyIO.io(data, function(rs){
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