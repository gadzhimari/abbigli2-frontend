import { storiesOf } from '@storybook/react';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React, Fragment } from '../__base';
import Checkbox from './Checkbox';

const colors = {
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  danger: 'Danger',
  warning: 'Warning',
  info: 'Info',
  light: 'Light',
  dark: 'Dark',
};

const sizes = ['s', 'm', 'l'];

const checkboxSizes = () => (
  <Fragment>
    {
      sizes.map(size =>
        <Checkbox
          size={size}
          text="Редактировать"
          key={size}
        />
      )
    }
  </Fragment>
);

const checkboxSizesStr = `
# Документация
Размеры чекбокса - s, m, l(слева направо)
## Пример
~~~js
<Checkbox
  size="s"
  text="Редактировать"
/>
~~~
`;

const checkboxIconPosition = () => (
  <Checkbox
    size="s"
    text="Редактировать"
    iconPosition="right"
  />
);

const checkboxIconPositionStr = `
# Документация
Положение чекбокса относительно текста
## Пример
~~~js
<Checkbox
  size="s"
  text="Редактировать"
  iconPosition="right"
/>
~~~
`;
const checkboxColor = () => (
  <Fragment>
    {
      Object.keys(colors).map(color =>
        <Checkbox
          key={color}
          text={colors[color]}
          color={color}
        />
      )
    }
  </Fragment>
);

const checkboxColorStr = `
# Документация
Цвет галочки чекбокса
## Пример
~~~js
<Checkbox
  text="Редактировать"
  color="red"
/>
~~~
`;

const checkboxIndeterminate = () => (
  <Fragment>
    <Checkbox
      text="Редактировать"
      indeterminate
    />
    <Checkbox
      text="Редактировать"
      indeterminate
      disabled
    />
  </Fragment>
);

const checkboxIndeterminateStr = `
# Документация
Чекбокс в состоянии indeterminate
## Пример
~~~js
<Checkbox
  text="Редактировать"
  indeterminate
/>
~~~
`;

const checkboxDisabled = () => (
  <Checkbox
    text="Редактировать"
    checked
    disabled
  />
);

const checkboxDisabledStr = `
# Документация
Чекбокс в состоянии disabled
## Пример
~~~js
<Checkbox
  text="Редактировать"
  disabled
/>
~~~
`;

storiesOf('Checkbox', module)
  .add('Sizes',
    withMarkdownNotes(checkboxSizesStr)(checkboxSizes))
  .add('Icon position',
    withMarkdownNotes(checkboxIconPositionStr)(checkboxIconPosition))
  .add('Color',
    withMarkdownNotes(checkboxColorStr)(checkboxColor))
  .add('Indeterminate',
    withMarkdownNotes(checkboxIndeterminateStr)(checkboxIndeterminate))
  .add('Disabled',
    withMarkdownNotes(checkboxDisabledStr)(checkboxDisabled));
