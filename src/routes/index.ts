import { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export default function Routes(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
    res.send('Hello World');
  });
}
