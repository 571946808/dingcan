 /*-----------------------------------------------------------------------------
 * @Description:    后台管理--配置url地址 (url-core.js)
 * @Version: 	    V2.0.0
 * @author: 		hj(435043636@qq.com)
 * @date			2016.8.27
 * ==NOTES:=============================================
 * v1.0.0(2015.11.02) cuiy:
 * 经项目实践,发现目前项目架构不适合调试使用,需要不断修改IO层,这样会对前\后端的开发带来不便,故决定使用此插件来解决问题
 * ---------------------------------------------------------------------------*/
(function(){
    var
        site ={
            website:'/', //站点地址
            staticWebsite: '/', // 前端服务器地址
            puiWebsite: '/resources/tool/pui2/'
        };


    _pw_apiData = {
        // 公共模块
        Module: [
            ['mulSelectSearch', site.staticWebsite + 'mock/admin/search-item-list.json', 'get', '多选'],
            ['getAssistantCode', site.staticWebsite + 'mock/admin/get-assistantCode.json', 'get', '获取名称对应的助记码'],
            ['getDishsName', site.staticWebsite + 'mock/admin/get-dish-list.json', 'get', '套餐添加页-获取相应的值,搜索选择，返回菜品信息'],
            ['getGoodsName', site.staticWebsite + 'mock/admin/get-goods-list.json', 'get', '库存单据管理页-获取相应的值,搜索选择，返回物品信息'],
            ['getDish', site.staticWebsite + 'mock/admin/get-dish-list-inCostCard.json', 'get', '成本卡添加页-搜索菜品，返回菜品信息'],
            ['getIngredient', site.staticWebsite + 'mock/admin/inventory-ingredient.json', 'get', '发送keyword，返回原材料信息']
        ],
        //  后台登录
        Login:[
            ['getLogin', site.staticWebsite + 'mock/admin/login.json', 'get', '后台登录']
        ],
        BasicInfoManagement:[
            //用户信息管理
            ['delUserInfo', site.staticWebsite + 'mock/admin/login.json','get','删除时，发送当前用户的id'],
            ['validUserIsRepeat', site.staticWebsite + 'mock/admin/login.json','get', '验证手机号是否重复'],
            ['validAdminIsRepeat', site.staticWebsite + 'mock/admin/login.json', 'get', '验证用户名是否重复'],
            //店面管理-列表
            ['delStore', site.staticWebsite + 'mock/admin/store-list.json', 'get', '删除店面'],
            ['convertStoreStatus', site.staticWebsite + 'mock/admin/store-list.json', 'get', '转换店面的状态,即启用/停用互换']
        ],
        // 权限管理
        AuthorityManagement:[
            //权限管理\启用、禁用权限
            ['sendAuthorityId',site.staticWebsite + 'mock/admin/change-authority.json','get','改变权限时，发送当前权限的id'],

            //权限组管理\删除权限组
            ['delAuthorityGroup',site.staticWebsite + 'mock/admin/del-authority-group.json','get','删除权限组时，发送当前权限组的id和当前用户的id'],

            //base-config.html
            ['saveAuthority', site.staticWebsite + 'mock/admin/save-authority.json', 'get','保存编辑后的权限'],
            ['saveNewAuthority',site.staticWebsite + 'mock/admin/save-authority.json','get','保存新添加的权限'],
            ['delAuthority', site.staticWebsite + 'mock/admin/login.json', 'get', '删除权限时，发送权限id'],

            //authority-group-list.html
            ['saveAuthorityGroup',site.staticWebsite + 'mock/admin/save-authority.json', 'get','保存编辑后的权限组'],
            ['saveNewAuthorityGroup',site.staticWebsite + 'mock/admin/save-authority.json', 'get','保存新添加的权限组'],
            ['deleteAuthorityGroup', site.staticWebsite + 'mock/admin/login.json','get','删除权限时，发送权限组id'],

            //authority-group-config.html
            ['delAuthorityOfGroup',site.staticWebsite + 'mock/admin/login.json','get','权限组配置页面，删除权限']
        ],
        // 用户管理
        UserManagement: [
            // 员工管理--列表
            ['delEmployee', site.staticWebsite + 'mock/admin/employee-list.json', 'get', '删除员工'],
            ['convertEmployeeStatus', site.staticWebsite + 'mock/admin/employee-list.json', 'get', '转换员工的状态,即启用\停用互换'],
            ['sendEmployeeId', site.staticWebsite + 'mock/admin/employee-table.json', 'get', '获取当前员工的所管辖餐台,为气泡所用'],
            ['searchEmployee', site.staticWebsite + 'mock/admin/employee-list.json', 'get', '搜索当前角色下的员工'],
            // 员工管理--员工添加\编辑
            ['sendEmployeePhone', site.staticWebsite + 'mock/admin/hasEmployee.json', 'get', '判断员工的电话是否重复'],
            ['sendEmployeeUserName', site.staticWebsite + 'mock/admin/hasEmployee.json', 'get', '判断员工的用户命是否重复'],
            ['sendEmployeeNo', site.staticWebsite + 'mock/admin/hasEmployee.json', 'get', '判断员工的编号是否重复']
        ],
        //订单管理
        OrderManagement: [
            ['getDishDetail', site.staticWebsite + 'mock/admin/order-dish-list.json', 'get', '获取订单的详细菜品'],
            ['getReplyComment', site.staticWebsite + 'mock/admin/order-replyComment.json', 'get', '获取需要回复的评价'],
            ['getCheckComment', site.staticWebsite + 'mock/admin/order-checkComment.json', 'get', '查看历史回复'],
            ['changeStatus', site.staticWebsite + 'mock/admin/login.json', 'get', '改变订单状态'],
            ['sendCommentInfo', site.staticWebsite + 'mock/admin/send-comment-info.json', 'get', '发送回复评价的信息']
        ],
        //菜品管理
        DishManagement: [
            //菜品分类管理
            ['delClassify', site.staticWebsite + 'mock/admin/login.json', 'get', '删除菜品分类'],
            ['saveAddClassify', site.staticWebsite + 'mock/admin/login.json', 'get', '添加分类的保存'],
            ['saveEditClassify', site.staticWebsite + 'mock/admin/login.json', 'get', '编辑分类的保存'],
            
            //每日菜品添加-录入
            ['getStoreDishList', site.staticWebsite + 'mock/admin/dish-classify-list-input.json', 'get', '获取菜品分类列表'],
            ['sendAddDishInfo', site.staticWebsite + 'mock/admin/send-dish-info.json', 'get', '发送添加的菜品信息'],
            ['sendEditDishInfo', site.staticWebsite + 'mock/admin/send-dish-info.json', 'get', '发送编辑的菜品信息'],
            ['delDish', site.staticWebsite + 'mock/admin/del-dish.json', 'get', '删除菜品'],
            ['submitAddDish', site.staticWebsite + 'mock/admin/submit-add-dish.json', 'get', '提交录入菜品'],

            //每日菜品添加-经理审核
            ['getAuditDishList', site.staticWebsite + 'mock/admin/dish-classify-list.json', 'get', '获取菜品分类列表'],
            ['isCanOrder', site.staticWebsite + 'mock/admin/canOrder.json', 'get', '是否开启点餐'],
            ['sendStatusAjax',site.staticWebsite + 'mock/admin/return-status-str.json', 'get', '发送审核状态']
        ]
    };
})();