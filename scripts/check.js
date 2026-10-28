#!/usr/bin/env node
'use strict';

// Checks the cheatsheet without any dependencies: node scripts/check.js [--external]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const pages = ['git.html', 'index.html'];
const errors = [];
let checks = 0;

function fail(message) {
	errors.push(message);
}

function read(file) {
	return fs.readFileSync(path.join(root, file), 'utf8');
}

function literal(source, name, open, close) {
	const re = new RegExp('var ' + name + ' = (\\' + open + '[\\s\\S]*?\\n\\t\\' + close + ');');
	const match = source.match(re);
	if (!match) {
		fail('app.js: could not find ' + name);
		return null;
	}
	return vm.runInNewContext('(' + match[1] + ')');
}

function checkPage(page) {
	const html = read(page);

	const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
	const seen = new Set();
	for (const id of ids) {
		checks++;
		if (seen.has(id)) fail(page + ': duplicate id "' + id + '"');
		seen.add(id);
	}

	for (const m of html.matchAll(/\shref="#([^"]*)"/g)) {
		checks++;
		if (m[1] && !seen.has(m[1])) fail(page + ': link to missing anchor "#' + m[1] + '"');
	}

	for (const m of html.matchAll(/\s(?:href|src)="([^"#][^"]*)"/g)) {
		const ref = m[1];
		if (/^(https?:|mailto:|data:)/.test(ref)) continue;
		checks++;
		const file = path.join(root, ref.split('#')[0].split('?')[0]);
		if (!fs.existsSync(file)) fail(page + ': missing local file "' + ref + '"');
	}

	for (const m of html.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
		checks++;
		if (!/rel="[^"]*noopener/.test(m[0])) fail(page + ': target="_blank" link without rel="noopener": ' + m[0]);
	}

	return html;
}

function checkTags(page, html) {
	const tags = ['main', 'aside', 'nav', 'div', 'section', 'article', 'pre', 'code', 'ul', 'ol', 'li', 'p',
		'h1', 'h2', 'h3', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'dl', 'dt', 'dd', 'a', 'svg', 'button', 'select'];
	for (const tag of tags) {
		checks++;
		const open = (html.match(new RegExp('<' + tag + '[\\s>]', 'g')) || []).length;
		const close = (html.match(new RegExp('</' + tag + '>', 'g')) || []).length;
		if (open !== close) fail(page + ': <' + tag + '> opened ' + open + ' times but closed ' + close + ' times');
	}
}

function checkStructure(html) {
	const chunks = html.split('<article class="topic"').slice(1);
	for (const chunk of chunks) {
		checks++;
		const id = (chunk.match(/^\s+id="([^"]+)"/) || [])[1];
		if (!id) fail('git.html: topic without an id');
		if (!/<h3>/.test(chunk.split('</article>')[0])) fail('git.html: topic "' + id + '" has no <h3>');
	}
	const groups = html.split('<section class="group"').slice(1);
	for (const chunk of groups) {
		checks++;
		const id = (chunk.match(/^\s+id="([^"]+)"/) || [])[1];
		if (!id) fail('git.html: group without an id');
		if (!/<h2>/.test(chunk.split('</section>')[0])) fail('git.html: group "' + id + '" has no <h2>');
	}
}

function checkScriptMaps(html) {
	const js = read('app.js');
	const topicIds = new Set([...html.matchAll(/<article class="topic" id="([^"]+)"/g)].map((m) => m[1]));
	const groupIds = new Set([...html.matchAll(/<section class="group" id="([^"]+)"/g)].map((m) => m[1]));
	const levels = new Set(['beginner', 'intermediate', 'advanced']);

	const byGroup = literal(js, 'LEVEL_BY_GROUP', '{', '}') || {};
	for (const [id, level] of Object.entries(byGroup)) {
		checks++;
		if (!groupIds.has(id)) fail('app.js: LEVEL_BY_GROUP has unknown group "' + id + '"');
		if (!levels.has(level)) fail('app.js: LEVEL_BY_GROUP has invalid level "' + level + '" for "' + id + '"');
	}
	for (const id of groupIds) {
		checks++;
		if (!(id in byGroup)) fail('app.js: group "' + id + '" has no entry in LEVEL_BY_GROUP');
	}

	const override = literal(js, 'LEVEL_OVERRIDE', '{', '}') || {};
	for (const [id, level] of Object.entries(override)) {
		checks++;
		if (!topicIds.has(id)) fail('app.js: LEVEL_OVERRIDE has unknown topic "' + id + '"');
		if (!levels.has(level)) fail('app.js: LEVEL_OVERRIDE has invalid level "' + level + '" for "' + id + '"');
	}

	for (const id of literal(js, 'DESTRUCTIVE', '[', ']') || []) {
		checks++;
		if (!topicIds.has(id)) fail('app.js: DESTRUCTIVE has unknown topic "' + id + '"');
	}

	for (const id of Object.keys(literal(js, 'SINCE', '{', '}') || {})) {
		checks++;
		if (!topicIds.has(id)) fail('app.js: SINCE has unknown topic "' + id + '"');
	}
}

async function checkExternal(html) {
	const urls = [...new Set([...html.matchAll(/\shref="(https?:\/\/[^"]+)"/g)].map((m) => m[1]))];
	for (const url of urls) {
		checks++;
		try {
			let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
			if (res.status === 405 || res.status === 403) {
				res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10000) });
			}
			if (!res.ok) fail('external link ' + url + ' returned ' + res.status);
		} catch (error) {
			fail('external link ' + url + ' failed: ' + error.message);
		}
	}
}

async function main() {
	const contents = {};
	for (const page of pages) contents[page] = checkPage(page);
	checkTags('git.html', contents['git.html']);
	checkStructure(contents['git.html']);
	checkScriptMaps(contents['git.html']);
	if (process.argv.includes('--external')) await checkExternal(contents['git.html']);

	if (errors.length) {
		console.error(errors.length + ' problem(s) found:');
		for (const message of errors) console.error(' - ' + message);
		process.exit(1);
	}
	console.log('OK: ' + checks + ' checks passed.');
}

main();
