<template>
  <q-card :style="cardStyle" class="card-resumo shadow-2">
    <q-card-section>
      <div class="row items-center">
        <q-icon :name="iconName" :color="iconColor" class="q-mr-sm" />
        <div class="text-h6">{{ titulo }}</div>
      </div>
      <div class="text-h4 q-mt-sm">{{ formatarMoeda(valor) }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardResumo",
  props: {
    titulo: String,
    valor: Number,
    tipo: String,
    formatarMoeda: Function,
  },
  computed: {
    cardStyle() {
      return this.tipo === "receita"
        ? { backgroundColor: "#1e824c", color: "#ffffff" }
        : { backgroundColor: "#8c1a1a", color: "#ffffff" };
    },
    iconName() {
      return this.tipo === "receita" ? "attach_money" : "money_off";
    },
    iconColor() {
      return this.tipo === "receita" ? "green-7" : "red-7";
    },
  },
};
</script>

<style scoped>
.card-resumo {
  border-radius: 12px;
  padding: 16px;
}
</style>
