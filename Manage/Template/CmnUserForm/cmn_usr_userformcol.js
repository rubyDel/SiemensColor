﻿/// <reference path="../../Js/CmnMis/CmnMisControlOpt.js" />
/// <reference path="../../Js/CmnMis/CmnMisControlOpt.js" />
/// <reference path="../../../Js/ThirdLib/jquery.js" />
/// <reference path="../../Js/CmnMis/CmnMis.js" />
/// <reference path="../../../Js/md5.js" />
/// <reference path="../../Js/CmnMis/CmnMisUserForm.js" />
/// <reference path="../../Js/CmnMis/CmnMisControl.js" />

//填充之前的事件
CmnMis.CurUserForm.BeforeFillRecList.Add(function (data) {

    var _dat = CmnAjax.GetData(InterfaceUrl, {   CurUserFormID: data[0]["userformid"], method: "GetColumnInfo"  });
    data.length = 0;
    data = $.extend(data, _dat.data);

    for (var _i = 0; _i < data.length; _i++) {
       
        if (data[_i]["IsShowHtml"] == "1" || data[_i]["IsShowHtml"] == "True") { data[_i]["IsShowHtml"] = "yescheck"; }
        else { data[_i]["IsShowHtml"] = "nocheck"; }

        if (data[_i]["IsShowInGrid"] == "1" || data[_i]["IsShowInGrid"] == "True") {
            data[_i]["IsShowInGrid"] = "yescheck";
            data[_i]["isshowcol"] = "";
        }
        else {
            data[_i]["IsShowInGrid"] = "nocheck";
            data[_i]["isshowcol"] = "hide";
        }

        if (data[_i]["IsShowInEdit"] == "1" || data[_i]["IsShowInEdit"] == "True") {
            data[_i]["IsShowInEdit"] = "yescheck";
            data[_i]["isShowEditCol"] = "jscEdit";
        }
        else {
            data[_i]["IsShowInEdit"] = "nocheck";
            data[_i]["isShowEditCol"] = "";
        }

        data[_i]["ControlCfg"] = Cmn.IsType(data[_i]["ControlCfg"], "object") ?
            JSON.stringify(data[_i]["ControlCfg"]) : data[_i]["ControlCfg"];
    }


    //设置表单名称
    $(".jscUserFromDesc").html(CmnMis.Func.GetUserFormByID(UserFormColManage.TargetUserFormID).UserFormDesc);
});

//jquery
$.fn.RadioButton = function () {
    $(this).each(function (index,item) {
        if ($(item).hasClass("yescheck")) {
            $(this).attr("value", "1");
        } else {
            $(this).attr("value", "0");
        }
    });

    $(this).off("click").on("click", function () {
        if ($(this).hasClass("yescheck")) {
            $(this).removeClass("yescheck").addClass("nocheck");
            $(this).attr("value", "0");
            $(this).trigger("change");
        }
        else {
            $(this).removeClass("nocheck").addClass("yescheck");
            $(this).attr("value", "1");
            $(this).trigger("change");
        }
    });
}

var UserFormColManage = {
    IsShowEditColByAll:false,
    //目标表单代码
    TargetUserFormID: CmnMis.CurUserForm.GetShowViewStateData().ReturnUserFormID,
    SaveUserFormID: CmnMis.Func.GetUserFormIDByDesc("用户表单字段管理"),
    RegularUserFormID: CmnMis.Func.GetUserFormIDByDesc("正则表达式管理"),
    ControlTypeUserFormID: CmnMis.Func.GetUserFormIDByDesc("控件类型管理"),
    Update: function (curFormDom, onUpdate, updateComplete) {

        var _recDom = $(curFormDom).find(".jscRec"),
            _updateCount = 0,
            _updateTotalCount = _recDom.length;

        $(curFormDom).find(".jscRec").each(function (index, item) {
            var _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: $(item).attr("recid") };
            $(item).find(".jscColDOM").each(function (i, v) {
                var _val = "";
                if (v.nodeName == "INPUT" || v.nodeName == "SELECT") {
                    _val = $(v).val();
                    if (v.nodeName == "INPUT") { _val = _val || $(v).text(); }
                }
                else if (v.nodeName == "SPAN" && $(v).hasClass("jscRadio")) { _val = $(v).attr("value")||'1'; }
                else { _val = $(v).text(); }
                _param[$(v).attr("colname")] = _val;
            });

            (function (param) {
                CmnAjax.PostData(InterfaceUrl + "?method=UpdateRec", param, function (data) {
                    _updateCount++;
                    if (data.IsSuccess == '1') {
                        onUpdate && onUpdate({ state: true, msg: "更新成功", colName: param["ColTitle"] });
                    }
                    else {
                        onUpdate && onUpdate({ state: false, msg: "更新失败", colName: param["ColTitle"] });
                    }
                    if (_updateTotalCount == _updateCount) {
                        updateComplete && updateComplete({ state: true, msg: "更新完成"});
                    }
                });
            })(_param);

        });
    },
    Add: function (curFormDom, onAdd) {

        var _param = {
            CurUserFormID: UserFormColManage.SaveUserFormID, userid: '1',
            userformid: this.TargetUserFormID
        };

        $(curFormDom).find(".jscCol").each(function (i, v) {

            var _val = "";
            if (v.nodeName == "INPUT" || v.nodeName == "SELECT") {
                _val = $(v).val() ;
                if (v.nodeName == "INPUT") { _val = _val || $(v).text(); }
                $(v).val((!!$(v).attr("default")?$(v).attr("default"):""));
            }
            else if (v.nodeName == "SPAN" && $(v).hasClass("jscRadio")) { _val = $(v).attr("value"); }
            else { _val = $(v).text(); $(v).text("");}
            if (!!_val && _val!=0) _param[$(v).attr("colname")] = _val;
        });
        
        (function (param) {

            var _p = $.extend({ ColName: "", ColTitle: "", ColAlign: 1, ColWidth: "100", is_required: 0, IsShowInGrid: 0, IsShowInEdit: 0, IsShowHtml: 0 }, param);

            CmnAjax.PostData(InterfaceUrl + "?method=AddRec", _p, function (data) {
               if (data.IsSuccess == '1') {
                   onAdd && onAdd({ state: true, msg: "添加成功" });
               }
               else {
                   onAdd && onAdd({ state: false, msg: "添加失败" + data.ErrMsg });
               }
           });
       })(_param);
    },
    Del: function (recDom, onDel) {

        if (!window.confirm("确认删除" + recDom.find(".jscColDOM[colname=ColName]").val() + "吗？")) { return; }

        var _userFormColId = recDom.attr("recid"),
            _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: _userFormColId };

        CmnAjax.PostData(InterfaceUrl + "?method=DeleteRec", _param, function (data) {
            if (data.IsSuccess == '1') {
                onDel && onDel({ state: true, msg: "删除成功" });
            }
            else {
                onDel && onDel({ state: false, msg: "删除失败" + data.ErrMsg });
            }
        });

    }
}
 

 //加载之后的事件
CmnMis.CurUserForm.AfterRecListLoad.Add(function () {

    var _curFormDom = $(CmnMis.CurUserForm.GetUserFormSelector());
 
    //修正字段对齐方式填充无法设置的问题
    _curFormDom.find(".cmn-RecListView").find(".jscColDOM[colname=ColAlign]").not(".jscColDOM[v=1]").each(function () {
        $(this).val($(this).attr("v"));
    });

    //绑定自定义单选按钮
    _curFormDom.find(".jscRadio").RadioButton();


    //是否只显示列表字段
    _curFormDom.find(".jscShowListCol").off("change").on("change", function () {
        _curFormDom.find(".jscShowEditCol").removeClass("yescheck").addClass("nocheck");
        _curFormDom.find(".jscShowEditCol").attr("value", "0");
        UserFormColManage.IsShowEditColByAll = false;
        if ($(this).attr("value") == "0") {
            //显示非列表字段
            _curFormDom.find(".jscRec.hide").show();
            _curFormDom.find(".jscRec.jscEdit").show();
        }
        else {
            _curFormDom.find(".jscRec").show();
            _curFormDom.find(".jscRec.hide").hide();
        }
    });

    //是否只显示编辑字段
    _curFormDom.find(".jscShowEditCol").off("change").on("change", function () {
        _curFormDom.find(".jscShowListCol").removeClass("yescheck").addClass("nocheck");
        _curFormDom.find(".jscShowListCol").attr("value", "0");
        UserFormColManage.IsShowEditColByAll = true;
        if ($(this).attr("value") == "0") { _curFormDom.find(".jscRec").show(); }
        else {
            _curFormDom.find(".jscRec").hide();
            _curFormDom.find(".jscRec.jscEdit").show();
        }
    });

    //是否显示在列表页的选项框
    _curFormDom.find(".jscHowingrid").off("change").on("change", function () {
        if ($(this).attr("value") == "1") {
            //如果当前页面在列表页
            $(this).parents(".jscRec").removeClass("hide");
        } else {
            $(this).parents(".jscRec").addClass("hide");
            if (!UserFormColManage.IsShowEditColByAll) {
                $(this).parents(".jscRec").hide();
            }
            else { $(this).parents(".jscRec").show(); }
        }
    });

    //是否显示在编辑页的选项框
    _curFormDom.find(".jscHowinedit").off("change").on("change", function () {
        if ($(this).attr("value") == "1") {

            //如果当前页面在列表页
            $(this).parents(".jscRec").addClass("jscEdit");
        }
        else {

            $(this).parents(".jscRec").removeClass("jscEdit");
            if (UserFormColManage.IsShowEditColByAll) {
                $(this).parents(".jscRec").addClass("hide");
                $(this).parents(".jscRec").hide();
            }
        }
    });
    
    // 隐藏序列
    $(".jscSortID").hide();
    $(".jscNo").hide();

    //拖动排序
    if (_curFormDom.find(".jscRecContainer").find(".ui-widget-content").length > 0) {
        _curFormDom.find(".jscRecContainer").sortable('destroy');
    }

    _curFormDom.find(".jscRecContainer").sortable({
        opacity: 0.8,                //设置拖动时候的透明度
        axis: "y",                    //拖动方向
        cursor: 'move',              //拖动的时候鼠标样式
        stop: function (event, ui) { //完成拖动之后自动排序
            $(".jscRec").each(function (index, item) {
                $(item).find("td.dat-sortid").html(index);
            });
        }
    });


    var _layer = {

        show: function (selector) {

            if (!_curFormDom.find(".cg-UI-LayerContainer").hasClass(Cmn.UI.GetSelectorName(selector))) {

                if (_curFormDom.find(".cg-UI-LayerContent").find("div").length > 0) {
                    _curFormDom.find(".cg-UI-LayerContent").find("div").eq(0).hide().insertAfter(".cg-UI-LayerContainer");
                }

                _curFormDom.find(selector).appendTo(_curFormDom.find(".cg-UI-LayerContent")).show();
            }

            _curFormDom.find(".cg-UI-LayerContentContainer").css({ "right": "-500px", "opacity": "0" });
            _curFormDom.find(".cg-UI-LayerContainer").show().find(".cg-UI-LayerContentContainer").animate({ "right":"0%", "opacity": "1" });

        },
        hide: function () {
            _curFormDom.find(".cg-UI-LayerContainer").fadeOut(700);
            _curFormDom.find(".cg-UI-LayerContainer").find(".cg-UI-LayerContentContainer").animate({ "right": "-500px" });
        }

    }

    _curFormDom.find(".cg-UI-LayerMask").off("click").on("click", function () { _layer.hide(); })

    //添加字段信息
    _curFormDom.undelegate(".jscAddBtn", "click").delegate(".jscAddBtn", "click", function (e) {
        _layer.show(".jscAddColContainer");
        //设置默认排序
        $(".jscAddColContainer").find(".jscCol[colname=sortid]").val(($(".jscRec").last().find(".jscColDOM[colname=sortid]").text() * 1 + 1));
    });

    //控件配置
    _curFormDom.undelegate(".jscColCtlCfgBtn", "click").delegate(".jscColCtlCfgBtn", "click", function (e) {

        var _cfg = $(this).parents(".jscRec").find(".jscControlcfg").html();

        _layer.show(".jscControlCfgContainer");

        $(".jscControlSelectContent").data("ControlCfg", _cfg);
        $(".jscControlSelectContent").data("formDOM", $(this).parents(".jscRec").find(".jscControlcfg"));

        $(".jscControlSelectContent").attr("recid", $(this).parents(".jscRec").attr("recid"));

        $(".jscCurColName").html($(this).parents(".jscRec").find(".dat-ColName-value").val());
        $(".jscCurColTitle").html($(this).parents(".jscRec").find(".dat-ColTitle-value").val());

        $(".jscControlTypeSelect").val($(this).parents(".jscRec").find(".jscControlcfg").attr("colcontroltypeid"));
        $(".jscControlTypeSelect").change();
    });


    //更新控件配置
    _curFormDom.find(".cg-UI-LayerContainer").undelegate("click")
        .delegate(".jscSavaSubmitControl", "click", function () {

        var _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: $(".jscControlSelectContent").attr("recid") };

        //获取生成的控件配置
        _param.controlcfg = CmnMis.UI.Control.CustomPanel.GetValueList(".jscControlCfgContent");
        //控件类型代码
        _param.colcontroltypeid = $(".jscControlTypeSelect").val();


        CmnAjax.PostData(InterfaceUrl + "?method=UpdateRec", _param, function (data) {
            if (data.IsSuccess == '1') {
                alert("更新成功！");
                $(".jscControlSelectContent").data("ControlCfg", _param.controlcfg);
                $(".jscControlSelectContent").data("formDOM") && $(".jscControlSelectContent").data("formDOM").html(_param.controlcfg);
                $(".jscControlSelectContent").data("formDOM") && $(".jscControlSelectContent").data("formDOM").parents(".jscRec").find(".jscControlcfg").attr("colcontroltypeid", _param.colcontroltypeid);
            }
            else { alert("更新失败！"); }

            _layer.hide();
        });

    });

    //取消控件配置编辑
    _curFormDom.find(".cg-UI-LayerContainer").delegate(".jscCancelControlEdit", "click", function () {
        _layer.hide();
    });
    
    //控件配置
    $(".jscControlSelectContent").undelegate("change").delegate(".jscControlTypeSelect", "change", function () {

        //创建控件配置的配置面板
        CmnMis.UI.Control.CustomPanel.CreateCtlCfgPanel($(this).find("option:selected").text(), ".jscControlCfgContent");
        //设置初始值
        CmnMis.UI.Control.CustomPanel.SetValueList(".jscControlCfgContent",
            $(".jscControlSelectContent").data("ControlCfg"));

    });


    _curFormDom.undelegate(".jscAddBtn", "mouseenter").delegate(".jscMoreBtn", "mouseenter", function (e) {
        $(this).parent(".jscTools").find(".jscMorePanel").fadeIn();
    });

    _curFormDom.undelegate(".jscTools", "mouseleave").delegate(".jscTools", "mouseleave", function (e) {
        $(this).find(".jscMorePanel").hide();
    });



    //提交更新
    _curFormDom.find(".jscSavaSubmit").off("click").on("click", function () {
        UserFormColManage.Update(_curFormDom, function (e) {
            console.log(e.ColName + ":" + e.msg);
        }, function (e) {
            if (e.state) { Cmn.alert(e.msg);}
        });
    });

    //提交添加
    _curFormDom.find(".jscSavaAddSubmit").off("click").on("click", function () {
        UserFormColManage.Add(_curFormDom, function (e) {
            if (e.state) {
                _layer.hide();
                CmnMis.CurUserForm.GetRecList();
            }
            else { alert(e.msg); }
        });
    });

    //删除
    _curFormDom.find(".jscDelRecByID").off("click").on("click", function () {
       
        UserFormColManage.Del($(this).parents(".jscRec"), function (e) {
            if (e.state) {
                CmnMis.CurUserForm.GetRecList();
            }
            else { alert(e.msg); }
        });
       
    });

    //填充控件类型
    CmnAjax.PostData(InterfaceUrl + "?method=GetRecList", {
        "CurUserFormID": UserFormColManage.ControlTypeUserFormID,
        "SortBy": "[controltypedesc] asc"
    }, function (data) {
        Cmn.FillData(".jscControlType", data.data);
    });

    //填充正则表达式
    CmnAjax.PostData(InterfaceUrl + "?method=GetRecList", { "CurUserFormID": UserFormColManage.RegularUserFormID }, function (data) {
        Cmn.FillData(".jscRegular", data.data);
    });
});
  