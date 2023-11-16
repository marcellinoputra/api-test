import { Request, Response } from 'express';
import { PostServiceImpl } from '../services/post.service';
import { Post } from '../dto/post';

export class PostController {
  public async getPost(req: Request, res: Response) {
    const postService = new PostServiceImpl();
    const [responseModelWithData, responseModelWhenError] =
      await postService.getPost();

    if (responseModelWhenError.error) {
      return res.status(responseModelWhenError.status).json({
        status: responseModelWhenError.status,
        error: responseModelWhenError.error,
      });
    } else {
      return res
        .status(responseModelWithData.status)
        .json(responseModelWithData);
    }
  }

  public async getPostDetail(req: Request, res: Response) {
    const postService = new PostServiceImpl();

    const [responseModelWithData, responseModelWhenError] =
      await postService.getPostDetail(Number(req.params.id));

    if (responseModelWhenError.error) {
      return res
        .status(responseModelWhenError.status)
        .json(responseModelWhenError);
    } else {
      return res
        .status(responseModelWithData.status)
        .json(responseModelWithData);
    }
  }

  public async createPost(req: Request, res: Response) {
    const postService = new PostServiceImpl();

    const postData: Post = {
      title: req.body.title,
      description: req.body.description,
      is_checked: req.body.is_checked === 1 ? true : false,
    };

    const [responseModelWithData, responseModelWhenError] =
      await postService.createPost(postData);

    if (responseModelWhenError.error) {
      return res
        .status(responseModelWhenError.status)
        .json(responseModelWhenError);
    } else {
      return res
        .status(responseModelWithData.status)
        .json(responseModelWithData);
    }
  }

  public async updatePost(req: Request, res: Response) {
    const postService = new PostServiceImpl();

    const postData: Post = {
      title: req.body.title,
      description: req.body.description,
      is_checked: req.body.is_checked === 1 ? true : false,
    };

    const [responseModelWithData, responseModelWhenError] =
      await postService.updatePost(postData, Number(req.params.id));

    if (responseModelWhenError.error) {
      return res
        .status(responseModelWhenError.status)
        .json(responseModelWhenError);
    } else {
      return res
        .status(responseModelWithData.status)
        .json(responseModelWithData);
    }
  }

  public async deletePost(req: Request, res: Response) {
    const postService = new PostServiceImpl();

    const [responseModelWithData, responseModelWhenError] =
      await postService.deletePost(Number(req.params.id));

    if (responseModelWhenError.error) {
      return res
        .status(responseModelWhenError.status)
        .json(responseModelWhenError);
    } else {
      return res
        .status(responseModelWithData.status)
        .json(responseModelWithData);
    }
  }
}
