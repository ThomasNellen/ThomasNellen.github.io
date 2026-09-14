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
