import { subtract, getVector, getLength, add, multiple, unitary } from './vector';
import trajectory from './trajectory';

const gReflections = 6;

const getRayTracer = (objPos, gasPos, seaDepth) => {
  if (!objPos) throw Error('objectPos must be not null');
  if (!gasPos) throw Error('gasPos must be not null');
  const res = [];
  const dirToObj = subtract(objPos, gasPos);
  const dirToObjXY = getVector(dirToObj.x, dirToObj.y);
  const relObj = getVector(getLength(dirToObjXY), objPos.z);
  const relGas = getVector(0, gasPos.z);

  for (let reflections = -gReflections; reflections <= gReflections; reflections++) {
    // Find Relative Points
    const ray = getRelativeRayPoints(seaDepth, relObj, relGas, reflections);
    if (ray == null) continue;

    // Add other
    const toTopRealPoints = [];
    ray.forEach((relPoint) => {
      const objWithoutDepth = add(gasPos, multiple(unitary(dirToObjXY), relPoint.x));
      toTopRealPoints.push(getVector(objWithoutDepth.x, objWithoutDepth.y, relPoint.y));
    });

    const toTopReal = trajectory(toTopRealPoints);

    res.push(toTopReal);
  }

  return res;
};

const getRelativeRayPoints = (bottomDepth, start, end, reflections = 0) => {
  if (!reflections) {
    return [{ ...start }, { ...end }];
  }

  const isRayToTop = reflections < 0;
  reflections = Math.abs(reflections);

  if (
    (Math.abs(start.y) < Number.EPSILON && isRayToTop) ||
    (Math.abs(bottomDepth - start.y) < Number.EPSILON && !isRayToTop) ||
    (Math.abs(end.x - start.x) < Number.EPSILON && !reflections)
  ) {
    return null;
  }

  const res = [{ ...start }];

  let bottomIsCurrentReflector = (reflections % 2 === 1 && !isRayToTop) || (!(reflections % 2 === 1) && isRayToTop);

  const imageTo = { ...end };
  const images = [];
  for (let i = 0; i < reflections; i++) {
    // make reflection
    imageTo.y = bottomIsCurrentReflector ? bottomDepth + bottomDepth - imageTo.y : -imageTo.y;

    images.push({ ...imageTo });
    bottomIsCurrentReflector = !bottomIsCurrentReflector;
  }

  bottomIsCurrentReflector = !bottomIsCurrentReflector;

  let currentFrom = { ...start };

  for (let i = images.length - 1; i >= 0; i--) {
    // Current image
    let currentImageTo = images[i];
    // Find reflection point
    if (bottomIsCurrentReflector) {
      currentImageTo.x =
        currentFrom.x - (currentFrom.x * (bottomDepth - currentFrom.y)) / (currentImageTo.y - currentFrom.y);
      currentImageTo.y = bottomDepth;
    } else {
      currentImageTo.x = currentFrom.x - (currentFrom.x * currentFrom.y) / (currentFrom.y - currentImageTo.y);
      currentImageTo.y = 0;
    }

    currentFrom = currentImageTo;
    bottomIsCurrentReflector = !bottomIsCurrentReflector;

    res.push({ ...currentImageTo });
  }

  res.push({ ...end });

  return res;
};

export default getRayTracer;
