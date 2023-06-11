import './App.css';
import SongTable from './SongTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SongInfo from './SongInfo';


const App = () => {
  return (
    <>
      <h1>
         SDVXInfo
      </h1>
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<SongTable />}></Route>
            <Route path={'/song/*'} element={<SongInfo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;