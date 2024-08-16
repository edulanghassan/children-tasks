let tasks = [];
        let currentSlide = 0;
        let isPlaying = true; // To keep track of whether the slideshow is playing
        let interval;

        const slideContainer = document.getElementById('slideContainer');
        const progressBarFill = document.getElementById('progressBarFill');
        const startStopBtn = document.getElementById('startStopBtn');

        // Fetch JSON data from external file
        fetch('creativity-and-entertainment-tasks.json')
            .then(response => response.json())
            .then(data => {
                tasks = data;
                showSlide(currentSlide);
                interval = setInterval(showNextSlide, 5000); // Change slide every 5 seconds
            })
            .catch(error => console.error('Error loading the JSON file:', error));

        function showSlide(index) {
            const slide = tasks[index];
            slideContainer.innerHTML = `
                <div class="slide active">
                    <h2>${slide['title-en']}</h2>
                    <h2>${slide['title-ar']}</h2>
                    <img src="${slide['image'] || '../images/default-image.jpg'}" alt="${slide['title-en']}" />
                    <p>${slide['prompt-en']}</p>
                    <p>${slide['prompt-ar']}</p>
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
                interval = setInterval(showNextSlide, 5000); // Resume the slideshow
                startStopBtn.textContent = 'Stop';
            }
            isPlaying = !isPlaying; // Toggle the state
        }

        document.getElementById('nextBtn').addEventListener('click', showNextSlide);
        document.getElementById('prevBtn').addEventListener('click', showPrevSlide);
        startStopBtn.addEventListener('click', toggleSlideshow);
