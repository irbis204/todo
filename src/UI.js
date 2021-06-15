import {addChild, createElement} from "./function";
import {Application} from "./Application";

export let UI = {
    listOfCategoriesBlock:{
        container: createElement({type:'div', className: ['listBlock']}),
        optionBlock:{
            container: createElement({type:'div', className: ['optionBlock']}),
            addButton: createElement({type:'button', className: ['button', 'add'], text: '+'}),
            searchButton: createElement({type:'button', className: ['button', 'search']}),
            sortButton: createElement({type:'button', className: ['button', 'sort'], text: '\u21F5'}),
            input: createElement({type: 'input', className: ['input', 'hide']}),
            renderInput: (i) => {
                UI.listOfCategoriesBlock.optionBlock.input.classList.remove('hide');
                UI.listOfCategoriesBlock.optionBlock.container.remove();
                UI.listOfCategoriesBlock.optionBlock.container = createElement({type:'div', className: ['optionBlock']});
                if(i==0){
                    addChild(UI.listOfCategoriesBlock.optionBlock.container, [UI.listOfCategoriesBlock.optionBlock.input, UI.listOfCategoriesBlock.optionBlock.addButton, UI.listOfCategoriesBlock.optionBlock.searchButton, UI.listOfCategoriesBlock.optionBlock.sortButton]);
                } else if(i==1){
                    addChild(UI.listOfCategoriesBlock.optionBlock.container, [UI.listOfCategoriesBlock.optionBlock.addButton, UI.listOfCategoriesBlock.optionBlock.input, UI.listOfCategoriesBlock.optionBlock.searchButton, UI.listOfCategoriesBlock.optionBlock.sortButton]);
                } else if(i==2){
                    UI.listOfCategoriesBlock.optionBlock.input.classList.add('hide');
                    addChild(UI.listOfCategoriesBlock.optionBlock.container, [UI.listOfCategoriesBlock.optionBlock.addButton, UI.listOfCategoriesBlock.optionBlock.searchButton, UI.listOfCategoriesBlock.optionBlock.input, UI.listOfCategoriesBlock.optionBlock.sortButton]);
                }

                UI.listOfCategoriesBlock.container.insertAdjacentElement('afterbegin', UI.listOfCategoriesBlock.optionBlock.container);
            },
        },
        list: createElement({type:'div', className: ['optionBlock']}),
    },

};
let inputIndex = -1;
UI.listOfCategoriesBlock.optionBlock.addButton.onclick = () =>{
    if (inputIndex !== 0){
        UI.listOfCategoriesBlock.optionBlock.renderInput(0);

        inputIndex = 0;
    } else {
        Application.add();
    }
}
UI.listOfCategoriesBlock.optionBlock.searchButton.onclick = () => {
    if (inputIndex !== 1){
        UI.listOfCategoriesBlock.optionBlock.renderInput(1);
        inputIndex = 1;
    } else {
        Application.add();
    }
}

UI.listOfCategoriesBlock.optionBlock.sortButton.onclick = () => {
    if (inputIndex !== 2){
        UI.listOfCategoriesBlock.optionBlock.renderInput(2);
        inputIndex = 2;
    } else {
        Application.add();
    }
}