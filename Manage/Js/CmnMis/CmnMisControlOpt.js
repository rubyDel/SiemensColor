﻿CmnMis_UI_Control_Version = "1.2.2", "undefined" == typeof CmnMis && (CmnMis = {}), CmnMis.UI || (CmnMis.UI = {}), function (object, event) { CmnMis.UI.Control = { Selector: { Container: ".cmn-Ctl-Container", ColNameContainer: ".cmn-Ctl-ColNameContainer", ColName: ".cmn-Ctl-ColName", ColIsRequired: ".cmn-Ctl-ColIsRequired", CtlContent: ".cmn-Ctl-Content", CtlTipContainer: ".cmn-Ctl-TipContainer", CtlVerifyContainer: ".cmn-Ctl-VerifyContainer", CtlVerifyRight: ".cmn-Ctl-VerifyRight", CtlVerifyError: ".cmn-Ctl-VerifyError", CtlErrTipDesc: ".cmn-Ctl-TipErrDesc", CtlTipDesc: ".cmn-Ctl-TipDesc" }, CtlLayoutTemplete: [], CustomControlPath: "CmnControl/", CustomControlCache: {}, NewControl: function (controlType, colName, controlCfg) { var _controlHtml, _controlJs, _ctlTemp, _styleLinks, _styles, _control = null, _controlType = controlType, _controlTypeSignature = CmnMis.UI.Control[controlType], _colName = colName, _controlCfg = object.IsType(controlCfg, "string") ? $.parseJSON(controlCfg) : controlCfg; return arguments.length < 3 ? (alert("创建控件错误！参数个数不对！"), void 0) : (Cmn.IsType(_controlTypeSignature, "function") ? _control = new _controlTypeSignature(_colName, _controlCfg) : "" != _controlType ? (_controlHtml = CmnMis.UI.Control.CustomControlCache[_controlType], _controlJs = CmnAjax.GetFile(CmnMis.UI.Control.CustomControlPath + _controlType + "/" + _controlType + ".js"), eval(_controlJs + " \r\n//@ sourceURL=" + CmnMis.UI.Control.CustomControlPath + _controlType + "/" + _controlType + ".js"), _controlTypeSignature = CmnMis.UI.Control[_controlType], Cmn.IsType(_controlTypeSignature, "function") ? (_control = new _controlTypeSignature(_colName, _controlCfg), !_controlHtml && _control.IsExistHtmlTemp && (_controlHtml = CmnAjax.GetFile(CmnMis.UI.Control.CustomControlPath + _controlType + "/" + _controlType + ".htm"), Cmn.IsType(_controlHtml, "string") && "" != _controlHtml ? (_ctlTemp = $("<div style='display:none;'>" + _controlHtml + "</div>"), _styleLinks = _ctlTemp.find("link").remove(), _styles = _ctlTemp.find("style").remove(), $("body").append(_ctlTemp), _styles.each(function () { $(this).insertAfter($("head style").last()) }), _styleLinks.each(function () { var a = $(this).attr("href"); $(this).insertAfter($("head link").last()), $(this)[0].href = CmnMis.UI.Control.CustomControlPath + _controlType + "/" + a }), _controlHtml = _ctlTemp.html(), _ctlTemp.remove()) : (Cmn.DebugLog("创建控件的时候控件的html模板文件没找到！"), _controlHtml = "")), "" != _controlHtml && (CmnMis.UI.Control.CustomControlCache[_controlType] = _controlHtml)) : _control = new CmnMis.UI.Control.Text(_colName, _controlCfg)) : _control = new CmnMis.UI.Control.Text(_colName, _controlCfg), null == _control && (_control = new CmnMis.UI.Control.Text(_colName, _controlCfg)), _control.InitControlConfig && _control.InitControlConfig(_controlCfg), _control) }, CreateControls: function (a) { var b, c, d, e, f, g; if (!a.ColInfo) return !1; if (b = $(a.GetSelector(a.Selector.EditControlPanel)), c = this, d = !1, !(b.length <= 0)) { for (null != a.EditTemplateFileName && "" != a.EditTemplateFileName && void 0 != a.EditTemplateFileName && (d = !0), e = 0; e < a.ColInfo.length; e++) f = a.ColInfo[e], g = null, "1" == f.IsShowInEdit && (f.ControlCfg ? object.IsType(f.ControlCfg, "string") && (f.ControlCfg = $.parseJSON(f.ControlCfg)) : f.ControlCfg = {}, g = c.NewControl(f.ColControlName, f.ColName, f.ControlCfg), g.AppendTo(b), g.InitControl(), a.KeyColName == f.ColName && (g.ControlCfg.IsReadOnly = "1", g.ControlCfg.IsRequired = "0"), "1" == g.ControlCfg.IsReadOnly && g.SetEnabled(!1), g.SetColDesc(f.ColTitle)); this.ResetControlLyout(b), this.BindControlLink(b) } }, SetValueList: function (a, b, c) { var d = this; $(a).find(this.Selector.Container).each(function () { var f, a = d.GetControl($(this)), e = a.KeyName; if (void 0 != a) { a.IsSetValByKey && void 0 != c && (e = c.KeyColName); for (f in b) if (f == e) { a.SetValue(b[f]); break } } else Cmn.Log("在设置值的时候，找不到name为" + e + "的控件") }) }, GetValueList: function (a, b) { var c = {}, d = this, e = $(a).find(d.Selector.Container), f = e.not(e.find(CmnMis.Frame.Cfg.Selector.UserFormTemplate).find(d.Selector.Container)); return f.each(function () { var a = d.GetControl($(this)); void 0 != a && null != a ? (c[a.KeyName] = a.GetValue(), b === !0 && a.GetDescFieldName && (c[a.GetDescFieldName()] = a.GetDesc())) : Cmn.Log("在获取值列表的时候，没有找到对应的控件对象") }), c }, InitValueList: function (a) { var b = this; $(a).find(this.Selector.Container).each(function () { var a = b.GetControl($(this)); void 0 != a && null != a ? a.Init() : Cmn.Log("在获取值列表的时候，没有找到对应的控件对象") }) }, VerifyControlInput: function (a, b, c) { var g, h, d = this, e = $(a).find(d.Selector.Container), f = e.not(e.find(CmnMis.Frame.Cfg.Selector.UserFormTemplate).find(d.Selector.Container)); for (g = 0; g < f.length; g++) if (h = d.GetControl(f.eq(g)), h.VerifyInput(b, c) === !1) return !1; return !0 }, GetControl: function (a) { return $(a).data("control") }, GetControlData: function (a, b, c) { var d = a.FillSql, e = a.OptionList, f = { ExecSql: d }; return Cmn.IsType(e, "string") && "" != e && (e = $.parseJSON(e)), object.IsType(a, "string") ? (Cmn.Log("控件配置错误：controlCfg应该为json数组而不是字符串"), void 0) : Cmn.IsType(e, "array") && e.length > 0 ? (c && c(e), void 0) : (b && (f["where"] = b), object.IsType(a.FillSql, "string") && "" != a.FillSql ? CmnAjax.PostData(InterfaceUrl + "?method=ExecSql", f, function (a) { c && c(a.data) }) : c && c([]), void 0) }, GetControlByName: function (a, b) { var c = $(a).find(this.Selector.Container + "[name='" + b + "']"); return c.length <= 0 && (c = $(a).find(".cmn-control[name='" + b + "']").parents(this.Selector.Container)), c.length > 0 ? this.GetControl($(c)) : null }, GetControlDomByName: function (a, b) { var c = $(a).find(this.Selector.Container + "[name=" + b + "]"); return c.length <= 0 && (c = $(a).find(this.Selector.CtlContent + "[name=" + b + "]")), c }, GetControlByDescFieldName: function (a, b) { var d, e, f, c = this.GetControls(a); for (d = 0; d < c.length; d++) if (e = c[d], f = e.GetDescFieldName && e.GetDescFieldName(), f == b) return e; return null }, GetControls: function (a) { var b = [], c = this; return $(a).find(this.Selector.Container).each(function () { b.push(c.GetControl(this)) }), b }, BindControlLink: function (a) { var b = this; $(a).find(this.Selector.Container).each(function () { var d, e, f, g, h, c = b.GetControl($(this)); if (void 0 != c && null != c) { if (Cmn.IsType(c.ControlCfg.LinkControlName, "string") && "" != c.ControlCfg.LinkControlName) for (d = c.ControlCfg.LinkControlName.split(","), e = 0; e < d.length; e++) f = d[e].split(":"), g = Cmn.Str.Trim(f.length > 1 ? f[1] : f[0]), h = b.GetControlByName(a, Cmn.Str.Trim(f[0])), h && function (a, b) { a.OnChange.Add(function (c, d, e) { var f = ""; g == a.KeyName ? f = c : e && Cmn.IsType(e, "object") && (f = e[g]), Cmn.IsType(b.ControlCfg.FillSql, "string") && "" != b.ControlCfg.FillSql ? b.ReLoadData("[" + g + "]" + "=" + (f || "null")) : b.SetValue(f) }, "cmn-Frame-ControlLinkChange_for" + b.KeyName) }(h, c) } else Cmn.Log("在获取值列表的时候，没有找到对应的控件对象") }) }, ResetControlLyout: function (a) { var c, d, b = $(a); b.find(CmnMis.CurUserForm.Selector.EditControlPanel).length > 0 && (b = b.find(CmnMis.CurUserForm.Selector.EditControlPanel)), c = $(b).outerHeight() - $(b).height(), d = this, $(b).find(this.Selector.Container).each(function () { var b, e, f, a = d.GetControl($(this)); void 0 != a && null != a ? (b = 0, e = 0, f = a.ControlCfg.Layout, f && (f.Left || f.Top) && (f.Top && (e = 1 * f.Top + c), f.Left && (b = 1 * f.Left), a.SetPosition(b, e))) : Cmn.Log("在获取值列表的时候，没有找到对应的控件对象") }) } }, Cmn.Extend(CmnMis.UI.Control, { CustomPanel: { Create: function (a, b) { var d, e, f; if ($(b).empty(), Cmn.IsType(a, "object")) for (d in a) e = a[d], e.Cfg && Cmn.IsType(e.Cfg, "string") && (e.Cfg = $.parseJSON(e.Cfg)), f = CmnMis.UI.Control.NewControl(a[d].Type, d, Cmn.Extend({ Width: 400, Layout: { DescWidth: 200 }, OptionList: Cmn.IsType(a[d].Val, "array") ? a[d].Val : void 0, CfgList: a[d]["CfgList"], DefaultValue: Cmn.IsType(e.Val, "array") ? a[d].Val[0].key : a[d].Val }, e.Cfg)), f.AppendTo($(b)), f.SetColDesc(a[d]["Desc"]), f.InitControl(), a[d]["Parent"] && f.ControlDom.attr("Parent", e["Parent"]), f.Init() }, CreateCtlCfgPanel: function (a, b) { var c = CmnMis.UI.Control.NewControl(a, "Temp", {}), d = c.CfgDescCfg; return $(b).empty(), CmnMis.UI.Control[a] ? (this.Create(d, b), void 0) : !1 }, SetValueList: function (a, b) { function d(a, b, c) { for (var e in a) if (Cmn.IsType(a[e], "object")) d(a[e], b, c); else if (e == c && a[e]) { a[e] && b.SetValue(a[e]); break } } if (Cmn.IsType(b, "string")) try { b = $.parseJSON(b) } catch (c) { b = new Function("return " + b)() } $(a).find(CmnMis.UI.Control.Selector.Container).each(function () { var a = CmnMis.UI.Control.GetControl($(this)); void 0 != a ? d(b, a, a.KeyName) : Cmn.Log("在设置值的时候，找不到name为" + _name + "的控件") }) }, GetValueList: function (a) { var d, b = {}, c = {}; $(a).find(CmnMis.UI.Control.Selector.Container).each(function () { var a, d, e; $(this).parents(CmnMis.UI.Control.Selector.Container).length <= 0 && (a = CmnMis.UI.Control.GetControl($(this)), d = a.KeyName, void 0 != a ? (e = a.ControlDom.attr("Parent"), e ? (c[e] || (c[e] = {}), c[e][d] = a.GetValue()) : b[d] = a.GetValue()) : Cmn.Log("在设置值的时候，找不到name为" + d + "的控件")) }); for (d in c) b[d] = c[d]; return Cmn.Func.JsonToStr(b) } } }) }(Cmn.Object, Cmn.Event);