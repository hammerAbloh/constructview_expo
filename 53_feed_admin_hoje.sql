-- 53_feed_admin_hoje.sql
SELECT 
    o.nome AS obra,
    c.nome AS construtora,
    oc.tipo,
    oc.titulo,
    oc.impacto_dias,
    u.nome AS autor,
    TIME_FORMAT(oc.data_ocorrencia, '%H:%i') AS hora
FROM ocorrencias oc
JOIN obras o ON oc.id_obra = o.id
JOIN construtoras c ON o.id_construtora = c.id
LEFT JOIN usuarios u ON oc.id_autor = u.id
WHERE DATE(oc.data_ocorrencia) = CURDATE()
ORDER BY oc.data_ocorrencia DESC;