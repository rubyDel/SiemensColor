﻿CmnMis_Itf_Version = "2.1", "undefined" == typeof CmnMis && (CmnMis = {}), CmnMis.Itf = { GetData: function (a, b, c, d, e) { var f = "method=GetSqlData&ItfName=" + a; return f = Cmn.Func.AddParamToUrl(CmnMis.Func.GetCmnItfUrl(), f), c === !0 ? CmnAjax.GetData(f, b) : (CmnAjax.PostData(f, b, d, e), void 0) }, FillData: function (a, b, c, d, e, f) { b = "method=GetSqlData&ItfName=" + b, b = Cmn.Func.AddParamToUrl(CmnMis.Func.GetCmnItfUrl(), b), CmnAjax.FillData(a, b, c, d, e, f) }, DataPaging: function (a, b, c, d, e, f, g, h, i) { return b = "method=GetSqlData&ItfName=" + b, b = Cmn.Func.AddParamToUrl(CmnMis.Func.GetCmnItfUrl(), b), new CmnAjax.DataPaging(a, b, c, d, e, f, g, h, i) }, GetValue: function (a, b, c, d, e) { var g, h, f = "method=GetSqlData&ItfName=" + a; if (f = Cmn.Func.AddParamToUrl(CmnMis.Func.GetCmnItfUrl(), f), c === !0) { if (g = CmnAjax.GetData(f, b), void 0 != g.data && null != g.data && g.data.length > 0) for (h in g.data[0]) return g.data[0][h]; return "" } return void 0 == d || null == d ? (Cmn.alert("GetValue非阻塞方式必须提供successFunc回调函数！"), void 0) : (CmnAjax.PostData(f, b, function (a) { var c, b = ""; if (void 0 != a.data && null != a.data && a.data.length > 0) for (c in a.data[0]) { b = a.data[0][c]; break } d(b) }, e), void 0) }, Execute: function (a, b, c, d, e) { if (c === !0) { var f = CmnMis.Itf.GetData(a, b, !0); return void 0 != f.SqlExecIsOk && "1" == f.SqlExecIsOk ? !0 : !1 } CmnMis.Itf.GetData(a, b, !1, function (a) { void 0 != a.SqlExecIsOk && "1" == a.SqlExecIsOk ? d(!0, a) : d(!1, a) }, e) } };