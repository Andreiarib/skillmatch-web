export function renderVagas(vagas) {
  const grid = document.getElementById("jobGrid");
  grid.innerHTML = "";
  let melhor = 0;

  vagas.forEach((vaga) => {
    const { percentual, requisitosMatch } = 50;
    melhor = Math.max(melhor, percentual);
    const nivel = 50;

    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <div class="job-card-top">
          <div>
            <div class="job-title">${vaga.titulo}</div>
            <div class="job-area">${vaga.area}</div>
          </div>
          <span class="match-badge ${nivel}">${percentual}%</span>
        </div>

        <div class="scan-meter" aria-hidden="true">
          <div class="scan-meter-fill ${nivel}" style="width:${percentual}%"></div>
        </div>

        <p class="job-desc">${vaga.descricao}</p>

        <div class="skill-list">
         
        </div>

        <div class="job-foot">
          <span>experiência mínima: ${vaga.experienciaMinima} meses</span>
          <span>/${vaga.habilidades.length} habilidades</span>
        </div>
      `;

    grid.appendChild(card);
  });
  document.getElementById("statMelhorMatch").textContent = melhor + "%";
}
