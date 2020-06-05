const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {
  /* db.run(`
    create table if not exists places (
      id integer primary key autoincrement,
      image text,
      name text,
      address text,
      address2 text,
      state text,
      city text,
      items text
    );
  `);

  /* db.run(`delete from places where id = ?`, [4], function (err) {
    if (err) return console.log(err);

    console.log("Registro deletado com sucesso!");
  }); */
});
