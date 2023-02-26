import * as timeago from "timeago.js";
//@ts-ignore
import randomDate from "random-datetime";
import {
  PostInterface,
  CommentInterface,
  PostRequestOption,
  PostUserInterface,
  CommentRequestOption,
  PostResponseInterface,
  PostCommentsRequestOption,
  CommentResponseInterface,
} from "../types/types";

const currentDate = new Date();
const POST_BASE_URL = "https://dummyjson.com";
const GENDERS = { male: "men", female: "women" };
const USER_BASE_IMAGE_URL = "https://randomuser.me/api/portraits/med";

/**
 *
 * @description get random post user
 * @function getRandomPostUser
 * @returns Promise<PostUserInterface>
 */
export const getRandomPostUser = async (
  userId: PostInterface["userId"]
): Promise<PostUserInterface> => {
  const response = await fetch(`${POST_BASE_URL}/users/${userId}`);
  const data: PostUserInterface = await response.json();
  const image = `${USER_BASE_IMAGE_URL}/${
    GENDERS[data?.gender!!]
  }/${userId}.jpg`;

  return { ...data, image };
};

/**
 *
 * @description getPosts  all posts
 * @function getPosts
 * @returns Promise<PostResponseInterface>
 */
export const getPosts = async (
  options?: PostRequestOption
): Promise<PostResponseInterface> => {
  const response = await fetch(
    `${POST_BASE_URL}/posts?limit=${options?.limit || 10}&skip=${
      options?.skip || 0
    }`
  );
  const data: PostResponseInterface = await response.json();
  const allPostUsers = data.posts.map(({ userId }) =>
    getRandomPostUser(userId)
  );
  const postsUsers = await Promise.all(allPostUsers);

  const posts = data.posts.map((post) => {
    const postUser = postsUsers.find(({ id }) => id === post.userId);

    return {
      ...post,
      image: `${postUser?.image}`,
      name: `${postUser?.firstName} ${postUser?.lastName}`,
      time: timeago.format(
        randomDate({
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
        })
      ),
    };
  });

  return { ...data, posts };
};

export const getPostComments = async (
  options?: CommentRequestOption
): Promise<CommentResponseInterface> => {
  const response = await fetch(
    `${POST_BASE_URL}/comments/post/${options?.postId}?limit=${
      options?.limit || 10
    }&skip=${options?.skip || 0}`
  );
  const data: CommentResponseInterface = await response.json();

  const allCommentUsers = data.comments.map(({ user }) =>
    getRandomPostUser(user?.id!!)
  );

  const commentUsers = await Promise.all(allCommentUsers);

  const comments = data.comments.map((comment) => {
    const commentUser = commentUsers.find(({ id }) => id === comment?.user?.id);

    return {
      ...comment,
      image: `${USER_BASE_IMAGE_URL}/${GENDERS[commentUser?.gender!!]}/${
        comment.user?.id
      }.jpg`,
      name: `${commentUser?.firstName} ${commentUser?.lastName}`,
      time: timeago.format(
        randomDate({
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
        })
      ),
    };
  });

  return { ...data, comments };
};

export const postComment = async (
  payload: PostCommentsRequestOption
): Promise<CommentInterface> => {
  const response = await fetch(`${POST_BASE_URL}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: CommentInterface = await response.json();
  return data;
};
