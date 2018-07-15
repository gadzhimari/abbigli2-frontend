export default function getPromo(currentSection, promo) {
  return promo[currentSection.id] || [];
}
