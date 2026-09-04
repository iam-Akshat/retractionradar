import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL('../components/repair-desk.tsx', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

// Drive the component's local state and event handlers without a browser or API.
function mount(props) {
  const slots = [];
  let cursor = 0;
  const module = { exports: {} };
  runInNewContext(compiled, {
    exports: module.exports,
    require: (id) => id === 'react' ? {
      useState(initial) {
        const index = cursor++;
        if (!(index in slots)) slots[index] = initial;
        return [slots[index], (value) => { slots[index] = value; }];
      },
    } : require(id),
  });
  return {
    render(overrides = {}) {
      props = { ...props, ...overrides };
      cursor = 0;
      return module.exports.RepairDesk(props);
    },
  };
}

function elements(node) {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!node || typeof node !== 'object' || !node.props) return [];
  return [node, ...elements(node.props.children)];
}
function button(tree, label) {
  const found = elements(tree).find((node) => node.type === 'button' && renderToStaticMarkup(node).includes(label));
  assert.ok(found, `Missing button: ${label}`);
  return found;
}
const candidate = (doi) => ({ doi, title: `Paper ${doi}`, year: 2020, citedByCount: 10, openAccess: true });
const first = candidate('10.1000/first');
const second = candidate('10.1000/second');
const base = {
  reference: { doi: '10.1000/source', status: 'retracted' },
  candidates: [first, second], searching: false, hasSearched: true,
  onSearch() {}, onStage() {}, onDecision() {},
};

for (const status of ['pending', 'approved', 'rejected']) {
  test(`review alternatives preserves the ${status} proposal and shows results`, () => {
    const repair = Object.freeze({ candidate: first, status, rationale: 'Original rationale' });
    let searches = 0;
    const view = mount({ ...base, repair, onSearch: () => searches++ });
    let tree = view.render();
    assert.doesNotMatch(renderToStaticMarkup(tree), /Paper 10.1000\/second/);
    button(tree, 'Review other candidates').props.onClick();
    tree = view.render();
    assert.equal(searches, 1);
    assert.match(renderToStaticMarkup(tree), /Paper 10.1000\/second/);
    assert.match(renderToStaticMarkup(tree), /Original rationale/);
    assert.equal(repair.status, status);
    assert.equal(button(tree, 'Current proposal').props.disabled, true);
    assert.equal(button(tree, 'Refresh candidates').props['aria-expanded'], true);
  });
}

test('search has loading feedback, disables repeat requests, and handles empty results', () => {
  const view = mount({ ...base, repair: { candidate: first, status: 'rejected' } });
  button(view.render(), 'Review other candidates').props.onClick();
  let tree = view.render({ searching: true });
  assert.equal(button(tree, 'Searching OpenAlex').props.disabled, true);
  assert.match(renderToStaticMarkup(tree), /<output/);
  assert.doesNotMatch(renderToStaticMarkup(tree), /Paper 10.1000\/second/);
  tree = view.render({ searching: false, candidates: [], hasSearched: true });
  assert.match(renderToStaticMarkup(tree), /No candidate leads returned/);
  assert.equal(button(tree, 'Refresh candidates').props.disabled, false);
});

test('staging a different lead returns to a fresh pending review', () => {
  let staged;
  const view = mount({ ...base, repair: { candidate: first, status: 'approved' }, onStage: (value) => { staged = value; } });
  button(view.render(), 'Review other candidates').props.onClick();
  button(view.render(), 'Stage').props.onClick();
  assert.equal(staged, second);
  const tree = view.render({ repair: { candidate: staged, status: 'pending', rationale: 'New proposal' } });
  assert.match(renderToStaticMarkup(tree), /Pending human approval/);
  assert.doesNotMatch(renderToStaticMarkup(tree), /OpenAlex candidates/);
  button(tree, 'Approve repair');
  button(tree, 'Reject');
});

test('initial search and retry remain available without a repair', () => {
  const view = mount({ ...base, candidates: [], hasSearched: false });
  button(view.render(), 'Find candidate leads');
  const tree = view.render({ hasSearched: true });
  assert.match(renderToStaticMarkup(tree), /No candidate leads returned/);
  button(tree, 'Try search again');
});
