-- LIMPA TUDO PRA COMEÇAR DO ZERO
DROP DATABASE IF EXISTS obras_db;
CREATE DATABASE obras_db;
USE obras_db;

-- 1. TIPOS DE USUÁRIO
CREATE TABLE tipos_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

INSERT INTO tipos_usuario (nome, descricao) VALUES 
('cliente', 'Usuário final que acompanha obras'),
('admin', 'Administrador do sistema'),
('construtora', 'Perfil da construtora responsável');

-- 2. USUÁRIOS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario_id INT NOT NULL,
    avatar_url TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_usuario_id) REFERENCES tipos_usuario(id)
);

-- 3. CONSTRUTORAS
CREATE TABLE construtoras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    logo_url TEXT,
    selo_destaque VARCHAR(50),
    nota_confiabilidade DECIMAL(3,1) DEFAULT 5.0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DESATIVA CHECAGEM DE FK
SET FOREIGN_KEY_CHECKS = 0;

-- DROP E RECRIA OBRAS COM SRID CORRETO
DROP TABLE IF EXISTS obras;

CREATE TABLE obras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_construtora INT,
    nome VARCHAR(150) NOT NULL,
    endereco TEXT NOT NULL,
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    cep VARCHAR(9),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    coordenadas POINT GENERATED ALWAYS AS (ST_SRID(POINT(longitude, latitude), 4326)) STORED NOT NULL,
    status ENUM('Planejada', 'Em andamento', 'Atrasada', 'Concluída') DEFAULT 'Planejada',
    porcentagem_concluida INT DEFAULT 0,
    data_inicio_prevista DATE,
    data_fim_prevista DATE,
    data_fim_realizada DATE,
    valor_vgv DECIMAL(12,2),
    imagem_capa_url TEXT,
    modelo_3d_url TEXT,
    qr_code_id VARCHAR(50) UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_construtora) REFERENCES construtoras(id) ON DELETE CASCADE,
    SPATIAL INDEX idx_localizacao (coordenadas)
) ENGINE=InnoDB;

-- REATIVA CHECAGEM DE FK
SET FOREIGN_KEY_CHECKS = 1;

-- 5. FAVORITOS
CREATE TABLE favoritos (
    id_usuario INT,
    id_obra INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_obra),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_obra) REFERENCES obras(id) ON DELETE CASCADE
);

-- 6. OCORRÊNCIAS
CREATE TABLE ocorrencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_obra INT,
    id_autor INT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo ENUM('Atraso', 'Etapa concluída', 'Comunicado', 'Foto'),
    impacto_dias INT DEFAULT 0,
    foto_url TEXT,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_obra) REFERENCES obras(id) ON DELETE CASCADE,
    FOREIGN KEY (id_autor) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 7. PROGRESSO MENSAL
CREATE TABLE progresso_mensal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_obra INT,
    mes_referencia DATE NOT NULL,
    porcentagem_planejada DECIMAL(5,2) NOT NULL,
    porcentagem_realizada DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (id_obra) REFERENCES obras(id) ON DELETE CASCADE,
    UNIQUE KEY unique_obra_mes (id_obra, mes_referencia)
);

-- 8. MENSAGENS
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_obra INT,
    id_remetente INT,
    id_destinatario INT,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    enviada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_obra) REFERENCES obras(id) ON DELETE CASCADE,
    FOREIGN KEY (id_remetente) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (id_destinatario) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 9. CONFIG NOTIFICAÇÕES
CREATE TABLE config_notificacoes (
    id_usuario INT PRIMARY KEY,
    receber_push_ocorrencia BOOLEAN DEFAULT TRUE,
    receber_push_foto BOOLEAN DEFAULT TRUE,
    receber_email_semanal BOOLEAN DEFAULT FALSE,
    receber_email_mensal BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- POPULANDO OBRAS_DB COM DADOS DE APRESENTAÇÃO

-- 1. TIPOS DE USUÁRIO já foram inseridos

-- 2. USUÁRIOS
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario_id, avatar_url) VALUES
('Mariana Costa Silva', 'mariana.costa@email.com', '$2y$10$exemploHash1', 1, 'https://i.imgur.com/avatar1.jpg'),
('Ricardo Almeida Santos', 'ricardo.almeida@email.com', '$2y$10$exemploHash2', 3, 'https://i.imgur.com/avatar2.jpg'),
('Juliana Mendes Rocha', 'juliana.rocha@email.com', '$2y$10$exemploHash3', 2, 'https://i.imgur.com/avatar3.jpg'),
('Fernando Barros Lima', 'fernando.lima@email.com', '$2y$10$exemploHash4', 1, 'https://i.imgur.com/avatar4.jpg'),
('Camila Nogueira Dias', 'camila.dias@construlagge.com.br', '$2y$10$exemploHash5', 3, 'https://i.imgur.com/avatar5.jpg');

-- 3. CONSTRUTORAS
INSERT INTO construtoras (nome, cnpj, logo_url, selo_destaque, nota_confiabilidade) VALUES
('ConstruLagge Engenharia', '12.345.678/0001-90', 'https://i.imgur.com/logo-lagge.png', 'Construtora Premium', 9.7),
('Plano Urbano Incorporações', '23.456.789/0001-01', 'https://i.imgur.com/logo-plano.png', 'Sustentabilidade', 9.2),
('Horizonte Novo Empreendimentos', '34.567.890/0001-12', 'https://i.imgur.com/logo-horizonte.png', 'Entrega Rápida', 8.8);

-- 4. OBRAS - Usando coordenadas reais de Osasco/SP e região
INSERT INTO obras (id_construtora, nome, endereco, bairro, cidade, cep, latitude, longitude, status, porcentagem_concluida, data_inicio_prevista, data_fim_prevista, valor_vgv, imagem_capa_url, modelo_3d_url, qr_code_id) VALUES
(1, 'Residencial Bosque das Palmeiras', 'Av. dos Autonomistas, 2500', 'Vila Yara', 'Osasco', '06020-015', -23.5329, -46.7920, 'Em andamento', 68, '2025-03-15', '2026-08-30', 28500000.00, 'https://i.imgur.com/obra1-capa.jpg', 'https://models.com/bosque-palmeiras.glb', 'OBRA2025001'),
(2, 'Mirante Vila Campesina', 'Rua Antônio Agú, 1250', 'Centro', 'Osasco', '06013-010', -23.5370, -46.7745, 'Em andamento', 42, '2025-06-10', '2027-02-20', 42300000.00, 'https://i.imgur.com/obra2-capa.jpg', 'https://models.com/mirante-campesina.glb', 'OBRA2025002'),
(1, 'Jardim Atlântico Residences', 'Av. Franz Voegeli, 800', 'Continental', 'Osasco', '06020-190', -23.5285, -46.8012, 'Planejada', 5, '2026-01-20', '2027-11-15', 35800000.00, 'https://i.imgur.com/obra3-capa.jpg', NULL, 'OBRA2025003'),
(3, 'Alto da Granja Corporate', 'Av. Maria Campos, 340', 'Vila Campesina', 'Osasco', '06023-140', -23.5401, -46.7823, 'Concluída', 100, '2024-02-01', '2025-12-10', 51200000.00, 'https://i.imgur.com/obra4-capa.jpg', 'https://models.com/alto-granja.glb', 'OBRA2024004');

-- 5. FAVORITOS
INSERT INTO favoritos (id_usuario, id_obra) VALUES
(1, 1),
(1, 2),
(4, 1),
(4, 3);

-- 6. OCORRÊNCIAS
INSERT INTO ocorrencias (id_obra, id_autor, titulo, descricao, tipo, impacto_dias, foto_url) VALUES
(1, 2, 'Concretagem 15º andar concluída', 'Etapa de concretagem finalizada com sucesso. Aguardando 7 dias de cura.', 'Etapa concluída', 0, 'https://i.imgur.com/foto-concretagem.jpg'),
(1, 2, 'Atraso na entrega de esquadrias', 'Fornecedor informou atraso de 12 dias devido a problema logístico.', 'Atraso', 12, NULL),
(2, 5, 'Início da fundação', 'Escavação e estaqueamento iniciados conforme cronograma.', 'Comunicado', 0, 'https://i.imgur.com/foto-fundacao.jpg'),
(4, 5, 'Habite-se emitido', 'Prefeitura de Osasco emitiu o Habite-se. Obra oficialmente entregue.', 'Etapa concluída', 0, 'https://i.imgur.com/foto-habitese.jpg'),
(1, 2, 'Visita técnica com clientes', 'Grupo de 8 clientes visitou o decorado no 4º andar.', 'Foto', 0, 'https://i.imgur.com/foto-visita.jpg');

-- 7. PROGRESSO MENSAL - Curva S do Residencial Bosque das Palmeiras
INSERT INTO progresso_mensal (id_obra, mes_referencia, porcentagem_planejada, porcentagem_realizada) VALUES
(1, '2025-03-01', 8.50, 7.20),
(1, '2025-04-01', 17.30, 15.80),
(1, '2025-05-01', 26.40, 24.50),
(1, '2025-06-01', 35.90, 33.10),
(1, '2025-07-01', 45.20, 42.60),
(1, '2025-08-01', 54.70, 51.90),
(1, '2025-09-01', 63.80, 60.40),
(1, '2025-10-01', 71.50, 68.00);

-- 8. MENSAGENS
INSERT INTO mensagens (id_obra, id_remetente, id_destinatario, mensagem, lida) VALUES
(1, 1, 2, 'Bom dia! Gostaria de saber se a visita ao decorado pode ser agendada para sábado?', TRUE),
(1, 2, 1, 'Bom dia Mariana! Claro, temos horário às 10h ou 14h. Qual prefere?', TRUE),
(1, 1, 2, 'Perfeito, pode ser às 10h. Obrigada!', FALSE),
(2, 4, 5, 'Vocês terão unidade garden disponível no lançamento?', FALSE);

-- 9. CONFIG NOTIFICAÇÕES
INSERT INTO config_notificacoes (id_usuario, receber_push_ocorrencia, receber_push_foto, receber_email_semanal, receber_email_mensal) VALUES
(1, TRUE, TRUE, TRUE, TRUE),
(2, TRUE, TRUE, FALSE, TRUE),
(3, TRUE, FALSE, FALSE, TRUE),
(4, TRUE, TRUE, TRUE, FALSE),
(5, TRUE, TRUE, FALSE, TRUE);