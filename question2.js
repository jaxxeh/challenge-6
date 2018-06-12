// Question 2: Write a javascript function that takes an array of numbers and a target number. The
// function should find two different numbers in the array that, when added together, give the
// target number. For example: answer([1,2,3], 4) should return [1,3]

const answer = (arr, target) => {
  return arr.filter((e, i) =>
    arr.find((e2, i2) => e2 === target - e && i !== i2)
  );
};

console.log('in:', [1, 2, 3], 4);
console.log('out:', answer([1, 2, 3], 4));
