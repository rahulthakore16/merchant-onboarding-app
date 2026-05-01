import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import type { Merchant, MerchantListResponse } from "@/types/merchant";

const PAGE_SIZE = 20;

export function useMerchants() {
  const [items, setItems] = useState<Merchant[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchMerchants = useCallback(async (newOffset: number) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get<MerchantListResponse>("/merchants", {
        params: { limit: PAGE_SIZE, offset: newOffset },
        signal: controller.signal,
      });
      setItems(data.items);
      setTotal(data.total);
      setOffset(data.offset);
      setHasMore(data.has_more);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError("Failed to load merchants. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    api
      .get<MerchantListResponse>("/merchants", {
        params: { limit: PAGE_SIZE, offset: 0 },
        signal: controller.signal,
      })
      .then(({ data }) => {
        setItems(data.items);
        setTotal(data.total);
        setOffset(data.offset);
        setHasMore(data.has_more);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("Failed to load merchants. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const nextPage = () => {
    if (hasMore) fetchMerchants(offset + PAGE_SIZE);
  };

  const prevPage = () => {
    if (offset > 0) fetchMerchants(Math.max(0, offset - PAGE_SIZE));
  };

  const retry = () => fetchMerchants(offset);

  return { items, total, offset, hasMore, isLoading, error, nextPage, prevPage, retry, pageSize: PAGE_SIZE };
}
