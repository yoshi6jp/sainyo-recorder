(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,a){},109:function(e,t,a){},190:function(e,t,a){"use strict";a.r(t);var n,r=a(0),c=a.n(r),l=a(9),o=a.n(l),i=(a(104),a(105),a(106),a(107),a(108),a(109),a(20)),u={itemList:[],totalList:[],valueList:[]},s=a(21),m=a(49);!function(e){e.PUT_ITEM="PUT_ITEM",e.LOAD_ITEMS="LOAD_ITEMS",e.SET_ITEMS="SET_ITEMS",e.PUT_TOTAL="PUT_TOTAL",e.LOAD_TOTALS="LOAD_TOTALS",e.SET_TOTALS="SET_TOTALS",e.CALC_TOTAL="CALC_TOTAL"}(n||(n={}));var d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case n.PUT_ITEM:var a=t.payload.item,r=[].concat(Object(m.a)(e.itemList),[a]);return Object(s.a)({},e,{itemList:r});case n.SET_ITEMS:var c=t.payload.items,l=Object(m.a)(c);return Object(s.a)({},e,{itemList:l});case n.SET_TOTALS:var o=t.payload.totals,i=Object(m.a)(o);return Object(s.a)({},e,{totalList:i});default:return e}},O=a(27),T=a.n(O),f=a(47),p=a(83),v=a(95),b=a(84),E=a(96),y=new(function(e){function t(){var e;return Object(p.a)(this,t),(e=Object(v.a)(this,Object(b.a)(t).call(this,"SainyoRecorderDatabase"))).items=void 0,e.totals=void 0,e.version(1).stores({items:"++id, date, datetime, timeRangeIndex,value",totals:"++id, date, timeRangeIndex, value, dateKey",values:"++id, value"}),e.items=e.table("items"),e.totals=e.table("totals"),e}return Object(E.a)(t,e),t}(a(85).a)),h=a(10),L=a.n(h),j=function(e){return Math.floor(L()(e).local().hour()/6)},A=a(45),_=a.n(A),S=function(){var e=Object(f.a)(T.a.mark(function e(t){var a;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.items.orderBy("datetime").limit(30).toArray();case 2:a=e.sent,t({type:n.SET_ITEMS,payload:{items:a}});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(f.a)(T.a.mark(function e(t){var a;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.totals.toArray();case 2:a=e.sent,t({type:n.SET_TOTALS,payload:{totals:a}});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(f.a)(T.a.mark(function e(t,a){var r,c,l,o;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.totals.get(Object(s.a)({},a));case 2:return r=e.sent,i=a.date,u=a.timeRangeIndex,c=L()(i).local().startOf("days").add(6*(u-1),"hours").format("YYYY-MM-DD"),e.next=6,y.items.where(Object(s.a)({},a)).toArray();case 6:return l=e.sent,o=_.a.sumBy(l,"value"),e.next=10,y.totals.put(Object(s.a)({},r,a,{value:o,dateKey:c}));case 10:t({type:n.LOAD_TOTALS});case 11:case"end":return e.stop()}var i,u},e)}));return function(t,a){return e.apply(this,arguments)}}(),x=function(e,t,a){switch(e.type){case n.PUT_ITEM:var r=e.payload.item,c=r.date,l=r.timeRangeIndex;y.items.put(r);var o={date:c,timeRangeIndex:l};return void t({type:n.CALC_TOTAL,payload:{query:o}});case n.LOAD_ITEMS:return void S(t);case n.CALC_TOTAL:return void I(t,e.payload.query);case n.LOAD_TOTALS:return void w(t)}},C=function(e,t,a,n){return function(r){t(r),a(r,n,e)}},M=Object(r.createContext)({state:u}),g=function(e){var t=e.children,a=function(e,t){var a=Object(i.a)(e,2),n=a[0],c=a[1],l=Object(r.useCallback)(C(n,c,t,function(e){l(e)}),[n,c]);return[n,l]}(Object(r.useReducer)(d,u),x),l=Object(i.a)(a,2),o=l[0],s=l[1];Object(r.useEffect)(function(){s({type:n.LOAD_ITEMS}),s({type:n.LOAD_TOTALS})},[]);var m={state:o,dispatch:s};return c.a.createElement(M.Provider,{value:m},t)},D=function(){var e,t=Object(r.useContext)(M).state,a=t.itemList,n=t.totalList,l=_.a.last(n);return c.a.createElement("table",{className:"table"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"\u65e5\u4ed8"),c.a.createElement("th",null,"\u6642\u9593"),c.a.createElement("th",{className:"text-right"},"\u63a1\u5c3f\u91cf"))),c.a.createElement("tbody",null,a.map(function(e){return c.a.createElement("tr",{key:e.datetime.getTime()},c.a.createElement("td",null,L()(e.datetime).local().format("MM/DD")),c.a.createElement("td",null,L()(e.datetime).local().format("HH:mm")),c.a.createElement("td",{className:"text-right"},e.value))}),l&&c.a.createElement("tr",{className:"table-info"},c.a.createElement("td",null,L()(l.date).format("MM/DD")),c.a.createElement("td",null,(e=l.timeRangeIndex,"".concat(L()().local().startOf("days").add(6*e,"hours").format("HH:mm"),"-").concat(L()().local().startOf("days").add(6*(e+1),"hours").format("HH:mm")))),c.a.createElement("td",{className:"text-right"},l.value))))},k=a(94),P=a(22),R=a(91),N=a.n(R),Y=a(92),H=a.n(Y),U=a(8),B=a.n(U),W=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),a=t[0],l=t[1],o=Object(r.useState)(new Date),u=Object(i.a)(o,2),s=u[0],m=u[1],d=Object(r.useState)(""),O=Object(i.a)(d,2),T=O[0],f=O[1],p=Object(r.useContext)(M),v=(p.state,p.dispatch),b=Object(r.useCallback)(function(){m(new Date),l(!0)},[l]),E=Object(r.useCallback)(function(){l(!1)},[l]),y=Object(r.useCallback)(function(e){m(e)},[m]),h=Object(r.useCallback)(function(e){f(e)},[f]),A=Object(r.useCallback)(function(){var e=Number(T)||0;if(e>0&&v){var t={datetime:s,date:L()(s).format("YYYY-MM-DD"),value:e,timeRangeIndex:j(s)};v({type:n.PUT_ITEM,payload:{item:t}}),f(""),l(!1)}},[v,s,T,l]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(k.a,{icon:"add",onClick:b,className:B()(H.a.top)}),c.a.createElement(P.e,{popup:!0,visible:a,animationType:"slide-up",onClose:E},c.a.createElement(P.d,{renderHeader:"\u63a1\u5c3f\u91cf\u5165\u529b"},c.a.createElement(P.b,{locale:N.a,value:s,onChange:y},c.a.createElement(P.d.Item,null,"\u65e5\u6642")),c.a.createElement(P.c,{type:"number",onChange:h,defaultValue:T},"\u63a1\u5c3f\u91cf"),c.a.createElement(P.d.Item,null,c.a.createElement(P.a,{onClick:A,type:"primary"},"\u767b\u9332")))))},q=function(){return c.a.createElement(g,null,c.a.createElement("div",{className:"container"},c.a.createElement("header",null,"\u63a1\u5c3f\u30ec\u30b3\u30fc\u30c0\u30fc"),c.a.createElement(D,null),c.a.createElement(W,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},92:function(e,t,a){e.exports={top:"InputButton_top__1PvaW"}},99:function(e,t,a){e.exports=a(190)}},[[99,1,2]]]);
//# sourceMappingURL=main.d7f7bfaf.chunk.js.map