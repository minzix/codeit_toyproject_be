import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    // id는 항상 unique하게 자동으로 생성되므로 작성할 필요 없음
    // 닉네임, 제목, 이미지(한 장), 본문, 태그, 장소, 추억의 순간, 추억 공개 여부, 비밀번호
    nickname: {
        type: String,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: Array, // Unsure maybe it shoud be a String
    },
    place: {
        type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    }
  },
  {
    // schema에 대한 옵션은 두번째 파라미터로 전달
    timestamps: true, 
  }
);

const Post = mongoose.model('Post', PostSchema); // 'Post'는 mongoDB의 collection 이름

export default Post;