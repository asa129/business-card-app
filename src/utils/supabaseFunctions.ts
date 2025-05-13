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

export const insertData = async (data: Partial<User>) => {
  const { error: usersError } = await supabase.from("users").insert({
    user_id: data.id,
    name: data.name,
    description: data.description,
    github_id: data.github_id,
    qiita_id: data.qiita_id,
    x_id: data.x_id,
  });

  if (usersError) {
    throw new Error(usersError.message);
  }

  const { error: userSkillError } = await supabase
    .from("user_skill")
    .insert({ user_id: data.id, skill_id: data.favorite_technique_id });

  if (userSkillError) {
    throw new Error(userSkillError.message);
  }
};

export const deleteData = async () => {
  const now = new Date();
  const JST_OFFSET = 9 * 60 * 60 * 1000; // 日本時間 (UTC+9) のオフセット
  const yesterday = new Date(now.getTime() - JST_OFFSET - 24 * 60 * 60 * 1000);

  // 日本時間で昨日の開始時刻と終了時刻を UTC 時間に変換
  const startOfYesterday = new Date(
    Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate(),
      0,
      0,
      0
    )
  ).toISOString();

  const endOfYesterday = new Date(
    Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate(),
      23,
      59,
      59
    )
  ).toISOString();

  // user_skill テーブルから削除
  const { error: userSkillError } = await supabase
    .from("user_skill")
    .delete()
    .gte("created_at", startOfYesterday)
    .lte("created_at", endOfYesterday);

  if (userSkillError) {
    throw new Error(userSkillError.message);
  }

  // users テーブルから削除
  const { error } = await supabase
    .from("users")
    .delete()
    .gte("created_at", startOfYesterday)
    .lte("created_at", endOfYesterday);

  if (error) {
    throw new Error(error.message);
  }
};
