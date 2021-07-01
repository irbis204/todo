import { addChild, createElement, updateStorage, isntEmpty} from './function';
import { UI } from './UI';
import { Category } from './category';
import { Case } from './caseItem';

// Application - основной обьект приложения
// categories - массив содержащий категории
// sorted - флаг указывающий направление сортировки массива categories
// selectedCategory в себе выбранную категорию
// selectedCase в себе выбранный case (задачу)
// add() - добавляет новый элеметн в массив
// showCategory() - отображает категорию
// delete() - удаляет категорию
// find() - отображает категории содержащие кейсы (задачи) соответствующие введенному тексту

export let Application = {
  categories: [],
  state: {
    sorted: true,
    selectedCategory: {},
    selectedCase: {},
    searchingByCategory: false,
    countCategories: 0,
    countCases: 0,
  },

  /**
   * Получает из объекта только необходимую информацию
   * @returns {{categories}}
   */
  get data() {
    return { categories: this.categories.map(({data}) => data) }
  },

  /**
   * Заполняет обьест полученной информацией
   * @param object
   */
  set data(object) {
    object.categories.forEach((item) => {
      this.categories.push(new Category(item));

      item.cases.forEach((element) => {
        this.categories[this.categories.length-1].cases.push(new Case(element));
      });
    });
  },

  /**
   * Добавляет новый элемент категории
   */
  add(){
    let category = new Category({
      title: UI.popUp.body.inputName.value,
    });

    this.categories.push(category);
    this.showCategory(category);
    updateStorage();

    UI.popUp.close();
  },

  /**
   * Удаляет выбранный элемент категории
   * @param {Category} deleteCategory
   */
  delete(deleteCategory) {
    Application.state.countCategories--;
    UI.updateCounter('Categories');

    deleteCategory.HTMLItem.container.remove();
    Application.categories = Application.categories.filter((category) => category !== deleteCategory);

    updateStorage();
  },

  /**
   * Создает и выводит на экран визуальное представление обьеста категории
   * @param {Category} category
   */
  showCategory(category){
    let categoryHtml = {
      container: createElement({
        type: 'div',
        className: ['category'],
      }),
      body: createElement({
        type: 'div',
        className: ['category-body', 'category-body-item'],
      }),
      textBlock: {
        container: createElement({
          type: 'div',
          className: ['category-text-block'],
        }),
        title: createElement({
          type: 'h3',
          className: ['text', 'text-title'],
          text: category.title,
        }),
      },
    };

    Application.state.countCategories++;
    UI.updateCounter('Categories');

    category.HTMLItem = categoryHtml;

    categoryHtml.body.onclick = () => {
      UI.clearBlock(UI.listBlock.listOfCases.content.list);

      if(Application.state.searchingByCategory){
        UI.closeSearch();
      }

      if(isntEmpty(Application.state.selectedCategory)) {
        UI.categorySelector.container.classList.remove('category-body-selector-active');
        UI.categorySelector.container.classList.add('category-body-selector-unactive');

        let remove = Application.state.selectedCategory.HTMLItem.container.removeChild.bind(Application.state.selectedCategory.HTMLItem.container);
        setTimeout(remove, 400, UI.categorySelector.container);

        if(Application.state.selectedCategory === category){
          UI.categorySelector.container.classList.remove('category-body-selector-unactive');
          Application.state.selectedCategory = {};

          return;
        }
      }
      Application.state.selectedCase = {};
      UI.caseSelector.container.remove();

      UI.categorySelector.option.deleteButton.onclick = () => this.delete(category);
      UI.categorySelector.option.renameButton.onclick = () => UI.popUp.open('change category');

      Application.state.countCases = 0;
      category.showCategoryCases();
      UI.updateCounter('Cases');

      Application.state.selectedCategory = category;

      UI.categorySelector.container.classList.remove('category-body-selector-unactive');
      UI.categorySelector.container.classList.add('category-body-selector-active');

      addChild(categoryHtml.container, [
        UI.categorySelector.container
      ]);
    };

    addChild(categoryHtml.textBlock.container, [
      categoryHtml.textBlock.title,
    ]);

    addChild(categoryHtml.body, [
      categoryHtml.textBlock.container,
    ]);

    addChild(categoryHtml.container, [
      categoryHtml.body
    ]);

    addChild(UI.listBlock.listOfCategories.content.list, [
      categoryHtml.container
    ]);
  },

  /**
   *  Осуществляет поиск
   * @param {string} text
   */
  find(text){
    if (isntEmpty(Application.state.selectedCategory)){
      Application.state.searchingByCategory = true;

      Application.state.selectedCategory.cases.forEach((verifiableCase) => {

        if(!(verifiableCase.title.includes(text) || verifiableCase.text.includes(text))){
          verifiableCase.HTMLItem.container.classList.add('hide');
        }
      });

      addChild(UI.listBlock.listOfCases.content.list,  [
        UI.listBlock.listOfCategories.optionBlock.searchBlock.closeSearch
      ]);
    } else {
      this.categories.forEach((category) => {
        let shouldBeHidden = true;

        category.cases.forEach((verifiableCase) => {
          if(verifiableCase.title.includes(text) || verifiableCase.text.includes(text)){
            shouldBeHidden = false;
          } else {
            verifiableCase.HTMLItem.container.classList.add('hide');
          }
        });

        if (shouldBeHidden && !category.title.includes(text)) {
          category.HTMLItem.container.classList.add('hide');
        }
      });

      addChild(UI.listBlock.listOfCategories.content.list,  [
        UI.listBlock.listOfCategories.optionBlock.searchBlock.closeSearch
      ]);
    }
  },
};
