import { Vaga, VagaFrontEnd } from "./models.js";

export async function getVagas() {
  try {
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
  } catch (error) {
    console.error("Fetch operations failed:", error);
    return [];
  }
}
