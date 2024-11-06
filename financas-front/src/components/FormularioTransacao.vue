<template>
  <q-card-section>
    <div class="text-h6 q-mb-md"></div>
    <q-form
      @submit.prevent="handleSubmit"
      :key="formKey"
      class="q-gutter-md formulario-transacao justify-center"
    >
      <q-input
        v-model="localDescricao"
        label="Descrição"
        label-color="white"
        outlined
        :rules="[(val) => !!val || 'Descrição é obrigatória']"
        class="input-custom q-mb-md"
        lazy-rules
      />
      <q-input
        v-model.number="localValor"
        label="Valor"
        label-color="white"
        type="number"
        outlined
        :rules="[
          (val) => !!val || 'Valor é obrigatório',
          (val) => val > 0 || 'Valor deve ser maior que zero',
        ]"
        class="input-custom q-mb-md"
        lazy-rules
      />
      <q-select
        v-model="localTipo"
        label="Tipo de Transação"
        label-color="white"
        :options="tiposTransacao"
        option-value="value"
        option-label="label"
        outlined
        :rules="[(val) => !!val || 'Tipo é obrigatório']"
        class="input-custom q-mb-md"
        lazy-rules
      />
      <div class="flex justify-center">
        <q-btn
          type="submit"
          label="Adicionar Transação"
          color="primary"
          :loading="loading"
          :ripple="true"
          class="shadow-1 botao-adicionar-transacao"
        />
      </div>
    </q-form>
  </q-card-section>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "FormularioTransacao",
  props: {
    descricao: String,
    valor: Number,
    tipo: String,
    tiposTransacao: Array,
    loading: Boolean,
    formKey: Number,
  },
  emits: ["adicionarTransacao"],
  setup(props, { emit }) {
    const localDescricao = ref(props.descricao);
    const localValor = ref(props.valor);
    const localTipo = ref(props.tipo);


    watch(
      () => props.descricao,
      (newVal) => {
        localDescricao.value = newVal;
      }
    );
    watch(
      () => props.valor,
      (newVal) => {
        localValor.value = newVal;
      }
    );
    watch(
      () => props.tipo,
      (newVal) => {
        localTipo.value = newVal;
      }
    );

    const handleSubmit = () => {
      emit("adicionarTransacao", {
        descricao: localDescricao.value,
        valor: localValor.value,
        tipo:
          typeof localTipo.value === "object"
            ? localTipo.value.value
            : localTipo.value,
      });

      localDescricao.value = "";
      localValor.value = null;
      localTipo.value = "";
    };

    return {
      localDescricao,
      localValor,
      localTipo,
      handleSubmit,
    };
  },
};
</script>
input-customizado

<style scoped>
:deep(.input-custom .q-field__control) {
  border: 2px solid rgb(255, 255, 255, 0.1) !important;
  border-radius: 8px;
}

.input-custom :deep(.q-field__native::placeholder) {
  color: #cccccc;
}

.input-custom :deep(.q-field__native) {
  color: #ffffff;
}

:deep(input[type="number"]::-webkit-outer-spin-button),
:deep(input[type="number"]::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

.botao-adicionar-transacao {
  background-color: #6c757d !important;
}
</style>
