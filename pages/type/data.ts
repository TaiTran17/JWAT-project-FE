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
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  id: string;
  caption: string;
  blog: Blog;
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
  blog: Blog;
};

type User = {
  id: string;
  username: string;
  avatar: string;
};
