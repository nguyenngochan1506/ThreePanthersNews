package vn.edu.hcmuaf.fit.ThreePanthers.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.SuccessResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.LoginRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.RegisterRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.VerifyRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AuthResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public SuccessResponse<String> register(@RequestBody RegisterRequestDto req) {
        authService.register(req); 
        return SuccessResponse.<String>builder()
                .status(201)
                .message("Đăng ký thành công. Vui lòng kiểm tra email để nhập mã xác thực.")
                .data(null)
                .build();
    }

    @PostMapping("/verify")
    public SuccessResponse<String> verify(@RequestBody VerifyRequestDto req) {
        authService.verifyAccount(req);
        return SuccessResponse.<String>builder()
                .status(200)
                .message("Xác thực tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.")
                .data(null)
                .build();
    }

    @PostMapping("/login")
    public SuccessResponse<AuthResponseDto> login(@RequestBody LoginRequestDto req) {
        return SuccessResponse.<AuthResponseDto>builder()
                .status(200)
                .message("Đăng nhập thành công")
                .data(authService.login(req))
                .build();
    }
}