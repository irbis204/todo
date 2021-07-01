import {addChild, changeText, createElement, getStorage} from './function';
import { UI } from './UI';
import {Application} from "./Application";

let searchIcon = createElement({ type: 'div' });
searchIcon.setAttribute(
  'style',
  `background:url('./img/search.png') no-repeat center; background-size:contain; filter: invert(80%);`
);
searchIcon.classList.add('img');
addChild(UI.listBlock.listOfCategories.optionBlock.searchBlock.button, [
  searchIcon
])

UI.popUp.body.inputName.placeholder = 'Enter name...';
UI.popUp.body.inputText.placeholder = 'Enter text...';

addChild(UI.listBlock.container, [
  UI.listBlock.listOfCategories.container,
  UI.listBlock.listOfCases.container,
  UI.listBlock.caseItem.container
]);
// listOfCategories
addChild(UI.listBlock.listOfCategories.container, [
  UI.listBlock.listOfCategories.optionBlock.container,
  UI.listBlock.listOfCategories.content.container
]);

addChild(UI.listBlock.listOfCategories.content.container, [
  UI.listBlock.listOfCategories.content.countCategories,
  UI.listBlock.listOfCategories.content.list,
  UI.listBlock.listOfCategories.content.addButton
]);

addChild(UI.listBlock.listOfCategories.optionBlock.container, [
  UI.listBlock.listOfCategories.optionBlock.searchBlock.container,
  UI.listBlock.listOfCategories.optionBlock.sortButton
]);

addChild(UI.listBlock.listOfCategories.optionBlock.searchBlock.container, [
  UI.listBlock.listOfCategories.optionBlock.searchBlock.input,
  UI.listBlock.listOfCategories.optionBlock.searchBlock.button,
]);
// listOfCases
addChild(UI.listBlock.listOfCases.content.container, [
  UI.listBlock.listOfCases.content.countCases,
  UI.listBlock.listOfCases.content.list,
  UI.listBlock.listOfCases.content.addButton
]);

addChild(UI.listBlock.listOfCases.container, [
  UI.listBlock.listOfCases.optionBlock.container,
  UI.listBlock.listOfCases.content.container
]);

addChild(UI.listBlock.listOfCases.optionBlock.container, [
  UI.listBlock.listOfCases.optionBlock.sortByTextButton,
  UI.listBlock.listOfCases.optionBlock.sortByDateButton
]);
//caseItem
addChild(UI.listBlock.caseItem.dropImage.container, [
  UI.listBlock.caseItem.dropImage.input
]);

addChild(UI.popUp.body.container, [
  UI.popUp.body.inputName,
  UI.popUp.body.inputText,
  UI.popUp.body.button
]);

addChild(UI.popUp.form,[
  UI.popUp.title,
  UI.popUp.body.container,
  UI.popUp.closeButton
]);

addChild(UI.popUp.container, [
  UI.popUp.form
]);

addChild(UI.categorySelector.container, [
  UI.categorySelector.option.container
]);

addChild(UI.categorySelector.option.container, [
  UI.categorySelector.option.renameButton,
  UI.categorySelector.option.deleteButton
]);

addChild(UI.caseSelector.container, [
  UI.caseSelector.option.container
]);

addChild(UI.caseSelector.option.container, [
  UI.caseSelector.option.renameButton,
  UI.caseSelector.option.deleteButton
]);

addChild(document.body, [UI.listBlock.container]);

getStorage();
