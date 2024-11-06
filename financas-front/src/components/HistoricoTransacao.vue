<template>
  <q-card class="q-mt-lg shadow-2 lista-transacoes q-mt-md">
    <q-card-section>
      <div class="text-h5">Histórico de Transações</div>
      <q-list separator>
        <q-item
          v-for="transacao in transacoes"
          :key="transacao.id"
          class="item-transacao"
        >
          <q-item-section>
            <q-item-label>
              <q-icon
                :name="
                  transacao.tipo === 'receita'
                    ? 'arrow_upward'
                    : 'arrow_downward'
                "
                :color="transacao.tipo === 'receita' ? 'green-7' : 'red-7'"
                class="q-mr-sm"
              />
              {{ transacao.descricao }}
            </q-item-label>
            <q-item-label caption class="data-historico">
              {{
                transacao.data
                  ? new Date(transacao.data).toLocaleDateString()
                  : "Data inválida"
              }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label
              :class="
                transacao.tipo === 'receita' ? 'text-positive' : 'text-negative'
              "
            >
              {{ transacao.valor ? formatarMoeda(transacao.valor) : "R$ 0,00" }}
            </q-item-label>
            <q-item-label caption class="label-tipo">{{
              transacao.tipo
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              v-if="transacao.id"
              flat
              icon="edit"
              color="primary"
              @click="editarTransacao(transacao)"
            />
            <q-btn
              v-if="transacao.id"
              flat
              icon="delete"
              color="negative"
              @click="deletarTransacao(transacao.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "HistoricoTransacoes",
  props: {
    transacoes: Array,
    formatarMoeda: Function,
  },
  emits: ["editarTransacao", "deletarTransacao"],
  methods: {
    editarTransacao(transacao) {
      this.$emit("editarTransacao", transacao);
    },
    deletarTransacao(id) {
      this.$emit("deletarTransacao", id);
    },
  },
};
</script>

<style scoped>
.lista-transacoes {
  max-width: 1200px;
  margin: 0 auto;
}
.data-historico {
  color: #fff;
}

.label-tipo {
  color: #fff;
}

.item-transacao {
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
}
</style>
