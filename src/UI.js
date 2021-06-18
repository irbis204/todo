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
      }
    },
    list: createElement({ type: "div" }),
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
      }
    },
    list: createElement({ type: "div" }),
  },
  caseItem: createElement({ type: "div", className: ['caseItem'] }),
  clearBlock(block) {
    let size = block.children.length;
    console.log(block.children[0]);

    for(let i=0; i < size; i++){
      console.log(block.children[0]);
      block.children[0].remove();
    }
  },
}

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
UI.listOfCategories.optionBlock.option.addButton.onclick = () => Application.add();

UI.listOfCases.optionBlock.addOption.onclick = () => {
  UI.listOfCases.optionBlock.option.container.className = "option"
  UI.listOfCases.optionBlock.option.addButton.classList.remove("hide");
  UI.listOfCases.optionBlock.option.searchButton.classList.add("hide");
};

UI.listOfCases.optionBlock.searchOption.onclick = () => {
  UI.listOfCases.optionBlock.option.container.className = "option"
  UI.listOfCases.optionBlock.option.searchButton.classList.remove("hide");
  UI.listOfCases.optionBlock.option.addButton.classList.add("hide");
};

UI.listOfCases.optionBlock.sortButton.onclick = () => {
  UI.listOfCases.optionBlock.option.container.classList.add("hide");
};