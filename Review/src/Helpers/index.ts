import crypto from "crypto";

const SECRET = "MY_SECRET_KEY";

const random = () => crypto.randomBytes(128).toString("base64");

const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(password)
        .digest("hex");
};

export { random, authentication };
