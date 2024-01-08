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

export { createDOMElement }