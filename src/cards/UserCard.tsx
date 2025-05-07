import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserById } from "../utils/supabaseFunctions";
import { User } from "../domain/user";
import { Box, Button, Card, CardBody, Heading } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import { SiQiita } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

export const UserCard = () => {
  const { id } = useParams();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [user, setUser] = useState<User[]>();
  const navigate = useNavigate();
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
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#C4F1F9"
    >
      <Box width="sm" p={4}>
        {user?.map((user) => {
          return (
            <Card key={user.id}>
              <CardBody>
                <Box>
                  <Heading as="h1" size="lg" mb={4} data-testid="name">
                    {user.name}
                  </Heading>
                </Box>
                <Box mb={2}>
                  <Heading as="h2" size="md">
                    自己紹介
                  </Heading>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: user.description,
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Heading as="h2" size="md">
                    好きな技術
                  </Heading>
                  {user.skill_name}
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box w="33%" textAlign="center">
                    <a href={user.getGithubUrl(user.github_id)}>
                      <IoLogoGithub fontSize="40px" />
                    </a>
                  </Box>
                  <Box w="33%" textAlign="center">
                    <a href={user.getQiitaUrl(user.qiita_id)}>
                      <SiQiita fontSize="40px" />
                    </a>
                  </Box>
                  <Box w="33%" textAlign="center">
                    <a href={user.getXUrl(user.x_id)}>
                      <RiTwitterXFill fontSize="40px" />
                    </a>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          );
        })}
      </Box>
      <Box width="sm" p={4} textAlign="center">
        <Button w="100%" mt={4} colorScheme="teal" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Box>
    </Box>
  );
};
