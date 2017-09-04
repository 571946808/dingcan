KISSY.add('pio/dish-management/dish-classify-management', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);

    try{
        urls = conn.DishManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.DishClassifyManagement');

    S.mix(PW.io.DishClassifyManagement, {
        conn: urls,
        /**
         * 删除分类
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delClassify: function(data, callback){
            var
                DishClassifyIO = urls.delClassify;

            DishClassifyIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 编辑时保存
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        saveEdit: function(data, callback){
            var
                DishClassifyIO = urls.saveEditClassify;

            DishClassifyIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            });
        },
        /**
         * 添加时保存
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        saveAdd: function(data, callback){
            var
                DishClassifyIO = urls.saveAddClassify;

            DishClassifyIO.io(data, function(rs){
                callback(
                    rs.code == 0,
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
})