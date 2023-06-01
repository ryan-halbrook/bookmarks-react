import { useState } from 'react';
import { useEffect } from 'react';

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
      id: 2,
      name: 'Another Example Bookmark',
      link: 'http://example.com',
      description: 'lorem ipsum...',
      topic: {
          id: 0,
          name: 'Another Topic',
      }
  },
];

export default function BookmarkResources({bookmark}) {
   const [resources, setResources] = useState(new Map());
  
    // useEffect(() => {
    //     setResources(
    //         {
    //             'docs':[
    //                 bookmarkData[0],
    //                 bookmarkData[1],
    //             ],
    //             'languages':[
    //                 bookmarkData[1],
    //             ]
    //         }
    //     );
    // }, {});

   return (
        <div className="bookmarkTags">
            <div className="Bookmark-list">
                <ul>{
                    <p>Hello, World!</p>
                    }
                </ul>
            </div>
        </div>
   );
}

