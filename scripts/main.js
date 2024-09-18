document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingResult = document.getElementById('rating-result');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-value'), 10);
            ratingResult.textContent = `You rated this site ${rating} stars.`;

            stars.forEach(s => s.classList.remove('selected'));

            star.classList.add('selected');
            let previousSibling = star.previousElementSibling;
            while (previousSibling) {
                previousSibling.classList.add('selected');
                previousSibling = previousSibling.previousElementSibling;
            }

            if (rating <= 3) {
                ratingResult.textContent += ' I will do better next time!';
            } else if (rating > 3) {
                ratingResult.textContent += ' Thank you for your feedback!';
            }
        });

        star.addEventListener('mouseover', () => {

            stars.forEach(s => s.classList.remove('selected'));

            star.classList.add('selected');
            let previousSibling = star.previousElementSibling;
            while (previousSibling) {
                previousSibling.classList.add('selected');
                previousSibling = previousSibling.previousElementSibling;
            }
        });

        star.addEventListener('mouseout', () => {

            stars.forEach(s => s.classList.remove('selected'));


            const selectedRating = parseInt(ratingResult.textContent.match(/\d+/), 10);
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value'), 10) <= selectedRating) {
                    s.classList.add('selected');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function updateDateTime() {
        const dateTimeElement = document.getElementById('current-date-time');
        const now = new Date();
        const formattedDateTime = now.toLocaleString();
        dateTimeElement.textContent = `Current Date and Time: ${formattedDateTime}`;
    }

    updateDateTime();

    setInterval(updateDateTime, 1000);
});