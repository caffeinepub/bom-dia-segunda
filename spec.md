# Bom Dia Segunda — CRM de Clientes da Loja

## Current State

O CMS já possui:
- Aba "Currículos" transformada em CRM completo com campos: nome, email, whatsapp, status (ativo/enviado/cancelado/excluído), relatórios HTML, proteção contra duplicidade por email
- Aba "Loja" com gestão de produtos (CRUD, habilitar/desabilitar, páginas de venda)
- Interface `Resume` com campos CRM já adicionados
- Sem nenhum cadastro de clientes compradores da loja

## Requested Changes (Diff)

### Add
- Nova interface `ShoppingCustomer` no `backend.d.ts` com: id, nome, email, whatsapp, telefone, cpf, endereco (logradouro, numero, complemento, bairro, cidade, estado, cep), produtoId, produtoNome, valorCompra, status, dataPedido, createdAt
- Nova sub-aba "Clientes" dentro da aba Loja do AdminPanel (ou nova aba "CRM Clientes" no sidebar)
- CRM de clientes com: contadores (Total, Pedidos Ativos, Concluídos, Cancelados), busca por nome/email/CPF, filtro por status
- Tabela com: Nome, E-mail, WhatsApp/Telefone, CPF, Produto, Valor, Status, Data
- Botões por linha: Concluído (verde), Cancelado (laranja), Excluir (vermelho) — excluir mantém registro sem dados de pagamento
- Modal de detalhes com endereço completo, produto comprado e histórico
- Aproveitamento dos dados do CRM de currículos: na tela de clientes, se o email já existir em Resume, exibir badge "Já avaliou currículo" com link para o registro
- Botão no modal de detalhes do cliente para "Ver currículo" se o candidato existir no CRM de currículos
- Proteção contra duplicidade: mesmo email + mesmo produto = não permite duplo cadastro
- Novos métodos no `backendInterface`: saveShoppingCustomer, getAllShoppingCustomers, updateShoppingCustomerStatus, deleteShoppingCustomerData

### Modify
- `LojaTab` no AdminPanel: adicionar sub-tabs (duas abas internas: "Produtos" e "Clientes")
- Sidebar SIDEBAR_ITEMS: manter "Loja" mas a aba agora tem sub-navegação interna

### Remove
- Nada removido

## Implementation Plan

1. Adicionar interface `ShoppingCustomer` no `backend.d.ts` + novos métodos no `backendInterface`
2. Modificar `LojaTab` para ter dois sub-tabs: "Produtos" (existente, inalterado) e "Clientes" (novo CRM)
3. Implementar `ClientesCRMTab` como componente interno ao `LojaTab`
4. Lógica de aproveitamento de dados: verificar se email do cliente existe no Resume CRM e exibir badge
