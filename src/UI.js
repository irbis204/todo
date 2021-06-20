import { addChild, createElement } from "./function";
import {Application} from "./Application";
import {category} from "./category";

export let UI = {
  listOfCategories: {
    container: createElement({ type: "div", className: ['listOfCategories']}),
    optionBlock: {
      container: createElement({ type: "div" }),
      addOption: createElement({ type: "button", className: ["button", "button-add"], text:"+"}),
      addOptionBox: createElement({ type: "div", className: ["optionBox"] }),
      searchOption: createElement({ type: "button", className: ["button", "button-search"]}),
      searchOptionBox: createElement({ type: "div",  className: ["optionBox"] }),
      sortOptionBox: createElement({ type: "div",  className: ["optionBox"] }),
      sortButton: createElement({
        type: "button",
        className: ["button", "button-sort"],
        text: "\u21F5",
      }),
      option: {
        container: createElement({ type: "div", className: ["option", "hide"]}),
        input: createElement({type: "input", className: ["input"]}),
        addButton: createElement({
          type: "button",
          className: ["button", "button-add", "hide"],
          text: "+",
        }),
        searchButton: createElement({
          type: "button",
          className: ["button", "button-search", "hide"],
        }),
      },
      changeTextBlock: {
        container: createElement({ type: "div", className: ["changeBlock"] }),
        input: createElement({type: "input", className: ["input", "input-change"]}),
        button: createElement({type: "button", className: ["button-category-close"], text: "\u2713"}),
      },
    },
    list: createElement({ type: "div" }),
    selectedCategory: 0,
  },
  listOfCases: {
    container: createElement({ type: "div", className: ['listOfCases']}),
    optionBlock: {
      container: createElement({ type: "div" }),
      addOption: createElement({ type: "button", className: ["button", "button-add"], text:"+"}),
      addOptionBox: createElement({ type: "div", className: ["optionBox"] }),
      searchOption: createElement({ type: "button", className: ["button", "button-search"]}),
      searchOptionBox: createElement({ type: "div",  className: ["optionBox"] }),
      sortButton: createElement({
        type: "button",
        className: ["button", "button-sort"],
        text: "\u21F5",
      }),
      option: {
        container: createElement({ type: "div", className: ["option", "hide"]}),
        input: createElement({type: "input", className: ["input"]}),
        addButton: createElement({
          type: "button",
          className: ["button", "button-add", "hide"],
          text: "+",
        }),
        searchButton: createElement({
          type: "button",
          className: ["button", "button-search", "hide"],
        }),
        sortByTextButton: createElement({
          type: "button",
          className: ["button", "button-sort", "button-sortBy", "hide"],
          text: "Sort by text",
        }),
        sortByDateButton: createElement({
          type: "button",
          className: ["button", "button-sort", "button-sortBy", "hide"],
          text: "Sort by date",
        }),
      },
      changeTextBlock: {
        container: createElement({ type: "div", className: ["changeBlock"] }),
        input: createElement({type: "input", className: ["input", "input-change"]}),
        button: createElement({type: "button", className: ["button-category-close"], text: "\u2713"}),
      },
    },
    list: createElement({ type: "div" }),
    selectedCase: 0,
  },
  caseItem: {
    container: createElement({ type: "div", className: ['caseItem'] }),
    titel: createElement({ type: "h3" }),
    text: createElement({ type: "h2" }),
    dropImage: {
      container: createElement({type: 'div', text: "drop to me"}),
      input: createElement({type: 'input', className: ['hide']}),
    },
    galery: createElement({ type: "div" }),
  },

  clearBlock(block) {
    let size = block.children.length;

    for(let i=0; i < size; i++){
      block.children[0].remove();
    }
  },

  sort(key, object){
    let property = object.cases !== undefined ? "cases" : "categories";
    //let property = object.hasOwnProperty("cases") === true ? "cases" : "categories";
    let arrayCopy = object[property].slice();


    arrayCopy.sort((itemOne, itemTwo) => {
      if (itemOne[key] > itemTwo[key]){
        return 1 * object.sorted;
      }

      if (itemOne[key] === itemTwo[key]){
        return 0;
      }

      if (itemOne[key] < itemTwo[key]){
        return -1 * object.sorted;
      }
    });

    object.sorted = object.sorted === 1 ? -1 : 1;
    UI.renderCases(arrayCopy, property);


    return 0;
  },

  renderCases(array, property) {
    property = "C" + property.slice(1);

    array.forEach((item) => {
      UI[`listOf${property}`].list.removeChild(item.HTMLItem);
      UI[`listOf${property}`].list.appendChild(item.HTMLItem);
    })
  },
};

UI.listOfCategories.optionBlock.addOption.onclick = () => {
  UI.listOfCategories.optionBlock.option.container.className = "option"
  UI.listOfCategories.optionBlock.option.addButton.classList.remove("hide");
  UI.listOfCategories.optionBlock.option.searchButton.classList.add("hide");
};

UI.listOfCategories.optionBlock.searchOption.onclick = () => {
  UI.listOfCategories.optionBlock.option.container.className = "option"
  UI.listOfCategories.optionBlock.option.searchButton.classList.remove("hide");
  UI.listOfCategories.optionBlock.option.addButton.classList.add("hide");

};

UI.listOfCategories.optionBlock.sortButton.onclick = () => {
  UI.listOfCategories.optionBlock.option.container.classList.add("hide");
};

UI.listOfCases.optionBlock.addOption.onclick = () => {
  UI.listOfCases.optionBlock.option.container.className = "option"
  UI.listOfCases.optionBlock.option.addButton.classList.remove("hide");
  UI.listOfCases.optionBlock.option.searchButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.sortByTextButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.sortByDateButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.input.classList.remove("hide");
};

UI.listOfCases.optionBlock.searchOption.onclick = () => {
  UI.listOfCases.optionBlock.option.container.className = "option"
  UI.listOfCases.optionBlock.option.searchButton.classList.remove("hide");
  UI.listOfCases.optionBlock.option.addButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.sortByTextButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.sortByDateButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.input.classList.remove("hide");
};

UI.listOfCases.optionBlock.sortButton.onclick = () => {
  UI.listOfCases.optionBlock.option.container.classList.add("hide");
};
UI.listOfCategories.optionBlock.option.addButton.onclick = () => Application.add();
UI.listOfCases.optionBlock.option.addButton.onclick = () => category.add();

UI.listOfCases.optionBlock.sortButton.onclick = () => {
  UI.listOfCases.optionBlock.option.container.className = "option"
  UI.listOfCases.optionBlock.option.input.classList.add("hide");
  UI.listOfCases.optionBlock.option.addButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.searchButton.classList.add("hide");
  UI.listOfCases.optionBlock.option.sortByTextButton.classList.remove("hide");
  UI.listOfCases.optionBlock.option.sortByDateButton.classList.remove("hide");
};

UI.listOfCases.optionBlock.option.sortByTextButton.onclick = () => {
  UI.sort("text", Application.selectedCategory);
};

UI.listOfCases.optionBlock.option.sortByDateButton.onclick = () => {
  UI.sort("date", Application.selectedCategory);
};

UI.listOfCategories.optionBlock.sortButton.onclick = () => {
  UI.sort("text", Application);
};
