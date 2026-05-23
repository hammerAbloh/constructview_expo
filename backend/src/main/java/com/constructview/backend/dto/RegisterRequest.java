package com.constructview.backend.dto;

import com.constructview.backend.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String nome;
    private String email;
    private String senha;
    private Role role;
    private String codigoConvite;
}
