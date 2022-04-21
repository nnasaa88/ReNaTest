import * as sqlite from "expo-sqlite";

const db = sqlite.openDatabase("main.db");

export const initdb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getdb = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from items ;",
      //   "insert into items (done, value) values (0, 'Amraa')",
      [],
      (_, result) => {
        console.log(JSON.stringify(result));
      },
      (_, err) => {
        console.log("DB тэст амжилтгүй");
      }
    );
  });
};
