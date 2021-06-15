

export function createElement({type, className, text, onclick}){
    const element = document.createElement(type);

    if (className) {
        className.forEach((item) => {
            element.classList.add(item);
        });
    }
    if (text){
        element.textContent = text;
    }

    Object.defineProperty(element, 'text', {
        set(value){
            element.textContent = value;
        }
    });

    return element;
}
export function addChild(parent, children){
    children.forEach((item) => {
        parent.appendChild(item);
    });
}