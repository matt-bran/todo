(()=>{"use strict";const t=(t,e,n,a)=>{const r=t,o=e,i=n,s=a;let c=!1;return{getTitle:()=>r,getDescription:()=>o,getDueDate:()=>i,getPriority:()=>s,getisComplete:()=>c,toggleisComplete:()=>{c=0==c}}};function e(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function n(t){if(!(n=t,n instanceof Date||"object"==typeof n&&"[object Date]"===Object.prototype.toString.call(n)||"number"==typeof t))return!1;var n;const a=e(t);return!isNaN(Number(a))}const a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function r(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const o={date:r({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:r({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:r({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},i={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function s(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function c(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let u;return u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:e.slice(i.length)}}}var u;const d={code:"en-US",formatDistance:(t,e,n)=>{let r;const o=a[t];return r="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:o,formatRelative:(t,e,n,a)=>i[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:s({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:s({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:s({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:s({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:s({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(u.matchPattern);if(!n)return null;const a=n[0],r=t.match(u.parsePattern);if(!r)return null;let o=u.valueCallback?u.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let l={};function h(){return l}Math.pow(10,8);const m=6048e5,g=864e5;function f(t){const n=e(t);return n.setHours(0,0,0,0),n}function w(t){const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function b(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function p(t){const n=e(t);return function(t,e){const n=f(t),a=f(e),r=n.getTime()-w(n),o=a.getTime()-w(a);return Math.round((r-o)/g)}(n,function(t){const n=e(t),a=b(t,0);return a.setFullYear(n.getFullYear(),0,1),a.setHours(0,0,0,0),a}(n))+1}function y(t,n){const a=h(),r=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,o=e(t),i=o.getDay(),s=(i<r?7:0)+i-r;return o.setDate(o.getDate()-s),o.setHours(0,0,0,0),o}function v(t){return y(t,{weekStartsOn:1})}function M(t){const n=e(t),a=n.getFullYear(),r=b(t,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const o=v(r),i=b(t,0);i.setFullYear(a,0,4),i.setHours(0,0,0,0);const s=v(i);return n.getTime()>=o.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function k(t){const n=e(t),a=v(n).getTime()-function(t){const e=M(t),n=b(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),v(n)}(n).getTime();return Math.round(a/m)+1}function x(t,n){const a=e(t),r=a.getFullYear(),o=h(),i=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,s=b(t,0);s.setFullYear(r+1,0,i),s.setHours(0,0,0,0);const c=y(s,n),u=b(t,0);u.setFullYear(r,0,i),u.setHours(0,0,0,0);const d=y(u,n);return a.getTime()>=c.getTime()?r+1:a.getTime()>=d.getTime()?r:r-1}function D(t,n){const a=e(t),r=y(a,n).getTime()-function(t,e){const n=h(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=x(t,e),o=b(t,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),y(o,e)}(a,n).getTime();return Math.round(r/m)+1}function P(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const C={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return P("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):P(n+1,2)},d:(t,e)=>P(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>P(t.getHours()%12||12,e.length),H:(t,e)=>P(t.getHours(),e.length),m:(t,e)=>P(t.getMinutes(),e.length),s:(t,e)=>P(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return P(Math.floor(a*Math.pow(10,n-3)),e.length)}},S={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return C.y(t,e)},Y:function(t,e,n,a){const r=x(t,a),o=r>0?r:1-r;return"YY"===e?P(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):P(o,e.length)},R:function(t,e){return P(M(t),e.length)},u:function(t,e){return P(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return P(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return P(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return C.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return P(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=D(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):P(r,e.length)},I:function(t,e,n){const a=k(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):P(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):C.d(t,e)},D:function(t,e,n){const a=p(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):P(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return P(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return P(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return P(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return C.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):C.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):P(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):P(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):C.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):C.s(t,e)},S:function(t,e){return C.S(t,e)},X:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return E(r);case"XXXX":case"XX":return W(r);default:return W(r,":")}},x:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return E(r);case"xxxx":case"xx":return W(r);default:return W(r,":")}},O:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+T(r,":");default:return"GMT"+W(r,":")}},z:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+T(r,":");default:return"GMT"+W(r,":")}},t:function(t,e,n,a){const r=a._originalDate||t;return P(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return P((a._originalDate||t).getTime(),e.length)}};function T(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+P(o,2)}function E(t,e){return t%60==0?(t>0?"-":"+")+P(Math.abs(t)/60,2):W(t,e)}function W(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+P(Math.floor(a/60),2)+e+P(a%60,2)}const L=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},N=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},Y={p:N,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return L(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",L(a,e)).replace("{{time}}",N(r,e))}},q=/^D+$/,O=/^Y+$/,H=["D","DD","YY","YYYY"];function F(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(a),H.includes(t))throw new RangeError(a)}const j=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,A=/^'([^]*?)'?$/,B=/''/g,Q=/[a-zA-Z]/;function G(t,a,r){const o=h(),i=r?.locale??o.locale??d,s=r?.firstWeekContainsDate??r?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,c=r?.weekStartsOn??r?.locale?.options?.weekStartsOn??o.weekStartsOn??o.locale?.options?.weekStartsOn??0,u=e(t);if(!n(u))throw new RangeError("Invalid time value");const l={firstWeekContainsDate:s,weekStartsOn:c,locale:i,_originalDate:u};return a.match(z).map((function(t){const e=t[0];return"p"===e||"P"===e?(0,Y[e])(t,i.formatLong):t})).join("").match(j).map((function(e){if("''"===e)return"'";const n=e[0];if("'"===n)return function(t){const e=t.match(A);return e?e[1].replace(B,"'"):t}(e);const o=S[n];if(o)return!r?.useAdditionalWeekYearTokens&&(s=e,O.test(s))&&F(e,a,String(t)),!r?.useAdditionalDayOfYearTokens&&function(t){return q.test(t)}(e)&&F(e,a,String(t)),o(u,e,i.localize,l);var s;if(n.match(Q))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return e})).join("")}const X=document.getElementById("menu-list"),I=document.getElementById("content-header-title"),$=document.getElementById("overlay"),J=document.getElementById("add-task"),_=document.getElementById("close-btn"),U=document.getElementById("new-task-form"),R=document.getElementById("tasks");let V=[];function K(t){R.innerHTML="";for(let r=0;r<t.getSize();r++){const o=document.createElement("li");o.classList.add("item");const i=document.createElement("p"),s=t.getElementAt(r).getTitle();i.textContent=s;const c=document.createElement("div");c.classList.add("task-right");const u=document.createElement("div");u.classList.add("task-left");const d=document.createElement("p");d.classList.add("task-date");const l=t.getElementAt(r).getDueDate();n=l,a=new Date(0),+e(n)==+e(a)||(d.textContent="due "+G(l,"MM/dd/yyyy"),c.appendChild(d));const h=t.getElementAt(r).getPriority(),m=document.createElement("p");switch(h){case 0:m.style.color="#888",m.textContent="Low";break;case 1:m.style.color="#0baeb9",m.textContent="Medium";break;case 2:m.style.color="#b84646",m.textContent="High"}const g=document.createElement("span");g.classList.add("material-symbols-outlined"),g.classList.add("square"),g.textContent="edit_square";const f=document.createElement("span");f.classList.add("material-symbols-outlined"),f.classList.add("expand"),f.textContent="expand_more";const w=document.createElement("p");w.classList.add("hidden-desc"),w.classList.add("desc"),w.textContent=t.getElementAt(r).getDescription();const b=document.createElement("div");b.classList.add("li-top"),u.appendChild(f),u.appendChild(i),c.appendChild(m),c.appendChild(g),b.appendChild(u),b.appendChild(c),o.appendChild(b),o.appendChild(w),R.appendChild(o)}var n,a}0==window.localStorage.length?function(){const e=(n=[],{insert:(e,a,r,o)=>{let i=-1,s=new Date(0);if(""!=r){const t=r.split("-");s=new Date(t[0],t[1],t[2])}switch(console.log(o),o){case"low":i=0;break;case"medium":i=1;break;case"high":i=2}if(0!=n.length)for(let r=0;r<n.length;r++){if(i>n[r].getPriority())return void n.splice(r,0,t(e,a,s,i));if(r==n.length-1)return void n.push(t(e,a,s,i));if(i>n[r+1].getPriority)return void n.splice(r+1,0,t(e,a,s,i))}else n.push(t(e,a,s,i))},remove:t=>list.remove(t),getTitle:()=>"Uncategorized",getElementAt:t=>n[t],getSize:()=>n.length});var n;V.push(e);const a=document.createElement("li");a.classList.add("active"),a.classList.add("list-item"),a.textContent=e.getTitle(),I.textContent=e.getTitle(),X.appendChild(a)}():fetchData(),J.addEventListener("click",(()=>{$.style.display="block"})),_.addEventListener("click",(()=>{$.style.display="none"})),R.addEventListener("click",(t=>{if(console.log(t.target),t.target&&t.target.matches("span.expand")){const e=t.target.parentNode.parentNode.parentNode.children.item(1);"No description available..."==e.textContent&&(e.style.color="#888"),t.target.classList.contains("open")?(t.target.classList.remove("open"),t.target.parentNode.parentNode.parentNode.children.item(1).classList.add("hidden-desc")):(t.target.parentNode.parentNode.parentNode.children.item(1).classList.remove("hidden-desc"),t.target.classList.add("open"))}})),U.addEventListener("submit",(t=>{t.preventDefault();const e=new FormData(U),n=e.get("title"),a=e.get("duedate"),r=e.get("priority");let o=e.get("desc");""==o&&(o="No description available...");const i=document.querySelector(".active").textContent;for(let t=0;t<V.length;t++)V[t].getTitle()==i&&(V[t].insert(n,o,a,r),K(V[t]));U.reset(),$.style.display="none"}))})();
//# sourceMappingURL=main.js.map