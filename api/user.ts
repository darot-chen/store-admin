import { User } from "~/types/user";

export const getMe = async () => {
  const url = "auth/me";
  const { data } = await useAxiosInstance().get<User>(url);

  return data;
};
