import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as LinkUi,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { User } from "../domain/user";

export const TopCard = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onClickSeeCard: SubmitHandler<Partial<User>> = async (data) => {
    navigate(`/cards/${data.id}`);
  };

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
          <Heading as="h1" size="lg" data-testid="title">
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
                    data-testid="id"
                  />
                  {errors.id?.message !== "" && (
                    <p style={{ color: "red" }}>
                      {errors.id?.message?.toString()}
                    </p>
                  )}
                </FormControl>
                <Button
                  colorScheme="teal"
                  w="100%"
                  type="submit"
                  data-testid="submit-button"
                >
                  名刺を見る
                </Button>
              </CardBody>
            </Card>
          </form>
        </Box>
        <Box textAlign="center" m={6}>
          <LinkUi as={Link} to="/cards/register" data-testid="register-link">
            新規登録はこちら
          </LinkUi>
        </Box>
      </Box>
    </>
  );
};
