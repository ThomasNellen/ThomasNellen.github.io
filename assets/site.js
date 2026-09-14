/* Topic filter for the papers page. No dependencies. */
(function () {
  var filter = document.querySelector('.filter');
  if (!filter) return;

  var buttons = Array.prototype.slice.call(filter.querySelectorAll('button'));
  var papers  = Array.prototype.slice.call(document.querySelectorAll('.paper'));
  var groups  = Array.prototype.slice.call(document.querySelectorAll('.paper-group'));
  var empty   = document.getElementById('no-results');

  function apply(topic) {
    var shown = 0;

    papers.forEach(function (paper) {
      var topics = (paper.getAttribute('data-topics') || '').split(/\s+/);
      var match = topic === 'all' || topics.indexOf(topic) !== -1;
      paper.hidden = !match;
      if (match) shown++;
    });

    // A section heading with nothing under it is noise, so hide it too.
    groups.forEach(function (group) {
      var visible = group.querySelectorAll('.paper:not([hidden])').length;
      group.hidden = visible === 0;
    });

    if (empty) empty.hidden = shown !== 0;

    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.topic === topic));
    });
  }

  filter.addEventListener('click', function (event) {
    var button = event.target.closest('button');
    if (button) apply(button.dataset.topic);
  });
})();

/* Copy-to-clipboard for the BibTeX blocks. */
(function () {
  var buttons = document.querySelectorAll('.copy');
  if (!buttons.length) return;

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function flash(button, message) {
    var original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = message;
    button.dataset.state = 'done';
    window.setTimeout(function () {
      button.textContent = button.dataset.label;
      button.removeAttribute('data-state');
    }, 1800);
  }

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function () {
      var pre = button.closest('.cite-body').querySelector('pre.bibtex');
      if (!pre) return;
      var text = pre.textContent.trim();

      // The async clipboard API is unavailable over file:// and inside some
      // sandboxed frames, so fall back to a hidden textarea.
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash(button, 'copied'); },
          function () { flash(button, fallbackCopy(text) ? 'copied' : 'select and copy'); }
        );
      } else {
        flash(button, fallbackCopy(text) ? 'copied' : 'select and copy');
      }
    });
  });
})();
