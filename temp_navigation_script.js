    function showLesson(lessonNumber) {
        // Hide all lessons
        document.querySelectorAll('.lesson-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected lesson
        const targetLesson = document.getElementById(`lesson-${lessonNumber}`);
        if (targetLesson) {
            targetLesson.style.display = 'block';
            
            // Update sidebar active state
            document.querySelectorAll('.lesson-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`[data-lesson="${lessonNumber}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    function nextLesson() {
        const currentActive = document.querySelector('.lesson-item.active');
        if (currentActive) {
            const currentNumber = parseInt(currentActive.dataset.lesson);
            if (currentNumber < 6) {
                showLesson(currentNumber + 1);
            }
        }
    }

    function prevLesson() {
        const currentActive = document.querySelector('.lesson-item.active');
        if (currentActive) {
            const currentNumber = parseInt(currentActive.dataset.lesson);
            if (currentNumber > 1) {
                showLesson(currentNumber - 1);
            }
        }
    }