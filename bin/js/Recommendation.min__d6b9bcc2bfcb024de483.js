webpackJsonpCoveo__temporary([21],{129:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(92),i=function(){function e(){}return e.shouldDrawFacetSlider=function(e,t){return o.ResponsiveDropdownContent.isTargetInsideOpenedDropdown(t)||!this.isSmallFacetActivated(e)},e.isSmallTabsActivated=function(e){return e.hasClass(this.smallTabsClassName)},e.isSmallFacetActivated=function(e){return e.hasClass(this.smallFacetClassName)},e.isSmallRecommendationActivated=function(e){return e.hasClass(this.smallRecommendationClassName)},e.activateSmallTabs=function(e){e.addClass(this.smallTabsClassName)},e.deactivateSmallTabs=function(e){e.removeClass(this.smallTabsClassName)},e.activateSmallFacet=function(e){e.addClass(this.smallFacetClassName)},e.deactivateSmallFacet=function(e){e.removeClass(this.smallFacetClassName)},e.activateSmallRecommendation=function(e){e.addClass(this.smallRecommendationClassName)},e.deactivateSmallRecommendation=function(e){e.removeClass(this.smallRecommendationClassName)},e.smallTabsClassName="coveo-small-tabs",e.smallFacetClassName="coveo-small-facets",e.smallRecommendationClassName="coveo-small-recommendation",e}();t.ResponsiveComponentsUtils=i},197:function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(19),s=n(8),r=n(11),a=n(34),c=n(29),l=n(55),d=n(99),p=n(57),u=n(10),m=n(35),h=n(225),v=n(13),f=n(18),y=n(4),R=n(1),C=n(648),S=n(30),E=n(17),g=n(0),w=n(3),O=n(468),_=n(651),b=n(207);n(652);var I=n(6),P=function(e){function t(n,o,i,a){void 0===o&&(o={}),void 0===i&&(i={}),void 0===a&&(a=window);var c=e.call(this,n,s.ComponentOptions.initComponentOptions(n,t,o),i,a)||this;return c.element=n,c.options=o,c.analyticsOptions=i,c.element.style.display="",c.options.id||c.generateDefaultId(),c.preventEventPropagation(),c.options.mainSearchInterface&&c.bindToMainSearchInterface(),R.$$(c.element).on(r.QueryEvents.buildingQuery,function(e,t){return c.handleRecommendationBuildingQuery(t)}),R.$$(c.element).on(r.QueryEvents.querySuccess,function(e,t){return c.handleRecommendationQuerySuccess(t)}),R.$$(c.element).on(r.QueryEvents.noResults,function(e,t){return c.handleRecommendationNoResults()}),R.$$(c.element).on(r.QueryEvents.queryError,function(e,t){return c.handleRecommendationQueryError()}),c.options.mainSearchInterface||c.ensureCurrentPageViewExistsInStore(),C.ResponsiveRecommendation.init(c.root,c,o),c}return o(t,e),Object.defineProperty(t.prototype,"historyStore",{get:function(){return this.queryController.historyStore},enumerable:!0,configurable:!0}),t.prototype.getId=function(){return this.options.id},t.prototype.enable=function(){e.prototype.enable.call(this),this.show()},t.prototype.disable=function(){e.prototype.disable.call(this),this.hide()},t.prototype.hide=function(){R.$$(this.element).addClass("coveo-hidden")},t.prototype.show=function(){R.$$(this.element).removeClass("coveo-hidden")},t.prototype.ensureCurrentPageViewExistsInStore=function(){var e={name:"PageView",value:document.location.toString(),time:JSON.stringify(new Date),title:g.escape(document.title)};this.historyStore.addElement(e)},t.prototype.bindToMainSearchInterface=function(){this.bindComponentOptionsModelToMainSearchInterface(),this.bindQueryEventsToMainSearchInterface()},t.prototype.bindComponentOptionsModelToMainSearchInterface=function(){var e=this,t=S.get(this.options.mainSearchInterface,i.SearchInterface),n=null!=t,o=function(){var n=t.getBindings().componentOptionsModel;e.componentOptionsModel.setMultiple(n.getAttributes()),R.$$(e.options.mainSearchInterface).on(e.componentOptionsModel.getEventName(f.MODEL_EVENTS.ALL),function(){e.componentOptionsModel.setMultiple(n.getAttributes())})};n?o():R.$$(this.options.mainSearchInterface).on(E.InitializationEvents.afterComponentsInitialization,function(){t=S.get(e.options.mainSearchInterface,i.SearchInterface),o()})},t.prototype.bindQueryEventsToMainSearchInterface=function(){var e=this;R.$$(this.options.mainSearchInterface).on(r.QueryEvents.querySuccess,function(t,n){e.mainInterfaceQuery=n,e.mainQuerySearchUID=n.results.searchUid,e.mainQueryPipeline=n.results.pipeline,0!=n.results.results.length&&(e.usageAnalytics.logSearchEvent(u.analyticsActionCauseList.recommendation,{}),e.queryController.executeQuery({closeModalBox:!1}))}),R.$$(this.options.mainSearchInterface).on(r.QueryEvents.queryError,function(){return e.hide()}),R.$$(this.options.mainSearchInterface).on(r.QueryEvents.noResults,function(){return e.hide()})},t.prototype.handleRecommendationBuildingQuery=function(e){this.disabled||(this.modifyQueryForRecommendation(e),this.addRecommendationInfoInQuery(e))},t.prototype.handleRecommendationQuerySuccess=function(e){this.disabled||this.options.hideIfNoResults&&(0===e.results.totalCount?this.hide():this.show())},t.prototype.handleRecommendationNoResults=function(){this.disabled||this.options.hideIfNoResults&&this.hide()},t.prototype.handleRecommendationQueryError=function(){this.disabled||this.hide()},t.prototype.modifyQueryForRecommendation=function(e){this.mainInterfaceQuery&&y.Utils.copyObjectAttributes(e.queryBuilder,this.mainInterfaceQuery.queryBuilder,this.options.optionsToUse)},t.prototype.addRecommendationInfoInQuery=function(e){g.isEmpty(this.options.userContext)||e.queryBuilder.addContext(this.options.userContext),e.queryBuilder.recommendation=this.options.id},t.prototype.preventEventPropagation=function(){this.preventEventPropagationOn(r.QueryEvents),this.preventEventPropagationOn(a.OmniboxEvents),this.preventEventPropagationOn(c.ResultListEvents),this.preventEventPropagationOn(l.SettingsEvents),this.preventEventPropagationOn(d.PreferencesPanelEvents),this.preventEventPropagationOn(p.AnalyticsEvents),this.preventEventPropagationOn(m.BreadcrumbEvents),this.preventEventPropagationOn(h.QuickviewEvents),this.preventEventPropagationOn(E.InitializationEvents),this.preventEventPropagationOn(this.getAllModelEvents())},t.prototype.preventEventPropagationOn=function(e,t){void 0===t&&(t=function(e){return e});for(var n in e)R.$$(this.root).on(t(n),function(e){return e.stopPropagation()})},t.prototype.getAllModelEvents=function(){var e=this,t={},n=this.getBindings().queryStateModel;return g.each(g.values(f.Model.eventTypes),function(o){var i=n.getEventName(o);t[i]=i,g.each(g.values(v.QUERY_STATE_ATTRIBUTES),function(n){var i=e.queryStateModel.getEventName(o+n);t[i]=i})}),t},t.prototype.generateDefaultId=function(){var e="Recommendation";1!==t.NEXT_ID&&(this.logger.warn("Generating another recommendation default id","Consider configuring a human friendly / meaningful id for this interface"),e=e+"_"+t.NEXT_ID),t.NEXT_ID++,this.options.id=e},t.ID="Recommendation",t.NEXT_ID=1,t.doExport=function(){w.exportGlobally({Recommendation:t,DefaultRecommendationTemplate:O.DefaultRecommendationTemplate,RecommendationQuery:_.RecommendationQuery,RecommendationAnalyticsClient:b.RecommendationAnalyticsClient})},t.options={mainSearchInterface:s.ComponentOptions.buildSelectorOption(),userContext:s.ComponentOptions.buildJsonOption(),id:s.ComponentOptions.buildStringOption(),optionsToUse:s.ComponentOptions.buildListOption({defaultValue:["expression"]}),sendActionsHistory:s.ComponentOptions.buildBooleanOption({defaultValue:!0,deprecated:"This option is now deprecated. The correct way to control this behaviour is to configure an appropriate machine learning model in the administration interface (Recommendation, Relevance tuning, Query suggestions)"}),hideIfNoResults:s.ComponentOptions.buildBooleanOption({defaultValue:!0}),autoTriggerQuery:s.ComponentOptions.buildBooleanOption({postProcessing:function(e,t){return!t.mainSearchInterface&&e}}),enableResponsiveMode:s.ComponentOptions.buildBooleanOption({defaultValue:!0}),responsiveBreakpoint:s.ComponentOptions.buildNumberOption({defaultValue:1e3}),dropdownHeaderLabel:s.ComponentOptions.buildLocalizedStringOption({localizedString:function(){return I.l("Recommendations")}})},t}(i.SearchInterface);t.Recommendation=P},225:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.quickviewLoaded="quickviewLoaded",e.openQuickview="openQuickview",e}();t.QuickviewEvents=o},468:function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(27),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.instantiateToString=function(e){return'<div class="coveo-result-frame">\n        <div class="coveo-result-row">\n          <div class="coveo-result-cell" style="width:40px;text-align:center;vertical-align:middle;">\n            <span class="CoveoIcon" data-small="true" data-with-label="false">\n            </span>\n          </div>\n          <div class="coveo-result-cell" style="padding:0 0 3px 5px;vertical-align:middle">\n            <div class="coveo-result-row">\n              <div class="coveo-result-cell" style="font-size:10pt;">\n                <a class="CoveoResultLink" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>'},t.prototype.instantiateToElement=function(e){var t=this;return new Promise(function(n,o){var i=document.createElement("div");i.innerHTML=t.instantiateToString(e),n(i)})},t}(i.Template);t.DefaultRecommendationTemplate=s},648:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(61),i=n(129),s=n(19),r=n(4),a=n(1),c=n(9),l=n(197),d=n(649),p=n(134),u=n(122),m=n(6),h=n(7),v=n(30),f=n(11),y=n(0);n(650);var R=n(72),C=function(){function e(e,t,n,o){this.coveoRoot=e,this.ID=t,this.responsiveDropdown=o,this.recommendationRoot=this.getRecommendationRoot(),this.dropdownHeaderLabel=n.dropdownHeaderLabel,this.breakpoint=this.defineResponsiveBreakpoint(n),this.searchInterface=h.Component.get(this.coveoRoot.el,s.SearchInterface,!1),this.dropdown=this.buildDropdown(o),this.registerOnOpenHandler(),this.registerQueryEvents(),this.handleResizeEvent()}return e.init=function(t,n,i){var s=new c.Logger("ResponsiveRecommendation"),r=this.findParentRootOfRecommendationComponent(t);return r?a.$$(r).find(".coveo-results-column")?void o.ResponsiveComponentsManager.register(e,a.$$(r),l.Recommendation.ID,n,y.extend({},i,{initializationEventRoot:a.$$(t)})):void s.info("Cannot find element with class coveo-results-column. Disabling responsive mode for this component."):void s.info("Recommendation component has no parent interface. Disabling responsive mode for this component.")},e.findParentRootOfRecommendationComponent=function(e){var t=a.$$(e).parents(h.Component.computeCssClassName(s.SearchInterface));return t[0]?a.$$(t[0]):null},e.prototype.handleResizeEvent=function(){this.needSmallMode()&&!i.ResponsiveComponentsUtils.isSmallRecommendationActivated(this.coveoRoot)?this.changeToSmallMode():!this.needSmallMode()&&i.ResponsiveComponentsUtils.isSmallRecommendationActivated(this.coveoRoot)&&this.changeToLargeMode(),this.dropdown.isOpened&&this.dropdown.dropdownContent.positionDropdown()},e.prototype.needDropdownWrapper=function(){return this.needSmallMode()},e.prototype.needSmallMode=function(){var e=this.coveoRoot.width()<=this.breakpoint;if(!this.searchInterface)return e;switch(this.searchInterface.responsiveComponents.getResponsiveMode()){case"small":return!0;case"auto":return e;default:return!1}},e.prototype.changeToSmallMode=function(){var e=this;this.dropdown.close();var t=this.coveoRoot.find("."+o.ResponsiveComponentsManager.DROPDOWN_HEADER_WRAPPER_CSS_CLASS);t?(a.$$(t).append(this.dropdown.dropdownHeader.element.el),this.disableFacetPreservePosition(),i.ResponsiveComponentsUtils.activateSmallRecommendation(this.coveoRoot),i.ResponsiveComponentsUtils.activateSmallRecommendation(this.recommendationRoot)):R.Defer.defer(function(){return e.handleResizeEvent()})},e.prototype.changeToLargeMode=function(){this.enableFacetPreservePosition(),this.dropdown.cleanUp(),i.ResponsiveComponentsUtils.deactivateSmallRecommendation(this.coveoRoot),i.ResponsiveComponentsUtils.deactivateSmallRecommendation(this.recommendationRoot)},e.prototype.buildDropdown=function(e){var t=this.buildDropdownContent(),n=this.buildDropdownHeader(),o=e||new u.ResponsiveDropdown(t,n,this.coveoRoot);return o.disablePopupBackground(),o},e.prototype.buildDropdownHeader=function(){var e=a.$$("a"),t=a.$$("p");return t.text(m.l(this.dropdownHeaderLabel)),e.el.appendChild(t.el),new p.ResponsiveDropdownHeader("recommendation",e)},e.prototype.buildDropdownContent=function(){var e,t=this.coveoRoot.find(".coveo-recommendation-column");return e=t?a.$$(t):a.$$(this.coveoRoot.find("."+h.Component.computeCssClassName(l.Recommendation))),new d.RecommendationDropdownContent("recommendation",e,this.coveoRoot)},e.prototype.defineResponsiveBreakpoint=function(t){return r.Utils.isNullOrUndefined(t.responsiveBreakpoint)?e.RESPONSIVE_BREAKPOINT:t.responsiveBreakpoint},e.prototype.getFacetSliders=function(){var e=[];return this.coveoRoot.findAll(h.Component.computeSelectorForType("FacetSlider")).forEach(function(t){var n=h.Component.get(t);n&&e.push(n)}),e},e.prototype.getFacets=function(){var e=[];return this.coveoRoot.findAll(h.Component.computeSelectorForType("Facet")).forEach(function(t){var n=h.Component.get(t);n&&e.push(n)}),e},e.prototype.enableFacetPreservePosition=function(){this.getFacets().forEach(function(e){return e.options.preservePosition=!0})},e.prototype.disableFacetPreservePosition=function(){this.getFacets().forEach(function(e){return e.options.preservePosition=!1})},e.prototype.drawFacetSliderGraphs=function(){this.getFacetSliders().forEach(function(e){return e.drawDelayedGraphData()})},e.prototype.registerOnOpenHandler=function(){this.dropdown.registerOnOpenHandler(this.drawFacetSliderGraphs,this)},e.prototype.getRecommendationRoot=function(){return a.$$(this.coveoRoot.find("."+h.Component.computeCssClassName(l.Recommendation)))},e.prototype.registerQueryEvents=function(){var e=this,t=v.get(this.recommendationRoot.el,s.SearchInterface);t&&t.options.hideIfNoResults&&(this.coveoRoot.on(f.QueryEvents.querySuccess,function(t,n){return e.handleRecommnendationQuerySucess(n)}),this.coveoRoot.on(f.QueryEvents.noResults,function(t,n){return e.handleRecommendationNoResults()})),this.coveoRoot.on(f.QueryEvents.queryError,function(){return e.handleRecommendationQueryError()})},e.prototype.handleRecommnendationQuerySucess=function(e){0===e.results.totalCount?(this.dropdown.close(),this.dropdown.dropdownHeader.hide()):this.dropdown.dropdownHeader.show()},e.prototype.handleRecommendationNoResults=function(){this.dropdown.close(),this.dropdown.dropdownHeader.hide()},e.prototype.handleRecommendationQueryError=function(){this.dropdown.close(),this.dropdown.dropdownHeader.hide()},e.DROPDOWN_CONTAINER_CSS_CLASS_NAME="coveo-recommendation-dropdown-container",e.RESPONSIVE_BREAKPOINT=1e3,e}();t.ResponsiveRecommendation=C},649:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(92),i=n(1),s=function(){function e(e,t,n){this.element=t,this.coveoRoot=n,this.cssClassName="coveo-"+e+"-dropdown-content",this.element.addClass(this.cssClassName),this.element.addClass(o.ResponsiveDropdownContent.DEFAULT_CSS_CLASS_NAME)}return e.prototype.positionDropdown=function(){this.element.el.style.display="";var t=this.coveoRoot.find(".coveo-results-column");i.$$(t).prepend(this.element.el),this.element.addClass(o.ResponsiveDropdownContent.DEFAULT_CSS_CLASS_NAME),this.element.addClass(this.cssClassName),window.getComputedStyle(this.element.el).maxHeight,this.element.addClass(e.OPENED_DROPDOWN_CSS_CLASS_NAME)},e.prototype.hideDropdown=function(){this.element.addClass(o.ResponsiveDropdownContent.DEFAULT_CSS_CLASS_NAME),this.element.addClass(this.cssClassName),this.element.removeClass(e.OPENED_DROPDOWN_CSS_CLASS_NAME)},e.prototype.cleanUp=function(){this.element.removeClass(this.cssClassName),this.element.removeClass(o.ResponsiveDropdownContent.DEFAULT_CSS_CLASS_NAME)},e.OPENED_DROPDOWN_CSS_CLASS_NAME="coveo-open-dropdown-content",e}();t.RecommendationDropdownContent=s},650:function(e,t){},651:function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(7),s=n(8),r=n(4),a=n(11),c=n(2),l=n(1),d=n(0),p=function(e){function t(n,o,i){var c=e.call(this,n,t.ID,i)||this;if(c.element=n,c.options=o,c.options=s.ComponentOptions.initComponentOptions(n,t,o),"script"===c.element.tagName.toLowerCase()){try{c.content=r.Utils.decodeHTMLEntities(l.$$(c.element).text())}catch(e){return c}d.isUndefined(c.content)||""==c.content||c.bind.onRootElement(a.QueryEvents.buildingQuery,c.handleBuildingQuery)}return c}return o(t,e),t.prototype.handleBuildingQuery=function(e){e.queryBuilder.advancedExpression.add(this.content)},t.ID="RecommendationQuery",t.options={},t}(i.Component);t.RecommendationQuery=p,c.Initialization.registerAutoCreateComponent(p)},652:function(e,t){}});
//# sourceMappingURL=Recommendation.min__d6b9bcc2bfcb024de483.js.map