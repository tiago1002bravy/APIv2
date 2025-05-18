const { format, parseISO, getDay, getDate } = require('date-fns');
const { ptBR } = require('date-fns/locale');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Verificar se é uma requisição POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data não fornecida' });
    }

    // Converter a string de data para objeto Date
    const dataObj = parseISO(data);

    // Verificar se a data é válida
    if (isNaN(dataObj.getTime())) {
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

    // Retornar a resposta
    return res.status(200).json({
      nome_dia_semana: diasSemana[numeroDiaSemana],
      numero_dia_semana: numeroDiaSemana,
      numero_dia_mes: getDate(dataObj)
    });

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 