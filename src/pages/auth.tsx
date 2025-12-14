import { useEffect, useState } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { LoginRequest, RegisterRequest } from "@/types";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const [selected, setSelected] = useState<React.Key>("login");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const [loginData, setLoginData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<
    RegisterRequest & { confirmPassword: string }
  >({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (location.state && location.state.tab) {
      setSelected(location.state.tab);
    }
  }, [location]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.login(loginData);

      setAuthData(res.data);

      alert("Đăng nhập thành công");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");

      return;
    }

    setIsLoading(true);
    try {
      const req: RegisterRequest = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      };

      await authService.register(req);

      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");
      setSelected("login");

      setRegisterData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Đăng ký thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-200px)] items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-full w-[400px] h-auto shadow-lg">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            classNames={{
              cursor: "bg-[#004b9a]",
              tabContent: "group-data-[selected=true]:text-white font-bold",
            }}
            color="primary"
            selectedKey={selected as string}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Đăng Nhập">
              <form
                className="flex flex-col gap-4 mt-4 h-[350px]"
                onSubmit={handleLogin}
              >
                <div className="flex flex-col gap-2 mb-2">
                  <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
                    Chào mừng trở lại
                  </h1>
                  <p className="text-small text-default-500 text-center">
                    Đăng nhập để theo dõi tin tức mới nhất
                  </p>
                </div>

                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  endContent={
                    <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email hoặc Tên đăng nhập"
                  placeholder="Nhập email/username"
                  type="text"
                  value={loginData.identifier}
                  variant="bordered"
                  onChange={(e) =>
                    setLoginData({ ...loginData, identifier: e.target.value })
                  }
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  type={isVisible ? "text" : "password"}
                  value={loginData.password}
                  variant="bordered"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <div className="flex justify-end px-1">
                  <Link
                    className="text-[#004b9a]"
                    color="primary"
                    href="#"
                    size="sm"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <Button
                    fullWidth
                    className="bg-[#004b9a] font-bold text-white shadow-md"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
                  </Button>
                </div>
              </form>
            </Tab>

            <Tab key="register" title="Đăng Ký">
              <form
                className="flex flex-col gap-4 mt-4 h-[420px]"
                onSubmit={handleRegister}
              >
                <div className="flex flex-col gap-2 mb-2">
                  <h1 className="text-xl font-bold text-[#004b9a] uppercase text-center">
                    Tạo tài khoản mới
                  </h1>
                  <p className="text-small text-default-500 text-center">
                    Tham gia cùng cộng đồng độc giả
                  </p>
                </div>

                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  label="Tên đăng nhập"
                  placeholder="Chọn tên hiển thị"
                  type="text"
                  value={registerData.username}
                  variant="bordered"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  endContent={
                    <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Nhập email của bạn"
                  type="email"
                  value={registerData.email}
                  variant="bordered"
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="Mật khẩu"
                  placeholder="Tạo mật khẩu"
                  type={isVisible ? "text" : "password"}
                  value={registerData.password}
                  variant="bordered"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "group-data-[focus=true]:border-[#004b9a]",
                  }}
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  type={isVisible ? "text" : "password"}
                  value={registerData.confirmPassword}
                  variant="bordered"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex gap-2 justify-end mt-4">
                  <Button
                    fullWidth
                    className="bg-[#004b9a] font-bold text-white shadow-md"
                    isLoading={isLoading}
                    type="submit"
                  >
                    {isLoading ? "Đang xử lý..." : "Đăng Ký"}
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
