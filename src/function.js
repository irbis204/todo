/**
 *
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

  Object.defineProperty(element, "text", {
    set(value) {
      element.textContent = value;
    },
  });

  return element;
}

export function addChild(parent, children) {
  children.forEach((item) => {
    parent.appendChild(item);
  });
}

export function formatDate(date) {
  return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
