-- 22_obra_previsao_atraso.sql
-- Prevê atraso baseado na velocidade atual da obra
SELECT 
    o.id,
    o.nome,
    o.status,
    o.porcentagem_concluida AS atual,
    o.data_fim_prevista,
    DATEDIFF(CURDATE(), o.data_inicio_prevista) AS dias_decorridos,
    
    -- Velocidade: % por dia desde o início
    ROUND(o.porcentagem_concluida / NULLIF(DATEDIFF(CURDATE(), o.data_inicio_prevista), 0), 2) AS velocidade_dia,
    
    -- Data prevista real baseada na velocidade
    DATE_ADD(CURDATE(), INTERVAL ROUND((100 - o.porcentagem_concluida) / NULLIF(o.porcentagem_concluida / NULLIF(DATEDIFF(CURDATE(), o.data_inicio_prevista), 0), 0), 0) DAY) AS previsao_entrega_real,
    
    -- Atraso/adiantamento previsto em dias. Positivo = vai atrasar
    DATEDIFF(
        DATE_ADD(CURDATE(), INTERVAL ROUND((100 - o.porcentagem_concluida) / NULLIF(o.porcentagem_concluida / NULLIF(DATEDIFF(CURDATE(), o.data_inicio_prevista), 0), 0), 0) DAY),
        o.data_fim_prevista
    ) AS dias_atraso_previsto,
    
    c.nome AS construtora
FROM obras o
JOIN construtoras c ON o.id_construtora = c.id
WHERE o.status = 'Em andamento' AND o.porcentagem_concluida > 5
ORDER BY dias_atraso_previsto DESC;