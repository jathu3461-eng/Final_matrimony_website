export function cmToFtIn(cm) {
  if (!cm || isNaN(cm)) return { feet: 0, inches: 0 };
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);
  
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  
  return { feet, inches };
}

export function ftInToCm(feet, inches) {
  if (isNaN(feet) || isNaN(inches)) return 0;
  return Math.round((feet * 30.48) + (inches * 2.54));
}

export function formatHeight(feet, inches) {
  if (!feet) return '';
  const cm = ftInToCm(feet, inches);
  return `${feet}'${inches || 0}" (${cm} cm)`;
}
