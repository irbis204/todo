import { addChild, createElement } from "./function";
import { UI } from "./UI";


let searchIcon = createElement({ type: "div" });
searchIcon.setAttribute(
  "style",
  `background:url('./img/search.png') no-repeat center; background-size:contain; filter: invert(100%);`
);
searchIcon.classList.add("img");
//UI.listOfCategoriesBlock.optionBlock.searchButton

let searchIcon2 = createElement({ type: "div" });
searchIcon2.setAttribute(
  "style",
  `background:url('./img/search.png') no-repeat center; background-size:contain; filter: invert(100%);`
);
searchIcon2.classList.add("img");

addChild(UI.listOfCategories.optionBlock.searchOption, [searchIcon]);
addChild(UI.listOfCategories.optionBlock.option.searchButton, [searchIcon2]);

addChild(UI.listOfCategories.optionBlock.option.container, [
  UI.listOfCategories.optionBlock.option.input,
  UI.listOfCategories.optionBlock.option.addButton,
  UI.listOfCategories.optionBlock.option.searchButton
]);

addChild(UI.listOfCategories.optionBlock.addOptionBox, [UI.listOfCategories.optionBlock.addOption]);
addChild(UI.listOfCategories.optionBlock.searchOptionBox, [UI.listOfCategories.optionBlock.searchOption]);
addChild(UI.listOfCategories.optionBlock.container, [
  UI.listOfCategories.optionBlock.addOptionBox,
  UI.listOfCategories.optionBlock.searchOptionBox,
  UI.listOfCategories.optionBlock.sortButton,
  UI.listOfCategories.optionBlock.option.container
]);
addChild(UI.listOfCategories.container, [
  UI.listOfCategories.optionBlock.container,
  UI.listOfCategories.list,
]);

addChild(UI.listOfCases.optionBlock.option.container, [
  UI.listOfCases.optionBlock.option.input,
  UI.listOfCases.optionBlock.option.addButton,
  UI.listOfCases.optionBlock.option.searchButton
]);

addChild(UI.listOfCases.optionBlock.addOptionBox, [UI.listOfCases.optionBlock.addOption]);
addChild(UI.listOfCases.optionBlock.searchOptionBox, [UI.listOfCases.optionBlock.searchOption]);
addChild(UI.listOfCases.optionBlock.container, [
  UI.listOfCases.optionBlock.addOptionBox,
  UI.listOfCases.optionBlock.searchOptionBox,
  UI.listOfCases.optionBlock.sortButton,
  UI.listOfCases.optionBlock.option.container
]);
addChild(UI.listOfCases.container, [
  UI.listOfCases.optionBlock.container,
  UI.listOfCases.list,
]);

document.body.appendChild(UI.listOfCategories.container);
document.body.appendChild(UI.listOfCases.container);
document.body.appendChild(UI.caseItem);

//UI.listOfCategories.optionBlock.searchButton.appendChild(searchIcon);
