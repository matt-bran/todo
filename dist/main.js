(()=>{"use strict";const e=document.getElementById("menu-list"),t=document.getElementById("content-header-title"),n=document.getElementById("overlay"),l=document.getElementById("add-task"),d=document.getElementById("close-btn"),s=document.getElementById("new-task-form");let i=[];0==window.localStorage.length?function(){const n=(l=[],{add:(e,t,n,d)=>l.push(((e,t,n,l)=>{const d=e,s=t,i=n,o=l;let a=!1;return{getTitle:()=>d,getDescription:()=>s,getDueDate:()=>i,getPriority:()=>o,getisComplete:()=>a,toggleisComplete:()=>{a=0==a}}})(e,t,n,d)),remove:e=>list.remove(e),getTitle:()=>"Uncategorized"});var l;i.push(n);const d=document.createElement("li");d.classList.add("active"),d.classList.add("list-item"),d.textContent=n.getTitle(),t.textContent=n.getTitle(),e.appendChild(d)}():fetchData(),l.addEventListener("click",(()=>{n.style.display="block"})),d.addEventListener("click",(()=>{n.style.display="none"})),s.addEventListener("submit",(e=>{e.preventDefault(),new FormData(s),s.reset(),n.style.display="none"}))})();