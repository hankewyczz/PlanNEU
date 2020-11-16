"use strict";
class Filter {
    constructor() {
        this.filters = [];
    }
    add(func) {
        this.filters.push(func);
    }
    func(s) {
        for (let i = 0; i < this.filters.length; i++) {
            if (!this.filters[i](s)) {
                return false;
            }
        }
        return true;
    }
}
