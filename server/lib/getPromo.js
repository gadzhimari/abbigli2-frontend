export default function getPromo(currentSection, promo) {
  if (currentSection.children.length === 0) return [];

  return promo[currentSection.id] || [];
}
