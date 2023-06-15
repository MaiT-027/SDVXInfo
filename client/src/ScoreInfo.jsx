import axios from 'axios'
import {useEffect, useState} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {AddUserDialog, AddScoreDialog} from './popup'

const EXPRESS_URL = 'http://175.120.221.48:3010'

function ScoreInfo() {
    const [items, setItems] = useState([])
    useEffect(() => {
        async function getScoreInfo() {
            const res = await axios.get(EXPRESS_URL + `/getscore`)
            console.log(res.data)
            setItems(res.data)
        }
        getScoreInfo()
    }, [])
    return (
        <> < AddUserDialog > </AddUserDialog> < AddScoreDialog > </AddScoreDialog> < Paper sx = {{
            width: '100%',
            overflow: 'hidden'
        }} > <TableContainer sx={{
                maxHeight: 545
            }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">유저 점수</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Table>
                <TableHead>
                    <TableCell align="center">곡 이름</TableCell>
                    <TableCell align="center">작곡가</TableCell>
                    <TableCell align="center">NOV</TableCell>
                    <TableCell align="center">ADV</TableCell>
                    <TableCell align="center">EXH</TableCell>
                    <TableCell align="center">4번째 난이도</TableCell>
                    <TableCell align="center">4번째 난이도 이름</TableCell>
                </TableHead>
                <TableBody>
                    {
                        items.map(
                            (song, i) => <TableRow role="checkbox" key={i}>
                                <TableCell align="center">{song.sname}</TableCell>
                                <TableCell align="center">{song.composer}</TableCell>
                                <TableCell align="center">{song.lvl1_score}</TableCell>
                                <TableCell align="center">{song.lvl2_score}</TableCell>
                                <TableCell align="center">{song.lvl3_score}</TableCell>
                                {
                                    song.lvl4_score == null
                                    ? <TableCell align="center"/>
                                    : <TableCell align="center">{song.lvl4_score}</TableCell >
                                }
                                {
                                    song.lvl4_score == null
                                    ? <TableCell align="center"/>
                                    : <TableCell align="center">{song.lvl4name}</TableCell >
                                }
                            </TableRow>
                        )
                    }
                    </TableBody>
            </Table>
        </TableContainer> 
        </Paper> </>
    )
}

export default ScoreInfo;