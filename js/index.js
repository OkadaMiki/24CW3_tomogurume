document.addEventListener("DOMContentLoaded", function () {
    const reviewsContainer = document.getElementById("reviewsContainer");
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>口コミがありません。</p>";
        return;
    }

    reviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review";

        const placeNameElement = document.createElement("h2");
        placeNameElement.textContent = `場所: ${review.placeName}`;
        reviewElement.appendChild(placeNameElement);

        if (review.userName) {
            const userNameElement = document.createElement("p");
            userNameElement.textContent = `一緒に行った人: ${review.userName}`;
            reviewElement.appendChild(userNameElement);
        }

        const reviewTextElement = document.createElement("p");
        reviewTextElement.textContent = review.review;
        reviewElement.appendChild(reviewTextElement);

        review.images.forEach((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            reviewElement.appendChild(img);
        });

        reviewsContainer.appendChild(reviewElement);
    });
});
