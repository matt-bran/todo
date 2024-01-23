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
  let order = window.localStorage.getItem('order');
  if (order != null) {
    order = JSON.parse(order);
    if (!contains(order, key))
      order.push(key);
    window.localStorage.setItem('order', JSON.stringify(order));
  } else {
    window.localStorage.setItem('order', JSON.stringify([key]));
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeFromStorage(key) {
  window.localStorage.removeItem(key);
  let order = window.localStorage.getItem('order');
  order = JSON.parse(order);
  for (let i = 0; i < order.length; i++) {
    if(order[i] == key) 
      order.splice(i, 1);
  }
  window.localStorage.setItem('order', JSON.stringify(order));
  
}

function loadStorage() {
  let data = [];
  const key_order = JSON.parse(window.localStorage.getItem('order'));
  for (let i = 0; i < key_order.length; i++) {
    let value = window.localStorage.getItem(key_order[i]);
    data.push({key: key_order[i], value: JSON.parse(value)});
  }
  return data;
}

function contains(list, item) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == item) {
      return true
    }
  }
  return false;
}

export { createDOMElement, writeToStorage, removeFromStorage, loadStorage }