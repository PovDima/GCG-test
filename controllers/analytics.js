import express from 'express';
import Analytic from '../models/Analytic';

const router = express.Router();

// @route  GET api/analytics
// @desc   GET All Analytics
// @access Public
router.get('/', async (req, res) => {
  const limit = 20;
  const page = +req.query.page || 0;
  const sort_field = req.query.sort_field;
  const sort_direction = req.query.sort_direction;
  const sortQuery = {};
  sortQuery[`${sort_field}`] = sort_direction === 'asc' ? 1 : -1;
  const [analytics, totalCount] = await Promise.all([
    Analytic.find()
      .sort(sortQuery)
      .limit(limit)
      .skip(page * limit),
    Analytic.count()
  ]);

  res.json({ analytics, totalCount })
})

// @route  POST api/analytics
// @desc   Create a Analytic
// @access Public
router.post('/', (req, res) => {
  const newAnalytic = new Analytic({
    userId: req.body.userId,
    area: req.body.area
  });
  newAnalytic.save().then(analytic => res.json(analytic));
})

export default router;
