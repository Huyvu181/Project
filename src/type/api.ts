
export type BaseEntity = {
	id: string;
	createdAt: number;
};


export type Entity<T> = {  //Entity<T> là một kiểu generic để mở rộng các thực thể (entity) với các thuộc tính được truyền vào
	[K in keyof T]: T[K];  //copy các thuộc tính của T 
} & BaseEntity;

export type Meta = {
	page: number;
	total: number;
	totalPages: number;
};

export type User = Entity<{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	// role: 'ADMIN' | 'USER';
}>;

export type AuthResponse = {
	jwt: string;
	user: User;
};

export type Team = Entity<{
	name: string;
	description: string;
}>;

export type Discussion = Entity<{
	title: string;
	body: string;
	teamId: string;
	author: User;
}>;

export type Comment = Entity<{
	body: string;
	discussionId: string;
	author: User;
}>;
