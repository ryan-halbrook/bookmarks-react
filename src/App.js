import './App.css';

import { useState } from 'react';
import { useEffect } from 'react';


function Bookmark({bookmark}) {
    return (
        <div className="Bookmark">
            <h2 className="Bookmark-name">{bookmark.name}</h2>
            <p className="Bookmark-topic">{bookmark.topic.name}</p>
            <p className="Bookmark-description">{bookmark.description}</p>
            <a className="Bookmark-link" href={bookmark.link} target="_blank">{bookmark.link}</a>
        </div>
    );
}

const bookmarkData = [{
      id: 0,
      name: 'Example Bookmark',
      link: 'http://example.com',
      description: 'lorem ipsum...',
      topic: {
          id: 0,
          name: 'Example Topic',
      }
  },
  {
      id: 1,
      name: 'Another Example Bookmark',
      link: 'http://example.com',
      description: 'lorem ipsum...',
      topic: {
          id: 0,
          name: 'Another Topic',
      }
  },
];

function Header() {
    return (
       <div className="Header">
           <h1 className="Header-title">Bookmarks</h1>
       </div>
    );
}

function AddBookmarkForm() {
    return (
        <form>
            <div className="TextField">
                <label for="name">Name: </label>
                <input type="text" name="name" required/>
            </div>
            <div className="TextField">
                <label for="link">Link: </label>
                <input type="text" name="link" required/>
            </div>
            <div className="TextField">
                <label for="topic">Topic: </label>
                <input type="text" name="topic" required/>
            </div>
            <div className="TextField">
                <label for="description">Description: </label>
                <input type="text" name="description"/>
            </div>
            <input type="submit"/>
        </form>
    );
}

function App() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function fetchBookmarks() {
            console.log("Fetching Data")
            const response = await fetch('http://127.0.0.1:5000/bookmarks');
            const data = await response.json();
            setBookmarks(data);
        }

        fetchBookmarks()
    }, []);

    return (
        <div>
            <Header/>
            <AddBookmarkForm/>
            <div className="Content">
                <div className="Bookmark-list">
                    <ul>{
                        bookmarks.map((bookmark) => {
                            return <Bookmark bookmark={bookmark}/>
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
