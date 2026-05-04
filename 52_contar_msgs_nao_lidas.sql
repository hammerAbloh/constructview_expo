-- CONTAR MENSAGENS NÃO LIDAS - usa id_usuario = 1 como exemplo
SELECT 
    COUNT(*) AS total_nao_lidas,
    COUNT(DISTINCT id_obra) AS obras_com_mensagem
FROM mensagens
WHERE id_destinatario = 1 AND lida = FALSE;