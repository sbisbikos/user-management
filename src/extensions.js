const DeepCopy = (original) => JSON.parse(JSON.stringify(original));
const RemoveValueFromArray = (value, array) => {
  const index = array.indexOf(value);

  if (index > -1) {
    array.splice(index, 1);
  }
};

export default {
  DeepCopy,
  RemoveValueFromArray,
};
