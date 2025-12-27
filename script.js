// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

if (themeToggle && sunIcon && moonIcon) {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
}

// Smooth Scroll Navigation
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add click events to navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Desktop navigation pills
    const navPills = document.querySelectorAll('.nav-pill');
    navPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = pill.getAttribute('href');
            smoothScrollTo(targetId);
            
            // Update active state
            navPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });
    
    // Mobile navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
            
            // Close mobile menu
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
    
    // Language toggle functionality
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
});

// Active Navigation Highlight on Scroll
window.addEventListener('scroll', () => {
    const sections = ['about', 'members', 'events', 'contact'];
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navPill = document.querySelector(`.nav-pill[href="#${sectionId}"]`);
        
        if (section && navPill) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-pill').forEach(pill => {
                    pill.classList.remove('active');
                });
                navPill.classList.add('active');
            }
        }
    });
});

// Smooth scroll for CTA button (if exists)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Simple feedback animation
        ctaButton.style.transform = 'translateY(0) scale(0.95)';
        
        setTimeout(() => {
            ctaButton.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        console.log('CTA clicked - Ready to join!');
    });
}

// Generate 37 member cards - Simplified version
const memberNames = [
    'Ahmad Rizki', 'Budi Santoso', 'Candra Wijaya', 'Deni Pratama', 'Eko Saputra',
    'Fajar Nugroho', 'Gilang Ramadhan', 'Hendra Kusuma', 'Indra Gunawan', 'Joko Widodo',
    'Kevin Ananda', 'Lukman Hakim', 'Muhammad Iqbal', 'Nanda Pratama', 'Oscar Febrian',
    'Putra Mahendra', 'Qori Hidayat', 'Rizal Fauzi', 'Sandi Permana', 'Taufik Rahman',
    'Umar Faruq', 'Vino Alamsyah', 'Wahyu Setiawan', 'Xavier Pratama', 'Yusuf Habibi',
    'Zaki Maulana', 'Arif Budiman', 'Bayu Setiawan', 'Cahyo Nugroho', 'Dimas Prasetyo',
    'Erick Thohir', 'Fandi Ahmad', 'Galih Pratama', 'Hafiz Rahman', 'Ilham Akbar',
    'Jihan Aulia', 'Krisna Wijaya'
];

const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
    'Data Scientist', 'UI/UX Designer', 'DevOps Engineer', 'Game Developer',
    'Machine Learning Engineer', 'Cybersecurity Specialist', 'Cloud Engineer', 'QA Engineer'
];

function createMemberCard(name, index) {
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const initials = name.split(' ').map(n => n[0]).join('');
    const memberId = `UB${String(index + 1).padStart(2, '0')}`;
    
    return `
        <div class="member-card">
            <div class="member-avatar">${initials}</div>
            <div class="member-name">${name}</div>
            <div class="member-role">${randomRole}</div>
            <div class="member-id">${memberId}</div>
        </div>
    `;
}

function generateMembers() {
    const membersGrid = document.getElementById('membersGrid');
    
    if (!membersGrid) {
        console.error('Members grid element not found');
        return false;
    }
    
    // Generate all member cards HTML
    const memberCardsHTML = memberNames.map((name, index) => createMemberCard(name, index)).join('');
    
    // Insert all cards at once
    membersGrid.innerHTML = memberCardsHTML;
    
    // Add click events after insertion
    const memberCards = membersGrid.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
    
    console.log(`Successfully generated ${memberNames.length} member cards`);
    return true;
}

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = body.classList.contains('dark') 
            ? 'rgba(26, 32, 44, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = body.classList.contains('dark')
            ? 'rgba(26, 32, 44, 0.9)'
            : 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for subtle animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Generate members immediately
    const success = generateMembers();
    
    if (success) {
        // Animate member cards with delay
        setTimeout(() => {
            const memberCards = document.querySelectorAll('.member-card');
            console.log(`Animating ${memberCards.length} member cards`);
            
            memberCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.02}s, transform 0.6s ease ${index * 0.02}s`;
            });
            
            // Trigger animations
            setTimeout(() => {
                memberCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 100);
        }, 300);
    }
});

// Backup generation
window.addEventListener('load', function() {
    const membersGrid = document.getElementById('membersGrid');
    if (membersGrid && membersGrid.children.length === 0) {
        console.log('Backup: Generating members on window load');
        generateMembers();
    }
});

// Fallback generation with timeout
setTimeout(function() {
    const membersGrid = document.getElementById('membersGrid');
    if (membersGrid && membersGrid.children.length === 0) {
        console.log('Timeout fallback: Generating members');
        generateMembers();
    }
}, 2000);

// Add subtle parallax effect to hero (optional, very light)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--accent) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Member Detail Modal Functionality
const memberModal = document.getElementById('memberModal');
const modalClose = document.getElementById('modalClose');

// Sample member data for modal
const memberData = {
    skills: [
        ['JavaScript', 'React', 'Node.js', 'Python'],
        ['Vue.js', 'PHP', 'MySQL', 'Docker'],
        ['Angular', 'TypeScript', 'MongoDB', 'AWS'],
        ['Flutter', 'Dart', 'Firebase', 'Git'],
        ['Java', 'Spring', 'PostgreSQL', 'Redis'],
        ['C++', 'Python', 'TensorFlow', 'Keras'],
        ['React Native', 'Swift', 'Kotlin', 'Unity'],
        ['Go', 'Rust', 'Kubernetes', 'GraphQL']
    ]
};

function openMemberModal(name, role, memberId, initials) {
    // Populate modal content
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalId').textContent = memberId;
    document.getElementById('modalAvatar').textContent = initials;
    
    // Generate random skills
    const randomSkills = memberData.skills[Math.floor(Math.random() * memberData.skills.length)];
    const skillsContainer = document.getElementById('modalSkills');
    skillsContainer.innerHTML = randomSkills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    // Show modal
    memberModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
    memberModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal event listeners
modalClose.addEventListener('click', closeMemberModal);
memberModal.addEventListener('click', (e) => {
    if (e.target === memberModal) {
        closeMemberModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && memberModal.classList.contains('active')) {
        closeMemberModal();
    }
});

// Update member card generation to include modal functionality
function createMemberCard(name, index) {
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const initials = name.split(' ').map(n => n[0]).join('');
    const memberId = `UB${String(index + 1).padStart(2, '0')}`;
    
    return `
        <div class="member-card" onclick="openMemberModal('${name}', '${randomRole}', '${memberId}', '${initials}')">
            <div class="member-avatar">${initials}</div>
            <div class="member-name">${name}</div>
            <div class="member-role">${randomRole}</div>
            <div class="member-id">${memberId}</div>
        </div>
    `;
}

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
});

// Smooth scroll for navigation (if needed)
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animations for new sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe about section elements
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    const visualCard = document.querySelector('.visual-card');
    if (visualCard) {
        visualCard.style.opacity = '0';
        visualCard.style.transform = 'translateY(30px)';
        visualCard.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        observer.observe(visualCard);
    }

    // Observe event cards
    document.querySelectorAll('.event-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe contact cards
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe contact form
    const contactFormContainer = document.querySelector('.contact-form');
    if (contactFormContainer) {
        contactFormContainer.style.opacity = '0';
        contactFormContainer.style.transform = 'translateY(20px)';
        contactFormContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactFormContainer);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations after a short delay
    setTimeout(addScrollAnimations, 500);
});