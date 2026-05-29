const WA_NUMBER = '919373235550';
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform='rotate(45deg) translate(5px,5px)';spans[1].style.opacity='0';spans[2].style.transform='rotate(-45deg) translate(5px,-5px)';
    } else { spans.forEach(s=>{s.style.transform='';s.style.opacity='';}); }
  });
}
document.querySelectorAll('.mobile-nav a').forEach(l=>l.addEventListener('click',()=>{if(mobileNav)mobileNav.classList.remove('open');if(hamburger){hamburger.classList.remove('active');hamburger.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});}}));
function setActiveNav(){const p=window.location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a,.mobile-nav a').forEach(l=>{if(l.getAttribute('href')===p||(p===''&&l.getAttribute('href')==='index.html'))l.classList.add('active');});}
setActiveNav();
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');}),{threshold:0.1});
document.querySelectorAll('.service-card,.gallery-item,.testimonial-card,.class-card,.step-card').forEach(el=>{el.classList.add('fade-in');obs.observe(el);});
function animateCounter(el,target,dur=1800){let s=0;const step=Math.ceil(target/(dur/16)),suf=el.dataset.suffix||'';const t=setInterval(()=>{s+=step;if(s>=target){s=target;clearInterval(t);}el.textContent=s.toLocaleString('en-IN')+suf;},16);}
const sobs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.querySelectorAll('[data-count]').forEach(c=>animateCounter(c,parseInt(c.dataset.count)));sobs.unobserve(x.target);}}),{threshold:0.5});
document.querySelectorAll('.stats-bar,.hero-stats').forEach(el=>sobs.observe(el));
const ef=document.getElementById('enquiryForm');
if(ef){ef.addEventListener('submit',function(e){e.preventDefault();const n=document.getElementById('name')?.value||'',p=document.getElementById('phone')?.value||'',c=document.getElementById('course')?.value||'',m=document.getElementById('message')?.value||'';window.open(`https://wa.me/${WA_NUMBER}?text=Hello! I am interested in enrolling at Pooja Dance %26 Art Academy.%0A%0A*Name:* ${n}%0A*Phone:* ${p}%0A*Interested In:* ${c}%0A*Message:* ${m}`,'_blank');});}
document.querySelectorAll('.gallery-item').forEach(item=>{item.addEventListener('click',function(){const img=this.querySelector('img');if(!img)return;const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:zoom-out;padding:20px;';const bi=document.createElement('img');bi.src=img.src;bi.style.cssText='max-width:90vw;max-height:90vh;border-radius:8px;object-fit:contain;';o.appendChild(bi);o.addEventListener('click',()=>o.remove());document.body.appendChild(o);});});
