KISSY.add('pio/cart', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.Cart;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.Cart');
    S.mix(PW.io.Cart, {
        conn: urls,
        /**
         * 减少数量
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        subDish: function(data, callback){
            var
                CartIO = urls.subDish;
            CartIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                )
            });
        },
        /**
         * 增加数量
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        plusDish: function(data, callback){
            var
                CartIO = urls.plusDish;
            CartIO.io(data, function(rs){
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