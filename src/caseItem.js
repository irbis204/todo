import {UI} from "./UI";

let caseItem = {
  text: "",
  HTMLItem: 0,
  imageURLs: [],
  date: 0,
  show() {
    UI.caseItem.titel.textContent = this.text;
  },
};

export function newCase(caseItem) {
  this.text = caseItem.text;
  this.HTMLItem = caseItem.HTMLItem;
  this.imageURLs = '';
  this.date = caseItem.date;

  return this;
}

newCase.prototype = caseItem;
