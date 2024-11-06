<template>
  <q-page padding style="background-color: #181f36; height: 100%">
    <q-spinner v-if="loading" color="primary" size="50px" />
    <div class="dashboard">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="mensagem-boas-vindas">
            <q-icon name="emoji_people" color="primary" class="q-mr-sm" />
            Bem-vindo,
            <span class="nome-usuario">{{ nomeUsuario }}</span>
          </div>

          <h1 class="text-h4 q-mb-md" style="color: #ffffff">
            Painel Financeiro
          </h1>
        </div>
        <q-btn
          label="Sair"
          color="primary"
          icon="logout"
          outline
          class="q-ml-md botao-sair custom-grey-btn"
          @click="logout"
          :ripple="true"
        />
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-6">
          <CardResumo
            titulo="Total de Receitas"
            :valor="calcularTotalReceitas"
            tipo="receita"
            :formatar-moeda="formatarMoeda"
            class="card-resumo"
          />
        </div>
        <div class="col-12 col-md-6">
          <CardResumo
            titulo="Total de Despesas"
            :valor="calcularTotalDespesas"
            tipo="despesa"
            :formatar-moeda="formatarMoeda"
            class="card-resumo"
          />
        </div>
      </div>

      <!-- Formulário para adicionar uma nova transação -->
      <q-card class="q-mb-md shadow-2 card-transacao">
        <q-card-section>
          <div class="text-h5 q-mb-md">Nova Transação</div>
          <formulario-transacao
            :tipos-transacao="tiposTransacao"
            :loading="loading"
            :form-key="formKey"
            @adicionarTransacao="adicionarTransacao"
            class="formulario-transacao"
          />
        </q-card-section>
      </q-card>

      <!-- Gráfico -->
      <grafico-financeiro
        v-if="transacoes.length > 0"
        :dadosGrafico="prepararDadosGrafico"
        :opcoesGrafico="chartOptions"
        class="grafico-financeiro"
      />

      <!-- Lista de Transações -->
      <HistoricoTransacao
        :transacoes="transacoes"
        :formatarMoeda="formatarMoeda"
        @editarTransacao="editarTransacao"
        @deletarTransacao="deletarTransacao"
        class="historico-transacao"
      />
    </div>

    <!-- Modal de Edição -->
    <q-dialog v-model="mostrarModalEditar" >
      <q-card>
        <q-card-section style="background-color: #36648b;">
          <div class="text-h6">Editar Transação</div>
        </q-card-section>
        <q-card-section style="background-color: #36648b;">
          <q-input
            v-model="transacaoSelecionada.descricao"
            label="Descrição"
            label-color="dark"
            color="dark"
            outlined
          />
          <q-input
            v-model.number="transacaoSelecionada.valor"
            label="Valor"
            type="number"
            color="dark"
            label-color="dark"
            outlined
          />
          <q-select
            v-model="transacaoSelecionada.tipo"
            label="Tipo de Transação"
            label-color="dark"
            color="dark"
            :options="tiposTransacao"
            option-value="value"
            option-label="label"
            outlined
          />
        </q-card-section>
        <q-card-actions align="right" style="background-color: #36648b;">
          <q-btn flat label="Cancelar" v-close-popup class="botao-cancelar" color="dark"/>
          <q-btn
            flat
            label="Salvar"
            color="dark"
            class="botao-salvar"
            @click="salvarEdicaoTransacao"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import {
  getTransacoes,
  addTransacao,
  updateTransacao,
  deleteTransacao,
} from "src/services/transacoesService";
import { getUsuario } from "../services/authService";
import CardResumo from "src/components/CardResumo.vue";
import FormularioTransacao from "src/components/FormularioTransacao.vue";
import HistoricoTransacao from "src/components/HistoricoTransacao.vue";
import GraficoFinanceiro from "src/components/GraficoFinanceiro.vue";
import { formatarMoeda, formatarDataParaSQL } from "src/utils/helpers";

export default {
  name: "DashboardFinanceiro",
  components: {
    CardResumo,
    FormularioTransacao,
    HistoricoTransacao,
    GraficoFinanceiro,
  },

  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const descricao = ref("");
    const valor = ref(null);
    const tipo = ref(null);
    const transacoes = ref([]);
    const nomeUsuario = ref("");
    const formKey = ref(0);

    const carregarUsuarios = async () => {
      try {
        const response = await getUsuario();
        if (response && response.data) {
          nomeUsuario.value = response.data.nome;
        } else {
          console.error("Erro: Resposta inesperada da API ao buscar ususário");
        }
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
        $q.notify({
          type: "negative",
          message: "Erro ao carregar informações do usuário",
          icon: "error",
        });
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("nomeUsuario");
      $q.notify({
        type: "info",
        message: "Logout realizado com sucesso!",
        icon: "check_circle",
      });
      window.location.href = "/login";
    };

    const tiposTransacao = [
      { label: "Receita", value: "receita" },
      { label: "Despesa", value: "despesa" },
    ];

    const mostrarModalEditar = ref(false);
    const transacaoSelecionada = ref(null);

    const carregarTransacoes = async () => {
      loading.value = true;
      try {
        const response = await getTransacoes();
        if (response && response.data) {
          transacoes.value = response.data;
        } else {
          console.error("Erro: Resposta inesperada da API");
        }
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        $q.notify({
          type: "negative",
          message: "Erro ao carregar transações",
          icon: "error",
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      loading.value = true;
      try {
        await carregarUsuarios();
        await carregarTransacoes();
      } catch (error) {
        console.error("Erro ao carregar dados iniciais", error);
      } finally {
        loading.value = false;
      }
    });

    const calcularTotalReceitas = computed(() => {
      return transacoes.value
        .filter((t) => t.tipo === "receita")
        .reduce((acc, t) => acc + Number(t.valor), 0);
    });

    const calcularTotalDespesas = computed(() => {
      return transacoes.value
        .filter((t) => t.tipo === "despesa")
        .reduce((acc, t) => acc + Number(t.valor), 0);
    });

    const prepararDadosGrafico = computed(() => {

      const categorias = Array.from(
        new Set(transacoes.value.map((t) => t.descricao))
      );


      const dadosReceitas = [];
      const dadosDespesas = [];

      categorias.forEach((categoria) => {
        const totalReceitas = transacoes.value
          .filter((t) => t.descricao === categoria && t.tipo === "receita")
          .reduce((acc, t) => acc + Number(t.valor), 0);

        const totalDespesas = transacoes.value
          .filter((t) => t.descricao === categoria && t.tipo === "despesa")
          .reduce((acc, t) => acc + Number(t.valor), 0);

        dadosReceitas.push(totalReceitas);
        dadosDespesas.push(totalDespesas);
      });

      return {
        labels: categorias,
        datasets: [
          {
            label: "Receitas",
            data: dadosReceitas,
          },
          {
            label: "Despesas",
            data: dadosDespesas,
          },
        ],
      };
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeOutElastic",
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Valor (R$)",
            color: "#fff",
            font: {
              size: 16,
              weight: "bold",
              family: "Arial",
            },
          },
          grid: {
            drawBorder: false,
            color: "rgb(255, 255, 255,0.1)",
          },
          ticks: {
            stepSize: 200,
            color: "#fff",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 15,
            color: "#fff",
            padding: 20,
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.7)",
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              const value = context.raw;
              return `${label}: R$ ${value.toFixed(2)}`;
            },
          },
        },
        datalabels: {
          anchor: "end",
          align: "top",
          color: "#91A0A8",
          font: {
            size: 12,
            weight: "bold",
          },
          formatter: function (value) {
            return value !== 0 ? `R$ ${value.toFixed(2)}` : "";
          },
        },
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderWidth: 0,
          backgroundColor: (context) => {
            const color = context.datasetIndex === 0 ? "#4E7317" : "#730303";
            return color;
          },
          hoverBackgroundColor: (context) => {
            const color = context.datasetIndex === 0 ? "#8ED943" : "#F20707";
            return color;
          },
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          hadowBlur: 6,
          hadowColor: "rgba(0, 0, 0, 0.4)",
        },
      },
    };

    const adicionarTransacao = async (novaTransacao) => {
      if (
        !novaTransacao.descricao ||
        !novaTransacao.valor ||
        !novaTransacao.tipo
      ) {
        $q.notify({
          type: "negative",
          message: "Por favor, preencha todos os campos",
        });
        return;
      }

      loading.value = true;

      try {
        novaTransacao.data = formatarDataParaSQL(new Date());

        const response = await addTransacao(novaTransacao);
        if (response.status !== 201) {
          throw new Error("Erro ao adicionar transação no servidor.");
        }


        await carregarTransacoes();

        $q.notify({
          type: "positive",
          message: "Transação adicionada com sucesso!",
          icon: "check_circle",
        });


        formKey.value += 1;
      } catch (error) {
        console.error("Erro ao adicionar transação:", error);
        $q.notify({
          type: "negative",
          message: error.response?.data || "Erro ao adicionar transação",
          icon: "error",
        });
      } finally {
        loading.value = false;
      }
    };

    const deletarTransacao = async (id) => {
      if (!id) {
        console.error("Erro: ID da transação para deletar está ausente");
        return;
      }

      try {
        await deleteTransacao(id);

        await carregarTransacoes();

        $q.notify({
          type: "positive",
          message: "Transação deletada com sucesso!",
          icon: "check_circle",
        });
      } catch (error) {
        console.error("Erro ao deletar transação:", error);
        $q.notify({
          type: "negative",
          message: "Erro ao deletar transação",
          icon: "error",
        });
      }
    };

    const editarTransacao = (transacao) => {
      if (!transacao.id) {
        console.error("Erro: ID da transação está ausente.");
        return;
      }
      transacaoSelecionada.value = { ...transacao };
      mostrarModalEditar.value = true;
    };

    const salvarEdicaoTransacao = async () => {
      loading.value = true;
      try {
        console.log(
          "ID da transação para editar:",
          transacaoSelecionada.value.id
        );

        const transacaoAtualizada = {
          ...transacaoSelecionada.value,
          tipo:
            transacaoSelecionada.value.tipo.value ||
            transacaoSelecionada.value.tipo,
          data: formatarDataParaSQL(transacaoSelecionada.value.data),
        };

        const response = await updateTransacao(
          transacaoSelecionada.value.id,
          transacaoAtualizada
        );

        if (response.status !== 200) {
          throw new Error("Erro ao atualizar transação no servidor.");
        }

        await carregarTransacoes();

        $q.notify({
          type: "positive",
          message: "Transação editada com sucesso!",
          icon: "check_circle",
        });

        mostrarModalEditar.value = false;
      } catch (error) {
        console.error("Erro ao editar transação:", error);
        $q.notify({
          type: "negative",
          message: "Erro ao editar transação",
          icon: "error",
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      descricao,
      valor,
      tipo,
      nomeUsuario,
      tiposTransacao,
      transacoes,
      calcularTotalReceitas,
      calcularTotalDespesas,
      prepararDadosGrafico,
      chartOptions,
      formatarMoeda,
      adicionarTransacao,
      formKey,
      mostrarModalEditar,
      transacaoSelecionada,
      editarTransacao,
      salvarEdicaoTransacao,
      deletarTransacao,
      logout,
    };
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
}

.mensagem-boas-vindas {
  color: #ffffff;
  font-weight: bold;
  font-size: 1.8em;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.nome-usuario {
  font-weight: bold;
  color: #1399cf;
  font-size: 1.5em;
  margin-left: 5px;
}

.card-resumo {
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
}

.card-transacao {
  background-color: #2e3b55;
  border-radius: 12px;
  color: #ffffff;
}

.card-shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

.card-resumo:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.historico-transacao {
  background-color: #2e3b55;
  color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.formulario-transacao {
  max-width: 600px;
  margin: 0 auto;
}

.botao-sair {
  background-color: #1399cf !important;
  color: #ffffff !important;
  border-radius: 30px !important;
  padding: 8px 15px !important;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.botao-sair:hover {
  background-color: #36648b !important;
}

.botao-adicionar-transacao {
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.botao-adicionar-transacao:hover {
  background-color: #2e3b55;
}

.grafico-financeiro {
  margin-top: 20px;
  background-color: #2e3b55;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

.lista-transacoes {
  padding: 15px;
  border-radius: 10px;
}

.q-item-label {
  font-size: 1.1em;
  line-height: 1.4;
}

.botao-editar-transacao,
.botao-deletar-transacao {
  transition: color 0.3s ease;
}





.botao-editar-transacao:hover {
  color: #1565c0;
}

.botao-deletar-transacao:hover {
  color: #b71c1c;
}

.botao-salvar,
.botao-cancelar {
  border-radius: 6px;
}

.shadow-1,
.shadow-2,
.shadow-3 {
  transition: box-shadow 0.3s ease;
}

.shadow-1:hover,
.shadow-2:hover,
.shadow-3:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }

  .mensagem-boas-vindas {
    font-size: 1.2em;
  }

  .nome-usuario {
    font-size: 1.3em;
  }

  .card-resumo {
    height: 220px;
    margin-bottom: 10px;
  }

  .formulario-transacao {
    max-width: 100%;
  }

  .botao-sair {
    padding: 8px 15px;
  }
}
</style>
