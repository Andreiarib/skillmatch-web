import {
  getVagas,
  salvarCandidato,
  carregarCandidatoSalvo,
  removerCandidatoSalvo,
} from "./dados.js";
import {
  renderVagas,
  initFormulario,
  renderDestaque,
  renderResumoCandidato,
  limparFormulario,
  initBotaoRemover,
} from "./ui.js";
import {
  compatibilidade,
  encontrarVagaMaisCompativel,
  gerarSugestoesEstudo,
} from "./motor.js";

let vagas = [];
const candidatoPadrao = {
  nome: "",
  area: "",
  habilidades: [],
  experienciaMeses: 0,
};

let candidato = carregarCandidatoSalvo() ?? candidatoPadrao;

async function init() {
  vagas = await getVagas();
  atualizarTela();
  initFormulario(candidato, atualizarCandidato);
  initBotaoRemover(limparCandidato);
}

function atualizarCandidato(novoCandidato) {
  candidato = novoCandidato;
  salvarCandidato(candidato);
  renderResumoCandidato(candidato);
  atualizarTela();
}

function limparCandidato() {
  removerCandidatoSalvo();
  atualizarTela();
  limparFormulario();
}

function atualizarTela() {
  const compatibilidades = vagas.map((vaga) =>
    compatibilidade(vaga, candidato.habilidades),
  );

  const vagaMaisCompativel = encontrarVagaMaisCompativel(compatibilidades);
  const sugestoesEstudo = gerarSugestoesEstudo(compatibilidades);
  const vagasComMatch = vagas.map((vaga, i) => ({
    vaga,
    resultado: compatibilidades[i],
  }));

  renderVagas(vagasComMatch);
  renderDestaque(vagaMaisCompativel, sugestoesEstudo);
}

init();
