const checkLimit = (num) => {
  const parsedNum = parseInt(num, 10);
  return !isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= 1000;
};

export { checkLimit };
