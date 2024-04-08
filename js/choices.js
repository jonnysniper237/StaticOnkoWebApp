export default class Choices {
    constructor() {
        this.choices = [
            {category: 'sex', choice: ''},
            {category: 'age', choice: ''},
        ];
    }

    getId() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    getItem() {
        return this._item;
    }

    setItem(item) {
        this._item = item;
    }
}