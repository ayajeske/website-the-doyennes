// Sliders (hero photos and signature quotes) and the contact form.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeSlider(name, interval, dotOff) {
    var track = document.querySelector('[data-slider="' + name + '"]');
    if (!track) return;
    var slides = track.children;
    var dots = document.querySelectorAll('[data-dot="' + name + '"]');
    var toggle = document.querySelector('[data-toggle="' + name + '"]');
    var label = toggle.getAttribute('aria-label').replace(/^Pause /, '');
    var index = 0;
    var playing = !reduceMotion;

    function show(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      for (var s = 0; s < slides.length; s++) slides[s].setAttribute('aria-hidden', s === index ? 'false' : 'true');
      for (var d = 0; d < dots.length; d++) {
        var on = d === index;
        dots[d].setAttribute('aria-current', on ? 'true' : 'false');
        dots[d].firstElementChild.style.width = on ? '28px' : '10px';
        dots[d].firstElementChild.style.background = on ? '#FFFFFF' : dotOff;
      }
    }

    function setPlaying(p) {
      playing = p;
      track.setAttribute('aria-live', p ? 'off' : 'polite');
      toggle.setAttribute('aria-label', (p ? 'Pause ' : 'Play ') + label);
      toggle.querySelector('.ic-pause').style.display = p ? '' : 'none';
      toggle.querySelector('.ic-play').style.display = p ? 'none' : '';
    }

    document.querySelector('[data-prev="' + name + '"]').addEventListener('click', function () { show(index - 1); });
    document.querySelector('[data-next="' + name + '"]').addEventListener('click', function () { show(index + 1); });
    toggle.addEventListener('click', function () { setPlaying(!playing); });
    for (var d = 0; d < dots.length; d++) {
      (function (i) { dots[i].addEventListener('click', function () { show(i); }); })(d);
    }

    setPlaying(playing);
    setInterval(function () { if (playing && !document.hidden) show(index + 1); }, interval);
  }

  makeSlider('hero', 6000, 'rgba(255,255,255,0.6)');
  makeSlider('quote', 5000, 'rgba(233,188,192,0.6)');

  // Contact form: for now it opens an email to Hanna with the details filled in.
  var form = document.getElementById('join-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in your name and a valid email, and tick the consent box.';
        form.reportValidity();
        return;
      }
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var body = 'Name: ' + name + '\nEmail: ' + email + (message ? '\n\n' + message : '');
      window.location.href = 'mailto:hanna@thedoyennes.com?subject=' +
        encodeURIComponent('Meeting request: The Doyennes') + '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app should open with your request. Thank you!';
    });
  }
})();
