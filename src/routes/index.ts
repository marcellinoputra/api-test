import { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AuthController } from '../controllers/auth.controller';
import { PostController } from '../controllers/post.controller';
import AuthRoutes from './auth_routes';
import feedRoutes from './post_routes';

export default function Routes(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  const authController = new AuthController();
  const feedController = new PostController();

  AuthRoutes(app, authController);
  feedRoutes(app, feedController);
}
