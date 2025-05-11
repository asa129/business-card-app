import { deleteData } from "../src/utils/supabaseFunctions";

// 前日作成したusersとuser_skillを削除する
const deleteUser = async () => {
  console.log("削除処理を開始します");
  await deleteData();
  console.log("削除しました");
};

deleteUser();
