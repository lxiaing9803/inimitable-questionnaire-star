// hooks/useRequest.ts
import { useState, useEffect, useCallback } from 'react';

interface UseRequestOptions<TParams = any> {
  manual?: boolean; // 是否手动触发
  defaultParams?: TParams; // 默认参数
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

/**
 * useRequest 通用请求 hook
 * @param fn - 请求函数，返回 Promise<T>
 * @param options - 控制选项
 */
function useRequest<TData = any, TParams = any>(
  fn: (params?: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams> = {}
) {
  const { manual = false, defaultParams, onSuccess, onError } = options;

  const [data, setData] = useState<TData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<any>(null);

  const run = useCallback(
    async (params?: TParams) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(params);
        setData(res);
        onSuccess?.(res);
        return res;
      } catch (err) {
        setError(err);
        onError?.(err);
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [fn, onSuccess, onError]
  );

  useEffect(() => {
    if (!manual) {
      run(defaultParams);
    }
  }, []);

  return { data, loading, error, run };
}

export default useRequest;
