import {UI} from './UI';
import {Application} from './Application';

// createElement() - создает HTML элемент
// addChild() - добавляет наследников элементу
// formatDate() - преобразует секунды в дату определенного вида
// changeText() - изменяет текст элемента массива (категории или кейса)
// preventDefaults() - обработчик событий по умолчанию
// handleDrop() - обработка дропнтых в форму файлов, достает файлы из события
// handleFiles() - обработка файлов
// uploadFile() - загрузка файлов на сервер
// updateStorage() - записывает данные приложения в localStorage
// getStorage() - получает данные из localStorage и отображает их

/**
 * @param type
 * @param className
 * @param text
 * @return {HTMLInputElement | HTMLDivElement | HTMLHeadElement | HTMLButtonElement}
 */
export function createElement({ type, className, text }) {
  const element = document.createElement(type);

  if (className) {
    className.forEach((item) => {
      element.classList.add(item);
    });
  }

  if (text) {
    element.textContent = text;
  }

  Object.defineProperty(element, 'text', {
    set(value) {
      element.textContent = value;
    },
  });

  return element;
}

/**
 * @param {HTMLInputElement | HTMLDivElement | HTMLHeadElement | HTMLButtonElement} parent - элемент в который будут добавлены элементы из массива children
 * @param {HTMLInputElement[] | HTMLDivElement[] | HTMLHeadElement[] | HTMLButtonElement[]} children - массив элементов которые будут добавлены в parent
 */
export function addChild(parent, children) {
  children.forEach((item) => parent.appendChild(item));
}

/**
 * Преобразует дату к нужному виду
 * @param {number} seconds
 * @returns {string}
 */
export function formatDate(seconds) {
  let date = new Date(seconds);

  return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/**
 * Обработчик событий по умолчанию
 * @param e
 */
export function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * Обработка события дропа
 * @param e
 */
export function handleDrop(e) {
  let dataTransfer = e.dataTransfer;
  let files = dataTransfer.files;

  handleFiles(files);
}

/**
 * Обработка файлов
 * @param files
 */
function handleFiles(files){
  [...files].forEach((file) => uploadFile(file, (image) => {
    const elementImage = createElement({type: 'div'});

    elementImage.setAttribute('style', `background:url('${image}') no-repeat center; background-size: cover`);
    elementImage.classList.add('image');

    UI.listBlock.caseItem.gallery.appendChild(elementImage);
    Application.state.selectedCase.imageURLs.push(image);

    updateStorage();
  }));

}

/**
 * Отправка запроса на загрузку файлов на сервер
 * @param file
 * @param {Function} callback
 * @returns {*}
 */
function uploadFile(file, callback){
  let url = './upload.php';
  let formData = new FormData();
  let imagePath;

  formData.append('file', file);
  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(async function(response){
    callback(await response.text());
  });

  return imagePath;
}

/**
 * Записывает актуальную информацию о приложении в localStorage
 */
export function updateStorage(){
  if(Application.categories) {
    window.localStorage.setItem('categories', JSON.stringify(Application.data));
  }
}

/**
 *  Получает информацию о приложении из localStorage и использует ее
 */
export function getStorage(){
  let categoriesTemp = JSON.parse(window.localStorage.getItem('categories'));

  if(categoriesTemp) {
    Application.data = categoriesTemp;

    Application.categories.forEach((category) => {
      Application.showCategory(category);

      category.cases.forEach((showCase) => {
        category.buildHTMLCases(showCase);
      });
    });
  }
}

/**
 * Проверка обьекта на пустоту
 * @param {{}} object
 * @returns {boolean}
 */
export function isntEmpty(object) {
  for (let key in object) {
    return true;
  }

  return false;
}

/**
 * @param {Category || Case} changeItem
 * @param {string} key
 */
export function changeText(changeItem, key) {
  if (key === 'Case'){
    changeItem.textData = {
      title: UI.popUp.body.inputName.value,
      text: UI.popUp.body.inputText.value,
    };
  } else {
    changeItem.textData = UI.popUp.body.inputName.value;
  }

  UI.popUp.close();
}