import {addChild, createElement} from "./function";
import {UI} from "./UI";
import {Application} from "./Application";

console.log(UI.listOfCategoriesBlock.container);
let searchBlock = createElement({type:'div'});
searchBlock.setAttribute('style', `background:url('./img/search.png') no-repeat center; background-size:contain; filter: invert(100%);`);
searchBlock.classList.add('test');
//UI.listOfCategoriesBlock.optionBlock.searchButton

addChild(UI.listOfCategoriesBlock.optionBlock.container,[UI.listOfCategoriesBlock.optionBlock.addButton, UI.listOfCategoriesBlock.optionBlock.searchButton, UI.listOfCategoriesBlock.optionBlock.sortButton, UI.listOfCategoriesBlock.optionBlock.input]);
addChild(UI.listOfCategoriesBlock.container, [UI.listOfCategoriesBlock.optionBlock.container, UI.listOfCategoriesBlock.list]);
document.body.appendChild(UI.listOfCategoriesBlock.container)
console.log(UI.listOfCategoriesBlock.optionBlock.container.children[3].classList.value)
UI.listOfCategoriesBlock.optionBlock.searchButton.appendChild(searchBlock)
