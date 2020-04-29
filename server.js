import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import middlewares from './middlewares';
import analytics from './controllers/analytics';
import { mongoURI } from './config/keys';

const app = express();

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(middlewares);
app.use('/api/analytics', analytics);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
