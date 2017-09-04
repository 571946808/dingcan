/*-----------------------------------------------------------------------------
* @Description:     新增地址
* @Version:         2.0.0
* @author:          yud(862669640@qq.com)
* @date             2016.9.9
* ==NOTES:=============================================
* v1.0.0(2016.9.9):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('page/my/receiver-address-add', function(S,Add){
	PW.namespace("page.ReceiverAddressAdd");
	PW.page.ReceiverAddressAdd = function(param){
		new Add(param);
	}
},{
	requires: [
		'receiver-address/add'
	]
});
/*---------------------------------------------------------------------------*/
KISSY.add("receiver-address/add", function(S){
	var
		DOM = S.DOM, get = DOM.get,
		on = S.Event.on,
		delegate = S.Event.delegate,
		config = {},
		el = {
			//联系人
			nameEl: '.J_name',
			//联系人错误提示EL
            errorEl: '.J_error',
			//手机号El
            phoneEl: '.J_phone',
            //收货地址EL
            addressEl: '.J_address',
			//表单元素
			submitForm: '.J_submitForm',
			//提交触发器
			submitTrigger: '.J_submitBtn'
		};

	function Add(param){
		this._init();
	}

	S.augment(Add, {
		_init: function(){
			this._addEventListener();
			this.rightName = false;
			this.rightPhone = false;
			this.rightAddress = false;
		},
		/**
		 * 添加事件监听
		 */
		_addEventListener: function(){
			var
				that = this;
            //验证联系人
            on(el.nameEl, 'blur', function(){
                that._validName();
            });

            // //验证手机号
            on(el.phoneEl, 'blur', function(){
                that._validPhone();
            });

			//验证收货地址
            on(el.addressEl, 'blur', function(){
                that._validAddress();
            });

			//提交表单
			on(el.submitTrigger, 'tap', function(){
				setTimeout(function(){
					that._valid();
				},1000);
				return false;
			});
		},
		/**
         * 验证联系人
         * @return {[type]} [description]
         */
        _validName: function(){
            var
                that = this,
                input = DOM.val(el.nameEl);

            if(input == ''){
            	DOM.text(el.errorEl, '请输入联系人');
				DOM.show(el.errorEl);
				that.rightName = false;
            }else{
				that.rightName = true;
                DOM.hide(el.errorEl);
            }
        },
		/**
      		* 验证手机号
       		* @return {[type]} [description]
         */
        _validPhone: function(){
            var
                that = this,
                reg = /^[1]{1}[34578]{1}[0-9]{9}$/,
                input = DOM.val(el.phoneEl);

            if(that.rightName){
            	if(!reg.test(input)){
            		that.rightPhone = false;
	                DOM.text(el.errorEl, '请输入合法的手机号');
	                DOM.show(el .errorEl);
	            }else{
					that.rightPhone = true;
					DOM.hide(el.errorEl);
	            }
            }else{
                that._validName();
            }
        },
        /**
         * 验证收货地址
         * @return {[type]} [description]
         */
        _validAddress: function(){
            var
                that = this,
                input = DOM.val(el.addressEl);

            if(that.rightName){
            	if(that.rightPhone){
	                if(input == ''){
	                	that.rightAddress = false;
		            	DOM.text(el.errorEl, '请输入收货地址');
		                DOM.show(el.errorEl);
		            }else{
		            	that.rightAddress = true;
		                DOM.hide(el.errorEl);
		            }
	            }else{
	                that._validPhone();
	            }
            }else{
                that._validName();
            }
        },
  		/**
		 * 提交表单
		 * @return {[type]} [description]
		 */
		_valid: function(){
			var
				that = this,
				form = get(el.submitForm);

			if(that.rightName && that.rightPhone && that.rightAddress) {
				form.submit();
			}else{
				that._validAddress();
			}
		}
	});
	return Add;
},{
	requires: [
		'mod/ext',
		'widget/btn'
	]
});