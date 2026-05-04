-- 12_notificacoes_push_dia.sql -- Troca id_usuario = 1
SELECT
    o.nome AS nome_obra, oc.titulo, oc.tipo, oc.impacto_dias,
    TIME_FORMAT(oc.data_ocorrencia, '%H:%i') AS hora,
    CASE
        WHEN oc.tipo = 'Atraso' THEN CONCAT('Atenção: ', oc.titulo, ' - Impacto de ', oc.impacto_dias, ' dias')
        WHEN oc.tipo = 'Etapa concluída' THEN CONCAT('Boa notícia: ', oc.titulo, ' foi finalizada!')
        WHEN oc.tipo = 'Foto' THEN 'Nova foto da sua obra disponível'
        ELSE oc.titulo
    END AS mensagem_push
FROM ocorrencias oc JOIN obras o ON oc.id_obra = o.id
JOIN favoritos f ON o.id = f.id_obra
WHERE f.id_usuario = 1 AND DATE(oc.data_ocorrencia) = CURDATE()
ORDER BY oc.data_ocorrencia DESC;