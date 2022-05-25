import * as sqlite from "expo-sqlite";
import { useContext } from "react";

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
export const resultdb = (mysql, para) => {
  return createdbpromise(mysql, para);
};

export const getdb = async (mysql, para) => {
  await db.transaction((tx) => {
    tx.executeSql(
      mysql,
      para,
      (_, result) => {
        const Infodb = result;
        console.log(Infodb);
        // console.log(JSON.stringify(result);
      },
      (_, err) => {
        console.log("DB тэст амжилтгүй");
      }
    );
  });
};
const createdbpromise = (mysql, para) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        mysql,
        para,
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
