import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <>
     <Link to="/userspage">Go to User Page</Link>
     <br></br>
     <br></br>
     <br></br>
     <Link to="/postspage">Go to Posts Page</Link>
    </>
  );
};

export default Homepage;