export function wait(ms: number, options: { signal?: AbortSignal } = {}) {
    const { signal } = options;
  
    return new Promise<void>((resolve, reject) => {
      if (signal?.aborted) reject(signal.reason);
  
      const id = setTimeout(() => {
        resolve();
        signal?.removeEventListener('abort', abort);
      }, ms);
  
      function abort() {
        clearTimeout(id);
        reject(signal!.reason);
      }
  
      signal?.addEventListener('abort', abort);
    });
  }