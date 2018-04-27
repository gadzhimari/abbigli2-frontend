import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React, Fragment } from '../__base';
import Link from './Link';
import IconHeart from '../../icons/heart';

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

const defaultLink = () => (
  <Fragment>
    {
      Object.keys(colors).map(color =>
        <Link
          key={color}
          text={colors[color]}
          color={color}
          view="default"
          onClick={action('onClick')}
        />
      )
    }
  </Fragment>
);

const defaultLinkStr = `
# Документация
Ссылка выглядящая, как кнопка. Для указания цвета достаточно передать
модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @theme-colors.
## Пример
~~~js
<Link
  text="Danger"
  color="danger"
  view="default"
  onClick={action('button-click')}
/>
~~~
`;

const outlineLink = () => (
  <Fragment>
    {
      Object.keys(colors).map(color =>
        <Link
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

const outlineLinkStr = `
# Документация
Ссылка выглядящая, как кнопка. Для указания цвета достаточно передать
модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @theme-colors.
## Пример
~~~js
<Link
  text="Warning"
  color="warning"
  view="outline"
  onClick={action('onClick')}
/>
~~~
`;

const link = () => (
  <Link
    view="link"
    text="link"
  />
);

const linkStr = `
# Документация
Дефолтное представление ссылки. Для указания цвета достаточно передать
модификатор color с нужным значением. Цвета кнопка определены в файле
colors.less в переменной @colors.
## Пример
~~~js
<Link
  view="link"
  text="link"
/>
~~~
`;

const linkSizes = () => (
  <Fragment>
    {
      sizes.map(size =>
        <Link
          size={size}
          text="Редактировать"
        />
      )
    }
  </Fragment>
);

const linkSizesStr = `
# Документация
Размеры ссылки - s, m, l(слева направо)
## Пример
~~~js
<Link
  size="s"
  text="Редактировать"
/>
~~~
`;

const fullWidthLink = () => (
  <Link
    text="Редактировать"
    fullWidth
    view="outline"
    icon={<IconHeart
      size="xs"
      color="red"
    />}
  />
);

const fullWidthLinkStr = `
# Документация
Ссылка занимает 100% ширины контейнера, в котором находится.
## Пример
~~~js
<Link
  text="Редактировать"
  fullWidth
  icon={<IconHeart
    size="xs"
    color="red"
  />}
/>
~~~
`;

const linkIconPosition = () => (
  <Fragment>
    <Link
      text="Редактировать"
      icon={<IconHeart
        size="xs"
        color="red"
      />}
    />
    <Link
      text="Редактировать"
      iconPosition="right"
      icon={<IconHeart
        size="xs"
        color="red"
      />}
    />
  </Fragment>
);

const linkIconPositionStr = `
# Документация
Положение иконки в кнопке
## Пример
~~~js
<Link
  text="Редактировать"
  iconPosition="right"
  icon={<IconHeart
    size="xs"
    color="red"
  />}
/>
~~~
`;

const linkDisabled = () => (
  <Link
    text="Редактировать"
    disabled
    icon={<IconHeart
      size={'xs'}
      color="red"
    />}
  />
);

const linkDisabledStr = `
# Документация
Ссылка в состоянии disabled
## Пример
~~~js
<Link
  text="Редактировать"
  disabled
  icon={<IconHeart
    size="xs"
    color="red"
  />}
/>
~~~
`;

storiesOf('Link', module)
  .add('Primary', withMarkdownNotes(defaultLinkStr)(defaultLink))
  .add('Outline', withMarkdownNotes(outlineLinkStr)(outlineLink))
  .add('Link', withMarkdownNotes(linkStr)(link))
  .add('Sizes', withMarkdownNotes(linkSizesStr)(linkSizes))
  .add('Fullwidth', withMarkdownNotes(fullWidthLinkStr)(fullWidthLink))
  .add('Icon position',
    withMarkdownNotes(linkIconPositionStr)(linkIconPosition))
  .add('Disabled',
    withMarkdownNotes(linkDisabledStr)(linkDisabled));
