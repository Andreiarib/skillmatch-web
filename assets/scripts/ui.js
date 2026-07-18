export function renderVagas(vagasComMatch) {
  const grid = document.getElementById("jobGrid");
  grid.innerHTML = "";
  let melhor = 0;

  vagasComMatch.forEach(({ vaga, resultado }) => {
    console.log(vaga);
    const {
      classificacaoPercentual,
      requisitosAtendidos,
      requisitosNaoAtendidos,
      classificacao,
      classificacaoCSS,
    } = resultado;
    melhor = Math.max(melhor, classificacaoPercentual);

    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <div class="job-card-top">
          <div>
            <div class="job-title">${vaga.exibirResumo()}</div>
            <div class="job-area">${vaga.modalidade}</div>
          </div>
          <span class="match-badge">${classificacaoPercentual.toFixed(2)}%</span>  
        </div>

        <div class="scan-meter" aria-hidden="true">
          <div class="scan-meter-fill high" style="width:${classificacaoPercentual.toFixed(2)}%"></div>
        </div>

        <p class="job-desc">Requisitos: ${vaga.requisitos.join(", ")}</p>
        <div class="job-foot">

 <p>Requisitos não Atendidos: ${requisitosNaoAtendidos}</p>
</div>

        <div class="skill-list">
         
        </div>

        <div class="job-foot">
         <span>${classificacao}</span>
        <span>${requisitosAtendidos.length}/${vaga.requisitos.length} habilidades</span>
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
