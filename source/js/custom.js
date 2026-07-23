(() => {
  const mountBannerVideo = () => {
    const header = document.querySelector('#page-header.full_page');
    if (!header || header.querySelector('.banner-video')) return;

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrowScreen = window.matchMedia('(max-width: 768px)').matches;
    if (reduceMotion || narrowScreen || connection?.saveData) return;

    const video = document.createElement('video');
    video.className = 'banner-video';
    video.src = '/video/bg.mp4';
    video.poster = '/images/Background.png';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');

    header.prepend(video);
    video.play().catch(() => video.remove());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountBannerVideo, { once: true });
  } else {
    mountBannerVideo();
  }
  document.addEventListener('pjax:complete', mountBannerVideo);
})();