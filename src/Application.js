import {addChild, createElement} from "./function";
import {UI} from "./UI";
import {newCategory} from "./category";

export let Application = {
    categories:[],
    sorted: 1,
    HTMLItem: 0,
    upload: false,
    add:function (existingCategory){
        let categoryHtml = {
            body: createElement({type:'div', className:['case']}),
            text: '',
            options: {
                container: createElement({type:'div', className:['option']}),
                deleteButton: createElement({type:'button', className:['button-close'], text: '\u00D7'}),
                editButton: createElement({type:'button', className:['button-close'],  text: '\u270E'}),
            },
        }
        let tempText;
        if(existingCategory) {
            tempText = existingCategory.text;
        } else {
            tempText = UI.listOfCategoriesBlock.optionBlock.input.value;
            console.log(new newCategory({
                text: tempText,
                HTMLItem: categoryHtml.body,
            }));
            this.categories.push(new newCategory({
                text: tempText,
                HTMLItem: categoryHtml.body,
            }));
        }

        categoryHtml.text = createElement({type:'h3', className:['text'], text: tempText});
        categoryHtml.options.deleteButton.onclick = () => Application.delete(tempText);


        addChild(categoryHtml.options.container, [categoryHtml.options.editButton, categoryHtml.options.deleteButton]);
        addChild(categoryHtml.body, [categoryHtml.options.container, categoryHtml.text]);
        addChild(UI.listOfCategoriesBlock.list,[categoryHtml.body]);

    },
    delete: function(text) {
        Application.categories = Application.categories.filter((item) => {
            if(item.text === text){
                item.HTMLItem.remove();
                text = undefined;
                return false;
            }

            return true;
        });
    },
};