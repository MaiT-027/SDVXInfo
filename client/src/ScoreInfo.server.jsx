import axios from 'axios'
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {AddUserDialog, AddScoreDialog} from './popup'
import { Button } from '@mui/material';

function ScoreInfo() {
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function getScoreInfo() {
            const res = await axios.get(`/api/getscore`)
            console.log(res.data)
            setItems(res.data)
        }
        getScoreInfo()
    }, [])

    const handleClickOpen = () => {
        navigate("/")
    }

    return (
        <>< Paper sx = {{
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
                <TableBody>
                    <TableRow>
                        <TableCell align="center">곡 이름</TableCell>
                        <TableCell align="center">작곡가</TableCell>
                        <TableCell align="center">NOV</TableCell>
                        <TableCell align="center">ADV</TableCell>
                        <TableCell align="center">EXH</TableCell>
                        <TableCell align="center">4번째 난이도</TableCell>
                        <TableCell align="center">4번째 난이도 이름</TableCell>
                        <TableCell align="center">유저 이름</TableCell>
                        <TableCell align="center">볼포스</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {
                        items.map(
                            (score, i) => <TableRow hover role="checkbox" key={i}>
                                <TableCell align="center">{score.sname}</TableCell>
                                <TableCell align="center">{score.composer}</TableCell>
                                {
                                    score.lvl1_score == null
                                    ? <TableCell align="center">X</TableCell>
                                    : <TableCell align="center">{score.lvl1_score}</TableCell >
                                }
                                {
                                    score.lvl2_score == null
                                    ? <TableCell align="center">X</TableCell>
                                    : <TableCell align="center">{score.lvl2_score}</TableCell >
                                }
                                {
                                    score.lvl3_score == null
                                    ? <TableCell align="center">X</TableCell>
                                    : <TableCell align="center">{score.lvl3_score}</TableCell >
                                }
                                {
                                    score.lvl4_score == null
                                    ? <TableCell align="center">X</TableCell>
                                    : <TableCell align="center">{score.lvl4_score}</TableCell >
                                }
                                {
                                    score.lvl4_score == null
                                    ? <TableCell align="center"/>
                                    : <TableCell align="center">{score.lvl4name}</TableCell >
                                }
                                <TableCell align='center'>{score.username}</TableCell>
                                <TableCell align='center'>{score.volforce}</TableCell>
                            </TableRow>
                        )
                    }
                    </TableBody>
            </Table>
        </TableContainer> 
        </Paper> 
        < AddUserDialog > </AddUserDialog> < AddScoreDialog > </AddScoreDialog> <Button
        style={{
            position: "relative",
            left: 208,
            bottom: 72
        }}
        variant="outlined"
        onClick={handleClickOpen}
        >홈으로 가기</Button>
        </>
    )
}

export default ScoreInfo;