# APIv2 - Coleção de APIs Úteis

Este repositório contém uma coleção de APIs úteis, cada uma com sua própria funcionalidade específica.

## APIs Disponíveis

### 1. API de Datas
Endpoint: `https://apisv2.vercel.app/api/weekdays`

Processa uma data e retorna informações sobre o dia da semana.

**Request Body:**
```json
{
    "data": "2025-05-18T18:05:47.934Z"
}
```

**Response:**
```json
{
    "dia": "0",
    "dia_semana": "Domingo",
    "dia_mes": 18
}
```

**Exemplo de Uso:**
```bash
curl -X POST "https://apisv2.vercel.app/api/weekdays" \
     -H "Content-Type: application/json" \
     -d '{"data": "2025-05-18T18:05:47.934Z"}'
```

## Estrutura do Projeto

```
pages/
└── api/
    └── weekdays.js    # Endpoint /api/weekdays
```

## Requisitos

- Node.js 14.x ou superior
- npm ou yarn

## Instalação

1. Clone este repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Desenvolvimento Local

Para executar a API localmente:
```bash
npm run dev
# ou
yarn dev
```

A API estará disponível em `http://localhost:3000/api/weekdays`

## Deploy

O deploy é automático na Vercel quando há push para a branch main.

## Tecnologias Utilizadas

- Next.js
- Vercel
- Node.js 