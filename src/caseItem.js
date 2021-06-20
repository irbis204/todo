import {UI} from "./UI";
import {Application} from "./Application";
import {createElement} from "./function";

let caseItem = {
  text: "",
  HTMLItem: 0,
  imageURLs: [],
  date: 0,
  show() {
    UI.caseItem.titel.textContent = this.text;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      UI.caseItem.dropImage.container.addEventListener(event, preventDefaults, false);
    });

    UI.caseItem.dropImage.container.addEventListener('drop', (e)=>{
      handleDrop(e);
    }, false);
  },
};

export function newCase(caseItem) {
  this.text = caseItem.text;
  this.HTMLItem = caseItem.HTMLItem;
  this.imageURLs = [];
  this.date = caseItem.date;

  return this;
}

newCase.prototype = caseItem;


function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleFiles(files){
  [...files].forEach((file) => uploadFile(file, (image) => {
    const elementImage = createElement({type: 'div'});
    elementImage.setAttribute('style', `background:url('${image}') no-repeat center;`);
    elementImage.classList.add('image');
    UI.caseItem.galery.appendChild(elementImage);
    console.log(Application.selectedCase);
    Application.selectedCase.imageURLs.push(image);
  }));

}

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

function handleDrop(e) {
  let dataTransfer = e.dataTransfer;
  let files = dataTransfer.files;

  handleFiles(files);
}