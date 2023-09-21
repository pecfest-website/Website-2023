import { useProgressBar } from '@/hooks/useProgressBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const transitionSpeed = 600;

export function RouterProgressBar(props?: Parameters<typeof useProgressBar>[0]) {
  const { events } = useRouter();

  const { width, start, complete, reset } = useProgressBar({ transitionSpeed, ...props });

  useEffect(() => {
    events.on('routeChangeStart', start);
    events.on('routeChangeComplete', complete);
    events.on('routeChangeError', reset);

    return () => {
      events.off('routeChangeStart', start);
      events.off('routeChangeComplete', complete);
      events.off('routeChangeError', reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return width > 0 ? (
    <div
      className="progress fixed-top bg-transparent rounded-0"
      style={{
        height: 3, // GitHub turbo-progress-bar height is 3px
        zIndex: 1091 
      }}
    >
      <div
        className="progress-bar"
        style={{
          width: `${width}%`,
          transition: `width ${
            // Why transition is 0 if width < 1% ?
            // If a `complete()` (width 100%) has been aborted (by a `start()`),
            // the slow CSS transition will prevent the progress bar from visually reaching width 1%
            // Without this hack (i.e. forcing the stop of the previous CSS transition),
            // the progress bar would temporary look like K 2000 (Knight Rider) car front-mounted scanner
            width > 1 ? transitionSpeed : 0
          }ms ease`
        }}
      />
    </div>
  ) : null;
}