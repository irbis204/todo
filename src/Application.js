import { addChild, createElement } from "./function";
import { UI } from "./UI";
import {category, newCategory} from "./category";

export let Application = {
  categories: [],
  sorted: 1,
  HTMLItem: 0,
  upload: false,

  add(existingCategory) {
    let categoryHtml = {
      body: createElement({ type: "div", className: ["category"] }),
      text: "",
      deleteButton: createElement({
        type: "button",
        className: ["button-category"],
        text: "\u00D7",
      }),
    };
    let tempText;
    let tempCategory;

    if (existingCategory) {
      tempCategory = existingCategory;
      tempText = existingCategory.text;
    } else if (UI.listOfCategories.optionBlock.option.input.value !== "") {
      tempText = UI.listOfCategories.optionBlock.option.input.value;
      tempCategory = new newCategory({
        text: tempText,
        HTMLItem: categoryHtml.body,
      });

      this.categories.push(tempCategory);
    } else {
      alert("Please, enter text.");

      return;
    }

    categoryHtml.body.onclick = () => {
      UI.clearBlock(UI.listOfCases.list);

      tempCategory.cases.forEach((item) => {
        category.add(item);
      });
      UI.listOfCases.optionBlock.option.addButton.onclick = () => tempCategory.add();
    };
    categoryHtml.deleteButton.onclick = () => Application.delete(tempText);

    categoryHtml.text = createElement({
      type: "h3",
      className: ["text"],
      text: tempText,
    });

   addChild(categoryHtml.body, [
     categoryHtml.text,
     categoryHtml.deleteButton
   ]);
   addChild(UI.listOfCategories.list, [ categoryHtml.body ])
  },

  delete(text) {
    Application.categories = Application.categories.filter((item) => {
      if (item.text === text) {
        item.HTMLItem.remove();
        text = undefined;

        return false;
      }

      return true;
    });
  },
};
