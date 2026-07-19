export const isWebView = (): boolean => {
  const ua = navigator.userAgent;
  const rules = [
    /WebView/,
    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/,
    /Android.*wv/,
  ];
  return rules.some((re) => re.test(ua));
};

export const openInSystemBrowser = (url: string): void => {
  if (isWebView()) {
    window.location.href = url;
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};



