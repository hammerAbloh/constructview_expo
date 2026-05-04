-- NÚMEROS GERAIS PRA HOME
SELECT 
    (SELECT COUNT(*) FROM obras WHERE status = 'Em andamento') AS obras_ativas,
    (SELECT COUNT(*) FROM obras WHERE status = 'Concluída') AS obras_entregues,
    (SELECT COUNT(*) FROM usuarios WHERE tipo_usuario_id = 1) AS total_clientes,
    (SELECT ROUND(AVG(nota_confiabilidade),1) FROM construtoras) AS nota_media_construtoras,
    (SELECT COUNT(*) FROM ocorrencias WHERE DATE(data_ocorrencia) = CURDATE()) AS ocorrencias_hoje;