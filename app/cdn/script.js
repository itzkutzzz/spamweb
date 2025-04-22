document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const logoImage = document.getElementById('logo-image');
    logoImage.src = 'https://spamweb-ten.vercel.app/app/cdn/favicon-v2.png';
    logoImage.style.transition = 'opacity 0.3s ease-in-out';
    const savedTheme = localStorage.getItem('spamweb-theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-mode';
        if (savedTheme === 'light-mode') {
            logoImage.src = 'https://spamweb-ten.vercel.app/app/cdn/favicon.png';
        } else {
            logoImage.src = 'https://spamweb-ten.vercel.app/app/cdn/favicon-v2.png';
        }
    }
    themeSwitch.addEventListener('change', () => {
        logoImage.style.opacity = '0';
        setTimeout(() => {
            if (themeSwitch.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('spamweb-theme', 'light-mode');
                logoImage.src = 'https://spamweb-ten.vercel.app/app/cdn/favicon.png';
            } else {
                document.body.classList.remove('light-mode');
                localStorage.removeItem('spamweb-theme');
                logoImage.src = 'https://spamweb-ten.vercel.app/app/cdn/favicon-v2.png';
            }
            logoImage.style.opacity = '1';
        }, 150);
    });
});
function spamWindows() {
    const url = document.getElementById('urlInput').value;
    const count = parseInt(document.getElementById('countInput').value);
    if (!url || !count) {
        alert('Please fill in both fields!');
        return;
    }
    if (count > 100) {
        alert('Maximum 100 windows allowed!');
        return;
    }
    try {
        new URL(url);
    } catch (e) {
        alert('Please enter a valid URL including https://');
        return;
    }
    let openedCount = 0;
    const interval = setInterval(() => {
        if (openedCount >= count) {
            clearInterval(interval);
            return;
        }
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            openedCount++;
            newWindow.focus();
        } else {
            clearInterval(interval);
            alert('Pop-ups are blocked! Please allow pop-ups and try again.');
        }
    }, 100);
}
