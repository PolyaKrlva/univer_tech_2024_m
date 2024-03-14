import logo from './logo.svg';
import './App.css';
import { PageLayout } from './components/layout/layout';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

function App() {
  const [ data, setData ] = useState([]);
  const [ comments, setComments ] = useState([])
  const getData = type => fetch(`https://jsonplaceholder.typicode.com/${type}`).then(result => result.json());
  
  useEffect(() => {
    Promise
      .all([ 'posts', 'users' ].map(getData))
      .then(([ posts, users ]) => {
        const Ousers = Object.fromEntries(users.map(num => [ num.id, num ]));
        setData(posts.map(num => ({
          post: num,
          user: Ousers[num.userId],
        })));
      });
    fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then(result => result.json())
    .then(comment => setComments(comment))
}, []);
  
  return (
   <Routes>
    <Route path='/*' element={<PageLayout/>}>
      <Route index element={<HomeComponent data={data}/>} />
      <Route path='post/:postId' element={<LinkPost comments={comments}/>}/>
    </Route>
   </Routes>
  );
}

export default App;

const HomeComponent = ({data}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '60em', margin: '0 auto', marginTop: '20px'}}>
      {data.map(({ post, user }) => (
        <div style = {{border: '2px solid #f9f', padding: '12px', borderRadius: '15px'}}>
            <Link to={`/post/${post.id}`}
              state={{ id: post.id, name: user.name, text: post.body, title: post.title }}>
            <h2>{post.title}</h2>
            <h3>{user.name}</h3>
            <p>{post.body}</p>
          </Link>
        </div>
      ))}
    </div> 
  )
}

const LinkPost = ({comments}) => {
  const location = useLocation()
  const postId = location.state.id
  return (
    <div>
      <div style = {{border: '1px solid #f9f', padding: '12px', borderRadius: '8px', marginBottom: '20px', marginTop: '20px'}}>
        <>Информация о посте</>
        <h2>{location.state.name}</h2>
        <h4>{location.state.title}</h4>
        <p>{location.state.text}</p>
      </div>
      <div style = {{padding: '12px'}}>
        <hr/>
        <h2>Комментарии: </h2>
      </div>
      
      {comments.map(comment => {
        if (comment.postId === postId) {
          return (
            <div style = {{border: '1px solid #f9f', padding: '8px', borderRadius: '8px', marginTop: '8px'}} key ={comment.id}>
              <b>{comment.name}</b>
              <hr/>
              <p><br/>{comment.body}</p>
            </div>
          )
        }
      })}
    </div>
  )
}
