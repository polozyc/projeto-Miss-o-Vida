const pool = require("../config/database");

// Lista de chaves permitidas — protege contra gravação de chaves arbitrárias
const CHAVES_PERMITIDAS = [
  "telefone",
  "email",
  "endereco",
  "horario_atendimento",
  "pix_chave",
  "pix_tipo",
  "pix_qrcode_url",
  "instagram_url",
  "facebook_url",
  "impacto_pessoas",
  "impacto_cestas",
  "impacto_criancas"
];

async function buscarTodas() {
  const { rows } = await pool.query("SELECT chave, valor FROM configuracoes");
  // Transforma [{chave, valor}, ...] em { chave: valor, ... }, já garantindo
  // que todas as chaves conhecidas existam no objeto (mesmo que vazias),
  // para o frontend nunca lidar com "undefined".
  const mapa = {};
  for (const chave of CHAVES_PERMITIDAS) mapa[chave] = "";
  for (const row of rows) mapa[row.chave] = row.valor ?? "";
  return mapa;
}

async function atualizar(dados) {
  const entradas = Object.entries(dados).filter(([chave]) => CHAVES_PERMITIDAS.includes(chave));

  if (entradas.length === 0) {
    const err = new Error("Nenhuma configuração válida foi enviada.");
    err.status = 400;
    throw err;
  }

  // Upsert de cada chave enviada, em uma transação
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const [chave, valor] of entradas) {
      await client.query(
        `INSERT INTO configuracoes (chave, valor, atualizado_em)
         VALUES ($1, $2, NOW())
         ON CONFLICT (chave) DO UPDATE SET valor = $2, atualizado_em = NOW()`,
        [chave, valor ?? ""]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  return buscarTodas();
}

module.exports = { buscarTodas, atualizar, CHAVES_PERMITIDAS };
