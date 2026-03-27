# Bom Dia Segunda

## Current State
Aplicação one-page com Header, Vagas, Estatísticas, Avaliador, Loja, Blog, Depoimentos, Mentoria, Contato e Footer. O botão "Publicar Vaga" existe no Header mas não tem ação configurada (não abre nenhuma página/formulário).

## Requested Changes (Diff)

### Add
- Novo componente `PublicarVaga.tsx`: página/modal de formulário ativada pelo botão "Publicar Vaga" no Header
- Formulário em duas seções:
  1. **Dados da Empresa** (salvos em localStorage para reutilização futura): Razão Social, CNPJ, Endereço Completo, Telefone de Contato, Responsável pela Vaga, WhatsApp do Responsável
  2. **Informações da Vaga** (sempre preenchidas novamente): Título do Cargo, Tipo de Contratação (Efetiva/Temporária/Estágio/Menor Aprendiz/Remota/PCD), Cidade, Faixa Salarial, Descrição Detalhada do Cargo, Requisitos, Prazo de Inscrição
- Checkbox de autorização LGPD obrigatório: "Autorizo o uso dos dados fornecidos para divulgação da vaga na plataforma Bom Dia Segunda, conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)."
- Ao carregar o formulário, se houver dados de empresa no localStorage, eles são preenchidos automaticamente com banner informativo "Dados da empresa carregados do seu último cadastro"
- Botão "Limpar dados da empresa" para apagar os dados salvos
- Após envio bem-sucedido: mensagem de confirmação com aviso de que a vaga será revisada antes da publicação
- Dados de vagas enviadas armazenados no backend (Motoko)

### Modify
- `Header.tsx`: botão "Publicar Vaga" passa a abrir a página PublicarVaga via hash `#publicar-vaga` ou state
- `App.tsx`: roteamento para exibir PublicarVaga quando o hash/state indicar

### Remove
- Nada removido

## Implementation Plan
1. Criar `PublicarVaga.tsx` com formulário completo em duas seções, localStorage para dados de empresa, LGPD checkbox, validação de campos obrigatórios e feedback de envio
2. Atualizar `Header.tsx` para que o botão "Publicar Vaga" navegue para `#publicar-vaga`
3. Atualizar `App.tsx` para escutar o hash `#publicar-vaga` e exibir o componente PublicarVaga em tela cheia (como AdminPanel)
4. Armazenar vagas submetidas via backend actor (addVagaSubmissao)
