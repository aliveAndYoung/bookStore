import { CreateUser, getUserByEmail } from "../DB/Users";
import express from "express";
import { authentication, random } from "../Helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        // console.log(req.body);
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            console.log("duplicate")
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await CreateUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("missing field")
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );
        console.log(user);
        if (!user) {
            console.log("user not found")
            return res.sendStatus(400);
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );
        await user.save();
        res.cookie("MY_AUTH", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};
