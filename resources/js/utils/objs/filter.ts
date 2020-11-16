class Filter {
	filters: ((s: Section[]) => boolean)[];

	constructor() {
		this.filters = [];
	}

	add(func: ((s: Section[]) => boolean)) {
		this.filters.push(func);
	}
	
	func(s: Section[]): boolean {
		for (let i = 0; i < this.filters.length; i++) {
			if (!this.filters[i](s)) {
				return false;
			}
		}
		return true;
	}
	
}