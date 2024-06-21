
import { Schema, model, models } from "mongoose";

export interface User extends Document {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    planId?: number;
    creditBalance?: number;
    createdAt?: Date; 
    updatedAt?: Date; 
}


const UserSchema = new Schema({
    clerkId:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        // required: true
    },
    lastName:{
        type: String,
        // required: true
    },
    planId:{
        type: Number,
        default: 1
    },
    creditBalance:{
        type: Number,
        default: 10
    },
},{timestamps: true})

const User = models?.User || model('Uset', UserSchema);

export default User