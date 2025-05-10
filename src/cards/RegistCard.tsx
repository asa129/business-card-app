import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { insertData } from "../utils/supabaseFunctions";
import { User } from "../domain/user";
import { useNavigate } from "react-router";

export const RegistCard = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<Partial<User>> = async (data) => {
    await insertData(data);
    navigate("/");
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
            新規名刺登録
          </Heading>
        </Box>
        <Box
          width="100%"
          maxWidth="430px"
          p={10}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card boxShadow="none">
              <FormControl mb={4}>
                <FormLabel>
                  好きな英単語 <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  {...register("id", {
                    required: true,
                    pattern: /^[A-Za-z]*$/,
                  })}
                  type="text"
                />
                {errors.id?.type === "required" && (
                  <p style={{ color: "red" }}>好きな英単語は必須です</p>
                )}
                {errors.id?.type === "pattern" && (
                  <p style={{ color: "red" }}>
                    英語のみ入力可能です
                    <br />
                    ※スペースは入れないでください
                  </p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>
                  お名前 <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input {...register("name", { required: true })} type="text" />
                {errors.name?.type === "required" && (
                  <p style={{ color: "red" }}>お名前は必須です</p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>
                  自己紹介 <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Textarea
                  resize="vertical"
                  {...register("description", { required: true })}
                  placeholder="<h1>HTMLタグも使えます</h1>"
                />
                {errors.description?.type === "required" && (
                  <p style={{ color: "red" }}>自己紹介は必須です</p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>
                  好きな技術 <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Select
                  {...register("favorite_technique_id", { required: true })}
                  placeholder="選んでね"
                >
                  <option value={1}>React</option>
                  <option value={2}>TypeScript</option>
                  <option value={3}>Github</option>
                </Select>
                {errors.favorite_technique_id?.type === "required" && (
                  <p style={{ color: "red" }}>好きな技術は必須です</p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>GithubId</FormLabel>
                <Input type="text" {...register("github_id")} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>QiitaId</FormLabel>
                <Input type="text" {...register("qiita_id")} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>XId</FormLabel>
                <Input type="text" {...register("x_id")} />
              </FormControl>
              <Button mt={4} colorScheme="teal" type="submit">
                登録
              </Button>
            </Card>
          </form>
        </Box>
      </Box>
    </>
  );
};
