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

type blogInputs = {
  title: string;
  description: string;
  type: string;
  topic: string;
  thumbnail: FileList | null;
};
