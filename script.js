// Basic site JS: word cycle, mobile nav, profile entrance
const WORDS = ['Speed', 'Professional', 'Quality', 'Reliable'];
let wi = 0;
const wordEl = document.getElementById('word-cycle');

function startWordCycle(){
  if(!wordEl) return;

  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90; // ms per char
  const deletingSpeed = 40;
  const pauseAfterTyping = 1200; // ms

  function tick(){
    const current = WORDS[wi];
    if(!isDeleting){
      // type forward
      charIndex++;
      wordEl.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        // finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(tick, pauseAfterTyping);
        return;
      }
      setTimeout(tick, typingSpeed + Math.random()*60);
    } else {
      // deleting
      charIndex--;
      wordEl.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        // move to next word
        isDeleting = false;
        wi = (wi + 1) % WORDS.length;
        setTimeout(tick, 180);
        return;
      }
      setTimeout(tick, deletingSpeed + Math.random()*30);
    }
  }

  // start the loop
  tick();
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle){navToggle.addEventListener('click',()=>{navLinks.classList.toggle('open')})}

// Profile entrance
function initProfileEntrance(){
  const el = document.querySelector('.profile-img');
  if(!el) return;
  const enter = ()=>el.classList.add('animate-in');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{if(entries[0].isIntersecting){enter();obs.disconnect();}}, {threshold:0.15});
    obs.observe(el);
  } else {enter()}
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){
  const href = this.getAttribute('href');
  if(href.startsWith('#')){
    e.preventDefault();
    const t = document.querySelector(href);
    if(t) window.scrollTo({top:t.offsetTop-70,behavior:'smooth'});
  }
}));

// Element visibility observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.section-title, .card, .project-card, .contact-card, .about-grid').forEach(el => {
    observer.observe(el);
  });
}

// Parallax effect for mouse movement
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  if (parallaxElements.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }
}

// Enhanced floating elements
function initFloatingElements() {
  const dots = document.querySelectorAll('.dot');
  
  dots.forEach((dot, index) => {
    // Randomize animation duration and delay for natural effect
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 5;
    
    dot.style.animationDuration = `${duration}s`;
    dot.style.animationDelay = `${delay}s`;
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  startWordCycle();
  initProfileEntrance();
  initScrollAnimations();
  initParallaxEffect();
  initFloatingElements();
});
