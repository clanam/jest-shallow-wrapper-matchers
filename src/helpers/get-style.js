/** Find the value of a given style applied to an enzyme shallow wrapper. */
function getStyleProperty(wrapper, propertyName) {
  const styleProp = wrapper.props().style;
  const elemStyles = Array.isArray(styleProp) ? styleProp : [styleProp];
  // Later styles take precedence so search the array in reverse order.
  const applicableStyleObj = elemStyles.reverse().find((s) => s && s.hasOwnProperty(propertyName));
  return applicableStyleObj ? applicableStyleObj[propertyName] : undefined;
}

export { getStyleProperty };
