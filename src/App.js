// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
// import 'dotenv/config';

const App = () =>  {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);

  return(
    <>
      <BrowserRouter >
        <Navbar />  
        <LoadingBar
        height={3}
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} country='us' setProgress={setProgress} key="general" pageSize={10} category="general"/>}></Route>
          <Route exact path="/business" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="business" pageSize={10} category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="entertainment" pageSize={10} category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="general" pageSize={10} category="general"/>}></Route>
          <Route exact path="/health" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="health" pageSize={10} category="health"/>}></Route>
          <Route exact path="/science" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="science" pageSize={10} category="science"/>}></Route>
          <Route exact path="/sports" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="sports" pageSize={10} category="sports"/>}></Route>
          <Route exact path="/technology" element={<News apiKey={apiKey} country='us' setProgress={setProgress}  key="technology" pageSize={10} category="technology"/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
