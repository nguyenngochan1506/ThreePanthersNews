package vn.edu.hcmuaf.fit.ThreePanthers.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.LoginRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.req.RegisterRequestDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.AuthResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.UserEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.UserRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.JwtUtils;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthResponseDto register(RegisterRequestDto req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            throw new RuntimeException("Username đã tồn tại");
        }
        
        // Tạo User
        UserEntity user = new UserEntity();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);

        userRepository.save(user);

        // Gửi mail (Async)
        emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());

        String token = jwtUtils.generateToken(user);
        return AuthResponseDto.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

   public AuthResponseDto login(LoginRequestDto req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getIdentifier(), req.getPassword())
        );

        UserEntity user = userRepository.findByUsernameOrEmail(req.getIdentifier())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(user);
        
        return AuthResponseDto.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }
}