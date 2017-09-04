/*-----------------------------------------------------------------------------
 * @Description:     购物车
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.09.06
 * ==NOTES:=============================================
 * v1.0.0(2016.09.06):
 初始生成
 * ------------------------------------------------------------*/
KISSY.add('page/cart', function(S, Core){
    PW.namespace('page.Cart');
    PW.page.Cart = function(param){
        new Core(param);
    }
}, {
    requires:[
        'cart/core'
    ]
});
/*-------------------------------------------------------------*/
KISSY.add('cart/core', function(S){
    var
        DOM = S.DOM, $ = S.all,
        on = S.Event.on,
        CartIO = PW.io.Cart,
        el = {
            //减触发器
            subTrigger: '.J_sub',
            //加触发器
            plusTrigger: '.J_plus',
            //菜品数量El
            numberEl: '.J_number',
            //订单总菜品总数量
            totalNumEl: '.J_totalNum',
            //订单总金额
            totalPriceEl: '.J_totalPrice',
            //菜品Ul
            dishContainer: '.J_dishContainer',
            //确认订单
            confirmTrigger: '.J_confirm'
        },
        DATA_DISH_ID = 'data-dish-id';

    function Core(param){
        this._init();
    }

    S.augment(Core, {
        _init: function(){
            this._bulidEvt();
            this._checkLiNum();
        },
        _bulidEvt: function(){
            var
                that = this,
                hasli;

            on(el.subTrigger, 'tap', function(e){
                that._subNumber(e.currentTarget);
            });
            on(el.plusTrigger, 'tap', function(e){
                that._plusNumber(e.currentTarget);
            });
            on(el.confirmTrigger, 'tap', function(e){
                hasli = DOM.text(el.totalNumEl);
                if(hasli == 0){
                    DOM.css(el.confirmTrigger, 'background-color', '#cecccd');
                    return false;
                }
            });
        },
        /**
         * 减少操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _subNumber: function(ele){
            var
                that = this,
                numberEl = $(ele).next(el.numberEl),
                dishLi = $(ele).parent('li'),
                dishId = DOM.attr(dishLi, DATA_DISH_ID);
            //发ajax
            that._sendSubNum(dishId, numberEl);
        },
        /**
         * 添加操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _plusNumber: function(ele){
            var
                that = this,
                numberEl = $(ele).prev(el.numberEl),
                dishLi = $(ele).parent('li'),
                dishId = DOM.attr(dishLi, DATA_DISH_ID);
            //发ajax
            that._sendPlusNum(dishId, numberEl);
        },
        /**
         * ajax 减少数量
         * @param  {[type]} id       [description]
         * @param  {[type]} numberEl [description]
         * @return {[type]}          [description]
         */
        _sendSubNum: function(id, numberEl){
            var
                that = this;
            CartIO.subDish({id: id}, function(rs, data, errMsg){
                if(rs){
                    that._renderChange(data.totalMoney, numberEl, 0);
                    that._checkLiNum();
                }else{
                    alert(errMsg);
                }
            })
        },
        /**
         * ajax添加数量
         * @param  {[type]} id       [description]
         * @param  {[type]} numberEl [description]
         * @return {[type]}          [description]
         */
        _sendPlusNum: function(id, numberEl){
            var
                that = this;

            CartIO.plusDish({id: id}, function(rs, data, errMsg){
                if(rs){
                    that._renderChange(data.totalMoney, numberEl, 1);
                }else{
                    alert(errMsg);
                }
            })
        },
        /**
         * 渲染修改后的数量
         * @param  {[type]} totalMoney [description]
         * @param  {[type]} numberEl   [description]
         * @param  {[type]} type       [description]
         * @return {[type]}            [description]
         */
        _renderChange: function(totalMoney, numberEl, type){
            var
                that = this,
                currentNum = DOM.text(numberEl),
                totalNum = DOM.text(el.totalNumEl),
                li;

            DOM.text(el.totalPriceEl, totalMoney);
            if(type == 0){
                //减
                if(currentNum == 1){
                    li = DOM.parent(numberEl, 'li');
                    DOM.remove(li);
                }else{
                    DOM.text(numberEl, Number(currentNum) - 1);
                }
                DOM.text(el.totalNumEl, Number(totalNum) - 1);
            }else{
                DOM.text(numberEl, Number(currentNum) + 1);
                DOM.text(el.totalNumEl, Number(totalNum) + 1);
            }
        },
        /**
         * 检测当前是否有菜品，没有，禁止掉提交按钮
         * @return {[type]} [description]
         */
        _checkLiNum: function(){
            var
                that = this,
                hasli = S.one('li', el.dishContainer);

            if(!hasli){
                DOM.css(el.confirmTrigger, 'background-color', '#cecccd');
            }
        }
    });
    return Core;
}, {
    requires:[
        'mod/ext',
        'pio/cart'
    ]
});