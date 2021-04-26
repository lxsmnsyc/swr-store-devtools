import { addTransformer, parse, withRecursionTracker } from 'ecmason';

addTransformer<Promise<any>, null>('object', {
  tag: 'PROMISE',
  check: (value): value is Promise<any> => value instanceof Promise,
  serialize: () => null,
  deserialize: () => Promise.resolve(),
});
addTransformer<(...args: any[]) => any, string>('primitive', {
  tag: 'FUNCTION',
  check: (v): v is ((...args: any[]) => any) => typeof v === 'function',
  serialize: (v) => `ƒ ${v.name} () { }`,
  deserialize: (v) => {
    const newFunc = () => { /* noop */ };
    newFunc.name = v;
    return newFunc;
  },
});

interface ErrorECMASon {
  name: string;
  message: string;
}

addTransformer('object', withRecursionTracker<Error, ErrorECMASon>({
  tag: 'ERROR',
  check: (v): v is Error => v instanceof Error,
  serialize: (v) => ({
    name: v.name,
    message: v.message,
  }),
  deserialize: (v) => {
    const error = new Error(v.message);
    error.name = v.name;
    return error;
  },
}));

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
            value: parse(result),
          });
        }
      },
    );
  });
}
