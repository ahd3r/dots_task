// without errors handling, since it is redundant, thanks to combination times iteration
const str = 'abcdefghkl';
const maxAmountOfDot = str.length - 1; // total places where dot can be
const res = [str, str.split('').join('.')];
const factorial = (num) => {
  if (num === 1) {
    return 1;
  }
  return num * factorial(num - 1);
};

const combinations = (useful, total) => {
  return factorial(total) / (factorial(useful) * factorial(total - useful));
};

const insertBefore = (elem, index, array) => {
  const start = array.slice(0, index);
  const end = array.slice(index);
  return [...start, elem, ...end];
};

const removeByIndex = (array, index) => {
  const start = array.slice(0, index);
  const end = array.slice(index + 1);
  return [...start, ...end];
};

const getIndexOfLastElem = (str, elem, skip) => {
  if (skip === 0) {
    return str.lastIndexOf(elem);
  }
  const before = str.slice(0, str.lastIndexOf(elem));
  return getIndexOfLastElem(before, elem, --skip);
};

const getNextUniqueCombination = (
  str,
  dotsInStart = false,
  dotFromBackToMove = 1
) => {
  const indexOfNeededDot = getIndexOfLastElem(str, '.', dotFromBackToMove - 1);
  if (indexOfNeededDot + dotFromBackToMove * 2 === str.length) {
    return getNextUniqueCombination(str, true, dotFromBackToMove + 1);
  }
  if (dotsInStart) {
    let a;
    a = removeByIndex(
      insertBefore('.', indexOfNeededDot + 2, str.split('')),
      indexOfNeededDot
    ).join('');
    for (let i = 1; i < dotFromBackToMove; i++) {
      a = insertBefore(
        '.',
        getIndexOfLastElem(a, '.', dotFromBackToMove - 1) + 2 * i,
        removeByIndex(
          a.split(''),
          getIndexOfLastElem(a, '.', dotFromBackToMove - i - 1)
        )
      ).join('');
    }
    return a;
  }
  return removeByIndex(
    insertBefore('.', indexOfNeededDot + 2, str.split('')),
    indexOfNeededDot
  ).join('');
};

for (let i = 1; i < maxAmountOfDot; i++) {
  const availableDots = i;
  const cases = combinations(availableDots, maxAmountOfDot);
  for (let ii = 0; ii < cases; ii++) {
    let tryCase = str;
    for (let iii = 0; iii < availableDots; iii++) {
      const lastI = tryCase.lastIndexOf('.');
      if (lastI === -1) {
        tryCase = insertBefore('.', 1, tryCase.split('')).join('');
      } else {
        tryCase = insertBefore('.', lastI + 2, tryCase.split('')).join('');
      }
    }
    if (res.includes(tryCase)) {
      tryCase = getNextUniqueCombination(res[res.length - 1]);
    }
    res.push(tryCase);
  }
}

console.log(res);
