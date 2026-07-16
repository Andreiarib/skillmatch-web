import { getVagas } from "./dados.js";
import { renderVagas, initFormulario } from "./ui.js";
import {
  compatibilidade,
  encontrarVagaMaisCompativel,
  gerarSugestoesEstudo,
} from "./motor.js";

let vagas = [];
const candidato = {
  nome: "",
  area: "",
  habilidades: [],
  experienciaMeses: 0,
};
async function init() {
  vagas = await getVagas();
  atualizarTela();
  initFormulario(candidato, atualizarCandidato);
}

function atualizarCandidato(novoCandidato) {
  candidato = novoCandidato;
  atualizarTela();
}

function limparCandidato() {
  removerCandidatoSalvo();
  candidato = candidatoPadrao;
  atualizarTela();
  limparFormulario();
}

function atualizarTela() {
  const compatibilidades = vagas.map((vaga) =>
    compatibilidade(vaga, candidato.habilidades),
  );

  const vagaMaisCompativel = encontrarVagaMaisCompativel(compatibilidades);

  const vagasComMatch = vagas.map((vaga, i) => ({
    vaga,
    resultado: compatibilidades[i],
  }));

  renderVagas(vagasComMatch);
}

init();
