-- CURVA S CONSOLIDADA DO MÊS
SELECT 
    DATE_FORMAT(pm.mes_referencia, '%b/%y') AS mes,
    COUNT(DISTINCT pm.id_obra) AS obras_ativas,
    ROUND(AVG(pm.porcentagem_planejada),1) AS media_planejado,
    ROUND(AVG(pm.porcentagem_realizada),1) AS media_realizado
FROM progresso_mensal pm
JOIN obras o ON pm.id_obra = o.id
WHERE o.status = 'Em andamento'
GROUP BY pm.mes_referencia
ORDER BY pm.mes_referencia ASC;