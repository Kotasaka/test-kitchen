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

// 次の出店リボン：開催中は「ただいま出店中」、終了後は Instagram への案内に切り替える
window.addEventListener('DOMContentLoaded', () => {
    const ribbon = document.getElementById('schedule');
    if (!ribbon || !ribbon.dataset.start || !ribbon.dataset.end) return;

    // 見ている人の端末の日付（日本時間）を YYYY-MM-DD にする
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    if (today > ribbon.dataset.end) {
        ribbon.querySelector('.next-ribbon-date').textContent = 'Instagram でお知らせします';
        ribbon.querySelector('.next-ribbon-place').textContent = '@mogful_foodtruck';
    } else if (today >= ribbon.dataset.start) {
        ribbon.querySelector('small').textContent = 'ただいま出店中';
    }
});

// 追従Instagramバナー
window.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.insta-float');
    const sns = document.getElementById('sns');
    if (!banner || !sns) return;

    // ×ボタンで閉じる（同じタブで見ている間は閉じたまま）
    const close = banner.querySelector('.insta-float-close');
    try {
        if (sessionStorage.getItem('instaFloatClosed') === '1') banner.classList.add('is-closed');
    } catch (e) { }
    close.addEventListener('click', () => {
        banner.classList.add('is-closed');
        try { sessionStorage.setItem('instaFloatClosed', '1'); } catch (e) { }
    });

    // 少しスクロールするまでは出さない
    const update = () => banner.classList.toggle('is-waiting', window.scrollY < 200);
    update();
    window.addEventListener('scroll', update, { passive: true });

    if (!('IntersectionObserver' in window)) return;
    // SNSセクションが画面に入ったら隠す（同じリンクが2つ並ばないように）
    new IntersectionObserver((entries) => {
        banner.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(sns);
});
