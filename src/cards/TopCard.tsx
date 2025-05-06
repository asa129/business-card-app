import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { User } from "../domain/user";

export const TopCard = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onClickSeeCard: SubmitHandler<Partial<User>> = async (data) => {
    console.log(data);
    navigate(`/cards/${data.id}`);
  };
  console.log(errors);

  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="#C4F1F9"
        p={10}
        flexDirection="column"
      >
        <Box textAlign="center" mb={6}>
          <Heading as="h1" size="lg">
            デジタル名刺アプリ
          </Heading>
        </Box>
        <Box
          width="100%"
          maxWidth="430px"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <form onSubmit={handleSubmit(onClickSeeCard)}>
            <Card>
              <CardBody>
                <FormControl mb={4}>
                  <FormLabel>ID</FormLabel>
                  <Input
                    type="text"
                    mb={1}
                    {...register("id", {
                      required: {
                        value: true,
                        message: "IDを入力してください",
                      },
                    })}
                  />
                  {errors.id?.message !== "" && (
                    <p style={{ color: "red" }}>
                      {errors.id?.message?.toString()}
                    </p>
                  )}
                </FormControl>
                <Button colorScheme="teal" w="100%" type="submit">
                  名刺を見る
                </Button>
              </CardBody>
            </Card>
          </form>
        </Box>
        <Box textAlign="center" m={6}>
          <Link>新規登録はこちら</Link>
        </Box>
      </Box>
    </>
  );
};
