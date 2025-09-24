document.querySelector('.btn-accent').addEventListener('click', function() {
  alert('Redirecting to shop page!');
});

// Put this at the end of body or use defer when loading
document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('mainProductImage');
  const thumbs = Array.from(document.querySelectorAll('.thumbnails img'));

  if (!mainImage || thumbs.length === 0) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // If clicked thumbnail already active, do nothing
      if (thumb.classList.contains('active')) return;

      // Update active thumbnail
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Determine new src (use data-full if present)
      const newSrc = thumb.dataset.full || thumb.src;

      // Fade out main image, then swap src, then fade in when loaded
      // ensure transition is set
      mainImage.style.transition = 'opacity 180ms ease-in-out';
      mainImage.style.opacity = '0';

      // Handler for when fade-out completes
      const onFadeOut = (ev) => {
        if (ev.propertyName !== 'opacity') return;
        mainImage.removeEventListener('transitionend', onFadeOut);

        // Change src
        mainImage.src = newSrc;

        // When the new image finishes loading, fade it back in
        mainImage.onload = () => {
          // small delay to ensure browser processed src change
          requestAnimationFrame(() => {
            mainImage.style.opacity = '1';
            // cleanup the onload handler
            mainImage.onload = null;
          });
        };

        // Fallback: if image is cached and onload may not fire, ensure opacity back after short timeout
        setTimeout(() => {
          if (mainImage.complete) mainImage.style.opacity = '1';
        }, 300);
      };

      mainImage.addEventListener('transitionend', onFadeOut);
    });
  });
});


console.log("JS file is loaded!");

  