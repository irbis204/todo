let caseItem = {
  text: "",
  HTMLItem: 0,
  imageURLs: [],
  date: 0,
};

export function newCase(caseItem) {
  this.text = caseItem.text;
  this.HTMLItem = caseItem.HTMLItem;
  this.imageURLs = '';
  this.date = caseItem.date;

  return this;
}

newCase.prototype = caseItem;
