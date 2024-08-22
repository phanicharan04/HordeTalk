import './App.css';
import Feed from './components/Feed';
import Header from './components/Header';
import Post from './components/Post';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <div className="app__body">
        <Sidebar></Sidebar>
        <Feed></Feed>
      </div>
      </div>
  );
}

export default App;
