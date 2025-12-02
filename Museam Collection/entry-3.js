/* entry-1.js
   - positions words along downward semicircles (U-shape)
   - ripple-in entrance per arc from center outward
   - click on a word triggers a ripple that scatters words outward, then they return
*/

(function () {
  const startButton = document.getElementById('startButton');
  const startScreen = document.getElementById('startScreen');
  const container = document.getElementById('arcContainer');
  const lines = Array.from(container.querySelectorAll('.line'));
    
  // radii multipliers for 4 concentric arcs (outermost to inner)
  const RAD_MULTS = [1.0, 0.72, 0.44, 0.22];

  // Entrance timing config
  const LINE_DELAY = 180;      // delay between starting ripple of each arc
  const PER_STEP_DELAY = 70;   // delay between words outward from center in entrance ripple

  startButton.addEventListener('click', () => {
    startScreen.style.transition = 'opacity 0.6s ease';
    startScreen.style.opacity = '0';
    setTimeout(() => {
      startScreen.style.display = 'none';
      container.classList.remove('hidden');
      container.classList.add('show');
      layoutAndAnimate();
    }, 600);
  });

  window.addEventListener('resize', () => {
    // reposition words if window size changes
    if (!container.classList.contains('hidden')) {
      layoutWords();
    }
  });

  function layoutAndAnimate() {
    layoutWords();
    // ripple-in each line (outermost to innermost)
    lines.forEach((line, li) => {
      const words = Array.from(line.querySelectorAll('.word'));
      const centerIndex = (words.length - 1) / 2;
      // ripple from center outward
      words.forEach((w, wi) => {
        const delay = LINE_DELAY * li + Math.abs(wi - centerIndex) * PER_STEP_DELAY;
        // set initial transform to be compact toward arc center (scale down slightly and offset toward center).
        w.style.transition = 'none';
        w.style.transform = 'translate(-50%, -50%) scale(0.6) translateY(-20px)';
        w.style.opacity = '0';
        // schedule entrance
        setTimeout(() => {
          // clear transition then set final transform (position is absolute so final transform should be none)
          w.style.transition = 'transform 480ms cubic-bezier(.2,.85,.3,1), opacity 300ms ease';
          w.style.transform = 'translate(-50%,-50%) scale(1) translateY(0)';
          w.style.opacity = '1';
          // mark settled after animation
          setTimeout(() => w.classList.add('settled'), 520);
        }, delay);
      });
    });

    // attach click handlers after small timeout to avoid accidental triggers during entrance
    setTimeout(() => attachWordClicks(), Math.max(600, LINE_DELAY * lines.length + 500));
  }

  function layoutWords() {
    // compute center and max radius based on container size
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    // centerY sits near top so arcs open downward; give top margin
    const topPadding = Math.max(40, rect.height * 0.06);
    const maxPossibleRadius = Math.min(rect.width / 2 - 40, rect.height - topPadding - 40);
    const radii = RAD_MULTS.map(m => Math.max(40, Math.floor(maxPossibleRadius * m)));

    // ensure radii non-overlapping with gap to accommodate word heights
    const minArcGap = 48; // vertical gap between arcs
    for (let i = 1; i < radii.length; i++) {
      if (radii[i] > radii[i - 1] - minArcGap) {
        radii[i] = radii[i - 1] - minArcGap;
      }
    }

    // position each line's words along semicircle from left (pi) to right (0)
    lines.forEach((line, li) => {
      const words = Array.from(line.querySelectorAll('.word'));
      const radius = radii[li] || (radii[radii.length - 1] - li * minArcGap);
      const n = words.length;
      const centerY = topPadding; // circle center is at topPadding (so arc goes downward by radius)
      // for semicircle angles: from pi (left) to 0 (right)
      words.forEach((w, i) => {
        // evenly spaced angles across semicircle
        const angle = Math.PI * (i / Math.max(1, n - 1)); // in radians
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        // place word centered at (x,y)
        // ensure the element has its width/height known
        w.style.position = 'absolute';
        w.style.left = `${x}px`;
        w.style.top = `${y}px`;
        // use translate(-50%,-50%) to center
        w.style.transform = 'translate(-50%,-50%)';
        // reset any scatter transforms
        if (!w.classList.contains('settled')) {
          // keep opacity 0 until entrance animation
        } else {
          // ensure final transform and opacity stable
          w.style.opacity = '1';
        }
      });
      // mark the line's element data attributes (radius) for later use
      line._radius = radius;
    });
  }

  function attachWordClicks() {
    const allWords = Array.from(container.querySelectorAll('.word'));
    allWords.forEach(w => {
      // remove previous listeners to avoid duplicates
      w.onclick = null;
      w.addEventListener('click', (ev) => {
        ev.stopPropagation();
        triggerScatterFromWord(w);
      });
    });
  }

  function triggerScatterFromWord(originWord) {
    const WORDS = Array.from(container.querySelectorAll('.word'));
    const containerRect = container.getBoundingClientRect();

    // origin center
    const oRect = originWord.getBoundingClientRect();
    const ox = oRect.left + oRect.width / 2 - containerRect.left;
    const oy = oRect.top + oRect.height / 2 - containerRect.top;

    // scattering parameters
    const BASE_SCATTER = Math.min(containerRect.width, containerRect.height) * 0.28; // base distance
    const MAX_RANDOM = BASE_SCATTER * 0.45;

    // for visual ripple we add a short expanding delay based on distance
    WORDS.forEach((w, idx) => {
      // compute center
      const r = w.getBoundingClientRect();
      const cx = r.left + r.width / 2 - containerRect.left;
      const cy = r.top + r.height / 2 - containerRect.top;
      const dx = cx - ox;
      const dy = cy - oy;
      const dist = Math.sqrt(dx * dx + dy * dy) + 6;
      const normX = dx / dist;
      const normY = dy / dist;

      // compute scatter vector (push away from origin)
      const distance = BASE_SCATTER + (Math.random() * MAX_RANDOM);
      const tx = normX * distance;
      const ty = normY * distance;

      // add slight random rotation and scale
      const rot = (Math.random() * 50 - 25);
      const scale = 0.95 + Math.random() * 0.25;

      // stagger delay to mimic ripple propagation
      const rippleDelay = Math.min(600, Math.floor(dist * 0.8));

      // apply styles to scatter
      w.classList.add('scattered');
      w.style.transition = `transform 900ms cubic-bezier(.15,.8,.35,1) ${rippleDelay}ms, opacity 600ms ease ${rippleDelay}ms`;
      w.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
      // make sure it's fully visible while scattered
      w.style.opacity = '1';
    });

    // return words to original arc positions after duration
    const TOTAL_DURATION = 1400 + 600; // animation duration + max ripple delay
    setTimeout(() => {
      WORDS.forEach(w => {
        // remove scatter transform and allow transition to bring it back
        w.style.transition = `transform 900ms cubic-bezier(.2,.9,.3,1), opacity 500ms ease`;
        w.style.transform = `translate(-50%,-50%)`; // original centering transform used when laid out
        // tidy after return
        setTimeout(() => {
          w.classList.remove('scattered');
        }, 920);
      });
    }, TOTAL_DURATION);
  }

  // initial layout hidden - prepare container appearance
  // set container to hidden state until start pressed
  container.classList.add('hidden');

  // an initial small layout in case someone resizes beforehand
  window.addEventListener('load', () => {
    // measure & layout but don't show until start
    layoutWords();
  });

})();
