import { getVagas } from "./dados.js";
import { renderVagas } from "./ui.js";

let vagas = [];

async function init() {
  // 1. Carrega os dados
  vagas = await getVagas();
  console.log(vagas + "teste");

  renderVagas(vagas);
}
init();
