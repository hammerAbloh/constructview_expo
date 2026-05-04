-- 08_roi_cliente.sql -- Troca id_usuario = 1
SELECT
    o.id, o.nome, o.status, o.porcentagem_concluida,
    o.valor_vgv AS valor_total_obra,
    ROUND(o.valor_vgv * (o.porcentagem_concluida / 100), 2) AS valor_ja_construido,
    o.data_fim_prevista,
    CASE
        WHEN o.status = 'Concluída' THEN 'Imóvel valorizado e entregue'
        WHEN DATEDIFF(o.data_fim_prevista, CURDATE()) < 0 THEN 'Atenção: Obra atrasada'
        ELSE CONCAT('Entrega prevista em ', DATEDIFF(o.data_fim_prevista, CURDATE()), ' dias')
    END AS status_investimento
FROM obras o JOIN favoritos f ON o.id = f.id_obra
WHERE f.id_usuario = 1 ORDER BY o.porcentagem_concluida DESC;