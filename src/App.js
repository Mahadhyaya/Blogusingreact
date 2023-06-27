import './App.css';
import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, BrowserRouter as Router, useNavigate, Routes } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { format } from 'date-fns';
import api from './api/posts'
import EditPost from './EditPost';

function App() {
  const[search, setSearch] = useState('');
  const [posts, setPosts] = useState([])
  const history = useNavigate();
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('');
  let bools = false;

  useEffect(() => {
    function start() {
    const storedPosts = JSON.parse(localStorage.getItem('key'));
    console.log(storedPosts);
    if (storedPosts.length != 0) {
      console.log('come')
      setPosts(storedPosts);
    } else {
      localStorage.setItem('key', JSON.stringify([{"id": 1,
      "title": "Welcome To Default Post",
      "dateTime": format(new Date(), 'MMMM dd, yyyy pp'),
      "body": "This is the default welcome post by Soorya"}]))
    }
    }
    setTimeout(() => {start()}, 2000);
  }, []);

// For Searching
  useEffect(() => {
    const fitleredResults = posts.filter((post) => ((post.body).toLowerCase().includes(search.toLowerCase()))
    || ((post.title).toLowerCase().includes(search.toLowerCase()))
    )
    setSearchResults(fitleredResults.reverse())
  }, [posts, search])

  // To Handle Submitted Data
  const handleSubmit =  (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title:postTitle, dateTime:datetime,body:postBody }
    setPosts([...posts,newPost])
    localStorage.setItem('key', JSON.stringify([...posts, newPost]))
    history('/')
  }

  // To Edit Blogs
  const handleEdit =  (id) => {
    console.log('coming');
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = {id, title:editTitle, dateTime:datetime,body:editBody }
    const values = posts.map((post) => post.id === id ? updatePost: post)
    localStorage.setItem('key', JSON.stringify(values))
    setPosts(posts.map((post) => post.id === id ? updatePost: post))
    setEditTitle('')
    setEditBody('')
    history('/');
  }

  // To HandleDelete
  const handleDelete = async (id) => {
    const postList = posts.filter((post) => post.id !== id)
    setPosts(postList)
    localStorage.setItem('key', JSON.stringify(postList))
    
  }
  
  return (
    <div className="App">
      <Header title='My New Blogs' />
      <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<Home posts={searchResults} bools={bools}/>} />
          <Route path="/post" element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} 
          setPostTitle={setPostTitle} postBody={postBody}
          setPostBody={setPostBody}/>} />
          <Route path="/edit/:id" element={<EditPost 
          posts={posts}handleEdit={handleEdit} editTitle={editTitle} 
          setEditTitle={setEditTitle}editBody={editBody}
          setEditBody={setEditBody}/>} />
          <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
          <Route path="/about" element={<About names={'Soorya'}/>} />
          <Route path="*" element={<Missing />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
