import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    // id는 항상 unique하게 자동으로 생성되므로 작성할 필요 없음
    nickname: {
        type: String,
    },
    commentcontent: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    // schema에 대한 옵션은 두번째 파라미터로 전달
    timestamps: true, 
  }
);

const Comment = mongoose.model('Comment', CommentSchema); // 'Task'는 mongoDB의 collection 이름

export default Comment;