import express from 'express';
const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());


app.use(express.json());

import mongoose from 'mongoose';
import Group from './models/Group.js';
import Comment from './models/Comment.js';
import Post from './models/Post.js';
import * as dotenv from 'dotenv';
dotenv.config();

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in environment variables');
  process.exit(1);  // Exit the process if critical variable is missing
}

// GROUPS
// 1. 그룹 등록
app.post('/api/groups', async (req, res) => {
  try {
    const newGroup = await Group.create(req.body);
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: 'Error creating group', error });
  }
});

// 2. 그룹 수정
app.put('/api/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (group.password === password) {
      const updatedGroup = await Group.findByIdAndUpdate(groupId, req.body, { new: true });
      res.json(updatedGroup);  // Return updated group
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating group', error });
  }
});

// 3. 그룹 삭제
app.delete('/api/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (group.password === password) {
      const deletedGroup = await Group.findByIdAndDelete(groupId);
      res.json({ message: 'Group deleted successfully', deletedGroup });
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting group', error });
  }
});

// 4. 그룹 목록 조회
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching groups', error });
  }
});

// 5-1. 그룹 공개 여부 조회
app.get('/api/groups/:groupId/is-public', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).select('-password');
    res.json({ isPublic: group.isPublic });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching group', error });
  }
});

// 5-2-1. 공개 그룹 상세 조회
app.get('/api/groups/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).select('-password');
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching group', error });
  }
});

// 5-2-2. 비공개 그룹 비밀번호 확인 후 조회
app.post('/api/groups/:groupId/verify-password', async (req, res) => {
  const { password } = req.body;
  try {
    const group = await Group.findById(req.params.groupId);
    if (group.password === password) {
      const groupWithoutPassword = group.toObject();
      delete groupWithoutPassword.password;  // Exclude password field from response
      res.json(groupWithoutPassword);
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error verifying group', error });
  }
});

// 5-3. 그룹 공감 보내기
app.post('/api/groups/:groupId/like', async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      { $inc: { likes: 1 } },
      { new: true }
    ).select('-password');
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: 'Error liking group', error });
  }
});

// POSTS
// 1. 게시글 등록
app.post('/api/groups/:groupId/posts', async (req, res) => {
  try {
    const post = new Post({ ...req.body, groupId: req.params.groupId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
});

// 2. 게시글 수정
app.put('/api/posts/:postId', async (req, res) => {
  const { password } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (post.password === password) {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      res.json(updatedPost);
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error });
  }
});

// 3. 게시글 삭제
app.delete('/api/posts/:postId', async (req, res) => {
  const { password } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (post.password === password) {
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
      res.json({ message: 'Post deleted successfully', deletedPost });
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting post', error });
  }
});

// 4. 게시글 하나 조회
app.get('/api/groups/:groupId/posts', async (req, res) => {
  try {
    const posts = await Post.find({ groupId: req.params.groupId }).select('-password');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching posts', error });
  }
});

// 전체 게시글 목록 조회
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().select('-password');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching posts', error });
  }
});

// 5-1. 게시글 공감 보내기
app.post('/api/posts/:postId/like', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $inc: { likes: 1 } },
      { new: true }
    ).select('-password');
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error liking post', error });
  }
});

// COMMENTS
// 1. 댓글 등록
app.post('/api/posts/:postId/comments', async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, postId: req.params.postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error });
  }
});

// 2. 댓글 수정
app.put('/api/comments/:commentId', async (req, res) => {
  const { password } = req.body;
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.password === password) {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
      res.json(updatedComment);
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating comment', error });
  }
});

// 3. 댓글 삭제
app.delete('/api/comments/:commentId', async (req, res) => {
  const { password } = req.body;
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.password === password) {
      const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
      res.json({ message: 'Comment deleted successfully', deletedComment });
    } else {
      res.status(403).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting comment', error });
  }
});

// 4. 댓글 목록 조회
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).select('-password');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching comments', error });
  }
});

// 전체 댓글 목록 조회
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().select('-password');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching comments', error });
  }
});

// MongoDB 연결
mongoose.connect(process.env.DATABASE_URL, {
})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log('MongoDB connection error:', error));

// Express 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
