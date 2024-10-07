import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
  {
    // id는 항상 unique하게 자동으로 생성되므로 작성할 필요 없음
    title: {
      type: String,
    },
    img: {
      type: String, // mongoDB는 bulit-in image field가 없음
    },
    description: {
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

const Group = mongoose.model('Group', GroupSchema); // 'Task'는 mongoDB의 collection 이름

export default Group;