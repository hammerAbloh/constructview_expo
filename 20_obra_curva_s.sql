-- CURVA S: Evolução planejada x realizada de uma obra
SELECT 
    DATE_FORMAT(mes_referencia, '%Y-%m') AS mes,
    DATE_FORMAT(mes_referencia, '%b/%y') AS mes_label,
    porcentagem_planejada AS planejado,
    porcentagem_realizada AS realizado,
    (porcentagem_realizada - porcentagem_planejada) AS desvio
FROM progresso_mensal
WHERE id_obra = 1  -- Residencial Bosque das Palmeiras
ORDER BY mes_referencia ASC;