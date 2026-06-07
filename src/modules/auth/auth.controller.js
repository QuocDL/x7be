import handleAsync from "../../common/utils/async-handler.js";
import createResponse from "../../common/utils/create-response.js";
import { loginService, requestRegisterService } from "./auth.service.js";

export const loginController = handleAsync(async (req, res, next) => {
  const data = await loginService(
    req.body.email,
    req.body.password,
    req.body.remember,
  );
  return createResponse(res, 200, "Đăng nhập thành công", data);
});

export const requestRegisterController = handleAsync(async (req, res) => {
  const user = await requestRegisterService(req.body.email, req.body.name);
  return createResponse(
    res,
    200,
    "Yêu cầu thành công vui lòng báo với quản trị viên xác thực thành viên",
    user,
  );
});
