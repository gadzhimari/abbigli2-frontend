import { storiesOf } from '@storybook/react';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { React } from '../__base';
import Rating from './Rating';
import IconHeart from '../../icons/heart';

const basicRating = () => (
  <Rating />
);

const basicRatingStr = `
# Документация
Дефолтное представление компонента рейтинг.

## Пример
~~~js
<Rating />
~~~
`;

const halfStarRating = () => (
  <Rating
    defaultValue={2.5}
    allowHalf
  />
);

const halfStarRatingStr = `
# Документация
Возможность использовать дробные значения оценки

## Пример
~~~js
<Rating
  defaultValue={2.5}
  allowHalf
/>
~~~
`;

const readOnlyRating = () => (
  <Rating
    defaultValue={2}
    disabled
  />
);

const readOnlyRatingStr = `
# Документация
Отключает возможность интерактивности мышью.

## Пример
~~~js
<Rating
  defaultValue={2}
  disabled
/>
~~~
`;

const allowClearRating = () => (
  <div>
    <div>
      <Rating
        defaultValue={2}
        allowClear
      />
    </div>
    <div>
      <Rating
        defaultValue={2}
        allowClear={false}
      />
    </div>
  </div>
);

const allowClearRatingStr = `
# Документация
Возможность сброса рейтинга при повторном нажатии на иконку звезды

## Пример
~~~js
<Rating
  defaultValue={2}
  allowClear
/>
<Rating
  defaultValue={2}
  allowClear={false}
/>
~~~
`;

const customIconRating = () => (
  <div>
    <div>
      <Rating
        defaultValue={2}
      />
    </div>
    <div>
      <Rating
        defaultValue={2}
        icon={<IconHeart size="xs" />}
      />
    </div>
    <div>
      <Rating
        defaultValue={2}
        icon={<IconHeart size="s" />}
      />
    </div>
  </div>
);

const customIconRatingStr = `
# Документация
Возможность задать свою иконку вместо дефолтной звезды

## Пример
~~~js
<Rating
  defaultValue={2}
/>
<Rating
  defaultValue={2}
  icon={<IconHeart size="xs" />}
/>
<Rating
  defaultValue={2}
  icon={<IconHeart size="s" />}
/>
~~~
`;

storiesOf('Rating', module)
  .add('Basic', withMarkdownNotes(basicRatingStr)(basicRating))
  .add('Half star', withMarkdownNotes(halfStarRatingStr)(halfStarRating))
  .add('Read only', withMarkdownNotes(readOnlyRatingStr)(readOnlyRating))
  .add('Clear star', withMarkdownNotes(allowClearRatingStr)(allowClearRating))
  .add('Custom icon', withMarkdownNotes(customIconRatingStr)(customIconRating));
