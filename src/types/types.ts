export interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export interface PostRequestOption {
  skip: number;
  limit: number;
}

export interface CommentRequestOption
  extends PostRequestOption,
    Pick<CommentInterface, "postId"> {}

export interface PostInterface {
  id: number;
  name: string;
  time: string;
  body: string;
  icons: string;
  image: string;
  title: string;
  userId: number;
  reactions: number;
  numberOfShare: number;
  numberOfComments: number;
}

export interface PostResponseInterface extends PostRequestOption {
  posts: PostInterface[];
  total: number;
}

export interface CommentInterface extends PostInterface {
  postId: number;
  user?: PostUserInterface;
}

export interface PostCommentsRequestOption
  extends Pick<CommentInterface, "postId" | "userId"> {
  body: string;
}

export interface CommentResponseInterface extends PostRequestOption {
  comments: CommentInterface[];
  total: number;
}

export interface PostUserInterface {
  id: number;
  age: number;
  email: string;
  phone: string;
  image: string;
  lastName: string;
  username: string;
  password: string;
  birthDate: string;
  firstName: string;
  maidenName: string;
  gender: "male" | "female";
}
