-- Só roda as colunas que ainda NÃO existem
ALTER TABLE obras ADD COLUMN descricao TEXT;
ALTER TABLE obras ADD COLUMN video_drone_url VARCHAR(255);
ALTER TABLE obras ADD COLUMN qtd_dormitorios INT DEFAULT 2;
ALTER TABLE obras ADD COLUMN valor_m2 DECIMAL(10,2);
ALTER TABLE obras ADD COLUMN selo_destaque VARCHAR(100);

ALTER TABLE construtoras ADD COLUMN site_url VARCHAR(255);
ALTER TABLE construtoras ADD COLUMN telefone VARCHAR(20);

DESCRIBE obras;
DESCRIBE construtoras;