import api from "./api";

export async function getTransacoes() {
  return api.get("/transacoes");
}

export async function addTransacao(transacao) {
  return api.post("/transacoes", transacao);
}

export async function updateTransacao(id, transacao) {
  return api.put(`/transacoes/${id}`, transacao);
}

export async function deleteTransacao(id) {
  return api.delete(`/transacoes/${id}`);
}
