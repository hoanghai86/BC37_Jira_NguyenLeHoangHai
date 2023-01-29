import { baseService } from "./baseService";

export class CommentTaskService extends baseService {
  constructor() {
    super();
  }
  insertCommentTask = (commentTask) => {
    return this.post(`Comment/insertComment`, commentTask);
  };

}

export const commentTaskService = new CommentTaskService();
