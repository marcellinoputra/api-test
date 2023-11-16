import { Request, Response } from 'express';
import { AuthServiceImpl } from '../services/auth.service';
import { SignInForm, SignUpForm } from '../dto/auth';
import bcrypt from 'bcrypt';

export class AuthController {
  public async signUp(req: Request, res: Response) {
    const signUpData: SignUpForm = {
      username: req.body.username,
      hashPassword: req.body.password,
    };

    const authService = new AuthServiceImpl();
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(signUpData.hashPassword, salt);
    const [responseModelOnlyMessage, responseWhenError] =
      await authService.signUp(signUpData, hash);

    if (responseWhenError.error) {
      return res.status(responseWhenError.status).json({
        status: responseWhenError.status,
        message: responseWhenError.message,
      });
    } else {
      return res.status(responseModelOnlyMessage.status).json({
        status: responseModelOnlyMessage.status,
        message: responseModelOnlyMessage.message,
      });
    }
  }

  public async signIn(req: Request, res: Response) {
    const reqForm: SignInForm = {
      username: req.body.username,
      password: req.body.password,
    };

    const authService = new AuthServiceImpl();

    const [responseModelOnlyMessage, responseModelOnlyMessageError] =
      await authService.signIn(reqForm);

    if (responseModelOnlyMessageError.error) {
      return res.status(responseModelOnlyMessageError.status).json({
        status: responseModelOnlyMessageError.status,
        message: responseModelOnlyMessageError.message,
      });
    } else {
      return res.status(responseModelOnlyMessage.status).json({
        status: responseModelOnlyMessage.status,
        message: responseModelOnlyMessage.message,
      });
    }
  }
}
