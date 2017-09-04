KISSY.add('pio/register', function(S){
	var
		urls,
		conn = PW.mod.Connector(_pw_apiData);
	try{
		urls = conn.Register;
	}catch(e){
		S.log('地址信息错误');
        return;
	}

	PW.namespace('io.Register');
	S.mix(PW.io.Register, {
		conn: urls,
		/**
		 * 获取验证码
		 * @param  {[type]}   data     [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
        register: function(data, callback){
            var
                RegisterIO = urls.register;
                
            RegisterIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        }
	})
},{
    requires:[
        'mod/ext',
        'mod/connector'
    ]
})