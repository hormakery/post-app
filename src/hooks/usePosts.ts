import { useEffect, useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../providers/StoreProvider/store";
import { fetchAllPosts } from "../providers/StoreProvider/store/slices/post";

export function usePosts() {
  const dispatch = useDispatch<AppDispatch>();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const state = useSelector((state: RootState) => state.posts, shallowEqual);

  const onRetry = () => {
    dispatch(fetchAllPosts({ limit: state.limit, skip: state.skip }));
  };

  const hasMore = state.total > state.posts.length;

  const fetchMore = () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);
    dispatch(
      fetchAllPosts({ limit: state.limit, skip: state.posts.length })
    ).finally(() => setIsFetchingMore(false));
  };

  useEffect(() => {
    onRetry();
  }, []);

  return {
    ...state,
    hasMore,
    onRetry,
    fetchMore,
    isFetchingMore,
  };
}
