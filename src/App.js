import './App.css';
import React, {useState} from 'react';

import OpenLayerMap from './components/OpenLayerMap.js';
import TitleUpdate from './components/TitleUpdate.js';

function App() {
  const [fileData, setFileData] = useState();
  const [error, setError] = useState();

  return (
    <div className="App">
      <TitleUpdate />
      <div>
        <OpenLayerMap
          fileData={fileData}
          onSetData={setFileData}
          error={error}
          onSetError={setError}
        />
      </div>
    </div>
  );
}

export default App;
