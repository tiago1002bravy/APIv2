const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responder a requisições OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Verificar método
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { data } = req.body;

    if (!data || typeof data !== "string") {
      return res.status(400).json({ 
        erro: "Data não fornecida ou inválida",
        valor_recebido: data 
      });
    }

    const dataObj = new Date(data);
    
    if (isNaN(dataObj.getTime())) {
      return res.status(400).json({ 
        erro: "Data inválida",
        valor_recebido: data 
      });
    }

    const diaSemana = dataObj.getDay();
    const diaMes = dataObj.getDate();

    return res.status(200).json({
      dia: diaSemana.toString(),
      dia_semana: DIAS_SEMANA[diaSemana],
      dia_mes: diaMes
    });

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ 
      erro: "Erro ao processar a requisição",
      detalhes: error.message
    });
  }
} 