﻿Cmn_Func_Version = "3.3.1", "undefined" == typeof Cmn && (Cmn = {}), "undefined" == typeof Cmn.Func && (Cmn.Func = {}), function () { function k() { } var a, b, c, d, e, f, g, h, i, j; Cmn.Func.BaiduMapKey = "9KAiuPrKKoy1soPCrBrmskPg", Cmn.Func.GetAddrByLbs = function (a, b) { function c(c) { var d = b; (void 0 == d || "" == d) && (d = Cmn.Func.BaiduMapKey), $.ajax({ type: "Post", url: "http://api.map.baidu.com/geocoder/v2/?ak=" + d + "&location=" + c.coords.latitude + "," + c.coords.longitude + "&output=json&pois=0", contentType: "application/x-www-form-urlencoded", dataType: "jsonp", jsonp: "callback", success: function (b) { return 0 == b.status ? a(b.result.addressComponent) : a(null), !0 }, error: function () { return a(null), !1 } }) } navigator.geolocation ? navigator.geolocation.getCurrentPosition(c, function () { a(null) }) : a(null) }, Cmn.Func.GetCurPosition = function (a) { navigator.geolocation ? navigator.geolocation.getCurrentPosition(a, function () { a(null) }) : a(null) }, a = null, b = null, c = !1, $(window).on("orientationchange", function () { c = !0 }), Cmn.Func.IsHorizontalScreen = function () { return 0 == c && null != a ? a : (null == a && Cmn.Func.IsAndroid() ? a = $(window).width() > $(window).height() ? !0 : !1 : 0 == window.orientation || 180 == window.orientation ? a = !1 : (90 == window.orientation || -90 == window.orientation) && (a = !0), b = window.orientation, null === a ? !1 : a) }, Cmn.Func.GetHeightWidthRate = function () { return Cmn.Func.IsIphone4() && Cmn.Func.IsWeiXin() ? Cmn.Func.IsHorizontalScreen() ? 640 / 832 : 1.3 : Cmn.Func.IsIphone5() && Cmn.Func.IsWeiXin() ? Cmn.Func.IsHorizontalScreen() ? 640 / 1008 : 1.575 : Cmn.Func.IsIPad() ? Cmn.Func.IsHorizontalScreen() ? .75 : 1024 / 768 : $(window).height() / $(window).width() }, Cmn.Func.GetWindowsWidth = function () { return $("body").width() }, Cmn.Func.GetWindowsHeight = function () { return $("body").width() * Cmn.Func.GetHeightWidthRate() }, d = null, e = null, f = !1, g = !1, h = !1, Cmn.Func.MobileAdaptiveMode = { Width: "Width", WidthHeight: "WidthHeight", WidthCutOutHeight: "WidthCutOutHeight" }, i = function (a, b) { var e, f; if (void 0 != a && "" != a && Cmn.Func.IsString(a)) { if (Cmn.Func.IsHorizontalScreen() && 0 == b || 0 == Cmn.Func.IsHorizontalScreen() && 1 == b) return $(window).width(), $(window).height(), $("body").css("width", "100%"), e = function () { void 0 != $(".AdviseVerticalImg img").height() && $(".AdviseVerticalImg img").height() > 0 ? $(".AdviseVerticalImg img").css("margin-top", ($(".AdviseVerticalImg").height() - $(".AdviseVerticalImg img").height()) / 2 + "px") : setTimeout(e, 100) }, $("body .AdviseVerticalImg").length <= 0 ? (f = "style='margin-top:5%;' height='80%'", 0 == Cmn.Func.IsHorizontalScreen() && (f = "style='margin-top:5%;' width='80%'"), $("body").append("<div class='AdviseVerticalImgBg' style='position:fixed;left:0px;top:0px;z-index:10000;background:#000000;width:100%;height:120%;'></div><div class='AdviseVerticalImg cg-DefaultImgHint' style='position:fixed; left:0px;top:0px;z-index:10001;background:rgba(00, 00, 00, 1) none repeat scroll 0 0 !important;filter:Alpha(opacity=100);background:#000000;width:100%;height:100%;text-align:center;'> <img " + f + " src='" + a + "' /></div>"), e()) : ($(".AdviseVerticalImg,.AdviseVerticalImgBg").fadeIn(100), $(".cg-DefaultImgHint").length > 0 && e()), $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart").on("touchstart", function (a) { a.preventDefault(), Cmn.DebugLog("触摸横屏提示层") }), Cmn.DebugLog("ProcessAdviseVerticalImg::body width:" + $("body").width()), !0; $(".AdviseVerticalImg,.AdviseVerticalImgBg").hide(), $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart") } return Cmn.DebugLog("body width:" + $("body").width()), !1 }, j = function (a) { $("[name='viewport']").attr("content", a), h = !0 }, Cmn.Func.MobileAdaptive = function (a, b, c, l, m, n) { var o, p, q, r, s, t; if (Cmn.DebugLog("自适应版本3.3.3"), void 0 == n && (n = !1), ("" == m || null == m) && (m = void 0), void 0 == l && (l = Cmn.Func.MobileAdaptiveMode.Width), i(c, n), Cmn.Func.IsHorizontalScreen() && 1 == n || 0 == Cmn.Func.IsHorizontalScreen() && 0 == n) { if (h) return Cmn.DebugLog("ViewPort已经设置过，直接退出"), void 0; Cmn.DebugLog("ViewPort没有设置过，开始设置..."), l == Cmn.Func.MobileAdaptiveMode.Width || l == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight ? ($("body").width(a), Cmn.Func.IsIOS() ? (Cmn.DebugLog("是IOS系统"), o = a, $("body").width(o), j("width=" + o + ",user-scalable=no;")) : null != navigator.userAgent.match(/Nexus/i) ? (Cmn.DebugLog("操作系统Nexus"), $("body").css("zoom", 100 * ($(window).width() / a) + "%")) : null != navigator.userAgent.match(/android\s*[\d\.]+/i) ? (Cmn.DebugLog("是安卓系统"), p = Cmn.Func.GetAndroidVersion(), d = $(window).width(), e = $(window).height(), q = d / a, Cmn.DebugLog("安卓版本小于4.4:.." + p), Cmn.DebugLog("安卓版本 4.2.2,window.screen.width:" + window.screen.width + " window.devicePixelRatio:" + window.devicePixelRatio), r = 160 * a / window.screen.width * window.devicePixelRatio, Cmn.Func.IsWeiXin() && p >= 4.4 && 5 > p ? j("width=device-width,initial-scale=" + q + ",maximum-scale=" + q + ",minimum-scale=" + q + ",user-scalable=no;") : 400 >= r ? j("width=" + a + ", user-scalable=no, target-densitydpi=" + r.toFixed(0) + ";") : 4.2 == p ? j("width=" + a + ", user-scalable=no, target-densitydpi=400;") : (Cmn.DebugLog("window.Width:" + d + "window.Height:" + e), j("width=device-width,initial-scale=" + q + ",maximum-scale=" + q + ",minimum-scale=" + q + ",user-scalable=no;"))) : null != navigator.userAgent.match(/Windows Phone/i) ? Cmn.DebugLog("Windows Phone") : (Cmn.DebugLog("是其他操作系统"), d = $(window).width(), e = $(window).height(), Cmn.DebugLog("window.Width:" + d + "window.Height:" + e), q = d / a, j("width=device-width,initial-scale=" + q + ",maximum-scale=" + q + ",minimum-scale=" + q + ",user-scalable=no;")), l == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight && (Cmn.DebugLog("是WidthCutOutHeight  GetWindowsHeight:" + Cmn.Func.GetWindowsHeight() + " mainContentHeight：" + b + " bodyHeight:" + $("body").height()), Cmn.Func.GetWindowsHeight() > b ? (Cmn.DebugLog("满足条件，需要隐藏滚动条"), $("body").height() > Cmn.Func.GetWindowsHeight() && ($("body").height(Cmn.Func.GetWindowsHeight()), $("body").css("overflow-y", "hidden"))) : $("body").css("overflow-y", "scroll"))) : l == Cmn.Func.MobileAdaptiveMode.WidthHeight && (Cmn.Func.IsIOS() ? (o = a, Cmn.Func.IsIphone4() ? (Cmn.DebugLog("是Iphone4"), Cmn.Func.IsWeiXin() ? Cmn.Func.IsHorizontalScreen() ? o = 1120 : a * Cmn.Func.GetHeightWidthRate() < b && (o = b / Cmn.Func.GetHeightWidthRate()) : n === !0 ? o = Cmn.Func.IsHorizontalScreen() ? a : b : Cmn.Func.IsHorizontalScreen() ? o = b : a * Cmn.Func.GetHeightWidthRate() < b && (o = b / Cmn.Func.GetHeightWidthRate())) : Cmn.Func.IsIPad() ? (Cmn.DebugLog("ipad mainContentWidth:" + a + "  Cmn.Func.GetHeightWidthRate():" + Cmn.Func.GetHeightWidthRate() + "  mainContentHeight:" + b), Cmn.Func.IsWeiXin() ? a * Cmn.Func.GetHeightWidthRate() < b && (o = b / Cmn.Func.GetHeightWidthRate()) : o = Cmn.Func.IsHorizontalScreen() ? a : b) : Cmn.Func.IsIphone5() ? (Cmn.DebugLog("是Iphone5"), Cmn.Func.IsWeiXin() ? o = Cmn.Func.IsHorizontalScreen() ? 1136 : a : n === !0 ? o = Cmn.Func.IsHorizontalScreen() ? a : b : Cmn.Func.IsHorizontalScreen() ? o = b : a * Cmn.Func.GetHeightWidthRate() < b && (o = b / Cmn.Func.GetHeightWidthRate())) : (Cmn.DebugLog("是其他 ios 设备"), o = Cmn.Func.IsHorizontalScreen() ? 1136 : a), $("body").width(o), j("width=" + o + ",user-scalable=no;"), Cmn.DebugLog("windowWidth5:" + $(window).width() + " windowHeight:" + $(window).height() + " mainContentWidth:" + a)) : (d = $(window).width(), e = $(window).height(), p = Cmn.Func.GetAndroidVersion(), g && (4.4 > p || navigator.userAgent.indexOf("4.4.4") >= 0) ? (Cmn.DebugLog(" 已经设置过_HasTargetDensitydpi "), $("body").width(d)) : (q = d / a, q > e / b && (q = e / b), $("body").width(d / q), Cmn.DebugLog("window.Width:" + d + "window.Height:" + e + " _multiple：" + q + "  body.width:" + $("body").width() + "  body.Height:" + $("body").height()), r = 160 * d / q / window.screen.width * window.devicePixelRatio, Cmn.DebugLog("_densitydpi:" + r), 400 >= r ? (j("width=" + d / q + ", user-scalable=no, target-densitydpi=" + r.toFixed(0) + ";"), g = !0) : (s = navigator.userAgent.toLowerCase(), 4.2 == p || s.indexOf("huawei") >= 0 && p >= 4.4 ? (j("width=" + d / q + ", user-scalable=no, target-densitydpi=400;"), g = !0) : j("width=device-width,initial-scale=" + q + ",maximum-scale=" + q + ",minimum-scale=" + q + ",user-scalable=no,target-densitydpi=device-dpi;"))))) } else Cmn.DebugLog("不是主要显示的方向，不需要对ViewPort做任何处理。"); 0 == f && (f = !0, k(), t = function () { function f() { Cmn.Func.IsHorizontalScreen() && $(window).width() >= $(window).height() || 0 == Cmn.Func.IsHorizontalScreen() && $(window).width() <= $(window).height() ? (l == Cmn.Func.MobileAdaptiveMode.WidthHeight ? Cmn.Func.IsHorizontalScreen() ? Cmn.Func.MobileAdaptive(b, a, c, l, m, n) : Cmn.Func.MobileAdaptive(a, b, c, l, m, n) : Cmn.Func.MobileAdaptive(a, b, c, l, m, n), void 0 != m && m()) : setTimeout(f, 10) } $(".AdviseVerticalImg,.AdviseVerticalImgBg").hide(); var e = $(window).width(); !Cmn.Func.IsIOS(), Cmn.DebugLog("旋转" + window.orientation + "  _widthBeforChange:" + e + "  window.width:" + $(window).width() + "  IsHorizontalScreen:" + Cmn.Func.IsHorizontalScreen()), f() }, $(window).on("orientationchange", t), void 0 != m && m(), $("[name='viewport']").length < 1 && alert("页面上必须要加上默认的viewport。(<meta content='width=device-width,user-scalable=no;' name='viewport' />)"), Cmn.DebugLog(navigator.userAgent + "  自适应方案：" + l), l == Cmn.Func.MobileAdaptiveMode.WidthHeight && Cmn.Func.IsHorizontalScreen() && (Cmn.Func.MobileAdaptive(b, a, c, l, m, n), void 0 != m && m())), Cmn.DebugLog("自适应后viewport:" + $("[name='viewport']").attr("content") + " HasSetViewPort:" + h) }, Cmn.Func.GetAndroidVersion = function () { var a = navigator.userAgent.match(/android\s*[\d\.]+/i); return null == a ? 0 : (a = a[0].replace(/android\s*/i, ""), a.indexOf(".") > 0 && (a = a.match(/[\d]+\.[\d]+/i)), a) }, Cmn.Func.GotoUrl = function (a) { $("body").hide(), setTimeout(function () { window.location.href = a }, 200) }, Cmn.Func.ChangeBrowserUrlTo = function (a) { a.indexOf("http:") < 0 && (a = Cmn.Func.GetAbsoluteUrl(a)), window.history.pushState({}, 0, a) }, Cmn.Func.SaveImgToLocal = function (a) { var b, c; if (a = Cmn.Func.GetAbsoluteUrl(a), Cmn.Func.IsWeiXin()) b = new Array, b[0] = a, WeixinJSBridge.invoke("imagePreview", { current: $(this).attr("src"), urls: b }); else { for (c = window.open(a, "", "width=1, height=1, top=5000, left=5000") ; "complete" != c.document.readyState && "complete" != c.document.readyState;); c.document.execCommand("SaveAs"), c.close() } }, Cmn.Func.Shake = function (a, b) { function l(a) { var l, m, n, o; 0 != IsShake && (l = a.accelerationIncludingGravity, m = (new Date).getTime(), m - e > 100 && (n = m - e, e = m, f = l.x, g = l.y, h = l.z, o = 1e4 * (Math.abs(f + g + h - i - j - k) / n), o > d && b && IsShake && (IsShake = !1, c.shakeCallbackFn()), i = f, j = g, k = h)) } var d, e, f, g, h, i, j, k, c = this; if (c.shakeCallbackFn = function () { }, 1 == arguments.length) { if ("function" == typeof arguments[0] && (c.shakeCallbackFn = arguments[0]), "boolean" == typeof arguments[0]) return window.IsShake = !0, "undefined" } else c.shakeCallbackFn = b; d = a || 800, e = 0, window.IsShake = !0, window.IsBindShake = $("body").attr("shake"), window.IsBindShake || (window.addEventListener("devicemotion", l, !1), $("body").attr("shake", "true")) }, Cmn.Func.ListenDeviceOrientation = function (a) { var b, c; window.DeviceMotionEvent && (b = this, b.deviceorientation || (b.deviceorientation = function () { }), "function" == typeof a && (b.deviceorientation = a), b.beforAlpha = "", b.beforBeta = "", b.beforGamma = "", b.zRotationOrientation = "", c = "Vertical", c || (c = "Vertical"), b.isBindListenDeviceOrientation || (window.addEventListener("deviceorientation", function (a) { var g, d = Math.ceil(a.beta), e = Math.ceil(a.alpha), f = Math.ceil(a.gamma); "" == b.beforAlpha && (b.beforAlpha = e), "" == b.beforBeta && (b.beforBeta = d), "" == b.beforGamma && (b.beforGamma = f), c = Math.abs(d) < 60 ? "Horizontal" : "Vertical", e && b.beforAlpha != e && (g = b.beforAlpha - e, Math.abs(g) > 4 && (g = -1 * (g / Math.abs(g))), b.beforAlpha = e, b.deviceorientation(a, g, c)) }, !0), b.isBindListenDeviceOrientation = !0)) }, Cmn.Func.TouchSlide = function (a, b, c, d, e, f) { var h, i, j, k, g = $(a); return g.length < 1 ? !1 : (h = null, i = null, j = "", f || (f = "all"), k = { touchstart: "createTouch" in document ? "touchstart" : "mousedown", touchmove: "createTouch" in document ? "touchmove" : "mousemove", touchend: "createTouch" in document ? "touchend" : "mouseup" }, g.off(k.touchstart).on(k.touchstart, function (a) { a.stopPropagation(), a = event.touches ? event.touches[0] : a, null == h && null == i && (h = a.pageX), i = a.pageY }), g.off(k.touchmove).on(k.touchmove, function (a) { var d, g, k; return a.stopPropagation(), d = event.touches ? event.touches[0] : a, null == h && null == i ? (a.preventDefault(), void 0) : (g = Math.abs(d.pageX - h), k = Math.abs(d.pageY - i), g > k ? (d.pageX - h > 0 ? Math.abs(d.pageX - h) > b && (j = "right", c && c(j, g), e && "1" != e ? (h = d.pageX, i = d.pageY) : (h = null, i = null)) : d.pageX - h < 0 && Math.abs(d.pageX - h) > b && (j = "left", c && c(j, g), e && "1" != e ? (h = d.pageX, i = d.pageY) : (h = null, i = null)), "vertical" != f && a.preventDefault()) : k > g && (d.pageY - i > 0 ? Math.abs(d.pageY - i) > b && (j = "down", c && c(j, k), e && "1" != e ? (h = d.pageX, i = d.pageY) : (h = null, i = null)) : d.pageY - i < 0 && Math.abs(d.pageY - i) > b && (j = "up", c && c(j, k), e && "1" != e ? (h = d.pageX, i = d.pageY) : (h = null, i = null)), "horizontal" != f && a.preventDefault()), void 0) }), g.off(k.touchend).on(k.touchend, function (a) { a.stopPropagation(), h = null, i = null, j && d && d(j), j = "" }), void 0) }, Cmn.Func.ImagePreload = function (a, b, c, d, e) { function k(a) { var c, h, i, b = a + e; for (b > g.length && (b = g.length), c = a; b > c; c++) h = g[c], void 0 !== $(h).attr(d) ? (i = $(h).attr(d), i && l(i, h, c)) : f++ } function l(a, b, c) { var d = new Image; d.onload = function () { m(b, a, !1, c) }, d.onerror = function () { m(b, a, !0, c) }, d.src = a, d.complete && m(b, a, !1, c) } function m(a, g, l) { if ($(a).attr(d)) { $(a).removeAttr(d), f++; var n = Math.ceil(100 * (f / h)); n = f == h ? 100 : n >= 100 ? 100 : n, l ? i.push(g) : $(a).attr("src", g), b && b(n, g), f >= h ? c && c(i) : (j++, 0 == j % e && k(j)) } } var f, g, h, i, j; return a || (a = "body"), d || (d = "lazypath"), e || (e = 3), f = 0, g = $(a).find("img[" + d + "]") || $(a).find("img"), h = g.length, 0 == h ? (b && b(100, ""), c && c(i), !1) : (i = [], j = 0, k(0), void 0) }, Cmn.Func.ImageLazyLoading = function (a, b, c, d, e) { this.ImagePreload(a, b, c, d, e) }, Cmn.Func.ImageLazyLoad = function (a, b) { function j(a) { var h, g = d.eq(a); a > 0 && d.eq(a - 1).offset().top - e > c.height() || a > d.length - 1 || !g.attr(b) || (h = new Image, h.DOM = g, h.onload = function () { k.call(this, h) }, h.onerror = function () { k.call(this, h) }, h.src = g.attr(b), g.removeAttr(b), h.complete && k.call(h, h), f++) } function k() { this.DOM.attr("src", this.src), this.DOM.css({ opacity: "1", filter: "alpha(opacity=100)" }), d.eq(f).offset().top - e <= c.height() && f < d.length - 1 && j(f + 1) } var c, d, e, f, h, i; a || (a = "body"), b || (b = "lazypath"), c = $(a), d = c.find("img[" + b + "]").css({ opacity: "0.1", filter: "alpha(opacity=10)" }), e = c.offset().top, f = -1, h = 0, i = function () { (h < c.scrollTop() || 0 == h) && (h = c.scrollTop(), j(f + 1)) }, c.off("scroll", i).on("scroll", i), i() }, Cmn.Func.HoldSaveImage = function (a) { $(a).on("touchstart", function (a) { a.stopPropagation(), Cmn.Func.IsQQBrowser() && !Cmn.Func.IsIOS() && (location.href = $(this).attr("src")) }) }, Cmn.Func.FrameAnimation = function () { var a = function (a, b, c, d) { this.frames = $(a).eq(0).css({ visibility: "visible" }).siblings().css({ visibility: "hidden" }), this.index = 0, this.interval = 0, this.Play(b, c, d) }; return a.prototype = { Run: function (a, b, c) { var d = this; d.frames.eq(d.index).css({ visibility: "visible" }).siblings().css({ visibility: "hidden" }), d.interval = setInterval(function () { d.index++, d.frames.eq(d.index).css({ visibility: "visible" }).siblings().css({ visibility: "hidden" }), d.frames.length - 1 <= d.index && (b--, 0 >= b ? (d.Stop(), d.index = 0, c && c()) : d.index = 0) }, a) }, Play: function (a, b, c) { this.index = 0, this.Run(a, b, c) }, Stop: function () { window.clearInterval(this.interval) } }, function (b, c, d, e) { return new a(b, c, d, e) } }(), Cmn.Func.AnimteQueue = function () { var a = function () { this.index = 0, this.queue = [], this.position = [], this.isStopQueue = !0 }; return a.prototype = { InitPostion: function (a) { this.index = a; for (var b = a; b < this.position.length; b++) "function" == typeof this.position[b] && this.position[b].apply(this) }, Add: function (a) { return this.queue.push(a), this }, Run: function (a) { var c, b = this; b.index = a, c = function () { b.index++, b.index < b.queue.length && b.isStopQueue && b.Run(b.index) }, this.position.push(this.queue[b.index].apply(this, [c])) }, Start: function () { this.isStopQueue = !0, this.Run(this.index) }, Stop: function () { this.isStopQueue = !1 } }, function () { return new a } }() }();