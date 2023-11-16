import {
  ResponseModelOnlyMessage,
  ResponseModelWithData,
  ResponseWhenError,
} from '../constant/response_model';
import { prisma } from '../database/database';
import { Post } from '../dto/post';

export class PostServiceImpl {
  public async getPost(): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseModelWhenError = {} as ResponseWhenError;

    try {
      const dataPost = await prisma.post.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });

      responseModelWithData = {
        status: 200,
        data: dataPost,
        message: 'Success Get Post',
        error: false,
      };
    } catch (error) {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelWithData, responseModelWhenError];
  }

  public async getPostDetail(
    id: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let responseModelWithData = {} as ResponseModelWithData;
    let responseModelWhenError = {} as ResponseWhenError;

    try {
      await prisma.post
        .findFirst({
          where: {
            id: id,
          },
        })
        .then((data) => {
          responseModelWithData = {
            status: 200,
            data: data,
            message: 'Success Get Post Detail',
            error: false,
          };
        });
    } catch (error) {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelWithData, responseModelWhenError];
  }

  public async createPost(
    postForm: Post
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseModelWhenError = {} as ResponseWhenError;

    try {
      await prisma.post
        .create({
          data: {
            title: postForm.title,
            description: postForm.description,
            is_checked: postForm.is_checked,
          },
        })
        .then(() => {
          responseModelOnlyMessage = {
            status: 200,
            message: 'Success Create Post',
            error: false,
          };
        });
    } catch (error) {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelOnlyMessage, responseModelWhenError];
  }

  public async updatePost(
    postForm: Post,
    id: number
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseModelWhenError = {} as ResponseWhenError;

    try {
      await prisma.post
        .update({
          where: {
            id: id,
          },
          data: {
            title: postForm.title,
            description: postForm.description,
            is_checked: postForm.is_checked,
          },
        })
        .then(() => {
          responseModelOnlyMessage = {
            status: 200,
            message: 'Success Update Post',
            error: false,
          };
        });
    } catch (error) {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelOnlyMessage, responseModelWhenError];
  }

  public async deletePost(
    id: number
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let responseModelOnlyMessage = {} as ResponseModelOnlyMessage;
    let responseModelWhenError = {} as ResponseWhenError;

    try {
      await prisma.post
        .delete({
          where: {
            id: id,
          },
        })
        .then(() => {
          responseModelOnlyMessage = {
            status: 200,
            message: 'Success Delete Post',
            error: false,
          };
        });
    } catch (error) {
      responseModelWhenError = {
        status: 400,
        error: true,
        message: `${error}`,
      };
    }

    return [responseModelOnlyMessage, responseModelWhenError];
  }
}
