-- RAIO-X DA CONSTRUTORA - usa id = 1 como exemplo
SELECT 
    c.nome,
    c.nota_confiabilidade,
    COUNT(o.id) AS total_obras,
    SUM(CASE WHEN o.status = 'Concluída' THEN 1 ELSE 0 END) AS entregues,
    SUM(CASE WHEN o.status = 'Atrasada' THEN 1 ELSE 0 END) AS atrasadas,
    ROUND(AVG(o.porcentagem_concluida),1) AS media_conclusao,
    ROUND(AVG(DATEDIFF(o.data_fim_realizada, o.data_fim_prevista)),0) AS media_dias_atraso_entregas
FROM construtoras c
LEFT JOIN obras o ON c.id = o.id_construtora
WHERE c.id = 1
GROUP BY c.id;