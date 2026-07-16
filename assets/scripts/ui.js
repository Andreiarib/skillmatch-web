export function renderVagas(vagas) {
  const grid = document.getElementById("jobGrid");
  grid.innerHTML = "";
  let melhor = 0;

  vagas.forEach((vaga) => {
    console.log(vaga.vaga.empresa);
    const { percentual, requisitosMatch } = 50;
    melhor = Math.max(melhor, percentual);
    const nivel = 50;

    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <div class="job-card-top">
          <div>
            <div class="job-title">${vaga.vaga.titulo}</div>
            <div class="job-area">${vaga.vaga.empresa}</div>
          </div>
          <span class="match-badge ${nivel}">${percentual}%</span>
        </div>

        <div class="scan-meter" aria-hidden="true">
          <div class="scan-meter-fill ${nivel}" style="width:${percentual}%"></div>
        </div>

        <p class="job-desc">${vaga.vaga.titulo}</p>

        <div class="skill-list">
         
        </div>

        <div class="job-foot">
          <span>requisitos: ${vaga.vaga.requisitos}</span>
                 </div>
      `;

    grid.appendChild(card);
  });
  document.getElementById("statMelhorMatch").textContent = melhor + "%";
}

//submit
export function initFormulario(candidatoAtual, onSubmit) {
  const form = document.getElementById("candidateForm");

  // preenche TODOS os campos com os dados do candidato atual
  document.getElementById("nome").value = candidatoAtual.nome;
  document.getElementById("area").value = candidatoAtual.area;
  document.getElementById("habilidades").value =
    candidatoAtual.habilidades.join(", ");
  document.getElementById("experiencia").value =
    candidatoAtual.experienciaMeses;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const novoCandidato = {
      nome: document.getElementById("nome").value,
      area: document.getElementById("area").value,
      habilidades: document
        .getElementById("habilidades")
        .value.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      experienciaMeses: Number(document.getElementById("experiencia").value),
    };

    onSubmit(novoCandidato);
  });
}
