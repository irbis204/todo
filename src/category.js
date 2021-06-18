import { addChild, createElement, formatDate } from "./function";
import { UI } from "./UI";
import {newCase} from "./caseItem";

export let category = {
  text: "",
  HTMLItem: 0,
  cases: [],
  sorted: 1,
  add(existingCase) {
    let caseHtml = {
      body: createElement({ type: "div", className: ["category"] }),
      text: "",
      date: "",
      deleteButton: createElement({
        type: "button",
        className: ["button-category"],
        text: "\u00D7",
      }),
    };
    let tempText;
    let tempDate = new Date();

    if (existingCase) {
      tempText = existingCase.text;
      tempDate = new Date(existingCase.date);
      console.log(existingCase)
      console.log(tempDate);
    } else if (UI.listOfCases.optionBlock.option.input.value !== "") {
      tempText = UI.listOfCases.optionBlock.option.input.value;

      this.cases.push(
        new newCase({
          text: tempText,
          HTMLItem: caseHtml.body,
          date: tempDate.getTime(),
        })
      );
    } else {
      alert("Please, enter text.");

      return;
    }


    caseHtml.body.onclick = () => {
      //I.listOfCases.optionBlock.option.addButton.onclick = () => this.categories[this.categories.length].add();
    };
    caseHtml.deleteButton.onclick = () => category.delete(tempText);

    caseHtml.text = createElement({
      type: "h3",
      className: ["text"],
      text: tempText,
    });
    caseHtml.date = createElement({
      type: "h3",
      className: ["text"],
      text: formatDate(tempDate),
    });

    addChild(caseHtml.body, [
      caseHtml.text,
      caseHtml.date,
      caseHtml.deleteButton,
    ]);
    addChild(UI.listOfCases.list, [ caseHtml.body ])
  },
  delete() {

  }
};

export function newCategory(category) {
  this.text = category.text ? category.text : "";
  this.HTMLItem = category.HTMLItem;
  this.cases = [];
  this.sorted = 1;

  return this;
}

newCategory.prototype = category;
