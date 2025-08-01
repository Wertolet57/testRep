import { h } from './element';
import { cssPrefix } from '../config';
import Dropdown from "./dropdown";

export default class DropdownEditor extends Dropdown {
    constructor(items = [{}]) {
        const nitems = items.map(it => h('div', `${cssPrefix}-item`)
            .on('click', () => {
                this.setTitle(it.title);
                this.change(it);
            })
            .child(it.title));
        console.log("DropdownEditor constructor: ", nitems);
        super(items[0].title, '160px', true, 'bottom-left', ...nitems);
    }
}