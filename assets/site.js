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
