import { getVagas } from "./dados.js";
import {
  renderVagas,
  initFormulario,
  renderDestaque,
  renderResumoCandidato,
} from "./ui.js";
import {
  compatibilidade,
  encontrarVagaMaisCompativel,
  gerarSugestoesEstudo,
} from "./motor.js";

let vagas = [];
let candidato = {
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
