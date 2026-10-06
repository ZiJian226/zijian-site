(function () {
  var GITHUB_USER = 'ZiJian226';
  var REPOS_URL = 'https://api.github.com/users/' + GITHUB_USER + '/repos?sort=updated&per_page=12';

  document.getElementById('year').textContent = new Date().getFullYear();

  var list = document.getElementById('repo-list');

  function showMessage(text) {
    list.replaceChildren();
    var p = document.createElement('p');
    p.className = 'status';
    p.textContent = text;
    list.appendChild(p);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function repoCard(repo) {
    var card = el('article', 'card');
    card.appendChild(el('h3', null, repo.name));
    card.appendChild(el('p', null, repo.description || 'No description provided.'));

    var stats = el('p', 'repo-stats');
    stats.appendChild(el('span', null, repo.language || 'Other'));
    stats.appendChild(el('span', null, '★ ' + repo.stargazers_count));
    card.appendChild(stats);

    var link = el('a', 'card-link', 'View repository');
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener';
    card.appendChild(link);
    return card;
  }

  fetch(REPOS_URL, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      if (!Array.isArray(repos) || repos.length === 0) {
        showMessage('No public repositories to show yet.');
        return;
      }
      list.replaceChildren.apply(list, repos.map(repoCard));
    })
    .catch(function () {
      showMessage('Could not load repositories right now. See them on GitHub: github.com/' + GITHUB_USER);
    });
})();
