function findPair(numbers, k) {
	for (let number of numbers) {
		if ((foundIndex = numbers.indexOf(k - number)) !== -1) {
			return [number, numbers[foundIndex]];
		}
	}
}

console.log(findPair([10, 15, 3, 7], 17));
console.log(findPair([2, 5, 3, 4], 9));
console.log(findPair([20, 5, 3, 1], 4));

