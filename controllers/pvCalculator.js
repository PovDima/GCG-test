import { getVector, getLength, add, multiple, unitary, subtract, rotateByZ } from './vector';
import getRayTracer from './getRayTracer';

const r0 = 10000;
let objects;
let seaDepth;
let soundSpeed;
let reflections;
let amplitude;
let gasPosition;

const init = (payload) => {
  objects = payload.arrows;
  seaDepth = payload.seaDepth;
  soundSpeed = payload.soundSpeed;
  reflections = payload.reflections;
  amplitude = payload.amplitude;
  gasPosition = getVector(0, 0, payload.gasDepth);
};

const getPV = (currentTime) => {
  let res = {};

  objects.forEach((obj) => {
    // Знаходження всіх променів відбиття в даний час
    const rays = getRayTracer(getPosition(obj, currentTime), gasPosition, seaDepth);
    obj.frequencies.forEach((freq) => {
      rays.forEach((ray) => {
        // Дистанція від променя до вектора
        const r = getDistanceVector(ray);
        const dist = getLength(r);
        // Амплітуда
        const a = dist < Number.EPSILON ? freq.amplitude : freq.amplitude * Math.exp(-amplitude * dist);
        // Довжина хвилі
        const waveLen = soundSpeed * freq.frequency;
        // Вектор хвилі
        const k = getWaveVector(waveLen, r);
        // Зміна фази
        const phaseChange = (2 * Math.PI * dist * freq.frequency) / soundSpeed;
        // Швидкість
        const v = getVelocity(freq.frequency, a, k, r, currentTime, phaseChange);
        // Тиск
        const p = getPressure(freq.frequency, a, k, r, currentTime, phaseChange);
        res.velocity = res.velocity ? add(res.velocity, v) : v;
        res.pressure = res.pressure ? add(res.pressure, p) : p;
      });
    });
  });
  return res;
};

const getPosition = (obj, time) => {
  const beginLoc = getVector(obj.beginLocation.layerX, obj.beginLocation.layerY, obj.beginLocation.depth);
  const targetLoc = getVector(obj.targetLocation.layerX, obj.targetLocation.layerY, obj.targetLocation.depth);

  return add(beginLoc, multiple(multiple(unitary(subtract(targetLoc, beginLoc)), +obj.velocity), +time));
};

const getDistanceVector = (ray) => {
  const n = ray.points.length;
  const dir = unitary(subtract(ray.points[n - 1], ray.points[n - 2]));

  return multiple(dir, ray.length);
};

const getWaveVector = (waveLen, r) => {
  const k = (2 * Math.PI) / waveLen;

  return multiple(unitary(r), k);
};

const getVelocity = (frequency, a, k, r, t, phaseShift) => {
  const w = frequency * 2 * Math.PI;
  const amp = w * a;
  const phi = multiple(k, r) - w * t + phaseShift + Math.PI;

  return getRotatedVectorWithLength(amp, phi, r);
};

const getPressure = (frequency, a, k, r, t, phaseShift) => {
  const w = frequency * 2 * Math.PI;
  const amp = r0 * soundSpeed * soundSpeed * getLength(k) * a;
  const phi = multiple(k, r) - w * t + phaseShift + Math.PI / 2;

  return getRotatedVectorWithLength(amp, phi, r);
};

const getRotatedVectorWithLength = (max, phase, R) => {
  const xy = getVector(R.x, R.y, 0);
  const planeVector = getVector(getLength(xy), R.z, 0);
  const rotPlaneVector = rotateByZ(planeVector, phase);
  const resVector = multiple(unitary(xy), rotPlaneVector.x);
  resVector.z = rotPlaneVector.y;

  return multiple(unitary(resVector), max);
};

export { init, getPV };
