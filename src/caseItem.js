import {UI} from './UI';
import {addChild, createElement, handleDrop, preventDefaults} from './function';

// text - название категории
// HTMLItem - содержит HTML соответствующей категории
// imageURLs - массив названий изображений
// date - дата создания задания
// add() - добавляет новый элемент в массив
// showCase() - отображает кейс
// delete() - удаляет кейс
// showCategoryCases() - отображает все кейсы заданной категории

/**
 * @param caseItem
 * @constructor
 */
export function Case(caseItem) {
  this.title = caseItem.title;
  this.text = caseItem.text || "";
  this.HTMLItem = caseItem.HTMLItem ;
  this.imageURLs = caseItem.imageURLs ? caseItem.imageURLs : [];
  this.date = caseItem.date ? caseItem.date : new Date().getTime();
  this.counts = caseItem.counts;
}

/**
 * Getter получает необходимую информацию из объекта для записи
 */
Object.defineProperty(Case.prototype, 'data', {
  get () {
    return {
      title: this.title,
      text: this.text,
      imageURLs: this.imageURLs,
      date: this.date,
    }
  },
})

/**
 * Setter позволяет изменив свойство textData поменять текст в самом обьекте и в HTML элементе, его отражающем
 */
Object.defineProperty(Case.prototype, 'textData', {
  set ({title, text}) {
    this.HTMLItem.textBlock.title.text = title;
    this.HTMLItem.textBlock.text.text = text;
    this.title = title;
    this.text = text;
  }
});

/**
 * Выводит всю информацию о кейсе
 */
Case.prototype.show = function() {
  UI.listBlock.caseItem.title.textContent = this.title;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    UI.listBlock.caseItem.dropImage.container.addEventListener(event, preventDefaults, false);
  });
  UI.listBlock.caseItem.dropImage.container.addEventListener('drop', handleDrop, false);

  UI.listBlock.caseItem.title.text =  this.title;
  UI.listBlock.caseItem.text.text = this.text;

  UI.clearBlock(UI.listBlock.caseItem.container);

  this.uploadGalery();

  addChild(UI.listBlock.caseItem.container, [
    UI.listBlock.caseItem.title,
    UI.listBlock.caseItem.text,
    UI.listBlock.caseItem.dropImage.container,
    UI.listBlock.caseItem.gallery,
  ]);
};

/**
 * Загружает фото в галерею
 */
Case.prototype.uploadGalery = function() {
  UI.clearBlock(UI.listBlock.caseItem.gallery)
  this.imageURLs.forEach((item) => {
    const elementImage = createElement({type: 'div'});
    elementImage.setAttribute('style', `background:url('${item}') no-repeat center; background-size: cover`);
    elementImage.classList.add('image');
    UI.listBlock.caseItem.gallery.appendChild(elementImage);
  })
};



