import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React, Fragment } from '../__base';
import Button from './Button';
import IconHeart from '../../icons/heart';
import IconClose from '../../icons/close';

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

const defaultButton = () => (
  <Fragment>
    {
      Object.keys(colors).map(color =>
        <Button
          key={color}
          text={colors[color]}
          color={color}
          onClick={action('onClick')}
        />
      )
    }
  </Fragment>
);

const defaultButtonStr = `
# Документация
Дефолтное представление кнопки. Для указания цвета достаточно передать
модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @theme-colors.
## Пример
~~~js
<Button
  text="Danger"
  color="danger"
  onClick={action('button-click')}
/>
~~~
`;

const outlineButton = () => (
  <Fragment>
    {
      Object.keys(colors).map(color =>
        <Button
          key={color}
          text={colors[color]}
          color={color}
          view="outline"
          onClick={action('onClick')}
        />
      )
    }
  </Fragment>
);

const outlineButtonStr = `
# Документация
Кнопка без бэкграунда и с бордером. Для указания цвета достаточно передать
модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @theme-colors.
## Пример
~~~js
<Button
  text="Warning"
  color="warning"
  view="outline"
  onClick={action('onClick')}
/>
~~~
`;

const fabButton = () => (
  <Button
    view="fab"
    aria-label="Редактировать"
    icon={<IconHeart
      size="xs"
      color="gray-400"
    />}
  />
);

const fabButtonStr = `
# Документация
Данный тип кнопки не имеет текста, поэтому необходимо дополнительно передавать
аттрибут aria-label для людей с ограниченными возможностями.
[FAB-кнопка из Material Design](https://material.io/guidelines/components/buttons-floating-action-button.html#buttons-floating-action-button-transitions)
## Пример
~~~js
<Button
  view="fab"
  aria-label="Поставить лайк"
  color="attention"
  icon={<IconHeart
    size="xs"
  />}
/>
~~~
`;

const iconButton = () => (
  <Button
    view="icon"
    aria-label="Закрыть"
    icon={<IconClose
      size="xs"
      color="blue"
    />}
  />
);

const iconButtonStr = `
# Документация
Данный тип кнопки не имеет текста, поэтому необходимо дополнительно передавать
аттрибут aria-label для людей с ограниченными возможностями. Основное отличие от
Fab-кнопки в том, что у данной кнопки нет бэкграунда.
## Пример
~~~js
<Button
  view="icon"
  aria-label="Закрыть"
  icon={<IconClose
    size="xs"
    color="blue"
  />}
/>
~~~
`;

const linkButton = () => (
  <Button
    view="link"
    text="link"
  />
);

const linkButtonStr = `
# Документация
Кнопка имеющая визуальный вид похожий на ссылку. Для указания цвета достаточно передать модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @theme-colors.
## Пример
~~~js
<Button
  view="link"
  text="link"
/>
~~~
`;

const buttonSizes = () => (
  <Fragment>
    {
      sizes.map(size =>
        <Button
          size={size}
          text="Редактировать"
          icon={<IconHeart
            size="xs"
            color="white"
          />}
        />
      )
    }
  </Fragment>
);
const buttonSizesStr = `
# Документация
Размеры кнопки - s, m, l(слева направо)
## Пример
~~~js
<Button
  size="s"
  text="Редактировать"
  icon={<IconHeart
    size="xs"
    color="white"
  />}
/>
~~~
`;

const fullWidthButton = () => (
  <Button
    text="Редактировать"
    fullWidth
    icon={<IconHeart
      size="xs"
      color="red"
    />}
  />
);

const fullWidthButtonStr = `
# Документация
Кнопка занимает 100% ширины контейнера, в котором находится.
## Пример
~~~js
<Button
  text="Редактировать"
  fullWidth
  icon={<IconHeart
    size="xs"
    color="red"
  />}
/>
~~~
`;

const buttonIconPosition = () => (
  <Fragment>
    <Button
      text="Редактировать"
      icon={<IconHeart
        size="xs"
        color="white"
      />}
    />
    <Button
      text="Редактировать"
      iconPosition="right"
      icon={<IconHeart
        size="xs"
        color="white"
      />}
    />
  </Fragment>
);

const buttonIconPositionStr = `
# Документация
Положение иконки в кнопке
## Пример
~~~js
<Button
  text="Редактировать"
  iconPosition="right"
  icon={<IconHeart
    size="xs"
    color="white"
  />}
/>
~~~
`;

const buttonDisabled = () => (
  <Button
    text="Редактировать"
    disabled
    icon={<IconHeart
      size="xs"
      color="white"
    />}
  />
);

const buttonDisabledStr = `
# Документация
Кнопка в состоянии disabled
## Пример
~~~js
<Button
  text="Редактировать"
  disabled
  icon={<IconHeart
    size="xs"
    color="white"
  />}
/>
~~~
`;

const buttonFetching = () => (
  <Fragment>
    {
      sizes.map(size =>
        <Button
          size={size}
          text="Редактировать"
          isFetching
        />
      )
    }
  </Fragment>
);

const buttonFetchingStr = `
# Документация
Показывает спиннер при загрузке данных
## Пример
~~~js
<Button
  size="s"
  text="Редактировать"
  isFetching
/>
~~~
`;

storiesOf('Button', module)
  .add('Primary', withMarkdownNotes(defaultButtonStr)(defaultButton))
  .add('Outline', withMarkdownNotes(outlineButtonStr)(outlineButton))
  .add('Link', withMarkdownNotes(linkButtonStr)(linkButton))
  .add('Fab', withMarkdownNotes(fabButtonStr)(fabButton))
  .add('Icon', withMarkdownNotes(iconButtonStr)(iconButton))
  .add('Sizes', withMarkdownNotes(buttonSizesStr)(buttonSizes))
  .add('Fullwidth', withMarkdownNotes(fullWidthButtonStr)(fullWidthButton))
  .add('Icon position',
    withMarkdownNotes(buttonIconPositionStr)(buttonIconPosition))
  .add('Disabled',
    withMarkdownNotes(buttonDisabledStr)(buttonDisabled))
  .add('Fetching',
    withMarkdownNotes(buttonFetchingStr)(buttonFetching));
