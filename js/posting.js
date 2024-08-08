document.getElementById("images").addEventListener("change", (event) => {
    const files = event.target.files;
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = ""; // 以前のプレビューをクリア

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "preview-image";
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});

document.querySelector(".reviewForm").addEventListener("submit", (event) => {
    event.preventDefault(); // フォームのデフォルトの送信を防止

    const placeName = document.getElementById("placeName").value;
    const userName = document.getElementById("userName").value;
    const review = document.getElementById("review").value;
    const images = document.getElementById("images").files;

    const imageUrls = [];
    const readerPromises = [];

    // 画像をBase64に変換
    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const reader = new FileReader();
        const readerPromise = new Promise((resolve, reject) => {
            reader.onload = function (event) {
                imageUrls.push(event.target.result);
                resolve();
            };
            reader.onerror = function (event) {
                reject(event);
            };
            reader.readAsDataURL(file);
        });
        readerPromises.push(readerPromise);
    }

    Promise.all(readerPromises)
        .then(() => {
            // 口コミデータをローカルストレージに保存
            let cw3reviews =
                JSON.parse(localStorage.getItem("cw3reviews")) || [];
            cw3reviews.push({
                placeName,
                userName,
                review,
                images: imageUrls,
            });
            localStorage.setItem("cw3reviews", JSON.stringify(cw3reviews));

            // フォームをリセット
            document.querySelector(".reviewForm").reset();
            document.getElementById("previewContainer").innerHTML = ""; // プレビューをクリア

            alert("口コミが保存されました！");
        })
        .catch((error) => {
            console.error("画像の読み込み中にエラーが発生しました:", error);
        });
});
