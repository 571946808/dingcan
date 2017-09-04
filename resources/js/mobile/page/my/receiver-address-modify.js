/*-----------------------------------------------------------------------------
 * @Description:     地址修改
 * @Version:         1.0.0
 * @author:          yudan（862669640@qq.com）
 * @date             2016.09.08
 * ==NOTES:=============================================
 * v1.0.0(2016.09.08):
 初始生成
 * ------------------------------------------------------------*/
 KISSY.add('page/my/receiver-address-modify',function(S,Core){
 	PW.namespace('page.ReceiverAddressModify');
 	PW.page.ReceiverAddressModify = function(param){
 		new Core(param);
 	}
 },{
 	requires:[
 		'receiver-address-modify/core'
 	]
 });
/*---------------------------------------------------------------------------*/
KISSY.add('receiver-address-modify/core', function(S){
	var
		DOM = S.DOM, get = DOM.get, $ = S.all,
		on = S.Event.on, delegate = S.Event.delegate,
		ReceiverAddressIO = PW.io.ReceiverAddress,
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
			// 删除触发器
			delTrigger: '.J_del',
			//表单元素
			submitForm: '.J_submitForm',
			//提交触发器
			submitTrigger: '.J_submitBtn'
		},
		// 收货地址ID
		DATA_ADDRESS_ID = 'data-address-id';

	function Core(param){
		this._init();
	}

	S.augment(Core, {
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

			//提交表单
			 on(el.submitTrigger, 'tap', function(e){
                that._valid(e.currentTarget);
			});		

			// 删除
			delegate(document, 'tap', el.delTrigger, function(e){
				that._delAddress(e.target);
			});	

			//验证联系人
			on(el.nameEl, 'blur', function(){
                that._validName();
            });	

            //验证手机号
			on(el.phoneEl, 'blur', function(){
                that._validPhone();
            });	

			//验证收货地址
            on(el.addressEl, 'blur', function(){
                that._validAddress();
            });	
		},
		/**
		 * 删除收货地址
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		_delAddress: function(e){
			var
				that = this,
				confirmDelAddress = confirm("确定删除该地址？"),
				header = DOM.parent(e, 'div'),
				addressPage = DOM.parent(header);

			if(confirmDelAddress == true){
				ReceiverAddressIO.delAddress({
					id: DOM.attr(addressPage, DATA_ADDRESS_ID)
				}, function(rs, errMsg){
					if(!rs){
						alert(errMsg);
					}else{
						window.history.go(-1);
					}
				});
			}
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
            	//通过验证
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
	                DOM.text(el.errorEl, '请输入合法的手机号');
	                DOM.show(el .errorEl);
	                that.rightPhone = false;
	            }else{
	                DOM.hide(el.errorEl);
	                that.rightPhone = true;
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
		            	DOM.text(el.errorEl, '请输入收货地址');
		                DOM.show(el.errorEl);
		                that.rightAddress = false;
		            }else{
		                DOM.hide(el.errorEl);
		                that.rightAddress = true;
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
	return Core;
},{
	requires: [
		'widget/dialog',
		'pio/address-del',
		'widget/btn'
	]
});
