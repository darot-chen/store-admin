import type { User } from "~/types/user";

export const getMe = async () => {
  const url = "auth/me";
  const { data } = await useAxiosInstance().get<User>(url);

  return data;
};

export const updateName = async (name: string) => {
  const { data } = await useAxiosInstance().post(`users/me/name`, {
    name,
  });

  if (data.message === "Success") {
    return true;
  }

  return false;
};
