let tasks = [];
let currentSlide = 0;
let isPlaying = false; // Start with slideshow stopped
let interval;

const slideContainer = document.getElementById('slideContainer');
const progressBarFill = document.getElementById('progressBarFill');
const startStopBtn = document.getElementById('startStopBtn');

// Fetch JSON data from external file
fetch('creativity-and-entertainment-tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        showSlide(currentSlide); // Show the first slide but don't start the interval
    })
    .catch(error => console.error('Error loading the JSON file:', error));

function showSlide(index) {
    const slide = tasks[index];
    slideContainer.innerHTML = `
        <div class="slide active">
            <h3>${slide['id']}: ${slide['title-en']}</h3>
            <h3 dir="rtl">${slide['id']}: ${slide['title-ar']}</h3>
            <img src="${slide['image'] || '../images/default-image.jpg'}" alt="${slide['title-en']}" />
            <br>
            <iframe width="auto" height="auto"  src="https://www.youtube.com/embed/${slide['video']}" title="Remaking My Worst Childhood Flipbook Animation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            
            <p>${slide['prompt-en']}</p>
            <p dir="rtl">${slide['prompt-ar']}</p>
        </div>
    `;
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
        interval = setInterval(showNextSlide, 5000); // Start the slideshow
        startStopBtn.textContent = 'Stop';
    }
    isPlaying = !isPlaying; // Toggle the state
}

// Add event listeners
document.getElementById('nextBtn').addEventListener('click', showNextSlide);
document.getElementById('prevBtn').addEventListener('click', showPrevSlide);
startStopBtn.addEventListener('click', toggleSlideshow);
