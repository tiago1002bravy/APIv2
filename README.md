# API de Processamento de Datas

Esta API permite processar datas e retornar informações sobre o dia da semana. Implementada em Node.js e hospedada na Vercel.

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

## Deploy

Para fazer deploy na Vercel:
```bash
npm run deploy
# ou
yarn deploy
```

## Endpoint

### POST /api/weekday

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
    "nome_dia_semana": "Domingo",
    "numero_dia_semana": 0,
    "numero_dia_mes": 18
}
```

## Exemplo de Uso

```bash
curl -X POST "https://seu-dominio.vercel.app/api/weekday" \
     -H "Content-Type: application/json" \
     -d '{"data": "2025-05-18T18:05:47.934Z"}'
```

## Tecnologias Utilizadas

- Node.js
- Vercel
- date-fns (para manipulação de datas) 