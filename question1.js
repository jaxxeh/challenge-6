// Question 1: Clean the room function: given an input of
// [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual
// array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2],
// 4,5,10,[20,20], 391, 392,591]. Bonus: Make it so it organizes strings differently from number
// types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

const subArrays = type => arr => {
  return arr
    .filter(e => typeof e === type)
    .sort((a, b) => a - b)
    .reduce((acc, e, i, a) => {
      if (i > 0 && e === a[i - 1]) {
        if (Array.isArray(acc[acc.length - 1])) {
          acc[acc.length - 1] = [...acc[acc.length - 1], e];
        } else {
          acc[acc.length - 1] = [acc[acc.length - 1], e];
        }
      } else {
        acc = [...acc, e];
      }
      return acc;
    }, []);
};

const answer = arr => {
  const subNumArrays = subArrays('number')(arr);
  const subStrArrays = subArrays('string')(arr);
  if (subNumArrays.length > 0 && subStrArrays.length > 0) {
    return [subNumArrays, subStrArrays];
  } else {
    return [...(subNumArrays.length > 0 ? subNumArrays : subStrArrays)];
  }
};

console.log('in:', [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20]);
console.log('out:', answer([1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20]));
console.log('in:', [1, '2', '3', 2]);
console.log('out:', answer([1, '2', '3', 2]));
console.log('in:', ['1', 2, 4, 591, '392', 391, '2', 5, 10, 2, '1', 1, '1', 20, 20]);
console.log('out:', answer(['1', 2, 4, 591, '392', 391, '2', 5, 10, 2, '1', 1, '1', 20, 20]));
