import { MockedCommentType } from '../api/fish-text.types';

type UserType = {
  login: string;
  posts?: string[];
  comments?: Record<string, {id: number, text: string}[]>;
  likes?: string[];
  dislikes?: string[];
};

const USER_KEY = 'user';

export function getUser(): UserType | null {
  const userStr = localStorage.getItem(USER_KEY);
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

export function updateUser(user: Partial<UserType>): Partial<UserType> {
  const userObj = getUser();
  if (userObj) {
    const newUser = { ...userObj, ...user };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  } else {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
}

export function setUser(user: UserType): UserType {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function getIsLiked(id: string): { like: boolean; dislike: boolean } {
  const isLiked = getUser()?.likes?.includes(id) || false;
  const isDisliked = getUser()?.dislikes?.includes(id) || false;

  return { like: isLiked, dislike: isDisliked };
}

export function addLike(id: string) {
  const user = getUser();
  if (user) {
    const newLikes = [...(user.likes || []), id];
    return updateUser({ likes: newLikes });
  }
}

export function removeLike(id: string) {
  const user = getUser();
  if (user) {
    const newLikes = (user.likes || []).filter((like) => like !== id);
    return updateUser({ likes: newLikes });
  }
}

export function addDislike(id: string) {
  const user = getUser();
  if (user) {
    const newDislikes = [...(user.dislikes || []), id];
    return updateUser({ dislikes: newDislikes });
  }
}

export function removeDislike(id: string) {
  const user = getUser();
  if (user) {
    const newDislikes = (user.dislikes || []).filter(
      (dislike) => dislike !== id,
    );
    return updateUser({ dislikes: newDislikes });
  }
}

export function addComment(postId: string, comment: string, id: number): UserType | null {
  const user = getUser();
  if (user) {
    const newComments = {
      ...user.comments,
      [postId]: [...(user.comments?.[postId] || []), {text: comment, id}],
    };
    return updateUser({ comments: newComments }) as UserType;
  }
  return null;
}

export function getComments(postId: string): MockedCommentType[] {
  const user = getUser();
  if (user) {
    return user.comments?.[postId]?.map((comment) => ({ ...comment, isOwn: true })) || [];
  }
  return [];
}

export function removeComment(postId: string, commentId: number) {
  const user = getUser();
  if (user) {
    const newComments = {
      ...user.comments,
      [postId]: (user.comments?.[postId] || []).filter((comment) => comment.id !== commentId),
    };
    return updateUser({ comments: newComments }) as UserType;
  }
  return null;
}

export function updateComment(postId: string, commentId: number, text: string) {
  const user = getUser();
  if (user) {
    const newComments = {
      ...user.comments,
      [postId]: (user.comments?.[postId] || []).map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text };
        }
        return comment;
      }),
    };
    return updateUser({ comments: newComments }) as UserType;
  }
  return null;
}