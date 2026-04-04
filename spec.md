# Bom Dia Segunda

## Current State
- AudioPlayer no header usa src estático `/assets/audio/tema-bomdiasegunda.mp3`
- CMS tem aba Imagens mas sem seção de áudio/música
- Páginas de cidades vêm de `src/frontend/src/data/cidades.ts` com dados estáticos
- Não existe aba "Cidades" no CMS para editar fotos e informações manualmente

## Requested Changes (Diff)

### Add
- Copiar o arquivo MP3 enviado para `public/assets/audio/tema-bomdiasegunda.mp3` para que o AudioPlayer o reproduza
- Adicionar tab `"audio"` no CMS (AdminPanel) com gerenciamento de até 5 arquivos MP3, seleção do ativo
- Adicionar tab `"cidades"` no CMS com CRUD completo para editar: nome, descrição, população, PIB, IDHM, área, economia, turismo, pontos históricos, gastronomia, foto, selo universitária e lista de universidades

### Modify
- `AudioPlayer.tsx`: aceitar `audioSrc` dinâmico via contexto/localStorage (CMS salva o src ativo)
- `cidades.ts`: corrigir informações incorretas conforme dados verídicos (ex: PopulaçÃo, PIB, universidades, etc.)
- `AdminPanel.tsx`: adicionar `"audio"` e `"cidades"` aos tipos Tab e SIDEBAR_ITEMS, com renderização dos novos tabs

### Remove
- Nada a remover

## Implementation Plan
1. Copiar MP3 para `src/frontend/public/assets/audio/tema-bomdiasegunda.mp3`
2. Corrigir dados verídicos em `cidades.ts` (populações, PIBs, universidades reais)
3. Atualizar `AudioPlayer.tsx` para ler src do localStorage (key: `bds_audio_src`)
4. Atualizar `AdminPanel.tsx`: adicionar tab `audio` com lista de até 5 MP3s, ativo selecionado, salvo em localStorage; adicionar tab `cidades` com lista de cidades editáveis (campos: nome, descrição, população, PIB, IDHM, área, economia, turismo[], pontosHistoricos[], gastronomia, fotoDescricao, universitária, universidades[])
