// 自動スライドショーの制御
window.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    function nextSlide() {
        // 現在の表示されている画像から active クラスを消す
        slides[currentSlide].classList.remove('active');

        // 次の画像のインデックスを計算（3枚目の次は0枚目に戻る）
        currentSlide = (currentSlide + 1) % slides.length;

        // 次の画像に active クラスをつける（★ここを修正しました）
        slides[currentSlide].classList.add('active');
    }

    // 4000ミリ秒（4秒）ごとに nextSlide 関数を実行
    setInterval(nextSlide, 4000);
});