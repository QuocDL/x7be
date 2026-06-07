import { JWT_ACCESS_SECRET } from "../../common/configs/environment.js";
import { throwError } from "../../common/utils/create-response.js";
import User from "../user/user.model.js";
import { comparePassword, generateToken, hashPassword } from "./auth.utils.js";

export const loginService = async (email, password, remember) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    throwError(400, "Thông tin đăng nhập không chính xác");
  }
  const matchPassword = await comparePassword(password, user.password);
  if (!matchPassword) {
    throwError(400, "Thông tin đăng nhập không chính xác");
  }
  if (!user.isActive)
    throwError(
      400,
      "Vui lòng liên hệ với quản trị viên để kích hoạt tài khoản",
    );

  const accessToken = remember
    ? generateToken({ _id: user._id }, JWT_ACCESS_SECRET, "30d")
    : generateToken({ _id: user._id }, JWT_ACCESS_SECRET, "1d");

  return { ...user.toObject(), accessToken };
};

export const requestRegisterService = async (email, name) => {
  email = email.toLowerCase();
  const existEmail = await User.findOne({ email });
  if (existEmail) throwError(400, "Email đã tồn tại trong hệ thống");
  const password = await hashPassword("xedovietnam");
  const newUser = await User.create({ email, name, password });
  return newUser;
};
