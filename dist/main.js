(()=>{"use strict";const t=(t,e,n,r)=>{let a=t,o=e,i=n,s=r,c=!1;return{getTitle:()=>a,getDescription:()=>o,getDueDate:()=>i,getPriority:()=>s,setTitle:t=>{a=t},setDescription:t=>{o=t},setDueDate:t=>{i=t},setPriority:t=>{s=t},getisComplete:()=>c,toggleisComplete:()=>{c=!c}}},e=(()=>{let e=[];return{createProject:n=>{e.push((e=>{const n=e;var r=[];const a=t=>{switch(t){case"low":return 0;case"medium":return 1;case"high":return 2}},o=t=>{for(let e=0;e<r.length;e++)if(r[e].getTitle()==t)return e;return-1};return{insert:e=>{let n=a(e.priority),o=new Date(0);if(""!=e.dueDate){const t=e.dueDate.split("-");o=new Date(t[0],t[1],t[2])}if(0!=r.length)for(let i=0;i<r.length;i++){if(n>a(r[i].getPriority()))return void r.splice(i,0,t(e.title,e.desc,o,e.priority));if(i==r.length-1)return void r.push(t(e.title,e.desc,o,e.priority));if(n>a(r[i+1].getPriority))return void r.splice(i+1,0,t(e.title,e.desc,o,e.priority))}else r.push(t(e.title,e.desc,o,e.priority))},remove:t=>{const e=o(t);r.splice(e,1)},getTitle:()=>n,getElementAt:t=>r[t],getElementIndexByTitle:o,getSize:()=>r.length}})(n))},getProject:t=>{for(let n=0;n<e.length;n++)if(e[n].getTitle()==t)return e[n]}}})(),n=function(t){e.createProject(t)},r=function(t,n){e.getProject(t).insert(n)},a=function(t,n,r){const a=e.getProject(t);for(let t=0;t<a.getSize();t++)if(n==a.getElementAt(t).getTitle())if(a.getElementAt(t).setTitle(r.title),a.getElementAt(t).setPriority(r.priority),a.getElementAt(t).setDescription(r.desc),""==r.dueDate)a.getElementAt(t).setDueDate(new Date(0));else{const e=r.dueDate.split("-");a.getElementAt(t).setDueDate(new Date(e[0],e[1],e[2]))}},o=function(t){const n=e.getProject(t);let r=[];for(let t=0;t<n.getSize();t++){const e=n.getElementAt(t);let a={name:e.getTitle(),dueDate:e.getDueDate(),priority:e.getPriority(),description:e.getDescription(),isComplete:e.getisComplete()};r.push(a)}return r},i=function(t,n){const r=e.getProject(t);for(let t=0;t<r.getSize();t++){const e=r.getElementAt(t);if(n==e.getTitle())return{title:e.getTitle(),dueDate:e.getDueDate(),priority:e.getPriority(),description:e.getDescription(),isComplete:e.getisComplete()}}},s=function(t,n){const r=e.getProject(t);for(let t=0;t<r.getSize();t++)if(n==r.getElementAt(t).getTitle())return r.remove(t),!0;return!1},c=function(t,n){const r=e.getProject(t);for(let t=0;t<r.getSize();t++){const e=r.getElementAt(t);if(n==e.getTitle())return e.toggleisComplete(),!0}return!1},u=function(t){const n=e.getProject(t);let r=0;for(let t=0;t<n.getSize();t++)n.getElementAt(t).getisComplete()&&(r+=1);return r},d=function(t){const n=e.getProject(t);console.log("List size before deletion: "+n.getSize());for(let t=n.getSize()-1;t>=0;t--)if(n.getElementAt(t).getisComplete()){const e=n.getElementAt(t).getTitle();n.remove(e)}};function l(t,e={},n=null){const r=document.createElement(t);(function(t){return t instanceof HTMLElement&&!(t instanceof HTMLUnknownElement)})(r)||console.warn(t+" is not a standard tag name.");for(const t in e)r.setAttribute(t,e[t]);return n&&(r.innerHTML=n),r}function m(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function h(t){if(!(e=t,e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)||"number"==typeof t))return!1;var e;const n=m(t);return!isNaN(Number(n))}const g={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function f(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const w={date:f({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:f({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:f({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},y={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function p(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,a=n?.width?String(n.width):e;r=t.formattingValues[a]||t.formattingValues[e]}else{const e=t.defaultWidth,a=n?.width?String(n.width):t.defaultWidth;r=t.values[a]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function b(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;const i=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let u;return u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:e.slice(i.length)}}}var v;const k={code:"en-US",formatDistance:(t,e,n)=>{let r;const a=g[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:w,formatRelative:(t,e,n,r)=>y[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:p({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:p({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:p({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:p({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:p({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(v={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(v.matchPattern);if(!n)return null;const r=n[0],a=t.match(v.parsePattern);if(!a)return null;let o=v.valueCallback?v.valueCallback(a[0]):a[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(r.length)}}),era:b({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:b({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:b({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:b({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:b({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let D={};function M(){return D}Math.pow(10,8);const C=6048e5,E=864e5;function S(t){const e=m(t);return e.setHours(0,0,0,0),e}function T(t){const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function x(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function P(t){const e=m(t);return function(t,e){const n=S(t),r=S(e),a=n.getTime()-T(n),o=r.getTime()-T(r);return Math.round((a-o)/E)}(e,function(t){const e=m(t),n=x(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e))+1}function L(t,e){const n=M(),r=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,a=m(t),o=a.getDay(),i=(o<r?7:0)+o-r;return a.setDate(a.getDate()-i),a.setHours(0,0,0,0),a}function W(t){return L(t,{weekStartsOn:1})}function q(t){const e=m(t),n=e.getFullYear(),r=x(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const a=W(r),o=x(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=W(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function O(t){const e=m(t),n=W(e).getTime()-function(t){const e=q(t),n=x(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),W(n)}(e).getTime();return Math.round(n/C)+1}function j(t,e){const n=m(t),r=n.getFullYear(),a=M(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=x(t,0);i.setFullYear(r+1,0,o),i.setHours(0,0,0,0);const s=L(i,e),c=x(t,0);c.setFullYear(r,0,o),c.setHours(0,0,0,0);const u=L(c,e);return n.getTime()>=s.getTime()?r+1:n.getTime()>=u.getTime()?r:r-1}function A(t,e){const n=m(t),r=L(n,e).getTime()-function(t,e){const n=M(),r=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,a=j(t,e),o=x(t,0);return o.setFullYear(a,0,r),o.setHours(0,0,0,0),L(o,e)}(n,e).getTime();return Math.round(r/C)+1}function B(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const F={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return B("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):B(n+1,2)},d:(t,e)=>B(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>B(t.getHours()%12||12,e.length),H:(t,e)=>B(t.getHours(),e.length),m:(t,e)=>B(t.getMinutes(),e.length),s:(t,e)=>B(t.getSeconds(),e.length),S(t,e){const n=e.length,r=t.getMilliseconds();return B(Math.floor(r*Math.pow(10,n-3)),e.length)}},N={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return F.y(t,e)},Y:function(t,e,n,r){const a=j(t,r),o=a>0?a:1-a;return"YY"===e?B(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):B(o,e.length)},R:function(t,e){return B(q(t),e.length)},u:function(t,e){return B(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return B(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return B(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return F.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return B(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=A(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):B(a,e.length)},I:function(t,e,n){const r=O(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):B(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):F.d(t,e)},D:function(t,e,n){const r=P(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):B(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return B(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return B(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return B(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return F.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):F.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):B(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):B(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):F.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):F.s(t,e)},S:function(t,e){return F.S(t,e)},X:function(t,e,n,r){const a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return H(a);case"XXXX":case"XX":return I(a);default:return I(a,":")}},x:function(t,e,n,r){const a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return H(a);case"xxxx":case"xx":return I(a);default:return I(a,":")}},O:function(t,e,n,r){const a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Y(a,":");default:return"GMT"+I(a,":")}},z:function(t,e,n,r){const a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Y(a,":");default:return"GMT"+I(a,":")}},t:function(t,e,n,r){const a=r._originalDate||t;return B(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return B((r._originalDate||t).getTime(),e.length)}};function Y(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;return 0===o?n+String(a):n+String(a)+e+B(o,2)}function H(t,e){return t%60==0?(t>0?"-":"+")+B(Math.abs(t)/60,2):I(t,e)}function I(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+B(Math.floor(r/60),2)+e+B(r%60,2)}const z=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},Q=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},G={p:Q,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return z(t,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",z(r,e)).replace("{{time}}",Q(a,e))}},X=/^D+$/,_=/^Y+$/,$=["D","DD","YY","YYYY"];function J(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),$.includes(t))throw new RangeError(r)}const U=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,R=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function tt(t,e){return+m(t)==+m(e)}const et=(()=>{function t(t){const e=document.querySelector(".active").textContent,n=t.children.item(0).children.item(0).children.item(0),r=n.nextElementSibling.textContent,a=i(e,r),o=t.children.item(0);if(a.isComplete){o.classList.add("strikethrough"),n.innerHTML="radio_button_checked";const t=o.nextElementSibling;"No description available..."!=t.textContent&&""!=t.textContent&&(t.style.textDecoration="line-through")}else o.classList.remove("strikethrough"),n.innerHTML="radio_button_unchecked",o.nextElementSibling.style.textDecoration="none"}return{showAddListForm:function(){document.getElementById("add-list").classList.add("hidden"),document.getElementById("new-list-form").classList.remove("hidden")},updateListMenu:function(t){const e=new FormData(t).get("new-project-title");n(e),document.getElementById("add-list").classList.remove("hidden"),t.classList.add("hidden");const r=l("li",{},e);document.getElementById("menu-list").append(r)},hideAddListForm:function(){document.getElementById("add-list").classList.remove("hidden"),document.getElementById("new-list-form").classList.add("hidden")},updateActiveProject:function(t){const e=document.getElementById("menu-list");Array.from(e.children).forEach((t=>t.classList.remove("active"))),t.classList.add("active")},refreshTaskContent:function(){const e=document.querySelector(".active").textContent,n=document.getElementById("tasks");n.innerHTML="",o(e).forEach((e=>{const r=function(t){const e=l("li",{class:"item"}),n=l("div",{class:"li-top"}),r=l("div",{class:"task-right"}),a=l("div",{class:"task-left"}),o=l("p",{},t.name),i=l("p",{class:"desc hidden"},t.description),s=l("span",{class:"material-symbols-outlined square"},"edit_square"),c=l("span",{class:"material-symbols-outlined delete"},"delete"),u=l("span",{class:"material-symbols-outlined radio"},"radio_button_unchecked"),d=t.dueDate;if(!tt(d,new Date(0))){const t="due "+function(t,e,n){const r=M(),a=n?.locale??r.locale??k,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=m(t);if(!h(s))throw new RangeError("Invalid time value");const c={firstWeekContainsDate:o,weekStartsOn:i,locale:a,_originalDate:s};return e.match(R).map((function(t){const e=t[0];return"p"===e||"P"===e?(0,G[e])(t,a.formatLong):t})).join("").match(U).map((function(r){if("''"===r)return"'";const o=r[0];if("'"===o)return function(t){const e=t.match(V);return e?e[1].replace(K,"'"):t}(r);const i=N[o];if(i)return!n?.useAdditionalWeekYearTokens&&(u=r,_.test(u))&&J(r,e,String(t)),!n?.useAdditionalDayOfYearTokens&&function(t){return X.test(t)}(r)&&J(r,e,String(t)),i(s,r,a.localize,c);var u;if(o.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+o+"`");return r})).join("")}(d,"MM/dd/yyyy");r.appendChild(l("p",{class:"task-date"},t))}const g=t.priority,f=l("p",{class:g},g);return a.appendChild(u),a.appendChild(o),r.appendChild(f),r.appendChild(s),r.appendChild(c),n.appendChild(a),n.appendChild(r),e.appendChild(n),e.appendChild(i),e}(e);t(r),n.appendChild(r)}));const r=u(e);document.getElementById("task-counter").textContent=r+" completed tasks",document.getElementById("list-content").classList.remove("hidden"),document.getElementById("content-header-title").textContent=e},showAddTaskOverlay:function(){document.getElementById("overlay").style.display="block",document.querySelector("#overlay-content form legend").textContent="New task",document.getElementById("submit-btn").textContent="Create task"},showEditTaskOverlay:function(t){const e=document.querySelector(".active").textContent,n=i(e,t.textContent);document.getElementById("overlay").style.display="block",document.querySelector("#overlay-content form legend").textContent="Edit task",document.getElementById("submit-btn").textContent="Save changes",document.querySelector("input#unedited-title").value=n.title,document.querySelector("input#title").value=n.title,document.querySelector("select#priority").value=n.priority,document.querySelector("textarea#desc").value=n.description,tt(n.dueDate,new Date(0))||(document.querySelector("input#duedate").valueAsDate=n.dueDate)},hideOverlay:function(){document.getElementById("overlay").style.display="none"},submitOverlay:function(t){const e=new FormData(t),n=e.get("title"),o=e.get("duedate"),i=e.get("priority"),s=e.get("desc"),c=document.querySelector(".active").textContent,u={title:n,dueDate:o,priority:i,desc:s};if("New task"==document.querySelector("#overlay-content form legend").textContent)r(c,u);else{const t=e.get("unedited-title");a(c,t,u)}t.reset()},toggleTaskDesc:function(t){const e=t.children.item(1);""==e.textContent&&(e.textContent="No description available...",e.style.color="#888",e.style.fontStyle="italic"),t.classList.contains("open")?(t.classList.remove("open"),e.classList.add("hidden")):(e.classList.remove("hidden"),t.classList.add("open"))},removeTaskFromList:function(t){const e=document.querySelector(".active").textContent;s(e,t.textContent)},toggleTaskCompletion:function(e){const n=document.querySelector(".active").textContent,r=e.nextElementSibling.textContent;c(n,r),t(e.parentElement.parentElement.parentElement);const a=u(n);document.getElementById("task-counter").textContent=a+" completed tasks"},strikeThroughListItem:t,clearCompletedTasks:function(){const t=document.querySelector(".active").textContent;d(t)}}})(),nt={handleOpenNewProjForm:()=>{document.getElementById("add-list").addEventListener("click",(t=>{et.showAddListForm()}))},handleCancelNewProjectForm:()=>{document.getElementById("cancel-list").addEventListener("click",(t=>{et.hideAddListForm()}))},handleSubmitNewProjectForm:()=>{document.getElementById("new-list-form").addEventListener("submit",(t=>{t.preventDefault(),et.updateListMenu(t.target)}))},handleClickProject:()=>{document.getElementById("menu-list").addEventListener("click",(t=>{t.target&&t.target.matches("li")&&(et.updateActiveProject(t.target),et.refreshTaskContent())}))}},rt={handleOpenNewTaskForm:()=>{document.getElementById("add-task").addEventListener("click",(()=>{et.showAddTaskOverlay()}))},handleCloseNewTaskForm:()=>{document.getElementById("close-btn").addEventListener("click",(()=>{et.hideOverlay()}))},handleSubmitNewTaskForm:()=>{document.getElementById("new-task-form").addEventListener("submit",(t=>{t.preventDefault(),et.submitOverlay(t.target),et.refreshTaskContent(),et.hideOverlay()}))},handleClearTasks:()=>{document.getElementById("clear-tasks").addEventListener("click",(()=>{et.clearCompletedTasks(),et.refreshTaskContent()}))},handleClickTask:()=>{document.getElementById("tasks").addEventListener("click",(t=>{if(t.target&&t.target.matches("li.item"))et.toggleTaskDesc(t.target);else if(t.target&&t.target.matches("span.square")){const e=t.target.parentElement.previousSibling.children.item(1);et.showEditTaskOverlay(e)}else if(t.target&&t.target.matches("span.delete")){const e=t.target.parentElement.previousSibling.children.item(1);et.removeTaskFromList(e),et.refreshTaskContent()}else t.target&&t.target.matches("span.radio")&&et.toggleTaskCompletion(t.target)}))}};0==window.localStorage.length?(Object.values(nt).forEach((t=>t())),Object.values(rt).forEach((t=>t()))):fetchData()})();
//# sourceMappingURL=main.js.map