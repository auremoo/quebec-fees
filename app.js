// quebec-fees — Auteur : Aurélien Moote - Moo - 2026 — Licence MIT
(() => {
  'use strict';

  /* ---------- Données ---------- */

  const GST = (rate = 5) => ({ fr: 'TPS', en: 'GST', rate });
  const HST = (rate) => ({ fr: 'TVH', en: 'HST', rate });
  const PST = (rate) => ({ fr: 'TVP', en: 'PST', rate });

  // Taux en vigueur (modifiables dans les réglages).
  const PRESETS = {
    QC: { fr: 'Québec', en: 'Quebec', taxes: [GST(), { fr: 'TVQ', en: 'QST', rate: 9.975 }] },
    ON: { fr: 'Ontario', en: 'Ontario', taxes: [HST(13)] },
    NS: { fr: 'Nouvelle-Écosse', en: 'Nova Scotia', taxes: [HST(14)] },
    NB: { fr: 'Nouveau-Brunswick', en: 'New Brunswick', taxes: [HST(15)] },
    NL: { fr: 'Terre-Neuve-et-Labrador', en: 'Newfoundland and Labrador', taxes: [HST(15)] },
    PE: { fr: 'Île-du-Prince-Édouard', en: 'Prince Edward Island', taxes: [HST(15)] },
    BC: { fr: 'Colombie-Britannique', en: 'British Columbia', taxes: [GST(), PST(7)] },
    MB: { fr: 'Manitoba', en: 'Manitoba', taxes: [GST(), { fr: 'TVD', en: 'RST', rate: 7 }] },
    SK: { fr: 'Saskatchewan', en: 'Saskatchewan', taxes: [GST(), PST(6)] },
    AB: { fr: 'Alberta', en: 'Alberta', taxes: [GST()] },
    YT: { fr: 'Yukon', en: 'Yukon', taxes: [GST()] },
    NT: { fr: 'Territoires du Nord-Ouest', en: 'Northwest Territories', taxes: [GST()] },
    NU: { fr: 'Nunavut', en: 'Nunavut', taxes: [GST()] },
  };

  const I18N = {
    fr: {
      tagline: "Taxes, pourboire et partage en un coup d'œil",
      switchLang: 'Passer en anglais', switchTheme: 'Changer de thème', settings: 'Réglages',
      modeQuick: 'Rapide', modeCart: 'Panier', modeReverse: 'Inverse',
      amountLabel: 'Montant avant taxes', zero: '0,00',
      exprHint: 'Astuce : tapez 12,50+8 pour additionner plusieurs montants.',
      exprResult: '= {v}',
      itemName: 'Article', itemQty: 'Qté', itemPrice: 'Prix', itemTaxable: 'Tx', itemTaxableTitle: 'Taxable',
      itemPlaceholder: 'Article {n}', addItem: '+ Ajouter un article',
      cartHint: 'Décochez « Tx » pour un article détaxé (ex. épicerie de base). Un prix négatif sert de rabais.',
      revLabel: 'Montant total payé (taxes incluses)', revIncludeTip: 'Ce total inclut aussi le pourboire',
      revHint: "Retrouvez le prix avant taxes à partir d'un reçu, ou le budget maximal pour un total donné.",
      tipTitle: 'Pourboire', tipCustom: 'Pourcentage personnalisé', tipFixed: 'Montant fixe',
      tipBase: 'Calculé sur', pretax: 'Avant taxes', posttax: 'Après taxes', noTip: 'Aucun',
      roundTip: 'Ajuster le pourboire pour un total rond',
      splitTitle: 'Partager la facture',
      copy: 'Copier', save: 'Enregistrer', reset: 'Effacer',
      compareTitle: 'Comparer les pourboires',
      cmpTip: 'Pourb.', cmpAmount: 'Montant', cmpTotal: 'Total', cmpPerson: '/ pers.',
      historyTitle: 'Historique', clear: 'Tout effacer', historyEmpty: "Aucun calcul enregistré pour l'instant.",
      madeBy: 'Créé par', license: 'Licence MIT',
      disclaimer: 'Taux indicatifs ({rates}). Vérifiez toujours votre reçu.',
      province: 'Province / territoire', custom: 'Personnalisé', taxes: 'Taxes appliquées',
      addTax: '+ Ajouter une taxe', taxLabel: 'Nom', combined: 'Taux combiné : {v}',
      cashRound: "Afficher l'arrondi pour paiement comptant (0,05 $)",
      showCompare: 'Afficher le comparateur de pourboires',
      tipPresetsLabel: 'Pourboires rapides (%, séparés par des espaces)',
      settingsHint: "Les réglages et l'historique restent sur cet appareil (stockage local du navigateur).",
      total: 'Total', totalWithTaxes: 'Total taxes incluses', pretaxAmount: 'Montant avant taxes',
      subtotal: 'Sous-total', taxable: 'dont taxable', taxTotal: 'Total des taxes', afterTax: 'Après taxes',
      tip: 'Pourboire', tipOf: 'Pourboire ({v})', cash: 'Arrondi comptant',
      perPerson: 'Par personne ({n})', people: '{n} personnes', effective: 'Surcoût total : +{v}',
      checkTotal: 'Total recalculé', roundingNote: 'Écart d’arrondi possible de ±0,01 $.',
      copied: 'Résumé copié', saved: 'Calcul enregistré', nothing: 'Entrez un montant d’abord',
      restored: 'Calcul restauré', confirmClear: "Effacer tout l'historique ?",
      histQuick: 'Rapide', histCart: 'Panier ({n} art.)', histReverse: 'Inverse',
      themeAuto: 'Thème : auto', themeLight: 'Thème : clair', themeDark: 'Thème : sombre',
    },
    en: {
      tagline: 'Taxes, tips and bill splitting at a glance',
      switchLang: 'Switch to French', switchTheme: 'Change theme', settings: 'Settings',
      modeQuick: 'Quick', modeCart: 'Cart', modeReverse: 'Reverse',
      amountLabel: 'Amount before taxes', zero: '0.00',
      exprHint: 'Tip: type 12.50+8 to add several amounts.',
      exprResult: '= {v}',
      itemName: 'Item', itemQty: 'Qty', itemPrice: 'Price', itemTaxable: 'Tx', itemTaxableTitle: 'Taxable',
      itemPlaceholder: 'Item {n}', addItem: '+ Add an item',
      cartHint: 'Uncheck “Tx” for a zero-rated item (e.g. basic groceries). Use a negative price for a discount.',
      revLabel: 'Total paid (taxes included)', revIncludeTip: 'This total also includes the tip',
      revHint: 'Find the pre-tax price from a receipt, or the maximum budget for a given total.',
      tipTitle: 'Tip', tipCustom: 'Custom percentage', tipFixed: 'Fixed amount',
      tipBase: 'Based on', pretax: 'Before taxes', posttax: 'After taxes', noTip: 'None',
      roundTip: 'Adjust the tip for a round total',
      splitTitle: 'Split the bill',
      copy: 'Copy', save: 'Save', reset: 'Clear',
      compareTitle: 'Compare tips',
      cmpTip: 'Tip', cmpAmount: 'Amount', cmpTotal: 'Total', cmpPerson: '/ person',
      historyTitle: 'History', clear: 'Clear all', historyEmpty: 'No saved calculations yet.',
      madeBy: 'Made by', license: 'MIT License',
      disclaimer: 'Indicative rates ({rates}). Always check your receipt.',
      province: 'Province / territory', custom: 'Custom', taxes: 'Applied taxes',
      addTax: '+ Add a tax', taxLabel: 'Name', combined: 'Combined rate: {v}',
      cashRound: 'Show cash rounding (nearest $0.05)',
      showCompare: 'Show tip comparison table',
      tipPresetsLabel: 'Quick tips (%, separated by spaces)',
      settingsHint: 'Settings and history stay on this device (browser local storage).',
      total: 'Total', totalWithTaxes: 'Total with taxes', pretaxAmount: 'Amount before taxes',
      subtotal: 'Subtotal', taxable: 'of which taxable', taxTotal: 'Total taxes', afterTax: 'After taxes',
      tip: 'Tip', tipOf: 'Tip ({v})', cash: 'Cash rounding',
      perPerson: 'Per person ({n})', people: '{n} people', effective: 'Total extra cost: +{v}',
      checkTotal: 'Recomputed total', roundingNote: 'Possible rounding difference of ±$0.01.',
      copied: 'Summary copied', saved: 'Calculation saved', nothing: 'Enter an amount first',
      restored: 'Calculation restored', confirmClear: 'Clear the whole history?',
      histQuick: 'Quick', histCart: 'Cart ({n} items)', histReverse: 'Reverse',
      themeAuto: 'Theme: auto', themeLight: 'Theme: light', themeDark: 'Theme: dark',
    },
  };

  const STORAGE_KEY = 'quebec-fees:v1';
  const HISTORY_MAX = 30;

  /* ---------- Utilitaires ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => Math.random().toString(36).slice(2, 10);
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const roundCash = (n) => Math.round(round2(n) * 20) / 20;
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  // Accepte « 12,50 », « 1 234.5 », et de petites expressions « 12,50+8*2 ».
  function parseNum(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const s = String(value ?? '').replace(/[\s  $]/g, '').replace(/,/g, '.').replace(/[x×]/gi, '*');
    if (!s || !/^[0-9.+\-*/]+$/.test(s)) return 0;
    const terms = s.match(/[+-]?[^+-]+/g) || [];
    let total = 0;
    for (const term of terms) {
      let body = term;
      let sign = 1;
      if (body[0] === '+' || body[0] === '-') { sign = body[0] === '-' ? -1 : 1; body = body.slice(1); }
      const parts = body.split(/([*/])/);
      let val = parseFloat(parts[0]);
      for (let i = 1; i < parts.length; i += 2) {
        const f = parseFloat(parts[i + 1]);
        val = parts[i] === '*' ? val * f : val / f;
      }
      if (!Number.isFinite(val)) return 0;
      total += sign * val;
    }
    return Number.isFinite(total) ? total : 0;
  }
  const isExpression = (v) => /\d\s*[+*/x×-]\s*\d/i.test(String(v ?? ''));

  /* ---------- État ---------- */

  const DEFAULTS = {
    mode: 'quick',
    lang: (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr',
    theme: 'auto',
    province: 'QC',
    taxes: clone(PRESETS.QC.taxes),
    amount: '',
    items: [{ id: uid(), name: '', qty: '1', price: '', taxable: true }],
    tip: { type: 'percent', percent: '15', fixed: '', base: 'pretax' },
    tipPresets: [0, 10, 15, 18, 20, 25],
    split: 1,
    reverse: { total: '', includeTip: false },
    cashRound: true,
    showCompare: true,
    history: [],
  };

  function loadState() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) { saved = {}; }
    const s = Object.assign(clone(DEFAULTS), saved);
    s.tip = Object.assign(clone(DEFAULTS.tip), saved.tip || {});
    s.reverse = Object.assign(clone(DEFAULTS.reverse), saved.reverse || {});
    if (!Array.isArray(s.items) || !s.items.length) s.items = clone(DEFAULTS.items);
    if (!Array.isArray(s.taxes)) s.taxes = clone(PRESETS.QC.taxes);
    if (!Array.isArray(s.history)) s.history = [];
    if (!Array.isArray(s.tipPresets) || !s.tipPresets.length) s.tipPresets = clone(DEFAULTS.tipPresets);
    return s;
  }

  const state = loadState();
  let saveTimer = null;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* stockage indisponible */ }
    }, 150);
  }

  /* ---------- i18n & formatage ---------- */

  const t = (key, vars = {}) => {
    const str = (I18N[state.lang] && I18N[state.lang][key]) || I18N.fr[key] || key;
    return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
  };
  const locale = () => (state.lang === 'en' ? 'en-CA' : 'fr-CA');
  const money = (n) => new Intl.NumberFormat(locale(), { style: 'currency', currency: 'CAD' }).format(round2(n) || 0);
  const pct = (n) => new Intl.NumberFormat(locale(), { maximumFractionDigits: 3 }).format(n) + (state.lang === 'en' ? '%' : ' %');
  const taxLabel = (tax) => tax[state.lang] || tax.fr || tax.en || '?';
  const totalRate = () => sum(state.taxes.map((x) => parseNum(x.rate))) / 100;

  function applyI18n() {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); el.title = t(el.dataset.i18nAria); });
    $('#langBtn').textContent = state.lang === 'fr' ? 'EN' : 'FR';
    $('.items-head span:nth-child(4)').title = t('itemTaxableTitle');
    $('#disclaimer').textContent = t('disclaimer', {
      rates: state.taxes.map((x) => `${taxLabel(x)} ${pct(parseNum(x.rate))}`).join(', ') || '0 %',
    });
  }

  /* ---------- Calculs ---------- */

  function tipAmount(pretax, afterTax) {
    const tip = state.tip;
    if (tip.type === 'fixed') return round2(Math.max(0, parseNum(tip.fixed)));
    const base = tip.base === 'posttax' ? afterTax : pretax;
    return round2(Math.max(0, base) * parseNum(tip.percent) / 100);
  }

  // Chaque taxe est calculée séparément sur le montant taxable, puis arrondie au cent (comme sur un reçu).
  function computeFromPretax(subtotal, taxableBase, tipOverride) {
    const base = Math.max(0, taxableBase);
    const taxLines = state.taxes.map((x) => ({ label: taxLabel(x), rate: parseNum(x.rate), amount: round2(base * parseNum(x.rate) / 100) }));
    const taxTotal = round2(sum(taxLines.map((l) => l.amount)));
    const afterTax = round2(subtotal + taxTotal);
    const tip = tipOverride !== undefined ? tipOverride : tipAmount(subtotal, afterTax);
    const total = Math.max(0, round2(afterTax + tip));
    const people = Math.max(1, Math.floor(parseNum(state.split)) || 1);
    return {
      subtotal, taxableBase: base, taxLines, taxTotal, afterTax, tip, total, people,
      perPerson: Math.ceil(round2(total * 100 / people)) / 100,
      cash: roundCash(total),
    };
  }

  function lineTotal(item) {
    return round2(parseNum(item.price) * parseNum(item.qty === '' ? 1 : item.qty));
  }

  function computeForward() {
    if (state.mode === 'cart') {
      const subtotal = round2(sum(state.items.map(lineTotal)));
      const taxable = round2(sum(state.items.filter((i) => i.taxable).map(lineTotal)));
      return computeFromPretax(subtotal, taxable);
    }
    const amount = round2(parseNum(state.amount));
    return computeFromPretax(amount, amount);
  }

  function computeReverse() {
    const T = Math.max(0, parseNum(state.reverse.total));
    const r = totalRate();
    let pretax;
    const tip = state.tip;
    if (!state.reverse.includeTip) pretax = T / (1 + r);
    else if (tip.type === 'fixed') pretax = (T - parseNum(tip.fixed)) / (1 + r);
    else if (tip.base === 'posttax') pretax = T / ((1 + r) * (1 + parseNum(tip.percent) / 100));
    else pretax = T / (1 + r + parseNum(tip.percent) / 100);
    pretax = Math.max(0, round2(pretax));
    const res = computeFromPretax(pretax, pretax, state.reverse.includeTip ? undefined : 0);
    res.target = T;
    return res;
  }

  /* ---------- Rendu ---------- */

  function renderMode() {
    $$('.tabs button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.mode === state.mode)));
    $$('.pane').forEach((p) => { p.hidden = p.dataset.pane !== state.mode; });
    const reverse = state.mode === 'reverse';
    $('#tipCard').hidden = reverse && !state.reverse.includeTip;
    $('#roundTipBtn').hidden = reverse;
    $('#splitCard').hidden = reverse;
    $('#compareCard').hidden = reverse || !state.showCompare;
  }

  function renderTip() {
    $$('#tipType button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === state.tip.type)));
    $$('#tipBase button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === state.tip.base)));
    $('#tipPercentBox').hidden = state.tip.type !== 'percent';
    $('#tipFixedBox').hidden = state.tip.type !== 'fixed';
    $('#tipBaseRow').hidden = state.tip.type !== 'percent';
    const current = parseNum(state.tip.percent);
    $('#tipPresets').innerHTML = state.tipPresets.map((p) =>
      `<button type="button" class="chip" data-p="${p}" aria-pressed="${state.tip.percent !== '' && p === current}">${p === 0 ? t('noTip') : pct(p)}</button>`
    ).join('');
    if (document.activeElement !== $('#tipPercent')) $('#tipPercent').value = state.tip.percent;
    if (document.activeElement !== $('#tipFixed')) $('#tipFixed').value = state.tip.fixed;
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderItems() {
    $('#items').innerHTML = state.items.map((it, i) => `
      <div class="item" data-id="${it.id}">
        <input type="text" class="name" data-f="name" value="${esc(it.name)}" placeholder="${esc(t('itemPlaceholder', { n: i + 1 }))}" aria-label="${esc(t('itemName'))}">
        <input type="text" class="qty" data-f="qty" value="${esc(it.qty)}" inputmode="decimal" placeholder="1" aria-label="${esc(t('itemQty'))}">
        <input type="text" class="price" data-f="price" value="${esc(it.price)}" inputmode="decimal" placeholder="${esc(t('zero'))}" aria-label="${esc(t('itemPrice'))}">
        <input type="checkbox" data-f="taxable" ${it.taxable ? 'checked' : ''} title="${esc(t('itemTaxableTitle'))}" aria-label="${esc(t('itemTaxableTitle'))}">
        <button type="button" class="del" aria-label="✕">✕</button>
        <span class="line-total"></span>
      </div>`).join('');
    updateLineTotals();
  }

  function updateLineTotals() {
    $$('#items .item').forEach((row) => {
      const it = state.items.find((x) => x.id === row.dataset.id);
      if (!it) return;
      const q = parseNum(it.qty === '' ? 1 : it.qty);
      const show = it.price !== '' && (q !== 1 || isExpression(it.price));
      row.querySelector('.line-total').textContent = show ? `${money(lineTotal(it))}` : '';
      row.querySelector('.line-total').hidden = !show;
    });
  }

  function row(label, value, cls = '') {
    return `<div class="r ${cls}"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
  }

  function tipLabel() {
    if (state.tip.type === 'fixed') return t('tip');
    const base = state.tip.base === 'posttax' ? t('posttax') : t('pretax');
    return t('tipOf', { v: `${pct(parseNum(state.tip.percent))} · ${base.toLowerCase()}` });
  }

  let lastResult = null;

  function renderResult() {
    const reverse = state.mode === 'reverse';
    const res = reverse ? computeReverse() : computeForward();
    lastResult = res;
    let html = '';

    if (reverse) {
      $('#rMainLabel').textContent = t('pretaxAmount');
      $('#rMain').textContent = money(res.subtotal);
      $('#rSub').textContent = res.target ? t('roundingNote') : '';
      res.taxLines.forEach((l) => { html += row(`${l.label} (${pct(l.rate)})`, money(l.amount), 'sub'); });
      html += row(t('taxTotal'), money(res.taxTotal));
      if (state.reverse.includeTip) html += row(tipLabel(), money(res.tip));
      html += row(t('checkTotal'), money(res.total), 'strong');
      $('#miniLabel').textContent = t('pretaxAmount');
      $('#miniTotal').textContent = money(res.subtotal);
    } else {
      $('#rMainLabel').textContent = t('total');
      $('#rMain').textContent = money(res.total);
      const extra = res.total - res.subtotal;
      $('#rSub').textContent = res.subtotal > 0 ? t('effective', { v: `${money(extra)} (${pct(round2(extra / res.subtotal * 1000) / 10)})` }) : '';
      html += row(t('subtotal'), money(res.subtotal));
      if (state.mode === 'cart' && res.taxableBase !== res.subtotal) html += row(t('taxable'), money(res.taxableBase), 'sub');
      res.taxLines.forEach((l) => { html += row(`${l.label} (${pct(l.rate)})`, money(l.amount), 'sub'); });
      html += row(t('totalWithTaxes'), money(res.afterTax), 'strong');
      html += row(tipLabel(), money(res.tip));
      html += row(t('total'), money(res.total), 'strong');
      if (state.cashRound && res.cash !== res.total) html += row(t('cash'), money(res.cash), 'sub');
      if (res.people > 1) html += row(t('perPerson', { n: res.people }), money(res.perPerson), 'strong accent');
      $('#miniLabel').textContent = res.people > 1 ? t('perPerson', { n: res.people }) : t('total');
      $('#miniTotal').textContent = money(res.people > 1 ? res.perPerson : res.total);
    }
    $('#rRows').innerHTML = html;
  }

  function renderCompare() {
    if (state.mode === 'reverse' || !state.showCompare) return;
    const res = lastResult;
    const presets = state.tipPresets.filter((p) => p > 0);
    const current = state.tip.type === 'percent' ? parseNum(state.tip.percent) : null;
    const base = state.tip.base === 'posttax' ? res.afterTax : res.subtotal;
    const showPer = res.people > 1;
    const rows = presets.map((p) => {
      const tip = round2(Math.max(0, base) * p / 100);
      const total = round2(res.afterTax + tip);
      const per = Math.ceil(round2(total * 100 / res.people)) / 100;
      return `<tr data-p="${p}" class="${p === current ? 'active' : ''}"><td>${pct(p)}</td><td>${money(tip)}</td><td>${money(total)}</td>${showPer ? `<td>${money(per)}</td>` : ''}</tr>`;
    }).join('');
    $('#compare').innerHTML = `<thead><tr><th>${t('cmpTip')}</th><th>${t('cmpAmount')}</th><th>${t('cmpTotal')}</th>${showPer ? `<th>${t('cmpPerson')}</th>` : ''}</tr></thead><tbody>${rows}</tbody>`;
  }

  function renderHistory() {
    const list = $('#history');
    $('#historyEmpty').hidden = state.history.length > 0;
    $('#clearHistory').hidden = state.history.length === 0;
    const fmt = new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeStyle: 'short' });
    list.innerHTML = state.history.map((h) => {
      const title = h.mode === 'cart' ? t('histCart', { n: h.snapshot.items.length })
        : h.mode === 'reverse' ? t('histReverse') : t('histQuick');
      const detail = h.mode === 'reverse'
        ? `${money(h.target)} → ${money(h.subtotal)}`
        : `${money(h.subtotal)} + ${money(h.taxTotal)} + ${money(h.tip)}${h.people > 1 ? ' · ' + t('people', { n: h.people }) : ''}`;
      return `<li data-id="${h.id}">
        <div class="h-meta"><span class="h-title">${esc(title)} · ${esc(detail)}</span><span class="h-date">${esc(fmt.format(new Date(h.ts)))}</span></div>
        <span class="h-total">${money(h.mode === 'reverse' ? h.subtotal : h.total)}</span>
        <button type="button" class="del" aria-label="✕">✕</button>
      </li>`;
    }).join('');
  }

  function renderSettings() {
    const sel = $('#province');
    const opts = Object.entries(PRESETS).map(([code, p]) => `<option value="${code}">${esc(p[state.lang])}</option>`);
    opts.push(`<option value="custom">${esc(t('custom'))}</option>`);
    sel.innerHTML = opts.join('');
    sel.value = state.province;
    $('#taxList').innerHTML = state.taxes.map((x, i) => `
      <div class="tax-row" data-i="${i}">
        <input type="text" data-f="label" value="${esc(taxLabel(x))}" aria-label="${esc(t('taxLabel'))}">
        <span class="money"><input type="text" data-f="rate" inputmode="decimal" value="${esc(String(x.rate))}" aria-label="%"><span class="unit">%</span></span>
        <button type="button" class="del" aria-label="✕">✕</button>
      </div>`).join('');
    $('#cashRound').checked = state.cashRound;
    $('#showCompare').checked = state.showCompare;
    $('#tipPresetsInput').value = state.tipPresets.join(' ');
    renderCombined();
  }

  function renderCombined() {
    $('#combinedRate').textContent = t('combined', { v: pct(round2(totalRate() * 100000) / 1000) });
  }

  function renderTheme() {
    const root = document.documentElement;
    if (state.theme === 'auto') root.removeAttribute('data-theme');
    else root.dataset.theme = state.theme;
    const key = { auto: 'themeAuto', light: 'themeLight', dark: 'themeDark' }[state.theme];
    $('#themeBtn').textContent = { auto: '◐', light: '☀', dark: '☾' }[state.theme];
    $('#themeBtn').title = t(key);
  }

  function renderExprHint() {
    const hint = $('#exprHint');
    if (isExpression(state.amount)) {
      hint.textContent = t('exprResult', { v: money(parseNum(state.amount)) });
      hint.classList.add('expr');
    } else {
      hint.textContent = t('exprHint');
      hint.classList.remove('expr');
    }
  }

  function update() {
    renderResult();
    renderCompare();
    if (state.mode === 'cart') updateLineTotals();
    persist();
  }

  function renderAll() {
    applyI18n();
    renderTheme();
    renderMode();
    renderTip();
    renderItems();
    renderHistory();
    renderExprHint();
    $('#amount').value = state.amount;
    $('#revTotal').value = state.reverse.total;
    $('#revIncludeTip').checked = state.reverse.includeTip;
    $('#split').value = state.split;
    update();
  }

  /* ---------- Actions ---------- */

  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function summaryText() {
    const r = lastResult;
    const lines = [];
    if (state.mode === 'reverse') {
      lines.push(`${t('totalWithTaxes')} : ${money(r.target)}`);
      lines.push(`${t('pretaxAmount')} : ${money(r.subtotal)}`);
      r.taxLines.forEach((l) => lines.push(`${l.label} (${pct(l.rate)}) : ${money(l.amount)}`));
      if (state.reverse.includeTip) lines.push(`${tipLabel()} : ${money(r.tip)}`);
    } else {
      if (state.mode === 'cart') {
        state.items.filter((i) => i.price !== '').forEach((i, n) => {
          lines.push(`• ${i.name || t('itemPlaceholder', { n: n + 1 })}${parseNum(i.qty || 1) !== 1 ? ` ×${parseNum(i.qty)}` : ''} : ${money(lineTotal(i))}${i.taxable ? '' : ' *'}`);
        });
      }
      lines.push(`${t('subtotal')} : ${money(r.subtotal)}`);
      r.taxLines.forEach((l) => lines.push(`${l.label} (${pct(l.rate)}) : ${money(l.amount)}`));
      lines.push(`${tipLabel()} : ${money(r.tip)}`);
      lines.push(`${t('total')} : ${money(r.total)}`);
      if (r.people > 1) lines.push(`${t('perPerson', { n: r.people })} : ${money(r.perPerson)}`);
    }
    lines.push('— Quebec Fees · https://auremoo.github.io/quebec-fees/');
    return lines.join('\n');
  }

  async function copySummary() {
    const text = summaryText();
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (__) { /* ignoré */ }
      ta.remove();
    }
    toast(t('copied'));
  }

  function saveToHistory() {
    const r = lastResult;
    const empty = state.mode === 'reverse' ? !r.target : r.subtotal === 0;
    if (empty) { toast(t('nothing')); return; }
    state.history.unshift({
      id: uid(),
      ts: Date.now(),
      mode: state.mode,
      subtotal: r.subtotal, taxTotal: r.taxTotal, tip: r.tip, total: r.total, people: r.people, target: r.target || 0,
      snapshot: clone({ amount: state.amount, items: state.items, tip: state.tip, split: state.split, reverse: state.reverse }),
    });
    state.history = state.history.slice(0, HISTORY_MAX);
    renderHistory();
    persist();
    toast(t('saved'));
  }

  function restore(entry) {
    const s = entry.snapshot;
    state.mode = entry.mode;
    state.amount = s.amount;
    state.items = clone(s.items);
    state.tip = Object.assign(clone(DEFAULTS.tip), s.tip);
    state.split = s.split;
    state.reverse = Object.assign(clone(DEFAULTS.reverse), s.reverse);
    renderAll();
    toast(t('restored'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetCurrent() {
    if (state.mode === 'quick') state.amount = '';
    if (state.mode === 'cart') state.items = [{ id: uid(), name: '', qty: '1', price: '', taxable: true }];
    if (state.mode === 'reverse') state.reverse.total = '';
    state.split = 1;
    renderAll();
    const focus = { quick: '#amount', cart: '#items .price', reverse: '#revTotal' }[state.mode];
    $(focus)?.focus();
  }

  function roundTip() {
    const r = lastResult;
    if (!r || r.afterTax <= 0) { toast(t('nothing')); return; }
    let target = Math.ceil(r.total - 1e-9);
    if (target <= r.afterTax) target = Math.ceil(r.afterTax + 1e-9);
    state.tip.type = 'fixed';
    state.tip.fixed = String(round2(target - r.afterTax)).replace('.', state.lang === 'fr' ? ',' : '.');
    renderTip();
    update();
  }

  /* ---------- Événements ---------- */

  function bind() {
    $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
      state.mode = b.dataset.mode;
      renderMode();
      update();
    }));

    $('#amount').addEventListener('input', (e) => { state.amount = e.target.value; renderExprHint(); update(); });
    $('#revTotal').addEventListener('input', (e) => { state.reverse.total = e.target.value; update(); });
    $('#revIncludeTip').addEventListener('change', (e) => { state.reverse.includeTip = e.target.checked; renderMode(); update(); });

    // Panier
    $('#items').addEventListener('input', (e) => {
      const rowEl = e.target.closest('.item');
      const it = rowEl && state.items.find((x) => x.id === rowEl.dataset.id);
      if (!it) return;
      const f = e.target.dataset.f;
      it[f] = f === 'taxable' ? e.target.checked : e.target.value;
      update();
    });
    $('#items').addEventListener('change', (e) => {
      if (e.target.dataset.f !== 'taxable') return;
      const it = state.items.find((x) => x.id === e.target.closest('.item').dataset.id);
      if (it) { it.taxable = e.target.checked; update(); }
    });
    $('#items').addEventListener('click', (e) => {
      if (!e.target.classList.contains('del')) return;
      const id = e.target.closest('.item').dataset.id;
      state.items = state.items.filter((x) => x.id !== id);
      if (!state.items.length) state.items.push({ id: uid(), name: '', qty: '1', price: '', taxable: true });
      renderItems();
      update();
    });
    $('#items').addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const rowEl = e.target.closest('.item');
      const last = state.items[state.items.length - 1];
      if (rowEl && rowEl.dataset.id === last.id) addItem();
      else rowEl?.nextElementSibling?.querySelector('.price')?.focus();
    });
    function addItem() {
      const prev = state.items[state.items.length - 1];
      state.items.push({ id: uid(), name: '', qty: '1', price: '', taxable: prev ? prev.taxable : true });
      renderItems();
      update();
      $$('#items .item').pop().querySelector('.price').focus();
    }
    $('#addItem').addEventListener('click', addItem);

    // Pourboire
    $('#tipType').addEventListener('click', (e) => {
      const v = e.target.dataset.v;
      if (!v) return;
      state.tip.type = v;
      renderTip();
      update();
    });
    $('#tipBase').addEventListener('click', (e) => {
      const v = e.target.closest('button')?.dataset.v;
      if (!v) return;
      state.tip.base = v;
      renderTip();
      update();
    });
    $('#tipPresets').addEventListener('click', (e) => {
      const p = e.target.dataset.p;
      if (p === undefined) return;
      state.tip.percent = String(p);
      renderTip();
      update();
    });
    $('#tipPercent').addEventListener('input', (e) => { state.tip.percent = e.target.value; renderTip(); update(); });
    $('#tipFixed').addEventListener('input', (e) => { state.tip.fixed = e.target.value; update(); });
    $('#roundTipBtn').addEventListener('click', roundTip);
    $('#compare').addEventListener('click', (e) => {
      const tr = e.target.closest('tr[data-p]');
      if (!tr) return;
      state.tip.type = 'percent';
      state.tip.percent = tr.dataset.p;
      renderTip();
      update();
    });

    // Partage
    const setSplit = (n) => {
      state.split = Math.min(99, Math.max(1, Math.floor(n) || 1));
      $('#split').value = state.split;
      update();
    };
    $('#splitMinus').addEventListener('click', () => setSplit(state.split - 1));
    $('#splitPlus').addEventListener('click', () => setSplit(state.split + 1));
    $('#split').addEventListener('input', (e) => {
      const n = parseInt(e.target.value, 10);
      if (Number.isFinite(n) && n > 0) { state.split = Math.min(99, n); update(); }
    });
    $('#split').addEventListener('blur', () => setSplit(state.split));

    // Résultat
    $('#copyBtn').addEventListener('click', copySummary);
    $('#saveBtn').addEventListener('click', saveToHistory);
    $('#resetBtn').addEventListener('click', resetCurrent);

    // Historique
    $('#history').addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;
      if (e.target.classList.contains('del')) {
        state.history = state.history.filter((h) => h.id !== li.dataset.id);
        renderHistory();
        persist();
        return;
      }
      const entry = state.history.find((h) => h.id === li.dataset.id);
      if (entry) restore(entry);
    });
    $('#clearHistory').addEventListener('click', () => {
      if (!confirm(t('confirmClear'))) return;
      state.history = [];
      renderHistory();
      persist();
    });

    // En-tête
    $('#langBtn').addEventListener('click', () => {
      state.lang = state.lang === 'fr' ? 'en' : 'fr';
      renderAll();
    });
    $('#themeBtn').addEventListener('click', () => {
      state.theme = { auto: 'light', light: 'dark', dark: 'auto' }[state.theme] || 'auto';
      renderTheme();
      persist();
      toast($('#themeBtn').title);
    });
    $('#settingsBtn').addEventListener('click', () => {
      renderSettings();
      $('#settings').showModal();
    });

    // Réglages
    $('#settings').addEventListener('close', () => renderAll());
    $('#settings').addEventListener('click', (e) => { if (e.target === $('#settings')) $('#settings').close(); });
    $('#province').addEventListener('change', (e) => {
      state.province = e.target.value;
      if (PRESETS[state.province]) state.taxes = clone(PRESETS[state.province].taxes);
      renderSettings();
      update();
    });
    $('#taxList').addEventListener('input', (e) => {
      const i = Number(e.target.closest('.tax-row').dataset.i);
      const tax = state.taxes[i];
      if (!tax) return;
      if (e.target.dataset.f === 'label') { tax.fr = e.target.value; tax.en = e.target.value; }
      else tax.rate = parseNum(e.target.value);
      state.province = 'custom';
      $('#province').value = 'custom';
      renderCombined();
      update();
    });
    $('#taxList').addEventListener('click', (e) => {
      if (!e.target.classList.contains('del')) return;
      state.taxes.splice(Number(e.target.closest('.tax-row').dataset.i), 1);
      state.province = 'custom';
      renderSettings();
      update();
    });
    $('#addTax').addEventListener('click', () => {
      state.taxes.push({ fr: t('taxLabel'), en: t('taxLabel'), rate: 0 });
      state.province = 'custom';
      renderSettings();
      $$('#taxList .tax-row').pop().querySelector('input').select();
    });
    $('#cashRound').addEventListener('change', (e) => { state.cashRound = e.target.checked; update(); });
    $('#showCompare').addEventListener('change', (e) => { state.showCompare = e.target.checked; renderMode(); update(); });
    $('#tipPresetsInput').addEventListener('input', (e) => {
      const list = e.target.value.split(/[\s;|]+/).map(parseNum).filter((n) => n >= 0 && n <= 100);
      const unique = Array.from(new Set(list.map((n) => round2(n)))).sort((a, b) => a - b);
      if (unique.length) { state.tipPresets = unique.slice(0, 10); persist(); }
    });
  }

  bind();
  renderAll();
  const first = { quick: '#amount', reverse: '#revTotal' }[state.mode];
  if (first && window.matchMedia('(min-width: 900px)').matches) $(first).focus();
})();
