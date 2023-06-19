import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

function SongInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const sname = location.pathname.replace("/song/", "");
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getSongInfo() {
      const res = await axios.get(`/api/song/${sname}`);
      console.log(res.data);
      setItems(res.data);
    }
    getSongInfo();
  }, [sname]);

  const handleClickOpen = () => {
    navigate("/");
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 545,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "10vw",
                  }}
                  align="center"
                >
                  자켓
                </TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작곡가</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((song, i) => (
                <TableRow hover role="checkbox" key={i}>
                  <TableCell align="center">
                    <img
                      src={process.env.PUBLIC_URL + `/images/${song.id}.png`}
                      alt="자켓"
                    ></img>
                  </TableCell>
                  <TableCell align="center">{song.sname}</TableCell>
                  <TableCell align="center">{song.composer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">NOV</TableCell>
                <TableCell align="center">ADV</TableCell>
                <TableCell align="center">EXH</TableCell>
                {items.map((song, i) =>
                  song.lvl4 == null ? (
                    <TableCell key={i} align="center" />
                  ) : (
                    <TableCell key={i} align="center">
                      {song.lvl4name}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((song, i) => (
                <TableRow hover role="checkbox" key={i}>
                  <TableCell align="center">{song.lvl1}</TableCell>
                  <TableCell align="center">{song.lvl2}</TableCell>
                  <TableCell align="center">{song.lvl3}</TableCell>
                  {song.lvl4 == null ? (
                    <TableCell align="center" />
                  ) : (
                    <TableCell align="center">{song.lvl4}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        style={{
          position: "relative",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        홈으로 가기
      </Button>
    </>
  );
}

export default SongInfo;
