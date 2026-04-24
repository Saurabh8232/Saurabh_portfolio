/* MOBILE MENU TOGGLE */
const toggle = document.getElementById('menu-toggle');
if (toggle) {
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("no-scroll", toggle.checked);
    });
}

/* TYPING ANIMATION */

const words = ["Web Developer", "IoT Developer", "Machine Learning Enthusiast"];
const typingText = document.getElementById("typing-span");

if (typingText) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay  = 100;
    const erasingDelay = 100;
    const newWordDelay = 1000;

    const type = () => {
        const currentWord = words[wordIndex];
        if (!isDeleting) {
            if (charIndex < currentWord.length) {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                isDeleting = true;
                setTimeout(type, newWordDelay);
            }
        } else {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, erasingDelay);
            }
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (words?.length) type();
    });
}

/*SKILLS BAR ANIMATION */

function animateSkills() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width') + '%';
        setTimeout(() => { fill.style.width = targetWidth; }, 100);
    });
}

/* MAIN NAVIGATION (Tabs) */

const navlinks = document.querySelectorAll(".navlink");
const sections = document.querySelectorAll(".content");

navlinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        navlinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        const targetId = link.getAttribute("data-tab");
        sections.forEach((section) => section.classList.remove("active-content"));
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add("active-content");
        if (targetId === 'skills') {
            document.querySelectorAll('.skill-fill').forEach(f => f.style.width = '0%');
            setTimeout(animateSkills, 150);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        const menuToggle = document.getElementById("menu-toggle");
        if (menuToggle) menuToggle.checked = false;
        document.body.classList.remove("no-scroll");
    });
});

/*ABOUT SECTION TABS */

const aboutTabs = document.querySelectorAll('.about-tab');
const aboutPanels = document.querySelectorAll('.about-panel');

aboutTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSection = tab.getAttribute('data-section');
        aboutTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        aboutPanels.forEach(panel => panel.classList.remove('active'));
        const targetPanel = document.getElementById(targetSection);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

const EMAILJS_SERVICE_ID  = "service_xzg2gs5";
const EMAILJS_TEMPLATE_ID = "template_n295w6b";
const EMAILJS_PUBLIC_KEY  = "U-lUa3RL8kPRPR9l2";

// FIX: DOMContentLoaded ke baad init karo
document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
});

const contactForm = document.getElementById('contact-form');
const sendBtn     = document.getElementById('send-btn');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showStatus('Please fill the all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showStatus('Please entre the vaild email.', 'error');
            return;
        }

        // Check if IDs configured
        if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
            showStatus('EmailJS IDs is not set.', 'error');
            return;
        }

        // FIX: Check if EmailJS loaded
        if (typeof emailjs === 'undefined') {
            showStatus('Email service is no load. Please reload the page.', 'error');
            return;
        }

        // Send
        sendBtn.disabled = true;
        sendBtn.querySelector('span').textContent = 'Sending...';

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name  : name,
            from_email : email,
            to_email   : "sy962965@gmail.com",
            subject    : subject,
            message    : message,
        })
        .then(() => {
            showStatus('Message successfully sent ! ', 'success');
            contactForm.reset();
        })
        .catch((err) => {
            console.error('EmailJS error:', err);
            const reason = err?.text || err?.message || 'Unknown error';
            showStatus('Send nahi hua: ' + reason, 'error');
        })
        .finally(() => {
            sendBtn.disabled = false;
            sendBtn.querySelector('span').textContent = 'Send Message';
        });
    });
}

function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}
