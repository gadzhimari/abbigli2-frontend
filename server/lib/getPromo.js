function getPromoFromCat(array, promoCategories) {
  return array.reduce((prev, cur) => {
    const currentCat = promoCategories[cur];

    if (currentCat.is_promo) {
      prev.push(currentCat);

      return prev;
    }

    prev.push(...getPromoFromCat(currentCat.children, promoCategories));

    return prev;
  }, []);
}

export default function getPromo(currentSection, promo) {
  if (currentSection.children.length === 0) return [];

  const promoCategories = promo.entities.categories;
  const currentPromoParent = promoCategories[currentSection.slug];

  const promoCat = getPromoFromCat(currentPromoParent.children, promoCategories);

  return promoCat;
}
