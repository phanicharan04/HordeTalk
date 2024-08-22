import React from 'react';
import '../styles/Feed.css';
import Post from './Post';
import Posts from './Posts';

function Feed() {
  return (
    <div className="feed">
      <Post></Post>
      <div className="feed__posts">
        
        <Posts
          name="John Doe"
          description="Software Engineer at Tech Corp"
          message="Check out this cool image!"
          photoUrl="https://via.placeholder.com/150"
        />
        <Posts
          name="Jane Smith"
          description="Product Manager at Innovations Inc."
          message="Watch this amazing video!"
          videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        <Posts
          name="Alice Johnson"
          description="Freelance Designer"
          message="Here's a file you might find useful."
          fileUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        />
        <Posts 
          name="Bob Brown"
          description="Data Scientist at DataWorks"
          message="I just completed a new project!"
        />
      </div>
    </div>
  );
}

export default Feed;
