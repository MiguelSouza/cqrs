# 🧱 CQRS API

API desenvolvida com foco em testes do padrão **CQRS (Command Query Responsibility Segregation)** utilizando Node.js, Express, PostgreSQL e Elasticsearch.

A ideia principal do projeto é entender como separar **operações de leitura** e **escrita** em aplicações mais complexas, mantendo o código organizado, performático e pronto para escalar.

---

## 🚀 Tecnologias utilizadas

- **Node.js + TypeScript**
- **Express**
- **PostgreSQL** (para persistência dos comandos)
- **Elasticsearch** (para consultas rápidas)
- **Docker Compose** (ambiente local)
- **CommandBus / QueryBus / EventBus** (implementação própria)

---

## 📌 Sobre o projeto

A aplicação simula um sistema de pedidos onde:

- **POST /orders** grava um pedido no banco relacional (Command)
- **GET /orders/customer/:id** consulta os pedidos no Elasticsearch (Query)
- Um **EventBus** projeta o dado após criação para leitura otimizada

Tudo isso foi separado em camadas para testar na prática os conceitos de **responsabilidade única**, **desacoplamento de handlers** e uso de eventos para projeção.

---

## 🟢 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/cqrs.git
cd cqrs
```
