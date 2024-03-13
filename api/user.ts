import type { User } from "~/types/user";

const url = "/users";

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

export const uploadProfileImage = async (
  file: File
): Promise<string | undefined> => {
  try {
    const formatData = new FormData();
    formatData.append("photo", file);

    const { data } = await useAxiosInstance().postForm(
      `${url}/me/photo`,
      formatData
    );

    if (data?.profile_key) {
      return data?.profile_key?.toString();
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};
