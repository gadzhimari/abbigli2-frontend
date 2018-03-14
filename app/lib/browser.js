export default function isInternetExplorerBefore(version) {
  const iematch = (/MSIE ([0-9]+)/g.exec(window.navigator.userAgent));

  return iematch ? +iematch[1] < version : false;
}
