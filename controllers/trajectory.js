import { getDistance } from './vector';

const trajectory = (points) => {
  return { points, length: getLength(points) };
};

const getLength = (points) => {
  let res = 0;
  points.forEach((point, i) => {
    if (!points[i + 1]) {
      return;
    }
    res += getDistance(point, points[i + 1]);
  });

  return res;
};

export default trajectory;
