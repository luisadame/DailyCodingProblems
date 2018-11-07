function arrayMultiplied(numbers) {
  let newArray = [],
    total = numbers.reduce((a, b) => a * b);
  for (let number of numbers) newArray.push(total / number);
  return newArray;
}

function arrayMultipliedExponential(numbers) {
  let newArray = [],
    total = numbers.reduce((a, b) => a * b);
  for (let i = 0; i < numbers.length; i++) {
    newArray[i] = total * numbers[i] ** -1;
  }
  return newArray;
}

console.log(arrayMultiplied([1, 2, 3, 4, 5]));
console.log(arrayMultipliedExponential([1, 2, 3, 4, 5]));
console.log(arrayMultiplied([3, 2, 1]));
console.log(arrayMultipliedExponential([3, 2, 1]));
