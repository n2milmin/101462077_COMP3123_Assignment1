import { Model } from "mongoose";
import { compare } from 'bcrypt';

interface IUser{
    username: { type: String, required: true, index: {unique: true}},
    email: { type: String, required: true},
    password: { type: String, required: true}, //hashed 
    created_at: Date,
    updated_at: Date
}

interface UserMethods{
    isValidPassword: (password: string) => Promise<Boolean>
}

type UserModel = Model<IUser, {}, UserMethods>

/*userSchema.method('isValidPassword', async function(password: string): Promise<Boolean>{
    return await compare(password, this.password);
})*/