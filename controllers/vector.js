const getVector = (x = 0, y = 0, z = 0) => {
  return { x, y, z };
};

const add = (a, b) => {
  return getVector(a.x + b.x, a.y + b.y, a.z + b.z);
};

const subtract = (a, b) => {
  return getVector(a.x - b.x, a.y - b.y, a.z - b.z);
};

const multiple = (a, k) => {
  return typeof k === 'object' ? a.x * k.x + a.y * k.y + a.z * k.z : getVector(a.x * k, a.y * k, a.z * k);
};

const unitary = (a) => {
  const length = getLength(a);
  return Math.abs(length < Number.EPSILON) ? a : getVector(a.x / length, a.y / length, a.z / length);
};

const getLength = (a) => {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
};

const getDistance = (a, b) => {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
};

const rotateByZ = (a, alpha) => {
  return getVector(a.x * Math.cos(alpha) - a.y * Math.sin(alpha), a.x * Math.sin(alpha) + a.y * Math.cos(alpha), a.z);
};

export { getVector, add, subtract, multiple, unitary, getLength, getDistance, rotateByZ };
