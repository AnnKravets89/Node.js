export interface IUser {
    _id: string,
    name: string,
    surname: string,
    age: number,
    createdAt: Date,
    updatedAt: Date
}
// DTO - Data Transfer Object

export type IUserDTO = Pick<IUser, "name" | "surname" | "age">

