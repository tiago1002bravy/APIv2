import { NextResponse } from 'next/server';

const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

export async function POST(request) {
  console.log('=== Nova Requisição POST ===');
  
  try {
    // Log do corpo da requisição
    const rawBody = await request.text();
    console.log('Body recebido:', rawBody);

    let body;
    try {
      body = JSON.parse(rawBody);
      console.log('Body parseado:', body);
    } catch (e) {
      console.error('Erro ao fazer parse do JSON:', e);
      return NextResponse.json(
        { erro: "JSON inválido", detalhes: e.message },
        { status: 400 }
      );
    }

    const { data } = body;
    console.log('Data recebida:', data);

    if (!data || typeof data !== "string") {
      console.log('Data não fornecida ou inválida');
      return NextResponse.json(
        { erro: "Data não fornecida ou inválida", valor_recebido: data },
        { status: 400 }
      );
    }

    const dataObj = new Date(data);
    console.log('Data convertida:', dataObj);
    
    if (isNaN(dataObj.getTime())) {
      console.log('Data inválida após conversão');
      return NextResponse.json(
        { erro: "Data inválida", valor_recebido: data },
        { status: 400 }
      );
    }

    const diaSemana = dataObj.getDay();
    const diaMes = dataObj.getDate();
    console.log('Dia da semana:', diaSemana, 'Dia do mês:', diaMes);

    const response = {
      dia: diaSemana.toString(),
      dia_semana: DIAS_SEMANA[diaSemana],
      dia_mes: diaMes
    };
    console.log('Resposta:', response);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erro não tratado:', error);
    return NextResponse.json(
      { 
        erro: "Erro ao processar a requisição",
        detalhes: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  console.log('=== Requisição OPTIONS ===');
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 