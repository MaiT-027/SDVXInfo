import { useState, useEffect } from 'react'
import axios from 'axios'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//const EXPRESS_URL = 'http://localhost:3010'
const EXPRESS_URL = 'http://175.120.221.48:3010'

function SongTable() {
  const [level, setLevel] = React.useState("");

  const handleChange = (event) => {
   setLevel(event.target.value);
  };

  const [items, setItems] = useState([])
  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    const res = await axios.get(EXPRESS_URL + '/song')
    console.log(res.data)
    setItems(res.data)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Fab color="primary"
          sx={{
            position: "absolute",
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          onClick={() => { refresh() }}>
          <RefreshIcon />
        </Fab>
      <Box sx={{position: "relative", float: "right", right: (theme) => theme.spacing(1)}}>
        <FormControl sx={{ width: 80, right: (theme) => theme.spacing(4)}} size="small">
          <InputLabel id="level-select-label" sx={{fontSize: "0.8vw"}}>레벨</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={level}
            label="level"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <TextField id="song-name" variant="outlined" size='small' sx={{width: 180, right: (theme) => theme.spacing(2)}}/>
        <Button variant="outlined" size="medium" sx={{width: 80, top: (theme) => theme.spacing(0.3)}}>Search</Button>
      </Box>
        <TableContainer sx={{ maxHeight: 600}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{width: "10vw"}} align="center">자켓</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작곡가</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.map( (song, i) => <TableRow hover role="checkbox" key={i}>
                  <TableCell align="center"><a href={`/song/${song.sname}`}><img src={process.env.PUBLIC_URL + `/images/${song.id}.png`} alt='자켓'></img></a></TableCell>
                  <TableCell align="center"><a href={`/song/${song.sname}`}>{song.sname}</a></TableCell>
                  <TableCell align="center">{song.composer}</TableCell>
                  </TableRow>) }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default SongTable