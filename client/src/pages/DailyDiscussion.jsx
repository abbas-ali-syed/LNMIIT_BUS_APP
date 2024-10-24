import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { BASE_URL } from '../config';
const DailyDiscussion = () => {



  const navigate = useNavigate();
    

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      }, [navigate]);
    
    

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
    } else {
      fetchComments();
    }
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}api/users/comments`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      setError(`Error fetching comments: ${err.response ? err.response.data.message : err.message}`);
      setLoading(false);
    }
  };

  const addComment = async (text) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        return;
      }
      const response = await axios.post(`${BASE_URL}api/users/comments`, { text }, { headers: { Authorization: `Bearer ${token}` } });
      const comment = response.data;
      setComments((prevComments) => [...prevComments, comment]);
    } catch (err) {
      console.error(err);
    }
  };
  
  
  
  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-700 '>
    <div className="max-w-7xl rounded-lg mt-25 mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-white mb-6">Daily Discussion</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add a new comment</h3>
            <CommentForm onSubmit={addComment} />
          </div>
        </div>
        <div className="space-y-6">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DailyDiscussion;
