import * as React from "react"
import axios from "axios";
import {useState} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EXPRESS_URL = 'http://175.120.221.48:3010'

export function InsertDialog() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        sname: "",
        composer: "",
        lvl1: "",
        lvl2: "",
        lvl3: "",
        lvl4: "",
        lvl4name: "",
        password: ""
    })

    async function insertSong() {
    const password = await axios.get(EXPRESS_URL + `/auth?password=${values.password}`)
    if (password.data.length !== 0) {
        if (values.lvl4 === "") {
            values.lvl4 = null
            values.lvl4name = null
        }
        const res = await axios.post(EXPRESS_URL + '/insert', values)
        console.log(res.data)
        alert("추가 완료되었습니다.")
    }
    else {
      alert("관리자 패스워드가 잘못되었습니다.")
      setOpen(true);
    }
}

    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleCloseOK = () => {
        insertSong()
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div>
            <Button
                style={{
                    position: "relative"
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        악곡의 정보를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="sname"
                        label="악곡 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        required
                        margin="dense"
                        name="composer"
                        label="작곡가"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        required
                        margin="dense"
                        name="lvl1"
                        label="NOV"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        required
                        margin="dense"
                        name="lvl2"
                        label="ADV"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        required
                        margin="dense"
                        name="lvl3"
                        label="EXH"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        margin="dense"
                        name="lvl4"
                        label="4번째 난이도 레벨(없을 시 공백)"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        margin="dense"
                        name="lvl4name"
                        label="4번째 난이도 이름(없을 시 공백)"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        required
                        margin="dense"
                        name="password"
                        label="관리자 패스워드"
                        type="password"
                        fullWidth
                        size="medium"
                        variant="standard"
                        onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={HandleCloseOK}>추가</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function ModifyDialog() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        sname_old: "",
        sname_new: "",
        composer: "",
        lvl1: "",
        lvl2: "",
        lvl3: "",
        lvl4: "",
        lvl4name: "",
        password: ""
    })

    async function modifySong() {
        const password = await axios.get(
            EXPRESS_URL + `/auth?password=${values.password}`
        )
        if (password.data.length !== 0) {
            if (values.lvl4 === "") {
                values.lvl4 = null
                values.lvl4name = null
            }
            const res = await axios.post(EXPRESS_URL + '/modify', values)
            console.log(res.data)
            alert("변경 완료되었습니다.")
        }
        else {
          alert("관리자 패스워드가 잘못되었습니다.")
          setOpen(true);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleCloseOK = () => {
        modifySong()
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div>
            <Button
                style={{
                    position: "relative",
                    left: 67,
                    bottom: 36
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                변경
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>변경</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        악곡의 정보를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="sname_old"
                        label="바꿀 악곡의 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="sname_new"
                        label="새로운 악곡 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="composer"
                        label="작곡가"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl1"
                        label="NOV"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl2"
                        label="ADV"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl3"
                        label="EXH"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl4"
                        label="4번째 난이도 레벨(없을 시 공백)"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl4name"
                        label="4번째 난이도 이름(없을 시 공백)"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="password"
                        label="관리자 패스워드"
                        type="password"
                        fullWidth
                        size="medium"
                        variant="standard"
                        onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={HandleCloseOK}>변경</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function DeleteDialog() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({sname: "", password: ""})

    async function deleteSong() {
    const password = await axios.get(
        EXPRESS_URL + `/auth?password=${values.password}`
    )
    if (password.data.length !== 0) {
        const res = await axios.post(EXPRESS_URL + '/delete', values)
        console.log(res.data)
        alert("삭제 완료되었습니다.")
    }
    else {
      alert("관리자 패스워드가 잘못되었습니다.")
      setOpen(true);
    }
}

    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleCloseOK = () => {
        deleteSong()
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div>
            <Button
                style={{
                    position: "relative",
                    left: 134,
                    bottom: 72
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                삭제
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>삭제</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        악곡의 정보를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="sname"
                        label="악곡 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="password"
                        label="관리자 패스워드"
                        type="password"
                        fullWidth
                        size="medium"
                        variant="standard"
                        onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={HandleCloseOK}>삭제</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function AddUserDialog() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({username: "", volforce: ""})

    async function insertUser() {
        const res = await axios.post(EXPRESS_URL + '/adduser', values)
        console.log(res.data)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleCloseOK = () => {
        insertUser()
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div>
            <Button
                style={{
                    position: "relative"
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                유저 추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        악곡의 정보를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="플레이어 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="volforce"
                        label="볼포스"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={HandleCloseOK}>추가</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function AddScoreDialog() {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        username: "",
        sname: "",
        lvl1: "",
        lvl2: "",
        lvl3: "",
        lvl4: ""
    })

    async function insertScore() {
        if (values.lvl4 === "") {
            values.lvl4 = null
            values.lvl4name = null
        }
        const res = await axios.post(EXPRESS_URL + '/addscore', values)
        console.log(res.data)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const HandleCloseOK = () => {
        insertScore()
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div>
            <Button
                style={{
                    position: "relative",
                    left: 97,
                    bottom: 36
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                스코어 추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        악곡의 정보를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="플레이어 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="sname"
                        label="악곡 이름"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl1"
                        label="NOV 점수"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl2"
                        label="ADV 점수"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl3"
                        label="EXH 점수"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lvl4"
                        label="4번째 난이도 점수(없을 시 공백)"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={HandleCloseOK}>추가</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}