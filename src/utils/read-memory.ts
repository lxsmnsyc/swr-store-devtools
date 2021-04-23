import superjson from 'superjson';

superjson.registerCustom<string, string>({
  isApplicable: (v): v is string => typeof v === 'string',
  serialize: (v) => v,
  deserialize: (v) => v,
}, 'function');
superjson.registerCustom<string, string>({
  isApplicable: (v): v is string => typeof v === 'string',
  serialize: (v) => v,
  deserialize: (v) => v,
}, 'promise');

interface ChromeInspectedWindow {
  eval: <T>(key: string, result: (data: T, exception: Error) => void) => void;
}

interface ChromeDevtools {
  inspectedWindow: ChromeInspectedWindow;
}

interface Chrome {
  devtools: ChromeDevtools;
}

declare const chrome: Chrome;

export function getKeys(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval<string[]>(
      'Array.from(window.__SWR_STORE__.keys())',
      (result, exception) => {
        if (exception) {
          reject(exception);
        } else {
          resolve(result);
        }
      },
    );
  });
}

interface MutationPending {
  data: Promise<any>;
  status: 'pending';
}
interface MutationSuccess {
  data: any;
  status: 'success';
}
interface MutationFailure {
  data: any;
  status: 'failure';
}
type MutationResult =
  | MutationPending
  | MutationSuccess
  | MutationFailure;

export interface Mutation {
  result: MutationResult;
  timestamp: number;
  isValidating: boolean;
  listeners: number;
}

export interface Field {
  key: string;
  value: Mutation;
}

export function getData(key: string): Promise<Field> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval<string>(
      `window.__SWR_STORE__.get("${key}")`,
      (result, exception) => {
        if (exception) {
          reject(exception);
        } else {
          resolve({
            key,
            value: superjson.parse<Mutation>(result),
          });
        }
      },
    );
  });
}
