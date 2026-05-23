const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Função auxiliar para ler e preparar a query SQL
function getQuery(filename, replacements = []) {
    const filePath = path.join(__dirname, filename);
    let sql = fs.readFileSync(filePath, 'utf8');
    
    // Aplica os replaces (ex: trocando IDs hardcoded por ?)
    for (const r of replacements) {
        sql = sql.replace(r.search, r.replace);
    }
    
    return sql;
}

// 1. Números Gerais
app.get('/api/home/numeros-gerais', async (req, res) => {
    try {
        const sql = getQuery('10_home_numeros_gerais.sql');
        const [rows] = await db.query(sql);
        res.json(rows[0] || {}); // retorna um único objeto
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Curva S Consolidada
app.get('/api/home/curva-s-consolidada', async (req, res) => {
    try {
        const sql = getQuery('11_curva_s_consolidada.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Obra Curva S
app.get('/api/obras/:id/curva-s', async (req, res) => {
    try {
        const sql = getQuery('20_obra_curva_s.sql', [
            { search: /id_obra = 1/g, replace: 'id_obra = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Obra Feed Atualizações
app.get('/api/obras/:id/feed', async (req, res) => {
    try {
        const sql = getQuery('21_obra_feed_atualizacoes.sql', [
            { search: /oc\.id_obra = 1/g, replace: 'oc.id_obra = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Obra Previsão Atraso (retorna todas)
app.get('/api/obras-previsao-atraso', async (req, res) => {
    try {
        const sql = getQuery('22_obra_previsao_atraso.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Mapa Obras Próximas
app.get('/api/obras/mapa/proximas', async (req, res) => {
    try {
        const sql = getQuery('30_mapa_obras_proximas.sql', [
            { search: /SET @lat_ref = -23\.5320;/g, replace: 'SET @lat_ref = ?;' },
            { search: /SET @lon_ref = -46\.7916;/g, replace: 'SET @lon_ref = ?;' },
            { search: /SET @raio_km = 5;/g, replace: 'SET @raio_km = ?;' }
        ]);
        const lat = req.query.lat || -23.5320;
        const lon = req.query.lon || -46.7916;
        const raio = req.query.raio || 5;
        
        // multipleStatements: true permite retornar múltiplos resultados
        const [results] = await db.query(sql, [lat, lon, raio]);
        // O último item do array de resultados é o SELECT
        const rows = results[results.length - 1];
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Busca com Filtros
app.get('/api/obras/busca', async (req, res) => {
    try {
        let sql = getQuery('31_busca_com_filtros.sql');
        const params = [];
        
        // Verifica as substituições via regex se presentes
        if (req.query.status) {
            sql = sql.replace(/'Em andamento'/g, '?');
            params.push(req.query.status);
        }
        if (req.query.cidade) {
            sql = sql.replace(/'Osasco'/g, '?');
            params.push(req.query.cidade);
        }
        if (req.query.id_construtora) {
            sql = sql.replace(/o\.id_construtora = 10/g, 'o.id_construtora = ?');
            params.push(req.query.id_construtora);
        }

        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Comparar Obras
app.get('/api/obras/comparar', async (req, res) => {
    try {
        let sql = getQuery('32_comparar_obras.sql');
        const ids = req.query.ids ? req.query.ids.split(',') : [1, 2];
        
        const placeholders = ids.map(() => '?').join(',');
        sql = sql.replace(/IN \(1, 2\)/g, `IN (${placeholders})`);
        sql = sql.replace(/FIELD\(o\.id, 1, 2\)/g, `FIELD(o.id, ${placeholders})`);
        
        const params = [...ids, ...ids];
        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9. Top Construtoras
app.get('/api/construtoras/top', async (req, res) => {
    try {
        const sql = getQuery('40_top_construtoras.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 10. Obras Favoritas
app.get('/api/obras/favoritas/ranking', async (req, res) => {
    try {
        const sql = getQuery('41_obras_favoritas.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 11. Construtora Raio-X
app.get('/api/construtoras/:id/raiox', async (req, res) => {
    try {
        const sql = getQuery('42_construtora_raiox.sql', [
            { search: /WHERE c\.id = 1/g, replace: 'WHERE c.id = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 12. Obras Atrasadas
app.get('/api/admin/obras-atrasadas', async (req, res) => {
    try {
        const sql = getQuery('50_obras_atrasadas.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 13. Notificações Push Dia
app.get('/api/usuarios/:id/notificacoes-push', async (req, res) => {
    try {
        const sql = getQuery('51_notificacoes_push_dia.sql', [
            { search: /WHERE f\.id_usuario = 1/g, replace: 'WHERE f.id_usuario = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 14. Contar Mensagens Não Lidas
app.get('/api/usuarios/:id/mensagens-nao-lidas', async (req, res) => {
    try {
        const sql = getQuery('52_contar_msgs_nao_lidas.sql', [
            { search: /WHERE id_destinatario = 1/g, replace: 'WHERE id_destinatario = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 15. Feed Admin Hoje
app.get('/api/admin/feed-hoje', async (req, res) => {
    try {
        const sql = getQuery('53_feed_admin_hoje.sql');
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 16. Cliente ROI
app.get('/api/clientes/:id/roi', async (req, res) => {
    try {
        const sql = getQuery('60_cliente_roi.sql', [
            { search: /WHERE f\.id_usuario = 1/g, replace: 'WHERE f.id_usuario = ?' }
        ]);
        const [rows] = await db.query(sql, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`Acesse http://localhost:${port}/api/home/numeros-gerais para testar!`);
});
