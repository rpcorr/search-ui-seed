webpackJsonpCoveo__temporary([85],{293:function(t,n,o){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])};return function(n,o){function i(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}();Object.defineProperty(n,"__esModule",{value:!0});var e=o(7),s=o(8),r=o(11),l=o(57),u=o(2),p=o(3),a=o(34),c=function(t){function n(o,i,e){var u=t.call(this,o,n.ID,e)||this;return u.element=o,u.options=i,u.bindings=e,u.options=s.ComponentOptions.initComponentOptions(o,n,i),u.bind.onRootElement(r.QueryEvents.doneBuildingQuery,u.handleDoneBuildingQuery),u.bind.onRootElement(a.OmniboxEvents.buildingQuerySuggest,u.handleBuildingQuerySuggest),u.bind.onRootElement(l.AnalyticsEvents.changeAnalyticsCustomData,u.handleChangeAnalytics),u}return i(n,t),n.prototype.handleDoneBuildingQuery=function(t){this.options.listing&&(t.queryBuilder.tab=this.options.listing,t.queryBuilder.addContextValue("listing",this.options.listing))},n.prototype.handleBuildingQuerySuggest=function(t){this.options.listing&&(t.payload.tab=this.options.listing,(t.payload.context||(t.payload.context={})).listing=this.options.listing)},n.prototype.handleChangeAnalytics=function(t){this.options.listing&&(t.originLevel2=this.options.listing)},n.ID="CommerceQuery",n.doExport=function(){p.exportGlobally({CommerceQuery:n})},n.options={listing:s.ComponentOptions.buildStringOption()},n}(e.Component);n.CommerceQuery=c,u.Initialization.registerAutoCreateComponent(c)}});
//# sourceMappingURL=CommerceQuery.min__d6b9bcc2bfcb024de483.js.map