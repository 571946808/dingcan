KISSY.add('pio/dish-management/daily-dish', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);      
    try{
        urls = conn.DishManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }
    
    PW.namespace('pio.DishManagement.DailyDish');
    S.mix(PW.pio.DishManagement.DailyDish, {
        conn: urls,
        /**
         * 获取某个店面下的菜品分类列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getStoreDishList: function(data, callback){
            var
                DishManagementIO = urls.getAuditDishList;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        },
        /**
         * 是否开启关闭
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        isCanOrder: function(data, callback){
            var
                DishManagementIO = urls.isCanOrder;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        },
        sendStatusAjax: function(data, callback){
            var
                DishManagementIO = urls.sendStatusAjax;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        }
    });
}, {
    requires:[
        'mod/ext',
        'mod/connector'
    ]
});