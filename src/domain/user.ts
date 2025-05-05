export class User {
  private constructor(
    public id: string,
    public name: string,
    public description: string,
    public skill_name: string,
    public github_id: string,
    public qiita_id: string,
    public x_id: string,
    public favorite_technique_id: number = 0,
    public github_url: string = "",
    public qiita_url: string = "",
    public x_url: string = " "
  ) {}

  public static createUser(
    id: string,
    name: string,
    description: string,
    skill_name: string,
    github_id: string,
    qiita_id: string,
    x_id: string
  ): User {
    return new User(
      id,
      name,
      description,
      skill_name,
      github_id,
      qiita_id,
      x_id
    );
  }

  public static createUserWithUrls(
    id: string,
    name: string,
    description: string,
    skill_name: string,
    github_id: string,
    qiita_id: string,
    x_id: string
  ): User {
    const user = new User(
      id,
      name,
      description,
      skill_name,
      github_id,
      qiita_id,
      x_id
    );
    user.github_url = user.getGithubUrl(github_id);
    user.qiita_url = user.getQiitaUrl(qiita_id);
    user.x_url = user.getXUrl(x_id);
    return user;
  }

  // github_idに紐づくgithubのURLを取得する
  public getGithubUrl(github_id: string): string {
    return "https://github.com/" + github_id;
  }

  // qiita_idに紐づくqiitaのURLを取得する
  public getQiitaUrl(qiita_id: string): string {
    return "https://qiita.com/" + qiita_id;
  }

  // x_idに紐づくxのURLを取得する
  public getXUrl(x_id: string): string {
    return "https://twitter.com/" + x_id;
  }
}
