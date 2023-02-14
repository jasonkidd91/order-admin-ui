import React from 'react';

function useSearchParams<T>() {
  const [params] = React.useState<T | Object>(
    Object.fromEntries(new URLSearchParams(window.location.search).entries()),
  );

  return params;
}

export default useSearchParams;

/**
 * **************************************
 * Use Case:
 * **************************************
 * import useSearchParams from 'src/hooks/useSearchParams';
 *
 * ...
 * const searchParams = useSearchParams<any>();
 * const { id, ... } = searchParams;
 * ...
 */
