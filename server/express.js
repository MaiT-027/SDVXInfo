import express from "express"

import bodyParser from "body-parser"
import cors from "cors"
import db from "./auth.js"

const app = express()

const port = 3010

db.connect()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({result: "success"})
  })

app.get('/song', (req, res) => {
    const sql = 'SELECT * from song'

    db.query(sql, (err, rows) => {
        if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
    })
})

app.get('/song/:sname', (req, res) => {
  const sql = 'select * from song where sname = ?';
	db.query(sql, [req.params.sname], (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
    if (rows.length == 0)
    {
      const sql = 'select * from song where sname = ?';
      const searchPattern = req.params.sname + "?"
	    db.query(sql, [searchPattern], (err, rows) => {
        if (err) {
          res.json({result: "error"})
          return console.log(err)
        }
        res.json(rows)
      })
      return
    }
		res.json(rows)
	})
})

app.post('/insert', (req, res) => {
    const sql = 'INSERT into song (sname, composer, lvl1, lvl2, lvl3, lvl4, lvl4name) values (?, ?, ?, ?, ?, ?, ?)'
    const song = [
      req.body.sname,
      req.body.composer,
      req.body.lvl1,
      req.body.lvl2,
      req.body.lvl3,
      req.body.lvl4,
      req.body.lvl4name
    ]

    db.query(sql, song, (err, rows) => {
      if (err) {
        res.json({result: "error"})
        return console.log(err)
      }
      res.json({result: "success"})
    })
})

app.post('/delete', (req, res) => {
  const sql = 'delete from song where sname = ?'

  db.query(sql, req.body.sname, (err, rows) => {
    if (err) {
      res.json({result: "error"})
      return console.log(err)
    }
    res.json({result: "success"})
  })
})

app.listen(port, () => {
    console.log(`서버 실행됨 (port ${port})`)
  })