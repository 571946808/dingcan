KISSY.add('pio/basic-information-management/user-management', function (S) {
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.BasicInfoManagement;
    }catch(e){
        S.log("地址信息错误");
        return;
    }
    PW.namespace("io.BasicInfoManagement.userManagement");
    S.mix(PW.io.BasicInfoManagement.userManagement, {
        conn: urls,
        /**
         * 删除用户id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delUserInfo: function(data, callback){
            var
                delUserInfoIO = urls.delUserInfo;

            delUserInfoIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 验证顾客、便利店手机号是否重复
         * @param data
         * @param callback
         */
        validUserIsRepeat: function (data, callback) {
            var
                validUserInfo = urls.validUserIsRepeat;

            validUserInfo.io(data, function (rs) {
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 验证管理员用户名是否重复
         * @param data
         * @param callback
         */
        validAdminIsRepeat: function (data, callback) {
            var
                validAdminName = urls.validAdminIsRepeat;

            validAdminName.io(data, function (rs) {
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        }
    })
},{
    requires:[
        'mod/connector'
    ]
});