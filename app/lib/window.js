export function isClickOutside(element, target) {
  return element !== target && !element.contains(target);
}
