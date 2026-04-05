# Bom Dia Segunda

## Current State
- Vagas exibidas 9 por vez (visibleCount = 9), incrementando 9 a cada clique em "Carregar mais"
- Datas das vagas no formato texto livre (ex: "30/03/2026" strings fixas nos mockData)
- Vagas são dados estáticos do mockData.ts, não buscam fontes reais
- Seção de blog existe, sem categoria de concursos
- mockData tem 9 vagas com datas mistas e sem padrão DD/MM/AAAA consistente
- Botão "Ver mais vagas" existe mas mostra 9 por clique

## Requested Changes (Diff)

### Add
- Seção CONCURSOS em carrossel, inserida entre a seção LOJA (Bomdiasegunda Shopping) e o Blog (MERCADO & TRABALHO)
- Concursos em carrossel automático com navegação manual, exibindo: título, órgão, cidade/estado, prazo de inscrição, vagas disponíveis, nível, remuneração, badge (novo, encerramento próximo), link de inscrição
- Dados mockados realistas de concursos públicos disponíveis nas 25 cidades (prefeituras, governos estaduais, federal, autarquias) com datas no formato DD/MM/AAAA
- Novo tipo de dado `Contest` no mockData.ts com campos completos

### Modify
- Vagas: alterar `visibleCount` inicial de 9 para **12** (mostrar 12 por vez)
- Botão "Ver mais vagas" carrega mais **12** por clique (era 9)
- Todas as datas das vagas no mockData devem seguir o formato **DD/MM/AAAA** (ex: "05/04/2026")
- Deadline das vagas: manter formato DD/MM/AAAA em todos os lugares
- Expandir mockData com vagas mais realistas, buscadas de fontes conhecidas das 25 cidades (CSN, Michelin, Hyundai, Prefeituras, hospitais regionais, SINE, Gupy, LinkedIn, Catho, InfoJobs, Indeed, Vagas.com, CIEE) com URLs reais dos portais de vagas
- Modal de detalhes de vaga: exibir data de publicação/período no formato DD/MM/AAAA
- getWeekPeriod(): já retorna no formato pt-BR, verificar e garantir consistência DD/MM/AAAA
- Comentário no CMS sobre coleta de fontes: incluir sites de trabalhe conosco das empresas das 25 cidades

### Remove
- Nenhum elemento removido

## Implementation Plan
1. Atualizar mockData.ts:
   - Aumentar pool de vagas para ~20+ vagas com datas realistas no formato DD/MM/AAAA (usando datas de 2026 próximas ao dia atual)
   - Garantir que `deadline` esteja sempre em DD/MM/AAAA
   - Adicionar interface `Contest` e array `CONTESTS` com 8-10 concursos públicos realistas das 25 cidades (prefeituras, Governo RJ, federal, SESI, SENAI, hospitais públicos, autarquias)

2. Atualizar Vagas.tsx:
   - Alterar `visibleCount` inicial para `12`
   - Alterar incremento do botão "Ver mais" de `+9` para `+12`
   - Texto do botão: "Ver mais vagas" (manter)
   - Garantir que datas exibidas no card e no modal sigam DD/MM/AAAA

3. Criar componente Concursos.tsx:
   - Seção com título "CONCURSOS" (maiúsculo, estilo similar ao blog)
   - Subtítulo: "Oportunidades no setor público para a sua região"
   - Carrossel automático (intervalo 5s) com navegação por setas e pontos
   - Card de concurso: título, órgão (vermelho), cidade/UF, prazo de inscrição (DD/MM/AAAA), nº de vagas, nível, remuneração, badge "Novo" ou "Encerra em breve", botão "Ver edital" (abre link em nova aba)
   - 3 cards visíveis em desktop, 1 em mobile

4. Atualizar App.tsx:
   - Importar e inserir `<Concursos />` entre `<Loja />` e `<Blog />`
