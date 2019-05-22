import React from 'react';
import './App.css';
import Images from '../src/components/Images';

const App = () => {
  return (
    <div className="App">
      <div className="container ">
        <h1 className="mt-5 text-center text-danger">
          Infinite Scroll Unsplash
        </h1>
        <Images />
      </div>
    </div>
  );
};

export default App;
