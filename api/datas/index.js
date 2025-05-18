const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

export async function POST(req) {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data || typeof data !== "string") {
      return new Response(
        JSON.stringify({ erro: "Data não fornecida" }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    const dataObj = new Date(data);
    
    if (isNaN(dataObj.getTime())) {
      return new Response(
        JSON.stringify({ erro: "Data inválida" }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    const diaSemana = dataObj.getDay();
    const diaMes = dataObj.getDate();

    return new Response(
      JSON.stringify({
        dia: diaSemana.toString(),
        dia_semana: DIAS_SEMANA[diaSemana],
        dia_mes: diaMes
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ erro: "Erro ao processar a requisição" }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
}

// Handler para a Vercel
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (req.method === 'POST') {
    const response = await POST(req);
    return res.status(response.status).json(JSON.parse(response.body));
  }

  return res.status(405).json({ erro: 'Método não permitido' });
} 