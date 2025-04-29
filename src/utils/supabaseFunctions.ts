import { User } from "../domain/user";
import { supabase } from "./supabase";

export const getAllData = async () => {
  const { data, error } = await supabase.from("users").select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*, user_skill(skills(name))")
    .eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }

  const user = data.map((data) => {
    console.log(data);
    return User.createUserWithUrls(
      data.user_id,
      data.name,
      data.description,
      data.user_skill[0].skills.name,
      data.github_id,
      data.qiita_id,
      data.x_id
    );
  });
  return user;
};
