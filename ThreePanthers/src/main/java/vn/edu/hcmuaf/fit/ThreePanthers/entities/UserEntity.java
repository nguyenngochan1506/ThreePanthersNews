package vn.edu.hcmuaf.fit.ThreePanthers.entities;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;

@Entity
@Table(name = "tbl_users")
public class UserEntity extends BaseEntity {
    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @OneToMany(mappedBy = "author")
    private Set<PostEntity> posts = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<CommentEntity> comments = new HashSet<>();
}
