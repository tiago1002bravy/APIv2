const { format, parseISO, getDay, getDate } = require('date-fns');
const { ptBR } = require('date-fns/locale');

module.exports = async (req, res) => {
  console.log('Método:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // Configurar CORS de forma mais permissiva para debug
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    console.log('Respondendo a OPTIONS');
    res.status(200).end();
    return;
  }

  // Verificar se é uma requisição POST
  if (req.method !== 'POST') {
    console.log('Método não permitido:', req.method);
    return res.status(405).json({ 
      error: 'Método não permitido',
      method: req.method,
      allowed: 'POST'
    });
  }

  try {
    const { data } = req.body;
    console.log('Data recebida:', data);

    if (!data) {
      console.log('Data não fornecida');
      return res.status(400).json({ error: 'Data não fornecida' });
    }

    // Converter a string de data para objeto Date
    const dataObj = parseISO(data);
    console.log('Data convertida:', dataObj);

    // Verificar se a data é válida
    if (isNaN(dataObj.getTime())) {
      console.log('Data inválida:', data);
      return res.status(400).json({ error: 'Formato de data inválido' });
    }

    // Mapeamento dos dias da semana em português
    const diasSemana = {
      0: 'Domingo',
      1: 'Segunda-feira',
      2: 'Terça-feira',
      3: 'Quarta-feira',
      4: 'Quinta-feira',
      5: 'Sexta-feira',
      6: 'Sábado'
    };

    // Obter o número do dia da semana (0-6, onde 0 é domingo)
    const numeroDiaSemana = getDay(dataObj);
    console.log('Número do dia da semana:', numeroDiaSemana);

    const response = {
      nome_dia_semana: diasSemana[numeroDiaSemana],
      numero_dia_semana: numeroDiaSemana,
      numero_dia_mes: getDate(dataObj)
    };
    console.log('Resposta:', response);

    // Retornar a resposta
    return res.status(200).json(response);

  } catch (error) {
    console.error('Erro detalhado:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
}; 