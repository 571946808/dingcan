KISSY.add('pio/order-management/order-management', function(S){
    var
        urls,
        conn = PW.mod.Connector(_pw_apiData);
    try{
        urls = conn.OrderManagement;
    }catch(e){
        S.log('地址信息错误');
        return;
    }

    PW.namespace('io.OrderManagement');

    S.mix(PW.io.OrderManagement, {
        conn: urls,
        /**
         * 根据订单Id获取订餐菜品详情
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getDishDetail: function(data, callback){
            var
                OrderManagementIO = urls.getDishDetail;

            OrderManagementIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.list,
                    rs.errMsg
                );
            });
        },
        /**
         * 根据订单Id获取回复评价详情
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getReplyComment: function(data, callback){
            var
                OrderManagementReplyIO = urls.getReplyComment;

            OrderManagementReplyIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        },
        /**
         * 根据订单Id获取查看评价详情
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getCheckComment: function(data, callback){
            var
                OrderManagementCheckIO = urls.getCheckComment;

            OrderManagementCheckIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.data,
                    rs.errMsg
                );
            });
        },
        /**
         * 发送回复评价的信息
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        sendCommentInfo: function(data, callback){
            var
                OrderManagementSendIO = urls.sendCommentInfo;

            OrderManagementSendIO.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                );
            });
        },
        /**
         * 修改订单状态
         * @param  {[type]}   data     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        changeStatus: function(data, callback){
            var 
                OrderManagement = urls.changeStatus;

            OrderManagement.io(data, function(rs){
                callback(
                    rs.code == 0,
                    rs.errMsg
                )
            })
        }
    })
}, {
    requires:[
        'mod/ext',
        'mod/connector'
    ]
})