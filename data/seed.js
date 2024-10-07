import mongoose from 'mongoose';
import { Groupdata, Commentdata, Postdata } from './mock.js';

import Group from '../models/Group.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    // Group
    await Group.deleteMany({});  
    const createdGroups = await Group.insertMany(Groupdata);  

    const updatedPostData = Postdata.map((post, index) => {
      const group = createdGroups[index % createdGroups.length];  
      return { ...post, groupId: group._id };
    });

    // Post
    await Post.deleteMany({});  
    const createdPosts = await Post.insertMany(updatedPostData); 

    const updatedCommentData = Commentdata.map((comment, index) => {
      const post = createdPosts[index % createdPosts.length];  
      return { ...comment, postId: post._id }; 
    });

    // Comment
    await Comment.deleteMany({});
    await Comment.insertMany(updatedCommentData); 

    console.log('Data successfully seeded');

    mongoose.connection.close(); 
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();  
  }
})();
