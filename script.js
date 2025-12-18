/*===== FUNGSI EFEK MENGETIK =====*/
var typed = new Typed('.typing', {
    strings: ['UI/UX Designer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/*===== FUNGSI MENU HAMBURGER =====*/
const navMenu = document.querySelector('.header');
const navToggle = document.querySelector('#nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

// Fungsi untuk menampilkan menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Fungsi untuk menyembunyikan menu setelah link di-klik (di mobile)
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*===== FUNGSI ACTIVE LINK SAAT SCROLL =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('load', () => {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    audio.autoplay = true;
    audio.loop = true;
    audio.play().catch(() => {
        const handler = () => {
            audio.play();
            document.removeEventListener('click', handler);
            document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('click', handler, { once: true });
        document.addEventListener('touchstart', handler, { once: true });
    });
});
window.addEventListener('scroll', scrollActive);

/*===== DARK/LIGHT THEME =====*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-sun' : 'bx-moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
