---
description: Melhora o visual do frontend do DMS aplicando Tailwind CSS 3.
name: melhorar-visual
argument-hint: componente ou tela alvo (ex. todo o frontend, DocumentList)
agent: ui-designer
---

# Melhorar o visual com Tailwind CSS 3

Melhore a aparência de `${input:alvo:componente ou tela alvo (ex. todo o frontend)}`
no frontend React + Vite, usando Tailwind CSS 3.

## Configuração esperada

- Instale `tailwindcss@3`, `postcss` e `autoprefixer` como devDependencies em
  `frontend/`.
- Crie `frontend/tailwind.config.js` com `content: ['./index.html',
  './src/**/*.{js,jsx}']` e `frontend/postcss.config.js` com os plugins padrão.
- Crie `frontend/src/index.css` com as três diretivas do Tailwind e importe-o em
  `frontend/src/main.jsx`.
- Se a configuração já existir, apenas reaproveite.

## Resultado esperado na interface

- Cabeçalho com o título "Document Management System" e um subtítulo curto.
- Área de upload em card, com botão de envio destacado e feedback de sucesso e
  de erro.
- Lista de documentos em cards ou tabela responsiva, exibindo nome original,
  tamanho e data de envio.
- Botão de download com estilo secundário consistente.
- Mensagem amigável quando não houver documentos.
- Mensagens de erro em destaque, preservando `role="alert"`.

## Restrições

- Não altere o backend nem os contratos das rotas `/api/upload`,
  `/api/documents` e `/api/documents/:id/download`.
- Não mude a lógica de estado nem as chamadas de `services/documentApi.js`.
- Substitua estilos inline por utilitários do Tailwind.
- Mantenha os textos da interface em português e os nomes de código em inglês.

## Validação

- Execute `npm run build` em `frontend/` e garanta que o build passa.
