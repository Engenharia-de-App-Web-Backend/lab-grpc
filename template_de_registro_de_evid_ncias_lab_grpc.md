# Registro de Evidências — Laboratório gRPC, Docker e Docker Compose

> **Instruções de preenchimento:** Substitua os blocos marcados com `[...]` pelas saídas reais do seu terminal, respostas JSON do Postman/curl ou prints de tela. Caso utilize imagens, salve-as em uma pasta `evidencias/` dentro do diretório da atividade e referencie-as com `![Descrição](./evidencias/nome-do-arquivo.png)`.

---

## Identificação

| Campo | Informação |
| :--- | :--- |
| **Nome do(a) Aluno(a)** | `[Seu Nome Completo]` |
| **Matrícula / RA** | `[Sua Matrícula]` |
| **Data de Execução** | `[DD/MM/AAAA]` |
| **Link da Pasta no GitHub** | `[https://github.com/usuario/lab-nome_do_aluno/tree/main/lab04]` |

---

## Etapa 1 — Porta de Entrada REST, Fluxo Unário e Server Streaming

### 1.1 Inicialização Local dos Serviços
Cole abaixo a saída do terminal confirmando o `servico-inventario` escutando na porta `50051` e o `servico-pedidos` na porta `3000`:

```text
[Colar aqui os logs de inicialização de ambos os serviços]
```

### 1.2 Validação Unary RPC (`POST /orders` ➔ `CheckStock`)
* **Requisição enviada:** `POST http://localhost:3000/orders`
* **Status HTTP retornado:** `[Ex.: 201 Created]`

```json
// Colar aqui a resposta JSON recebida no Postman/curl
```

*(Opcional) Print do Postman:*
`![Evidência Unary](./evidencias/etapa1-unary.png)`

### 1.3 Validação Server Streaming (`GET /orders/updates/:category` ➔ `StreamProductUpdates`)
* **Requisição enviada:** `GET http://localhost:3000/orders/updates/[categoria]`
* **Status HTTP retornado:** `[Ex.: 200 OK]`

```json
// Colar aqui a resposta JSON com a lista de eventos recebidos da stream
```

**Logs do recebimento sequencial no terminal (`servico-pedidos`):**
```text
[Colar aqui os logs mostrando cada evento chegando via call.on('data')]
```

---

## Etapa 2 — Client Streaming e Bidirectional Streaming

### 2.1 Geração do Lote Mock (`lote-produtos.json`)
Saída da execução de `node scripts/generate-batch.js`:

```text
[Colar aqui a saída do comando gerador dos 1.000 registros]
```

### 2.2 Validação Client Streaming (`POST /orders/batch-update` ➔ `UpdateStockBatch`)
* **Requisição enviada:** `POST http://localhost:3000/orders/batch-update`
* **Status HTTP retornado:** `[Ex.: 200 OK]`

```json
// Colar aqui a resposta JSON contendo total_processed (1000) e message
```

**Logs do servidor (`servico-inventario`):**
```text
[Colar aqui os logs evidenciando o processamento dos 1.000 itens em fluxo]
```

### 2.3 Validação Bidirectional Streaming (`POST /orders/live` ➔ `ProcessLiveOrders`)
* **Requisição enviada:** `POST http://localhost:3000/orders/live`
* **Status HTTP retornado:** `[Ex.: 200 OK]`

```json
// Colar aqui a resposta JSON com o retorno individualizado (order_id, status e message)
```

**Logs da troca simultânea de mensagens:**
```text
[Colar aqui os logs do servidor/cliente durante o fluxo bidirecional]
```

---

## Etapa 3 — Containerização Individual e Orquestração com Docker Compose

### 3.1 Build e Subida do Ambiente (`docker compose up --build`)
Cole abaixo o trecho final dos logs confirmando que ambos os contêineres subiram sem erros e se conectaram à rede `grpc-net`:

```text
[Colar aqui os logs do docker compose up --build]
```

### 3.2 Contêineres Ativos (`docker compose ps`)
Cole a saída completa do comando `docker compose ps` evidenciando os 2 contêineres em execução (`servico-inventario` e `servico-pedidos`):

```text
[Colar aqui a saída do comando: docker compose ps]
```

### 3.3 Revalidação das 4 Rotas em Contêineres (`http://localhost:3000`)
Marque e anexe a evidência (print ou saída de terminal/curl) comprovando que a comunicação gRPC ocorreu entre os contêineres (`servico-pedidos` ➔ `servico-inventario:50051`):

- [ ] `POST /orders` (Unary)
- [ ] `GET /orders/updates/:category` (Server Streaming)
- [ ] `POST /orders/batch-update` (Client Streaming — 1.000 itens)
- [ ] `POST /orders/live` (Bidirectional Streaming)

```text
[Colar aqui os logs do docker compose logs comprovando as chamadas gRPC entre os contêineres]
```

*(Opcional) Print da validação em contêiner:*
`![Evidência Docker Compose](./evidencias/etapa3-docker.png)`

---

## Checklist Final de Entrega

- [ ] `inventory.proto` atualizado com os 4 métodos RPC
- [ ] `servico-inventario/` sem a pasta `node_modules` e com `Dockerfile` próprio
- [ ] `servico-pedidos/` sem a pasta `node_modules` e com `Dockerfile` próprio
- [ ] `docker-compose.yml` na raiz da pasta da atividade
- [ ] `EVIDENCIAS.md` completamente preenchido e commitado na branch principal

---

## Observações / Dificuldades Encontradas *(Opcional)*

`[Descreva brevemente algum problema enfrentado durante o desenvolvimento ou na configuração do Docker/gRPC e como você o resolveu.]`