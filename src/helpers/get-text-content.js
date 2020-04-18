const VANILLA_TEXT_ELEM = 'Text'; // vanilla
const CUSTOM_TEXT_WRAPPERS = []; // mango

/**
 * Add the names of any elements that serve as wrappers for text and should
 * also be checked for text content in the test.
 */
function configureCustomTextWrappers(...list) {
  CUSTOM_TEXT_WRAPPERS.push(...list);
}

function isTextElement(wrapper) {
  const name = wrapper.name();
  return name === VANILLA_TEXT_ELEM || CUSTOM_TEXT_WRAPPERS.includes(name);
}

function getTextElements(wrapper) {
  if (wrapper.name() === VANILLA_TEXT_ELEM) {
    return [wrapper];
  }

  return wrapper
    .findWhere(isTextElement)
    .map((el) => (el.name() === VANILLA_TEXT_ELEM ? el : getTextElements(el.dive())));
}

function toString(textElems) {
  // If it's a single element, just print its raw text children.
  if (!Array.isArray(textElems)) {
    return textElems
      .children()
      .map((i) => i.text())
      .join('');
  }

  // If it's an array of elements (caused by nesting), join the text of all of them.
  return textElems.map(toString).join('');
}

/**
 * Returns the text content of text elements contained in a given shallow wrapper.
 * Will return the wrapper's own text content if it is a vanilla React Text element
 * or a custom text wrapper element.
 */
function getTextContent(wrapper) {
  return getTextElements(wrapper).map(toString);
}
export { configureCustomTextWrappers, getTextContent };
