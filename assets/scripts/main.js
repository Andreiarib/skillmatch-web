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
  renderCarregando,
  renderErro,
  renderVazio,
  limparStatus,
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
  renderCarregando(); // 1. ESTADO: carregando

  try {
    vagas = await getVagas();

    if (vagas.length === 0) {
      renderVazio("Nada encontrado. Nenhuma vaga está disponível no momento."); // 2. ESTADO: vazio
    } else {
      limparStatus();
      atualizarTela(); // caminho normal (sucesso) — não é um dos 3 estados tratados
    }
  } catch (error) {
    renderErro(
      "Não foi possível carregar as vagas. Verifique sua conexão e tente novamente.",
    ); // 3. ESTADO: erro
  }

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
  candidato = candidatoPadrao;
  removerCandidatoSalvo();
  limparFormulario();
  atualizarTela();
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

  renderResumoCandidato(candidato);
  renderVagas(vagasComMatch);

  renderDestaque(
    vagaMaisCompativel,
    sugestoesEstudo,
    candidato.experienciaMeses,
  );
}

init();
