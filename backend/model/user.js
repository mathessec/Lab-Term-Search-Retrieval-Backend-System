
import mongoose from "./index.js"
import validator from "../utils/validator.js"
import { randomUUID } from 'crypto';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID() // USE ARROW FUNCTION HERE
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: validator.validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users',
    versionKey: false
});

export default mongoose.model('users',userSchema)

