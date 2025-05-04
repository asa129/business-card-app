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

export const RegistCard = () => {
  type Form = {
    name: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<Form> = (data) => console.log(data);
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
                  {...register("selfIntroduction", { required: true })}
                  placeholder="<h1>HTMLタグも使えます</h1>"
                />
                {errors.selfIntroduction?.type === "required" && (
                  <p style={{ color: "red" }}>自己紹介は必須です</p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>
                  好きな技術 <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Select
                  {...register("favoriteTechnique", { required: true })}
                  placeholder="選んでね"
                >
                  <option>Github</option>
                  <option>Qiita</option>
                  <option>X</option>
                </Select>
                {errors.favoriteTechnique?.type === "required" && (
                  <p style={{ color: "red" }}>好きな技術は必須です</p>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>GithubId</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>QiitaId</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>TwitterId</FormLabel>
                <Input type="text" />
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
