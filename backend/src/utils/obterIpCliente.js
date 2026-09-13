/**
 * Resolve o IP real do cliente para uso como chave nos rate limiters.
 *
 * Usar apenas `req.ip` com `trust proxy` numérico é frágil em plataformas
 * como o Render, onde a requisição passa pelo Cloudflare e depois pelo
 * load balancer interno deles — o número de saltos de proxy pode variar
 * entre requisições e fazer o rate limit contar cada uma como um IP
 * diferente (na prática, nunca bloquear ninguém).
 *
 * O header `CF-Connecting-IP`, quando presente, é definido pelo próprio
 * Cloudflare a partir da conexão TCP real — não pode ser forjado pelo
 * cliente — e por isso é preferido como fonte da verdade. Fora do
 * Cloudflare (dev local, VPS com Caddy), cai para `req.ip`.
 */
function obterIpCliente(req) {
  return req.headers["cf-connecting-ip"] || req.ip;
}

module.exports = obterIpCliente;
