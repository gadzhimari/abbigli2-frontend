import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React, Fragment } from '../__base';
import Link from './Link';
import IconHeart from '../../icons/heart';

const primaryLink = () => (
  <Link
    view="default"
    onClick={action('onClick')}
    text="Primary"
  />
);
const primaryLinkStr = `
# Документация
Дефолтное представление ссылки
## Пример
~~~js
<Link
  view="primary"
  onClick={action('link-click')}
  text="Primary"
/>
~~~
`;

const outlineLink = () => (
  <Link
    view={'outline'}
    text="Outline"
  />
);
const outlineLinkStr = `
# Документация
Дефолтное представление ссылки
## Пример
~~~js
<Link
  view={'outline'}
  text="Outline"
/>
~~~
`;


const link = () => (
  <Link
    view={'link'}
    text="link"
  />
);
const linkStr = `
# Документация
Ссылка имеющая визуальный вид похожий на ссылку
## Пример
~~~js
<Link
  view={'link'}
  text="link"
/>
~~~
`;

const linkSizes = () => (
  <Fragment>
    <Link
      size={'s'}
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Link
      text="Редактировать"
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Link
      text="Редактировать"
      size={'l'}
      color="white"
      icon={<IconHeart
        size={'xs'}
      />}
    />
  </Fragment>
);
const linkSizesStr = `
# Документация
Размеры ссылки - s, m, l(слева направо)
## Пример
~~~js
<Link
  size={'s'}
  text="Редактировать"
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Link
  text="Редактировать"
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Link
  text="Редактировать"
  size={'l'}
  color="white"
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const fullWidthLink = () => (
  <Fragment>
    <Link
      text="Редактировать"
      color="attention"
      fullwidth
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Link
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
const fullWidthLinkStr = `
# Документация
Ссылка занимает 100% ширины контейнера, в котором находится.
## Пример
~~~js
<Link
  text="Редактировать"
  color="attention"
  fullwidth
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Link
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

const linkIconPosition = () => (
  <Fragment>
    <Link
      text="Редактировать"
      color="attention"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Link
      text="Редактировать"
      color="attention"
      iconPosition={'right'}
      icon={<IconHeart
        size={'xs'}
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
  color="attention"
  icon={<IconHeart
    size={'xs'}
  />}
/>

<Link
  text="Редактировать"
  color="attention"
  iconPosition={'right'}
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const linkDisabled = () => (
  <Link
    text="Редактировать"
    color="white"
    disabled
    icon={<IconHeart
      size={'xs'}
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
  color="white"
  disabled
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

const linkColor = () => (
  <Fragment>
    <Link
      text="Редактировать"
      icon={<IconHeart
        size={'xs'}
      />}
    />
    <Link
      text="Редактировать"
      color="event"
      icon={<IconHeart
        size={'xs'}
      />}
    />
  </Fragment>
);

const linkColorStr = `
# Документация
Модификатор отвечающий за цвет иконки внутри ссылки. Название цвета берется из
списка цветов определенных в файле colors.less
## Пример
~~~js
<Link
  text="Редактировать"
  icon={<IconHeart
    size={'xs'}
  />}
/>
<Link
  text="Редактировать"
  color="event"
  icon={<IconHeart
    size={'xs'}
  />}
/>
~~~
`;

storiesOf('Link', module)
  .add('Primary', withMarkdownNotes(primaryLinkStr)(primaryLink))
  .add('Outline', withMarkdownNotes(outlineLinkStr)(outlineLink))
  .add('Link', withMarkdownNotes(linkStr)(link))
  .add('Sizes', withMarkdownNotes(linkSizesStr)(linkSizes))
  .add('Fullwidth', withMarkdownNotes(fullWidthLinkStr)(fullWidthLink))
  .add('Icon position',
    withMarkdownNotes(linkIconPositionStr)(linkIconPosition))
  .add('Disabled',
    withMarkdownNotes(linkDisabledStr)(linkDisabled))
  .add('Color',
    withMarkdownNotes(linkColorStr)(linkColor));
