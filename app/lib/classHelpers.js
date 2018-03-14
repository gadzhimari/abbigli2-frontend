import block from 'bem-cn-fast';

export const B = block;

export function mix(baseClass, mixedClass) {
  return `${baseClass} ${mixedClass}`;
}
