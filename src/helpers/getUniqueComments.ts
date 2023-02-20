/**
 *
 * @description A function that helps filter unique comments
 * @function getUniqueComments
 * @returns CommentInterface[],
 */

import { CommentInterface } from "../types/types";

export const getUniqueComments = (
  array: CommentInterface[],
  key: keyof CommentInterface
): CommentInterface[] => {
  return [...new Map(array.map((item) => [item[key], item])).values()];
};
