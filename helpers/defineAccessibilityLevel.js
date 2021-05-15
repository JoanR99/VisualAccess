const defineAccessibilityLevel = (score) => {
  if (score < 25) {
    return 'Accesibilidad muy deficiente';
  } else if (score < 50) {
    return 'Accesibilidad deficiente';
  } else if (score < 70) {
    return 'Accesibilidad moderada';
  } else {
    return 'Accesibilidad alta';
  }
};

module.exports = defineAccessibilityLevel;
