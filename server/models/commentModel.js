import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
  });
  
  const Comment = mongoose.model("Comment", commentSchema);
  
  export default Comment;
