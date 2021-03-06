! function (e) {
    var t, n = "mousewheel DOMMouseScroll wheel MozMousePixelScroll";
    "undefined" != typeof Lethargy && null !== Lethargy && (t = new Lethargy);
    var i = function () {
        return Math.max(window.pageYOffset, window.document.body.scrollTop, window.document.documentElement.scrollTop)
    };
    e.smartscroll = function (o) {
        var r = e.extend({}, e.smartscroll.defaults, o);
        if (r.sectionSelector || (r.sectionSelector = "." + r.sectionClass), ("undefined" == typeof EventEmitter || null === EventEmitter || r.eventEmitter && r.eventEmitter.constructor !== EventEmitter) && (r.eventEmitter = null), r.bindSwipe) var a = null,
            l = null,
            s = function (e) {
                var t = e.originalEvent || e;
                a = t.touches[0].clientX, l = t.touches[0].clientY
            },
            c = function (e) {
                var t = e.originalEvent || e;
                if (a && l) {
                    var n = t.touches[0].clientX,
                        i = t.touches[0].clientY,
                        o = a - n,
                        s = l - i;
                    Math.abs(o) > Math.abs(s) ? o > 0 ? r.eventEmitter.emitEvent("swipeLeft") : r.eventEmitter.emitEvent("swipeRight") : s > 0 ? r.eventEmitter.emitEvent("swipeUp") : r.eventEmitter.emitEvent("swipeDown"), a = null, l = null
                }
            };
        var d, h, u = !1,
            w = [],
            v = !1,
            p = !1,
            f = window.location.hash,
            m = e(r.sectionWrapperSelector + ":first"),
            E = function () {
                var t = [];
                d = Math.round(m.position().top + parseInt(m.css("paddingTop"), 10) + parseInt(m.css("borderTopWidth"), 10) + parseInt(m.css("marginTop"), 10)), h = Math.round(d + m.height(), 10), t.push(d), e(r.sectionSelector).each(function (n, i) {
                    t.push(Math.round(d + e(i).position().top + e(i).outerHeight()))
                }), w = t
            },
            g = function (e) {
                for (var t = 0; t < w.length; t += 1)
                    if (e <= w[t]) return t;
                return w.length
            },
            S = function () {
                var t;
                if (i() + e(window).height() / 2 < d) t = r.headerHash;
                else {
                    var n = g(i() + e(window).height() / 2);
                    n !== undefined && (t = e(r.sectionSelector + ":nth-of-type(" + n + ")").data("hash"))
                }
                void 0 !== t && window.location.hash === "#" + t || (void 0 === t && (t = r.headerHash), r.keepHistory ? window.location.hash = t : window.location.replace(window.location.href.split("#")[0] + "#" + t))
            },
            b = function (t, n) {
                u || (u = !0, e("body,html").stop(!0, !0).animate({
                    scrollTop: t
                }, n, function () {
                    if (u = !1, r.eventEmitter) {
                        var t = i(),
                            n = g(t + e(window).height() / 2);
                        r.eventEmitter.emitEvent("scrollEnd", [n])
                    }
                }))
            };
        this.scroll = function (t) {
            if (w) {
                var n, o = i();
                if (r.eventEmitter) {
                    n = g(o + e(window).height() / 2);
                    var a = t ? n + 1 : n - 1;
                    r.eventEmitter.emitEvent("scrollStart", [a])
                }
                for (var l = 0; l < w.length; l += 1)
                    if (o < w[l]) return b(t ? w[l] : w[l - 1] - e(window).height(), 700), r.eventEmitter && r.eventEmitter.emitEvent("scrollEnd", [n]), !1
            }
            return undefined
        };
        var y = function () {
            e(window).bind(n, function (n) {
                var o = function (e) {
                    var n;
                    if (t && (n = t.check(e)), !u)
                        if (t) {
                            if (1 === n) return "up";
                            if (-1 === n) return "down"
                        } else {
                            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) return "up";
                            if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) return "down"
                        }
                    return !1
                }(n);
                r.dynamicHeight && E();
                var a = i(),
                    l = a + e(window).height();
                if (l > d && a <= h) {
                    var s = g(a),
                        c = g(a + e(window).height() / 2);
                    s === g(l) && r.innerSectionScroll || (n.preventDefault(), n.stopPropagation(), o && ("up" === o ? (r.toptotop ? b(w[c - 2] + 1, r.animationSpeed) : b(w[c - 1] - e(window).height(), r.animationSpeed), r.eventEmitter && r.eventEmitter.emitEvent("scrollStart", [c - 1])) : "down" === o && (b(w[c] + 1, r.animationSpeed), r.eventEmitter && r.eventEmitter.emitEvent("scrollStart", [c + 1]))))
                }
            })
        };
        if (m.css({
                position: "relative"
            }), setTimeout(function () {
                if (E(), r.autoHash && (null === r.eventEmitter || r.hashContinuousUpdate ? e(window).bind("scroll", S) : r.eventEmitter.addListener("scrollEnd", S)), r.initialScroll && f.length > 0) {
                    var t = e('[data-hash="' + f.substr(1) + '"]');
                    t.length > 0 && b(t[0].offsetTop + d, 0)
                }
            }, 50), e(window).bind("resize", E), null !== r.breakpoint && r.breakpoint === parseInt(r.breakpoint, 10) && r.breakpoint > 0 && (v = !0), "vp" === r.mode)
            if (r.ie8) {
                var k = function () {
                    e(r.sectionSelector).css({
                        height: e(window).height()
                    })
                };
                k(), e(window).bind("resize", k)
            } else e(r.sectionSelector).css({
                height: "100vh"
            });
        if (r.sectionScroll && (v && e(window).bind("resize", function () {
                if (e(window).width() < r.breakpoint) {
                    if (!p) return e(window).unbind(n), p = !0, !1
                } else p && (y(), p = !1);
                return undefined
            }), y()), r.bindSwipe && (e(window).on("touchstart", s), e(window).on("touchmove", c)), r.bindKeyboard) {
            e(window).on("keydown", function (t) {
                var n = t.originalEvent || t;
                r.dynamicHeight && E();
                var o = i(),
                    a = o + e(window).height();
                if (function () {
                        var t = i();
                        return t + e(window).height() > d && t <= h
                    }()) {
                    var l = g(o),
                        s = g(o + e(window).height() / 2);
                    if (l !== g(a) || !r.innerSectionScroll) switch (n.which) {
                        case 38:
                            n.preventDefault(), n.stopPropagation(), r.toptotop ? b(w[s - 2] + 1, r.animationSpeed) : b(w[s - 1] - e(window).height(), r.animationSpeed), r.eventEmitter && r.eventEmitter.emitEvent("scrollStart", [s - 1]);
                            break;
                        case 40:
                            n.preventDefault(), n.stopPropagation(), b(w[s] + 1, r.animationSpeed), r.eventEmitter && r.eventEmitter.emitEvent("scrollStart", [s + 1])
                    }
                }
            })
        }
        return this
    }, e.smartscroll.defaults = {
        // change the animationSpeed to make the switching from one screen to another easier / faster. The original speed was *********** 700 *************
        animationSpeed: 700, 
        autoHash: !0,
        breakpoint: null,
        initialScroll: !0,
        headerHash: "header",
        keepHistory: !1,
        mode: "vp",
        sectionClass: "section",
        sectionSelector: null,
        sectionScroll: !0,
        sectionWrapperSelector: ".section-wrapper",
        eventEmitter: null,
        dynamicHeight: !1,
        ie8: !1,
        hashContinuousUpdate: !0,
        innerSectionScroll: !0,
        toptotop: !1,
        bindSwipe: !0,
        bindKeyboard: !0
    }
}(jQuery);
