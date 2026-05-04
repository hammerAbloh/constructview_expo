-- FEED DE ATUALIZAÇÕES DA OBRA - usa id_obra = 1 como exemplo
SELECT 
    oc.id,
    oc.titulo,
    oc.descricao,
    oc.tipo,
    oc.impacto_dias,
    oc.foto_url,
    oc.data_ocorrencia,
    u.nome AS autor,
    u.avatar_url
FROM ocorrencias oc
LEFT JOIN usuarios u ON oc.id_autor = u.id
WHERE oc.id_obra = 1
ORDER BY oc.data_ocorrencia DESC
LIMIT 20;