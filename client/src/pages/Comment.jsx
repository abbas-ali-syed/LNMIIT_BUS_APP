import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import userimg from '../assets/user-circle.svg'; 

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplyForms, setShowReplyForms] = useState({}); // To manage visibility of reply forms for each reply

  useEffect(() => {
    fetchReplies();
  }, [comment._id]);

  const fetchReplies = async () => {
    try {
      const response = await axios.get(`http://localhost:8804/api/users/comments/${comment._id}/replies`);
      setReplies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (text, parentCommentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8804/api/users/comments/${parentCommentId}/replies`, 
        { text },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setReplies([...replies, response.data]);
      setShowReplyForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplyForm = (replyId) => {
    setShowReplyForms((prev) => ({ ...prev, [replyId]: !prev[replyId] }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-1 p-4 ml-5 mr-18">
      {/* Root comment */}
      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-1 flex items-center">
          <img src={userimg} alt="User Icon" className="h-4 w-4 mr-2" />
          <span className="font-semibold mr-1">{comment.username}</span> on {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p className="text-base text-gray-700 break-words overflow-hidden">{comment.text}</p>
      </div>

      {/* Reply button for the root comment */}
      <div className="text-right">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          {showReplyForm ? 'Cancel Reply' : 'Reply'}
        </button>
      </div>

      {/* Reply form for the root comment */}
      {showReplyForm && (
        <div className="mt-4">
          <CommentForm onSubmit={(text) => handleReplySubmit(text, comment._id)} isReply={true} />
        </div>
      )}

      {/* Replies section */}
      {replies.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Replies</h3>
          <div className="space-y-3">
            {replies.map((reply) => (
              <div key={reply._id} className="bg-gray-50 p-3 rounded-md shadow-sm border-l-4 border-indigo-200">
                <p className="text-sm text-gray-700">{reply.text}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <img src={userimg} alt="User Icon" className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-1">{reply.username}</span> on {new Date(reply.createdAt).toLocaleString()}
                </p>
                
                {/* Reply button for each reply */}
                <div className="text-right mt-2">
                  <button
                    onClick={() => toggleReplyForm(reply._id)}
                    className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                  >
                    {showReplyForms[reply._id] ? 'Cancel Reply' : 'Reply'}
                  </button>
                </div>

                {/* Reply form for each reply */}
                {showReplyForms[reply._id] && (
                  <div className="mt-2">
                    <CommentForm onSubmit={(text) => handleReplySubmit(text, reply._id)} isReply={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
