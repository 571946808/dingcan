/*-----------------------------------------------------------------------------
 * @Description:     基本信息管理-用户添加
 * @Version:         2.0.0
 * @author:          hujun(435043636@qq.com)
 * @date             2016.9.1
 * ==NOTES:=============================================
 * v1.0.0 2016.9.1:
 初始生成
 * ---------------------------------------------------------------------------*/
KISSY.add('page/basic-information-management/user-information-add', function(S, Add){
    PW.namespace('page.UserManagement.Add');
    PW.page.UserManagement.Add = function(param){
        new Add(param);
    }
},{
    requires: [
        'user-management/add'
    ]
});
KISSY.add('user-management/add', function (S) {
    var
        $ = S.all,
        DOM = S.DOM,
        on = S.Event.on,
        Defender = PW.mod.Defender,
        UserManagementIO = PW.io.BasicInfoManagement.userManagement,
        config = {},
        el = {
            //操作顾客、便利店表单
            operStoreForm: '.J_operStoreForm',
            //操作顾客、便利店表单
            operAdminForm: '.J_operAdminForm',
            //管理员用户名input
            adminNameInp: '.J_adminName',
            //顾客、便利店手机号 input
            phoneInp: '.J_phone',
            //密码
            passwordInp: '.J_password',
            //确认密码
            confirmPasswordInp: '.J_confirmPassword',
            //保存顾客、便利店
            submitStoreBtn: '.J_submitStoreBtn',
            //保存管理员
            submitAdminBtn: '.J_submitAdminBtn',
            //提示条
            tipContainer: '.J_tip',
            //店面
            storeChooseTrigger: '.J_storeType',
            //店面名称
            storeEl: '.J_store',
            //店面单选框
            storeInp: '.J_store input',
            //操作类型
            operTypeInp: '.J_operType',
            //标志操作类型隐藏input
            identifyOperInp: '.J_identifyOper',
            //选项卡菜单
            navTrigger: '.J_nav li',
            //选项面板div
            tabContentEl: '.tab-content'
        },
        DATA_OPER_TYPE = 'data-oper-type';

    function Add(param) {
        this.opts = S.merge(config, param);
        this.defender;
        this.isPass;
        this.tabType;
        this.submitStoreBtn = DOM.data(el.submitStoreBtn, 'btn');
        this.submitAdminBtn = DOM.data(el.submitAdminBtn, 'btn');
        this._init();
    }
    S.augment(Add, {
        _init: function () {
            this._tabType();
            this._buildEvent();
            this._hideTip();
        },
        _tabType: function () {
            var
                that = this,
                tabChildrenEls = DOM.children(el.tabContentEl);

            S.each(tabChildrenEls, function (item) {
                if(DOM.hasClass(item, 'active')){
                    if(DOM.attr(item, 'id') == 'user-store'){
                        //用户、顾客
                        that.tabType = 0;
                        that._initUserType();
                        that._validStoreRepeat();
                    }else{
                        //管理员
                        that.tabType = 1;
                        that._validAdminRepeat();
                    }
                }
            });
        },
        _buildEvent: function () {
            var
                that = this,
                operMark = DOM.attr(el.operTypeInp, DATA_OPER_TYPE);

            on(el.storeChooseTrigger, 'click', function () {
                that._initUserType();
            });

            on(el.navTrigger, 'click', function () {
                that._tabType();
            });

            that.submitStoreBtn.on("loading", function () {
                that._submitStoreHandler();
                return false;
            });

            that.submitAdminBtn.on("loading", function () {
                that._submitAdminHandler();
                return false;
            });

            //若为编辑页
            if(operMark == 0){
                on(el.passwardEl, 'blur', function(){
                    that._isEditPage();
                });
                on(el.confirmPwdEl, 'blur', function(){
                    that._isEditPage();
                });
            }else{
                that.isPass = 1;
            }
        },
        /**
         * 若为编辑页，判断密码和确认密码域的值是否一致
         * @return {Boolean} [description]
         */
        _isEditPage: function(){
            var
                that = this,
                password = DOM.val(el.passwordInp),
                confirmPwd = DOM.val(el.passwordInp),
                errorTip = DOM.next(el.passwordInp);

            if(confirmPwd == password){
                DOM.addClass(el.confirmPasswordInp, 'success-field');
                DOM.removeClass(el.confirmPasswordInp, 'error-field');
                DOM.removeClass(errorTip, 'pw-tip');
                DOM.removeClass(errorTip, 'error-state');
                DOM.text(errorTip, '');
                that.isPass = true;
            }else{
                DOM.addClass(el.confirmPasswordInp, 'error-field');
                DOM.addClass(errorTip, 'pw-tip');
                DOM.addClass(errorTip, 'error-state');
                DOM.text(errorTip, '两次密码不同，请重新输入');
                that.isPass = false;
            }
        },
        /**
         * 初始化用户类型，若选择店面，则展示具体的店面信息
         * @private
         */
        _initUserType: function () {
            var
                storeChooseEl = DOM.get(el.storeChooseTrigger),
                storeInpEls = DOM.query(el.storeInp);

            if(storeChooseEl.checked){
                //展开店面选择
                DOM.removeClass(el.storeEl, 'hidden');
                storeInpEls[0].checked = true;
            }else{
                //收起店面选择
                //设置为未选，避免选中的数据在隐藏的状态下仍被提交
                S.each(storeInpEls, function (item) {
                    item.checked = false;
                });
                DOM.addClass(el.storeEl, 'hidden');
            }
        },
        /**
         * 店面、顾客选项页保存提交表单
         * @private
         */
        _submitStoreHandler: function () {
            var
                that = this,
                form = DOM.get(el.operStoreForm);

            //提交表单时验证所有的input
            that.defender.validAll(function (rs) {
                if(rs && that.isPass){
                    setTimeout(function () {
                        form.submit();
                    }, 2000);
                }else {
                    that.submitStoreBtn.reset();
                    return false;
                }
            });
        },
        /**
         *  管理员选项页保存提交表单
         * @private
         */
        _submitAdminHandler: function () {
            var
                that = this,
                form = DOM.get(el.operAdminForm);

            //提交表单时验证所有的input
            that.defender.validAll(function (rs) {
                if(rs && that.isPass){
                    setTimeout(function () {
                        form.submit();
                    }, 2000);
                }else {
                    that.submitAdminBtn.reset();
                    return false;
                }
            });
        },
        /**
         * 提示信息隐藏
         * @private
         */
        _hideTip: function(){
            var
                that = this,
                tipEl = S.one(el.tipContainer);

            if(tipEl){
                setTimeout(function(){
                    DOM.remove(el.tipContainer);
                }, 2000);
            }
        },
        /**
         * 验证顾客、便利店手机号是否重复
         * @private
         */
        _validStoreRepeat: function () {
            var
                that = this;
            that.defender = Defender.client(el.operStoreForm, {
                theme: 'inline',
                items: [
                    //验证用户名（电话）是否重复
                    {
                        queryName: el.phoneInp,
                        pattern: function(input,shell,form){
                            var
                                phoneEl = DOM.val(el.phoneInp),
                                tipEl = DOM.next(el.phoneInp, '.pw-tip');

                            if(this.test('isMobile', phoneEl)){
                                //发ajax验证手机号是否已存在
                                UserManagementIO.validUserIsRepeat({
                                    phone: phoneEl
                                }, function(rs, errMsg){
                                    if(rs){
                                        shell.updateState('success');
                                    }else{
                                        shell.updateState('error');
                                        DOM.text(tipEl, errMsg);
                                    }
                                });
                            }else{
                                return false;
                            }
                            return 'loading';
                        },
                        showEvent:'focus',
                        vldEvent:'blur',
                        tip:'请输入手机号|手机号输入有误，请重新输入',
                        async: true
                    }
                ]
            });
        },
        /**
         * 验证管理员用户名是否重复
         */
        _validAdminRepeat: function () {
            var
                that = this;

            that.defender = Defender.client(el.operAdminForm, {
                theme: 'inline',
                items: [
                    //验证用户名（电话）是否重复
                    {
                        queryName: el.adminNameInp,
                        pattern: function(input,shell,form){
                            var
                                adminNameEl = DOM.val(el.adminNameInp),
                                tipEl = DOM.next(el.adminNameInp, '.pw-tip');

                            if(adminNameEl != ''){
                                //发ajax验证管理员用户名是否已存在
                                UserManagementIO.validAdminIsRepeat({
                                    username: adminNameEl
                                }, function(rs, errMsg){
                                    if(rs){
                                        shell.updateState('success');
                                    }else{
                                        shell.updateState('error');
                                        DOM.text(tipEl, errMsg);
                                    }
                                });
                            }else{
                                return false;
                            }
                            return 'loading';
                        },
                        showEvent:'focus',
                        vldEvent:'blur',
                        tip:'请输入用户名|用户名输入有误，请重新输入',
                        async: true
                    }
                ]
            });
        }
    });
    return Add;
},{
    requires:[
        'widget/dialog',
        'mod/defender',
        'widget/btn',
        'pio/basic-information-management/user-management'
    ]
});


