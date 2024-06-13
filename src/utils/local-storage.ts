type UserType = {
  login: string;
  posts?: string[];
  comments?: Record<string, string[]>;
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
  const userObj = getUser()
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
    const newDislikes = (user.dislikes || []).filter((dislike) => dislike !== id);
    return updateUser({ dislikes: newDislikes });
  }
} 

export function addComment(postId: string, comment: string): UserType | null {
  const user = getUser();
  if (user) {
    const newComments = { ...user.comments, [postId]: [...(user.comments?.[postId] || []), comment] };
    return updateUser({ comments: newComments }) as UserType;
  }
  return null
}