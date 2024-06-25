type UserInputs = {
  username: string;
  password: string;
  avatar?: FileList | null;
};

type Blog = {
  createdAt: string;
  createdBy: string;
  description: string;
  id: string;
  isDeleted: boolean;
  thumbnail: string;
  title: string;
  type: string;
  updatedAt: string;
  updatedBy: string;
  topic: Topic;
};

type Topic = {
  createdAt: string;
  createdBy: string;
  id: string;
  isDeleted: boolean;
  topic_name: string;
  type: string;
  updatedAt: string;
  updatedBy: string;
};

type Section = {
  id: string;
  caption: string;
  blog: BlogData;
};

type Image = {
  thumbnail: string;
};

type Commentt = {
  id: string;
  comment: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  user: User;
  blog: Blog;
};

type User = {
  id: string;
  username: string;
  avatar: string;
  role: string;
};

type blogInputs = {
  title: string;
  description: string;
  type: string;
  topic: string;
  thumbnail: FileList | null;
};

type BlogData = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  thumbnail: string;
  topic: {
    topic_name: string;
  };
};
