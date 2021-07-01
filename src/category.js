import {addChild, createElement, formatDate, isntEmpty, updateStorage} from './function';
import { UI } from './UI';
import {Case} from './caseItem';
import {Application} from './Application';

// text - название категории
// cases - массив содержащий кейсов
// sorted - флаг указывающий направление сортировки массива categories
// HTMLItem - содержит HTML соответствующей категории
// add() - добавляет новый элемент в массив
// showCase() - отображает кейс
// delete() - удаляет кейс
// showCategoryCases() - отображает все кейсы заданной категории


/**
 * @param {Category} category
 * @param {{container: HTMLDivElement}} category.HTMLItem
 * @constructor
 */
export function Category(category) {
  this.title = category.title || '';
  this.HTMLItem = category.HTMLItem;
  this.cases = [];
  this.state = { sorted: true };
  this.counts = category.counts;
}

/**
 * Getter получает необходимую информацию из объекта для записи
 */
Object.defineProperty(Category.prototype, 'data', {
  get () {
    return {
      title: this.title,
      cases: this.cases.map(({data}) => data),
      sorted: this.sorted,
    }}
});

/**
 * Setter позволяет изменив свойство textData поменять текст в самом обьекте и в HTML элементе, его отражающем
 */
Object.defineProperty(Category.prototype, 'textData', {
  set (text) {
    this.HTMLItem.textBlock.title.text = text;
    this.title = text;
  }
});

/**
 * Добавляет новый кейс в категорию
 */
Category.prototype.add = function () {
  let tempCase = new Case({
    title: UI.popUp.body.inputName.value,
    text: UI.popUp.body.inputText.value,
  });

  this.cases.push(tempCase);
  this.buildHTMLCases(tempCase);
  updateStorage();

  UI.listBlock.listOfCases.optionBlock.container.classList.remove('hide');
  UI.popUp.close();
};

/**
 * Удаляет кейс из категории
 * @param {Case} deleteCase
 */
Category.prototype.deleteCase = function (deleteCase) {
  Application.state.countCases--;
  UI.updateCounter('Cases');

  deleteCase.HTMLItem.container.remove();
  Application.state.selectedCategory.cases = Application.state.selectedCategory.cases.filter((filterCase) => deleteCase !== filterCase);
  updateStorage();
};

/**
 * Создает HTML элемент для визуализации обьекта
 * @param {Case} showCase
 */
Category.prototype.buildHTMLCases = function (showCase) {
  let caseHtml = {
    container: createElement({
      type: 'div',
      className: ['case'],
    }),
    body: createElement({
      type: 'div',
      className: ['case-body', 'case-body-item'],
    }),
    textBlock: {
      container: createElement({
        type: 'div',
        className: ['case-text-block'],
      }),
      title: createElement({
        type: 'h3',
        className: ['text', 'text-title'],
        text: showCase.title,
      }),
      text: createElement({
        type: 'h3',
        className: ['text'],
        text: showCase.text,
      }),
    },
    date: createElement({
      type: 'h5',
      className: ['date'],
      text: formatDate(showCase.date),
    }),
  };

  showCase.HTMLItem = caseHtml;

  caseHtml.body.onclick = () => {
    if(isntEmpty(Application.state.selectedCase)) {
      UI.caseSelector.container.classList.remove('case-body-selector-active');
      UI.caseSelector.container.classList.add('case-body-selector-unactive');

      let remove = Application.state.selectedCase.HTMLItem.container.removeChild.bind(Application.state.selectedCase.HTMLItem.container)
      setTimeout(remove, 500, UI.caseSelector.container);

      if (Application.state.selectedCase === showCase) {
        Application.state.selectedCase = {};
        UI.clearBlock(UI.listBlock.caseItem.container);

        return;
      }
    }

    UI.caseSelector.option.renameButton.onclick = () => UI.popUp.open('change case')
    UI.caseSelector.option.deleteButton.onclick = () => this.deleteCase(showCase);

    Application.state.selectedCase = showCase;
    showCase.show();

    UI.caseSelector.container.classList.remove('case-body-selector-unactive');
    UI.caseSelector.container.classList.add('case-body-selector-active');

    addChild(caseHtml.container, [
      UI.caseSelector.container
    ]);
  };
};

/**
 * Отображает на экране все HTML элемент визуализирующий кейс
 * @param {Case} showCase
 */
Category.prototype.showCase = function (showCase){
  Application.state.countCases++;
  addChild(showCase.HTMLItem.textBlock.container, [
    showCase.HTMLItem.textBlock.title,
    showCase.HTMLItem.textBlock.text
  ]);

  addChild(showCase.HTMLItem.body, [
    showCase.HTMLItem.textBlock.container,
    showCase.HTMLItem.date
  ]);

  addChild(showCase.HTMLItem.container, [
    showCase.HTMLItem.body
  ]);

  addChild(UI.listBlock.listOfCases.content.list, [
    showCase.HTMLItem.container
  ]);
};

/**
 * Отображает все HTML элементы соответсвующие всем кейсам переданной категории
 */
Category.prototype.showCategoryCases = function () {
    this.cases.forEach(this.showCase);

    if(Application.state.countCases === 0) {
      UI.listBlock.listOfCases.optionBlock.container.classList.add('hide');
    } else {
      UI.listBlock.listOfCases.optionBlock.container.classList.remove('hide');
    }
};