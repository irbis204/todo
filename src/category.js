import {addChild, createElement} from "./function";
import {UI} from "./UI";

let category = {
    text: '',
    HTMLItem: 0,
    cases: [],
    sorted: 1,
    add:function (existingCategory){
        let body;
        let tempDate;
        let tempText;
        if(existingCategory) {
            tempDate = existingCategory.date;
            tempText = existingCategory.text;
        } else {
            tempDate = new Date();
            tempText = UI.listOfCategoriesBlock.optionBlock.input.value;
            this.categories.push(newCategory({
                text: tempText,
                HTMLItem: body,

            }))
        }

        body = createElement({type:'div', className:''});
        let text = createElement({type:'h5', text: tempText});
        let date = createElement({type:'h5', text: tempDate});
        let closeButton = createElement({type:'button'});
        let editButton = createElement({type:'button'});

        addChild(body, [text, date, closeButton, editButton]);
        addChild(UI.listOfCategoriesBlock,[list]);
    },
};

export function newCategory(category){
    this.text = category.text ? category.text : '';
    this.HTMLItem = category.HTMLItem;
    this.cases = [];
    this.sorted = 1;
    return this;
}

newCategory.prototype = category;



