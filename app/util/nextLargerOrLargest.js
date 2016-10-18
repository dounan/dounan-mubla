
/**
 * Returns the object where obj[key] has the smallest value that is greater
 * than or equal to the targetValue, or null if no such obj exists.
 */
export default function(objs, key, targetValue) {
  let bestObj = null;
  let bestVal = Infinity;
  let largestObj = null;
  let largestVal = -Infinity;
  for (let o of objs) {
    const val = o[key];
    if (val >= targetValue && val < bestVal) {
      bestObj = o;
      bestVal = val;
    }
    if (val > largestVal) {
      largestObj = o;
      largestVal = val;
    }
  }
  return bestObj || largestObj;
}

