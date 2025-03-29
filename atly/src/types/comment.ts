interface NewComment {
    name: string;
    email: string;
    body: string;
}

interface Comment extends NewComment {
    postId: number;
    id: number;
}

export type { NewComment, Comment };
  