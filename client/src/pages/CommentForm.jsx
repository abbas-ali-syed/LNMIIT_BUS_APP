import React, { useState } from 'react';

const CommentForm = ({ onSubmit, isReply = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          {isReply ? 'Your reply' : 'Your comment'}
        </label>
        <div className="mt-1 rounded-lg">
          <textarea
            id="comment"
            name="comment"
            rows="3"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder=" Share your query here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isReply ? 'Post Reply' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
