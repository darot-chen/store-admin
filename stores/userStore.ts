import { defineStore } from "pinia";
import { API_AUTH } from "~/api/apiAuth";
import { API_USER } from "~/api/apiUser";
import {
  LoginPayload,
  NormalRegisterPayload,
  RegisterSendOTPPayload,
  RegisterSendOTPRespone,
  RegisterVerifyCodePayload,
  UserState,
  VerifyCodeRepsone,
} from "~/types/user";

const useUserStore = defineStore("useUserStore", {
  state: () => ({
    data: {
      id: 0,
      username: "",
      nickname: "",
      phoneNumber: "",
      balance: 0,
      blocking: 0,
      type: "",
      creditAmount: 0,
    } as UserState,
    registerInfo: {} as RegisterSendOTPRespone,
    verifiedInfo: {} as VerifyCodeRepsone,
  }),

  getters: {
    userInfo: ({ data }: { data: UserState }) => {
      return data;
    },

    isUserLogin: ({ data }: { data: UserState }) => {
      return !!data.id;
    },

    otpData: ({ registerInfo }: { registerInfo: RegisterSendOTPRespone }) => {
      return registerInfo;
    },

    username: ({ data }: { data: UserState }) => {
      return data.nickname || data.username || data.phoneNumber;
    },
  },

  actions: {
    setInfo(data: UserState) {
      this.data = { ...this.data, ...data };
    },

    setRegisterInfo(data: any) {
      this.registerInfo = data;
    },

    async login(loginInfo: LoginPayload) {
      const { data, error } = await API_AUTH.LOGIN.execute({ ...loginInfo });
      if (error.value) {
        return await Promise.reject(error.value);
      }

      if (data.value) {
        const { token, ...resData } = data.value.data;

        setToken(token);
        this.setInfo(resData);
      }
    },

    async register(payload: NormalRegisterPayload) {
      const { data, error } = await API_AUTH.REGISTER.execute({ ...payload });
      if (error.value) {
        return await Promise.reject(error.value);
      }

      if (data.value) {
        const { token, ...resData } = data.value.data;

        setToken(token);
        this.setInfo(resData);
      }
    },

    async sendOTP(registerInfo: RegisterSendOTPPayload) {
      const { data, error } = await API_AUTH.REGISTER_SEND_OTP.execute({
        ...registerInfo,
      });

      if (error.value) {
        return await Promise.reject(error.value);
      }

      if (data.value) {
        this.setRegisterInfo(data.value.data);
      }
    },

    async verifyCode(dataParams: RegisterVerifyCodePayload) {
      const { data, error } = await API_AUTH.REGISTER_VERYFY_CODE.execute(
        dataParams
      );

      if (error.value) {
        return await Promise.reject(error.value);
      }

      if (data.value) {
        const { token, ...resData } = data.value.data;
        setToken(token);
        this.setInfo(resData);
      }

      return data;
    },

    async changePassword(payload: ChangePasswordPayload) {
      const { error } = await API_USER.CHANGE_PASSWORD.execute({
        ...payload,
      });

      if (error.value) {
        return await Promise.reject(error.value);
      }
    },

    async me() {
      const { data, error } = await API_USER.ME.execute();
      if (error.value) {
        return await Promise.reject(error.value);
      }

      if (data.value) {
        this.setInfo(data.value.data);
      }
    },

    logout() {
      this.$reset();
      clearToken();
    },
  },
});

export default useUserStore;
