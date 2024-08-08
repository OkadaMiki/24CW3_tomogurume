document.addEventListener("DOMContentLoaded", () => {
    // console.log("いけてんのか？");
    const reviewsContainer = document.querySelector(".reviewsContainer");
    const reviews = JSON.parse(localStorage.getItem("cw3reviews")) || [];

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>口コミがありません。</p>";
        return;
    }

    reviews.forEach((review) => {
        reviewsContainer.insertAdjacentHTML(
            "beforeend",
            `<div class="review">
                    <div class="imgWrap">
                        ${review.images.map((imageUrl) => {
                            return `<img src="${imageUrl}">`;
                        })}
                    </div>
                <div class="textWrap">
                    <h2>${review.placeName}</h2>
                    <p>${review.userName}</p>
                    <p>${review.review}</p>
                </div>
            </div>`
        );
    });
});

const imgWrap = document.querySelector(".imgWrap");
const images = document.querySelectorAll(".imgWrap img");
let currentIndex = 0;
let startX = 0;
let isDragging = false;

imgWrap.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

imgWrap.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    imgWrap.style.transform = `translateX(${diffX - currentIndex * 120}px)`;
});

imgWrap.addEventListener("touchend", (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 60) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else if (diffX < -60) {
        currentIndex = (currentIndex + 1) % images.length;
    }
    updateSlide();
});

function updateSlide() {
    const offset = -currentIndex * 120;
    imgWrap.style.transform = `translateX(${offset}px)`;
}
