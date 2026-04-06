# Bom Dia Segunda

## Current State

Plataforma de vagas de emprego com header fixo (sem link para Shopping), vagas mockadas com links genéricos, estatísticas fixas não calculadas a partir das vagas reais, dois botões de paginação redundantes ('Ver mais vagas' duplicado), e seção de concursos com dados fictícios.

## Requested Changes (Diff)

### Add
- Link "Shopping" no menu de navegação do header (desktop e mobile), apontando para `#loja`

### Modify
- Vagas em mockData.ts: expandir pool para 20+ vagas reais com links funcionais para portais reais (Gupy, LinkedIn, SINE, Catho, Vagas.com, páginas trabalhe conosco de empresas reais da região)
- Estatísticas em Estatisticas.tsx: calcular os números dinamicamente a partir das vagas reais do mockData (total de vagas, CLT, PCD, % por escolaridade, tipo de contratação, habilidades top, vagas por cidade)
- Componente de Concursos: substituir dados fictícios por concursos reais com datas em 2026 (MP RJ, Polícia Civil RJ, Bombeiros RJ, Saquarema, Angra dos Reis, UniRio, Delegado RJ, IBGE, Teatro Municipal RJ, SES RJ, TRF 2ª Região)
- Vagas.tsx: remover qualquer botão duplicado, manter APENAS o botão "Carregar mais vagas"

### Remove
- Botão "Ver mais vagas" duplicado — manter apenas "Carregar mais vagas" com texto consistente

## Implementation Plan

1. Header.tsx — adicionar `{ label: "Shopping", href: "#loja" }` ao array navLinks
2. mockData.ts — ampliar JOBS para 20+ vagas reais com applyUrl funcionais
3. Estatisticas.tsx — importar JOBS e calcular stats dinamicamente
4. Vagas.tsx — garantir que o único botão de paginação seja "Carregar mais vagas"
5. Criar/atualizar Concursos component com dados reais 2026
