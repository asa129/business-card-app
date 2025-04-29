import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById } from "../utils/supabaseFunctions";
import { User } from "../domain/user";

export const Card = function Card() {
  const { id } = useParams();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [user, setUser] = useState<User[]>();
  const getData = async () => {
    const data = await getUserById(id!);
    setUser(data);
    if (data.length !== 0) {
      setLoadingFlag(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (loadingFlag) {
    return <h1>loading…</h1>;
  }
  return (
    <>
      <p>id: {id}</p>
      {user?.map((user) => {
        return (
          <>
            <p>名前:{user.name}</p>
            <p>自己紹介:{user.description}</p>
            <p>スキル:{user.skill_name}</p>
            <p>Github:{user.github_id}</p>
            <p>Qiita:{user.qiita_id}</p>
            <p>X:{user.x_id}</p>
          </>
        );
      })}
    </>
  );
};
