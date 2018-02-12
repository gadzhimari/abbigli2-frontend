import bemCn from 'bem-cn-fast';

export function mix(baseClass, className) {
  return `${baseClass}, ${className}`;
}

export const B = bemCn;
