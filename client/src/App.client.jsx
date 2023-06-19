import "./App.client.css";
import SongTable from "./SongTable.server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongInfo from "./SongInfo.server";
import ScoreInfo from "./ScoreInfo.server";

const App = () => {
  return (
    <>
      <h1>SDVXInfo</h1>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<SongTable />}></Route>
          <Route path={"/song/*"} element={<SongInfo />}></Route>
          <Route path={"/score"} element={<ScoreInfo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
