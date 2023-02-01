import { baseService } from "./baseService";

export class CommentTaskService extends baseService {
  constructor() {
    super();
  }
  insertCommentTask = (commentTask) => {
    return this.post(`Comment/insertComment`, commentTask);
  };

  deleteCommentTask = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };

  updateCommentTask = (updateComment) => {
    return this.put(`Comment/updateComment?id=${updateComment.id}&contentComment=${updateComment.contentComment}`, updateComment)
  }
}

export const commentTaskService = new CommentTaskService();


