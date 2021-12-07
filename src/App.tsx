import React from 'react';
import Gallery from "./views/Gallery";
import PhotosProvider from "./context/PhotosContext";

function App() {
    return (
        <PhotosProvider>
            <div className="App">
                <Gallery/>
            </div>
        </PhotosProvider>
    );
}

export default App;
