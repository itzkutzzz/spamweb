// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('spamweb-theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-mode';
    }

    // Theme toggle event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('spamweb-theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.removeItem('spamweb-theme');
        }
    });
});

// Existing spam windows function
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
        new URL(url); // Validate URL format
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
    }, 100); // 100ms delay between each window to prevent browser freezing
}
