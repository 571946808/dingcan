/*-----------------------------------------------------------------------------
* @Description:     菜品管理-分类管理
* @Version:         1.0.0
* @author:          jiangx(631724595@qq.com)
* @date             2016.9.1
* ==NOTES:=============================================
* v1.0.0(2016.9.1):
     初始生成
* -------------------------------------------------------------*/
KISSY.add('page/dish-management/dish-classify-management', function(S,Core){
    PW.namespace('page.DishManagement.DishClassifyManagement');
    PW.page.DishManagement.DishClassifyManagement = function(param){
        new Core(param);
    }
}, {
    requires:[
        'dish-classify-management/core'
    ]
})
/*------------------------------------------------------------------*/
KISSY.add('dish-classify-management/core', function(S){
    var
        DOM = S.DOM, $ = S.all,
        delegate = S.Event.delegate, on = S.Event.on,
        Dialog = PW.widget.Dialog,
        Juicer = PW.mod.Juicer,
        DishClassifyIO = PW.io.DishClassifyManagement,
        config = {},
        el = {
            //添加触发器
            addTrigger: '.J_add',
            //编辑触发器
            editTrigger: '.J_edit',
            //删除触发器
            delTrigger: '.J_delete',
            //数据容器 tbody
            dataContainer: '.J_dataContainer',
            //添加模板
            addtpl: '#addTpl',
            //取消触发器
            cancleTrigger: '.J_cancel',
            //分类名称Tr
            nameEl: '.J_name',
            //保存触发器
            saveTrigger: '.J_save',
            //暂无数据的提示
            tipEl: '.J_tip'
        },
        DATA_CLASSIFY_ID = 'data-classify-id',
        TIP = ['操作失败：已存在编辑项，请保存或取消后再操作！', '确定删除该分类？', '确定保存该分类？']

    function Core(param){
        this.opts = S.merge(config, param);
        this.hasEdit = 0;
        this._init();
    }

    S.augment(Core, {
        _init: function(){
            this._bulidEvt();
            this._showTip();
        },
        /**
         * 没有数据时提示暂无信息
         * @return {[type]} [description]
         */
        _showTip: function(){
            var
                that = this,
                hasTr = S.one('tr', el.dataContainer),
                tipStr = '<tr class="J_tip"><td colspan="2" class="text-center">暂无数据</td></tr>';

            if(hasTr){
                DOM.remove(el.tipEl);
            }else{
                $(el.dataContainer).append(tipStr);
            }
        },
        _bulidEvt: function(){
            var 
                that = this;

            on(el.addTrigger, 'click', function(){
                if(that.hasEdit == 0){
                    that._addClassify();
                }else{
                    Dialog.alert(TIP[0]);
                }
            });

            delegate(document, 'click', el.editTrigger, function(e){
                if(that.hasEdit == 0){
                    that._editClassify(e.target);
                }else{
                    Dialog.alert(TIP[0]);
                }
            });

            delegate(document, 'click', el.delTrigger, function(e){
                if(that.hasEdit == 0){
                    that._delete(e.target);
                }else{
                    Dialog.alert(TIP[0]);
                }
            });

            delegate(document, 'click', el.cancleTrigger, function(e){
                that._cancel(e.target);
            });

            delegate(document, 'click', el.saveTrigger, function(e){
                that._save(e.target);
            })
        },
        /**
         * 添加分类操作
         */
        _addClassify: function(){
            var
                that = this,
                addTpl = DOM.html(el.addtpl), 
                addTplStr = Juicer.client(addTpl, {}),
                addEl = DOM.create(addTplStr),
                hasTip = S.one(el.tipEl);

            if(hasTip){
                DOM.remove(el.tipEl);
            }
            that.hasEdit = 1;
            DOM.append(addEl,el.dataContainer);
        },
        /**
         * 编辑操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _editClassify: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                nameInp = DOM.get(el.nameEl, tr),
                name = DOM.text(nameInp),
                id = $(tr).attr(DATA_CLASSIFY_ID),
                addTpl = DOM.html(el.addtpl),
                addTplStr = Juicer.client(addTpl, {
                    name:name, 
                    id:id, 
                    isEdit:1
                }),
                addEl = DOM.create(addTplStr);

            that.hasEdit = 1;
            DOM.insertAfter(addEl, tr);
            DOM.hide(tr);
        },
        /**
         * 删除操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _delete: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                id = $(tr).attr(DATA_CLASSIFY_ID);

            Dialog.confirm(TIP[1], function(){
                DishClassifyIO.delClassify({id: id}, function(rs, errMsg){
                    if(rs){
                        $(tr).remove();
                        that._showTip();
                    }else{
                        Dialog.alert(errMsg);
                    }
                });
            });
        },
        /**
         * 取消操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _cancel: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                prevTr = DOM.prev(tr);

            $(prevTr).show();
            $(tr).remove();
            that.hasEdit = 0;
            that._showTip();
        },
        /**
         * 保存操作
         * @param  {[type]} ele [description]
         * @return {[type]}     [description]
         */
        _save: function(ele){
            var
                that = this,
                tr = $(ele).parent('tr'),
                isEdit = DOM.attr(tr,'isEdit'),
                nameInp = DOM.get('input', tr),
                name = DOM.val(nameInp),
                id;

            Dialog.confirm(TIP[2], function(){
                if(isEdit == 1){
                    id = DOM.attr(tr, DATA_CLASSIFY_ID);
                    that._saveEdit(name, id, tr);
                }else{
                    that._saveAdd(name);
                }
            });
        },
        /**
         * 编辑后保存
         * @param  {[type]} name [description]
         * @param  {[type]} id   [description]
         * @param  {[type]} tr   [description]
         * @return {[type]}      [description]
         */
        _saveEdit: function(name, id, tr){
            var
                that = this;

            DishClassifyIO.saveEdit({name: name, id: id}, function(rs, errMsg){
                if(rs){
                    that._renderClassify(tr, name);
                }else{
                    Dialog.alert(errMsg);
                }
            });
        },
        /**
         * 渲染编辑后的分类
         * @param  {[type]} tr   [description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        _renderClassify: function(tr, name){
            var
                that = this,
                prevTr = DOM.prev(tr),
                nameEl = DOM.get(el.nameEl, prevTr);

            DOM.text(nameEl, name);
            $(prevTr).show();
            $(tr).remove();
            that.hasEdit = 0;
        },
        /**
         * 保存新添加项
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        _saveAdd: function(name){
            var
                that = this;

            DishClassifyIO.saveAdd({name: name}, function(rs, errMsg){
                if(rs){
                    location.reload();
                }else{
                    Dialog.alert(errMsg);
                }
            });
        }
    });

    return Core;
}, {
    requires:[
        'mod/juicer',
        'widget/dialog',
        'pio/dish-management/dish-classify-management'
    ]
})