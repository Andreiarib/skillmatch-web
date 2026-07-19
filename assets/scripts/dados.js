// dados.js
import { Vaga, VagaFrontEnd } from "./models.js";

export async function getVagas() {
  const response = await fetch("assets/dados/vagas.json");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.map((v) =>
    v.nivel
      ? new VagaFrontEnd(
          v.id,
          v.empresa,
          v.titulo,
          v.requisitos,
          v.salario,
          v.modalidade,
          v.nivel,
        )
      : new Vaga(
          v.id,
          v.empresa,
          v.titulo,
          v.requisitos,
          v.salario,
          v.modalidade,
        ),
  );
}

//Criar candidato no localstorage
const CHAVE_CANDIDATO = "candidato";

export function salvarCandidato(candidato) {
  localStorage.setItem(CHAVE_CANDIDATO, JSON.stringify(candidato));
}

export function carregarCandidatoSalvo() {
  const salvo = localStorage.getItem(CHAVE_CANDIDATO);
  return salvo ? JSON.parse(salvo) : null;
}

export function removerCandidatoSalvo() {
  localStorage.removeItem(CHAVE_CANDIDATO);
}
