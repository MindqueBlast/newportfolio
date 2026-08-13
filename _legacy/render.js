// Prevent browser from restoring previous scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  renderAwards();
  renderTimeline();

  // Re-initialize intersection observer and cursor tracking for dynamic content
  initInteractions();

  // Initialize polish and easter eggs
  initCustomCursor();
  initCanvasParticles();
  initKonamiCode();
});

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  let html = '';
  portfolioData.projects.forEach(project => {
    if (project.type === 'hero-right') {
      html += `
          <div
            class="${project.colSpan} group relative overflow-hidden glass-panel card-glow border border-outline-variant/10 hover:border-secondary/40 transition-all duration-500 p-6 md:p-8 rounded-sm reveal"
            style="transition-delay: ${project.delay};">
            <div class="flex flex-col h-full justify-between relative z-10">
              <div>
                <div class="flex justify-between items-start mb-8 md:mb-12">
                  <span
                    class="font-label text-[10px] tracking-widest uppercase px-3 py-1 bg-surface-container-highest/80 border border-outline-variant/20 rounded-full">${(project.tags || []).join(' // ')}</span>
                  <span
                    class="material-symbols-outlined text-secondary transform group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">north_east</span>
                </div>
                <h3 class="font-headline text-2xl md:text-4xl font-bold mb-4 group-hover:text-secondary transition-colors">${project.title}</h3>
                <p class="font-body text-on-surface-variant max-w-md mb-8">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-8 md:mb-12">
                  ${(project.tech || []).map(t => `<span class="text-[10px] font-label uppercase px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-colors">${t}</span>`).join('')}
                </div>
              </div>
              <a class="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-widest text-secondary group-hover:gap-4 transition-all"
                href="${project.link}">
                ${project.linkText} <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div
              class="absolute bottom-0 right-0 w-2/5 h-full pointer-events-none overflow-hidden opacity-10 group-hover:opacity-30 transition-opacity duration-700">
              <img alt="Complex data waves"
                class="object-cover h-full w-full scale-110 group-hover:scale-100 transition-transform duration-1000"
                src="${project.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfUha0lYPWmCPnvd-S2ocZEn58RPKoAquJvTxbNSoV22ZudLiSM6hNlL1Vxn6qgpr-JaGpGFrbOrDjIUFxPuYLncdKmT6akL8J0ml7uqrHtc68ukz85dG5NsD-H5lr0bXaexTPUfvDB2WVh3LphNeTEklvcsrap2JinYHTDjuH9MJfZ3zvLZ648YA15pUxenhYvlVZN6UA0XUPNGJy1xJbciz-hFaUkDTdk7Ap2raI3WHFH6NA72K62RRhq8fm0PKJn8I-XDcFYCaQ'}" />
            </div>
            <div
              class="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all duration-700">
            </div>
          </div>
            `;
    } else if (project.type === 'standard') {
      html += `
          <div
            class="${project.colSpan} group glass-panel card-glow border border-outline-variant/10 hover:border-secondary/40 p-6 md:p-8 rounded-sm hover:bg-surface-container-high transition-all duration-500 reveal"
            style="transition-delay: ${project.delay};">
            <div class="mb-8 md:mb-12 flex justify-between">
              <div
                class="w-12 h-12 bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all transform ${project.iconTransform || ''} duration-700">
                <span class="material-symbols-outlined">${project.icon || 'star'}</span>
              </div>
              <span
                class="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </div>
            <h3 class="font-headline text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">${project.title}</h3>
            <p class="font-body text-sm text-on-surface-variant mb-8 leading-relaxed">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-8">
              ${(project.tech || []).map(t => `<span class="text-[10px] font-label uppercase px-2 py-1 bg-surface-variant border border-outline-variant/20 group-hover:border-secondary transition-colors">${t}</span>`).join('')}
            </div>
            <a class="font-headline text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              href="${project.link}">${project.linkText} <span class="material-symbols-outlined text-sm">chevron_right</span></a>
          </div>
            `;
    } else if (project.type === 'hero-left') {
      html += `
          <div
            class="${project.colSpan} group relative overflow-hidden glass-panel card-glow border border-outline-variant/10 hover:border-secondary/40 transition-all duration-500 p-6 md:p-8 rounded-sm reveal"
            style="transition-delay: ${project.delay};">
            <div class="flex flex-col md:flex-row gap-6 md:p-8 items-center h-full relative z-10">
              <div class="flex-1">
                <span
                  class="font-label text-[10px] tracking-widest uppercase px-3 py-1 bg-surface-container-highest/80 border border-outline-variant/20 rounded-full mb-6 inline-block">${(project.tags || []).join(' // ')}</span>
                <h3 class="font-headline text-3xl font-bold mb-4 group-hover:text-secondary transition-colors">${project.title}</h3>
                <p class="font-body text-on-surface-variant mb-6">${project.description}</p>
                <a class="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-widest text-secondary group-hover:gap-4 transition-all"
                  href="${project.link}">
                  ${project.linkText} <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
              <div
                class="w-full md:w-2/5 aspect-video bg-surface-container-highest border border-outline-variant/20 overflow-hidden rounded-sm group-hover:border-secondary/30 transition-all relative">
                <img alt="Data network visualization"
                  class="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  src="${project.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRYwqujDb_hIoQbkxZcU8rYkdVBO0MKh6IKbBzZe_LMmukDQMzT-YxAt8GRDxXv2ZUQ-ODqGNDOR3IPMQ4B6XHYEMll9KxUVVWn7xGqZat2Bzvp_J2-5RdUGjuZmlHvE0ukxJbdL1CXDLknIqnyMn1Y5FnZZWFJR8rE_OgaqpiUOlVI72FlKfrAVd7rSYuDpjdQZVQduj5pw_6T0kgWB4rP-bfUwGCWf3iPfdIyRwkxh4QbsIiTQcK95xKEMsLVlOjy4NzbG4GQqiE'}" />
                <div class="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
            </div>
            <div
              class="absolute -left-20 -top-20 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] group-hover:bg-secondary/15 transition-all duration-700">
            </div>
          </div>
            `;
    }
  });

  container.innerHTML = html;

  // Attach modal click listeners to project cards
  Array.from(container.children).forEach((card, index) => {
    card.classList.add('cursor-pointer');
    card.addEventListener('click', (e) => {
      // Prevent opening modal if clicking on a direct link
      if(e.target.closest('a')) return;
      openProjectModal(index);
    });
  });
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  let html = '';
  portfolioData.skills.forEach(skill => {
    let itemsHtml = skill.items.map(item => {
      if (skill.isSecondary) {
        return `<span class="px-4 py-2 bg-secondary/10 border border-secondary/20 text-secondary font-label text-sm hover:bg-secondary/20 transition-all">${item}</span>`;
      } else {
        return `<span class="px-4 py-2 bg-surface-container-highest border border-outline-variant/20 font-label text-sm hover:border-secondary/40 hover:text-secondary transition-colors">${item}</span>`;
      }
    }).join('');

    html += `
            <div
              class="p-6 md:p-8 glass-panel border border-outline-variant/10 rounded-sm hover:border-secondary/20 transition-all group relative overflow-hidden">
              <div
                class="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              </div>
              <h3
                class="font-headline text-xs uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2 relative z-10">
                <span class="material-symbols-outlined text-sm">${skill.icon}</span> ${skill.category}
              </h3>
              <div class="flex flex-wrap gap-3 relative z-10">
                ${itemsHtml}
              </div>
            </div>
        `;
  });

  container.innerHTML = html;
}

function renderAwards(filterType = 'All') {
  const container = document.getElementById('awards-container');
  if (!container) return;

  let html = '';
  // Apply filtering
  const filteredAwards = portfolioData.awards.filter(award => 
    filterType === 'All' || award.type === filterType
  );

  if (filteredAwards.length === 0) {
    html = `<div class="col-span-full py-12 text-center text-on-surface-variant font-body">No awards found in this category.</div>`;
  } else {
    filteredAwards.forEach(award => {
      html += `
            <div
              class="p-6 md:p-8 glass-panel card-glow border border-outline-variant/10 hover:border-secondary/40 transition-all duration-500 group relative overflow-hidden reveal">
              <div
                class="absolute top-0 right-0 w-16 h-16 bg-secondary/5 -mr-8 -mt-8 rounded-full group-hover:scale-[3] transition-transform duration-700">
              </div>
              <div
                class="text-secondary font-headline text-xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left relative z-10">
                ${award.badge}</div>
              <h3 class="font-headline text-lg mb-2 relative z-10">${award.title}</h3>
              <p class="font-body text-sm text-on-surface-variant relative z-10">${award.description}</p>
            </div>
          `;
    });
  }

  container.innerHTML = html;
  
  // Re-initialize hover and intersect effects exclusively on these new swapped DOM nodes
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  container.querySelectorAll('.reveal').forEach((el) => {
    // Add active almost immediately if they swap in view, but give a tiny tick for DOM flush
    setTimeout(() => {
        observer.observe(el);
        // Force active if already deeply in view to skip animation delays arbitrarily 
        el.classList.add('active');
    }, 50);
  });

  container.querySelectorAll('.glass-panel').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

window.filterAwards = function(type) {
  // Update styling of buttons
  const buttons = document.querySelectorAll('.award-filter-btn');
  buttons.forEach(btn => {
    if (btn.innerText.trim() === type) {
      btn.classList.add('bg-secondary', 'text-primary', 'border-secondary', 'active');
      btn.classList.remove('bg-transparent', 'text-on-surface-variant', 'border-outline-variant/30');
    } else {
      btn.classList.remove('bg-secondary', 'text-primary', 'border-secondary', 'active');
      btn.classList.add('bg-transparent', 'text-on-surface-variant', 'border-outline-variant/30');
    }
  });

  renderAwards(type);
};

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  let html = '';
  // Vertical line
  html += `
          <div
            class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-outline-variant/30 to-transparent -translate-x-1/2">
          </div>
    `;

  portfolioData.timeline.forEach((item, index) => {
    const isLeft = index % 2 === 0;

    if (item.style === 'standard') {
      if (isLeft) {
        html += `
          <div class="relative mb-24 flex flex-col md:flex-row items-center md:justify-between group reveal">
            <div class="md:w-[45%] mb-4 md:mb-0 md:text-right">
              <div class="text-secondary font-headline font-bold text-xl mb-1 group-hover:text-white transition-colors">
                ${item.title}</div>
              <div class="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-3">${item.year}</div>
              <p class="font-body text-on-surface-variant">${item.description}</p>
            </div>
            <div
              class="absolute left-4 md:left-1/2 w-3 h-3 bg-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(34,177,236,0.5)] group-hover:scale-150 transition-transform">
            </div>
            <div class="md:w-[45%] hidden md:block"></div>
          </div>
                `;
      } else {
        html += `
          <div class="relative mb-24 flex flex-col md:flex-row items-center md:justify-between group reveal">
            <div class="md:w-[45%] order-2 md:order-1 hidden md:block"></div>
            <div
              class="absolute left-4 md:left-1/2 w-3 h-3 bg-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(34,177,236,0.5)] group-hover:scale-150 transition-transform">
            </div>
            <div class="md:w-[45%] order-1 md:order-2 mb-4 md:mb-0">
              <div class="text-secondary font-headline font-bold text-xl mb-1 group-hover:text-white transition-colors">
                ${item.title}</div>
              <div class="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-3">${item.year}</div>
              <p class="font-body text-on-surface-variant">${item.description}</p>
            </div>
          </div>
                `;
      }
    } else if (item.style === 'future') {
      html += `
          <div class="relative flex flex-col md:flex-row items-center md:justify-between group reveal">
            <div class="md:w-[45%] order-2 md:order-1 hidden md:block"></div>
            <div
              class="absolute left-4 md:left-1/2 w-3 h-3 bg-secondary/30 border border-secondary/50 rounded-full -translate-x-1/2 z-10 animate-pulse">
            </div>
            <div class="md:w-[45%] order-1 md:order-2 mb-4 md:mb-0">
              <div class="text-secondary/70 font-headline font-bold text-xl mb-1 italic">${item.title}</div>
              <div class="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-3">${item.year}</div>
              <p class="font-body text-on-surface-variant italic opacity-80">${item.description}</p>
            </div>
          </div>
            `;
    }
  });

  container.innerHTML = html;
}

function initInteractions() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  document.querySelectorAll('.glass-panel').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// --- Modal System ---

window.openProjectModal = function(index) {
  const project = portfolioData.projects[index];
  if (!project) return;
  
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  const modalBody = document.getElementById('project-modal-body');
  
  // Build grid/carousel for media
  let mediaHtml = '';
  if (project.media && project.media.length > 0) {
    mediaHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">';
    project.media.forEach(m => {
      mediaHtml += `<img src="${m}" class="w-full h-auto rounded-md border border-outline-variant/20 object-cover aspect-video bg-surface-container-low" alt="Project media"/>`;
    });
    mediaHtml += '</div>';
  } else if (project.imageUrl) {
    mediaHtml = `<img src="${project.imageUrl}" class="w-full h-auto rounded-md border border-outline-variant/20 object-cover aspect-video mb-8 bg-surface-container-low" alt="Project media"/>`;
  }
  
  modalBody.innerHTML = `
    ${mediaHtml}
    <div class="max-w-3xl">
      <h2 class="font-headline text-3xl md:text-5xl font-bold mb-6 text-on-surface">${project.title}</h2>
      <div class="flex flex-wrap gap-3 mb-8">
        ${(project.tags || []).map(t => `<span class="font-label text-xs uppercase px-3 py-1 bg-surface-container-highest border border-outline-variant/20 rounded-full tracking-wider">${t}</span>`).join('')}
        ${(project.tech || []).map(t => `<span class="font-label text-xs uppercase px-3 py-1 text-secondary bg-secondary/10 border border-secondary/20 rounded-full tracking-wider">${t}</span>`).join('')}
      </div>
      <p class="font-body text-on-surface-variant text-base md:text-lg leading-relaxed mb-10">${project.fullDescription || project.description}</p>
      ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="inline-flex items-center gap-3 bg-secondary text-primary px-8 py-4 rounded-full font-headline text-sm font-bold uppercase tracking-widest hover:bg-secondary/80 transition-colors shadow-[0_0_20px_rgba(34,177,236,0.2)]">Visit Project <span class="material-symbols-outlined text-sm">open_in_new</span></a>` : ''}
    </div>
  `;
  
  // Animate Open
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modalContent.classList.remove('scale-95', 'opacity-0');
  modalContent.classList.add('scale-100', 'opacity-100');
  document.body.style.overflow = 'hidden'; // prevent background scrolling
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  
  // Animate Close
  modal.classList.add('opacity-0', 'pointer-events-none');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');
  document.body.style.overflow = ''; // restore scrolling
};

// Initialize closing capabilities
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('project-modal-close');
  const backdrop = document.getElementById('project-modal-backdrop');
  
  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (backdrop) backdrop.addEventListener('click', closeProjectModal);
  
  // Also close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
});

// --- Easter Eggs & Polish ---

function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorGlow = document.getElementById('custom-cursor-glow');
  if (!cursor || !cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
    cursorGlow.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
  }
  
  document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1.5)`;
      cursorGlow.style.background = 'rgba(238, 125, 119, 0.4)'; 
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
      cursorGlow.style.background = 'rgba(34, 177, 236, 0.2)'; 
    });
  });

  animateCursor();
}

function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2.0 + 0.75;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 177, 236, 0.6)';
      ctx.fill();
    }
  }

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 18 : 50;
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.003;

    // Draw ambient energy waves
    ctx.lineWidth = 1;
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const numPoints = 100;
      // Start the wave horizontally across the screen
      const yOffset = height * (0.6 + j * 0.1); 
      const amplitude = height * 0.2;
      
      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints) * width;
        // Layered sine/cosine for flowing fluid effect
        const y = yOffset + 
                  Math.sin(x * 0.002 + time + j * 10) * amplitude * 0.6 + 
                  Math.cos(x * 0.005 - time * 1.5 + j * 10) * amplitude * 0.4;
                  
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = `rgba(34, 177, 236, ${0.10 + j * 0.05})`;
      ctx.stroke();

      // Subtle gradient drop underneath waves
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, yOffset, 0, height);
      gradient.addColorStop(0, `rgba(34, 177, 236, ${0.05 + j * 0.03})`);
      gradient.addColorStop(1, 'rgba(14, 14, 14, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw static particle network
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 175) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 177, 236, ${0.25 * (1 - dist / 175)})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

function initKonamiCode() {
  let sequence = "";
  const secretCode = "sudo";
  const terminal = document.getElementById('matrix-terminal');
  const content = document.getElementById('matrix-content');
  if (!terminal) return;

  document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) { 
      sequence += e.key.toLowerCase();
      if (sequence.length > secretCode.length) {
        sequence = sequence.slice(-secretCode.length);
      }
      if (sequence === secretCode) {
        activateTerminal();
      }
    }
  });

  function activateTerminal() {
    terminal.classList.add('active');
    
    const lines = [
      "Authenticating superuser...",
      "[OK] Credential verified via heuristic analysis.",
      "Accessing root mainframe...",
      "Bypassing security protocols...",
      "[OK] Firewall deactivated.",
      "Loading confidential portfolio assets...",
      "SUCCESS! You've uncovered the secret developer terminal.",
      " ",
      "Aaditya Sahu Systems // v9.9.9",
      "System fully operational. Enjoy exploring my codebase.",
      " ",
      "Type 'exit' or click to close."
    ];
    
    content.innerHTML = "";
    let lineIndex = 0;
    
    function printLine() {
      if (lineIndex < lines.length) {
        const p = document.createElement('div');
        p.textContent = lines[lineIndex];
        content.appendChild(p);
        lineIndex++;
        setTimeout(printLine, 200 + Math.random() * 300);
      }
    }
    
    setTimeout(printLine, 500);

    // Override sequence to allow "exit"
    const originalSequence = sequence;
    document.addEventListener('keydown', function exitListener(e) {
        sequence += e.key.toLowerCase();
        if (sequence.slice(-4) === "exit") {
            terminal.classList.remove('active');
            document.removeEventListener('keydown', exitListener);
            sequence = originalSequence;
        }
    });

    terminal.addEventListener('click', () => {
        terminal.classList.remove('active');
    }, { once: true });
  }
}
