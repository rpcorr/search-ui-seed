webpackJsonpCoveo__temporary([19,55,65],{

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExternalModulesShim_1 = __webpack_require__(26);
var FocusTrap_1 = __webpack_require__(467);
var Strings_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var KeyboardUtils_1 = __webpack_require__(25);
var Core_1 = __webpack_require__(20);
var AccessibleModal = /** @class */ (function () {
    function AccessibleModal(className, ownerElement, modalboxModule, options) {
        if (modalboxModule === void 0) { modalboxModule = ExternalModulesShim_1.ModalBox; }
        if (options === void 0) { options = {}; }
        this.className = className;
        this.ownerElement = ownerElement;
        this.modalboxModule = modalboxModule;
        this.options = __assign({
            sizeMod: 'big'
        }, options);
    }
    Object.defineProperty(AccessibleModal.prototype, "isOpen", {
        get: function () {
            return !!this.focusTrap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessibleModal.prototype, "element", {
        get: function () {
            return this.activeModal && this.activeModal.modalBox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessibleModal.prototype, "content", {
        get: function () {
            return this.activeModal && this.activeModal.content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessibleModal.prototype, "wrapper", {
        get: function () {
            return this.activeModal && this.activeModal.wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessibleModal.prototype, "headerElement", {
        get: function () {
            return this.element && this.element.querySelector('.coveo-modal-header h1');
        },
        enumerable: true,
        configurable: true
    });
    AccessibleModal.prototype.openResult = function (parameters) {
        if (this.isOpen) {
            return;
        }
        this.openModalAndTrap({
            content: parameters.content,
            validation: parameters.validation,
            origin: parameters.origin,
            title: Core_1.DomUtils.getQuickviewHeader(parameters.result, parameters.options, parameters.bindings).el
        });
        this.makeAccessible(parameters.options.title || parameters.result.title);
    };
    AccessibleModal.prototype.open = function (parameters) {
        if (this.isOpen) {
            return;
        }
        this.openModalAndTrap(parameters);
        this.makeAccessible();
    };
    AccessibleModal.prototype.openModalAndTrap = function (parameters) {
        var _this = this;
        this.initiallyFocusedElement = parameters.origin || document.activeElement;
        this.activeModal = this.modalboxModule.open(parameters.content, {
            title: parameters.title,
            className: this.className,
            validation: function () {
                _this.onModalClose();
                return parameters.validation();
            },
            body: this.ownerElement,
            sizeMod: this.options.sizeMod,
            overlayClose: this.options.overlayClose
        });
        this.focusTrap = new FocusTrap_1.FocusTrap(this.element);
    };
    AccessibleModal.prototype.close = function () {
        if (!this.isOpen) {
            return;
        }
        this.activeModal.close();
        this.activeModal = null;
    };
    AccessibleModal.prototype.makeAccessible = function (title) {
        this.element.setAttribute('aria-modal', 'true');
        if (title) {
            this.headerElement.setAttribute('aria-label', title);
        }
        this.makeCloseButtonAccessible();
        this.updateFocus();
    };
    Object.defineProperty(AccessibleModal.prototype, "closeButton", {
        get: function () {
            return this.element.querySelector('.coveo-small-close');
        },
        enumerable: true,
        configurable: true
    });
    AccessibleModal.prototype.makeCloseButtonAccessible = function () {
        var closeButton = this.closeButton;
        closeButton.setAttribute('aria-label', Strings_1.l('Close'));
        closeButton.setAttribute('role', 'button');
        closeButton.tabIndex = 0;
        Dom_1.$$(closeButton).on('keyup', KeyboardUtils_1.KeyboardUtils.keypressAction(KeyboardUtils_1.KEYBOARD.ENTER, function () { return closeButton.click(); }));
    };
    AccessibleModal.prototype.updateFocus = function () {
        var focusOnElement = (this.options.focusOnOpen && this.options.focusOnOpen()) || this.closeButton;
        focusOnElement.focus();
    };
    AccessibleModal.prototype.onModalClose = function () {
        this.focusTrap.disable();
        this.focusTrap = null;
        if (this.initiallyFocusedElement && document.body.contains(this.initiallyFocusedElement)) {
            this.initiallyFocusedElement.focus();
        }
    };
    return AccessibleModal;
}());
exports.AccessibleModal = AccessibleModal;


/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExternalModulesShim_1 = __webpack_require__(26);
var GlobalExports_1 = __webpack_require__(3);
var Component_1 = __webpack_require__(7);
var Core_1 = __webpack_require__(20);
__webpack_require__(701);
var underscore_1 = __webpack_require__(0);
var UserFeedbackBanner_1 = __webpack_require__(702);
var AnalyticsActionListMeta_1 = __webpack_require__(10);
var HeightLimiter_1 = __webpack_require__(703);
var ExplanationModal_1 = __webpack_require__(704);
var Strings_1 = __webpack_require__(6);
var AttachShadowPolyfill_1 = __webpack_require__(519);
var Utils_1 = __webpack_require__(4);
var ComponentOptions_1 = __webpack_require__(8);
var SmartSnippetCommon_1 = __webpack_require__(520);
var ResultLink_1 = __webpack_require__(69);
var reasons = [
    {
        analytics: AnalyticsActionListMeta_1.AnalyticsSmartSnippetFeedbackReason.DoesNotAnswer,
        localeKey: 'UsefulnessFeedbackDoesNotAnswer'
    },
    {
        analytics: AnalyticsActionListMeta_1.AnalyticsSmartSnippetFeedbackReason.PartiallyAnswers,
        localeKey: 'UsefulnessFeedbackPartiallyAnswers'
    },
    {
        analytics: AnalyticsActionListMeta_1.AnalyticsSmartSnippetFeedbackReason.WasNotAQuestion,
        localeKey: 'UsefulnessFeedbackWasNotAQuestion'
    },
    {
        analytics: AnalyticsActionListMeta_1.AnalyticsSmartSnippetFeedbackReason.Other,
        localeKey: 'Other',
        hasDetails: true
    }
];
var BASE_CLASSNAME = 'coveo-smart-snippet';
var QUESTION_CLASSNAME = BASE_CLASSNAME + "-question";
var ANSWER_CONTAINER_CLASSNAME = BASE_CLASSNAME + "-answer";
var HAS_ANSWER_CLASSNAME = BASE_CLASSNAME + "-has-answer";
var SHADOW_CLASSNAME = BASE_CLASSNAME + "-content";
var CONTENT_CLASSNAME = BASE_CLASSNAME + "-content-wrapper";
var SOURCE_CLASSNAME = BASE_CLASSNAME + "-source";
var SOURCE_TITLE_CLASSNAME = SOURCE_CLASSNAME + "-title";
var SOURCE_URL_CLASSNAME = SOURCE_CLASSNAME + "-url";
exports.SmartSnippetClassNames = {
    QUESTION_CLASSNAME: QUESTION_CLASSNAME,
    ANSWER_CONTAINER_CLASSNAME: ANSWER_CONTAINER_CLASSNAME,
    HAS_ANSWER_CLASSNAME: HAS_ANSWER_CLASSNAME,
    SHADOW_CLASSNAME: SHADOW_CLASSNAME,
    CONTENT_CLASSNAME: CONTENT_CLASSNAME,
    SOURCE_CLASSNAME: SOURCE_CLASSNAME,
    SOURCE_TITLE_CLASSNAME: SOURCE_TITLE_CLASSNAME,
    SOURCE_URL_CLASSNAME: SOURCE_URL_CLASSNAME
};
/**
 * The SmartSnippet component displays the excerpt of a document that would be most likely to answer a particular query.
 *
 * This excerpt can be visually customized using inline styling.
 */
var SmartSnippet = /** @class */ (function (_super) {
    __extends(SmartSnippet, _super);
    function SmartSnippet(element, options, bindings, ModalBox) {
        if (ModalBox === void 0) { ModalBox = ExternalModulesShim_1.ModalBox; }
        var _this = _super.call(this, element, SmartSnippet.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.ModalBox = ModalBox;
        _this.lastRenderedResult = null;
        _this.options = ComponentOptions_1.ComponentOptions.initComponentOptions(element, SmartSnippet, options);
        _this.bind.onRootElement(Core_1.QueryEvents.deferredQuerySuccess, function (data) { return _this.handleQuerySuccess(data); });
        return _this;
    }
    Object.defineProperty(SmartSnippet.prototype, "loading", {
        get: function () {
            return this.shadowLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartSnippet.prototype, "style", {
        get: function () {
            var styles = Core_1.$$(this.element)
                .children()
                .filter(function (element) { return element instanceof HTMLScriptElement && element.type.toLowerCase() === 'text/css'; })
                .map(function (element) { return element.innerHTML; });
            return styles.length ? styles.join('\n') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartSnippet.prototype, "hasAnswer", {
        set: function (hasAnswer) {
            Core_1.$$(this.element).toggleClass(HAS_ANSWER_CLASSNAME, hasAnswer);
        },
        enumerable: true,
        configurable: true
    });
    SmartSnippet.prototype.createDom = function () {
        var _this = this;
        this.element.appendChild(this.buildAnswerContainer());
        this.feedbackBanner = new UserFeedbackBanner_1.UserFeedbackBanner(function (isUseful) { return (isUseful ? _this.sendLikeSmartSnippetAnalytics() : _this.sendDislikeSmartSnippetAnalytics()); }, function () { return _this.openExplanationModal(); });
        this.element.appendChild(this.feedbackBanner.build());
        this.explanationModal = new ExplanationModal_1.ExplanationModal({
            reasons: reasons.map(function (reason) {
                return ({
                    label: Strings_1.l(reason.localeKey),
                    id: reason.analytics.replace(/_/g, '-'),
                    onSelect: function () { return _this.sendExplanationAnalytics(reason.analytics, _this.explanationModal.details); },
                    hasDetails: reason.hasDetails
                });
            }),
            onClosed: function () { return _this.sendCloseFeedbackModalAnalytics(); },
            ownerElement: this.searchInterface.options.modalContainer,
            modalBoxModule: this.ModalBox
        });
    };
    SmartSnippet.prototype.buildAnswerContainer = function () {
        return Core_1.$$('div', {
            className: ANSWER_CONTAINER_CLASSNAME
        }, this.buildQuestion(), this.buildShadow(), this.buildHeightLimiter(), this.buildSourceContainer()).el;
    };
    SmartSnippet.prototype.buildQuestion = function () {
        return (this.questionContainer = Core_1.$$('div', { className: QUESTION_CLASSNAME }).el);
    };
    SmartSnippet.prototype.buildShadow = function () {
        var _this = this;
        this.shadowContainer = Core_1.$$('div', { className: SHADOW_CLASSNAME }).el;
        this.snippetContainer = Core_1.$$('section', { className: CONTENT_CLASSNAME }).el;
        this.shadowLoading = AttachShadowPolyfill_1.attachShadow(this.shadowContainer, {
            mode: 'open',
            title: Strings_1.l('AnswerSnippet'),
            onSizeChanged: function () { return _this.handleAnswerSizeChanged(); },
            useIFrame: this.options.useIFrame
        }).then(function (shadow) {
            shadow.appendChild(_this.snippetContainer);
            var style = _this.buildStyle();
            shadow.appendChild(style);
            return shadow;
        });
        return this.shadowContainer;
    };
    SmartSnippet.prototype.buildHeightLimiter = function () {
        var _this = this;
        return (this.heightLimiter = new HeightLimiter_1.HeightLimiter(this.shadowContainer, this.shadowContainer.childNodes.item(0), this.options.maximumSnippetHeight, function (isExpanded) { return (isExpanded ? _this.sendExpandSmartSnippetAnalytics() : _this.sendCollapseSmartSnippetAnalytics()); })).toggleButton;
    };
    SmartSnippet.prototype.buildSourceContainer = function () {
        return (this.sourceContainer = Core_1.$$('div', { className: SOURCE_CLASSNAME }).el);
    };
    SmartSnippet.prototype.buildStyle = function () {
        var style = Utils_1.Utils.isNullOrUndefined(this.style) ? SmartSnippetCommon_1.getDefaultSnippetStyle(CONTENT_CLASSNAME) : this.style;
        var styleTag = document.createElement('style');
        styleTag.innerHTML = style;
        return styleTag;
    };
    SmartSnippet.prototype.handleAnswerSizeChanged = function () {
        this.heightLimiter.onContentHeightChanged();
    };
    /**
     * @warning This method only works for the demo. In practice, the source of the answer will not always be part of the results.
     */
    SmartSnippet.prototype.getCorrespondingResult = function (questionAnswer) {
        var lastResults = this.queryController.getLastResults().results;
        var childResults = underscore_1.flatten(underscore_1.map(lastResults, function (lastResult) { return lastResult.childResults; }));
        var attachments = underscore_1.flatten(underscore_1.map(lastResults, function (lastResult) { return lastResult.attachments; }));
        return underscore_1.find(underscore_1.compact(lastResults.concat(childResults, attachments)), function (result) { return result.raw[questionAnswer.documentId.contentIdKey] === questionAnswer.documentId.contentIdValue; });
    };
    SmartSnippet.prototype.handleQuerySuccess = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var questionAnswer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionAnswer = data.results.questionAnswer;
                        if (!this.containsQuestionAnswer(questionAnswer)) {
                            this.hasAnswer = false;
                            return [2 /*return*/];
                        }
                        this.hasAnswer = true;
                        this.searchUid = data.results.searchUid;
                        return [4 /*yield*/, this.render(questionAnswer)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SmartSnippet.prototype.containsQuestionAnswer = function (questionAnswer) {
        return questionAnswer && questionAnswer.question && questionAnswer.answerSnippet;
    };
    SmartSnippet.prototype.render = function (questionAnswer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ensureDom();
                this.feedbackBanner.reset();
                this.questionContainer.innerText = questionAnswer.question;
                this.renderSnippet(questionAnswer.answerSnippet);
                this.lastRenderedResult = this.getCorrespondingResult(questionAnswer);
                if (this.lastRenderedResult) {
                    this.renderSource();
                }
                else {
                    this.lastRenderedResult = null;
                }
                return [2 /*return*/];
            });
        });
    };
    SmartSnippet.prototype.renderSnippet = function (content) {
        this.snippetContainer.innerHTML = content;
    };
    SmartSnippet.prototype.renderSource = function () {
        var container = Core_1.$$(this.sourceContainer);
        container.empty();
        container.append(this.renderSourceUrl().el);
        container.append(this.renderSourceTitle().el);
    };
    SmartSnippet.prototype.renderSourceTitle = function () {
        var link = this.buildLink(SOURCE_TITLE_CLASSNAME);
        link.text(Utils_1.Utils.getFieldValue(this.lastRenderedResult, this.options.titleField));
        return link;
    };
    SmartSnippet.prototype.renderSourceUrl = function () {
        var link = this.buildLink(SOURCE_URL_CLASSNAME);
        link.text(link.el.href);
        return link;
    };
    SmartSnippet.prototype.buildLink = function (className) {
        var _this = this;
        var element = Core_1.$$('a', { className: 'CoveoResultLink' });
        element.addClass(className);
        new ResultLink_1.ResultLink(element.el, {
            hrefTemplate: this.options.hrefTemplate,
            logAnalytics: function (href) { return _this.sendClickSourceAnalytics(element.el, href); },
            alwaysOpenInNewWindow: this.options.alwaysOpenInNewWindow
        }, __assign({}, this.getBindings(), { resultElement: this.element }), this.lastRenderedResult);
        return element;
    };
    SmartSnippet.prototype.openExplanationModal = function () {
        this.sendOpenFeedbackModalAnalytics();
        this.explanationModal.open(this.feedbackBanner.explainWhy);
    };
    SmartSnippet.prototype.sendLikeSmartSnippetAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.likeSmartSnippet, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendDislikeSmartSnippetAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.dislikeSmartSnippet, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendExpandSmartSnippetAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.expandSmartSnippet, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendCollapseSmartSnippetAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.collapseSmartSnippet, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendOpenFeedbackModalAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.openSmartSnippetFeedbackModal, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendCloseFeedbackModalAnalytics = function () {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.closeSmartSnippetFeedbackModal, { searchQueryUid: this.searchUid }, this.element);
    };
    SmartSnippet.prototype.sendExplanationAnalytics = function (reason, details) {
        return this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.sendSmartSnippetReason, {
            searchQueryUid: this.searchUid,
            reason: reason,
            details: details
        }, this.element);
    };
    SmartSnippet.prototype.sendClickSourceAnalytics = function (element, href) {
        return this.usageAnalytics.logClickEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.openSmartSnippetSource, {
            searchQueryUid: this.searchUid,
            documentTitle: this.lastRenderedResult.title,
            author: Utils_1.Utils.getFieldValue(this.lastRenderedResult, 'author'),
            documentURL: href
        }, this.lastRenderedResult, element);
    };
    SmartSnippet.ID = 'SmartSnippet';
    SmartSnippet.doExport = function () {
        GlobalExports_1.exportGlobally({
            SmartSnippet: SmartSnippet
        });
    };
    /**
     * The options for the SmartSnippet
     * @componentOptions
     */
    SmartSnippet.options = {
        /**
         * The maximum height an answer can have in pixels.
         * Any part of an answer exceeding this height will be hidden by default and expendable via a "show more" button.
         * Default value is `250`.
         */
        maximumSnippetHeight: ComponentOptions_1.ComponentOptions.buildNumberOption({ defaultValue: 250, min: 0 }),
        /**
         * The field to display for the title.
         */
        titleField: ComponentOptions_1.ComponentOptions.buildFieldOption({ defaultValue: '@title' }),
        /**
         * Specifies a template literal from which to generate the title and URI's `href` attribute value (see
         * [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)).
         *
         * This option overrides the [`field`]{@link SmartSnippet.options.uriField} option value.
         *
         * The template literal can reference any number of fields from the parent result. It can also reference global
         * scope properties.
         *
         * **Examples:**
         *
         * - The following markup generates an `href` value such as `http://uri.com?id=itemTitle`:
         *
         * ```html
         * <a class='CoveoSmartSnippet' data-href-template='${clickUri}?id=${raw.title}'></a>
         * ```
         *
         * - The following markup generates an `href` value such as `localhost/fooBar`:
         *
         * ```html
         * <a class='CoveoSmartSnippet' data-href-template='${window.location.hostname}/{Foo.Bar}'></a>
         * ```
         *
         * Default value is `undefined`.
         */
        hrefTemplate: ComponentOptions_1.ComponentOptions.buildStringOption(),
        /**
         * Specifies whether the component should open its links in a new window instead of opening them in the current
         * context.
         *
         * Default value is `false`.
         */
        alwaysOpenInNewWindow: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specify if the SmartSnippet should be displayed inside an iframe or not.
         *
         * Use this option in specific cases where your environment has limitations around iframe usage.
         *
         * **Examples:**
         *
         * ```html
         * <div class='CoveoSmartSnippet' data-use-i-frame='true'></div>
         * ```
         *
         * Default value is `true`.
         */
        useIFrame: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: true })
    };
    return SmartSnippet;
}(Component_1.Component));
exports.SmartSnippet = SmartSnippet;
Core_1.Initialization.registerAutoCreateComponent(SmartSnippet);


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Defer_1 = __webpack_require__(31);
var underscore_1 = __webpack_require__(0);
var Dom_1 = __webpack_require__(1);
var FocusTrap = /** @class */ (function () {
    function FocusTrap(container, options) {
        if (options === void 0) { options = {
            focusableSelector: '[tabindex], button'
        }; }
        this.container = container;
        this.options = options;
        this.hiddenElements = [];
        this.enable();
    }
    Object.defineProperty(FocusTrap.prototype, "focusableElements", {
        get: function () {
            return underscore_1.chain(Dom_1.Dom.nodeListToArray(this.container.querySelectorAll(this.options.focusableSelector)))
                .filter(function (element) { return Dom_1.$$(element).isVisible(); })
                .sortBy(function (element) { return element.tabIndex; })
                .value();
        },
        enumerable: true,
        configurable: true
    });
    FocusTrap.prototype.disable = function () {
        document.removeEventListener('focusin', this.focusInEvent);
        document.removeEventListener('focusout', this.focusOutEvent);
        this.showHiddenElements();
        this.enabled = false;
    };
    FocusTrap.prototype.enable = function () {
        var _this = this;
        document.addEventListener('focusin', (this.focusInEvent = function (e) { return _this.onFocusIn(e); }));
        document.addEventListener('focusout', (this.focusOutEvent = function (e) { return _this.onFocusOut(e); }));
        this.hideAllExcept(this.container);
        this.enabled = true;
    };
    FocusTrap.prototype.showHiddenElements = function () {
        while (this.hiddenElements.length) {
            this.hiddenElements.pop().removeAttribute('aria-hidden');
        }
    };
    FocusTrap.prototype.hideElement = function (element) {
        if (element.getAttribute('aria-hidden')) {
            return;
        }
        this.hiddenElements.push(element);
        element.setAttribute('aria-hidden', "" + true);
    };
    FocusTrap.prototype.hideSiblings = function (allowedElement) {
        var _this = this;
        var parent = allowedElement.parentElement;
        if (parent) {
            underscore_1.without(Dom_1.$$(parent).children(), allowedElement).forEach(function (elementToHide) {
                _this.hideElement(elementToHide);
            });
        }
    };
    FocusTrap.prototype.hideAllExcept = function (allowedElement) {
        this.hideSiblings(allowedElement);
        var parent = allowedElement.parentElement;
        if (parent && parent !== document.body) {
            this.hideAllExcept(parent);
        }
    };
    FocusTrap.prototype.getFocusableSibling = function (element, previous) {
        if (previous === void 0) { previous = false; }
        var elements = this.focusableElements;
        var currentIndex = elements.indexOf(element);
        if (currentIndex === -1) {
            return null;
        }
        return elements[(currentIndex + (previous ? -1 : 1) + elements.length) % elements.length];
    };
    FocusTrap.prototype.focusSibling = function (element, previous) {
        if (previous === void 0) { previous = false; }
        var sibling = this.getFocusableSibling(element, previous);
        if (sibling) {
            sibling.focus();
        }
    };
    FocusTrap.prototype.focusFirstElement = function () {
        var elements = this.focusableElements;
        if (elements.length) {
            elements[0].focus();
        }
    };
    FocusTrap.prototype.elementIsBefore = function (oldElement, newElement) {
        if (!newElement) {
            return false;
        }
        return oldElement.compareDocumentPosition(newElement) === Node.DOCUMENT_POSITION_PRECEDING;
    };
    FocusTrap.prototype.onLosingFocus = function (oldElement, newElement) {
        var _this = this;
        Defer_1.Defer.defer(function () {
            if (!_this.enabled) {
                return;
            }
            _this.enabled = false;
            if (oldElement && _this.focusIsAllowed(oldElement)) {
                _this.focusSibling(oldElement, _this.elementIsBefore(oldElement, newElement));
            }
            else {
                _this.focusFirstElement();
            }
            _this.enabled = true;
        });
    };
    FocusTrap.prototype.focusIsAllowed = function (element) {
        return this.container.contains(element);
    };
    FocusTrap.prototype.elementIsInPage = function (element) {
        return element && element !== document.body.parentElement;
    };
    FocusTrap.prototype.onFocusIn = function (e) {
        if (!this.enabled) {
            return;
        }
        var oldElement = e.relatedTarget;
        var handledByFocusOut = this.elementIsInPage(oldElement);
        if (handledByFocusOut) {
            return;
        }
        var newElement = e.target;
        if (!this.elementIsInPage(newElement)) {
            return;
        }
        if (!this.focusIsAllowed(newElement)) {
            this.onLosingFocus(null, newElement);
        }
    };
    FocusTrap.prototype.onFocusOut = function (e) {
        if (!this.enabled) {
            return;
        }
        var newElement = e.relatedTarget;
        if (!this.elementIsInPage(newElement)) {
            return;
        }
        if (!newElement || !this.focusIsAllowed(newElement)) {
            this.onLosingFocus(e.target, newElement);
        }
    };
    return FocusTrap;
}());
exports.FocusTrap = FocusTrap;


/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
__webpack_require__(585);
function attachShadow(element, options) {
    return __awaiter(this, void 0, void 0, function () {
        var elementOptions, autoUpdateContainer, contentBody, onLoad, shadowRootContainer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elementOptions = { className: 'coveo-shadow-iframe', scrolling: 'no', title: options.title };
                    if (!options.useIFrame) return [3 /*break*/, 2];
                    autoUpdateContainer = Dom_1.$$('iframe', elementOptions).el;
                    onLoad = new Promise(function (resolve) { return autoUpdateContainer.addEventListener('load', function () { return resolve(); }); });
                    element.appendChild(autoUpdateContainer);
                    return [4 /*yield*/, onLoad];
                case 1:
                    _a.sent();
                    contentBody = autoUpdateContainer.contentDocument.body;
                    return [3 /*break*/, 3];
                case 2:
                    autoUpdateContainer = Dom_1.$$('div', elementOptions).el;
                    contentBody = autoUpdateContainer;
                    element.appendChild(autoUpdateContainer);
                    _a.label = 3;
                case 3:
                    contentBody.style.margin = '0';
                    shadowRootContainer = Dom_1.$$('div', { style: 'overflow: auto;' }).el;
                    contentBody.appendChild(shadowRootContainer);
                    autoUpdateHeight(autoUpdateContainer, shadowRootContainer, options.onSizeChanged);
                    if (options.mode === 'open') {
                        Object.defineProperty(element, 'shadowRoot', { get: function () { return shadowRootContainer; } });
                    }
                    return [2 /*return*/, shadowRootContainer];
            }
        });
    });
}
exports.attachShadow = attachShadow;
function autoUpdateHeight(elementToResize, content, onUpdate) {
    var lastWidth = content.clientWidth;
    var lastHeight = content.clientHeight;
    var heightObserver = new MutationObserver(function () {
        if (lastWidth === content.clientWidth && lastHeight === content.clientHeight) {
            return;
        }
        lastWidth = content.clientWidth;
        lastHeight = content.clientHeight;
        elementToResize.style.width = content.clientWidth + "px";
        elementToResize.style.height = content.clientHeight + "px";
        if (onUpdate) {
            onUpdate();
        }
    });
    heightObserver.observe(content, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    });
}


/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultSnippetStyle = function (contentClassName) { return "\n  body {\n    font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif, sans-serif;\n  }\n\n  ." + contentClassName + " > :first-child {\n    margin-top: 0;\n  }\n\n  ." + contentClassName + " > :last-child {\n    margin-bottom: 0;\n  }\n"; };


/***/ }),

/***/ 532:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 585:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(7);
var ComponentOptions_1 = __webpack_require__(8);
var ComponentOptionsModel_1 = __webpack_require__(28);
var AnalyticsActionListMeta_1 = __webpack_require__(10);
var ResultListEvents_1 = __webpack_require__(29);
var HighlightUtils_1 = __webpack_require__(67);
var DeviceUtils_1 = __webpack_require__(24);
var OSUtils_1 = __webpack_require__(178);
var Initialization_1 = __webpack_require__(2);
var QueryUtils_1 = __webpack_require__(21);
var Assert_1 = __webpack_require__(5);
var Utils_1 = __webpack_require__(4);
var Defer_1 = __webpack_require__(31);
var Dom_1 = __webpack_require__(1);
var StreamHighlightUtils_1 = __webpack_require__(118);
var StringUtils_1 = __webpack_require__(22);
var underscore_1 = __webpack_require__(0);
var GlobalExports_1 = __webpack_require__(3);
__webpack_require__(532);
var AccessibleButton_1 = __webpack_require__(15);
/**
 * The `ResultLink` component automatically transform a search result title into a clickable link pointing to the
 * original item.
 *
 * This component is a result template component (see [Result Templates](https://docs.coveo.com/en/413/)).
 */
var ResultLink = /** @class */ (function (_super) {
    __extends(ResultLink, _super);
    /**
     * Creates a new `ResultLink` component.
     * @param element The HTMLElement on which to instantiate the component.
     * @param options The options for the `ResultLink` component.
     * @param bindings The bindings that the component requires to function normally. If not set, these will be
     * automatically resolved (with a slower execution time).
     * @param result The result to associate the component with.
     * @param os
     */
    function ResultLink(element, options, bindings, result, os) {
        var _this = _super.call(this, element, ResultLink.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.result = result;
        _this.os = os;
        _this.logAnalytics = underscore_1.debounce(function () {
            _this.queryController.saveLastQuery();
            var documentURL = Dom_1.$$(_this.element).getAttribute('href');
            if (documentURL == undefined || documentURL == '') {
                documentURL = _this.escapedClickUri;
            }
            if (_this.options.logAnalytics) {
                _this.options.logAnalytics(documentURL);
            }
            else {
                _this.logDocumentOpen(documentURL);
            }
            Defer_1.Defer.flush();
        }, 1500, true);
        var globalOptions = _this.searchInterface.options.originalOptionsObject[ResultLink.ID] || {};
        var initialOptions = ComponentOptions_1.ComponentOptions.initComponentOptions(element, ResultLink, __assign({}, globalOptions, options));
        var resultLinkOptions = _this.componentOptionsModel.get(ComponentOptionsModel_1.ComponentOptionsModel.attributesEnum.resultLink);
        _this.options = underscore_1.extend({}, initialOptions, resultLinkOptions);
        _this.result = result || _this.resolveResult();
        if (_this.options.openQuickview == null) {
            _this.options.openQuickview = result.raw['connectortype'] == 'ExchangeCrawler' && DeviceUtils_1.DeviceUtils.isMobileDevice();
        }
        if (!_this.element.hasAttribute('tabindex')) {
            _this.element.setAttribute('tabindex', '0');
        }
        Assert_1.Assert.exists(_this.componentOptionsModel);
        Assert_1.Assert.exists(_this.result);
        if (!_this.quickviewShouldBeOpened()) {
            // Bind on multiple "click" or "mouse" events.
            // Create a function that will be executed only once, so as not to log multiple events
            // Once a result link has been opened, and that we log at least one analytics event,
            // it should not matter if the end user open the same link multiple times with different methods.
            // It's still only one "click" event as far as UA is concerned.
            // Also need to handle "longpress" on mobile (the contextual menu), which we assume to be 1 s long.
            var executeOnlyOnce_1 = underscore_1.once(function () { return _this.logAnalytics(); });
            Dom_1.$$(element).on(['contextmenu', 'click', 'mousedown', 'mouseup'], executeOnlyOnce_1);
            var longPressTimer_1;
            Dom_1.$$(element).on('touchstart', function () {
                longPressTimer_1 = window.setTimeout(executeOnlyOnce_1, 1000);
            });
            Dom_1.$$(element).on('touchend', function () {
                if (longPressTimer_1) {
                    clearTimeout(longPressTimer_1);
                }
            });
        }
        _this.renderUri(element, result);
        _this.bindEventToOpen();
        return _this;
    }
    ResultLink.prototype.renderUri = function (element, result) {
        if (/^\s*$/.test(this.element.innerHTML)) {
            var title = this.getDisplayedTitle();
            this.element.innerHTML = title;
            var titleAsText = this.getDisplayedTitleAsText();
            if (!this.element.hasAttribute('aria-label')) {
                this.element.setAttribute('aria-label', titleAsText);
            }
            if (!this.element.title) {
                this.element.title = titleAsText;
            }
        }
    };
    /**
     * Opens the result in the same window, no matter how the actual component is configured for the end user.
     * @param logAnalytics Specifies whether the method should log an analytics event.
     */
    ResultLink.prototype.openLink = function (logAnalytics) {
        if (logAnalytics === void 0) { logAnalytics = true; }
        if (logAnalytics) {
            this.logAnalytics();
        }
        window.location.href = this.getResultUri();
    };
    /**
     * Opens the result in a new window, no matter how the actual component is configured for the end user.
     * @param logAnalytics Specifies whether the method should log an analytics event.
     */
    ResultLink.prototype.openLinkInNewWindow = function (logAnalytics) {
        if (logAnalytics === void 0) { logAnalytics = true; }
        if (logAnalytics) {
            this.logAnalytics();
        }
        window.open(this.getResultUri(), '_blank');
    };
    /**
     * Tries to open the result in Microsoft Outlook if the result has an `outlookformacuri` or `outlookuri` field.
     *
     * Normally, this implies the result should be a link to an email.
     *
     * If the needed fields are not present, this method does nothing.
     * @param logAnalytics Specifies whether the method should log an analytics event.
     */
    ResultLink.prototype.openLinkInOutlook = function (logAnalytics) {
        if (logAnalytics === void 0) { logAnalytics = true; }
        if (this.hasOutlookField()) {
            if (logAnalytics) {
                this.logAnalytics();
            }
            this.openLink();
        }
    };
    /**
     * Opens the link in the same manner the end user would.
     *
     * This essentially simulates a click on the result link.
     *
     * @param logAnalytics Specifies whether the method should log an analytics event.
     */
    ResultLink.prototype.openLinkAsConfigured = function (logAnalytics) {
        if (logAnalytics === void 0) { logAnalytics = true; }
        if (this.toExecuteOnOpen) {
            if (logAnalytics) {
                this.logAnalytics();
            }
            this.toExecuteOnOpen();
        }
    };
    ResultLink.prototype.bindEventToOpen = function () {
        return (this.bindOnClickIfNotUndefined() ||
            this.bindOpenQuickviewIfNotUndefined() ||
            this.setHrefIfNotAlready() ||
            this.openLinkThatIsNotAnAnchor());
    };
    ResultLink.prototype.getDisplayedTitle = function () {
        if (!this.options.titleTemplate) {
            return this.result.title
                ? HighlightUtils_1.HighlightUtils.highlightString(this.result.title, this.result.titleHighlights, null, 'coveo-highlight')
                : this.escapedClickUri;
        }
        else {
            var newTitle = StringUtils_1.StringUtils.buildStringTemplateFromResult(this.options.titleTemplate, this.result);
            return newTitle
                ? StreamHighlightUtils_1.StreamHighlightUtils.highlightStreamText(newTitle, this.result.termsToHighlight, this.result.phrasesToHighlight)
                : this.escapedClickUri;
        }
    };
    ResultLink.prototype.getDisplayedTitleAsText = function () {
        var container = Dom_1.$$('div');
        container.setHtml(this.getDisplayedTitle());
        return container.text();
    };
    Object.defineProperty(ResultLink.prototype, "escapedClickUri", {
        get: function () {
            return underscore_1.escape(this.result.clickUri);
        },
        enumerable: true,
        configurable: true
    });
    ResultLink.prototype.bindOnClickIfNotUndefined = function () {
        var _this = this;
        if (this.options.onClick != undefined) {
            this.toExecuteOnOpen = function (e) {
                _this.options.onClick.call(_this, e, _this.result);
            };
            new AccessibleButton_1.AccessibleButton()
                .withElement(this.element)
                .withLabel(this.result.title)
                .withSelectAction(function (e) { return _this.toExecuteOnOpen(e); })
                .build();
            return true;
        }
        else {
            return false;
        }
    };
    ResultLink.prototype.bindOpenQuickviewIfNotUndefined = function () {
        var _this = this;
        if (this.quickviewShouldBeOpened()) {
            this.toExecuteOnOpen = function () {
                Dom_1.$$(_this.bindings.resultElement).trigger(ResultListEvents_1.ResultListEvents.openQuickview);
            };
            Dom_1.$$(this.element).on('click', function (e) {
                e.preventDefault();
                _this.toExecuteOnOpen();
            });
            return true;
        }
        else {
            return false;
        }
    };
    ResultLink.prototype.openLinkThatIsNotAnAnchor = function () {
        var _this = this;
        if (!this.elementIsAnAnchor()) {
            this.toExecuteOnOpen = function () {
                if (_this.options.alwaysOpenInNewWindow) {
                    if (_this.options.openInOutlook) {
                        _this.openLinkInOutlook();
                    }
                    else {
                        _this.openLinkInNewWindow();
                    }
                }
                else {
                    _this.openLink();
                }
            };
            Dom_1.$$(this.element).on('click', function () {
                _this.toExecuteOnOpen();
            });
            return true;
        }
        return false;
    };
    ResultLink.prototype.setHrefIfNotAlready = function () {
        // Do not erase any value put in href by the template, etc. Allows
        // using custom click urls while still keeping analytics recording
        // and other behavior brought by the component.
        if (this.elementIsAnAnchor() && !Utils_1.Utils.isNonEmptyString(Dom_1.$$(this.element).getAttribute('href'))) {
            Dom_1.$$(this.element).setAttribute('href', this.getResultUri());
            if (this.options.alwaysOpenInNewWindow && !(this.options.openInOutlook && this.hasOutlookField())) {
                Dom_1.$$(this.element).setAttribute('target', '_blank');
            }
            return true;
        }
        else {
            return false;
        }
    };
    ResultLink.prototype.logDocumentOpen = function (href) {
        this.usageAnalytics.logClickEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.documentOpen, {
            documentURL: href,
            documentTitle: this.result.title,
            author: Utils_1.Utils.getFieldValue(this.result, 'author')
        }, this.result, this.root);
    };
    ResultLink.prototype.filterProtocol = function (uri) {
        var isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
        var isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);
        return isAbsolute || isRelative ? uri : '';
    };
    ResultLink.prototype.getResultUri = function () {
        if (this.options.hrefTemplate) {
            var uri = StringUtils_1.StringUtils.buildStringTemplateFromResult(this.options.hrefTemplate, this.result);
            return this.filterProtocol(uri);
        }
        if (this.options.field == undefined && this.options.openInOutlook) {
            this.setField();
        }
        if (this.options.field != undefined) {
            return this.filterProtocol(Utils_1.Utils.getFieldValue(this.result, this.options.field));
        }
        return this.filterProtocol(this.result.clickUri);
    };
    ResultLink.prototype.elementIsAnAnchor = function () {
        return this.element.tagName == 'A';
    };
    ResultLink.prototype.setField = function () {
        var os = Utils_1.Utils.exists(this.os) ? this.os : OSUtils_1.OSUtils.get();
        if (os == OSUtils_1.OS_NAME.MACOSX && this.hasOutlookField()) {
            this.options.field = '@outlookformacuri';
        }
        else if (os == OSUtils_1.OS_NAME.WINDOWS && this.hasOutlookField()) {
            this.options.field = '@outlookuri';
        }
    };
    ResultLink.prototype.hasOutlookField = function () {
        var os = Utils_1.Utils.exists(this.os) ? this.os : OSUtils_1.OSUtils.get();
        if (os == OSUtils_1.OS_NAME.MACOSX && this.result.raw['outlookformacuri'] != undefined) {
            return true;
        }
        else if (os == OSUtils_1.OS_NAME.WINDOWS && this.result.raw['outlookuri'] != undefined) {
            return true;
        }
        return false;
    };
    ResultLink.prototype.isUriThatMustBeOpenedInQuickview = function () {
        return this.escapedClickUri.toLowerCase().indexOf('ldap://') == 0;
    };
    ResultLink.prototype.quickviewShouldBeOpened = function () {
        return (this.options.openQuickview || this.isUriThatMustBeOpenedInQuickview()) && QueryUtils_1.QueryUtils.hasHTMLVersion(this.result);
    };
    ResultLink.ID = 'ResultLink';
    ResultLink.doExport = function () {
        GlobalExports_1.exportGlobally({
            ResultLink: ResultLink
        });
    };
    /**
     * The options for the ResultLink
     * @componentOptions
     */
    ResultLink.options = {
        /**
         * Specifies the field to use to output the component `href` attribute value.
         *
         * **Tip:**
         * > Instead of specifying a value for the `field` option, you can directly add an `href` attribute to the
         * > `ResultLink` HTML element. Then, you can use a custom script to generate the `href` value.
         *
         * **Examples:**
         * - With the following markup, the `ResultLink` outputs its `href` value using the `@uri` field (rather than the
         * default field):
         *
         * ```html
         * <a class="CoveoResultLink" data-field="@uri"></a>
         * ```
         *
         * - In the following result template, the custom `getMyKBUri()` function provides the `href` value:
         *
         * ```html
         * <script id="KnowledgeArticle" type="text/underscore" class="result-template">
         *   <div class='CoveoIcon>'></div>
         *   <a class="CoveoResultLink" href="<%= getMyKBUri(raw) %>"></a>
         *   <div class="CoveoExcerpt"></div>
         * </script>
         * ```
         *
         * See also [`hrefTemplate`]{@link ResultLink.options.hrefTemplate}, which can override this option.
         *
         * By default, the component uses the `@clickUri` field of the item to output the value of its `href` attribute.
         */
        field: ComponentOptions_1.ComponentOptions.buildFieldOption(),
        /**
         * Specifies whether the component should try to open its link in Microsoft Outlook.
         *
         * Setting this option to `true` is normally useful for `ResultLink` instances related to Microsoft Exchange emails.
         *
         * If this option is `true`, clicking the `ResultLink` calls the
         * [`openLinkInOutlook`]{@link ResultLink.openLinkInOutlook} method instead of the
         * [`openLink`]{@link ResultLink.openLink} method.
         *
         * Default value is `false`.
         */
        openInOutlook: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies whether the component should open its link in the [`Quickview`]{@link Quickview} component rather than
         * loading through the original URL.
         *
         * Default value is `false`.
         */
        openQuickview: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies whether the component should open its link in a new window instead of opening it in the current
         * context.
         *
         * If this option is `true`, clicking the `ResultLink` calls the
         * [`openLinkInNewWindow`]{@link ResultLink.openLinkInNewWindow} method instead of the
         * [`openLink`]{@link ResultLink.openLink} method.
         *
         * **Note:**
         * > If a search page contains a [`ResultPreferences`]{@link ResultsPreferences} component whose
         * > [`enableOpenInNewWindow`]{@link ResultsPreferences.options.enableOpenInNewWindow} option is `true`, and the end
         * > user checks the <b>Always open results in new window</b> box, `ResultLink` components in this page will always
         * > open their links in a new window when the end user clicks them, no matter what the value of their
         * > `alwaysOpenInNewWindow` option is.
         *
         * Default value is `false`.
         */
        alwaysOpenInNewWindow: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * Specifies a template literal from which to generate the `ResultLink` `href` attribute value (see
         * [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)).
         *
         * This option overrides the [`field`]{@link ResultLink.options.field} option value.
         *
         * The template literal can reference any number of fields from the parent result. It can also reference global
         * scope properties.
         *
         * **Examples:**
         *
         * - The following markup generates an `href` value such as `http://uri.com?id=itemTitle`:
         *
         * ```html
         * <a class='CoveoResultLink' data-href-template='${clickUri}?id=${raw.title}'></a>
         * ```
         *
         * - The following markup generates an `href` value such as `localhost/fooBar`:
         *
         * ```html
         * <a class='CoveoResultLink' data-href-template='${window.location.hostname}/{Foo.Bar}'></a>
         * ```
         *
         * Default value is `undefined`.
         */
        hrefTemplate: ComponentOptions_1.ComponentOptions.buildStringOption(),
        /**
         * Specifies a template literal from which to generate the `ResultLink` display title (see
         * [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)).
         *
         * This option overrides the default `ResultLink` display title behavior.
         *
         * The template literal can reference any number of fields from the parent result. However, if the template literal
         * references a key whose value is undefined in the parent result fields, the `ResultLink` title displays the
         * name of this key instead.
         *
         * This option is ignored if the `ResultLink` innerHTML contains any value.
         *
         * **Examples:**
         *
         * - The following markup generates a `ResultLink` display title such as `Case number: 123456` if both the
         * `raw.objecttype` and `raw.objectnumber` keys are defined in the parent result fields:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${raw.objecttype} number: ${raw.objectnumber}"></a>
         * ```
         *
         * - The following markup generates `${myField}` as a `ResultLink` display title if the `myField` key is undefined
         * in the parent result fields:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${myField}"></a>
         * ```
         *
         * - The following markup generates `Foobar` as a `ResultLink` display title, because the `ResultLink` innterHTML is
         * not empty:
         *
         * ```html
         * <a class="CoveoResultLink" data-title-template="${will} ${be} ${ignored}">Foobar</a>
         * ```
         *
         * Default value is `undefined`.
         *
         * @availablesince [January 2017 Release (v1.1865.9)](https://docs.coveo.com/en/396/#january-2017-release-v118659)
         */
        titleTemplate: ComponentOptions_1.ComponentOptions.buildStringOption(),
        /**
         * Specifies an event handler function to execute when the user clicks the `ResultLink` component.
         *
         * The handler function takes a JavaScript [`Event`](https://developer.mozilla.org/en/docs/Web/API/Event) object and
         * an [`IQueryResult`]{@link IQueryResult} as its parameters.
         *
         * Overriding the default behavior of the `onClick` event can allow you to execute specific code instead.
         *
         * **Note:**
         * > You cannot set this option directly in the component markup as an HTML attribute. You must either set it in the
         * > [`init`]{@link init} call of your search interface (see
         * > [Passing Component Options in the init Call](https://docs.coveo.com/en/346/#passing-component-options-in-the-init-call)),
         * > or before the `init` call, using the `options` top-level function (see
         * > [Passing Component Options Before the init Call](https://docs.coveo.com/en/346/#passing-component-options-before-the-init-call)).
         *
         * **Example:**
         * ```javascript
         * // You can set the option in the 'init' call:
         * Coveo.init(document.querySelector("#search"), {
         *   ResultLink : {
         *     onClick : function(e, result) {
         *       e.preventDefault();
         *       // Custom code to execute with the item URI and title.
         *       openUriInASpecialTab(result.clickUri, result.title);
         *     }
         *   }
         * });
         *
         * // Or before the 'init' call, using the 'options' top-level function:
         * // Coveo.options(document.querySelector('#search'), {
         * //   ResultLink : {
         * //     onClick : function(e, result) {
         * //       e.preventDefault();
         * //       // Custom code to execute with the item URI and title.
         * //       openUriInASpecialTab(result.clickUri, result.title);
         * //     }
         * //   }
         * // });
         * ```
         */
        onClick: ComponentOptions_1.ComponentOptions.buildCustomOption(function () {
            return null;
        }),
        /**
         * Specify this option to log additional analytics when this result link is pressed.
         *
         * **Example:**
         * ```javascript
         * const resultLink = new Coveo.ResultLink(
         *   linkElement,
         *   {
         *     logAnalytics: (href) => Coveo.logCustomEvent(
         *         Coveo.analyticsActionCauseList.openSmartSnippetSource,
         *         {
         *           searchQueryUid: searchInterface.queryController.lastSearchUid,
         *           documentTitle: result.title,
         *           author: Utils.getFieldValue(result, 'author'),
         *           documentURL: href
         *         },
         *         element
         *       )
         *   },
         *   searchInterface.getBindings(),
         *   result
         * )
         * ```
         */
        logAnalytics: ComponentOptions_1.ComponentOptions.buildCustomOption(function () { return null; })
    };
    return ResultLink;
}(Component_1.Component));
exports.ResultLink = ResultLink;
Initialization_1.Initialization.registerAutoCreateComponent(ResultLink);


/***/ }),

/***/ 701:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var Strings_1 = __webpack_require__(6);
var SVGIcons_1 = __webpack_require__(12);
var underscore_1 = __webpack_require__(0);
var ROOT_CLASSNAME = 'coveo-user-feedback-banner';
var CONTAINER_CLASSNAME = ROOT_CLASSNAME + "-container";
var LABEL_CLASSNAME = ROOT_CLASSNAME + "-label";
var BUTTONS_CONTAINER_CLASSNAME = ROOT_CLASSNAME + "-buttons";
var YES_BUTTON_CLASSNAME = ROOT_CLASSNAME + "-yes-button";
var NO_BUTTON_CLASSNAME = ROOT_CLASSNAME + "-no-button";
var BUTTON_ACTIVE_CLASSNAME = ROOT_CLASSNAME + "-button-active";
var THANK_YOU_BANNER_CLASSNAME = ROOT_CLASSNAME + "-thanks";
var THANK_YOU_BANNER_ACTIVE_CLASSNAME = THANK_YOU_BANNER_CLASSNAME + "-active";
var ICON_CLASSNAME = THANK_YOU_BANNER_CLASSNAME + "-icon";
var EXPLAIN_WHY_CLASSNAME = ROOT_CLASSNAME + "-explain-why";
var EXPLAIN_WHY_ACTIVE_CLASSNAME = EXPLAIN_WHY_CLASSNAME + "-active";
var UsefulState;
(function (UsefulState) {
    UsefulState[UsefulState["Unknown"] = 0] = "Unknown";
    UsefulState[UsefulState["Yes"] = 1] = "Yes";
    UsefulState[UsefulState["No"] = 2] = "No";
})(UsefulState || (UsefulState = {}));
exports.UserFeedbackBannerClassNames = {
    ROOT_CLASSNAME: ROOT_CLASSNAME,
    CONTAINER_CLASSNAME: CONTAINER_CLASSNAME,
    LABEL_CLASSNAME: LABEL_CLASSNAME,
    BUTTONS_CONTAINER_CLASSNAME: BUTTONS_CONTAINER_CLASSNAME,
    YES_BUTTON_CLASSNAME: YES_BUTTON_CLASSNAME,
    NO_BUTTON_CLASSNAME: NO_BUTTON_CLASSNAME,
    BUTTON_ACTIVE_CLASSNAME: BUTTON_ACTIVE_CLASSNAME,
    THANK_YOU_BANNER_CLASSNAME: THANK_YOU_BANNER_CLASSNAME,
    THANK_YOU_BANNER_ACTIVE_CLASSNAME: THANK_YOU_BANNER_ACTIVE_CLASSNAME,
    ICON_CLASSNAME: ICON_CLASSNAME,
    EXPLAIN_WHY_CLASSNAME: EXPLAIN_WHY_CLASSNAME,
    EXPLAIN_WHY_ACTIVE_CLASSNAME: EXPLAIN_WHY_ACTIVE_CLASSNAME
};
var UserFeedbackBanner = /** @class */ (function () {
    function UserFeedbackBanner(sendUsefulnessAnalytics, onExplainWhyPressed) {
        this.sendUsefulnessAnalytics = sendUsefulnessAnalytics;
        this.onExplainWhyPressed = onExplainWhyPressed;
        this.isUseful = UsefulState.Unknown;
        this.labelId = underscore_1.uniqueId(LABEL_CLASSNAME);
    }
    UserFeedbackBanner.prototype.build = function () {
        return Dom_1.$$('div', {
            className: ROOT_CLASSNAME,
            ariaLive: 'polite'
        }, this.buildContainer(), this.buildThankYouBanner()).el;
    };
    UserFeedbackBanner.prototype.reset = function () {
        this.isUseful = UsefulState.Unknown;
        Dom_1.$$(this.yesButton).removeClass(BUTTON_ACTIVE_CLASSNAME);
        Dom_1.$$(this.yesButton).setAttribute('aria-pressed', 'false');
        Dom_1.$$(this.noButton).removeClass(BUTTON_ACTIVE_CLASSNAME);
        Dom_1.$$(this.noButton).setAttribute('aria-pressed', 'false');
        Dom_1.$$(this.thankYouBanner).removeClass(THANK_YOU_BANNER_ACTIVE_CLASSNAME);
        Dom_1.$$(this.explainWhy).removeClass(EXPLAIN_WHY_ACTIVE_CLASSNAME);
    };
    UserFeedbackBanner.prototype.buildContainer = function () {
        return Dom_1.$$('div', {
            className: CONTAINER_CLASSNAME,
            ariaLabelledby: this.labelId
        }, this.buildLabel(), this.buildButtons()).el;
    };
    UserFeedbackBanner.prototype.buildLabel = function () {
        return Dom_1.$$('span', { className: LABEL_CLASSNAME, id: this.labelId }, Strings_1.l('UsefulnessFeedbackRequest')).el;
    };
    UserFeedbackBanner.prototype.buildThankYouBanner = function () {
        var _this = this;
        this.thankYouBanner = Dom_1.$$('div', { className: THANK_YOU_BANNER_CLASSNAME }).el;
        var text = Dom_1.$$('span', {}, Strings_1.l('UsefulnessFeedbackThankYou')).el;
        this.thankYouBanner.appendChild(text);
        this.explainWhy = this.buildButton({
            text: Strings_1.l('UsefulnessFeedbackExplainWhy'),
            className: EXPLAIN_WHY_CLASSNAME,
            action: function () { return _this.requestExplaination(); }
        });
        this.thankYouBanner.appendChild(this.explainWhy);
        return this.thankYouBanner;
    };
    UserFeedbackBanner.prototype.buildButtons = function () {
        var _this = this;
        var buttonsContainer = Dom_1.$$('div', { className: BUTTONS_CONTAINER_CLASSNAME }).el;
        this.yesButton = this.buildButton({
            text: Strings_1.l('Yes'),
            className: YES_BUTTON_CLASSNAME,
            action: function () { return _this.showThankYouBanner(true); },
            icon: {
                className: ICON_CLASSNAME,
                content: SVGIcons_1.SVGIcons.icons.checkYes
            },
            attributes: {
                ariaPressed: false,
                ariaDescribedby: this.labelId
            }
        });
        this.yesButton.setAttribute('aria-pressed', 'false');
        buttonsContainer.appendChild(this.yesButton);
        this.noButton = this.buildButton({
            text: Strings_1.l('No'),
            className: NO_BUTTON_CLASSNAME,
            action: function () { return _this.showThankYouBanner(false); },
            icon: {
                className: ICON_CLASSNAME,
                content: SVGIcons_1.SVGIcons.icons.clearSmall
            },
            attributes: {
                ariaPressed: false,
                ariaDescribedby: this.labelId
            }
        });
        buttonsContainer.appendChild(this.noButton);
        return buttonsContainer;
    };
    UserFeedbackBanner.prototype.buildButton = function (options) {
        var button = Dom_1.$$('button', __assign({}, (options.attributes || {}), { className: options.className, type: 'button' })).el;
        if (options.icon) {
            var icon = Dom_1.$$('span', { className: options.icon.className }, options.icon.content).el;
            button.appendChild(icon);
            var text = Dom_1.$$('span', {}, options.text).el;
            button.appendChild(text);
        }
        else {
            button.innerText = options.text;
        }
        button.addEventListener('click', function () { return options.action(); });
        return button;
    };
    UserFeedbackBanner.prototype.showThankYouBanner = function (isUseful) {
        if (this.isUseful !== UsefulState.Unknown && isUseful === (this.isUseful === UsefulState.Yes)) {
            return;
        }
        this.isUseful = isUseful ? UsefulState.Yes : UsefulState.No;
        Dom_1.$$(this.yesButton).toggleClass(BUTTON_ACTIVE_CLASSNAME, isUseful);
        Dom_1.$$(this.yesButton).setAttribute('aria-pressed', "" + isUseful);
        Dom_1.$$(this.noButton).toggleClass(BUTTON_ACTIVE_CLASSNAME, !isUseful);
        Dom_1.$$(this.noButton).setAttribute('aria-pressed', "" + !isUseful);
        Dom_1.$$(this.thankYouBanner).addClass(THANK_YOU_BANNER_ACTIVE_CLASSNAME);
        Dom_1.$$(this.explainWhy).toggleClass(EXPLAIN_WHY_ACTIVE_CLASSNAME, !isUseful);
        this.sendUsefulnessAnalytics(isUseful);
    };
    UserFeedbackBanner.prototype.requestExplaination = function () {
        this.onExplainWhyPressed();
    };
    return UserFeedbackBanner;
}());
exports.UserFeedbackBanner = UserFeedbackBanner;


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var SVGIcons_1 = __webpack_require__(12);
var Strings_1 = __webpack_require__(6);
var BASE_CLASSNAME = 'coveo-height-limiter';
var CONTAINER_ACTIVE_CLASSNAME = BASE_CLASSNAME + "-container-active";
var CONTAINER_EXPANDED_CLASSNAME = BASE_CLASSNAME + "-container-expanded";
var BUTTON_CLASSNAME = BASE_CLASSNAME + "-button";
var BUTTON_LABEL_CLASSNAME = BUTTON_CLASSNAME + "-label";
var BUTTON_ICON_CLASSNAME = BUTTON_CLASSNAME + "-icon";
var BUTTON_ACTIVE_CLASSNAME = BUTTON_CLASSNAME + "-active";
exports.HeightLimiterClassNames = {
    CONTAINER_ACTIVE_CLASSNAME: CONTAINER_ACTIVE_CLASSNAME,
    CONTAINER_EXPANDED_CLASSNAME: CONTAINER_EXPANDED_CLASSNAME,
    BUTTON_CLASSNAME: BUTTON_CLASSNAME,
    BUTTON_LABEL_CLASSNAME: BUTTON_LABEL_CLASSNAME,
    BUTTON_ICON_CLASSNAME: BUTTON_ICON_CLASSNAME,
    BUTTON_ACTIVE_CLASSNAME: BUTTON_ACTIVE_CLASSNAME
};
var HeightLimiter = /** @class */ (function () {
    function HeightLimiter(containerElement, contentElement, heightLimit, onToggle) {
        this.containerElement = containerElement;
        this.contentElement = contentElement;
        this.heightLimit = heightLimit;
        this.onToggle = onToggle;
        this.isExpanded = false;
        this.buildButton();
        this.updateActiveAppearance();
    }
    Object.defineProperty(HeightLimiter.prototype, "toggleButton", {
        get: function () {
            return this.button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightLimiter.prototype, "height", {
        set: function (height) {
            this.containerElement.style.height = height + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightLimiter.prototype, "contentHeight", {
        get: function () {
            return this.contentElement.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    HeightLimiter.prototype.onContentHeightChanged = function () {
        this.updateActiveAppearance();
    };
    HeightLimiter.prototype.buildButton = function () {
        var _this = this;
        this.button = Dom_1.$$('button', { className: BUTTON_CLASSNAME, type: 'button', ariaLabel: Strings_1.l('ShowMore'), ariaPressed: 'false', ariaHidden: 'true' }, (this.buttonLabel = Dom_1.$$('span', { className: BUTTON_LABEL_CLASSNAME }).el), (this.buttonIcon = Dom_1.$$('span', { className: BUTTON_ICON_CLASSNAME }).el)).el;
        this.button.addEventListener('click', function () { return _this.toggle(); });
        this.updateButton();
        return this.button;
    };
    HeightLimiter.prototype.updateActiveAppearance = function () {
        var shouldBeActive = this.contentHeight > this.heightLimit;
        Dom_1.$$(this.containerElement).toggleClass(CONTAINER_ACTIVE_CLASSNAME, shouldBeActive);
        Dom_1.$$(this.button).toggleClass(BUTTON_ACTIVE_CLASSNAME, shouldBeActive);
        if (shouldBeActive) {
            this.updateExpandedAppearance();
        }
        else {
            this.isExpanded = false;
            this.updateExpandedAppearance();
            this.containerElement.style.height = '';
        }
    };
    HeightLimiter.prototype.updateButton = function () {
        this.buttonLabel.innerText = this.isExpanded ? Strings_1.l('ShowLess') : Strings_1.l('ShowMore');
        this.button.setAttribute('aria-pressed', "" + this.isExpanded);
        this.buttonIcon.innerHTML = this.isExpanded ? SVGIcons_1.SVGIcons.icons.arrowUp : SVGIcons_1.SVGIcons.icons.arrowDown;
    };
    HeightLimiter.prototype.updateExpandedAppearance = function () {
        this.updateButton();
        Dom_1.$$(this.containerElement).toggleClass(CONTAINER_EXPANDED_CLASSNAME, this.isExpanded);
        this.height = this.isExpanded ? this.contentHeight : this.heightLimit;
    };
    HeightLimiter.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
        this.updateExpandedAppearance();
        if (this.onToggle) {
            this.onToggle(this.isExpanded);
        }
    };
    return HeightLimiter;
}());
exports.HeightLimiter = HeightLimiter;


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccessibleModal_1 = __webpack_require__(177);
var Strings_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var RadioButton_1 = __webpack_require__(97);
__webpack_require__(705);
var ROOT_CLASSNAME = 'coveo-user-explanation-modal';
var CONTENT_CLASSNAME = ROOT_CLASSNAME + "-content";
var EXPLANATION_SECTION_CLASSNAME = ROOT_CLASSNAME + "-explanation-section";
var REASONS_CLASSNAME = ROOT_CLASSNAME + "-explanations";
var REASONS_LABEL_CLASSNAME = REASONS_CLASSNAME + "-label";
var DETAILS_SECTION_CLASSNAME = ROOT_CLASSNAME + "-details";
var DETAILS_TEXTAREA_CLASSNAME = DETAILS_SECTION_CLASSNAME + "-textarea";
var DETAILS_LABEL_CLASSNAME = DETAILS_SECTION_CLASSNAME + "-label";
var BUTTONS_SECTION_CLASSNAME = ROOT_CLASSNAME + "-buttons-section";
var SEND_BUTTON_CLASSNAME = ROOT_CLASSNAME + "-send-button";
var CANCEL_BUTTON_CLASSNAME = ROOT_CLASSNAME + "-cancel-button";
var DETAILS_ID = DETAILS_SECTION_CLASSNAME;
exports.ExplanationModalClassNames = {
    ROOT_CLASSNAME: ROOT_CLASSNAME,
    CONTENT_CLASSNAME: CONTENT_CLASSNAME,
    EXPLANATION_SECTION_CLASSNAME: EXPLANATION_SECTION_CLASSNAME,
    REASONS_CLASSNAME: REASONS_CLASSNAME,
    REASONS_LABEL_CLASSNAME: REASONS_LABEL_CLASSNAME,
    DETAILS_SECTION_CLASSNAME: DETAILS_SECTION_CLASSNAME,
    DETAILS_TEXTAREA_CLASSNAME: DETAILS_TEXTAREA_CLASSNAME,
    DETAILS_LABEL_CLASSNAME: DETAILS_LABEL_CLASSNAME,
    BUTTONS_SECTION_CLASSNAME: BUTTONS_SECTION_CLASSNAME,
    SEND_BUTTON_CLASSNAME: SEND_BUTTON_CLASSNAME,
    CANCEL_BUTTON_CLASSNAME: CANCEL_BUTTON_CLASSNAME
};
var ExplanationModal = /** @class */ (function () {
    function ExplanationModal(options) {
        var _this = this;
        this.options = options;
        this.shouldCallCloseEvent = false;
        this.modal = new AccessibleModal_1.AccessibleModal(ROOT_CLASSNAME, this.options.ownerElement, this.options.modalBoxModule, {
            focusOnOpen: function () { return _this.sendButton(); }
        });
    }
    ExplanationModal.prototype.sendButton = function () {
        return this.modal.element.querySelector("." + REASONS_CLASSNAME + " input");
    };
    Object.defineProperty(ExplanationModal.prototype, "details", {
        get: function () {
            if (!this.selectedReason || !this.selectedReason.hasDetails) {
                return null;
            }
            return this.detailsTextArea.value;
        },
        enumerable: true,
        configurable: true
    });
    ExplanationModal.prototype.open = function (origin) {
        var _this = this;
        this.modal.open({
            origin: origin,
            title: Dom_1.$$('span', {}, Strings_1.l('UsefulnessFeedbackExplainWhyImperative')).el,
            content: this.buildContent(),
            validation: function () {
                if (_this.shouldCallCloseEvent) {
                    _this.options.onClosed();
                    _this.shouldCallCloseEvent = false;
                }
                return true;
            }
        });
        this.shouldCallCloseEvent = true;
    };
    ExplanationModal.prototype.buildContent = function () {
        return Dom_1.$$('div', {
            className: CONTENT_CLASSNAME
        }, this.buildExplanationSection(), this.buildButtonsSection()).el;
    };
    ExplanationModal.prototype.buildExplanationSection = function () {
        var detailsSection = this.buildDetailsSection();
        return Dom_1.$$('div', {
            className: EXPLANATION_SECTION_CLASSNAME
        }, this.buildReasons(), detailsSection).el;
    };
    ExplanationModal.prototype.buildButtonsSection = function () {
        return Dom_1.$$('div', {
            className: BUTTONS_SECTION_CLASSNAME
        }, this.buildSendButton(), this.buildCancelButton());
    };
    ExplanationModal.prototype.buildReasons = function () {
        var _this = this;
        var reasonsContainer = Dom_1.$$('fieldset', { className: REASONS_CLASSNAME }, this.buildReasonsLabel()).el;
        this.reasons = this.options.reasons.map(function (reason) { return _this.buildReasonRadioButton(reason); });
        this.reasons[0].select();
        this.reasons.forEach(function (radioButton) { return reasonsContainer.appendChild(radioButton.getElement()); });
        return reasonsContainer;
    };
    ExplanationModal.prototype.buildReasonsLabel = function () {
        return Dom_1.$$('legend', { className: REASONS_LABEL_CLASSNAME }, Strings_1.l('UsefulnessFeedbackReason')).el;
    };
    ExplanationModal.prototype.buildDetailsSection = function () {
        return (this.detailsSection = Dom_1.$$('div', { className: "coveo-hidden " + DETAILS_SECTION_CLASSNAME }, Dom_1.$$('label', { className: DETAILS_LABEL_CLASSNAME, for: DETAILS_ID }, Strings_1.l('Details')).el, (this.detailsTextArea = Dom_1.$$('textarea', { className: DETAILS_TEXTAREA_CLASSNAME, id: DETAILS_ID, disabled: true })
            .el)));
    };
    ExplanationModal.prototype.buildSendButton = function () {
        var _this = this;
        var button = Dom_1.$$('button', { className: SEND_BUTTON_CLASSNAME, type: 'button' }, Strings_1.l('Send'));
        button.on('click', function () {
            _this.selectedReason.onSelect();
            _this.shouldCallCloseEvent = false;
            _this.modal.close();
        });
        return button.el;
    };
    ExplanationModal.prototype.buildCancelButton = function () {
        var _this = this;
        var button = Dom_1.$$('button', { className: CANCEL_BUTTON_CLASSNAME, type: 'button' }, Strings_1.l('Cancel'));
        button.on('click', function () { return _this.modal.close(); });
        return button.el;
    };
    ExplanationModal.prototype.buildReasonRadioButton = function (reason) {
        var _this = this;
        return new RadioButton_1.RadioButton(function (radioButton) {
            if (!radioButton.isSelected()) {
                return;
            }
            _this.detailsSection.toggleClass('coveo-hidden', !reason.hasDetails);
            _this.detailsTextArea.disabled = !reason.hasDetails;
            _this.selectedReason = reason;
        }, reason.label, 'reason', "coveo-reason-" + reason.id);
    };
    return ExplanationModal;
}());
exports.ExplanationModal = ExplanationModal;


/***/ }),

/***/ 705:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
__webpack_require__(558);
var GlobalExports_1 = __webpack_require__(3);
/**
 * A radio button widget with standard styling.
 */
var RadioButton = /** @class */ (function () {
    /**
     * Creates a new `RadioButton`.
     * @param onChange The function to call when the radio button value changes. This function takes the current
     * `RadioButton` instance as an argument.
     * @param label The label to display next to the radio button.
     * @param name The value to set the `input` HTMLElement `name` attribute to.
     */
    function RadioButton(onChange, label, name, id) {
        if (onChange === void 0) { onChange = function (radioButton) { }; }
        if (id === void 0) { id = label; }
        this.onChange = onChange;
        this.label = label;
        this.name = name;
        this.id = id;
        this.buildContent();
    }
    RadioButton.doExport = function () {
        GlobalExports_1.exportGlobally({
            RadioButton: RadioButton
        });
    };
    /**
     * Resets the radio button.
     */
    RadioButton.prototype.reset = function () {
        var currentlySelected = this.isSelected();
        this.getRadio().checked = false;
        if (currentlySelected) {
            this.onChange(this);
        }
    };
    /**
     * Select the radio button
     * @param triggerChange will trigger change event if specified and the radio button is not already selected
     */
    RadioButton.prototype.select = function (triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        var currentlySelected = this.isSelected();
        this.getRadio().checked = true;
        if (!currentlySelected && triggerChange) {
            this.onChange(this);
        }
    };
    /**
     * Gets the element on which the radio button is bound.
     * @returns {HTMLElement} The radio button element.
     */
    RadioButton.prototype.build = function () {
        return this.element;
    };
    /**
     * Gets the element on which the radio button is bound.
     * @returns {HTMLElement} The radio button element.
     */
    RadioButton.prototype.getElement = function () {
        return this.element;
    };
    RadioButton.prototype.getValue = function () {
        return this.label;
    };
    /**
     * Indicates whether the radio button is selected.
     * @returns {boolean} `true` if the radio button is selected, `false` otherwise.
     */
    RadioButton.prototype.isSelected = function () {
        return this.getRadio().checked;
    };
    /**
     * Gets the `input` element (the radio button itself).
     * @returns {HTMLInputElement} The `input` element.
     */
    RadioButton.prototype.getRadio = function () {
        return Dom_1.$$(this.element).find('input');
    };
    /**
     * Gets the radio button [`label`]{@link RadioButton.label} element.
     * @returns {HTMLLabelElement} The `label` element.
     */
    RadioButton.prototype.getLabel = function () {
        return Dom_1.$$(this.element).find('label');
    };
    RadioButton.prototype.buildContent = function () {
        var _this = this;
        var radioOption = Dom_1.$$('div', { className: 'coveo-radio' });
        var radioInput = Dom_1.$$('input', { type: 'radio', name: this.name, id: this.id });
        var labelInput = Dom_1.$$('label', { className: 'coveo-radio-input-label', for: this.id });
        labelInput.text(this.label);
        radioInput.on('change', function () {
            _this.onChange(_this);
        });
        radioOption.append(radioInput.el);
        radioOption.append(labelInput.el);
        this.element = radioOption.el;
    };
    return RadioButton;
}());
exports.RadioButton = RadioButton;


/***/ })

});
//# sourceMappingURL=SmartSnippet__d2b01b0f173a0c131e66.js.map