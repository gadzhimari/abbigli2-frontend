export default function prepareState(state) {
  const preparedState = { ...state };

  preparedState.Sections = {
    ...preparedState.Sections,
    // Вырезаем потомков верхних категорий для облегчения страницы
    items: preparedState.Sections.items.map(item => ({
      ...item,
      children: []
    })),
    // Вырезаем ненужные при рендере категории
    subsections: [],
    promo: {},
    normalizedCategories: {}
  };

  return preparedState;
}
