/* script.js - animations and scroll interactions
   - Hero text entrance
   - IntersectionObserver for reveal-on-scroll
   - Smooth anchor scrolling
*/

document.addEventListener('DOMContentLoaded', function(){
  // Hero text staggered entrance
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((el, i) => {
    setTimeout(()=>{
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 700ms cubic-bezier(.2,.9,.3,1)';
    }, 220 + i*160);
  });

  // Add fade-in class to key sections when they enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.spec-card, .hexagon-placeholder, .video-placeholder, .appointment-card, .doctor-card, .blog-card, .decor-circle, .about-illustration, .about-features, .testimonial-card, .highlight-box, .service-card, .callout').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Add hover social buttons to doctor cards dynamically
  document.querySelectorAll('.doctor-card').forEach(card => {
    if(!card.querySelector('.share-vertical')){
      const share = document.createElement('div');
      share.className = 'share-vertical';
      share.innerHTML = `
        <a href="#" class="btn btn-white btn-sm rounded-circle" title="share">f</a>
        <a href="#" class="btn btn-white btn-sm rounded-circle" title="linkedin">in</a>
        <a href="#" class="btn btn-white btn-sm rounded-circle" title="more">• • •</a>
      `;
      card.appendChild(share);
    }
  });

  // Make whole doctor card clickable (preserve inner controls)
  document.querySelectorAll('.doctor-card').forEach(card => {
    const actionLink = card.querySelector('.doc-actions a');
    if(actionLink){
      // make card keyboard-focusable
      card.setAttribute('tabindex','0');
      card.style.cursor = 'pointer';

      const navigate = (href) => { window.location.href = href; };

      card.addEventListener('click', (e)=>{
        // if click happened on interactive controls, ignore
        if(e.target.closest('.doc-actions') || e.target.closest('.share-vertical') || e.target.closest('a')) return;
        navigate(actionLink.href);
      });

      card.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(actionLink.href);
        }
      });
    }
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

// Small helper: pause marquee on hover
document.addEventListener('DOMContentLoaded', () => {
  const marquees = document.querySelectorAll('.logo-strip .marquee');
  marquees.forEach(m => {
    m.addEventListener('mouseenter', () => m.style.animationPlayState = 'paused');
    m.addEventListener('mouseleave', () => m.style.animationPlayState = 'running');
  });
});

/* Service details dynamic population */
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function populateServiceDetails(){
  const service = getQueryParam('service') || 'Health Solutions';
  const titleEl = document.getElementById('service-title');
  const headingEl = document.getElementById('service-heading');
  const breadcrumb = document.getElementById('breadcrumb-item');
  const serviceImage = document.getElementById('service-image');
  const intro = document.getElementById('service-intro');
  const bullets = document.getElementById('service-bullets');
  const servicesList = document.getElementById('services-list');

  // simple content map (extend with Figma copy as needed)
  const data = {
    'Health Solutions': {
      title:'Health Solutions',
      heading:'Nurture Nature Blossoming Health',
      intro:'Healthcare delivery varies across the globe, influenced by socio-economic factors and more.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Lorem Ipsum Passage, And Going Through', 'Healthcare Excellence, Compassionate Healing', 'Many Desktop Publishing Packages And Web Page' ]
    },
    'VitalVista Services': {
      title:'VitalVista Services',
      heading:'VitalVista Services For Better Health',
      intro:'VitalVista provides clinically-proven wellness solutions for long term wellbeing.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Comprehensive Screening', 'Advanced Diagnostics', 'Personalized Care Plans' ]
    },
    'Nourish Net Healthcare': {
      title:'Nourish Net Healthcare',
      heading:'Nourish Net Healthcare Solutions',
      intro:'Nourish Net focuses on integrative health services for the community.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Community Care', 'Nutrition & Wellness', 'Ongoing Support' ]
    },
    'Radius Wellness': {
      title:'Radius Wellness',
      heading:'Radius Wellness And Recovery',
      intro:'Radius Wellness helps restore balance through therapeutic programs.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Therapeutic Programs', 'Rehabilitation Plans', 'Specialist Team' ]
    },
    'Net Healthcare': {
      title:'Net Healthcare',
      heading:'Net Healthcare Professional Services',
      intro:'Net Healthcare offers a network of specialists and diagnostic services.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Specialist Network', 'Diagnostic Labs', 'Continuity of Care' ]
    },
    'Harbor Health': {
      title:'Harbor Health',
      heading:'Harbor Health Anchored In Care',
      intro:'Harbor Health provides trusted clinical care and patient-first services.',
      image:'assets/service-detail-hero.svg',
      bullets:[ 'Anchored Care', 'Patient First', 'Holistic Approach' ]
    }
  };

  const selected = data[service] || data['Health Solutions'];

  // set heading and hero
  titleEl.textContent = selected.title;
  headingEl.textContent = selected.heading;
  breadcrumb.textContent = selected.title;
  serviceImage.src = selected.image;
  intro.textContent = selected.intro;

  // bullets
  bullets.innerHTML = '';
  selected.bullets.forEach(b =>{
    const li = document.createElement('li');
    li.className = 'service-bullet';
    li.innerHTML = `<div class="dot"></div><div class="text-muted">${b}</div>`;
    bullets.appendChild(li);
  });

  // services list on left (to match design and highlight current)
  servicesList.innerHTML = '';
  Object.keys(data).forEach(s =>{
    const li = document.createElement('li');
    li.className = (s === selected.title) ? 'active' : '';
    // clickable element that updates content without reload
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'service-link';
    btn.textContent = s;
    btn.dataset.service = s;
    btn.addEventListener('click', (ev)=>{
      ev.preventDefault();
      // update content in-place and push history state
      setService(s, true);
    });
    li.appendChild(btn);
    const plus = document.createElement('span');
    plus.className = 'text-primary';
    plus.textContent = '+';
    li.appendChild(plus);
    servicesList.appendChild(li);
  });

  // Helper to set service content programmatically without full reload
  function setService(serviceName, pushState){
    const newSelected = data[serviceName] || data['Health Solutions'];
    // update hero/title/breadcrumb
    titleEl.textContent = newSelected.title;
    headingEl.textContent = newSelected.heading;
    breadcrumb.textContent = newSelected.title;
    serviceImage.src = newSelected.image;
    intro.textContent = newSelected.intro;
    // update bullets
    bullets.innerHTML = '';
    newSelected.bullets.forEach(b =>{
      const li = document.createElement('li');
      li.className = 'service-bullet';
      li.innerHTML = `<div class="dot"></div><div class="text-muted">${b}</div>`;
      bullets.appendChild(li);
    });
    // update active class in sidebar
    servicesList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    Array.from(servicesList.querySelectorAll('.service-link')).forEach(link => {
      if(link.dataset.service === newSelected.title){
        link.parentElement.classList.add('active');
      }
    });
    // optionally update url
    if(pushState){
      const url = new URL(window.location.href);
      url.searchParams.set('service', serviceName);
      history.pushState({service: serviceName}, '', url);
    }
  }
}

// populate if on service details page
if(window.location.pathname.endsWith('service-details.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    populateServiceDetails();
    // trigger small reveal for bullets
    setTimeout(()=>{
      document.querySelectorAll('.service-bullet').forEach((el,i)=>{el.style.opacity=1;el.style.transform='none';el.style.transition='all .5s ease '+(i*0.08)+'s';});
    },220);
  });
}

// respond to back/forward navigation to keep content in sync
window.addEventListener('popstate', (e)=>{
  const svc = (e.state && e.state.service) ? e.state.service : getQueryParam('service');
  if(svc && window.location.pathname.endsWith('service-details.html')){
    // call populateServiceDetails path but avoid pushing state
    // reuse setService by triggering click on sidebar link if exists
    const servicesList = document.getElementById('services-list');
    if(servicesList){
      const link = Array.from(servicesList.querySelectorAll('.service-link')).find(a=>a.dataset.service===svc);
      if(link){ link.click(); }
      else { populateServiceDetails(); }
    }
  }
});

/* Doctor details dynamic population */
function populateDoctorDetails(){
  const name = getQueryParam('doctor') || 'Kathryn Murphy';
  const titleEl = document.getElementById('doc-page-title');
  const breadcrumb = document.getElementById('doc-breadcrumb');
  const docName = document.getElementById('doc-name');
  const docIntro = document.getElementById('doc-intro');
  const docImage = document.getElementById('doc-image');
  const docEmail = document.getElementById('doc-email');
  const docPhone = document.getElementById('doc-phone');
  const docWeb = document.getElementById('doc-web');

  const doctors = {
    'Kathryn Murphy': {
      name:'Kathryn Murphy', role:'President of Sales', intro:'Empower To Flourish Health Future', image:'assets/doc-1.svg', email:'kathryn@medilix.com', phone:'+1-212-4582-754', web:'www.kathryn.com'
    },
    'Savannah Nguyen':{name:'Savannah Nguyen', role:'Dog Trainer', intro:'Specialized in wellness & care', image:'assets/doc-2.svg', email:'savannah@medilix.com', phone:'+1-212-4582-755', web:'www.savannah.com'},
    'Courtney Henry':{name:'Courtney Henry', role:'Medical Assistant', intro:'Care and support specialist', image:'assets/doc-3.svg', email:'courtney@medilix.com', phone:'+1-212-4582-756', web:'www.courtney.com'},
    'Floyd Miles':{name:'Floyd Miles', role:'Nursing Assistant', intro:'Experienced nursing assistant', image:'assets/doc-4.svg', email:'floyd@medilix.com', phone:'+1-212-4582-757', web:'www.floyd.com'},
    'Leslie Alexander':{name:'Leslie Alexander', role:'Marketing Coordinator', intro:'Patient engagement specialist', image:'assets/doc-5.svg', email:'leslie@medilix.com', phone:'+1-212-4582-758', web:'www.leslie.com'},
    'Devon Lane':{name:'Devon Lane', role:'Web Designer', intro:'Designs patient-facing experiences', image:'assets/doc-6.svg', email:'devon@medilix.com', phone:'+1-212-4582-759', web:'www.devon.com'}
  };

  const d = doctors[name] || doctors['Kathryn Murphy'];
  // set fields
  if(titleEl) titleEl.textContent = 'Doctor Details';
  if(breadcrumb) breadcrumb.textContent = d.name;
  if(docName) docName.textContent = d.name;
  if(docIntro) docIntro.textContent = d.intro + '. ' + d.role;
  if(docImage) docImage.src = d.image;
  if(docEmail) docEmail.textContent = d.email;
  if(docPhone) docPhone.textContent = d.phone;
  if(docWeb) docWeb.textContent = d.web;
}

if(window.location.pathname.endsWith('doctor-details.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    populateDoctorDetails();
  });
}

// Blog page small enhancements: hero reveal + staggered post reveals
if(window.location.pathname.endsWith('blog.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    // small hero fade-in already handled by observer; add subtle scale on load
    const hero = document.querySelector('.about-hero.service-hero');
    if(hero) hero.style.transform = 'translateY(0)';

    // Stagger reveal for blog articles
    const posts = document.querySelectorAll('.blog-card');
    posts.forEach((p, i)=>{
      p.style.opacity = 0;
      p.style.transform = 'translateY(18px)';
      setTimeout(()=>{
        p.style.transition = 'all 600ms cubic-bezier(.2,.9,.3,1)';
        p.style.opacity = 1;
        p.style.transform = 'none';
      }, 160 + i*140);
    });

    // animate sidebar cards (subtle)
    document.querySelectorAll('aside .blog-card').forEach((c,i)=>{
      c.style.opacity = 0; c.style.transform = 'translateY(12px)';
      setTimeout(()=>{ c.style.transition='all 500ms ease'; c.style.opacity=1; c.style.transform='none';}, 300 + i*80);
    });
  });
}

/* Populate Blog Details page from `?post=` param */
function populateBlogDetails(){
  const slug = getQueryParam('post') || 'health-harmony';
  const titleEl = document.getElementById('bd-headline');
  const metaEl = document.getElementById('bd-meta');
  const introEl = document.getElementById('bd-intro');
  const heroImg = document.getElementById('bd-hero');
  const quoteEl = document.getElementById('bd-quote');
  const quoteAuthor = document.getElementById('bd-quote-author');
  const subImg = document.getElementById('bd-subimage');
  const bulletsEl = document.getElementById('bd-bullets');
  const commentsEl = document.getElementById('bd-comments');
  const breadcrumb = document.getElementById('bd-breadcrumb');

  const posts = {
    'health-harmony':{
      title:'Holistic Haven Where Health Blossoms',
      meta:'By admin • October 19, 2022',
      intro:'We provide compassionate, evidence-based care and an exceptional patient experience. Our multidisciplinary team delivers personalised treatment plans across a range of specialties.',
      hero:'assets/blog-1.jpg',
      quote:'Aliquam eros justo, posuere lobortis in viverra laoreet mattis ullamcorper posuere viverra.',
      quoteAuthor:'Stania Laito',
      subimage:'assets/blog-sub-1.jpg',
      bullets:['Bringing hope, healing, and health to life','Your health, our mission','Compassionate care for all','Dedicated to your health journey'],
      comments:[
        {name:'Jerome Bell', date:'October 19, 2022', body:'The field of medicine is so continuously evolving, driven by scientific discovery.'},
        {name:'Dianne Russell', date:'October 19, 2022', body:'The field of medicine is so continuously evolving, driven by scientific discovery.'},
        {name:'Kristin Watson', date:'October 19, 2022', body:'The field of medicine is so continuously evolving, driven by scientific discovery.'}
      ]
    },
    'epicenter-wellness':{
      title:'Epicenter Of Health Your Wellness',
      meta:'By admin • October 19, 2022',
      intro:'A focused centre providing holistic and specialist services designed for patient recovery and long-term wellbeing.',
      hero:'assets/blog-2.jpg',
      quote:'Short highlighted quote about epicenter wellness.',
      quoteAuthor:'Author Name',
      subimage:'assets/blog-sub-2.jpg',
      bullets:['Healing begins with us','Inspiring wellness, one step at a time','Committed to your well-being'],
      comments:[]
    },
    'nurture-blossom':{
      title:'Nurture Nature Blossoming In Health',
      meta:'By admin • October 19, 2022',
      intro:'An integrative approach to health centered around nutrition, lifestyle and community support.',
      hero:'assets/blog-3.jpg',
      quote:'Nature and nurture combined for sustained wellbeing.',
      quoteAuthor:'Author Name',
      subimage:'assets/blog-sub-3.jpg',
      bullets:['Community Care','Nutrition & Wellness','Ongoing Support'],
      comments:[]
    }
  };

  const selected = posts[slug] || posts['health-harmony'];

  // Populate elements
  if(titleEl) titleEl.textContent = selected.title;
  if(metaEl) metaEl.textContent = selected.meta;
  if(introEl) introEl.textContent = selected.intro;
  if(heroImg) heroImg.src = selected.hero;
  if(quoteEl) quoteEl.textContent = selected.quote;
  if(quoteAuthor) quoteAuthor.textContent = selected.quoteAuthor;
  if(subImg) subImg.src = selected.subimage;
  if(breadcrumb) breadcrumb.textContent = selected.title;

  // bullets
  if(bulletsEl){
    bulletsEl.innerHTML = '';
    selected.bullets.forEach(b =>{
      const li = document.createElement('li');
      li.innerHTML = `<div class="service-bullet"><div class="dot"></div><div class="text-muted">${b}</div></div>`;
      bulletsEl.appendChild(li);
    });
  }

  // comments
  if(commentsEl){
    commentsEl.innerHTML = '';
    (selected.comments||[]).forEach(c =>{
      const div = document.createElement('div');
      div.className = 'comment-card';
      div.innerHTML = `<div class="comment-avatar" aria-hidden></div><div class="comment-body"><div class="name">${c.name}</div><div class="date">${c.date}</div><div class="mt-2">${c.body}</div><div class="mt-2 text-end"><button class="btn btn-outline-primary btn-sm">Reply</button></div></div>`;
      commentsEl.appendChild(div);
    });
  }

  // Handle comment form submission (local only)
  const form = document.getElementById('comment-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('c-name').value || 'Anonymous';
      const message = document.getElementById('c-message').value || '';
      const now = new Date();
      const date = now.toLocaleDateString();
      const div = document.createElement('div');
      div.className = 'comment-card';
      div.innerHTML = `<div class="comment-avatar" aria-hidden></div><div class="comment-body"><div class="name">${name}</div><div class="date">${date}</div><div class="mt-2">${message}</div></div>`;
      commentsEl.insertBefore(div, commentsEl.firstChild);
      form.reset();
      // subtle animation
      div.style.opacity = 0; div.style.transform = 'translateY(8px)';
      setTimeout(()=>{div.style.transition='all 450ms ease';div.style.opacity=1;div.style.transform='none';},40);
    });
  }
}

if(window.location.pathname.endsWith('blog-details.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    populateBlogDetails();

    
    // quick reveal for main article
    const article = document.querySelector('.blog-details');
    if(article){ article.classList.add('in-view'); }
  });
}

// Contact page: handle send form with subtle UI feedback
if(window.location.pathname.endsWith('contact.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('contact-form');
    if(form){
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = 'Sending...';
        setTimeout(()=>{
          btn.textContent = 'Sent ✓';
          btn.classList.add('btn-success');
          btn.classList.remove('btn-primary');
          // reset after short delay
          setTimeout(()=>{ btn.disabled=false; btn.textContent=original; btn.classList.remove('btn-success'); btn.classList.add('btn-primary'); form.reset(); }, 1400);
        }, 900);
      });
    }
  });
}

/* 404 support: animate elements on view and intercept broken relative links
   - Adds reveal animation for the 404 illustration and number
   - Intercepts clicks on same-origin relative links and checks existence via fetch;
     if the target returns 404, redirect to /404.html
*/
if(window.location.pathname.endsWith('404.html')){
  document.addEventListener('DOMContentLoaded', ()=>{
    const ill = document.querySelector('.error-illustration');
    const num = document.querySelector('.error-number');
    setTimeout(()=>{ if(ill) ill.classList.add('in-view'); if(num) num.classList.add('in-view'); }, 200);
  });
}

// Intercept same-origin internal link clicks and verify target exists. If not, go to 404 page.
document.addEventListener('click', async (e)=>{
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href');
  if(!href) return;
  // only handle relative same-origin links (not anchors, not external)
  if(href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  // allow anchors to same page
  try{
    const url = new URL(href, window.location.href);
    if(url.origin !== window.location.origin) return;
    // perform HEAD request to check existence
    e.preventDefault();
    try{
      const resp = await fetch(url.href, { method:'HEAD' });
      if(resp.ok){
        // link exists, follow normally
        window.location.href = url.href;
      } else {
        // redirect to 404
        window.location.href = '404.html';
      }
    }catch(err){
      // network error, treat as missing
      window.location.href = '404.html';
    }
  }catch(err){
    // invalid URL, ignore
    return;
  }
});
