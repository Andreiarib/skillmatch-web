let vagaMaisCompativel = null;
let sugestoesEstudo = [];

// Recebe as vagas já com compatibilidade calculada
// e devolve a vaga com maior percentual
export function encontrarVagaMaisCompativel(compatibilidades) {
  if (compatibilidades.length === 0) return null;

  return compatibilidades.reduce(
    (melhor, atual) =>
      atual.classificacaoPercentual > melhor.classificacaoPercentual
        ? atual
        : melhor,
    compatibilidades[0],
  ); // valor inicial evita bug com array pequeno
}

// Recebe as vagas já com compatibilidade calculada
// e devolve um array único (sem repetição) de habilidades que faltam
export function gerarSugestoesEstudo(compatibilidades) {
  const sugestoes = [];

  compatibilidades.forEach((objCompatibilidade) => {
    objCompatibilidade.requisitosNaoAtendidos.forEach((sugestao) => {
      if (!sugestoes.includes(sugestao)) {
        sugestoes.push(sugestao);
      }
    });
  });

  return sugestoes;
}

// Função para calcular a compatibilidade com cada vaga

export function compatibilidade(vaga, habilidades) {
  const requisitosAtendidos = vaga.requisitos.filter((habilidade) =>
    habilidades.includes(habilidade),
  );

  const requisitosNaoAtendidos = vaga.requisitos.filter(
    (habilidade) => !habilidades.includes(habilidade),
  );

  //Classificar compatibilidade conforme percentual
  let classificacao = "";
  let classificacaoCSS = "";
  const classificacaoPercentual = calcularCompatibilidade(
    requisitosAtendidos.length,
    vaga.requisitos.length,
  );
  if (classificacaoPercentual >= 80 && classificacaoPercentual <= 100) {
    classificacao = "Alta compatibilidade";
    classificacaoCSS = "high";
  } else if (classificacaoPercentual >= 50 && classificacaoPercentual <= 79) {
    classificacao = "Média compatibilidade";
    classificacaoCSS = "mid";
  } else {
    classificacao = "Baixa compatibilidade";
    classificacaoCSS = "low";
  }

  const candidatoCompatibilidade = {
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    classificacaoPercentual: classificacaoPercentual,
    requisitosAtendidos: requisitosAtendidos,
    requisitosNaoAtendidos: requisitosNaoAtendidos,
    classificacao: classificacao,
    classificacaoCSS: classificacaoCSS,
  };
  return candidatoCompatibilidade;
}

export function calcularCompatibilidade(requisitosAtendidos, requisitosDaVaga) {
  return (requisitosAtendidos / requisitosDaVaga) * 100;
}
