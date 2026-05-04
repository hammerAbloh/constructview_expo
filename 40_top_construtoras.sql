-- 04_top_construtoras.sql
SELECT c.id, c.nome, c.logo_url, c.selo_destaque, c.nota_confiabilidade,
    COUNT(o.id) AS total_obras,
    SUM(CASE WHEN o.status = 'Concluída' AND o.data_fim_realizada <= o.data_fim_prevista THEN 1 ELSE 0 END) AS entregues_no_prazo
FROM construtoras c LEFT JOIN obras o ON c.id = o.id_construtora
GROUP BY c.id ORDER BY c.nota_confiabilidade DESC LIMIT 10;