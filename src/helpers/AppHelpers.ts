import packageJson from '../../package.json';

function loadScript(props: { id: string; src: string; async?: boolean; defer?: boolean }[]) {
  props.forEach((prop) => {
    const script = document.createElement('script');
    if (!document.getElementById(prop.id)) {
      script.id = prop.id;
      script.src = prop.src;
      script.async = !!prop.async;
      script.defer = !!prop.defer;
      document.body.appendChild(script);
    }
  });
}

function getCurrentVersion(): string {
  return packageJson.version;
}

function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

function stringEllipsis(str: string, len: number) {
  if (str) {
    return String(str)
      .substring(0, len)
      .concat(str.length > len ? ' ...' : '');
  }
  return '';
}

function jsonParseSafe(str: string, ret: any = null) {
  try {
    return JSON.parse(str);
  } catch (err) {
    /** ignore */
  }
  return ret;
}

function jsonStringifySafe<T>(object: T) {
  try {
    return JSON.stringify(object);
  } catch (err) {
    /** ignore */
  }
  return '';
}

export {
  loadScript,
  getCurrentVersion,
  deepCopy,
  stringEllipsis,
  jsonParseSafe,
  jsonStringifySafe,
};
