export interface Message {
  _id: string;
  content: string;
  senderId: string;
  roomId: string;
  type: "text" | "image" | "file" | "system";
  timestamp: Date;
  editedAt?: Date;
  isEdited: boolean;
  replyTo?: string;
  reactions: {
    userId: string;
    emoji: string;
  }[];
  deliveredTo: string[];
  readBy: {
    userId: string;
    readAt: Date;
  }[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  rooms: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  _id: string;
  name: string;
  type: "private" | "group";
  participants: string[];
  admins: string[];
  lastMessage?: string;
  lastActivity: Date;
  settings: {
    isEncrypted: boolean;
    allowFileSharing: boolean;
    maxParticipants: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
