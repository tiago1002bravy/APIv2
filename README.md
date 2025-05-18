# APIv2 - Coleção de APIs Úteis

Este repositório contém uma coleção de APIs úteis, cada uma com sua própria funcionalidade específica.

## APIs Disponíveis

### 1. API de Datas
Endpoint: `https://apisv2-mdgcvxb2b-bravy.vercel.app/weekdays`

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

**Exemplo de Uso:**
```bash
curl -X POST "https://apisv2-mdgcvxb2b-bravy.vercel.app/weekdays" \
     -H "Content-Type: application/json" \
     -d '{"data": "2025-05-18T18:05:47.934Z"}'
```

## Estrutura do Projeto

```
api/
├── datas/           # API de processamento de datas
│   └── index.js     # Endpoint /weekdays
└── ...             # Outras APIs serão adicionadas aqui
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

## Deploy

Para fazer deploy na Vercel:
```bash
npm run deploy
# ou
yarn deploy
```

## Como Adicionar uma Nova API

1. Crie um novo diretório em `api/` com o nome da sua API
2. Crie um arquivo `index.js` dentro do diretório
3. Adicione a rota no arquivo `vercel.json`
4. Documente a API no README.md

## Tecnologias Utilizadas

- Node.js
- Vercel
- date-fns (para manipulação de datas) 