import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React, Fragment } from '../__base';
import Button from './Button';
import IconHeart from '../../icons/heart';

const primaryButton = () => (
  <Button
    onClick={action('onClick')}
    text="Primary"
  />
);
const primaryButtonStr = `
# Документация
Дефолтное представление кнопки
## Пример
~~~js
<Button
  onClick={action('button-click')}
  text="Primary"
/>
~~~
`;

const outlineButton = () => (
  <Button
    view={'outline'}
    text="Outline"
  />
);
const outlineButtonStr = `
# Документация
Дефолтный представление кнопки
## Пример
~~~js
<Button
  view={'outline'}
  text="Outline"
/>
~~~
`;


const fabButton = () => (
  <Button
    view={'fab'}
    label="Редактировать"
    color="attention"
    icon={<IconHeart
      size={'xs'}
    />}
  />
);
const fabButtonStr = `
# Документация
Данный тип кнопки не имеет текста, поэтому необходимо дополнительно передавать
св-во label, который служит aria-атрибутом для людей с ограниченными
возможностями.
[FAB-кнопка из Material Design](https://material.io/guidelines/components/buttons-floating-action-button.html#buttons-floating-action-button-transitions)
## Пример
~~~js
<Button
  view={'fab'}
  label="Поставить лайк"
  color="attention"
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const linkButton = () => (
  <Button
    view={'link'}
    text="link"
  />
);
const linkButtonStr = `
# Документация
Кнопка имеющая визуальный вид похожий на ссылку
## Пример
~~~js
<Button
  view={'link'}
  text="link"
/>
~~~
`;

const buttonSizes = () => (
  <Fragment>
    <Button
      size={'s'}
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Button
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Button
      text="Редактировать"
      size={'l'}
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
  </Fragment>
);
const buttonSizesStr = `
# Документация
Размеры кнопки - s, m, l(слева направо)
## Пример
~~~js
<Button
  size={'s'}
  text="Редактировать"
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Button
  text="Редактировать"
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Button
  text="Редактировать"
  size={'l'}
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const fullWidthButton = () => (
  <Fragment>
    <Button
      text="Редактировать"
      color="attention"
      fullwidth
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Button
      view={'outline'}
      text="Редактировать"
      color="attention"
      fullwidth
      icon={<IconHeart
        size={'xs'}
      />}
    />
  </Fragment>
);
const fullWidthButtonStr = `
# Документация
Кнопка занимает 100% ширины контейнера, в котором находится.
## Пример
~~~js
<Button
  text="Редактировать"
  color="attention"
  fullwidth
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Button
  view={'outline'}
  text="Редактировать"
  color="attention"
  fullwidth
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const buttonIconPosition = () => (
  <Fragment>
    <Button
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Button
      text="Редактировать"
      color="white"
      iconPosition={'right'}
      icon={<IconHeart
        size={'xs'}
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
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Button
  text="Редактировать"
  color="white"
  iconPosition={'right'}
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const buttonDisabled = () => (
  <Button
    text="Редактировать"
    color="white"
    disabled
    icon={<IconHeart
      size={'xs'}
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
  color="white"
  disabled
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const buttonColor = () => (
  <Fragment>
    <Button
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Button
      text="Редактировать"
      color="event"
      icon={<IconHeart
        size={'xs'}
      />}
    />
  </Fragment>
);

const buttonColorStr = `
# Документация
Модификатор отвечающий за цвет иконки внутри кнопки. Название цвета берется из
списка цветов определенных в файле colors.less
## Пример
~~~js
<Button
  text="Редактировать"
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>
<Button
  text="Редактировать"
  color="event"
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

storiesOf('Button', module)
  .add('Primary', withMarkdownNotes(primaryButtonStr)(primaryButton))
  .add('Outline', withMarkdownNotes(outlineButtonStr)(outlineButton))
  .add('Link', withMarkdownNotes(linkButtonStr)(linkButton))
  .add('Fab', withMarkdownNotes(fabButtonStr)(fabButton))
  .add('Sizes', withMarkdownNotes(buttonSizesStr)(buttonSizes))
  .add('Fullwidth', withMarkdownNotes(fullWidthButtonStr)(fullWidthButton))
  .add('Icon position',
    withMarkdownNotes(buttonIconPositionStr)(buttonIconPosition))
  .add('Disabled',
    withMarkdownNotes(buttonDisabledStr)(buttonDisabled))
  .add('Color',
    withMarkdownNotes(buttonColorStr)(buttonColor));
