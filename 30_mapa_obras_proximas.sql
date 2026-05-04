-- BUSCAR OBRAS PRÓXIMAS: Raio de 5km do centro de Osasco - CORRIGIDA
SET @lat_ref = -23.5320;  -- Latitude do centro de Osasco
SET @lon_ref = -46.7916; -- Longitude do centro de Osasco
SET @raio_km = 5;

SELECT 
    o.id,
    o.nome,
    o.endereco,
    o.bairro,
    o.status,
    o.porcentagem_concluida,
    c.nome AS construtora,
    ROUND(
        ST_Distance_Sphere(
            o.coordenadas, 
            ST_SRID(POINT(@lon_ref, @lat_ref), 4326)
        ) / 1000, 2
    ) AS distancia_km
FROM obras o
JOIN construtoras c ON o.id_construtora = c.id
WHERE ST_Distance_Sphere(
    o.coordenadas, 
    ST_SRID(POINT(@lon_ref, @lat_ref), 4326)
) <= @raio_km * 1000
ORDER BY distancia_km ASC;