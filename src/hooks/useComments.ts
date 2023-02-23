import { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../providers/StoreProvider/store";
import {
  postCommentByPostId,
  fetchCommentsByPostId,
} from "../providers/StoreProvider/store/slices/comments";

export function useComments(postId?: number) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user, shallowEqual);
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.comments,
    shallowEqual
  );

  const comments = data[postId!];

  useEffect(() => {
    if (postId) {
      dispatch(
        fetchCommentsByPostId({
          postId,
          skip: comments?.skip,
          limit: comments?.limit,
        })
      );
    }
  }, [postId]);

  const postComment = (text: string) => {
    if (!postId || !user) return;
    dispatch(postCommentByPostId({ user, postId, body: text }));
  };

  return { postComment, ...comments, error, isLoading };
}
