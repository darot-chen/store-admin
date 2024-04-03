import type { LoginViaMiniAppResponse, User, UserMode } from "~/types/user";

const url = "/users";

export const getMe = async () => {
  const url = "auth/me";
  const { data } = await useAxiosInstance().get<User>(url);

  return data;
};

export const updateName = async (name: string) => {
  const { status } = await useAxiosInstance().post(`${url}/me/name`, {
    name,
  });

  if (status === 200) {
    return true;
  }

  return false;
};

export const updateBusinessName = async (name: string) => {
  const { status } = await useAxiosInstance().post(`${url}/business/name`, {
    name,
  });

  if (status === 200) {
    return true;
  }

  return false;
};

export const saveLastSession = async (path: string) => {
  const { status } = await useAxiosInstance().post(`${url}/last-viewed-page`, {
    path,
  });

  if (status === 200) {
    return true;
  }

  return false;
};

export const uploadBusinessProfileImage = async (
  file: File
): Promise<string | undefined> => {
  try {
    const formatData = new FormData();
    formatData.append("photo", file);

    const { data } = await useAxiosInstance().postForm(
      `${url}/business/photo`,
      formatData
    );

    if (data?.business_profile_key) {
      return data?.business_profile_key?.toString();
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
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

export const loginViaMiniApp = async (
  initData: string
): Promise<LoginViaMiniAppResponse | undefined> => {
  try {
    const { data } = await useAxiosInstance().post(`/auth/login-via-miniapp`, {
      init_data: initData,
    });

    return data;
  } catch (error) {
    return undefined;
  }
};

export const updateUserMode = async (
  mode: UserMode
): Promise<LoginViaMiniAppResponse | undefined> => {
  try {
    const { data } = await useAxiosInstance().post(`/users/mode`, {
      mode,
    });

    return data;
  } catch (error) {
    return undefined;
  }
};
