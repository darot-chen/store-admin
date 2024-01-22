export const usePublicEnv = () => {
  const config = useRuntimeConfig();

  return config.public;
};
