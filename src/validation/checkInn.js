const checkInn = (inn) => {
  const checkDigit = (inn, coefficients) => {
    return (
      (inn
        .split("")
        .reduce((sum, digit, index) => sum + digit * coefficients[index], 0) %
        11) %
      10
    );
  };

  if (!/^\d+$/.test(inn)) return false;

  if (inn.length === 10) {
    const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
    return checkDigit(inn, coefficients) === parseInt(inn[9], 10);
  } else if (inn.length === 12) {
    const coefficientsFirst = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
    const coefficientsSecond = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
    const firstCheckDigit = checkDigit(inn, coefficientsFirst);
    const secondCheckDigit = checkDigit(inn, coefficientsSecond);
    return (
      firstCheckDigit === parseInt(inn[10], 10) &&
      secondCheckDigit === parseInt(inn[11], 10)
    );
  }

  return false;
};

export { checkInn };
