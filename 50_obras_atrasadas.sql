-- OBRAS ATRASADAS OU EM RISCO
SELECT 
    o.id,
    o.nome,
    o.status,
    o.porcentagem_concluida,
    o.data_fim_prevista,
    DATEDIFF(CURDATE(), o.data_fim_prevista) AS dias_atraso,
    c.nome AS construtora,
    CASE 
        WHEN o.status = 'Atrasada' THEN 'Crítico'
        WHEN DATEDIFF(o.data_fim_prevista, CURDATE()) <= 30 AND o.porcentagem_concluida < 80 THEN 'Atenção'
        ELSE 'No prazo'
    END AS nivel_alerta
FROM obras o
JOIN construtoras c ON o.id_construtora = c.id
WHERE o.status IN ('Em andamento', 'Atrasada')
ORDER BY dias_atraso DESC;