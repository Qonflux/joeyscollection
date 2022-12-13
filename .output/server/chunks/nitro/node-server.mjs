globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"API_URL":"https://collectionserver.onrender.com","IGDB_CLIENT_ID":"s3ayyh2qwaonaytfnkjw7pqe25hk93","IGDB_CLIENT_SECRET":"di8a3het9e2uvn5gw63g3og49imykf","PROXY":"https://collectionproxy.onrender.com"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-upYi6PXJblK5Ja76hEpElnzaUKU\"",
    "mtime": "2022-12-13T14:50:33.500Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/_nuxt/collection-logo-light.97e5c896.png": {
    "type": "image/png",
    "etag": "\"7075-t/wTqtS+4oULAYKYuLb0EkWgE2s\"",
    "mtime": "2022-12-13T14:50:33.485Z",
    "size": 28789,
    "path": "../public/_nuxt/collection-logo-light.97e5c896.png"
  },
  "/_nuxt/composables.fcaa9ee3.js": {
    "type": "application/javascript",
    "etag": "\"61-fW9+veOXKPsAGpgrpZGu/u7hWeo\"",
    "mtime": "2022-12-13T14:50:33.485Z",
    "size": 97,
    "path": "../public/_nuxt/composables.fcaa9ee3.js"
  },
  "/_nuxt/entry.1b022aef.js": {
    "type": "application/javascript",
    "etag": "\"3942a-r3FlUhmHy02BVHzoCBEmB33Wxro\"",
    "mtime": "2022-12-13T14:50:33.484Z",
    "size": 234538,
    "path": "../public/_nuxt/entry.1b022aef.js"
  },
  "/_nuxt/entry.95d8171a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6072-vT3cG0v26qxd+o3JLuhakOs/G0E\"",
    "mtime": "2022-12-13T14:50:33.483Z",
    "size": 24690,
    "path": "../public/_nuxt/entry.95d8171a.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2022-12-13T14:50:33.483Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.462808b2.js": {
    "type": "application/javascript",
    "etag": "\"8cf-JJDWoo2E9/CzXRFDAClxKVpaHDw\"",
    "mtime": "2022-12-13T14:50:33.482Z",
    "size": 2255,
    "path": "../public/_nuxt/error-404.462808b2.js"
  },
  "/_nuxt/error-500.014952dd.js": {
    "type": "application/javascript",
    "etag": "\"778-03Q8tQ57Y5njgNbN4J05GUfy8wA\"",
    "mtime": "2022-12-13T14:50:33.481Z",
    "size": 1912,
    "path": "../public/_nuxt/error-500.014952dd.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2022-12-13T14:50:33.481Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.2f02f5d2.js": {
    "type": "application/javascript",
    "etag": "\"4ad-troYCJeepWVrHBk1WvrlM2RAdn8\"",
    "mtime": "2022-12-13T14:50:33.480Z",
    "size": 1197,
    "path": "../public/_nuxt/error-component.2f02f5d2.js"
  },
  "/_nuxt/fetch.8974a903.js": {
    "type": "application/javascript",
    "etag": "\"2bd1-phnaljhMTR73ayPC6xyvdTEQLuo\"",
    "mtime": "2022-12-13T14:50:33.479Z",
    "size": 11217,
    "path": "../public/_nuxt/fetch.8974a903.js"
  },
  "/_nuxt/index.0f5d8cd6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6f-hygZWbjM1hw6zmrJ36iqJJziJI8\"",
    "mtime": "2022-12-13T14:50:33.479Z",
    "size": 111,
    "path": "../public/_nuxt/index.0f5d8cd6.css"
  },
  "/_nuxt/index.1ccfa072.js": {
    "type": "application/javascript",
    "etag": "\"244-TMGa2x6YphOo6XQzDJhDKwKif2U\"",
    "mtime": "2022-12-13T14:50:33.478Z",
    "size": 580,
    "path": "../public/_nuxt/index.1ccfa072.js"
  },
  "/_nuxt/index.54dcfdfd.js": {
    "type": "application/javascript",
    "etag": "\"663-7a5lPeAdiDpY4RTibKsZV/+4qTY\"",
    "mtime": "2022-12-13T14:50:33.478Z",
    "size": 1635,
    "path": "../public/_nuxt/index.54dcfdfd.js"
  },
  "/_nuxt/index.b381efaa.js": {
    "type": "application/javascript",
    "etag": "\"1665-p/kp/310ZqbPeL77Y7YQyPgKEWI\"",
    "mtime": "2022-12-13T14:50:33.477Z",
    "size": 5733,
    "path": "../public/_nuxt/index.b381efaa.js"
  },
  "/_nuxt/index.caa0f300.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2bd-RGMGAQC2BIIiPsUu6zXHmvh3MBw\"",
    "mtime": "2022-12-13T14:50:33.477Z",
    "size": 701,
    "path": "../public/_nuxt/index.caa0f300.css"
  },
  "/_nuxt/index.f78bd133.js": {
    "type": "application/javascript",
    "etag": "\"382a-yg/2zD1beDrZtxp9mCWiBPDhD5M\"",
    "mtime": "2022-12-13T14:50:33.476Z",
    "size": 14378,
    "path": "../public/_nuxt/index.f78bd133.js"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-4EsG/stEmeXv24SZ3KZX31dseAM\"",
    "mtime": "2022-12-13T14:50:33.499Z",
    "size": 6148,
    "path": "../public/images/.DS_Store"
  },
  "/images/3ds.png": {
    "type": "image/png",
    "etag": "\"48f-7sjVxNDWnExW7b0phFzYoRrjIqs\"",
    "mtime": "2022-12-13T14:50:33.498Z",
    "size": 1167,
    "path": "../public/images/3ds.png"
  },
  "/images/ds.png": {
    "type": "image/png",
    "etag": "\"4b6-A8CIAuGC5q+ORGGhvFpb5lwu/9A\"",
    "mtime": "2022-12-13T14:50:33.497Z",
    "size": 1206,
    "path": "../public/images/ds.png"
  },
  "/images/gb.png": {
    "type": "image/png",
    "etag": "\"4e5-IMuFc95qOT5bBl5zYULb5xTXbrM\"",
    "mtime": "2022-12-13T14:50:33.496Z",
    "size": 1253,
    "path": "../public/images/gb.png"
  },
  "/images/gba.png": {
    "type": "image/png",
    "etag": "\"3e0-k5mn5fftGJ8J3FnSh5ztXcBClg8\"",
    "mtime": "2022-12-13T14:50:33.495Z",
    "size": 992,
    "path": "../public/images/gba.png"
  },
  "/images/gbc.png": {
    "type": "image/png",
    "etag": "\"4ac-hV60IADPDJRtj7/DHXvDF0boIOg\"",
    "mtime": "2022-12-13T14:50:33.494Z",
    "size": 1196,
    "path": "../public/images/gbc.png"
  },
  "/images/gc.png": {
    "type": "image/png",
    "etag": "\"479-Q715feu1ntYu3YHGNzTFvvBKvwE\"",
    "mtime": "2022-12-13T14:50:33.494Z",
    "size": 1145,
    "path": "../public/images/gc.png"
  },
  "/images/md.png": {
    "type": "image/png",
    "etag": "\"4dd-2SXht2w42qZ7lOiSw+B7SWLxJGA\"",
    "mtime": "2022-12-13T14:50:33.493Z",
    "size": 1245,
    "path": "../public/images/md.png"
  },
  "/images/n64.png": {
    "type": "image/png",
    "etag": "\"5b2-eQuZVR4n+aPMxN6FNXB86cs+sqk\"",
    "mtime": "2022-12-13T14:50:33.492Z",
    "size": 1458,
    "path": "../public/images/n64.png"
  },
  "/images/nes.png": {
    "type": "image/png",
    "etag": "\"243-ZL0bJPWLn1vD0qNp4DhcsGQ/ZxA\"",
    "mtime": "2022-12-13T14:50:33.491Z",
    "size": 579,
    "path": "../public/images/nes.png"
  },
  "/images/ps.png": {
    "type": "image/png",
    "etag": "\"522-l+6+Tz+5fkTBj7GSTLazCNlvUf0\"",
    "mtime": "2022-12-13T14:50:33.490Z",
    "size": 1314,
    "path": "../public/images/ps.png"
  },
  "/images/ps2.png": {
    "type": "image/png",
    "etag": "\"58c-Fz07t8VGsxslCmxiw8B85DyWAHA\"",
    "mtime": "2022-12-13T14:50:33.490Z",
    "size": 1420,
    "path": "../public/images/ps2.png"
  },
  "/images/snes.png": {
    "type": "image/png",
    "etag": "\"45c-8LkcTi5AJsijCtpqUFErT99dWSs\"",
    "mtime": "2022-12-13T14:50:33.489Z",
    "size": 1116,
    "path": "../public/images/snes.png"
  },
  "/images/switch.png": {
    "type": "image/png",
    "etag": "\"569-PqAxMQr2j+qA6PCxzOSMh0CBq5c\"",
    "mtime": "2022-12-13T14:50:33.489Z",
    "size": 1385,
    "path": "../public/images/switch.png"
  },
  "/images/wii-u.png": {
    "type": "image/png",
    "etag": "\"672-Rx7mODjvVkOYOPIogxEZ1qp0I3w\"",
    "mtime": "2022-12-13T14:50:33.488Z",
    "size": 1650,
    "path": "../public/images/wii-u.png"
  },
  "/images/wii.png": {
    "type": "image/png",
    "etag": "\"4fe-3ISkTXS96ZoJhkyVciU5pOHo6KQ\"",
    "mtime": "2022-12-13T14:50:33.488Z",
    "size": 1278,
    "path": "../public/images/wii.png"
  },
  "/images/xbox.png": {
    "type": "image/png",
    "etag": "\"511-rK2X387I6QjPqIY+Eto3v5zudIE\"",
    "mtime": "2022-12-13T14:50:33.487Z",
    "size": 1297,
    "path": "../public/images/xbox.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_89gRB5 = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_89gRB5, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_89gRB5, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
