-- 11_comparar_obras.sql -- Troca os IDs: obra1 = 1, obra2 = 2
SELECT
    o.id, o.nome, o.bairro, o.status, o.porcentagem_concluida, o.valor_vgv,
    ROUND(o.valor_vgv * (o.porcentagem_concluida / 100), 2) AS valor_construido,
    o.data_fim_prevista, DATEDIFF(o.data_fim_prevista, CURDATE()) AS dias_para_entrega,
    c.nome AS construtora, c.nota_confiabilidade, c.selo_destaque,
    (SELECT COUNT(*) FROM favoritos WHERE id_obra = o.id) AS total_favoritos,
    (SELECT COUNT(*) FROM ocorrencias WHERE id_obra = o.id AND tipo = 'Atraso') AS total_atrasos
FROM obras o JOIN construtoras c ON o.id_construtora = c.id
WHERE o.id IN (1, 2) ORDER BY FIELD(o.id, 1, 2);