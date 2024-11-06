<template>
  <canvas ref="chartRef"></canvas>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

export default {
  name: "ChartGrafico",
  props: {
    data: {

      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    const initChart = () => {
      const ctx = chartRef.value.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: props.data,
        options: {
          ...props.options,
          animation: {
            duration: 500,
          },
        },
      });
    };

    watch(
      () => props.data,
      (newVal) => {

        if (chartInstance) {
          chartInstance.data = newVal;
          chartInstance.update("active");
        }
      },
      { deep: true }
    );

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      chartRef,
    };
  },
};
</script>
