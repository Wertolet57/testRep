import { h } from './element';
import Button from './button';
import { bindClickoutside, unbindClickoutside } from './event';
import { cssPrefix } from '../config';
import { t } from '../locale/locale';

function buildMenu(clsName) {
  return h('div', `${cssPrefix}-item ${clsName}`);
}

function buildSearch(clsName) {
  return h('input', `${cssPrefix}-item-${clsName}`)
    .on('input', (evt) => this.searchInput(evt.target.value));
}

function buildSortItem(it) {
  return buildMenu('state').child(t(`sort.${it}`))
    .on('click.stop', () => this.itemClick(it));
}

function buildFilterBody(items) {
  const { filterbEl, filterValues } = this;
  filterbEl.html('');
  const itemKeys = Object.keys(items);
  itemKeys.forEach((it) => {
    const cnt = items[it];
    const active = filterValues.includes(it) ? 'checked' : '';
    const itemEl = h('div', `${cssPrefix}-item state ${active}`)
      .on('click.stop', () => this.filterClick(it))
      .children(
        h('div').html(it === '' ? t('filter.empty') : it),
        h('div', 'label').html(`(${cnt})`));
    filterbEl.child(itemEl);
  });
}

function resetFilterHeader() {
  console.log("resetFilterHeader");
  const { filterhEl, filterValues, values } = this;
  const totalItems = Object.keys(this.items).length;
  filterhEl.html(`${filterValues.length} / ${totalItems}`);
  filterhEl.checked(filterValues.length === totalItems);
}

export default class SortFilter {
  constructor() {
    this.filterbEl = h('div', `${cssPrefix}-body`);
    this.filterhEl = h('div', `${cssPrefix}-header state`).on('click.stop', () => this.filterClick('all'));
    this.el = h('div', `${cssPrefix}-sort-filter`).children(
      this.sortAscEl = buildSortItem.call(this, 'asc'),
      this.sortDescEl = buildSortItem.call(this, 'desc'),
      this.search = buildSearch.call(this, 'search'),
      buildMenu('divider'),
      h('div', `${cssPrefix}-filter`).children(
        this.filterhEl,
        this.filterbEl,
      ),
      h('div', `${cssPrefix}-buttons`).children(
        new Button('cancel').on('click', () => this.btnClick('cancel')),
        new Button('ok', 'primary').on('click', () => this.btnClick('ok')),
      ),
    ).hide();
    // this.setFilters(['test1', 'test2', 'text3']);
    this.ci = null;
    this.sort = null;
    this.values = null;
    this.filterValues = [];
    this.items = {};
  }

  btnClick(it) {
    if (it === 'ok') {
      const { ci, sort, filterValues } = this;
      if (this.ok) {
        // Check if all available values are selected
        const allAvailableValues = Object.keys(this.items);
        const allSelected = allAvailableValues.length === filterValues.length &&
          allAvailableValues.every(value => filterValues.includes(value));

        // If all values are selected, pass empty array to remove the filter
        const valuesToPass = allSelected ? [] : filterValues;
        this.ok(ci, sort, 'in', valuesToPass);
      }
    }
    this.hide();
  }

  itemClick(it) {
    this.sort = it;
    const { sortAscEl, sortDescEl } = this;
    sortAscEl.checked(it === 'asc');
    sortDescEl.checked(it === 'desc');
  }

  searchInput(value) {
    const filteredItems = {};
    Object.keys(this.items).forEach(item => {
      if (item.toLowerCase().includes(value.toLowerCase())) {
        filteredItems[item] = this.items[item];
      }
    });
    buildFilterBody.call(this, filteredItems);
  }

  filterClick(it) {
    const { filterbEl, filterValues, values } = this;
    const children = filterbEl.children();
    if (it === 'all') {
      if (children.length === filterValues.length) {
        this.filterValues = [];
        children.forEach(i => h(i).checked(false));
      } else {
        this.filterValues = Array.from(values);
        children.forEach(i => h(i).checked(true));
      }
    } else {
      const index = filterValues.indexOf(it);
      if (index === -1) {
        filterValues.push(it)
      } else {
        filterValues.splice(index, 1);
      }
      const itemEls = this.filterbEl.children();
      itemEls.forEach(itemEl => {
        const textContent = itemEl.firstChild.textContent.trim();
        if (textContent === it) {
          h(itemEl).toggle('checked', index === -1);
        }
      })
    }
    resetFilterHeader.call(this);
  }

  // v: autoFilter
  // items: {value: cnt}
  // sort { ci, order }
  set(ci, items, filter, sort) {
    this.ci = ci;
    this.items = items;
    const { sortAscEl, sortDescEl } = this;
    if (sort !== null) {
      this.sort = sort.order;
      sortAscEl.checked(sort.asc());
      sortDescEl.checked(sort.desc());
    } else {
      this.sortDesc = null;
      sortAscEl.checked(false);
      sortDescEl.checked(false);
    }
    // this.setFilters(items, filter);
    this.values = Object.keys(items);
    this.filterValues = filter ? Array.from(filter.value) : Object.keys(items);
    buildFilterBody.call(this, items, filter);
    resetFilterHeader.call(this);
  }

  setOffset(v) {
    this.el.offset(v).show();
    let tindex = 1;
    bindClickoutside(this.el, () => {
      if (tindex <= 0) {
        this.hide();
      }
      tindex -= 1;
    });
  }

  show() {
    this.el.show();
  }

  hide() {
    this.el.hide();
    // clear search input
    this.search.val('');
    // restore all items
    buildFilterBody.call(this, this.items || {});
    unbindClickoutside(this.el);
  }
}
