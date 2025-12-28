import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            required: true,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
});

const UserModel = mongoose.model("User", UserScheme);

const getUsers = () => {
    const users = UserModel.find();
    return users;
};

const getUserByEmail = (email: string) => {
    const user = UserModel.findOne({ email });
    return user;
};

const getUserBySessionToken = (sessionToken: string) => {
    const user = UserModel.findOne({
        "authentication.sessionToken": sessionToken,
    });
    return user;
};

const getUserById = (id: string) => {
    const user = UserModel.findById(id);
    return user;
};

const CreateUser = async (values: Record<string, any>) => {
    const user = new UserModel(values);
    await user.save();
    return user.toObject();
};

const deleteUserById = async (id: string) => {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
};

const updateUserById = async (id: string, values: Record<string, any>) => {
    const user = await UserModel.findByIdAndUpdate(id, values);
    return user;
};

export { UserModel };
export {
    getUserByEmail,
    getUserBySessionToken,
    getUsers,
    getUserById,
    CreateUser,
    deleteUserById,
    updateUserById,
};
