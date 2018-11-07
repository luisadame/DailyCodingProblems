# Problem 1

## Wording

> Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?

## Process followed to solve the problem

First thoughts were to nest for loops, that way you could have the first number and then check the others, but I knew this was overkilled.
So I came up with realizing that if your k was substracted a number from the array you would just need to look for a number that is equals to the result of that substraction.

## Solution

```javascript
function findPair(numbers, k) {
  for (let number of numbers) {
    if ((foundIndex = numbers.indexOf(k - number)) !== -1) {
      return [number, numbers[foundIndex]];
    }
  }
}
```
