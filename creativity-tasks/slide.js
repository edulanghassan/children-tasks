document.addEventListener('DOMContentLoaded', () => {
    // Declare and initialize variables at the top
    let tasks = [];
    let currentSlide = 0; // Initialize currentSlide here
    let isPlaying = true; // To keep track of whether the slideshow is playing
    let interval;

    const slideContainer = document.getElementById('slideContainer');
    const progressBarFill = document.getElementById('progressBarFill');
    const startStopBtn = document.getElementById('startStopBtn');

    // Elements to dynamically update
    const slideTitleEn = document.getElementById('slideTitleEn');
    const slideTitleAr = document.getElementById('slideTitleAr');
    const slideImage = document.getElementById('slideImage');
    const slideVideo = document.getElementById('slideVideo');
    const promptEn = document.getElementById('promptEn');
    const promptAr = document.getElementById('promptAr');

    // Check if the elements exist before using them
    if (slideContainer && progressBarFill && startStopBtn && slideTitleEn && slideTitleAr && slideImage && slideVideo && promptEn && promptAr) {
        // Fetch JSON data from external file
        fetch('/children-tasks/creativity-tasks/creativity-tasks.json')
            .then(response => response.json())
            .then(data => {
                tasks = data;
                showSlide(currentSlide); // Display the first slide
            })
            .catch(error => console.error('Error loading the JSON file:', error));

        function showSlide(index) {
            const slide = tasks[index];

            // Update slide content dynamically
            slideTitleEn.textContent = `${slide['id']}: ${slide['title-en']}`;
            slideTitleAr.textContent = "العنوان العربي";
            slideImage.src = "/children-tasks/creativity-tasks/"slide['image'] || 'images/default-image.jpg';
            slideImage.alt = slide['title-en'];
            slideVideo.src = `https://www.youtube.com/embed/${slide['video']}`;
            promptEn.textContent = slide['prompt-en'];
            promptAr.textContent = slide['prompt-ar'];

            const percentage = ((index + 1) / tasks.length) * 100;

            progressBarFill.style.width = `${percentage}%`;
        }

        function showNextSlide() {
            currentSlide = (currentSlide + 1) % tasks.length;
            showSlide(currentSlide);
        }

        function showPrevSlide() {
            currentSlide = (currentSlide - 1 + tasks.length) % tasks.length;
            showSlide(currentSlide);
        }

        function toggleSlideshow() {
            if (isPlaying) {
                clearInterval(interval); // Stop the slideshow
                startStopBtn.textContent = 'Start';
            } else {
                interval = setInterval(showNextSlide, 5000); // Resume the slideshow
                startStopBtn.textContent = 'Stop';
            }
            isPlaying = !isPlaying; // Toggle the state
        }

        document.getElementById('nextBtn').addEventListener('click', showNextSlide);
        document.getElementById('prevBtn').addEventListener('click', showPrevSlide);
        startStopBtn.addEventListener('click', toggleSlideshow);
    } else {
        console.error('One or more required elements are missing in the DOM.');
    }
});
