window.addEventListener("DOMContentLoaded", () => {

  // ── SMOOTH CURSOR ─────────────────────────────────
  const cur = document.getElementById('cur');
  const curImg = document.getElementById('cur-img');

  if (!cur || !curImg) {
    console.error("Cursor elements not found");
    return;
  }

  let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;

    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';

    requestAnimationFrame(tick);
  })();

  // Expand cursor on work rows
  document.querySelectorAll('.w-row[data-img]').forEach(row => {
    row.addEventListener('mouseenter', () => {
      curImg.src = row.dataset.img;
      cur.classList.add('big');
    });

    row.addEventListener('mouseleave', () => {
      cur.classList.remove('big');

      setTimeout(() => {
        if (!cur.classList.contains('big')) {
          curImg.src = '';
        }
      }, 500);
    });
  });

  // Expand cursor on thumbnail strip
  document.querySelectorAll('.thumb-strip a[data-img]').forEach(a => {
    a.addEventListener('mouseenter', () => {
      curImg.src = a.dataset.img;
      cur.classList.add('big');
    });

    a.addEventListener('mouseleave', () => {
      cur.classList.remove('big');

      setTimeout(() => {
        if (!cur.classList.contains('big')) {
          curImg.src = '';
        }
      }, 500);
    });
  });

  document.addEventListener('mouseleave', () => {
    cur.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cur.style.opacity = '1';
  });

  // ── SCROLL REVEAL ─────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('in');
        }, i * 55);

        obs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.rv').forEach(el => {
    obs.observe(el);
  });

});