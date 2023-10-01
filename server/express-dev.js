import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./auth.js";
import { fileURLToPath } from "url";

const app = express();
const port = 3010;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const allowedOrigins = ["http://1.243.127.37:3000"];

db.connect();
app.use("/public", express.static(__dirname + "/client/public"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by CORS"));
      }
    },
  })
);

app.get("/", (_req, res) => {
  res.json({ result: "success" });
});

app.get("/getsong", (_req, res) => {
  const sql = "SELECT * from songs";

  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json(rows);
  });
});

app.get("/getsong/:sname", (req, res) => {
  const sql = "select * from songs where sname = ?";
  db.query(sql, [req.params.sname], (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    if (rows.length == 0) {
      const sql = "select * from songs where sname = ?";
      const searchPattern = req.params.sname + "?";
      db.query(sql, [searchPattern], (err, rows) => {
        if (err) {
          res.json({ result: "error" });
          return console.log(err);
        }
        res.json(rows);
      });
      return;
    }
    res.json(rows);
  });
});

app.post("/insert", (req, res) => {
  const sql =
    "INSERT into songs (sname, composer, lvl1, lvl2, lvl3, lvl4, lvl4name) values (" +
    "?, ?, ?, ?, ?, ?, ?)";
  const song = [
    req.body.sname,
    req.body.composer,
    req.body.lvl1,
    req.body.lvl2,
    req.body.lvl3,
    req.body.lvl4,
    req.body.lvl4name,
  ];

  db.query(sql, song, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

app.post("/modify", (req, res) => {
  const sql =
    "UPDATE songs SET sname = ?, composer = ?, lvl1 = ?, lvl2 = ?, lvl3 = ?, lvl4 =" +
    " ?, lvl4name = ? WHERE sname = ?";
  const song = [
    req.body.sname_new,
    req.body.composer,
    req.body.lvl1,
    req.body.lvl2,
    req.body.lvl3,
    req.body.lvl4,
    req.body.lvl4name,
    req.body.sname_old,
  ];

  db.query(sql, song, (err, _rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

app.post("/delete", (req, res) => {
  const sql = "delete from songs where sname = ?";

  db.query(sql, req.body.sname, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

app.get("/search", (req, res) => {
  const sql = "SELECT * from songs where sname like ? or composer like ?";
  const searchPattern = `%${req.query.sname}%`;
  db.query(sql, [searchPattern, searchPattern], (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json(rows);
  });
});

app.post("/adduser", (req, res) => {
  const sql = "INSERT into players(username, volforce) values(?, ?)";
  const information = [req.body.username, req.body.volforce];
  db.query(sql, information, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

app.post("/addscore", (req, res) => {
  const sql =
    "INSERT INTO scores (player_id, song_id, lvl1_score, lvl2_score, lvl3_score, lv" +
    "l4_score) \
  SELECT p.id, s.id, ?, ?, ?, ? \
  FROM players p \
  JOIN songs " +
    "s ON s.sname = ? \
  WHERE p.username = ?;";
  const information = [
    req.body.lvl1,
    req.body.lvl2,
    req.body.lvl3,
    req.body.lvl4,
    req.body.sname,
    req.body.username,
  ];
  db.query(sql, information, (err, _rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

app.get("/getscore", (req, res) => {
  const sql =
    "select songs.id, sname, composer, lvl4name, \
  lvl1_score, lvl2_score, lvl3_s" +
    "core, lvl4_score, username, volforce from songs \
  left join scores on scores" +
    ".song_id = songs.id left join players on scores.player_id = players.id where u" +
    "sername is not null";
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json(rows);
  });
});

app.get("/auth", (req, res) => {
  const sql = "select * from admins where password = ?";
  db.query(sql, [req.query.password], (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`);
});
