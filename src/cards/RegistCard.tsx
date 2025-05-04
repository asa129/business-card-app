import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";

export const RegistCard = () => {
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
          <Card boxShadow="none">
            <FormControl mb={4}>
              <FormLabel>好きな英単語</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>お名前</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>自己紹介</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>好きな技術</FormLabel>
              <Select placeholder="Select country">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
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
        </Box>
      </Box>
    </>
  );
};
