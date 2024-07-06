export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0];
}

export function checkIsActive(pathname: string, url: string, main?: string) {
  const current = getCurrentUrl(pathname);

  if (main && current.includes(main)) {
    return true;
  }

  if (!current || !url) {
    return false;
  }

  if (current.includes(url)) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
}
