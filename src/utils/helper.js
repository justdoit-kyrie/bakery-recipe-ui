export const getFullYear = (min, max) => {
  const result = [];
  for (let index = min; index <= max; index++) {
    result.push(index);
  }
  return result;
};
