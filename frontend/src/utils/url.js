/**
 * Resolve a URL de um arquivo (ex: certificado em PDF) cadastrado no admin.
 * Se for um link externo completo (http/https), usa como está.
 * Se for um caminho relativo (arquivo incluído no próprio site, dentro de
 * /public), prefixa com o BASE_URL do Vite — necessário porque no GitHub
 * Pages o site fica publicado numa subpasta (ex: /nome-do-repo/).
 */
export function resolverUrlArquivo(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = import.meta.env.BASE_URL;
  return `${base}${url}`.replace(/([^:]\/)\/+/g, "$1");
}
