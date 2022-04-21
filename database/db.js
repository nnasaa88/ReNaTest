import * as sqlite from "expo-sqlite";

const db = sqlite.openDatabase("main.db");

export const initdb = (mysql) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        mysql,
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
      // "DROP TABLE IF EXISTS items;",
      "select * from users;",
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
