import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

export default [
  bodyParser.json({
    limit: 1024 * 1024,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.send({
          status: 0,
          error: {
            code: 'BROKEN_JSON',
            message: 'Please, verify your json'
          }
        });
        throw new Error('BROKEN_JSON');
      }
    }
  }),
  bodyParser.urlencoded({ extended: true }),
  cors({ origin: '*' })
];
