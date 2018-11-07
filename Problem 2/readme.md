# Problem 2

## Wording

> Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?

## Process followed to solve the problem

First thoughts were simple enough, my thought was: _Ok, this seems like a good place to use a map function_. But, I didn't got it right away so decided to use a more promitive way. First, we would need a **new array** where I could hold the new data. Second, I needed a **copy from the numbers array** to work with. Third, I needed a loop to iterate over the numbers given and know their indexes, and that way I could **remove the current index from the copy**, use a **reduce** function to calculate the total multiplication and store it in the new array. Example:

```javascript
function arrayMultiplied(numbers) {
  let newArray = [];
  for (let i = 0; i < numbers.length; i++) {
    let copy = Array.from(numbers);
    delete copy[i];
    newArray[i] = copy.reduce((a, b) => a * b);
  }
  return newArray;
}
```

This was a **correct** solution. Problem? **Efficiency**. The first 100 numbers could hold the process for like a second. And that's bad.

So, let's optimize it a little more. I could obviosly see that making a copy of the original array in every iteration wasn't really efficient so I started to work on another solution where I wouldn't need this copy.

Instantly I knew that this was possible using a temmporary variable where I could save the current number, delete it from the array, calculate the multiplication, save it, and then put it back to its place.

```javascript
function arrayMultiplied(numbers) {
  let newArray = [];
  for (let i = 0; i < numbers.length; i++) {
    let temp = numbers[i];
    delete numbers[i];
    newArray[i] = numbers.reduce((a, b) => a * b);
    numbers[i] = temp;
  }
  return newArray;
}
```

This resulted in a much faster way. However, I revisited the wording of the problem and at the end it said if it would be possible to make it without divisions and I said "Oh no, this should be solved with divisions".
Started again to think about it. So, with a division, how? Simple: calculate the whole multiplication (1 x 2 x 3 x 4 x 5) and then you'd obtain your number dividing the total by the current number.

```javascript
function arrayMultiplied(numbers) {
  let newArray = [],
    total = numbers.reduce((a, b) => a * b);
  for (let number of numbers) newArray.push(total / number);
  return newArray;
}
```

Perfect, another solution, let's benchmark it. Using the `time` command I compared this solution with the others. This one was faster in every case, but it was much more noticeable in _BIG_ list of numbers. At 10000 numbers the other solutions lasted for like 30 and 40 seconds, even more. However, this solution could handle a list of 10000000 numbers and do it in 3 seconds. Pure fire, right! Maths strike again.

Hey! Let's not forget what I read in the wording: ... without divisions. Oh, we got this one with divisions, know let's not use them.

And here is the real fire. I took a piece of paper and started to use some maths.

The total multiplication of 1,2,3,4,5 was 120.
Then:
120 / 1 = 120
120 / 2 = 60
120 / 3 = 40
...

The pattern here is that we divide, now how can we achieve the same solution with a multiplication. Let's make an equation:

> 120x = 60; x = 60/120; x = 0.5;

Now, we know that multiplying 120 by 0.5 would give us the expected solution, how could we generalize this.
We can get 0.5 by this division: 1 / 2. So, given this how could I obtain the next one? 1 / 3 = 0.333... and checking that give us... 120 \* 0.3333 = 40. So yeah, we are on our way.

Therefore, we need to get these numbers but without using the division 1/x
And in maths we can achieve this by using **exponentials**.

> 1 / x = x^-1
> Okay, so lets code this.

```javascript
function arrayMultiplied(numbers) {
  let newArray = [],
    total = numbers.reduce((a, b) => a * b);
  for (let i = 0; i < numbers.length; i++) {
    newArray[i] = total * numbers[i] ** -1;
  }
  return newArray;
}
```

And here we have, multiplying the total multiplication by the current index to the power of -1 gives us the correct numbers.

## Solution

```javascript
function arrayMultiplied(numbers) {
  let newArray = [],
    total = numbers.reduce((a, b) => a * b);
  for (let i = 0; i < numbers.length; i++) {
    newArray[i] = total * numbers[i] ** -1;
  }
  return newArray;
}
```
