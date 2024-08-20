// Dynamically load the navigation-bar
fetch('/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;

        // Add functionality to menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', function () {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        });
    });
    