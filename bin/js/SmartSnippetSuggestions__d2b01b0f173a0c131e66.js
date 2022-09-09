webpackJsonpCoveo__temporary([22,65],{

/***/ 296:
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
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(706);
var Component_1 = __webpack_require__(7);
var GlobalExports_1 = __webpack_require__(3);
var QueryEvents_1 = __webpack_require__(11);
var Dom_1 = __webpack_require__(1);
var underscore_1 = __webpack_require__(0);
var SmartSnippetCollapsibleSuggestion_1 = __webpack_require__(707);
var Strings_1 = __webpack_require__(6);
var Initialization_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(4);
var SmartSnippetCommon_1 = __webpack_require__(520);
var ComponentOptions_1 = __webpack_require__(8);
var BASE_CLASSNAME = 'coveo-smart-snippet-suggestions';
var HAS_QUESTIONS_CLASSNAME = BASE_CLASSNAME + "-has-questions";
var QUESTIONS_LIST_CLASSNAME = BASE_CLASSNAME + "-questions";
var QUESTIONS_LIST_TITLE_CLASSNAME = QUESTIONS_LIST_CLASSNAME + "-title";
exports.SmartSnippetSuggestionsClassNames = {
    HAS_QUESTIONS_CLASSNAME: HAS_QUESTIONS_CLASSNAME,
    QUESTIONS_LIST_CLASSNAME: QUESTIONS_LIST_CLASSNAME,
    QUESTIONS_LIST_TITLE_CLASSNAME: QUESTIONS_LIST_TITLE_CLASSNAME
};
/**
 * The SmartSnippetSuggestions component displays additional queries for which a Coveo Smart Snippets model can provide relevant excerpts.
 */
var SmartSnippetSuggestions = /** @class */ (function (_super) {
    __extends(SmartSnippetSuggestions, _super);
    function SmartSnippetSuggestions(element, options, bindings) {
        var _this = _super.call(this, element, SmartSnippetSuggestions.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.titleId = underscore_1.uniqueId(QUESTIONS_LIST_TITLE_CLASSNAME);
        _this.options = ComponentOptions_1.ComponentOptions.initComponentOptions(element, SmartSnippetSuggestions, options);
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.deferredQuerySuccess, function (data) { return _this.handleQuerySuccess(data); });
        return _this;
    }
    Object.defineProperty(SmartSnippetSuggestions.prototype, "loading", {
        get: function () {
            return this.contentLoaded;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @warning This method only works for the demo. In practice, the source of the answer will not always be part of the results.
     */
    SmartSnippetSuggestions.prototype.getCorrespondingResult = function (questionAnswer) {
        return underscore_1.find(this.queryController.getLastResults().results, function (result) { return result.raw[questionAnswer.documentId.contentIdKey] === questionAnswer.documentId.contentIdValue; });
    };
    SmartSnippetSuggestions.prototype.handleQuerySuccess = function (data) {
        var questionAnswer = data.results.questionAnswer;
        var hasQuestions = !!(questionAnswer && questionAnswer.relatedQuestions.length);
        Dom_1.$$(this.element).toggleClass(HAS_QUESTIONS_CLASSNAME, hasQuestions);
        if (hasQuestions) {
            this.searchUid = data.results.searchUid;
            if (this.renderedQuestionAnswer && underscore_1.isEqual(questionAnswer, this.renderedQuestionAnswer)) {
                return;
            }
            this.detachContent();
            this.element.appendChild((this.title = this.buildTitle()).el);
            this.element.appendChild((this.questionAnswers = this.buildQuestionAnswers(questionAnswer.relatedQuestions)).el);
        }
        else {
            this.detachContent();
        }
        this.renderedQuestionAnswer = questionAnswer;
    };
    SmartSnippetSuggestions.prototype.detachContent = function () {
        this.title && this.title.detach();
        this.questionAnswers && this.questionAnswers.detach();
        this.title = this.questionAnswers = null;
    };
    SmartSnippetSuggestions.prototype.buildTitle = function () {
        return Dom_1.$$('span', { className: QUESTIONS_LIST_TITLE_CLASSNAME, id: this.titleId }, Strings_1.l('SuggestedQuestions'));
    };
    SmartSnippetSuggestions.prototype.buildQuestionAnswers = function (questionAnswers) {
        var _this = this;
        var innerCSS = this.getInnerCSS();
        var answers = questionAnswers.map(function (questionAnswer) {
            return new SmartSnippetCollapsibleSuggestion_1.SmartSnippetCollapsibleSuggestion({
                questionAnswer: questionAnswer,
                bindings: _this.getBindings(),
                innerCSS: Utils_1.Utils.isNullOrUndefined(innerCSS)
                    ? SmartSnippetCommon_1.getDefaultSnippetStyle(SmartSnippetCollapsibleSuggestion_1.SmartSnippetCollapsibleSuggestionClassNames.RAW_CONTENT_CLASSNAME)
                    : innerCSS,
                searchUid: _this.searchUid,
                titleField: _this.options.titleField,
                hrefTemplate: _this.options.hrefTemplate,
                alwaysOpenInNewWindow: _this.options.alwaysOpenInNewWindow,
                source: _this.getCorrespondingResult(questionAnswer),
                useIFrame: _this.options.useIFrame
            });
        });
        var container = Dom_1.$$.apply(void 0, ['ul',
            { className: QUESTIONS_LIST_CLASSNAME, ariaLabelledby: this.titleId }].concat(answers.map(function (answer) { return answer.build(); })));
        this.contentLoaded = Promise.all(answers.map(function (answer) { return answer.loading.then(function () { return answer; }); }));
        return container;
    };
    SmartSnippetSuggestions.prototype.getInnerCSS = function () {
        var styles = Dom_1.$$(this.element)
            .children()
            .filter(function (element) { return element instanceof HTMLScriptElement && element.type.toLowerCase() === 'text/css'; })
            .map(function (element) { return element.innerHTML; });
        return styles.length ? styles.join('\n') : null;
    };
    SmartSnippetSuggestions.ID = 'SmartSnippetSuggestions';
    SmartSnippetSuggestions.doExport = function () {
        GlobalExports_1.exportGlobally({
            SmartSnippetSuggestions: SmartSnippetSuggestions
        });
    };
    /**
     * The options for the SmartSnippetSuggestions
     * @componentOptions
     */
    SmartSnippetSuggestions.options = {
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
         * Specify if the SmartSnippetSuggestion snippet should be displayed inside an iframe or not.
         *
         * Use this option in specific cases where your environment has limitations around iframe usage.
         *
         * **Examples:**
         *
         * ```html
         * <div class='CoveoSmartSnippetSuggestions' data-use-i-frame='true'></div>
         * ```
         *
         * Default value is `true`.
         */
        useIFrame: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: true })
    };
    return SmartSnippetSuggestions;
}(Component_1.Component));
exports.SmartSnippetSuggestions = SmartSnippetSuggestions;
Initialization_1.Initialization.registerAutoCreateComponent(SmartSnippetSuggestions);
SmartSnippetSuggestions.doExport();


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

/***/ 706:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 707:
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
var underscore_1 = __webpack_require__(0);
var AccessibleButton_1 = __webpack_require__(15);
var SVGIcons_1 = __webpack_require__(12);
var AttachShadowPolyfill_1 = __webpack_require__(519);
var Dom_1 = __webpack_require__(1);
var Strings_1 = __webpack_require__(6);
var AnalyticsActionListMeta_1 = __webpack_require__(10);
var ResultLink_1 = __webpack_require__(69);
var Utils_1 = __webpack_require__(4);
var QUESTION_CLASSNAME = "coveo-smart-snippet-suggestions-question";
var QUESTION_TITLE_CLASSNAME = QUESTION_CLASSNAME + "-title";
var QUESTION_TITLE_LABEL_CLASSNAME = QUESTION_TITLE_CLASSNAME + "-label";
var QUESTION_TITLE_CHECKBOX_CLASSNAME = QUESTION_TITLE_CLASSNAME + "-checkbox";
var QUESTION_SNIPPET_CLASSNAME = QUESTION_CLASSNAME + "-snippet";
var QUESTION_SNIPPET_CONTAINER_CLASSNAME = QUESTION_SNIPPET_CLASSNAME + "-container";
var QUESTION_SNIPPET_HIDDEN_CLASSNAME = QUESTION_SNIPPET_CLASSNAME + "-hidden";
var SHADOW_CLASSNAME = QUESTION_SNIPPET_CLASSNAME + "-content";
var RAW_CONTENT_CLASSNAME = SHADOW_CLASSNAME + "-raw";
var SOURCE_CLASSNAME = QUESTION_CLASSNAME + "-source";
var SOURCE_TITLE_CLASSNAME = SOURCE_CLASSNAME + "-title";
var SOURCE_URL_CLASSNAME = SOURCE_CLASSNAME + "-url";
exports.SmartSnippetCollapsibleSuggestionClassNames = {
    QUESTION_CLASSNAME: QUESTION_CLASSNAME,
    QUESTION_TITLE_CLASSNAME: QUESTION_TITLE_CLASSNAME,
    QUESTION_TITLE_LABEL_CLASSNAME: QUESTION_TITLE_LABEL_CLASSNAME,
    QUESTION_TITLE_CHECKBOX_CLASSNAME: QUESTION_TITLE_CHECKBOX_CLASSNAME,
    QUESTION_SNIPPET_CLASSNAME: QUESTION_SNIPPET_CLASSNAME,
    QUESTION_SNIPPET_CONTAINER_CLASSNAME: QUESTION_SNIPPET_CONTAINER_CLASSNAME,
    QUESTION_SNIPPET_HIDDEN_CLASSNAME: QUESTION_SNIPPET_HIDDEN_CLASSNAME,
    SHADOW_CLASSNAME: SHADOW_CLASSNAME,
    RAW_CONTENT_CLASSNAME: RAW_CONTENT_CLASSNAME,
    SOURCE_CLASSNAME: SOURCE_CLASSNAME,
    SOURCE_TITLE_CLASSNAME: SOURCE_TITLE_CLASSNAME,
    SOURCE_URL_CLASSNAME: SOURCE_URL_CLASSNAME
};
var SmartSnippetCollapsibleSuggestion = /** @class */ (function () {
    function SmartSnippetCollapsibleSuggestion(options) {
        this.options = options;
        this.labelId = underscore_1.uniqueId(QUESTION_TITLE_LABEL_CLASSNAME);
        this.snippetId = underscore_1.uniqueId(QUESTION_SNIPPET_CLASSNAME);
        this.checkboxId = underscore_1.uniqueId(QUESTION_TITLE_CHECKBOX_CLASSNAME);
        this.expanded = false;
    }
    Object.defineProperty(SmartSnippetCollapsibleSuggestion.prototype, "loading", {
        get: function () {
            return this.contentLoaded;
        },
        enumerable: true,
        configurable: true
    });
    SmartSnippetCollapsibleSuggestion.prototype.build = function () {
        var collapsibleContainer = this.buildCollapsibleContainer(this.options.questionAnswer.answerSnippet, this.options.questionAnswer.question, this.buildStyle(this.options.innerCSS));
        var title = this.buildTitle(this.options.questionAnswer.question);
        this.updateExpanded();
        return Dom_1.$$('li', {
            className: QUESTION_CLASSNAME,
            ariaLabelledby: this.labelId
        }, title, collapsibleContainer).el;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildStyle = function (innerCSS) {
        var styleTag = document.createElement('style');
        styleTag.innerHTML = innerCSS;
        return styleTag;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildTitle = function (question) {
        var _this = this;
        var checkbox = this.buildCheckbox(question);
        var label = Dom_1.$$('span', { className: QUESTION_TITLE_LABEL_CLASSNAME, id: this.labelId });
        label.text(question);
        var title = Dom_1.$$('span', { className: QUESTION_TITLE_CLASSNAME }, label, checkbox);
        title.on('click', function () { return _this.toggle(); });
        return title;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildCheckbox = function (question) {
        var _this = this;
        this.checkbox = Dom_1.$$('div', {
            role: 'button',
            tabindex: 0,
            ariaControls: this.snippetId,
            className: QUESTION_TITLE_CHECKBOX_CLASSNAME,
            id: this.checkboxId
        });
        new AccessibleButton_1.AccessibleButton()
            .withElement(this.checkbox)
            .withLabel(Strings_1.l('ExpandQuestionAnswer', question))
            .withEnterKeyboardAction(function () { return _this.toggle(); })
            .build();
        return this.checkbox;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildCollapsibleContainer = function (innerHTML, title, style) {
        var _this = this;
        var shadowContainer = Dom_1.$$('div', { className: SHADOW_CLASSNAME });
        this.snippetAndSourceContainer = Dom_1.$$('div', { className: QUESTION_SNIPPET_CONTAINER_CLASSNAME }, shadowContainer);
        this.collapsibleContainer = Dom_1.$$('div', { className: QUESTION_SNIPPET_CLASSNAME, id: this.snippetId }, this.snippetAndSourceContainer);
        this.contentLoaded = AttachShadowPolyfill_1.attachShadow(shadowContainer.el, {
            mode: 'open',
            title: Strings_1.l('AnswerSpecificSnippet', title),
            useIFrame: this.options.useIFrame
        }).then(function (shadowRoot) {
            shadowRoot.appendChild(_this.buildAnswerSnippetContent(innerHTML, style).el);
        });
        if (this.options.source) {
            this.snippetAndSourceContainer.append(this.buildSourceUrl().el);
            this.snippetAndSourceContainer.append(this.buildSourceTitle().el);
        }
        return this.collapsibleContainer;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildAnswerSnippetContent = function (innerHTML, style) {
        var snippet = Dom_1.$$('div', { className: RAW_CONTENT_CLASSNAME }, innerHTML);
        var container = Dom_1.$$('div', {}, snippet);
        container.append(style);
        return container;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildSourceTitle = function () {
        var link = this.buildLink(SOURCE_TITLE_CLASSNAME);
        link.text(Utils_1.Utils.getFieldValue(this.options.source, this.options.titleField));
        return link;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildSourceUrl = function () {
        var link = this.buildLink(SOURCE_URL_CLASSNAME);
        link.text(link.el.href);
        return link;
    };
    SmartSnippetCollapsibleSuggestion.prototype.buildLink = function (className) {
        var _this = this;
        var element = Dom_1.$$('a', { className: "CoveoResultLink " + className });
        new ResultLink_1.ResultLink(element.el, {
            hrefTemplate: this.options.hrefTemplate,
            logAnalytics: function (href) { return _this.sendOpenSourceAnalytics(element.el, href); },
            alwaysOpenInNewWindow: this.options.alwaysOpenInNewWindow
        }, __assign({}, this.options.bindings, { resultElement: this.collapsibleContainer.el }), this.options.source);
        return element;
    };
    SmartSnippetCollapsibleSuggestion.prototype.toggle = function () {
        this.expanded = !this.expanded;
        this.updateExpanded();
        if (this.expanded) {
            this.sendExpandAnalytics();
        }
        else {
            this.sendCollapseAnalytics();
        }
    };
    SmartSnippetCollapsibleSuggestion.prototype.updateIFrameExpanded = function () {
        var iframe = this.snippetAndSourceContainer.find('iframe');
        if (!iframe) {
            return;
        }
        this.expanded ? iframe.removeAttribute('tabindex') : iframe.setAttribute('tabindex', '-1');
    };
    SmartSnippetCollapsibleSuggestion.prototype.updateExpanded = function () {
        this.checkbox.setAttribute('aria-expanded', this.expanded.toString());
        this.checkbox.setHtml(this.expanded ? SVGIcons_1.SVGIcons.icons.arrowUp : SVGIcons_1.SVGIcons.icons.arrowDown);
        this.collapsibleContainer.setAttribute('aria-hidden', (!this.expanded).toString());
        this.collapsibleContainer.toggleClass(QUESTION_SNIPPET_HIDDEN_CLASSNAME, !this.expanded);
        this.collapsibleContainer.el.style.height = this.expanded ? this.snippetAndSourceContainer.el.clientHeight + "px" : '0px';
        this.updateIFrameExpanded();
    };
    SmartSnippetCollapsibleSuggestion.prototype.sendExpandAnalytics = function () {
        return this.options.bindings.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.expandSmartSnippetSuggestion, {
            searchQueryUid: this.options.searchUid,
            documentId: this.options.questionAnswer.documentId
        }, this.checkbox.el);
    };
    SmartSnippetCollapsibleSuggestion.prototype.sendCollapseAnalytics = function () {
        return this.options.bindings.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.collapseSmartSnippetSuggestion, {
            searchQueryUid: this.options.searchUid,
            documentId: this.options.questionAnswer.documentId
        }, this.checkbox.el);
    };
    SmartSnippetCollapsibleSuggestion.prototype.sendOpenSourceAnalytics = function (element, href) {
        return this.options.bindings.usageAnalytics.logClickEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.openSmartSnippetSuggestionSource, {
            searchQueryUid: this.options.searchUid,
            documentTitle: this.options.source.title,
            author: Utils_1.Utils.getFieldValue(this.options.source, 'author'),
            documentURL: href,
            documentId: this.options.questionAnswer.documentId
        }, this.options.source, element);
    };
    return SmartSnippetCollapsibleSuggestion;
}());
exports.SmartSnippetCollapsibleSuggestion = SmartSnippetCollapsibleSuggestion;


/***/ })

});
//# sourceMappingURL=SmartSnippetSuggestions__d2b01b0f173a0c131e66.js.map