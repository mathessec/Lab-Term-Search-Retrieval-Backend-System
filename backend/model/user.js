import mongoose from "./index.js"
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => generateUUID()
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
    status: {
        type: Boolean,
        default: true
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