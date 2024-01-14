function isStandardElement(element) {
    return element instanceof HTMLElement
      && !(element instanceof HTMLUnknownElement);
  }
  
function createDOMElement(tagName, HTML_attributes = {}, content = null) {
  const element = document.createElement(tagName);
  
  if (!isStandardElement(element))
    console.warn(tagName + " is not a standard tag name.");

  for (const attribute in HTML_attributes)
    element.setAttribute(attribute, HTML_attributes[attribute]);

  if (content)
    element.innerHTML = content;

  return element;
}

function writeToStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function loadStorage() {
  let data = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i)
    let value = window.localStorage.getItem(key);
    data.push({key: key, value: JSON.parse(value)});
  }
  return data;
}

export { createDOMElement, writeToStorage, loadStorage }