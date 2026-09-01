# Especificação - Document Management System

## 1. Objetivo

Prover um sistema web simples para que usuários enviem, listem e baixem seus
documentos, com armazenamento estritamente local à aplicação.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário (identificação do dono do documento)

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Autenticação/autorização completas (login, senha, sessões)
- Edição ou exclusão de documentos

## 3. Requisitos funcionais

| ID    | Requisito                                                          |
| ----- | ------------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento informando um identificador de dono |
| RF-02 | O usuário pode listar os documentos enviados                        |
| RF-03 | O usuário pode baixar um documento pelo identificador                |
| RF-04 | O sistema associa cada documento enviado a um dono (`owner`)         |

## 4. Requisitos não funcionais

| ID     | Requisito                                                       |
| ------ | ---------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local via multer com diskStorage |
| RNF-02 | Metadados mantidos em memória nesta fase                         |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor)                |
| RNF-04 | Erros tratados nos limites do sistema (entrada HTTP, I/O de arquivos) |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                                              |
| ------------ | ------ | ------------------------------------------------------- |
| id           | string | Identificador único do documento                         |
| originalName | string | Nome original do arquivo enviado pelo usuário            |
| storedName   | string | Nome físico do arquivo gravado em `backend/storage`       |
| mimeType     | string | Tipo MIME do arquivo enviado                              |
| size         | number | Tamanho em bytes                                          |
| uploadedAt   | string | Data/hora do upload (ISO 8601)                             |
| owner        | string | Identificador do usuário dono                              |

## 6. Contratos de API

### POST /upload

- Entrada: `multipart/form-data` com campo de arquivo `file` e campo `owner`
- Saída (201): metadados do documento criado
  ```json
  {
    "id": "string",
    "originalName": "string",
    "size": 12345,
    "uploadedAt": "2026-09-01T12:00:00.000Z",
    "owner": "string"
  }
  ```
- Erros:
  - 400: nenhum arquivo enviado ou `owner` ausente
  - 500: falha ao gravar o arquivo no filesystem

### GET /documents

- Saída (200): lista de metadados de documentos
  ```json
  [
    { "id": "string", "originalName": "string", "size": 12345, "uploadedAt": "2026-09-01T12:00:00.000Z", "owner": "string" }
  ]
  ```

### GET /documents/:id/download

- Saída (200): conteúdo binário do arquivo, com headers `Content-Type` e
  `Content-Disposition: attachment; filename="<originalName>"`
- Erros:
  - 404: documento não encontrado

### Formato padrão de erro

```json
{ "error": "mensagem descritiva" }
```

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples: `routes -> controllers -> services -> repositories`,
  onde camadas internas não conhecem camadas externas.
- Upload de arquivos via `multer` com `diskStorage`, salvando em `backend/storage`;
  nenhum provedor externo de armazenamento é utilizado.
- Metadados dos documentos mantidos em memória (repository dedicado), sem banco
  de dados nesta fase; risco aceito: dados são perdidos ao reiniciar o servidor.
- Identificação do dono do documento (`owner`) é um identificador simples
  informado pelo cliente, sem autenticação completa (fora do escopo).
- Frontend em React com componentes funcionais e hooks, organizado em
  `components/`, `pages/` e `services/`, comunicando-se com o backend via
  `fetch` sob o prefixo `/api`.

## 8. Plano de execução

1. Implementar o repository de metadados em memória (`repositories/`)
2. Configurar o repository/armazenamento de arquivos com multer (`backend/storage`)
3. Implementar os services de upload, listagem e download (`services/`)
4. Implementar os controllers de upload, listagem e download (`controllers/`)
5. Definir as rotas `/upload`, `/documents` e `/documents/:id/download` (`routes/`)
6. Escrever testes backend com o runner nativo do Node (`node:test`)
7. Implementar os services de comunicação com a API no frontend (`services/`)
8. Implementar os componentes e páginas do frontend (`components/`, `pages/`)
