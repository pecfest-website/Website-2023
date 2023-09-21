export function assert(_condition: boolean, _message?: string): asserts _condition {
    // eslint-disable-next-line no-console, prefer-rest-params
    console.assert(...arguments);
  }