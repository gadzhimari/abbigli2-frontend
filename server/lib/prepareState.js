export default function prepareState(state) {
  const preparedState = { ...state };

  preparedState.Sections = {
    items: preparedState.Sections.items.map(item => ({
      ...item,
      children: []
    })),
    subsections: [],
    promo: {},
    normalizedCategories: {}
  };

  return preparedState;
}
