import { error } from 'console';
import {
  ResponseModelOnlyMessage,
  ResponseWhenError,
} from '../constant/response_model';
import { prisma } from '../database/database';
import { SignInForm, SignUpForm } from '../dto/auth';
import bcrypt from 'bcrypt';

export class AuthServiceImpl {
  public async signUp(
    signUpForm: SignUpForm,
    hash: string
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseWhenError = {} as ResponseWhenError;

    try {
      await prisma.users
        .create({
          data: {
            username: signUpForm.username,
            password: hash,
          },
        })
        .then(() => {
          responseModelOnlyMessage = {
            status: 201,
            message: 'Success Create Account',
            error: false,
          };
        });
    } catch (error) {
      responseWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelOnlyMessage, responseWhenError];
  }

  public async signIn(
    signInForm: SignInForm
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseModelWhenError = {} as ResponseWhenError;

    const checkExistingUser = await prisma.users.findFirst({
      where: {
        username: signInForm.username,
      },
    });

    if (checkExistingUser) {
      const checkPassword = bcrypt.compareSync(
        signInForm.password,
        checkExistingUser.password
      );
      if (checkPassword) {
        responseModelOnlyMessage = {
          status: 200,
          message: 'Successfully Login',
          error: false,
        };
      } else {
        responseModelWhenError = {
          status: 400,
          error: true,
          message: 'Password Salah',
        };
      }
    } else {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: 'Email Tidak Terdaftar',
      };
    }

    return [responseModelOnlyMessage, responseModelWhenError];
  }
}
