(()=>{"use strict";function t(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function e(e){const n=t(e);return n.setHours(0,0,0,0),n}function n(t){return n=t,r=Date.now(),+e(n)==+e(r);var n,r}function r(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function o(e,n){const{years:o=0,months:a=0,weeks:i=0,days:s=0,hours:c=0,minutes:l=0,seconds:u=0}=n,d=t(e),m=a||o?function(e,n){const o=t(e);if(isNaN(n))return r(e,NaN);if(!n)return o;const a=o.getDate(),i=r(e,o.getTime());return i.setMonth(o.getMonth()+n+1,0),a>=i.getDate()?i:(o.setFullYear(i.getFullYear(),i.getMonth(),a),o)}(d,a+12*o):d,g=1e3*(u+60*(l+60*c));return r(e,(s||i?function(e,n){const o=t(e);return isNaN(n)?r(e,NaN):n?(o.setDate(o.getDate()+n),o):o}(m,s+7*i):m).getTime()+g)}const a=(t,e,n,r,o,a)=>{let i=t,s=e,c=n,l=r,u=o,d=a;return{getId:()=>i,getTitle:()=>s,getDescription:()=>c,getDueDate:()=>l,getPriority:()=>u,setTitle:t=>{s=t},setDescription:t=>{c=t},setDueDate:t=>{l=t},setPriority:t=>{u=t},getisComplete:()=>d,toggleisComplete:()=>{d=!d}}},i=(()=>{let t=[];return{createProject:e=>{t.push((t=>{let e=-1;const n=t;var r=[];const o=t=>{switch(t){case"low":return 0;case"medium":return 1;case"high":return 2}};return{insert:(t,n,i,s,c=!1)=>{e+=1;let l=o(i),u=new Date(0);if(""!=n){const t=n.split("-");u=new Date(t[0],parseInt(t[1])-1,t[2])}if(0!=r.length)for(let n=0;n<r.length;n++){if(l>o(r[n].getPriority()))return void r.splice(n,0,a(e,t,s,u,i,c));if(n==r.length-1)return void r.push(a(e,t,s,u,i,c));if(l>o(r[n+1].getPriority))return void r.splice(n+1,0,a(e,t,s,u,i,c))}else r.push(a(e,t,s,u,i,c))},remove:t=>{const e=(t=>{for(let e=0;e<r.length;e++)if(r[e].getId()==t)return e;return-1})(t);r.splice(e,1)},getTitle:()=>n,getElementAt:t=>r[t],getSize:()=>r.length,exportData:()=>{let t=[];for(let e=0;e<r.length;e++){const n=r[e].getDueDate();t.push({title:r[e].getTitle(),dueDate:`${n.getFullYear()}-${parseInt(n.getMonth())+1}-${n.getDate()}`,priority:r[e].getPriority(),description:r[e].getDescription(),isComplete:r[e].getisComplete()})}return t}}})(e))},getProjectByIndex:e=>t[e],getProject:e=>{for(let n=0;n<t.length;n++)if(t[n].getTitle()==e)return t[n]},getSize:()=>t.length,remove:e=>{for(let n=0;n<t.length;n++)t[n].getTitle()==e&&t.splice(n,1)}}})();function s(t,e={},n=null){const r=document.createElement(t);(function(t){return t instanceof HTMLElement&&!(t instanceof HTMLUnknownElement)})(r)||console.warn(t+" is not a standard tag name.");for(const t in e)r.setAttribute(t,e[t]);return n&&(r.innerHTML=n),r}function c(t,e){let n=window.localStorage.getItem("order");null!=n?(n=JSON.parse(n),function(t,e){for(let n=0;n<t.length;n++)if(t[n]==e)return!0;return!1}(n,t)||n.push(t),window.localStorage.setItem("order",JSON.stringify(n))):window.localStorage.setItem("order",JSON.stringify([t])),window.localStorage.setItem(t,JSON.stringify(e))}const l=(()=>{function t(t){i.createProject(t),c(t,i.getProject(t).exportData())}function r(t,e){const n=i.getProject(t);null!=e.isComplete?n.insert(e.title,e.dueDate,e.priority,e.description,e.isComplete):n.insert(e.title,e.dueDate,e.priority,e.description),c(t,i.getProject(t).exportData())}return{createNewProject:t,createNewTask:r,editTask:function(t,e,n){const r=i.getProject(t);for(let o=0;o<r.getSize();o++)if(e==r.getElementAt(o).getId()){if(r.getElementAt(o).setTitle(n.title),r.getElementAt(o).setPriority(n.priority),r.getElementAt(o).setDescription(n.description),""==n.dueDate)r.getElementAt(o).setDueDate(new Date(0));else{const t=n.dueDate.split("-");r.getElementAt(o).setDueDate(new Date(t[0],parseInt(t[1])-1,t[2]))}return void c(t,i.getProject(t).exportData())}},readProjectAllTasks:function(t){const e=i.getProject(t);let n=[];for(let r=0;r<e.getSize();r++){const o=e.getElementAt(r);let a={id:o.getId(),title:o.getTitle(),dueDate:o.getDueDate(),priority:o.getPriority(),description:o.getDescription(),isComplete:o.getisComplete(),project_title:t};n.push(a)}return n},readProjectTask:function(t,e){const n=i.getProject(t);for(let r=0;r<n.getSize();r++){const o=n.getElementAt(r);if(e==o.getId())return{id:o.getId(),title:o.getTitle(),dueDate:o.getDueDate(),priority:o.getPriority(),description:o.getDescription(),isComplete:o.getisComplete(),project_title:t}}},deleteProjectTask:function(t,e){const n=i.getProject(t);for(let r=0;r<n.getSize();r++)if(e==n.getElementAt(r).getId())return n.remove(e),c(t,i.getProject(t).exportData()),!0;return!1},toggleTask:function(t,e){const n=i.getProject(t);for(let r=0;r<n.getSize();r++){const o=n.getElementAt(r);if(e==o.getId())return o.toggleisComplete(),c(t,i.getProject(t).exportData()),!0}return!1},queryCompleteCount:function(t){const e=i.getProject(t);let n=0;for(let t=0;t<e.getSize();t++)e.getElementAt(t).getisComplete()&&(n+=1);return n},deleteProjectCompleteTasks:function(t){const e=i.getProject(t);for(let n=e.getSize()-1;n>=0;n--)if(e.getElementAt(n).getisComplete()){const r=e.getElementAt(n).getId();e.remove(r),c(t,i.getProject(t).exportData())}},queryAllTasksByCompletion:function(t){let e=[];for(let n=0;n<i.getSize();n++){const r=i.getProjectByIndex(n);for(let n=0;n<r.getSize();n++){const o=r.getElementAt(n);t==o.getisComplete()&&e.push({project_title:r.getTitle(),id:o.getId(),title:o.getTitle(),dueDate:o.getDueDate(),priority:o.getPriority(),description:o.getDescription(),isComplete:o.getisComplete()})}}return e},queryAllTasksByPriority:function(t){let e=[];for(let n=0;n<i.getSize();n++){const r=i.getProjectByIndex(n);for(let n=0;n<r.getSize();n++){const o=r.getElementAt(n);t==o.getPriority()&&e.push({project_title:r.getTitle(),id:o.getId(),title:o.getTitle(),dueDate:o.getDueDate(),priority:o.getPriority(),description:o.getDescription(),isComplete:o.getisComplete()})}}return e},queryAllTasksToday:function(){let t=[];for(let e=0;e<i.getSize();e++){const r=i.getProjectByIndex(e);for(let e=0;e<r.getSize();e++){const o=r.getElementAt(e);n(o.getDueDate())&&t.push({project_title:r.getTitle(),id:o.getId(),title:o.getTitle(),dueDate:o.getDueDate(),priority:o.getPriority(),description:o.getDescription(),isComplete:o.getisComplete()})}}return t},queryAllTasksWeek:function(){let t=[];for(let n=0;n<i.getSize();n++){const r=i.getProjectByIndex(n);for(let n=0;n<r.getSize();n++){const a=r.getElementAt(n),i=a.getDueDate().getTime();i>=e(Date.now()).getTime()&&i<=o(Date.now(),{weeks:1}).getTime()&&t.push({project_title:r.getTitle(),id:a.getId(),title:a.getTitle(),dueDate:a.getDueDate(),priority:a.getPriority(),description:a.getDescription(),isComplete:a.getisComplete()})}}return t},importProjects:function(){(function(){let t=[];const e=JSON.parse(window.localStorage.getItem("order"));for(let n=0;n<e.length;n++){let r=window.localStorage.getItem(e[n]);t.push({key:e[n],value:JSON.parse(r)})}return t})().forEach((e=>{const n=e.key,o=e.value;t(n),o.forEach((t=>{r(n,{title:t.title,dueDate:t.dueDate,priority:t.priority,description:t.description,isComplete:t.isComplete})}))}))},readAllProjectTitles:function(){let t=[];for(let e=0;e<i.getSize();e++)t.push(i.getProjectByIndex(e).getTitle());return t},removeProject:function(t){i.remove(t),function(t){window.localStorage.removeItem(t);let e=window.localStorage.getItem("order");e=JSON.parse(e);for(let n=0;n<e.length;n++)e[n]==t&&e.splice(n,1);window.localStorage.setItem("order",JSON.stringify(e))}(t)}}})(),u=(()=>{function t(){document.getElementById("add-list").classList.remove("hidden"),document.getElementById("new-list-form").classList.add("hidden"),document.getElementById("error").classList.add("hidden")}function e(){document.querySelectorAll("li.project").forEach((t=>t.remove()));const t=l.readAllProjectTitles();for(let e=0;e<t.length;e++){const n=s("p",{},t[e]),r=s("span",{class:"material-symbols-outlined close"},"close"),o=s("li",{class:"project tab"});o.appendChild(n),o.append(r),document.getElementById("menu-list").append(o)}}return{showAddListForm:function(){document.getElementById("add-list").classList.add("hidden"),document.getElementById("new-list-form").classList.remove("hidden")},hideAddListForm:t,renderProjectsList:e,SubmitNewProjectForm:function(n){const r=new FormData(n).get("new-project-title"),o=document.querySelectorAll("li.project");let a=!1;for(let t=0;t<o.length;t++)if(o.item(t).children.item(0).textContent==r){a=!0;break}var i;a?(document.getElementById("error").classList.remove("hidden"),(i=document.getElementById("error")).classList.remove("animate"),requestAnimationFrame((t=>{requestAnimationFrame((t=>{i.classList.add("animate")}))}))):(l.createNewProject(r),t(),e(),document.getElementById("error").classList.add("hidden"))},updateActiveTab:function(t){const e=document.getElementById("menu-list");Array.from(e.children).forEach((t=>t.classList.remove("active"))),t.classList.add("active")},removeProject:function(t){const n=t.previousSibling;l.removeProject(n.textContent),e()}}})();function d(e){if(!(n=e,n instanceof Date||"object"==typeof n&&"[object Date]"===Object.prototype.toString.call(n)||"number"==typeof e))return!1;var n;const r=t(e);return!isNaN(Number(r))}const m={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function g(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const h={date:g({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:g({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:g({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},f={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function p(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,o=n?.width?String(n.width):e;r=t.formattingValues[o]||t.formattingValues[e]}else{const e=t.defaultWidth,o=n?.width?String(n.width):t.defaultWidth;r=t.values[o]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function y(t){return(e,n={})=>{const r=n.width,o=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],a=e.match(o);if(!a)return null;const i=a[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let l;return l=t.valueCallback?t.valueCallback(c):c,l=n.valueCallback?n.valueCallback(l):l,{value:l,rest:e.slice(i.length)}}}var w;const b={code:"en-US",formatDistance:(t,e,n)=>{let r;const o=m[t];return r="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:h,formatRelative:(t,e,n,r)=>f[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:p({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:p({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:p({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:p({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:p({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(w={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(w.matchPattern);if(!n)return null;const r=n[0],o=t.match(w.parsePattern);if(!o)return null;let a=w.valueCallback?w.valueCallback(o[0]):o[0];return a=e.valueCallback?e.valueCallback(a):a,{value:a,rest:t.slice(r.length)}}),era:y({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:y({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:y({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:y({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:y({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let k={};function v(){return k}Math.pow(10,8);const D=6048e5,T=864e5;function P(t){const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function C(n){const o=t(n);return function(t,n){const r=e(t),o=e(n),a=r.getTime()-P(r),i=o.getTime()-P(o);return Math.round((a-i)/T)}(o,function(e){const n=t(e),o=r(e,0);return o.setFullYear(n.getFullYear(),0,1),o.setHours(0,0,0,0),o}(o))+1}function S(e,n){const r=v(),o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,a=t(e),i=a.getDay(),s=(i<o?7:0)+i-o;return a.setDate(a.getDate()-s),a.setHours(0,0,0,0),a}function j(t){return S(t,{weekStartsOn:1})}function E(e){const n=t(e),o=n.getFullYear(),a=r(e,0);a.setFullYear(o+1,0,4),a.setHours(0,0,0,0);const i=j(a),s=r(e,0);s.setFullYear(o,0,4),s.setHours(0,0,0,0);const c=j(s);return n.getTime()>=i.getTime()?o+1:n.getTime()>=c.getTime()?o:o-1}function M(e){const n=t(e),o=j(n).getTime()-function(t){const e=E(t),n=r(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),j(n)}(n).getTime();return Math.round(o/D)+1}function x(e,n){const o=t(e),a=o.getFullYear(),i=v(),s=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,c=r(e,0);c.setFullYear(a+1,0,s),c.setHours(0,0,0,0);const l=S(c,n),u=r(e,0);u.setFullYear(a,0,s),u.setHours(0,0,0,0);const d=S(u,n);return o.getTime()>=l.getTime()?a+1:o.getTime()>=d.getTime()?a:a-1}function I(e,n){const o=t(e),a=S(o,n).getTime()-function(t,e){const n=v(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,a=x(t,e),i=r(t,0);return i.setFullYear(a,0,o),i.setHours(0,0,0,0),S(i,e)}(o,n).getTime();return Math.round(a/D)+1}function L(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const A={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return L("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):L(n+1,2)},d:(t,e)=>L(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>L(t.getHours()%12||12,e.length),H:(t,e)=>L(t.getHours(),e.length),m:(t,e)=>L(t.getMinutes(),e.length),s:(t,e)=>L(t.getSeconds(),e.length),S(t,e){const n=e.length,r=t.getMilliseconds();return L(Math.floor(r*Math.pow(10,n-3)),e.length)}},q={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return A.y(t,e)},Y:function(t,e,n,r){const o=x(t,r),a=o>0?o:1-o;return"YY"===e?L(a%100,2):"Yo"===e?n.ordinalNumber(a,{unit:"year"}):L(a,e.length)},R:function(t,e){return L(E(t),e.length)},u:function(t,e){return L(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return L(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return L(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return A.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return L(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const o=I(t,r);return"wo"===e?n.ordinalNumber(o,{unit:"week"}):L(o,e.length)},I:function(t,e,n){const r=M(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):L(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):A.d(t,e)},D:function(t,e,n){const r=C(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):L(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const o=t.getDay(),a=(o-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(a);case"ee":return L(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(o,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(o,{width:"short",context:"formatting"});default:return n.day(o,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const o=t.getDay(),a=(o-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(a);case"cc":return L(a,e.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(o,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(o,{width:"narrow",context:"standalone"});case"cccccc":return n.day(o,{width:"short",context:"standalone"});default:return n.day(o,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),o=0===r?7:r;switch(e){case"i":return String(o);case"ii":return L(o,e.length);case"io":return n.ordinalNumber(o,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let o;switch(o=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(o,{width:"narrow",context:"formatting"});default:return n.dayPeriod(o,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let o;switch(o=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(o,{width:"narrow",context:"formatting"});default:return n.dayPeriod(o,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return A.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):A.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):L(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):L(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):A.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):A.s(t,e)},S:function(t,e){return A.S(t,e)},X:function(t,e,n,r){const o=(r._originalDate||t).getTimezoneOffset();if(0===o)return"Z";switch(e){case"X":return N(o);case"XXXX":case"XX":return W(o);default:return W(o,":")}},x:function(t,e,n,r){const o=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return N(o);case"xxxx":case"xx":return W(o);default:return W(o,":")}},O:function(t,e,n,r){const o=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+B(o,":");default:return"GMT"+W(o,":")}},z:function(t,e,n,r){const o=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+B(o,":");default:return"GMT"+W(o,":")}},t:function(t,e,n,r){const o=r._originalDate||t;return L(Math.floor(o.getTime()/1e3),e.length)},T:function(t,e,n,r){return L((r._originalDate||t).getTime(),e.length)}};function B(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),o=Math.floor(r/60),a=r%60;return 0===a?n+String(o):n+String(o)+e+L(a,2)}function N(t,e){return t%60==0?(t>0?"-":"+")+L(Math.abs(t)/60,2):W(t,e)}function W(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+L(Math.floor(r/60),2)+e+L(r%60,2)}const F=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},O=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},Y={p:O,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],o=n[2];if(!o)return F(t,e);let a;switch(r){case"P":a=e.dateTime({width:"short"});break;case"PP":a=e.dateTime({width:"medium"});break;case"PPP":a=e.dateTime({width:"long"});break;default:a=e.dateTime({width:"full"})}return a.replace("{{date}}",F(r,e)).replace("{{time}}",O(o,e))}},z=/^D+$/,_=/^Y+$/,H=["D","DD","YY","YYYY"];function Q(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),H.includes(t))throw new RangeError(r)}const J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,G=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,X=/^'([^]*?)'?$/,$=/''/g,U=/[a-zA-Z]/;function V(e,n){return+t(e)==+t(n)}const R=(()=>{function n(t){const e=t.children.item(0).children.item(0).children.item(0),n=t.children.item(0),r=t.data.project_title,o=t.data.task_id;if(l.readProjectTask(r,o).isComplete){n.classList.add("strikethrough"),e.innerHTML="radio_button_checked";const r=n.nextElementSibling;"No description available..."!=r.textContent&&""!=r.textContent&&(r.style.textDecoration="line-through"),t.data.isComplete="true"}else n.classList.remove("strikethrough"),e.innerHTML="radio_button_unchecked",n.nextElementSibling.style.textDecoration="none",t.data.isComplete="false"}return{refreshTaskContent:function(){let r=[];const o=document.querySelector(".active");if(o.classList.contains("filter"))switch(document.getElementById("add-task").classList.add("hidden"),document.getElementById("content-btns").style.justifyContent="flex-end",document.getElementById("content-header-title").textContent=o.children.item(1).textContent,o.id){case"today":r=l.queryAllTasksToday();break;case"week":r=l.queryAllTasksWeek();break;case"complete":r=l.queryAllTasksByCompletion(!0);break;case"incomplete":r=l.queryAllTasksByCompletion(!1);break;case"high":r=l.queryAllTasksByPriority("high");break;case"medium":r=l.queryAllTasksByPriority("medium");break;case"low":r=l.queryAllTasksByPriority("low")}else if(o.classList.contains("project")){document.getElementById("add-task").classList.remove("hidden"),document.getElementById("content-btns").style.justifyContent="space-between",document.getElementById("content-header-title").textContent=o.children.item(0).textContent;const t=document.querySelector(".active.project p").textContent;r=l.readProjectAllTasks(t)}const a=document.getElementById("tasks");a.innerHTML="";let i=0;r.forEach((r=>{const o=function(n){const r=s("li",{class:"item"}),o=s("div",{class:"li-top"}),a=s("div",{class:"task-right"}),i=s("div",{class:"task-left"}),c=s("p",{},n.title),l=s("p",{class:"desc hidden"},n.description),u=s("span",{class:"material-symbols-outlined square"},"edit_square"),m=s("span",{class:"material-symbols-outlined delete"},"delete"),g=s("span",{class:"material-symbols-outlined radio"},"radio_button_unchecked"),h=n.dueDate;if(!V(e(h),e(new Date(0)))){const e="due "+function(e,n,r){const o=v(),a=r?.locale??o.locale??b,i=r?.firstWeekContainsDate??r?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,s=r?.weekStartsOn??r?.locale?.options?.weekStartsOn??o.weekStartsOn??o.locale?.options?.weekStartsOn??0,c=t(e);if(!d(c))throw new RangeError("Invalid time value");const l={firstWeekContainsDate:i,weekStartsOn:s,locale:a,_originalDate:c};return n.match(G).map((function(t){const e=t[0];return"p"===e||"P"===e?(0,Y[e])(t,a.formatLong):t})).join("").match(J).map((function(t){if("''"===t)return"'";const o=t[0];if("'"===o)return function(t){const e=t.match(X);return e?e[1].replace($,"'"):t}(t);const i=q[o];if(i)return!r?.useAdditionalWeekYearTokens&&(s=t,_.test(s))&&Q(t,n,String(e)),!r?.useAdditionalDayOfYearTokens&&function(t){return z.test(t)}(t)&&Q(t,n,String(e)),i(c,t,a.localize,l);var s;if(o.match(U))throw new RangeError("Format string contains an unescaped latin alphabet character `"+o+"`");return t})).join("")}(h,"MM/dd/yyyy");a.appendChild(s("p",{class:"task-date"},e))}const f=n.priority,p=s("p",{class:f},f);if(i.appendChild(g),i.appendChild(c),document.querySelector("#menu-list .active").classList.contains("filter")){const t=s("p",{class:"project-link"},`(${n.project_title})`);i.appendChild(t)}return a.appendChild(p),a.appendChild(u),a.appendChild(m),o.appendChild(i),o.appendChild(a),r.appendChild(o),r.appendChild(l),r.data={project_title:n.project_title,task_id:n.id,isComplete:"false"},r}(r);n(o),a.appendChild(o),r.isComplete&&(i+=1)})),document.getElementById("task-counter").textContent=i+" completed tasks",document.getElementById("list-content").classList.remove("hidden")},toggleTaskDesc:function(t){const e=t.children.item(1);""==e.textContent&&(e.textContent="No description available...",e.style.color="#888",e.style.fontStyle="italic"),t.classList.contains("open")?(t.classList.remove("open"),e.classList.add("hidden")):(e.classList.remove("hidden"),t.classList.add("open"))},removeTask:function(t){l.deleteProjectTask(t.data.project_title,t.data.task_id)},toggleTaskCompletion:function(t){l.toggleTask(t.data.project_title,t.data.task_id),n(t);let e=0;Array.from(t.parentElement.children).forEach((t=>{"true"==t.data.isComplete&&(e+=1)})),document.getElementById("task-counter").textContent=e+" completed tasks"},strikeThroughListItem:n,clearCompletedTasks:function(){const t=document.querySelector("ul#tasks");Array.from(t.children).forEach((t=>{"true"==t.data.isComplete&&l.deleteProjectTask(t.data.project_title,t.data.task_id)}))},hideView:function(){document.getElementById("list-content").classList.add("hidden")}}})(),K=function(){document.getElementById("overlay").style.display="block",document.querySelector("#overlay-content form legend").textContent="New task",document.getElementById("submit-btn").textContent="Create task"},Z=function(t){const n=l.readProjectTask(t.data.project_title,t.data.task_id);document.getElementById("overlay").style.display="block",document.querySelector("#overlay-content form legend").textContent="Edit task",document.getElementById("submit-btn").textContent="Save changes",document.querySelector("input#edit-form-proj-title").value=n.project_title,document.querySelector("input#task-id").value=n.id,document.querySelector("input#title").value=n.title,document.querySelector("select#priority").value=n.priority,document.querySelector("textarea#desc").value=n.description,V(e(n.dueDate),e(new Date(0)))||(document.querySelector("input#duedate").valueAsDate=n.dueDate)},tt=function(){document.getElementById("overlay").style.display="none"},et=function(t){const e=new FormData(t),n={title:e.get("title"),dueDate:e.get("duedate"),priority:e.get("priority"),description:e.get("desc")};if("New task"==document.querySelector("#overlay-content form legend").textContent){const t=document.querySelector(".active.project p").textContent;l.createNewTask(t,n)}else{const t=e.get("task-id"),r=e.get("project-title");l.editTask(r,t,n)}t.reset()},nt={handleOpenNewProjForm:()=>{document.getElementById("add-list").addEventListener("click",(t=>{u.showAddListForm()}))},handleCancelNewProjectForm:()=>{document.getElementById("cancel-list").addEventListener("click",(t=>{u.hideAddListForm()}))},handleSubmitNewProjectForm:()=>{document.getElementById("new-list-form").addEventListener("submit",(t=>{t.preventDefault(),u.SubmitNewProjectForm(t.target)}))},handleClickTab:()=>{document.getElementById("menu").addEventListener("click",(t=>{t.target.matches(".project span")?(u.removeProject(t.target),R.hideView()):(t.target.matches(".project")||t.target.matches(".filter"))&&(u.updateActiveTab(t.target),R.refreshTaskContent())}))}},rt={handleOpenNewTaskForm:()=>{document.getElementById("add-task").addEventListener("click",(()=>{K()}))},handleCloseNewTaskForm:()=>{document.getElementById("close-btn").addEventListener("click",(()=>{tt()}))},handleSubmitNewTaskForm:()=>{document.getElementById("new-task-form").addEventListener("submit",(t=>{t.preventDefault(),et(t.target),R.refreshTaskContent(),tt()}))},handleClearTasks:()=>{document.getElementById("clear-tasks").addEventListener("click",(()=>{R.clearCompletedTasks(),R.refreshTaskContent()}))},handleClickTask:()=>{document.getElementById("tasks").addEventListener("click",(t=>{if(t.target&&t.target.matches("li.item"))R.toggleTaskDesc(t.target);else if(t.target&&t.target.matches("span.square")){const e=t.target.closest("li");Z(e)}else t.target&&t.target.matches("span.delete")?(R.removeTask(t.target.closest("li")),R.refreshTaskContent()):t.target&&t.target.matches("span.radio")&&R.toggleTaskCompletion(t.target.closest("li"))}))}};Object.values(nt).forEach((t=>t())),Object.values(rt).forEach((t=>t())),window.localStorage.length>0&&(l.importProjects(),u.renderProjectsList())})();
//# sourceMappingURL=main.js.map