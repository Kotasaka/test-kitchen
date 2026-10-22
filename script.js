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

    // 端末で「視差効果を減らす／動きを減らす」が有効なら、1枚目のまま止める（2枚目以降は読み込まない）
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 2枚目以降の画像は、最初の表示に必要なものを読み終えてから読み込む
    window.addEventListener('load', () => {
        slides.forEach((slide) => {
            if (slide.dataset.bg) slide.style.backgroundImage = `url('${slide.dataset.bg}')`;
        });
    });

    // 4000ミリ秒（4秒）ごとに nextSlide 関数を実行
    setInterval(nextSlide, 4000);
});

// スマホのメニューボタン：ナビの開閉
window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const toggle = document.querySelector('.nav-toggle');
    if (!header || !toggle) return;

    const setOpen = (open) => {
        header.classList.toggle('is-nav-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };

    toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-nav-open')));

    // リンクを押した、Escキー、メニューの外を押した、のどれかで閉じる
    header.querySelectorAll('#site-nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header.classList.contains('is-nav-open')) {
            setOpen(false);
            toggle.focus();
        }
    });
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) setOpen(false);
    });
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
