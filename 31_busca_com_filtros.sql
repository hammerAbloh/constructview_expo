-- BUSCA COM FILTROS - exemplo: Osasco, em andamento, até 30km
SET @lat_user = -23.5320;
SET @lon_user = -46.7916;
SET @raio_max = 30;

SELECT 
    o.id, o.nome, o.bairro, o.status, o.porcentagem_concluida,
    o.imagem_capa_url, c.nome AS construtora,
    ROUND(ST_Distance_Sphere(o.coordenadas, ST_SRID(POINT(@lon_user, @lat_user), 4326)) / 1000, 1) AS km
FROM obras o
JOIN construtoras c ON o.id_construtora = c.id
WHERE o.cidade = 'Osasco'
    AND o.status = 'Em andamento'
    AND ST_Distance_Sphere(o.coordenadas, ST_SRID(POINT(@lon_user, @lat_user), 4326)) <= @raio_max * 1000
ORDER BY km ASC;