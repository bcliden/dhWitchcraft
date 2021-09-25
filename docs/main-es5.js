(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkdigital_witch_project"] = self["webpackChunkdigital_witch_project"] || []).push([["main"], {
    /***/
    98255: function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    13393: function _(module) {
      /*
        This is a modified version of imgix/drift-zoom by Benjamin Liden.
        v1.2.2 is used to bypass the bad zoomFactor setter in v1.3+,
        this version checks for this.boundingBox before updating its settings
        when zoomFactor is changed on ln.336
      
        hopefully i can contribute upstream when time allows
      */
      (function (f) {
        if (true) {
          module.exports = f();
        } else {
          var g;
        }
      })(function () {
        var define, module, exports;
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = undefined;
                  if (!f && c) return require(i, !0);
                  if (u) return u(i, !0);
                  var a = new Error("Cannot find module '" + i + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }

                var p = n[i] = {
                  exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }

              return n[i].exports;
            }

            for (var u = undefined, i = 0; i < t.length; i++) {
              o(t[i]);
            }

            return o;
          }

          return r;
        }()({
          1: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            var _throwIfMissing = require("./util/throwIfMissing");

            var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

            var _dom = require("./util/dom");

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var BoundingBox = function () {
              function BoundingBox(options) {
                _classCallCheck(this, BoundingBox);

                this.isShowing = false;
                var _options$namespace = options.namespace,
                    namespace = _options$namespace === undefined ? null : _options$namespace,
                    _options$zoomFactor = options.zoomFactor,
                    zoomFactor = _options$zoomFactor === undefined ? (0, _throwIfMissing2["default"])() : _options$zoomFactor,
                    _options$containerEl = options.containerEl,
                    containerEl = _options$containerEl === undefined ? (0, _throwIfMissing2["default"])() : _options$containerEl;
                this.settings = {
                  namespace: namespace,
                  zoomFactor: zoomFactor,
                  containerEl: containerEl
                };
                this.openClasses = this._buildClasses("open");

                this._buildElement();
              }

              _createClass(BoundingBox, [{
                key: "_buildClasses",
                value: function _buildClasses(suffix) {
                  var classes = ["drift-" + suffix];
                  var ns = this.settings.namespace;

                  if (ns) {
                    classes.push(ns + "-" + suffix);
                  }

                  return classes;
                }
              }, {
                key: "_buildElement",
                value: function _buildElement() {
                  this.el = document.createElement("div");
                  (0, _dom.addClasses)(this.el, this._buildClasses("bounding-box"));
                }
              }, {
                key: "show",
                value: function show(zoomPaneWidth, zoomPaneHeight) {
                  this.isShowing = true;
                  this.settings.containerEl.appendChild(this.el);
                  var style = this.el.style;
                  style.width = Math.round(zoomPaneWidth / this.settings.zoomFactor) + "px";
                  style.height = Math.round(zoomPaneHeight / this.settings.zoomFactor) + "px";
                  (0, _dom.addClasses)(this.el, this.openClasses);
                }
              }, {
                key: "hide",
                value: function hide() {
                  if (this.isShowing) {
                    this.settings.containerEl.removeChild(this.el);
                  }

                  this.isShowing = false;
                  (0, _dom.removeClasses)(this.el, this.openClasses);
                }
              }, {
                key: "setPosition",
                value: function setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
                  var pageXOffset = window.pageXOffset;
                  var pageYOffset = window.pageYOffset;
                  var inlineLeft = triggerRect.left + percentageOffsetX * triggerRect.width - this.el.clientWidth / 2 + pageXOffset;
                  var inlineTop = triggerRect.top + percentageOffsetY * triggerRect.height - this.el.clientHeight / 2 + pageYOffset;
                  var elRect = this.el.getBoundingClientRect();

                  if (inlineLeft < triggerRect.left + pageXOffset) {
                    inlineLeft = triggerRect.left + pageXOffset;
                  } else if (inlineLeft + this.el.clientWidth > triggerRect.left + triggerRect.width + pageXOffset) {
                    inlineLeft = triggerRect.left + triggerRect.width - this.el.clientWidth + pageXOffset;
                  }

                  if (inlineTop < triggerRect.top + pageYOffset) {
                    inlineTop = triggerRect.top + pageYOffset;
                  } else if (inlineTop + this.el.clientHeight > triggerRect.top + triggerRect.height + pageYOffset) {
                    inlineTop = triggerRect.top + triggerRect.height - this.el.clientHeight + pageYOffset;
                  }

                  this.el.style.left = inlineLeft + "px";
                  this.el.style.top = inlineTop + "px";
                }
              }]);

              return BoundingBox;
            }();

            exports["default"] = BoundingBox;
          }, {
            "./util/dom": 6,
            "./util/throwIfMissing": 7
          }],
          2: [function (require, module, exports) {
            "use strict";

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            var _dom = require("./util/dom");

            var _injectBaseStylesheet = require("./injectBaseStylesheet");

            var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

            var _Trigger = require("./Trigger");

            var _Trigger2 = _interopRequireDefault(_Trigger);

            var _ZoomPane = require("./ZoomPane");

            var _ZoomPane2 = _interopRequireDefault(_ZoomPane);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            module.exports = function () {
              function Drift(triggerEl) {
                var _this = this;

                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                _classCallCheck(this, Drift);

                this.VERSION = "1.2.2";

                this.destroy = function () {
                  _this.trigger._unbindEvents();
                };

                this.triggerEl = triggerEl;

                if (!(0, _dom.isDOMElement)(this.triggerEl)) {
                  throw new TypeError("`new Drift` requires a DOM element as its first argument.");
                } // A bit unexpected if you haven't seen this pattern before.
                // Based on the pattern here:
                // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured


                var _options$namespace = options.namespace,
                    namespace = _options$namespace === undefined ? null : _options$namespace,
                    _options$showWhitespa = options.showWhitespaceAtEdges,
                    showWhitespaceAtEdges = _options$showWhitespa === undefined ? false : _options$showWhitespa,
                    _options$containInlin = options.containInline,
                    containInline = _options$containInlin === undefined ? false : _options$containInlin,
                    _options$inlineOffset = options.inlineOffsetX,
                    inlineOffsetX = _options$inlineOffset === undefined ? 0 : _options$inlineOffset,
                    _options$inlineOffset2 = options.inlineOffsetY,
                    inlineOffsetY = _options$inlineOffset2 === undefined ? 0 : _options$inlineOffset2,
                    _options$inlineContai = options.inlineContainer,
                    inlineContainer = _options$inlineContai === undefined ? document.body : _options$inlineContai,
                    _options$sourceAttrib = options.sourceAttribute,
                    sourceAttribute = _options$sourceAttrib === undefined ? "data-zoom" : _options$sourceAttrib,
                    _options$zoomFactor = options.zoomFactor,
                    zoomFactor = _options$zoomFactor === undefined ? 3 : _options$zoomFactor,
                    _options$paneContaine = options.paneContainer,
                    paneContainer = _options$paneContaine === undefined ? document.body : _options$paneContaine,
                    _options$inlinePane = options.inlinePane,
                    inlinePane = _options$inlinePane === undefined ? 375 : _options$inlinePane,
                    _options$handleTouch = options.handleTouch,
                    handleTouch = _options$handleTouch === undefined ? true : _options$handleTouch,
                    _options$onShow = options.onShow,
                    onShow = _options$onShow === undefined ? null : _options$onShow,
                    _options$onHide = options.onHide,
                    onHide = _options$onHide === undefined ? null : _options$onHide,
                    _options$injectBaseSt = options.injectBaseStyles,
                    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt,
                    _options$hoverDelay = options.hoverDelay,
                    hoverDelay = _options$hoverDelay === undefined ? 0 : _options$hoverDelay,
                    _options$touchDelay = options.touchDelay,
                    touchDelay = _options$touchDelay === undefined ? 0 : _options$touchDelay,
                    _options$hoverBoundin = options.hoverBoundingBox,
                    hoverBoundingBox = _options$hoverBoundin === undefined ? false : _options$hoverBoundin,
                    _options$touchBoundin = options.touchBoundingBox,
                    touchBoundingBox = _options$touchBoundin === undefined ? false : _options$touchBoundin,
                    _options$boundingBoxC = options.boundingBoxContainer,
                    boundingBoxContainer = _options$boundingBoxC === undefined ? document.body : _options$boundingBoxC;

                if (inlinePane !== true && !(0, _dom.isDOMElement)(paneContainer)) {
                  throw new TypeError("`paneContainer` must be a DOM element when `inlinePane !== true`");
                }

                if (!(0, _dom.isDOMElement)(inlineContainer)) {
                  throw new TypeError("`inlineContainer` must be a DOM element");
                }

                this.settings = {
                  namespace: namespace,
                  showWhitespaceAtEdges: showWhitespaceAtEdges,
                  containInline: containInline,
                  inlineOffsetX: inlineOffsetX,
                  inlineOffsetY: inlineOffsetY,
                  inlineContainer: inlineContainer,
                  sourceAttribute: sourceAttribute,
                  zoomFactor: zoomFactor,
                  paneContainer: paneContainer,
                  inlinePane: inlinePane,
                  handleTouch: handleTouch,
                  onShow: onShow,
                  onHide: onHide,
                  injectBaseStyles: injectBaseStyles,
                  hoverDelay: hoverDelay,
                  touchDelay: touchDelay,
                  hoverBoundingBox: hoverBoundingBox,
                  touchBoundingBox: touchBoundingBox,
                  boundingBoxContainer: boundingBoxContainer
                };

                if (this.settings.injectBaseStyles) {
                  (0, _injectBaseStylesheet2["default"])();
                }

                this._buildZoomPane();

                this._buildTrigger();
              }

              _createClass(Drift, [{
                key: "_buildZoomPane",
                value: function _buildZoomPane() {
                  this.zoomPane = new _ZoomPane2["default"]({
                    container: this.settings.paneContainer,
                    zoomFactor: this.settings.zoomFactor,
                    showWhitespaceAtEdges: this.settings.showWhitespaceAtEdges,
                    containInline: this.settings.containInline,
                    inline: this.settings.inlinePane,
                    namespace: this.settings.namespace,
                    inlineOffsetX: this.settings.inlineOffsetX,
                    inlineOffsetY: this.settings.inlineOffsetY,
                    inlineContainer: this.settings.inlineContainer
                  });
                }
              }, {
                key: "_buildTrigger",
                value: function _buildTrigger() {
                  this.trigger = new _Trigger2["default"]({
                    el: this.triggerEl,
                    zoomPane: this.zoomPane,
                    handleTouch: this.settings.handleTouch,
                    onShow: this.settings.onShow,
                    onHide: this.settings.onHide,
                    sourceAttribute: this.settings.sourceAttribute,
                    hoverDelay: this.settings.hoverDelay,
                    touchDelay: this.settings.touchDelay,
                    hoverBoundingBox: this.settings.hoverBoundingBox,
                    touchBoundingBox: this.settings.touchBoundingBox,
                    namespace: this.settings.namespace,
                    zoomFactor: this.settings.zoomFactor,
                    boundingBoxContainer: this.settings.boundingBoxContainer
                  });
                }
              }, {
                key: "setZoomImageURL",
                value: function setZoomImageURL(imageURL) {
                  this.zoomPane._setImageURL(imageURL);
                }
              }, {
                key: "disable",
                value: function disable() {
                  this.trigger.enabled = false;
                }
              }, {
                key: "enable",
                value: function enable() {
                  this.trigger.enabled = true;
                }
              }, {
                key: "isShowing",
                get: function get() {
                  return this.zoomPane.isShowing;
                }
              }, {
                key: "zoomFactor",
                get: function get() {
                  return this.settings.zoomFactor;
                },
                set: function set(zf) {
                  this.settings.zoomFactor = zf;
                  this.zoomPane.settings.zoomFactor = zf;
                  this.trigger.settings.zoomFactor = zf;

                  if (this.boundingBox) {
                    this.boundingBox.settings.zoomFactor = zf;
                  }
                }
              }]);

              return Drift;
            }();
          }, {
            "./Trigger": 3,
            "./ZoomPane": 4,
            "./injectBaseStylesheet": 5,
            "./util/dom": 6
          }],
          3: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            var _throwIfMissing = require("./util/throwIfMissing");

            var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

            var _BoundingBox = require("./BoundingBox");

            var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var Trigger = function () {
              function Trigger() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                _classCallCheck(this, Trigger);

                _initialiseProps.call(this);

                var _options$el = options.el,
                    el = _options$el === undefined ? (0, _throwIfMissing2["default"])() : _options$el,
                    _options$zoomPane = options.zoomPane,
                    zoomPane = _options$zoomPane === undefined ? (0, _throwIfMissing2["default"])() : _options$zoomPane,
                    _options$sourceAttrib = options.sourceAttribute,
                    sourceAttribute = _options$sourceAttrib === undefined ? (0, _throwIfMissing2["default"])() : _options$sourceAttrib,
                    _options$handleTouch = options.handleTouch,
                    handleTouch = _options$handleTouch === undefined ? (0, _throwIfMissing2["default"])() : _options$handleTouch,
                    _options$onShow = options.onShow,
                    onShow = _options$onShow === undefined ? null : _options$onShow,
                    _options$onHide = options.onHide,
                    onHide = _options$onHide === undefined ? null : _options$onHide,
                    _options$hoverDelay = options.hoverDelay,
                    hoverDelay = _options$hoverDelay === undefined ? 0 : _options$hoverDelay,
                    _options$touchDelay = options.touchDelay,
                    touchDelay = _options$touchDelay === undefined ? 0 : _options$touchDelay,
                    _options$hoverBoundin = options.hoverBoundingBox,
                    hoverBoundingBox = _options$hoverBoundin === undefined ? (0, _throwIfMissing2["default"])() : _options$hoverBoundin,
                    _options$touchBoundin = options.touchBoundingBox,
                    touchBoundingBox = _options$touchBoundin === undefined ? (0, _throwIfMissing2["default"])() : _options$touchBoundin,
                    _options$namespace = options.namespace,
                    namespace = _options$namespace === undefined ? null : _options$namespace,
                    _options$zoomFactor = options.zoomFactor,
                    zoomFactor = _options$zoomFactor === undefined ? (0, _throwIfMissing2["default"])() : _options$zoomFactor,
                    _options$boundingBoxC = options.boundingBoxContainer,
                    boundingBoxContainer = _options$boundingBoxC === undefined ? (0, _throwIfMissing2["default"])() : _options$boundingBoxC;
                this.settings = {
                  el: el,
                  zoomPane: zoomPane,
                  sourceAttribute: sourceAttribute,
                  handleTouch: handleTouch,
                  onShow: onShow,
                  onHide: onHide,
                  hoverDelay: hoverDelay,
                  touchDelay: touchDelay,
                  hoverBoundingBox: hoverBoundingBox,
                  touchBoundingBox: touchBoundingBox,
                  namespace: namespace,
                  zoomFactor: zoomFactor,
                  boundingBoxContainer: boundingBoxContainer
                };

                if (this.settings.hoverBoundingBox || this.settings.touchBoundingBox) {
                  this.boundingBox = new _BoundingBox2["default"]({
                    namespace: this.settings.namespace,
                    zoomFactor: this.settings.zoomFactor,
                    containerEl: this.settings.boundingBoxContainer
                  });
                }

                this.enabled = true;

                this._bindEvents();
              }

              _createClass(Trigger, [{
                key: "_bindEvents",
                value: function _bindEvents() {
                  this.settings.el.addEventListener("mouseenter", this._handleEntry, false);
                  this.settings.el.addEventListener("mouseleave", this._hide, false);
                  this.settings.el.addEventListener("mousemove", this._handleMovement, false);

                  if (this.settings.handleTouch) {
                    this.settings.el.addEventListener("touchstart", this._handleEntry, false);
                    this.settings.el.addEventListener("touchend", this._hide, false);
                    this.settings.el.addEventListener("touchmove", this._handleMovement, false);
                  }
                }
              }, {
                key: "_unbindEvents",
                value: function _unbindEvents() {
                  this.settings.el.removeEventListener("mouseenter", this._handleEntry, false);
                  this.settings.el.removeEventListener("mouseleave", this._hide, false);
                  this.settings.el.removeEventListener("mousemove", this._handleMovement, false);

                  if (this.settings.handleTouch) {
                    this.settings.el.removeEventListener("touchstart", this._handleEntry, false);
                    this.settings.el.removeEventListener("touchend", this._hide, false);
                    this.settings.el.removeEventListener("touchmove", this._handleMovement, false);
                  }
                }
              }, {
                key: "isShowing",
                get: function get() {
                  return this.settings.zoomPane.isShowing;
                }
              }]);

              return Trigger;
            }();

            var _initialiseProps = function _initialiseProps() {
              var _this = this;

              this._handleEntry = function (e) {
                e.preventDefault();
                _this._lastMovement = e;

                if (e.type == "mouseenter" && _this.settings.hoverDelay) {
                  _this.entryTimeout = setTimeout(_this._show, _this.settings.hoverDelay);
                } else if (_this.settings.touchDelay) {
                  _this.entryTimeout = setTimeout(_this._show, _this.settings.touchDelay);
                } else {
                  _this._show();
                }
              };

              this._show = function () {
                if (!_this.enabled) {
                  return;
                }

                var onShow = _this.settings.onShow;

                if (onShow && typeof onShow === "function") {
                  onShow();
                }

                _this.settings.zoomPane.show(_this.settings.el.getAttribute(_this.settings.sourceAttribute), _this.settings.el.clientWidth, _this.settings.el.clientHeight);

                if (_this._lastMovement) {
                  var touchActivated = _this._lastMovement.touches;

                  if (touchActivated && _this.settings.touchBoundingBox || !touchActivated && _this.settings.hoverBoundingBox) {
                    _this.boundingBox.show(_this.settings.zoomPane.el.clientWidth, _this.settings.zoomPane.el.clientHeight);
                  }
                }

                _this._handleMovement();
              };

              this._hide = function (e) {
                e.preventDefault();
                _this._lastMovement = null;

                if (_this.entryTimeout) {
                  clearTimeout(_this.entryTimeout);
                }

                if (_this.boundingBox) {
                  _this.boundingBox.hide();
                }

                var onHide = _this.settings.onHide;

                if (onHide && typeof onHide === "function") {
                  onHide();
                }

                _this.settings.zoomPane.hide();
              };

              this._handleMovement = function (e) {
                if (e) {
                  e.preventDefault();
                  _this._lastMovement = e;
                } else if (_this._lastMovement) {
                  e = _this._lastMovement;
                } else {
                  return;
                }

                var movementX = void 0,
                    movementY = void 0;

                if (e.touches) {
                  var firstTouch = e.touches[0];
                  movementX = firstTouch.clientX;
                  movementY = firstTouch.clientY;
                } else {
                  movementX = e.clientX;
                  movementY = e.clientY;
                }

                var el = _this.settings.el;
                var rect = el.getBoundingClientRect();
                var offsetX = movementX - rect.left;
                var offsetY = movementY - rect.top;
                var percentageOffsetX = offsetX / _this.settings.el.clientWidth;
                var percentageOffsetY = offsetY / _this.settings.el.clientHeight;

                if (_this.boundingBox) {
                  _this.boundingBox.setPosition(percentageOffsetX, percentageOffsetY, rect);
                }

                _this.settings.zoomPane.setPosition(percentageOffsetX, percentageOffsetY, rect);
              };
            };

            exports["default"] = Trigger;
          }, {
            "./BoundingBox": 1,
            "./util/throwIfMissing": 7
          }],
          4: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            var _throwIfMissing = require("./util/throwIfMissing");

            var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

            var _dom = require("./util/dom");

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                "default": obj
              };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            } // All officially-supported browsers have this, but it's easy to
            // account for, just in case.


            var divStyle = document.createElement("div").style;
            var HAS_ANIMATION = typeof document === "undefined" ? false : "animation" in divStyle || "webkitAnimation" in divStyle;

            var ZoomPane = function () {
              function ZoomPane() {
                var _this = this;

                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                _classCallCheck(this, ZoomPane);

                this._completeShow = function () {
                  _this.el.removeEventListener("animationend", _this._completeShow, false);

                  _this.el.removeEventListener("webkitAnimationEnd", _this._completeShow, false);

                  (0, _dom.removeClasses)(_this.el, _this.openingClasses);
                };

                this._completeHide = function () {
                  _this.el.removeEventListener("animationend", _this._completeHide, false);

                  _this.el.removeEventListener("webkitAnimationEnd", _this._completeHide, false);

                  (0, _dom.removeClasses)(_this.el, _this.openClasses);
                  (0, _dom.removeClasses)(_this.el, _this.closingClasses);
                  (0, _dom.removeClasses)(_this.el, _this.inlineClasses);

                  _this.el.setAttribute("style", ""); // The window could have been resized above or below `inline`
                  // limits since the ZoomPane was shown. Because of this, we
                  // can't rely on `this._isInline` here.


                  if (_this.el.parentElement === _this.settings.container) {
                    _this.settings.container.removeChild(_this.el);
                  } else if (_this.el.parentElement === _this.settings.inlineContainer) {
                    _this.settings.inlineContainer.removeChild(_this.el);
                  }
                };

                this._handleLoad = function () {
                  _this.imgEl.removeEventListener("load", _this._handleLoad, false);

                  (0, _dom.removeClasses)(_this.el, _this.loadingClasses);
                };

                this.isShowing = false;
                var _options$container = options.container,
                    container = _options$container === undefined ? null : _options$container,
                    _options$zoomFactor = options.zoomFactor,
                    zoomFactor = _options$zoomFactor === undefined ? (0, _throwIfMissing2["default"])() : _options$zoomFactor,
                    _options$inline = options.inline,
                    inline = _options$inline === undefined ? (0, _throwIfMissing2["default"])() : _options$inline,
                    _options$namespace = options.namespace,
                    namespace = _options$namespace === undefined ? null : _options$namespace,
                    _options$showWhitespa = options.showWhitespaceAtEdges,
                    showWhitespaceAtEdges = _options$showWhitespa === undefined ? (0, _throwIfMissing2["default"])() : _options$showWhitespa,
                    _options$containInlin = options.containInline,
                    containInline = _options$containInlin === undefined ? (0, _throwIfMissing2["default"])() : _options$containInlin,
                    _options$inlineOffset = options.inlineOffsetX,
                    inlineOffsetX = _options$inlineOffset === undefined ? 0 : _options$inlineOffset,
                    _options$inlineOffset2 = options.inlineOffsetY,
                    inlineOffsetY = _options$inlineOffset2 === undefined ? 0 : _options$inlineOffset2,
                    _options$inlineContai = options.inlineContainer,
                    inlineContainer = _options$inlineContai === undefined ? document.body : _options$inlineContai;
                this.settings = {
                  container: container,
                  zoomFactor: zoomFactor,
                  inline: inline,
                  namespace: namespace,
                  showWhitespaceAtEdges: showWhitespaceAtEdges,
                  containInline: containInline,
                  inlineOffsetX: inlineOffsetX,
                  inlineOffsetY: inlineOffsetY,
                  inlineContainer: inlineContainer
                };
                this.openClasses = this._buildClasses("open");
                this.openingClasses = this._buildClasses("opening");
                this.closingClasses = this._buildClasses("closing");
                this.inlineClasses = this._buildClasses("inline");
                this.loadingClasses = this._buildClasses("loading");

                this._buildElement();
              }

              _createClass(ZoomPane, [{
                key: "_buildClasses",
                value: function _buildClasses(suffix) {
                  var classes = ["drift-" + suffix];
                  var ns = this.settings.namespace;

                  if (ns) {
                    classes.push(ns + "-" + suffix);
                  }

                  return classes;
                }
              }, {
                key: "_buildElement",
                value: function _buildElement() {
                  this.el = document.createElement("div");
                  (0, _dom.addClasses)(this.el, this._buildClasses("zoom-pane"));
                  var loaderEl = document.createElement("div");
                  (0, _dom.addClasses)(loaderEl, this._buildClasses("zoom-pane-loader"));
                  this.el.appendChild(loaderEl);
                  this.imgEl = document.createElement("img");
                  this.el.appendChild(this.imgEl);
                }
              }, {
                key: "_setImageURL",
                value: function _setImageURL(imageURL) {
                  this.imgEl.setAttribute("src", imageURL);
                }
              }, {
                key: "_setImageSize",
                value: function _setImageSize(triggerWidth, triggerHeight) {
                  this.imgEl.style.width = triggerWidth * this.settings.zoomFactor + "px";
                  this.imgEl.style.height = triggerHeight * this.settings.zoomFactor + "px";
                } // `percentageOffsetX` and `percentageOffsetY` must be percentages
                // expressed as floats between `0' and `1`.

              }, {
                key: "setPosition",
                value: function setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
                  var left = -(this.imgEl.clientWidth * percentageOffsetX - this.el.clientWidth / 2);
                  var top = -(this.imgEl.clientHeight * percentageOffsetY - this.el.clientHeight / 2);
                  var maxLeft = -(this.imgEl.clientWidth - this.el.clientWidth);
                  var maxTop = -(this.imgEl.clientHeight - this.el.clientHeight);

                  if (this.el.parentElement === this.settings.inlineContainer) {
                    // This may be needed in the future to deal with browser event
                    // inconsistencies, but it's difficult to tell for sure.
                    // let scrollX = isTouch ? 0 : window.scrollX;
                    // let scrollY = isTouch ? 0 : window.scrollY;
                    var scrollX = window.pageXOffset;
                    var scrollY = window.pageYOffset;
                    var inlineLeft = triggerRect.left + percentageOffsetX * triggerRect.width - this.el.clientWidth / 2 + this.settings.inlineOffsetX + scrollX;
                    var inlineTop = triggerRect.top + percentageOffsetY * triggerRect.height - this.el.clientHeight / 2 + this.settings.inlineOffsetY + scrollY;

                    if (this.settings.containInline) {
                      var elRect = this.el.getBoundingClientRect();

                      if (inlineLeft < triggerRect.left + scrollX) {
                        inlineLeft = triggerRect.left + scrollX;
                      } else if (inlineLeft + this.el.clientWidth > triggerRect.left + triggerRect.width + scrollX) {
                        inlineLeft = triggerRect.left + triggerRect.width - this.el.clientWidth + scrollX;
                      }

                      if (inlineTop < triggerRect.top + scrollY) {
                        inlineTop = triggerRect.top + scrollY;
                      } else if (inlineTop + this.el.clientHeight > triggerRect.top + triggerRect.height + scrollY) {
                        inlineTop = triggerRect.top + triggerRect.height - this.el.clientHeight + scrollY;
                      }
                    }

                    this.el.style.left = inlineLeft + "px";
                    this.el.style.top = inlineTop + "px";
                  }

                  if (!this.settings.showWhitespaceAtEdges) {
                    if (left > 0) {
                      left = 0;
                    } else if (left < maxLeft) {
                      left = maxLeft;
                    }

                    if (top > 0) {
                      top = 0;
                    } else if (top < maxTop) {
                      top = maxTop;
                    }
                  }

                  this.imgEl.style.transform = "translate(" + left + "px, " + top + "px)";
                  this.imgEl.style.webkitTransform = "translate(" + left + "px, " + top + "px)";
                }
              }, {
                key: "_removeListenersAndResetClasses",
                value: function _removeListenersAndResetClasses() {
                  this.el.removeEventListener("animationend", this._completeShow, false);
                  this.el.removeEventListener("animationend", this._completeHide, false);
                  this.el.removeEventListener("webkitAnimationEnd", this._completeShow, false);
                  this.el.removeEventListener("webkitAnimationEnd", this._completeHide, false);
                  (0, _dom.removeClasses)(this.el, this.openClasses);
                  (0, _dom.removeClasses)(this.el, this.closingClasses);
                }
              }, {
                key: "show",
                value: function show(imageURL, triggerWidth, triggerHeight) {
                  this._removeListenersAndResetClasses();

                  this.isShowing = true;
                  (0, _dom.addClasses)(this.el, this.openClasses);
                  (0, _dom.addClasses)(this.el, this.loadingClasses);
                  this.imgEl.addEventListener("load", this._handleLoad, false);

                  this._setImageURL(imageURL);

                  this._setImageSize(triggerWidth, triggerHeight);

                  if (this._isInline) {
                    this._showInline();
                  } else {
                    this._showInContainer();
                  }

                  if (HAS_ANIMATION) {
                    this.el.addEventListener("animationend", this._completeShow, false);
                    this.el.addEventListener("webkitAnimationEnd", this._completeShow, false);
                    (0, _dom.addClasses)(this.el, this.openingClasses);
                  }
                }
              }, {
                key: "_showInline",
                value: function _showInline() {
                  this.settings.inlineContainer.appendChild(this.el);
                  (0, _dom.addClasses)(this.el, this.inlineClasses);
                }
              }, {
                key: "_showInContainer",
                value: function _showInContainer() {
                  this.settings.container.appendChild(this.el);
                }
              }, {
                key: "hide",
                value: function hide() {
                  this._removeListenersAndResetClasses();

                  this.isShowing = false;

                  if (HAS_ANIMATION) {
                    this.el.addEventListener("animationend", this._completeHide, false);
                    this.el.addEventListener("webkitAnimationEnd", this._completeHide, false);
                    (0, _dom.addClasses)(this.el, this.closingClasses);
                  } else {
                    (0, _dom.removeClasses)(this.el, this.openClasses);
                    (0, _dom.removeClasses)(this.el, this.inlineClasses);
                  }
                }
              }, {
                key: "_isInline",
                get: function get() {
                  var inline = this.settings.inline;
                  return inline === true || typeof inline === "number" && window.innerWidth <= inline;
                }
              }]);

              return ZoomPane;
            }();

            exports["default"] = ZoomPane;
          }, {
            "./util/dom": 6,
            "./util/throwIfMissing": 7
          }],
          5: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports["default"] = injectBaseStylesheet;
            var RULES = "\n@keyframes noop {\n  0% { zoom: 1; }\n}\n\n@-webkit-keyframes noop {\n  0% { zoom: 1; }\n}\n\n.drift-zoom-pane.drift-open {\n  display: block;\n}\n\n.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {\n  animation: noop 1ms;\n  -webkit-animation: noop 1ms;\n}\n\n.drift-zoom-pane {\n  position: absolute;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.drift-zoom-pane-loader {\n  display: none;\n}\n\n.drift-zoom-pane img {\n  position: absolute;\n  display: block;\n  max-width: none;\n  max-height: none;\n}\n\n.drift-bounding-box {\n  position: absolute;\n  pointer-events: none;\n}\n";

            function injectBaseStylesheet() {
              if (document.querySelector(".drift-base-styles")) {
                return;
              }

              var styleEl = document.createElement("style");
              styleEl.type = "text/css";
              styleEl.classList.add("drift-base-styles");
              styleEl.appendChild(document.createTextNode(RULES));
              var head = document.head;
              head.insertBefore(styleEl, head.firstChild);
            }
          }, {}],
          6: [function (require, module, exports) {
            "use strict";

            var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
              return typeof obj;
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
              return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
            };

            exports.isDOMElement = isDOMElement;
            exports.addClasses = addClasses;
            exports.removeClasses = removeClasses; // This is not really a perfect check, but works fine.
            // From http://stackoverflow.com/questions/384286

            var HAS_DOM_2 = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object";

            function isDOMElement(obj) {
              return HAS_DOM_2 ? obj instanceof HTMLElement : obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
            }

            function addClasses(el, classNames) {
              classNames.forEach(function (className) {
                el.classList.add(className);
              });
            }

            function removeClasses(el, classNames) {
              classNames.forEach(function (className) {
                el.classList.remove(className);
              });
            }
          }, {}],
          7: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports["default"] = throwIfMissing;

            function throwIfMissing() {
              throw new Error("Missing parameter");
            }
          }, {}]
        }, {}, [2])(2);
      });
      /***/

    },

    /***/
    90158: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _pages_main_main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./pages/main/main.component */
      40440);
      /* harmony import */


      var _pages_authors_authors_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./pages/authors/authors.component */
      44947);
      /* harmony import */


      var _pages_workcited_workscited_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./pages/workcited/workscited.component */
      2122);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: "authors",
        component: _pages_authors_authors_component__WEBPACK_IMPORTED_MODULE_1__.AuthorsPageComponent
      }, {
        path: "workscited",
        component: _pages_workcited_workscited_component__WEBPACK_IMPORTED_MODULE_2__.WorksCitedPageComponent
      }, {
        path: "figures",
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() */
          "src_app_features_figures_figures_module_ts").then(__webpack_require__.bind(__webpack_require__,
          /*! ./features/figures/figures.module */
          86670)).then(function (mod) {
            return mod.FiguresModule;
          });
        }
      }, {
        path: "",
        component: _pages_main_main_component__WEBPACK_IMPORTED_MODULE_0__.MainPageComponent,
        pathMatch: "full"
      }, {
        path: "**",
        redirectTo: ""
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck2(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes, {
          relativeLinkResolution: 'legacy'
        })], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _components_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/header/header.component */
      43646);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _AppComponent = function _AppComponent() {
        _classCallCheck2(this, _AppComponent);
      };

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)();
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 2,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "router-outlet");
          }
        },
        directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    36747: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/header/header.component */
      43646);
      /* harmony import */


      var _pages_main_main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./pages/main/main.component */
      40440);
      /* harmony import */


      var _components_jumbo_title_jumbo_title_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/jumbo-title/jumbo-title.component */
      2645);
      /* harmony import */


      var _pages_authors_authors_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./pages/authors/authors.component */
      44947);
      /* harmony import */


      var _pages_workcited_workscited_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./pages/workcited/workscited.component */
      2122);
      /* harmony import */


      var _components_scroller_scroller_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./components/scroller/scroller.component */
      8578);
      /* harmony import */


      var _directives_tippy_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./directives/tippy.directive */
      67182);
      /* harmony import */


      var _directives_luminous_lightbox_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./directives/luminous-lightbox.directive */
      92930);
      /* harmony import */


      var _directives_driftzoom_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./directives/driftzoom.directive */
      39872);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./modules/shared/shared.module */
      72271);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AppModule = function _AppModule() {
        _classCallCheck2(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
        providers: [{
          provide: _angular_common__WEBPACK_IMPORTED_MODULE_13__.APP_BASE_HREF,
          useFactory: function useFactory(s) {
            return s.getBaseHrefFromDOM();
          },
          deps: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.PlatformLocation]
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent, _pages_main_main_component__WEBPACK_IMPORTED_MODULE_3__.MainPageComponent, _components_jumbo_title_jumbo_title_component__WEBPACK_IMPORTED_MODULE_4__.JumboTitleComponent, _pages_authors_authors_component__WEBPACK_IMPORTED_MODULE_5__.AuthorsPageComponent, _pages_workcited_workscited_component__WEBPACK_IMPORTED_MODULE_6__.WorksCitedPageComponent, _components_scroller_scroller_component__WEBPACK_IMPORTED_MODULE_7__.ScrollerComponent, _directives_tippy_directive__WEBPACK_IMPORTED_MODULE_8__.TippyDirective, _directives_luminous_lightbox_directive__WEBPACK_IMPORTED_MODULE_9__.LuminousLightboxDirective, _directives_driftzoom_directive__WEBPACK_IMPORTED_MODULE_10__.DriftzoomDirective],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule]
        });
      })();
      /***/

    },

    /***/
    43646: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HeaderComponent": function HeaderComponent() {
          return (
            /* binding */
            _HeaderComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _c0 = function _c0() {
        return {
          exact: true
        };
      };

      var _HeaderComponent = /*#__PURE__*/function () {
        function _HeaderComponent() {
          _classCallCheck2(this, _HeaderComponent);
        }

        _createClass2(_HeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _HeaderComponent;
      }();

      _HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
        return new (t || _HeaderComponent)();
      };

      _HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _HeaderComponent,
        selectors: [["app-header"]],
        decls: 12,
        vars: 2,
        consts: [["routerLink", "/", "routerLinkActive", "active-link", 3, "routerLinkActiveOptions"], ["routerLink", "/workscited", "routerLinkActive", "active-link"], ["href", "https://digitalwitchproject.tumblr.com/", "routerLinkActive", "active-link", "target", "_blank"], ["routerLink", "/figures", "routerLinkActive", "active-link"], ["routerLink", "/authors", "routerLinkActive", "active-link"]],
        template: function HeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Main");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Works Cited");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Methods");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Figures");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Authors");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkActive],
        styles: [".active-link[_ngcontent-%COMP%] {\n  border-bottom: 2px solid var(--main-font-700);\n  font-weight: 700;\n}\n.active-link[_ngcontent-%COMP%]:hover {\n  border-bottom: 2px dashed var(--chart-red-darker);\n  font-weight: 700;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDZDQUFBO0VBQ0EsZ0JBQUE7QUFDRjtBQUNFO0VBQ0UsaURBQUE7RUFDQSxnQkFBQTtBQUNKIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY3RpdmUtbGluayB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLW1haW4tZm9udC03MDApO1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IGRhc2hlZCB2YXIoLS1jaGFydC1yZWQtZGFya2VyKTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    2645: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "JumboTitleComponent": function JumboTitleComponent() {
          return (
            /* binding */
            _JumboTitleComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _JumboTitleComponent = /*#__PURE__*/function () {
        function _JumboTitleComponent() {
          _classCallCheck2(this, _JumboTitleComponent);
        }

        _createClass2(_JumboTitleComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _JumboTitleComponent;
      }();

      _JumboTitleComponent.ɵfac = function JumboTitleComponent_Factory(t) {
        return new (t || _JumboTitleComponent)();
      };

      _JumboTitleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _JumboTitleComponent,
        selectors: [["app-jumbo-title"]],
        decls: 47,
        vars: 0,
        consts: [[1, "contained", "hero"], [1, "title-card"], [1, "title"], [1, "mobilebreak"], [1, "byline"], [1, "abstract-card"], [1, "abstract"], ["href", "https://databasic.io/en/samediff/", "target", "_blank"], ["href", "http://lab.softwarestudies.com/p/imageplot.html", "target", "_blank"]],
        template: function JumboTitleComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Digital");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Witch ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Written by");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Tess Henthorne, Bridget L. Sellers, and Elizabeth Crowley Webber. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Visualizations by");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Elizabeth Crowley Webber.");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Website by");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Benjamin Liden.");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h3", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Abstract");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " The general purpose of the Digital Witch Project is to create a methodology for understanding film genres and cycles using digital tools. Our specific goal is to investigate the dialogue and images of one critically understudied genre, witch films, and draw conclusions about the emergence of patterns and trends over time. The project has three stages: (1) identifying a corpus of witch films, (2) collecting data from that corpus on textual and visual similarities between films, and (3) visualizing and analyzing collected data. We employed ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "SameDiff");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " a textual comparison of dialogue in witch films and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "ImagePlot");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " for a visual comparison of theatrical posters and film stills. This investigation reveals prototypical films, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "; cycles, including the ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Harry Potter");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " franchise and the made-for-television witch film trend; and outliers, including ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Snow White and the Seven Dwarfs");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, ". In all, we hope this study sparks more conversations on the complex inner workings of genre film production, capitalism, and the tradition of co-opting witchcraft\u2014a symbol of import to various marginalized cultures\u2014within U.S. film and media. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJqdW1iby10aXRsZS5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    8578: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ScrollerComponent": function ScrollerComponent() {
          return (
            /* binding */
            _ScrollerComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/cdk/layout */
      66883);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      33927);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      22663);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      79441);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      82516);
      /* harmony import */


      var scrollama__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! scrollama */
      86918);
      /* harmony import */


      var scrollama__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scrollama__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var src_app_directives_driftzoom_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../directives/driftzoom.directive */
      39872);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _directives_luminous_lightbox_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../directives/luminous-lightbox.directive */
      92930);
      /* harmony import */


      var _directives_tippy_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../directives/tippy.directive */
      67182);

      var _c0 = ["scrollContainer"];
      var _c1 = ["scrollText"];
      var _c2 = ["scrollGraphic"];
      var _c3 = ["chart"];
      var _c4 = ["step"];

      var getNativeElement = function getNativeElement(el) {
        return el.nativeElement;
      };

      var getDriftInstance = function getDriftInstance(directive) {
        return directive.drift;
      };

      var _ScrollerComponent = /*#__PURE__*/function () {
        function _ScrollerComponent(breakpointObserver) {
          _classCallCheck2(this, _ScrollerComponent);

          this.breakpointObserver = breakpointObserver; // this observable is emits true whenever the viewport is <959px

          this.isMobile$ = this.breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.XSmall, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Small]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(function (result) {
            return result.matches;
          }));
          this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        }

        _createClass2(_ScrollerComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.driftZoomRefs = {
              scrollGraphic: this.scrollGraphicRef,
              scrollText: this.scrollTextRef,
              chart: this.chartRef
            };
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.buildRefArrays();
            this.initScrollama();
            this.windowResizeListener();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
          }
        }, {
          key: "handleResize",
          value: function handleResize() {
            var graphic = this.scrollGraphicRef.nativeElement;
            var text = this.scrollTextRef.nativeElement;
            var chart = this.chartRef.nativeElement; // 1. update height of step elems for room between steps

            var stepHeight = Math.floor(window.innerHeight * 0.25);
            this.stepRefs.forEach(function (singleStep) {
              singleStep.style.marginBottom = "".concat(stepHeight, "px");
            }); // 2. update height of graphic elem

            graphic.style.height = window.innerHeight + "px"; // 3. update width of chart by subrtacting from text width

            var textWidth = text.offsetWidth;
            var bodyWidth = document.body.offsetWidth;
            var chartWidth = bodyWidth - textWidth - 32; // make the height of 1/2 of viewport

            var chartHeight = Math.floor(window.innerHeight * 0.95);
            chart.style.width = chartWidth + "px";
            chart.style.height = chartHeight + "px"; // zoom factor recalced on resize. smaller screen -> larger zoom

            this.driftInstanceRefs.forEach(function (drift) {
              if (drift.triggerEl.classList.contains("boxOffice")) {
                drift.zoomFactor = 3.5 / bodyWidth * Math.pow(10, 3);
              } else if (drift.triggerEl.classList.contains("imageplot")) {
                drift.zoomFactor = 6 / bodyWidth * Math.pow(10, 3);
              } else {
                drift.zoomFactor = 4 / bodyWidth * Math.pow(10, 3);
              }
            }); // 4. tell scrollama to update new elem dimensions

            this.scroller.resize();
          }
        }, {
          key: "windowResizeListener",
          value: function windowResizeListener() {
            this.resizeListener = (0, rxjs__WEBPACK_IMPORTED_MODULE_7__.fromEvent)(window, "resize").pipe( // debounceTime(500),
            (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.destroy$)).subscribe(this.handleResize.bind(this)); // must bind this to access class props
          }
          /*
            map over the QueryLists and return an array of nativeElements or driftInstances
          */

        }, {
          key: "buildRefArrays",
          value: function buildRefArrays() {
            this.stepRefs = this.steps.map(getNativeElement);
            this.imageRefs = this.driftZoomInstances.map(function (dir) {
              return dir.el;
            }).map(getNativeElement);
            this.driftInstanceRefs = this.driftZoomInstances.map(getDriftInstance);
          }
          /*
            setup scroller and define utility functions
          */

        }, {
          key: "initScrollama",
          value: function initScrollama() {
            var _this2 = this;

            this.scroller = scrollama__WEBPACK_IMPORTED_MODULE_0___default()();
            this.scroller.setup({
              container: this.scrollContainerRef.nativeElement,
              graphic: this.scrollGraphicRef.nativeElement,
              text: this.scrollTextRef.nativeElement,
              step: this.stepRefs,
              offset: 0.7
            }).onStepEnter(function (response) {
              var element = response.element,
                  index = response.index,
                  direction = response.direction; // make next step active

              _this2.stepRefs[index].classList.add("is-active"); // make next image(s) active, deactivate all others


              _this2.imageRefs.forEach(function (el) {
                if (Number(el.dataset.step) === index) {
                  el.classList.add("is-active");
                } else {
                  el.classList.remove("is-active");
                }
              });
            }).onContainerEnter(function (response) {
              var graphic = _this2.scrollGraphicRef.nativeElement;
              graphic.classList.add("is-fixed");
              graphic.classList.remove("is-bottom");
            }).onContainerExit(function (response) {
              var graphic = _this2.scrollGraphicRef.nativeElement;
              graphic.classList.remove("is-fixed");

              if (response.direction === "down") {
                graphic.classList.add("is-bottom");
              } else {
                graphic.classList.remove("is-bottom");
              }
            }); // resize only AFTER scrollama is initialized

            this.handleResize();
          }
        }]);

        return _ScrollerComponent;
      }();

      _ScrollerComponent.ɵfac = function ScrollerComponent_Factory(t) {
        return new (t || _ScrollerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.BreakpointObserver));
      };

      _ScrollerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _ScrollerComponent,
        selectors: [["app-scroller"]],
        viewQuery: function ScrollerComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c2, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c3, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c4, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_directives_driftzoom_directive__WEBPACK_IMPORTED_MODULE_1__.DriftzoomDirective, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.scrollContainerRef = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.scrollTextRef = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.scrollGraphicRef = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.chartRef = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.steps = _t);
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.driftZoomInstances = _t);
          }
        },
        decls: 274,
        vars: 10,
        consts: [["id", "scroll"], ["scrollContainer", ""], [1, "scroll__graphic"], ["scrollGraphic", ""], [1, "chart"], ["chart", ""], ["driftZoom", "", "src", "./assets/graphs/BoxOfficeReceipts.png", "data-step", "0", "alt", "Bar graph of Box Office Receipts", 1, "driftImg", "boxOffice", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Alpha-BrightnessVsHuePolar.png", "data-step", "2", "alt", "ImagePlot of Brightness vs. Hue", 1, "driftImg", "imageplot", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Alpha-BrightnessVsSaturationAxis.png", "data-step", "3", "alt", "ImagePlot of Brightness vs. Saturation (Axis)", 1, "driftImg", "imageplot", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Alpha-StillsBrightnessVsSaturation.png", "data-step", "4", "alt", "ImagePlot of (stills) Brightness vs. Saturation", 1, "driftImg", "imageplot", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_Halloweentown.png", "data-step", "6", "alt", "Scatterplot of Halloweentown", 1, "driftImg", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_HarryPotter.png", "data-step", "6", "alt", "Scatterplot of Harry Potter", 1, "driftImg", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_SnowWhite.png", "data-step", "7", "alt", "Scatterplot of Snow White", 1, "driftImg", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_BlairWitchProject.png", "data-step", "7", "alt", "Scatterplot of The Blair Witch Project", 1, "driftImg", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_WitchesOfEastwick.png", "data-step", "8", "alt", "Scatterplot of Witches of Eastwick", 1, "driftImg", 3, "refs"], ["driftZoom", "", "src", "./assets/graphs/Scatterplot_TheCraft.png", "data-step", "8", "alt", "Scatterplot of The Craft", 1, "driftImg", 3, "refs"], [1, "scroll__text"], ["scrollText", ""], ["data-step", "0", 1, "step"], ["step", ""], ["luminousLightbox", "", "src", "./assets/graphs/BoxOfficeReceipts.png", "alt", "Bar graph of Box Office Receipts", 1, "mobileImg"], [1, "dropcap"], ["tippy", "", "data-tippy-content", "The inclusive list is typically unwieldy and includes all films that fit a \u201Csimple, tautological definition\u201D (7). For\n                example, a Western (by this definition) is a film that takes place in the West. An exclusive list is curated and\n                focused on finding the quintessential films of a genre. Altman suggests that the inclusive list is based on semantics\n                whereas the exclusive list is based on syntactics.", 1, "tooltip"], ["href", "https://dhwitchcraft.tumblr.com/post/172893401162/text-collection", "target", "_blank"], ["href", "https://dhwitchcraft.tumblr.com/post/172875783202/image-collection", "target", "_blank"], ["tippy", "", "data-tippy-content", "We conducted our search from the same computer over a one-day window to eliminate differences between browsers on\n            different computers and any changes to available results. Occasionally, the selection of our film stills required\n            various editorial decisions, including selecting identical, higher resolution versions of film stills and excluding\n            returns from the incorrect film.", 1, "tooltip"], ["href", "http://lab.softwarestudies.com/p/imageplot.html", "target", "_blank"], ["href", "https://databasic.io/en/samediff/", "target", "_blank"], ["tippy", "", "data-tippy-content", "We picked these six films to serve as a proof of concept. We have plans in the future to gather similarity scores for\n            all films in the corpus.", 1, "tooltip"], ["data-step", "1", 1, "step"], ["href", "https://www.imdb.com/", "target", "_blank"], ["href", "https://help.imdb.com/article/contribution/contribution-information/how-do-i-contribute-data-to-imdb/GVZTHQ48SWS47WDK?ref_=helpsect_contrib_1_2#", "target", "_blank"], ["data-step", "2", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Alpha-BrightnessVsHuePolar.png", "alt", "ImagePlot of Brightness vs. Hue", 1, "mobileImg"], ["data-step", "3", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Alpha-BrightnessVsSaturationAxis.png", "alt", "ImagePlot of Brightness vs. Saturation (Axis)", 1, "mobileImg"], ["data-step", "4", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Alpha-StillsBrightnessVsSaturation.png", "alt", "ImagePlot of (stills) Brightness vs. Saturation", 1, "mobileImg"], ["data-step", "5", 1, "step"], ["data-step", "6", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_Halloweentown.png", "alt", "Scatterplot of Halloweentown", 1, "mobileImg"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_HarryPotter.png", "alt", "Scatterplot of Harry Potter", 1, "mobileImg"], ["data-step", "7", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_SnowWhite.png", "alt", "Scatterplot of Snow White", 1, "mobileImg"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_BlairWitchProject.png", "alt", "Scatterplot of The Blair Witch Project", 1, "mobileImg"], ["data-step", "8", 1, "step"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_WitchesOfEastwick.png", "data-step", "8", "alt", "Scatterplot of Witches of Eastwick", 1, "mobileImg"], ["luminousLightbox", "", "src", "./assets/graphs/Scatterplot_TheCraft.png", "data-step", "8", "alt", "Scatterplot of The Craft", 1, "mobileImg"]],
        template: function ScrollerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "section", 0, 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 2, 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 4, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "img", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "img", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "img", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "img", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "img", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "img", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "img", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "img", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](14, "img", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](15, "img", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "div", 16, 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "div", 18, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](21, "Corpus Development and Collection");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](22, "img", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](24, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](25, "I");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "n this first phase of the Digital Witch Project, we collected an ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "span", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](28, "inclusive corpus*");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, " of witch films. Despite the witch\u2019s prevalence in the collective imagination, no singular definition exists. For example, if we consider both The Church and School of Wicca and Louisiana Voodoo, each employs their own unique definition and identity. In the context of film genre, though, cultural census allows us to readily identify a large number of so-called \u201Cwitch films\u201D that have co-opted the term. We let public opinion guide us as we created our corpus: If a film was called a witch film by film distributors, marketing materials, fan websites, listicles, or scholarly articles, we included it. This methodology necessarily introduces certain biases, and in our case it immediately illustrated how the figure of the witch is white-washed and subdued in media. Lastly, we supplemented the list with any film that included named \u201Cwitches,\u201D such as the three ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](31, "Macbeth");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](32, " films. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](34, " We then collected ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "a", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](36, "dialogue transcripts");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](37, ", original ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](38, "a", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39, "release posters");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](40, ", and most popular stills of each ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](41, "span", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](42, "film.*");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](43, " We employed the image comparison tool ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](44, "a", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](45, "ImagePlot");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](46, " to examine differences and similarities in hue, brightness, and saturation among the release posters and film stills. Using the text comparison tool ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](47, "a", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](48, "SameDiff");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](49, ", we simultaneously compared each witch film\u2019s dialogue to ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](50, "span", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](51, "six films*");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](52, " that indicate watershed moments in the genre\u2019s development: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](53, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](54, "Snow White and the Seven Dwarfs");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](55, " (David Hand et al, 1937), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](56, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](57, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](58, ", ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](59, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](60, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](61, ", ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](62, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](63, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](64, ", ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](65, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](66, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](67, ", and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](68, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](69, "Harry Potter and the Sorcerer\u2019s Stone");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](70, " (Chris Columbus, 2001). Initially, we selected these prototypical films based on box office receipts. The films that appeared when we found these receipts, after we adjusted for inflations, were ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](71, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](72, "Snow White");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](73, " and the first ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](74, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](75, "Harry Potter");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](76, ". We also observed how seminal two specific films, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](77, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](78, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](79, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](80, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](81, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](82, ", were in fannish and scholarly conversations about witch films. Similarly, when we searched popular culture lists, the made-for-television movie ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](83, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](84, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](85, " occupied a significant place in conversations; this film highlighted a cycle of made-for-television witch movies that our initial view of box office receipts ignored. The following demonstrates our findings and analysis thereof. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](86, "div", 29, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](88, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](89, "Visual Analysis Using ImagePlot");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](90, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](91, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](92, "I");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](93, "n addition to informing our definition of witch films as a genre, cultural perception also shaped how we approached visual analysis. As mentioned earlier, we analyzed theatrical posters and film stills to consider both how this genre is marketed and received by audiences. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](94, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](95, " For theatrical posters, we used the poster associated with each film on the ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](96, "a", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](97, "Internet Movie Database (IMDB)");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](98, ". IMDB provided continuity\u2014nearly all U.S. films are included in the database\u2014and also allowed us to study how viewers perceive witch films, because IMDB pages are curated by ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](99, "a", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](100, "volunteer contributors");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](101, " rather than by the film\u2019s distributors. ImagePlot, then, allows us to perform a color study of the collection of theatrical posters, indicating what shared visual characteristics define marketing techniques of the generic witch film. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](102, "div", 32, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](104, "img", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](105, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](106, " We first rendered the posters as a polar visualization of brightness and hue, which compares the relative lightness of the image to the variations in colors or shades as they relate to the color wheel. The majority of posters clustered around the center of the graph, which means that, on average, those images use darker hues than ones toward the edges. There were relatively few posters that used vibrant blue hues, with the exceptions of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](107, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](108, "Bewitched");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](109, " (Nora Ephron, 2005) and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](110, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](111, "Sleeping Beauty");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](112, " (Clyde Geronimi, 1959), and even fewer that used green hues, excluding ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](113, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](114, "Rosemary\u2019s Baby");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](115, ". Yet, if we consider the films at the center of the graph, the generic witch film looks different than expected. Where we might anticipate some combination of warmer yellows and oranges, following the model of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](116, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](117, "Practical Magic");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](118, " (Griffin Dunne, 1998) or ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](119, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](120, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](121, ", posters most commonly used black in combination with colder blues and grays to suggest that the generic witch film poster is icier, darker than expected. A surprising trend was the lack of reds. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](122, "div", 34, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](124, "img", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](125, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](126, " We also organized these theatrical posters to compare brightness and saturation along the x- and- y-axes respectively. Here, the visualization indicates a trend of higher saturation in theatrical posters, which generally aligns with the darker hues of our first graph. But organizing the posters by brightness and saturation also reveals a cluster of outliers not apparent in our first visualization. There is a cluster of films\u2014");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](127, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](128, "The Wizard of Oz");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](129, " (Victor Fleming, 1939), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](130, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](131, "Little Witches");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](132, " (Jane Simpson, 1996), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](133, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](134, "The Crucible");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](135, " (Nicholas Hytner, 1996), and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](136, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](137, "Maleficent");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](138, " (Robert Stromberg, 2014), among others\u2014near the bottom right corner that have the highest possible brightness and lower color saturations. All predominantly white in hue, these posters range across subgenres and historical periods. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](139, "div", 36, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](141, "img", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](142, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](143, " Our visualization of film stills supports this analysis. For each film, we collected the first image return from a Google Search for \u201C[film title] + film still.\u201D Although the Google Search algorithm is partially randomized, influenced by factors like the computer\u2019s previous search history, it also ranks pages based on their relevance to search terms and allows for a study of how public discourse contextualizes each ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](144, "span", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](145, "film.*");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](146, " As the graph shows, the majority of film stills maintain a lower brightness and higher saturation. Yet there are several exceptions: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](147, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](148, "Suspiria");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](149, " (Dario Argento, 1977), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](150, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](151, "Teen Witch");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](152, " (Dorain Walker, 1989), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](153, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](154, "The Little Mermaid");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](155, " (Ron Clements & John Musker, 1989)\u2014nearly off the graph\u2014");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](156, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](157, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](158, ", and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](159, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](160, "The Wicker Man");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](161, " (Neil LaBute, 2006). ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](162, "div", 38, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](164, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](165, "Textual Analysis Using SameDiff");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](166, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](167, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](168, "T");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](169, "urning from the visual similarity to looking at the dialogue, we gathered cosine similarity scores for our six benchmark films resulting in six distinct graphs, rendered using a combination of RawGraphs and Adobe Illustrator. In all graphs, the x-axis represents chronological time and the y-axis denotes the percent similarity between a film and the potential prototypical film. We included ratings because we thought that there would be some connection or pattern in similarity between those films with similar ratings. While this bore out in the made-for-TV witch films, beyond this cycle we don\u2019t see any significant ratings-based patterns. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](170, "div", 39, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](172, "img", 40);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](173, "img", 41);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](174, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](175, " The graphs revealed a few unexpected trends. One of the most prominent cycles is that of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](176, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](177, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](178, ". Many of the closest films to this are in fact other made-for-television witch films, such as ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](179, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](180, "Sabrina the Teenage Witch");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](181, ". The success of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](182, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](183, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](184, " prompted several sequels, including ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](185, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](186, "Halloweentown II: Kalabar\u2019s Revenge");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](187, " (Mary Lambert, 2001), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](188, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](189, "Halloweentown High");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](190, " (Mark A. Z. Dippe, 2004), and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](191, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](192, "Return to Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](193, " (David Jackson, 2006). Meanwhile, the Disney Channel also put out ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](194, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](195, "Twitches");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](196, " (Stuart Gillard, 2005) and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](197, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](198, "Twitches, Too");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](199, " (Stuary Gillard, 2007). This cycle is nested within the genre; for example, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](200, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](201, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](202, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](203, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](204, "Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](205, " are 72 percent similar. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](206, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](207, " The ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](208, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](209, "Harry Potter");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](210, " films represent a distinct cycle but remain a generic outlier. This underlines the ways in which ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](211, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](212, "Harry Potter");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](213, " was not marketed as a witch film, even though half the characters are witches. Despite the fact that the semantic elements are present\u2014the broomsticks, wands, cats and spells\u2014the film\u2019s dialogue is quite dissimilar from other witch films. For example, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](214, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](215, "Harry Potter and the Sorcerer\u2019s Stone");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](216, " is only 24 percent similar to ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](217, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](218, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](219, ". ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](220, "div", 42, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](222, "img", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](223, "img", 44);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](224, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](225, " While ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](226, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](227, "Harry Potter");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](228, " represents an outlying cycle in the genre, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](229, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](230, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](231, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](232, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](233, "Snow White");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](234, " are outliers all together. They are entirely dissimilar from the majority of films in the genre and do not seem to initiate the production of dialogue-similar films. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](235, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](236, "Snow White");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](237, " is the highest grossing film in our corpus with multiple theatrical releases. One would think that the second highest grossing film and another heavy-hitter for Disney, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](238, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](239, "Sleeping Beauty");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](240, ", would have used similar language. Yet ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](241, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](242, "Sleeping Beauty");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](243, " is only 18 percent similar to its studio predecessor. In regards to our other outlier, the only films that resembles ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](244, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](245, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](246, " is ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](247, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](248, "The Woods");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](249, " at 52 percent, with all other films falling at or below 32 percent. Perhaps we might say that ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](250, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](251, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](252, " is a horror film first, and a witch film second. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](253, "div", 45, 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](255, "img", 46);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](256, "img", 47);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](257, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](258, " If two prototypical, theatrical witch films seemed to emerge from this study, it would be ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](259, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](260, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](261, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](262, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](263, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](264, ". Looking at the timeline of these graphs, we see an uptick in the number of witch films produced after ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](265, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](266, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](267, ". This could be explained by an uptick in the sheer number of movies being made. However, it could also be tied to the post-1970s increase in interest in Wicca and the concurrent commodification of witchcraft or to greater recognition by production companies of the attractiveness of the witch film as a genre. It is also interesting that ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](268, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](269, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](270, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](271, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](272, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](273, " are 80 percent similar, despite the fact that they are presumably geared toward distinct audiences: The first is about three adult female friends having shared sexual, magical, and maternal experiences, while the second is about the perils and promise of ostracization and female friendship in high school. Both films have garnered the majority of fan and scholarly attention in the genre, so it is at the same time unsurprising that they coalesce at the level of language. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("refs", ctx.driftZoomRefs);
          }
        },
        directives: [src_app_directives_driftzoom_directive__WEBPACK_IMPORTED_MODULE_1__.DriftzoomDirective, _directives_luminous_lightbox_directive__WEBPACK_IMPORTED_MODULE_2__.LuminousLightboxDirective, _directives_tippy_directive__WEBPACK_IMPORTED_MODULE_3__.TippyDirective],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzY3JvbGxlci5jb21wb25lbnQuc2NzcyJ9 */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    39872: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DriftzoomDirective": function DriftzoomDirective() {
          return (
            /* binding */
            _DriftzoomDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_assets_scripts_Drift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/assets/scripts/Drift */
      13393);
      /* harmony import */


      var src_assets_scripts_Drift__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(src_assets_scripts_Drift__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316); // not node_modules


      var options = {
        // Prefix for generated element class names (e.g. `my-ns` will
        // result in classes such as `my-ns-pane`. Default `drift-`
        // prefixed classes will always be added as well.
        namespace: null,
        // Whether the ZoomPane should show whitespace when near the edges.
        showWhitespaceAtEdges: false,
        // Whether the inline ZoomPane should stay inside
        // the bounds of its image.
        containInline: false,
        // containInline: true,
        // How much to offset the ZoomPane from the
        // interaction point when inline.
        inlineOffsetX: 0,
        inlineOffsetY: 0,
        // A DOM element to append the inline ZoomPane to.
        inlineContainer: document.body,
        // Which trigger attribute to pull the ZoomPane image source from.
        sourceAttribute: "src",
        // How much to magnify the trigger by in the ZoomPane.
        // (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane image
        // if the trigger is displayed at 300 px wide)
        zoomFactor: 3,
        // A DOM element to append the non-inline ZoomPane to.
        // Required if `inlinePane !== true`.
        // paneContainer: document.querySelector('.chart'),
        // When to switch to an inline ZoomPane. This can be a boolean or
        // an integer. If `true`, the ZoomPane will always be inline,
        // if `false`, it will switch to inline when `windowWidth <= inlinePane`
        // inlinePane: true,
        inlinePane: 375,
        // If `true`, touch events will trigger the zoom, like mouse events.
        handleTouch: true,
        // If present (and a function), this will be called
        // whenever the ZoomPane is shown.
        // onShow: onShow,
        // If present (and a function), this will be called
        // whenever the ZoomPane is hidden.
        // onHide: onHide,
        // Add base styles to the page. See the "Theming"
        // section of README.md for more information.
        injectBaseStyles: true,
        // An optional number that determines how long to wait before
        // showing the ZoomPane because of a `mouseenter` event.
        hoverDelay: 0,
        // An optional number that determines how long to wait before
        // showing the ZoomPane because of a `touchstart` event.
        // It's unlikely that you would want to use this option, since
        // "tap and hold" is much more intentional than a hover event.
        touchDelay: 0,
        // If true, a bounding box will show the area currently being previewed
        // during mouse hover
        hoverBoundingBox: false,
        // If true, a bounding box will show the area currently being previewed
        // during touch events
        touchBoundingBox: false
      };

      var _DriftzoomDirective = /*#__PURE__*/function () {
        function _DriftzoomDirective(el) {
          _classCallCheck2(this, _DriftzoomDirective);

          this.el = el;
          this.el = el;
        }

        _createClass2(_DriftzoomDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.chart = this.refs.chart.nativeElement;
            this.text = this.refs.scrollText.nativeElement;
            this.graphic = this.refs.scrollGraphic.nativeElement; // initialize drift zoom once View is created only

            this.drift = new (src_assets_scripts_Drift__WEBPACK_IMPORTED_MODULE_0___default())(this.el.nativeElement, Object.assign(Object.assign({}, options), {
              paneContainer: this.graphic,
              onShow: this.onShow.bind(this),
              onHide: this.onHide.bind(this) // must bind fn to access class scope

            }));
          }
        }, {
          key: "onShow",
          value: function onShow() {
            this.chart.style.opacity = "0.5";
            this.chart.classList.toggle("blurry"); // imageSet.forEach(function(image){
            // 	image.classList.toggle('blurry');
            // });

            this.text.classList.toggle("blurry");
            this.graphic.style.background = "rgba(0, 0, 0, 0)";
          }
        }, {
          key: "onHide",
          value: function onHide() {
            this.chart.style.opacity = "1";
            this.chart.classList.toggle("blurry"); // imageSet.forEach(function(image){
            // 	image.classList.toggle('blurry');
            // });

            this.text.classList.toggle("blurry");
            this.graphic.style.background = "rgba(0, 0, 0, 0)";
          }
        }]);

        return _DriftzoomDirective;
      }();

      _DriftzoomDirective.ɵfac = function DriftzoomDirective_Factory(t) {
        return new (t || _DriftzoomDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
      };

      _DriftzoomDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _DriftzoomDirective,
        selectors: [["", "driftZoom", ""]],
        inputs: {
          refs: "refs"
        }
      });
      /***/
    },

    /***/
    92930: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LuminousLightboxDirective": function LuminousLightboxDirective() {
          return (
            /* binding */
            _LuminousLightboxDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var luminous_lightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! luminous-lightbox */
      35372);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var options = {
        // Prefix for generated element class names (e.g. `my-ns` will
        // result in classes such as `my-ns-lightbox`. Default `lum-`
        // prefixed classes will always be added as well.
        namespace: null,
        // Which attribute to pull the lightbox image source from.
        // sourceAttribute: 'href',
        sourceAttribute: "src",
        // Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.
        caption: null,
        // The event to listen to on the _trigger_ element: triggers opening.
        openTrigger: "click",
        // The event to listen to on the _lightbox_ element: triggers closing.
        closeTrigger: "click",
        // Allow closing by pressing escape.
        closeWithEscape: true,
        // Automatically close when the page is scrolled.
        closeOnScroll: false,
        // A selector defining what to append the lightbox element to.
        appendToSelector: "body",
        // If present (and a function), this will be called
        // whenever the lightbox is opened.
        onOpen: null,
        // If present (and a function), this will be called
        // whenever the lightbox is closed.
        onClose: null,
        // When true, adds the `imgix-fluid` class to the `img`
        // inside the lightbox. See https://github.com/imgix/imgix.js
        // for more information.
        includeImgixJSClass: false,
        // Add base styles to the page. See the "Theming"
        // section of README.md for more information.
        injectBaseStyles: true
      };

      var _LuminousLightboxDirective = /*#__PURE__*/function () {
        function _LuminousLightboxDirective(el) {
          _classCallCheck2(this, _LuminousLightboxDirective);

          this.el = el;
          this.el = el;
        }

        _createClass2(_LuminousLightboxDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            new luminous_lightbox__WEBPACK_IMPORTED_MODULE_0__.Luminous(this.el.nativeElement, options);
          }
        }]);

        return _LuminousLightboxDirective;
      }();

      _LuminousLightboxDirective.ɵfac = function LuminousLightboxDirective_Factory(t) {
        return new (t || _LuminousLightboxDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
      };

      _LuminousLightboxDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _LuminousLightboxDirective,
        selectors: [["", "luminousLightbox", ""]]
      });
      /***/
    },

    /***/
    67182: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TippyDirective": function TippyDirective() {
          return (
            /* binding */
            _TippyDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tippy.js */
      91488);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var tippyOptions = {
        arrow: true,
        size: "large",
        interactive: true,
        placement: "bottom",
        delay: [200, 600]
      };

      var _TippyDirective = /*#__PURE__*/function () {
        // @Input('tippyOptions') public tippyOptions: object;
        function _TippyDirective(el) {
          _classCallCheck2(this, _TippyDirective);

          this.el = el;
          this.el = el;
        }

        _createClass2(_TippyDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            // tippy(this.el.nativeElement, this.tippyOptions || {});
            (0, tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.el.nativeElement, tippyOptions);
          }
        }]);

        return _TippyDirective;
      }();

      _TippyDirective.ɵfac = function TippyDirective_Factory(t) {
        return new (t || _TippyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
      };

      _TippyDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _TippyDirective,
        selectors: [["", "tippy", ""]]
      });
      /***/
    },

    /***/
    54937: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HeadingComponent": function HeadingComponent() {
          return (
            /* binding */
            _HeadingComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      54364);

      var _c0 = ["*"];

      var _HeadingComponent = /*#__PURE__*/function () {
        function _HeadingComponent() {
          _classCallCheck2(this, _HeadingComponent);
        }

        _createClass2(_HeadingComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _HeadingComponent;
      }();

      _HeadingComponent.ɵfac = function HeadingComponent_Factory(t) {
        return new (t || _HeadingComponent)();
      };

      _HeadingComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _HeadingComponent,
        selectors: [["app-heading"]],
        inputs: {
          classes: "classes",
          _title: "_title"
        },
        ngContentSelectors: _c0,
        decls: 4,
        vars: 2,
        consts: [[3, "ngClass"]],
        template: function HeadingComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.classes);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx._title);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass],
        encapsulation: 2
      });
      /***/
    },

    /***/
    15774: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SectionComponent": function SectionComponent() {
          return (
            /* binding */
            _SectionComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      54364);

      var _c0 = ["*"];

      var _SectionComponent = /*#__PURE__*/function () {
        function _SectionComponent() {
          _classCallCheck2(this, _SectionComponent);
        }

        _createClass2(_SectionComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _SectionComponent;
      }();

      _SectionComponent.ɵfac = function SectionComponent_Factory(t) {
        return new (t || _SectionComponent)();
      };

      _SectionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _SectionComponent,
        selectors: [["app-section"]],
        inputs: {
          classes: "classes",
          _title: "_title"
        },
        ngContentSelectors: _c0,
        decls: 4,
        vars: 2,
        consts: [[1, "contained", 3, "ngClass"]],
        template: function SectionComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.classes);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx._title);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass],
        styles: ["section[_ngcontent-%COMP%] {\n  margin-top: 5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQUNGIiwiZmlsZSI6InNlY3Rpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uIHtcclxuICBtYXJnaW4tdG9wOiA1cmVtO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    72271: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_section_section_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/section/section.component */
      15774);
      /* harmony import */


      var _components_heading_heading_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/heading/heading.component */
      54937);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SharedModule = function _SharedModule() {
        _classCallCheck2(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_SharedModule, {
          declarations: [_components_section_section_component__WEBPACK_IMPORTED_MODULE_0__.SectionComponent, _components_heading_heading_component__WEBPACK_IMPORTED_MODULE_1__.HeadingComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
          exports: [_components_section_section_component__WEBPACK_IMPORTED_MODULE_0__.SectionComponent, _components_heading_heading_component__WEBPACK_IMPORTED_MODULE_1__.HeadingComponent]
        });
      })();
      /***/

    },

    /***/
    44947: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthorsPageComponent": function AuthorsPageComponent() {
          return (
            /* binding */
            _AuthorsPageComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AuthorsPageComponent = /*#__PURE__*/function () {
        function _AuthorsPageComponent() {
          _classCallCheck2(this, _AuthorsPageComponent);
        }

        _createClass2(_AuthorsPageComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AuthorsPageComponent;
      }();

      _AuthorsPageComponent.ɵfac = function AuthorsPageComponent_Factory(t) {
        return new (t || _AuthorsPageComponent)();
      };

      _AuthorsPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AuthorsPageComponent,
        selectors: [["app-authors"]],
        decls: 30,
        vars: 0,
        consts: [[1, "contained", "hero"], [1, "title"], [1, ""], ["href", "https://www.github.com/bcliden"]],
        template: function AuthorsPageComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Authors");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Bridget L. Sellers, Georgetown University");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Sellers is a master\u2019s candidate in English literature with a focus in new media, film, and game studies. She currently serves as a research assistant through the Georgetown Lannan Associateship. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Elizabeth Crowley Webber, Georgetown University");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Crowley Webber is a master\u2019s candidate in English literature with an emphasis in film and media studies. She is the assistant manuscript editor for ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Cinema Journal");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, ". ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Tess Henthorne,* Georgetown University ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Henthorne is a master's candidate in English literature. Her work focuses on nineteenth-century British literature, digital humanities, and the history of science. She is a graduate associate at the Center for New Designs in Learning and Scholarship. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Benjamin Liden");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Liden is a Washington, DC, based web developer. He can be reached at benjamin.c.liden@gmail.com. You can find more of his work on ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Github");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, ". ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRob3JzLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    40440: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MainPageComponent": function MainPageComponent() {
          return (
            /* binding */
            _MainPageComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _components_jumbo_title_jumbo_title_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../components/jumbo-title/jumbo-title.component */
      2645);
      /* harmony import */


      var _modules_shared_components_section_section_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/components/section/section.component */
      15774);
      /* harmony import */


      var _components_scroller_scroller_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/scroller/scroller.component */
      8578);

      var _MainPageComponent = /*#__PURE__*/function () {
        function _MainPageComponent() {
          _classCallCheck2(this, _MainPageComponent);
        }

        _createClass2(_MainPageComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _MainPageComponent;
      }();

      _MainPageComponent.ɵfac = function MainPageComponent_Factory(t) {
        return new (t || _MainPageComponent)();
      };

      _MainPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _MainPageComponent,
        selectors: [["app-main"]],
        decls: 121,
        vars: 0,
        consts: [["_title", "Witches, Genres, Cycles", "classes", "witchesgenrescycles"], [1, "dropcap"], ["_title", "Digital Humanities Projects On Film", "classes", "projectsonfilm"], ["href", "http://moviesincolor.com/", "target", "_blank"], ["href", "https://www.distantviewing.org/", "target", "_blank"], ["href", "https://www.ims.tuwien.ac.at/projects/digital-formalism", "target", "_blank"], ["href", "http://www.scripthreads.org", "target", "_blank"], ["href", "https://pudding.cool/2017/03/film-dialogue/", "target", "_blank"], ["href", "https://pudding.cool/2017/03/bechdel/", "target", "_blank"], ["_title", "After the Witching Hour...", "classes", "witchinghour"], ["_title", "Acknowledgements", "classes", "acknowledgements"]],
        template: function MainPageComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-jumbo-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "app-section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "G");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "enre films have familiar narratives, characters, and aesthetics. An extraterrestrial invades Earth. A slasher slowly kills off a group of teenagers until one final girl escapes. A lone outlaw rides off into the sunset. These patterns are a way for Hollywood to capitalize on the popularity of one film, turning it into a modular and repeatable type, a generic formula. While there is an overwhelming amount of research on certain film genres, a number of others remain critically understudied. Our research aims to establish a method for the digital analysis of one corpus of understudied genre films, witch films\u2014a genre that, according to critic Sarah Ward, pivots on the tension between oppositions to normality and structures of power (41). ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Ward argues that \u201Cas a term, a practice and a label commonly denouncing spiritual activities that defy dominant beliefs, witchcraft comes to the screen loaded with meaning\u201D (35). Although witches figure in almost every society across the globe, they occupy a unique space in American culture and history. From \u201Cwitch trials\u201D during the early colonial period to the present-day politicized \u201Cwitch-hunts,\u201D America has obsessed over witches for centuries. Culturally, the witch has been bound up in America\u2019s tumultuous relationships with religion, gender, and sexuality. Scholars tie popular witch media to their corresponding historical moments, particularly moments of unrest and paranoia\u2014for example, one cannot extricate Arthur Miller\u2019s play ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "The Crucible");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " (1953) from McCarthyism, nor can one detach ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Rosemary\u2019s Baby");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " (Roman Polanski, 1968) from the political unrest of the 1960s (Ward 37-40). When witchcraft became aligned with the women\u2019s liberation movement in the 1970s, interest in and media representations of witches boomed (Foltz). After this influx of interest, images of witches appear more domesticated. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, " There have been few comprehensive studies of the witch film despite the longevity of the genre, which began with the U.S. release of the silent film ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "H\xE4xan");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, " in 1929 (Benjamin Christensen). As popular culture tamed the witch, from violent or sexual threats to domesticated, loving, hard-working women of capitalism, witch comedies began to appear (Gibson 184). ABC\u2019s ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Bewitched");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " (1964\u20131972) set a precedent for the Disney-TV trend toward light-hearted witch series and movies. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Sabrina the Teenage Witch");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, " aired on ABC from 1996 to 2000 (before moving to the WB from 2000\u20132003). ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Halloweentown");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, " (Duwayne Dunham 1998) was the first in a cycle of Disney Channel Original Movies about witches. Meanwhile, the slightly darker ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Buffy the Vampire Slayer");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, " (1997\u20132003) and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Charmed");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " (1998\u20132006), which were a mix of comedy, horror, and teen drama, aired on the WB. Concurrent horror films such as ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "The Blair Witch Project");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, " (Daniel Myrick & Eduardo Sanchez, 1999), and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "The Conjuring");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, " (James Wan, 2013) recall the fear of difference that buoyed early representations of witches. The teen horror film ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, " (Andrew Fleming, 1996) reflects both a potential for liberation and regulation bound up in witchcraft. Sue Short, writing of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, ", notes the female characters\u2019 willingness to accept their status as outsiders and in fact embracing their exile as an \u201Calternative to existing norms\u201D (105). Of course, in the end only one member of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "The Craft");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, " coven\u2014the most \u201Cnormal\u201D among the four teenage girls\u2014remains empowered. These film and television trends reflect a period of the mass production of witch films, from the release of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "The Witches of Eastwick");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, " (George Miller) in 1987 to the release of ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "Harry Potter and the Deathly Hallows: Part Two");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, " (David Yates) in 2011. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, " In 1973, Andrew Tudor centered sociological and psychological context in his definition of genre, arguing that genre is \u201Cwhat we collectively believe it to be\u201D (139). That is, genre \u201Cis not a way in which a critic classifies films for methodological purposes, but the much looser way in which an audience classifies its films\u201D (145). While scholars and fans widely label witch films as such, what allows us to come to this agreement is much more complex than simply pointing to commonalities. In short, a genre is defined and created by cultural consensus. \u201CLike film genres,\u201D Amanda Klein writes, \u201Cfilm cycles are a series of films associated with each other through shared images, characters, settings or themes\u201D (4). She goes on to establish the difference between genre and cycle: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "blockquote");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, " However, while film genres are primarily defined by the repetition of key images (their semantics) and themes (their syntax), film cycles are primarily defined by how they are used (their pragmatics). In other words, the formation and longevity of film cycles are a direct result of their immediate financial viability as well as the public discourses circulating around them, including film reviews, director interviews, studio-issued press kits, movie posters, and theatrical trailers. (4) ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, " The center of film cycles are studios\u2019 attempts to cater to audience desires and expectations. If an audience enjoys a film (i.e., if a film earns a studio impressive returns at the box office or garners fan attention), the studio will copy some or all of it (e.g., the semantics or syntax) and graft these elements onto a new film. Cycles are about films\u2019 use-value and profitability; these are commodities, usually produced as quickly as possible. While cycles and genre function differently for our discussion of witch films, both are crucial for understanding how generic formulas reflect both audience and studio demands. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "app-section", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "span", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64, "W");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65, "e seek to position this project within a network of burgeoning scholarship on the digital analysis of film. With the onset of data mining digital humanities projects, we are now equipped with the tools for studying large-scale textual and visual trends more efficiently. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67, "Movies in Color");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, " analyzes the usage of color in film using color drop tools; the in-progress project ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](70, "Distant Viewing");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71, " takes on the movement of images; ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "a", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](73, "Digital Formalism");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, " examines visual elements of film to consider how formal techniques contribute to overall narrative structures. The tool ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "ScripThreads");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77, " identifies patterns of character interactions in screenplays. Meanwhile, projects from ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79, "The Pudding");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](80, ", such as ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](82, "\u201CFilm Dialogue from 2,000 Screenplays, Broken Down by Gender and Age\u201D");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83, " and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "a", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](85, "\u201CHollywood\u2019s Gender Divide and Its Effect on Films,\u201D");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](86, " rely strictly on text mining and lack scholarly rigor. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, " Finding throughlines and divergences in thousands of hours of footage is possible in ways that it hasn\u2019t been before, but methodologies for this have not yet been developed or tested. Considering that films are multimodal by design, telling and showing stories through sound, visual, narrative, and spectacle, the fact that all prior projects have stuck to either the text or the visual component of films elides the reality of the cinematic form. This is where our project hopes to intervene, first by doing a combined digital analysis of both dialogue and visuals, with long term goals of incorporating sound and moving images. At its core, this project is an experiment that uses digital tools in order to understand film genre and cycles. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](89, "app-scroller");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "app-section", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "span", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "A");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](94, "fter the peak production period of witch films (1987\u20132011), the trends seem to change. In the last few years, the number of action-adventure witch films has flourished. Here we refer to ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](96, "The Huntsman");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, " films (Rupert Sanders, 2012; Cedric Nicolas-Troyan, 2016), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "Hansel and Gretel: Witch Hunters");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](100, " (Tommy Wirkola, 2013), and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](102, "The Last Witch Hunter");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103, " (Breck Eisner, 2015). Alongside these, we see a resurgence of independent witch films, such as ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](104, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](105, "The House of the Devil");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](106, " (Ti West, 2009), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](108, "Antichrist");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, " (Lars von Trier, 2009), ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](111, "The Witch");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112, " (Roger Eggers, 2015), and ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](114, "The Love Witch");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](115, " (Anna Biller, 2016). The last two of these have received critical acclaim and suggest possible new watershed moments, although it is certainly too soon to tell. Nonetheless, they continue to rely on certain semantic elements, alongside the syntactics of the witch in American culture. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, " In phase two of the Digital Witch Project, we expect to add complexity and detail to the project\u2019s approach. First, we will run the rest of our corpus through SameDiff, accompanied by a further exploration of specific language use in the scripts using the language analysis tool Voyant. We will explore further the affordances of ImagePlot, while also considering other visual analysis tools. With another dimension of film in mind, we will search for sound analysis tools. Next, we will add data about each film's production company to see what patterns might emerge. Lastly, we will develop interactive graphs for our data to make them more readable and explorable. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "app-section", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](119, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](120, " We would like to thank the following individuals for their feedback and support: Amanda Phillips, Megan Martinsen, Melissa Jones, Matt Pavesich, and Caetlin Benson-Allott. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }
        },
        directives: [_components_jumbo_title_jumbo_title_component__WEBPACK_IMPORTED_MODULE_0__.JumboTitleComponent, _modules_shared_components_section_section_component__WEBPACK_IMPORTED_MODULE_1__.SectionComponent, _components_scroller_scroller_component__WEBPACK_IMPORTED_MODULE_2__.ScrollerComponent],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    2122: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WorksCitedPageComponent": function WorksCitedPageComponent() {
          return (
            /* binding */
            _WorksCitedPageComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _WorksCitedPageComponent = /*#__PURE__*/function () {
        function _WorksCitedPageComponent() {
          _classCallCheck2(this, _WorksCitedPageComponent);
        }

        _createClass2(_WorksCitedPageComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _WorksCitedPageComponent;
      }();

      _WorksCitedPageComponent.ɵfac = function WorksCitedPageComponent_Factory(t) {
        return new (t || _WorksCitedPageComponent)();
      };

      _WorksCitedPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _WorksCitedPageComponent,
        selectors: [["app-workscited"]],
        decls: 80,
        vars: 0,
        consts: [[1, "contained", "hero"], [1, "title"], [1, ""], ["href", "https://pudding.cool/2017/03/bechdel"], ["href", "http://www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html"], ["href", "http://lab.softwarestudies.com/p/imageplot.html#features1"], ["href", "https://databasic.io/en/samediff"]],
        template: function WorksCitedPageComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Works");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Cited");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Works Consulted and Cited");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Altman, Rick. \u201CA Semantic/Syntactic Approach to Film Genre.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Cinema Journal");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " vol. 23, no. 3, Spring 1984, pp. 6\u201318. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Friedman, Lyle et al. \u201CHollywood\u2019s Gender Divide and its Effect on Films: Examining the Gender of Writers, Producers, and Directors Who Make Films that Failed the Bechdel Test.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "The Pudding");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, ", ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "pudding.cool/2017/03/bechdel");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, ". Accessed March 27 2018. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Gibson, Marion. \u201C\u2018We Will Not Fly Silently into the Night\u2019\u201D and \u201CWitches in the Family: Comedy, Drama, and the Acceptance of American Witches.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Witchcraft: Myths in American Culture");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, ". Routledge, 2007, pp. 170-223. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Grindon, Leger. \u201CCycles and Clusters: The Shape of Film Genre History.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Film Genre Reader IV");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, ", edited by Keith Barry Grant, U Texas P, 2012, pp. 42\u201359. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Heftberger, Adelheid. \u201CDo Computers Dream of Cinema? Film Data for Computer Analysis and Visualization.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Understanding Digital Humanities");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, ", edited by David M. Berry, Palgrave Macmillan, 2012, pp. 210-223. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " Hutton, Ronald. \u201CThe Global Contexts.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "The Witch: A History of Fear from Ancient Times to the Present");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, ". Yale UP, 2017, pp. 3-43. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Hoyt, Eric, et al. \u201CVisualizing and Analyzing the Hollywood Screenplay with ScripThreads,\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "DHQ: Digital Humanities Quarterly");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, ", vol. 8, no. 4, 2014, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "www.digitalhumanities.org/dhq/vol/8/4/000190/000190.html");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, ". ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " \u201CImagePlot.\u201D Software Studies Initiative, Calit2 and The Graduate Center, CUNY, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "a", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "lab.softwarestudies.com/p/imageplot.html#features1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, ". Accessed 28 Mar. 2018. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, " Klein, Amanda Ann. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "American Film Cycles: Reframing Genres, Screening Social Problems, & Defining Subcultures");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, ". U Texas P, 2011. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " \u201CSameDiff.\u201D DataBasic, MIT Center for Civic Media and Engagement Lab, ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "a", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "databasic.io/en/samediff");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, ". Accessed 28 Mar. 2018. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, " Schatz, Thomas. \u201CThe Structural Influence: New Directions in Film Genre Study.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Quarterly Review of Film Studies");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, ", vol. 2, no. 3, August 1977, pp. 302\u2013312. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " Short, Sue. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Misfit Sisters: Screen Horror as Female Rites of Passage");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, ". Palgrave Macmillan, 2006. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Ward, Sarah. \u201CAll of Them Witch: Individuality, Conformity, and the Occult on Screen.\u201D ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "em");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "Screen Education");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, ", no. 83, pp. 34-41. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3b3Jrc2NpdGVkLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    92340: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    14431: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var intersection_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! intersection-observer */
      37000);
      /* harmony import */


      var intersection_observer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intersection_observer__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./environments/environment */
      92340); // this is a necessary polyfill for scrollama


      if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map