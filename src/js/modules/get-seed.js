export function getParameter(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let raw = getParameter("seed");
if (raw === null || raw === "") raw = String(Math.floor(Math.random() * 1e6));
export const seed = raw;