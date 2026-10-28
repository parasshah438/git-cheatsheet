(function () {
	var groups = document.querySelectorAll('.group');
	var nav = document.getElementById('nav');
	var aside = document.querySelector('aside');
	var navGroups = {};
	var searchText = {};
	document.querySelectorAll('.topic').forEach(function (t) {
		searchText[t.id] = t.textContent.toLowerCase();
	});

	groups.forEach(function (group) {
		var details = document.createElement('details');
		var summary = document.createElement('summary');
		summary.textContent = group.querySelector('h2').textContent;
		details.appendChild(summary);
		group.querySelectorAll('.topic').forEach(function (topic) {
			var a = document.createElement('a');
			a.href = '#' + topic.id;
			a.textContent = topic.querySelector('h3').textContent;
			a.dataset.target = topic.id;
			details.appendChild(a);
		});
		nav.appendChild(details);
		navGroups[group.id] = details;
	});

	var current = null;
	function setActive(id) {
		var link = nav.querySelector('[data-target="' + id + '"]');
		if (!link || link === current) return;
		if (current) current.classList.remove('active');
		current = link;
		link.classList.add('active');
		link.parentNode.open = true;
		var a = aside.getBoundingClientRect();
		var l = link.getBoundingClientRect();
		if (l.top < a.top || l.bottom > a.bottom) {
			aside.scrollTop += l.top - a.top - aside.clientHeight / 3;
		}
	}

	var visible = {};
	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
		var first = null;
		document.querySelectorAll('.topic').forEach(function (t) {
			if (!first && visible[t.id]) first = t;
		});
		if (first) setActive(first.id);
	}, { rootMargin: '0px 0px -60% 0px' });
	document.querySelectorAll('.topic').forEach(function (t) { observer.observe(t); });

	document.querySelectorAll('pre').forEach(function (pre) {
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'copy';
		btn.textContent = 'Copy';
		btn.addEventListener('click', function () {
			var text = pre.querySelector('code').textContent;
			navigator.clipboard.writeText(text).then(function () {
				btn.textContent = 'Copied';
				setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
			});
		});
		pre.appendChild(btn);
	});

	var LEVEL_BY_GROUP = {
		'start-here': 'beginner', concepts: 'beginner', setup: 'beginner', workflow: 'beginner',
		branching: 'beginner', remote: 'beginner', undo: 'intermediate', stash: 'intermediate',
		advanced: 'advanced', security: 'intermediate', trending: 'intermediate',
		recipes: 'intermediate', errors: 'intermediate', practice: 'beginner',
		reference: 'beginner', 'whats-new': 'advanced', compare: 'intermediate',
		'more-commands': 'advanced', internals: 'advanced', hosts: 'intermediate',
		interview: 'intermediate'
	};
	var LEVEL_OVERRIDE = {
		'git-blame': 'intermediate', 'git-rm': 'intermediate', 'git-cherry-pick': 'intermediate',
		'branch-origin': 'intermediate', 'git-rebase': 'intermediate', 'merge-conflicts': 'intermediate',
		'git-reflog': 'intermediate', 'git-lfs': 'intermediate', 'reflog-recovery': 'intermediate',
		'aliases-config': 'intermediate', 'line-endings': 'intermediate', 'pull-request-workflow': 'beginner',
		'branching-strategies': 'beginner', 'commit-conventions': 'beginner', 'fork-upstream-sync': 'intermediate',
		'git-bisect': 'advanced', 'git-worktree': 'advanced', 'interactive-rebase': 'advanced',
		'fixup-autosquash': 'advanced', 'submodules-subtree': 'advanced', 'large-repos': 'advanced',
		'safe-force-push': 'advanced', 'parallel-agents': 'advanced', 'monorepo': 'advanced',
		'new-version': 'beginner', 'add-resolved': 'intermediate', 'branch-delete-merged': 'intermediate',
		'status-compare': 'intermediate', 'checkout-merge': 'intermediate', 'push-groups': 'intermediate',
		'r-undo-last-commit': 'beginner', 'r-amend-message': 'beginner', 'r-forgotten-file': 'beginner',
		'r-untrack-file': 'beginner', 'r-file-history': 'beginner', 'r-whats-to-push': 'beginner',
		'r-remove-from-history': 'advanced', 'r-search-history': 'advanced',
		'e-not-a-repo': 'beginner', 'e-identity': 'beginner', 'e-no-upstream': 'beginner',
		'e-remote-exists': 'beginner', 'e-crlf': 'beginner', 'e-refspec': 'beginner',
		'p-3': 'intermediate', 'p-4': 'intermediate', 'p-5': 'intermediate', 'p-6': 'advanced',
		'cmp-fetch-pull': 'beginner', 'cmp-checkout-switch-restore': 'beginner',
		'gh-issue-links': 'intermediate', 'gh-templates': 'intermediate', 'gh-releases': 'intermediate',
		'git-archive': 'intermediate', 'git-shortlog': 'intermediate',
		'git-notes': 'advanced', 'git-describe': 'intermediate', 'git-ls-files': 'intermediate',
		'git-blame-lines': 'intermediate', 'git-diff-check': 'intermediate', 'difftool-mergetool': 'intermediate',
		'git-rerere': 'intermediate', 'git-credential': 'intermediate', 'config-includeif': 'intermediate',
		'git-cherry': 'intermediate', 'int-objects': 'intermediate', 'int-revisions': 'intermediate',
		'int-git-dir': 'intermediate', 'host-compare': 'beginner', 'host-vscode': 'beginner',
		'int-tips': 'beginner', 'int-beginner': 'beginner', 'int-intermediate': 'intermediate',
		'int-advanced': 'advanced', 'int-scenarios': 'intermediate', 'int-rapid': 'beginner'
	};
	var DESTRUCTIVE = [
		'git-restore', 'git-reset', 'git-clean', 'git-rebase', 'interactive-rebase', 'git-history',
		'git-stash-more', 'safe-force-push', 'secrets', 'r-undo-last-commit', 'r-wrong-branch',
		'r-match-remote', 'r-remove-from-history', 'r-undo-merge', 'e-non-fast-forward', 'p-6', 'git-gc-fsck'
	];
	var SINCE = {
		'git-switch': 'Git 2.23+', 'git-restore': 'Git 2.23+', 'large-repos': 'Git 2.25+',
		'signed-commits': 'Git 2.34+ for SSH', 'safe-force-push': 'Git 2.30+', 'monorepo': 'Git 2.38+',
		'ai-assisted-git': 'Git 2.32+ for --trailer', 'config-includeif': 'Git 2.36+ for hasconfig'
	};
	var LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

	function load(key) {
		try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
	}
	function store(key, value) {
		try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
	}

	var favs = load('gc-fav');
	var recent = load('gc-recent');
	var titles = {};
	var quick = document.getElementById('quick');

	function renderQuick() {
		quick.textContent = '';
		[['Favourites', favs], ['Recent', recent]].forEach(function (pair) {
			var ids = pair[1].filter(function (id) { return titles[id]; });
			if (!ids.length) return;
			var details = document.createElement('details');
			details.open = true;
			var summary = document.createElement('summary');
			summary.textContent = pair[0];
			details.appendChild(summary);
			ids.forEach(function (id) {
				var a = document.createElement('a');
				a.href = '#' + id;
				a.textContent = titles[id];
				details.appendChild(a);
			});
			quick.appendChild(details);
		});
	}

	function addRecent(id) {
		recent = recent.filter(function (r) { return r !== id; });
		recent.unshift(id);
		recent = recent.slice(0, 5);
		store('gc-recent', recent);
		// Re-render after the click so the link being followed is not removed mid-navigation.
		setTimeout(renderQuick, 0);
	}

	aside.addEventListener('click', function (e) {
		var a = e.target.closest('a');
		if (a && a.hash) addRecent(a.hash.slice(1));
	});

	function makeBadge(cls, label) {
		var s = document.createElement('span');
		s.className = 'badge ' + cls;
		s.textContent = label;
		return s;
	}

	groups.forEach(function (group) {
		group.querySelectorAll('.topic').forEach(function (topic) {
			var h3 = topic.querySelector('h3');
			var level = LEVEL_OVERRIDE[topic.id] || LEVEL_BY_GROUP[group.id] || 'intermediate';
			var danger = DESTRUCTIVE.indexOf(topic.id) !== -1;
			topic.dataset.level = level;
			topic.dataset.danger = danger ? '1' : '0';
			titles[topic.id] = h3.textContent;

			h3.appendChild(makeBadge(level, LEVEL_LABEL[level]));
			if (danger) h3.appendChild(makeBadge('destructive', 'Destructive'));
			if (SINCE[topic.id]) h3.appendChild(makeBadge('since', SINCE[topic.id]));

			var star = document.createElement('button');
			star.type = 'button';
			star.className = 'star';
			var paint = function () {
				var on = favs.indexOf(topic.id) !== -1;
				star.textContent = on ? 'Saved' : 'Save';
				star.setAttribute('aria-pressed', on ? 'true' : 'false');
			};
			paint();
			star.addEventListener('click', function () {
				var i = favs.indexOf(topic.id);
				if (i === -1) favs.push(topic.id); else favs.splice(i, 1);
				store('gc-fav', favs);
				paint();
				renderQuick();
			});
			var pres = topic.querySelectorAll('pre');
			if (pres.length > 1) {
				var all = document.createElement('button');
				all.type = 'button';
				all.className = 'copy-all';
				all.textContent = 'Copy all';
				all.addEventListener('click', function () {
					var text = Array.prototype.map.call(pres, function (p) {
						return p.querySelector('code').textContent;
					}).join('\n\n');
					navigator.clipboard.writeText(text).then(function () {
						all.textContent = 'Copied';
						setTimeout(function () { all.textContent = 'Copy all'; }, 1500);
					});
				});
				h3.appendChild(all);
			}
			h3.appendChild(star);
		});
	});

	var searchBox = document.getElementById('search');
	var levelSelect = document.getElementById('level');

	function applyFilters() {
		var q = searchBox.value.trim().toLowerCase();
		var lv = levelSelect.value;
		var filtering = !!q || lv !== 'all';
		var anyVisible = false;
		document.querySelectorAll('.topic').forEach(function (topic) {
			var okText = !q || searchText[topic.id].indexOf(q) !== -1;
			var okLevel = lv === 'all' || (lv === 'destructive' ? topic.dataset.danger === '1' : topic.dataset.level === lv);
			var match = okText && okLevel;
			topic.classList.toggle('hidden', !match);
			nav.querySelector('[data-target="' + topic.id + '"]').classList.toggle('hidden', !match);
			if (match) anyVisible = true;
		});
		groups.forEach(function (group) {
			var has = !!group.querySelector('.topic:not(.hidden)');
			group.classList.toggle('hidden', !has);
			navGroups[group.id].classList.toggle('hidden', !has);
			if (filtering && has) navGroups[group.id].open = true;
		});
		document.getElementById('empty').classList.toggle('hidden', anyVisible);
		if (q) {
			document.querySelectorAll('.qa').forEach(function (d) {
				d.open = d.textContent.toLowerCase().indexOf(q) !== -1;
			});
		}
		highlightMatches(q);
	}

	function highlightMatches(q) {
		if (!window.CSS || !CSS.highlights) return;
		CSS.highlights.delete('search');
		if (q.length < 2) return;
		var ranges = [];
		document.querySelectorAll('.topic:not(.hidden)').forEach(function (topic) {
			var walker = document.createTreeWalker(topic, NodeFilter.SHOW_TEXT);
			var node;
			while ((node = walker.nextNode())) {
				if (node.parentElement.closest('button')) continue;
				var text = node.nodeValue.toLowerCase();
				var i = text.indexOf(q);
				while (i !== -1) {
					var r = new Range();
					r.setStart(node, i);
					r.setEnd(node, i + q.length);
					ranges.push(r);
					i = text.indexOf(q, i + q.length);
				}
			}
		});
		if (ranges.length) CSS.highlights.set('search', new Highlight(...ranges));
	}
	searchBox.addEventListener('input', applyFilters);
	levelSelect.addEventListener('change', applyFilters);

	document.addEventListener('keydown', function (e) {
		var tag = (e.target.tagName || '').toLowerCase();
		if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
			e.preventDefault();
			searchBox.focus();
			searchBox.select();
		} else if (e.key === 'Escape' && e.target === searchBox) {
			searchBox.value = '';
			applyFilters();
			searchBox.blur();
		}
	});

	document.getElementById('expand').addEventListener('click', function () {
		Object.keys(navGroups).forEach(function (id) { navGroups[id].open = true; });
	});
	document.getElementById('collapse').addEventListener('click', function () {
		Object.keys(navGroups).forEach(function (id) { navGroups[id].open = false; });
	});

	function setAnswers(open) {
		document.querySelectorAll('.qa').forEach(function (d) { d.open = open; });
	}
	document.getElementById('qa-expand').addEventListener('click', function () { setAnswers(true); });
	document.getElementById('qa-collapse').addEventListener('click', function () { setAnswers(false); });
	window.addEventListener('beforeprint', function () { setAnswers(true); });

	var root = document.documentElement;
	try {
		var savedTheme = localStorage.getItem('gc-theme');
		if (savedTheme) root.dataset.theme = savedTheme;
	} catch (e) { /* storage unavailable */ }
	document.getElementById('theme').addEventListener('click', function () {
		var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
		var next = dark ? 'light' : 'dark';
		root.dataset.theme = next;
		try { localStorage.setItem('gc-theme', next); } catch (e) { /* storage unavailable */ }
	});

	document.getElementById('print').addEventListener('click', function () {
		document.body.classList.add('print-quick');
		window.print();
	});
	window.addEventListener('afterprint', function () {
		document.body.classList.remove('print-quick');
	});

	var topBtn = document.getElementById('top');
	window.addEventListener('scroll', function () {
		topBtn.classList.toggle('hidden', window.scrollY < 600);
	}, { passive: true });
	topBtn.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	renderQuick();
})();
