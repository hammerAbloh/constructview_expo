-- 05_obras_favoritas.sql
SELECT o.id, o.nome, o.imagem_capa_url, o.bairro, o.status, c.nome AS construtora,
    COUNT(f.id_usuario) AS total_favoritos
FROM obras o JOIN construtoras c ON o.id_construtora = c.id
LEFT JOIN favoritos f ON o.id = f.id_obra
GROUP BY o.id ORDER BY total_favoritos DESC LIMIT 10;