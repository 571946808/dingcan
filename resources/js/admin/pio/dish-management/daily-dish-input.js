KISSY.add('pio/dish-management/daily-dish-input', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);      
    try{
        urls = conn.DishManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }
    
    PW.namespace('pio.DishManagement.DailyDishAdd');
    S.mix(PW.pio.DishManagement.DailyDishAdd, {
        conn: urls,
        /**
         * 获取某个店面下的菜品分类列表
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getStoreDishList: function(data, callback){
            var
                DishManagementIO = urls.getStoreDishList;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        },
        /**
         * 发送添加的菜品信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        sendAddDishInfo: function(data, callback){
            var
                DishManagementIO = urls.sendAddDishInfo;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        },
        /**
         * 发送编辑的菜品信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        sendEditDishInfo: function(data, callback){
            var
                DishManagementIO = urls.sendEditDishInfo;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        },
        /**
         * 删除菜品，发送菜品id
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delDish: function(data, callback){
            var
                DishManagementIO = urls.delDish;

            DishManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        },
        /**
         * 删除菜品，发送菜品id
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
        /**
         * 提交录入菜品
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        submitAddDish: function (data, callback) {
            var
                DishManagementIO = urls.submitAddDish;

            DishManagementIO.io(data, function (rs) {
               callback(
                   rs.code == 0,
                   rs.data,
                   rs.errMsg
               )
            });
        }
    });
}, {
    requires:[
        'mod/ext',
        'mod/connector'
    ]
});