import { Express } from 'express';
import { PostController } from '../../controllers/post.controller';

enum FeedR {
  GETFEED = '/v1/feed/get',
  POSTFEED = '/v1/feed/create',
  GETFEEDDETAIL = '/v1/feed/detail/:id',
  UPDATEFEED = '/v1/feed/update/:id',
  DELETEFEED = '/v1/feed/delete/:id',
}

export default function feedRoutes(
  app: Express,
  postController: PostController
) {
  app.get(FeedR.GETFEED, postController.getPost);
  app.get(FeedR.GETFEEDDETAIL, postController.getPostDetail);
  app.post(FeedR.POSTFEED, postController.createPost);
  app.put(FeedR.UPDATEFEED, postController.updatePost);
  app.delete(FeedR.DELETEFEED, postController.deletePost);
}
