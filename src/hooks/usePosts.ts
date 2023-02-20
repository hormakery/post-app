import { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../providers/StoreProvider/store";
import { fetchAllPosts } from "../providers/StoreProvider/store/slices/post";

export function usePosts() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.posts, shallowEqual);

  useEffect(() => {
    dispatch(fetchAllPosts({ limit: state.limit, skip: state.skip }));
  }, []);

  return state;
}
