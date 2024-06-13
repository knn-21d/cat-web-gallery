import { useCallback, useLayoutEffect, useRef } from 'react';
import styles from './fetch-trigger.module.css';

type FetchTriggerProps = {
  onFetch: () => Promise<void>;
  isLoading: boolean;
};

export function FetchTrigger({ onFetch, isLoading }: FetchTriggerProps) {
  const span = useRef<HTMLSpanElement>(null);

  const intersectHandler = useCallback<IntersectionObserverCallback>(
    async (e) => {
      if (!isLoading && e[0].isIntersecting) {
        await onFetch();
      }
    },
    [isLoading, onFetch],
  );

  const intersectionObserver = useRef(
    new IntersectionObserver(intersectHandler, {
      threshold: 1,
      rootMargin: '100px',
    }),
  );

  useLayoutEffect(() => {
    const obs = intersectionObserver.current;
    if (span.current) {
      obs.observe(span.current);
    }
    return () => {
      obs.disconnect();
    };
  }, [span]);

  return <span className={styles.trigger} ref={span}></span>;
}
