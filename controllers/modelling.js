import saveModule from './saveModule';
import { init, getPV } from './pvCalculator';

const runModelling = (payload) => {
  // Трансформація направлень в необхідний формат
  payload.arrows = transformObjects(payload.arrows);
  // Визначення кроку
  const timeStep = 1 / payload.frequency;

  // Ініціалізація модулю PVCalculator початковими даними
  init({ ...payload, reflections: 6 });

  const list = [];
  for (let currentTime = payload.timeStart; currentTime < payload.timeEnd; currentTime += timeStep) {
    // Отримання даних про швидкість та тиск в кожен момент часу
    const pv = getPV(currentTime);
    // Додавання їх у фінальний список в необхідному форматі
    list.push(getTimeSeriesGeneratorElement(currentTime, pv.pressure, pv.velocity));
  }
  // Збереження списку
  return save(list);
};

const save = (list) => {
  const MAX_VAL = 16000;
  const MIN_VAL = -16000;
  let minV = Number.MAX_VALUE;
  let maxV = -Number.MAX_VALUE;
  let minP = Number.MAX_VALUE;
  let maxP = -Number.MAX_VALUE;
  // Scale
  list.forEach((el) => {
    if (el.pressure > maxP) maxP = el.pressure;
    if (el.pressure < minP) minP = el.pressure;
    maxV = el.vx > maxV ? el.vx : maxV;
    maxV = el.vy > maxV ? el.vy : maxV;
    maxV = el.vz > maxV ? el.vz : maxV;
    minV = el.vx < minV ? el.vx : minV;
    minV = el.vy < minV ? el.vy : minV;
    minV = el.vz < minV ? el.vz : minV;
  });
  const res = [];

  list.forEach((el) => {
    // Отримуємо тиск
    const p = Math.round(((el.pressure - minP) / (maxP - minP)) * (MAX_VAL - MIN_VAL) + MIN_VAL);
    // Отримуємо векторну швидкість по осі X
    const vx = Math.round(((el.vx - minV) / (maxV - minV)) * (MAX_VAL - MIN_VAL) + MIN_VAL);
    // Отримуємо векторну швидкість по осі Y
    const vy = Math.round(((el.vy - minV) / (maxV - minV)) * (MAX_VAL - MIN_VAL) + MIN_VAL);
    // Отримуємо векторну швидкість по осі Z
    const vz = Math.round(((el.vz - minV) / (maxV - minV)) * (MAX_VAL - MIN_VAL) + MIN_VAL);
    res.push({ p, vx, vy, vz, time: el.currentTime });
  });
  // Зберігаємо у файл через модуль файлової системи
  return saveModule(res);
};

const getTimeSeriesGeneratorElement = (currentTime, pressure, velocity) => {
  return {
    currentTime,
    pressure: pressure.z,
    vx: velocity.x,
    vy: velocity.y,
    vz: velocity.z
  };
};

const transformObjects = (arrows) => {
  const frequencies = [{ frequency: 40, amplitude: 1e-5 }];
  return arrows.map((arrow) => ({ ...arrow, frequencies }));
};

export default runModelling;
