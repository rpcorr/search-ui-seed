webpackJsonpCoveo__temporary([37],{

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

/***/ 262:
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
var Component_1 = __webpack_require__(7);
var ComponentOptions_1 = __webpack_require__(8);
var SettingsEvents_1 = __webpack_require__(55);
var PreferencesPanelEvents_1 = __webpack_require__(99);
var Initialization_1 = __webpack_require__(2);
var Strings_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var GlobalExports_1 = __webpack_require__(3);
var ExternalModulesShim_1 = __webpack_require__(26);
var _ = __webpack_require__(0);
var AccessibleModal_1 = __webpack_require__(177);
__webpack_require__(635);
var InitializationEvents_1 = __webpack_require__(17);
var SVGIcons_1 = __webpack_require__(12);
/**
 * The PreferencesPanel component renders a **Preferences** item inside the {@link Settings} component which the end
 * user can click to access a panel from which it is possible to specify certain customization options for the search
 * interface. These customization options are then saved in the browser local storage.
 *
 * This component should be used inside the {@link Settings} component.
 *
 * See also the {@link ResultsFiltersPreferences} and {@link ResultsPreferences} components.
 */
var PreferencesPanel = /** @class */ (function (_super) {
    __extends(PreferencesPanel, _super);
    /**
     * Creates a new PreferencesPanel.
     * @param element The HTMLElement on which to instantiate the component.
     * @param options The options for the PreferencesPanel component.
     * @param bindings The bindings that the component requires to function normally. If not set, these will be
     * automatically resolved (with a slower execution time).
     */
    function PreferencesPanel(element, options, bindings, ModalBox) {
        if (ModalBox === void 0) { ModalBox = ExternalModulesShim_1.ModalBox; }
        var _this = _super.call(this, element, PreferencesPanel.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.ModalBox = ModalBox;
        _this.content = [];
        _this.options = ComponentOptions_1.ComponentOptions.initComponentOptions(element, PreferencesPanel, options);
        _this.bind.onRootElement(SettingsEvents_1.SettingsEvents.settingsPopulateMenu, function (args) {
            args.menuData.push({
                className: 'coveo-preferences-panel',
                text: Strings_1.l('Preferences'),
                onOpen: function () { return _this.open(); },
                onClose: function () { return _this.close(); },
                svgIcon: SVGIcons_1.SVGIcons.icons.dropdownPreferences,
                svgIconClassName: 'coveo-preferences-panel-svg'
            });
        });
        _this.bind.onRootElement(InitializationEvents_1.InitializationEvents.afterComponentsInitialization, function () {
            _this.content = Dom_1.$$(_this.element).children();
        });
        _this.modalbox = new AccessibleModal_1.AccessibleModal('coveo-preferences-panel', _this.searchInterface.options.modalContainer, _this.ModalBox, {
            overlayClose: true
        });
        return _this;
    }
    /**
     * Opens the PreferencesPanel.
     */
    PreferencesPanel.prototype.open = function () {
        var _this = this;
        var root = Dom_1.$$('div');
        _.each(this.content, function (oneChild) {
            root.append(oneChild);
        });
        this.modalbox.open({
            title: Strings_1.l('Preferences'),
            content: root.el,
            origin: this.element,
            validation: function () {
                _this.cleanupOnExit();
                return true;
            }
        });
    };
    /**
     * Closes the PreferencesPanel without saving changes.
     *
     * Also triggers the `exitPreferencesWithoutSave` event.
     */
    PreferencesPanel.prototype.close = function () {
        this.cleanupOnExit();
        this.modalbox.close();
    };
    /**
     * Saves the changes and executes a new query.
     *
     * Also triggers the `savePreferences` event.
     */
    PreferencesPanel.prototype.save = function () {
        Dom_1.$$(this.element).trigger(PreferencesPanelEvents_1.PreferencesPanelEvents.savePreferences);
        this.queryController.executeQuery();
    };
    PreferencesPanel.prototype.cleanupOnExit = function () {
        Dom_1.$$(this.element).trigger(PreferencesPanelEvents_1.PreferencesPanelEvents.exitPreferencesWithoutSave);
    };
    PreferencesPanel.ID = 'PreferencesPanel';
    PreferencesPanel.doExport = function () {
        GlobalExports_1.exportGlobally({
            PreferencesPanel: PreferencesPanel
        });
    };
    PreferencesPanel.options = {};
    return PreferencesPanel;
}(Component_1.Component));
exports.PreferencesPanel = PreferencesPanel;
Initialization_1.Initialization.registerAutoCreateComponent(PreferencesPanel);


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

/***/ 635:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=PreferencesPanel__d2b01b0f173a0c131e66.js.map