import { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";

import * as React from "react";

import { InsertDialog, DeleteDialog, ModifyDialog } from "./popup";

function SongTable() {
  const [values, setValues] = useState({ song_name: "" });
  const searchBoxHandleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const searchBoxKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  async function search() {
    if (values.song_name === "") {
      refresh();
      return;
    }
    const res = await axios.get(`/api/search?sname=${values.song_name}`);
    setItems(res.data);
  }
  async function refresh() {
    const res = await axios.get("/api/song");
    console.log(res.data);
    setItems(res.data);
  }

  const [items, setItems] = useState([]);
  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => {
            refresh();
          }}
        >
          <RefreshIcon />
        </Fab>
        <Box
          sx={{
            position: "relative",
            float: "right",
            right: (theme) => theme.spacing(1),
          }}
        >
          <TextField
            name="song_name"
            variant="outlined"
            size="small"
            sx={{
              width: 180,
              right: (theme) => theme.spacing(0.5),
            }}
            onChange={searchBoxHandleChange}
            onKeyDown={searchBoxKeyDown}
          />
          {/* SearchBox */}
          <Button
            variant="outlined"
            size="medium"
            sx={{
              width: 80,
              top: (theme) => theme.spacing(0.3),
            }}
            onClick={() => {
              search();
            }}
          >
            Search
          </Button>
          {/* SearchButton */}
        </Box>
        <TableContainer
          sx={{
            maxHeight: 600,
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
                    <a href={`/song/${song.sname}`}>
                      <img
                        src={process.env.PUBLIC_URL + `/images/${song.id}.png`}
                        alt="자켓"
                      ></img>
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    <a href={`/song/${song.sname}`}>{song.sname}</a>
                  </TableCell>
                  <TableCell align="center">{song.composer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <InsertDialog></InsertDialog>
      <ModifyDialog></ModifyDialog>
      <DeleteDialog></DeleteDialog>
      <Link to="/score">
        <Button
          variant="outlined"
          size="medium"
          style={{
            position: "relative",
            left: 201,
            bottom: 108,
          }}
        >
          유저 스코어 보기
        </Button>
      </Link>
    </>
  );
}

export default SongTable;
