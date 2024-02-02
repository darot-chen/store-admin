export const useClickAway = (
  ref: Ref<HTMLElement | null | undefined>,
  callback: () => void
) => {
  const handler = (event: MouseEvent) => {
    if (
      ref.value &&
      typeof ref.value.contains === "function" &&
      !ref.value.contains(event.target as HTMLElement)
    ) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
};
