<template>
  <q-card class="shadow-3 grafico-financeiro q-mb-lg">
    <q-card-section>
      <div class="text-h5" style="color: #fff">Evolução Financeira</div>
      <div style="height: 400px">
        <chart-grafico :data="dadosGrafico" :options="opcoesGrafico" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import ChartGrafico from "../components/chartGrafico.vue";

export default {
  name: "GraficoFinanceiro",
  components: {
    ChartGrafico,
  },
  props: {
    dadosGrafico: Object,
    opcoesGrafico: Object,
  },
};
</script>

<style scoped></style>
