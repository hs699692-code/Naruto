// gallery.js
// Place in: Naruto-page/js/gallery.js
// Edit the `images` array below to match your filenames OR use the generateByPattern option.

// -------------- CONFIG --------------
const images = [
  // Example: 'images/gallery/naruto1.jpg',
  // Add all filenames here. Replace with your actual filenames.
  'images/gallery/image1.jpg',
  'images/gallery/image2.jpg',
  'images/gallery/image3.jpg',
  'images/gallery/image4.jpg',
  'images/gallery/image5.jpg'
];

// If your images are named like photo1.jpg ... photo10.jpg,
// you can set generateByPattern = {prefix: 'images/gallery/photo', start:1, end:10, ext:'.jpg'}
// and comment out the explicit `images` array above.
const generateByPattern = null; // or { prefix: 'images/gallery/photo', start:1, end:10, ext:'.jpg' };

// -------------- END CONFIG --------------

(function () {
  // allow pattern generation
  let imgList = images.slice();
  if (!imgList.length && generateByPattern) {
    for (let i = generateByPattern.start; i <= generateByPattern.end; i++) {
      imgList.push(`${generateByPattern.prefix}${i}${generateByPattern.ext}`);
    }
  }

  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Build gallery items
  imgList.forEach((src, idx) => {
    const item = document.createElement('button');
    item.className = 'gallery-item';
    item.setAttribute('data-index', idx);
    item.setAttribute('aria-label', `Open image ${idx + 1}`);
    item.type = 'button';

    const img = document.createElement('img');
    img.dataset.src = src; // lazy load
    img.alt = `Gallery image ${idx + 1}`;
    img.loading = 'lazy';

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = `Image ${idx + 1}`;

    item.appendChild(img);
    item.appendChild(caption);
    gallery.appendChild(item);

    // click to open
    item.addEventListener('click', () => openModal(idx));
  });

  // Lazy load images using IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target.querySelector('img');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '200px 0px' });

  document.querySelectorAll('.gallery-item').forEach(el => io.observe(el));

  // Modal logic
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const btnClose = document.getElementById('modal-close');
  const btnNext = document.getElementById('modal-next');
  const btnPrev = document.getElementById('modal-prev');

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    setModalImage(currentIndex);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // trap focus (simple)
    btnClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setModalImage(index) {
    const src = imgList[index];
    if (!src) return;
    modalImg.src = src;
    modalImg.alt = `Image ${index + 1}`;
    modalCaption.textContent = `Image ${index + 1} of ${imgList.length}`;
  }

  function next() {
    currentIndex = (currentIndex + 1) % imgList.length;
    setModalImage(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    setModalImage(currentIndex);
  }

  btnClose && btnClose.addEventListener('click', closeModal);
  btnNext && btnNext.addEventListener('click', next);
  btnPrev && btnPrev.addEventListener('click', prev);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // close when clicking outside image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

})();
