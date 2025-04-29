import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById } from "../utils/supabaseFunctions";
import { User } from "../domain/user";
import { Box, Card, CardBody } from "@chakra-ui/react";

export const UserCard = function UserCard() {
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
    <Box>
      <>
        {user?.map((user) => {
          return (
            <Card key={user.id}>
              <CardBody>
                <p>名前:{user.name}</p>
                <p>自己紹介:{user.description}</p>
                <p>スキル:{user.skill_name}</p>
                <p>
                  <a href={user.getGithubUrl(user.github_id)}>Github</a>
                </p>
                <p>
                  <a href={user.getQiitaUrl(user.qiita_id)}>Qiita</a>
                </p>
                <p>
                  <a href={user.getXUrl(user.x_id)}>X</a>
                </p>
              </CardBody>
            </Card>
          );
        })}
      </>
    </Box>
  );
};
