import { Express } from 'express';
import { AuthController } from '../../controllers/auth.controller';

enum AuthR {
  SIGNIN = '/v1/signin',
  SIGNUP = '/v1/signup',
}

export default function AuthRoutes(
  app: Express,
  authController: AuthController
) {
  app.post(AuthR.SIGNIN, authController.signIn);
  app.post(AuthR.SIGNUP, authController.signUp);
}
