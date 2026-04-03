# Bom Dia Segunda

## Current State
- Rodapé exibe 8 redes sociais (Instagram, Facebook, YouTube, LinkedIn, TikTok, Substack, Spotify, Kwai), nomes de cidades como links para `#vagas`
- Header tem botão de áudio (AudioPlayer) usando localStorage para src do áudio
- CMS tem aba `Áudio / Música` para upload de até 5 mp3

## Requested Changes (Diff)

### Add
- X (Twitter) e Threads como novas redes sociais no rodapé
- Componente `CidadePage` — página individual para cada cidade com fotos, informações socioeconômicas e turísticas
- Selo "CIDADE UNIVERSITÁRIA" para cidades com campus universitário (Resende, Volta Redonda, Barra Mansa, Três Rios, Vassouras, Paraíba do Sul, Valença)
- Roteamento simples por hash `#cidade-nome-da-cidade` para abrir a página da cidade
- Dados mockados de cada cidade: descrição, dados socioeconômicos, atrações turísticas, fotos (placeholder)

### Modify
- Rodapé: links das cidades passam a abrir a página da cidade em vez de `#vagas`
- App.tsx: adicionar rota para páginas de cidades
- Footer: adicionar X e Threads ao array `socialLinks`

### Remove
- Nada

## Implementation Plan
1. Atualizar `socialLinks` no Footer com X (Twitter) e Threads
2. Criar `src/frontend/src/data/cidades.ts` com dados das cidades (nome, descrição, pontos turísticos, dados socioeconômicos, é universitária)
3. Criar `src/frontend/src/components/CidadePage.tsx` com layout completo: banner, dados socioeconômicos, turismo, fotos, selo CIDADE UNIVERSITÁRIA condicional
4. Atualizar `Footer.tsx` para que os links de cidades usem hash `#cidade-nome-slug`
5. Atualizar `App.tsx` para detectar hash de cidade e renderizar `CidadePage`
