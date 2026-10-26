(()=>{
'use strict';
const KEY='serendib_cookie_choice_v1';
const config=window.SERENDIB_CONFIG||{};
const dl=window.dataLayer=window.dataLayer||[];
let consent={analytics:false,marketing:false};
let loaded=false;
function validGtm(){return /^GTM-[A-Z0-9]+$/.test(config.gtmId||'')&&!/^GTM-X+$/.test(config.gtmId||'')}
function track(event,props={}) { if(!consent.analytics)return; dl.push({event,...props,page_path:location.pathname}); }
function loadGtm(){
 if(loaded||!validGtm()||!consent.analytics)return;
 loaded=true;
 // Basic consent mode: container loads only after consent to analytics.
 window.gtag=window.gtag||function(){dl.push(arguments)};
 window.gtag('consent','default',{analytics_storage:'granted',ad_storage:consent.marketing?'granted':'denied',ad_user_data:consent.marketing?'granted':'denied',ad_personalization:consent.marketing?'granted':'denied'});
 dl.push({'gtm.start':Date.now(),event:'gtm.js'});
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(config.gtmId);document.head.appendChild(s);
}
function setConsent(next){
 const wasMarketing=consent.marketing;
 consent={analytics:!!next.analytics,marketing:!!next.marketing&&!!next.analytics};
 localStorage.setItem(KEY,JSON.stringify(consent));
 if(window.gtag&&loaded)window.gtag('consent','update',{analytics_storage:consent.analytics?'granted':'denied',ad_storage:consent.marketing?'granted':'denied',ad_user_data:consent.marketing?'granted':'denied',ad_personalization:consent.marketing?'granted':'denied'});
 if(consent.analytics)loadGtm();
 // Tracking on consent change is avoided until consent is active.
 // On revocation reload the document so previously loaded marketing scripts cease running.
 if((!consent.analytics&&loaded)||(wasMarketing&&!consent.marketing&&loaded))location.reload();
 document.querySelector('#cookie-banner').hidden=true;
}
const banner=document.querySelector('#cookie-banner');
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&typeof saved.analytics==='boolean'){consent={analytics:!!saved.analytics,marketing:!!saved.marketing&&!!saved.analytics};loadGtm()}else banner.hidden=false}catch{banner.hidden=false}
const analytics=document.querySelector('#consent-analytics'),marketing=document.querySelector('#consent-marketing');
marketing.addEventListener('change',()=>{if(marketing.checked)analytics.checked=true});
analytics.addEventListener('change',()=>{if(!analytics.checked)marketing.checked=false});
document.querySelector('#cookie-accept').addEventListener('click',()=>setConsent({analytics:true,marketing:true}));
document.querySelector('#cookie-reject').addEventListener('click',()=>setConsent({analytics:false,marketing:false}));
document.querySelector('#cookie-save').addEventListener('click',()=>setConsent({analytics:analytics.checked,marketing:marketing.checked}));
document.querySelector('#cookie-settings').addEventListener('click',e=>{e.preventDefault();analytics.checked=consent.analytics;marketing.checked=consent.marketing;banner.hidden=false});
const nav=document.querySelector('.primary-nav'),toggle=document.querySelector('.nav-toggle');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>{const attrs=el.dataset;track(attrs.track,{item_id:attrs.item||attrs.package||undefined,link_location:attrs.location||undefined})}));
const form=document.querySelector('#enquiry-form');
if(form){const params=new URLSearchParams(location.search),packageName=params.get('experience');if(packageName&&['heritage','highlands','coastal','wildlife'].includes(packageName))form.elements.experience.value=packageName;
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;track('generate_lead',{lead_type:'demo_enquiry',experience_category:form.elements.experience.value});form.reset();document.querySelector('#form-success').hidden=false;});
}
// Virtual event for page views is NOT pushed; the GTM Google tag handles standard page_view automatically.
})();