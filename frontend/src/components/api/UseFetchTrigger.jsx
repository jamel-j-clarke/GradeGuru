import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

export default function useFetchTrigger(
  url,
  { method, data, onSuccess, onError, depends, fetchOnLoad = true },
) {
  const [triggerValue, setTrigger] = useState(
    fetchOnLoad ? nanoid() : undefined,
  );

  let headers, body;
  switch (method) {
    case 'get':
    case 'delete':
      break;
    case 'post':
    case 'patch':
      if (!data) throw new Error(`${method.toUpperCase()} requires data`);

      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      body = JSON.stringify(data);
      break;
    case undefined:
      break;
    default:
      throw new Error('Unknown method ' + method + ' used in fetch');
  }

  const request = useFetch(url, {
    method: method ? method.toUpperCase() : undefined,
    headers,
    body,
    depends: depends ? [triggerValue, ...depends] : [triggerValue],
  });

  useEffect(() => {
    if (request.isLoading) return;
    if (request.error) {
      console.error(
        `${request.error.status} ${request.error.statusText} error ${method}ing ${url}${data ? ` with ${JSON.stringify(data)}` : ''}`,
      );
      onError ? onError(request.error) : '';
    } else {
      onSuccess(request.data);
    }
  }, [request.isLoading]);

  return {
    isLoading: request.isLoading,
    error: request.error,
    trigger: (triggerData) => {
      triggerData ? (data = { triggerData, ...data }) : '';
      setTrigger(nanoid());
    },
  };
}
