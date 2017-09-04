KISSY.add('pio/login', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.Login;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Login');
    S.mix(PW.io.Login, {
        conn: urls,
        /**
         * 登录
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        login: function(data, callback){
            var
                LoginIO = urls.login;
            LoginIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
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