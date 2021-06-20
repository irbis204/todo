import {addChild, changeText, createElement, formatDate} from "./function";
import { UI } from "./UI";
import {newCase} from "./caseItem";
import {Application} from "./Application";

export let category = {
  text: "",
  HTMLItem: 0,
  cases: [],
  sorted: 1,
  add(existingCase) {
    let caseHtml = {
      body: createElement({
        type: "div",
        className: ["case"] }),
      infoBlock: {
        container: createElement({
          type: "div",
          className: ["caseInfo"] }),
        text: "",
        date: "",
      },
      deleteButton: createElement({
        type: "button",
        className: ["button-case-close"],
        text: "\u00D7",
      }),
    };
    let tempText;
    let tempDate = new Date();
    let tempCase;

    if (existingCase) {
      existingCase.HTMLItem = caseHtml.body;
      tempText = existingCase.text;
      tempDate = new Date(existingCase.date);
      tempCase = existingCase;
    } else if (UI.listOfCases.optionBlock.option.input.value !== "") {
      tempText = UI.listOfCases.optionBlock.option.input.value;
      tempCase = new newCase({
        text: tempText,
        HTMLItem: caseHtml.body,
        date: tempDate.getTime(),
      })

      this.cases.push(tempCase);
    } else {
      alert("Please, enter text.");

      return;
    }


    caseHtml.body.onclick = () => {
      //UI.clearBlock(UI.caseItem.container);

      if(Application.selectedCase !== 0) {
        Application.selectedCase.HTMLItem.classList.remove("case-active");

        if (Application.selectedCase.text === tempCase.text) {
          Application.selectedCase = 0;

          return;
        }
      }

      tempCase.show();
      Application.selectedCase = tempCase;
      console.log(Application.selectedCase)
      caseHtml.body.classList.add("case-active");
      console.log(Application.selectedCase.HTMLItem);
    };
    caseHtml.deleteButton.onclick = () => category.delete(tempText);
    caseHtml.infoBlock.text = createElement({
      type: "h3",
      className: ["text"],
      text: tempText,
    });
    caseHtml.infoBlock.date = createElement({
      type: "h5",
      className: ["date"],
      text: formatDate(tempDate),
    });

    caseHtml.infoBlock.text.ondblclick = () => changeText(tempCase, 'Cases');

    addChild(caseHtml.infoBlock.container, [
      caseHtml.infoBlock.text,
      caseHtml.infoBlock.date
    ]);
    addChild(caseHtml.body, [
      caseHtml.infoBlock.container,
      caseHtml.deleteButton
    ]);
    addChild(UI.listOfCases.list, [ caseHtml.body ])
  },
  delete(text) {
    Application.selectedCategory.cases = Application.selectedCategory.cases.filter((item) => {
      if (item.text === text) {
        item.HTMLItem.remove();
        text = undefined;

        return false;
      }

      return true;
    });
  }
};

export function newCategory(category) {
  this.text = category.text ? category.text : "";
  this.HTMLItem = category.HTMLItem ? category.HTMLItem : 0;
  this.cases = [];
  this.sorted = 1;

  return this;
}

newCategory.prototype = category;
