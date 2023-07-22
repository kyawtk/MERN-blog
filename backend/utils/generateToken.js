import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }); 
  res.cookie("jwt", token, { httpOnly: true,
     maxAge: 24 * 60 * 60 * 1000 ,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
    });
};
export default generateToken;