import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineNuxtPlugin(() => {
  Chart.defaults.animation = false;

  return {
    provide: {
      chart: () => Chart,
    },
  };
});
