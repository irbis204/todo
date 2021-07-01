import { addChild, createElement, changeText } from './function';
import {Application} from './Application';
import {Category} from './category';

// UI - элемент содержащий html приложения
// listOfCategories -  соответсвует блоку listOfCases содержащему кейсы и элементы для работы с ними
// container в нултри обьекта всегда означает родительский блок в который добавляются дочернии, созданные внутри обьекта
// addOption, searchOption, sortButton - кнопки для открытия соответствующего функционального блока
// option - обьект функционального блока
// changeTextBlock - блок для изменения текста
// list - блок для отображения массива элементов
// caseItem - блок для развернутого отображения кейса
// clearBlock() - очищает блок от потомков
// sort()- сортирует массив и отображает его отсортированную версию
// renderCases() - отображает отсортированный массив


export let UI = {
  listBlock: {
    container: createElement({type: 'div', className: ['list-block']}),
    listOfCategories: {
      container: createElement({type: 'div', className: ['list-of-categories']}),
      optionBlock: {
        container: createElement({type: 'div', className: ['list-of-categories-option']}),
        searchBlock: {
          container: createElement({type: 'div', className: ['search-block']}),
          input: createElement({type: 'input', className: ['input', 'input-search']}),
          button: createElement({ type: 'button', className: ['button', 'button-search']}),
          closeSearch: createElement({ type: 'button', className: ['button-close-search'], text: 'Close search'}),
        },
        sortButton: createElement({type: 'button', className: ['button', 'button-category', 'button-sort'], text: '\u296E',}),
      },
      content: {
        container: createElement({type: 'div', className: ['list-of-categories-content']}),
        countCategories: createElement({type: 'p', className: ['counter']}),
        list: createElement({type: 'div', className: ['list']}),
        addButton: createElement({type: 'button', className: ['button', 'button-category'], text: '+'}),
      },
    },
    listOfCases: {
      container: createElement({type: 'div', className: ['list-of-cases']}),
      optionBlock: {
        container: createElement({type: 'div', className: ['sort-category', 'hide']}),
        sortByTextButton: createElement({type: 'button', className: ['button', 'button-case', 'button-sort-by', 'button-sort-by-text'], text: 'Sort by text'}),
        sortByDateButton: createElement({type: 'button', className: ['button', 'button-case', 'button-sort-by', 'button-sort-by-date'], text: 'Sort by date'}),
      },
      content: {
        container: createElement({type: 'div', className: ['list-of-case-content']}),
        countCases: createElement({type: 'p', className: ['counter']}),
        list: createElement({type: 'div', className: ['list']}),
        addButton: createElement({type: 'button', className: ['button', 'button-case'], text: '+'}),
      },
    },
    caseItem: {
      container: createElement({type: 'div', className: ['case-item']}),
      title: createElement({type: 'h3', className: ['title']}),
      text: createElement({type: 'div'}),
      dropImage: {
        container: createElement({type: 'div', className: ['dragNDrop'], text: 'Drop me image'}),
        input: createElement({type: 'input', className: ['hide']}),
      },
      gallery: createElement({type: 'div'}),
    },
  },
  categorySelector: {
    container: createElement({type: 'div', className: ['category-body', 'category-body-selector']}),
    option: {
      container: createElement({type: 'div', className: ['selector-option']}),
      renameButton: createElement({type: 'button', className: ['button-selector', 'hide'], text: 'Rename'}),
      deleteButton:createElement({type: 'button', className: ['button-selector', 'hide'], text: 'Delete'}),
    },
  },
  caseSelector: {
    container: createElement({type: 'div', className: ['case-body', 'case-body-selector']}),
    option: {
      container: createElement({type: 'div', className: ['selector-option']}),
      renameButton: createElement({type: 'button', className: ['button-selector', 'hide'], text: 'Rename'}),
      deleteButton:createElement({type: 'button', className: ['button-selector', 'hide'], text: 'Delete'}),
    },
  },
  popUp: {
    container: createElement({type: 'div', className: ['pop-up-background']}),
    form: createElement({type: 'div', className: ['pop-up']}),
    title: createElement({type: 'h3', className: ['pop-up-title'], text: 'Add new'}),
    body: {
      container: createElement({type: 'div', className: ['pop-up-body']}),
      inputName: createElement({type: 'input', className: ['input', 'input-add']}),
      inputText: createElement({type: 'textarea', className: ['pop-up-textarea']}),
      button: createElement({type: 'button', className: ['button', 'button-case'], text: '\u2713'}),
    },
    closeButton: createElement({type: 'button', className: ['button-close'], text: 'x'}),

    /**
     * Открывае всплывающую форму
     * @param {string} key
     */
    open(key) {
      this.body.inputText.value = '';
      this.body.inputName.value = '';

      if (key === 'new category') {

        this.title.text = 'Add a new category';
        this.body.inputText.classList.add('hide');
        this.body.button.onclick = () => Application.add();
      } else if (key === 'new case') {

        this.title.text = 'Add a new case';
        this.body.inputText.classList.remove('hide');

        this.body.button.onclick = () => {
          Application.state.selectedCategory.add();
          Application.state.selectedCategory.showCategoryCases();
        }
      } else if (key === 'change category') {

        this.title.text = 'Change category name';
        this.body.inputText.classList.add('hide');
        this.body.button.onclick = () => changeText(Application.state.selectedCategory, 'Category');
      } else if (key === 'change case') {

        this.title.text = 'Change case name';
        this.body.inputText.classList.remove('hide');
        this.body.button.onclick = () => changeText(Application.state.selectedCase, 'Case');
      }

      addChild(document.body, [
        UI.popUp.container
      ]);
    },

    /**
     * Закрывает всплывающую форму
     */
    close() {
      document.body.removeChild(this.container);
    },
  },

  /**
   * Добавляет анимацию селектору
   * @param {{
   * container: HTMLDivElement
   * option}} selector
   * @param {string} key
   */
  toggleSelector(selector, key) {
    if(!selector.container.classList.contains(`${key}-body-selector-open`) && !selector.container.classList.contains(`${key}-body-selector-close`)) {
      selector.container.classList.add(`${key}-body-selector-open`);
      selector.container.classList.remove(`${key}-body-selector-active`);
    } else {
      selector.container.classList.toggle(`${key}-body-selector-open`);
      selector.container.classList.toggle(`${key}-body-selector-close`);
    }

    if(selector.container.classList.contains(`${key}-body-selector-close`)) {
      let remove = selector.container.classList.remove.bind(selector.container.classList);
      setTimeout(remove, 500, `${key}-body-selector-close`)
    }

    selector.option.deleteButton.classList.toggle('hide');
    selector.option.renameButton.classList.toggle('hide');
  },

  /**
   * Очищает блок от потомков
   * @param {HTMLInputElement | HTMLDivElement | HTMLHeadElement | HTMLButtonElement} block
   */
  clearBlock(block) {
    block.innerHTML = '';
  },

  /**
   * Сортирует категории\кейсы
   * @param {string} property
   * @param {Application | Category} sortedObject
   * @returns {number}
   */
  sort(property, sortedObject){
    let key = sortedObject.cases ? 'cases' : 'categories';
    let arrayCopy = sortedObject[key].slice();
    let direction = sortedObject.state.sorted ? 1 : -1;

    arrayCopy.sort((itemOne, itemTwo) => {
      if (itemOne[property] > itemTwo[property]){
        return 1 * direction;
      }

      if (itemOne[property] === itemTwo[property]){
        return 0;
      }

      if (itemOne[property] < itemTwo[property]){
        return -1 * direction;
      }
    });

    sortedObject.state.sorted = !sortedObject.state.sorted;
    UI.renderCases(arrayCopy, key);

    return 0;
  },

  /**
   * Отображает отсортированный массив категорий/кейсов
   * @param {[]} array
   * @param {string} property
   */
  renderCases(array, property) {
    property = `C${property.slice(1)}`;

    array.forEach((item) => {
      UI.listBlock[`listOf${property}`].content.list.removeChild(item.HTMLItem.container);
      UI.listBlock[`listOf${property}`].content.list.appendChild(item.HTMLItem.container);
    })
  },

  /**
   * Отменяет срытие элементов не удовлетворяющих поиску
   */
  closeSearch(){
    Application.state.searchingByCategory = false;

    UI.listBlock.listOfCategories.optionBlock.searchBlock.closeSearch.remove();

    Application.categories.forEach((category) => {
      category.HTMLItem.container.classList.remove('hide');

      category.cases.forEach((verifiableCase) => {
        verifiableCase.HTMLItem.container.classList.remove('hide');
      });
    });
  },

  /**
   * Обновляет значения каунтера
   * @param {string} key
   */
  updateCounter(key) {
    UI.listBlock[`listOf${key}`].content[`count${key}`].text = Application.state[`count${key}`] + ' c' + key.slice(1);
  }
};

UI.listBlock.listOfCases.optionBlock.sortByTextButton.onclick = () => {
  UI.sort('title', Application.state.selectedCategory);
};

UI.listBlock.listOfCases.optionBlock.sortByDateButton.onclick = () => {
  UI.sort('date', Application.state.selectedCategory);
};

UI.listBlock.listOfCategories.optionBlock.sortButton.onclick = () => {
  UI.sort('title', Application);
};

UI.listBlock.listOfCategories.optionBlock.searchBlock.button.onclick = () =>{
  Application.find(UI.listBlock.listOfCategories.optionBlock.searchBlock.input.value);
};

UI.listBlock.listOfCases.content.addButton.onclick = () => UI.popUp.open('new case');

UI.listBlock.listOfCategories.content.addButton.onclick = () => UI.popUp.open('new category');

UI.popUp.closeButton.onclick = () => UI.popUp.close();

UI.categorySelector.container.onclick = () => UI.toggleSelector(UI.categorySelector, 'category');

UI.caseSelector.container.onclick = () => UI.toggleSelector(UI.caseSelector, 'case');

UI.listBlock.listOfCategories.optionBlock.sortButton.onclick = () => UI.sort('title', Application)

UI.listBlock.listOfCases.optionBlock.sortByTextButton.onclick = () => UI.sort('title', Application.state.selectedCategory);

UI.listBlock.listOfCases.optionBlock.sortByDateButton.onclick = () => UI.sort('date', Application.state.selectedCategory);

UI.listBlock.listOfCategories.optionBlock.searchBlock.closeSearch.onclick = () => UI.closeSearch();