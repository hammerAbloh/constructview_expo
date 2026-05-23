// src/pages/ObraForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function ObraForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    lat: '',
    lng: '',
    progresso: 0,
    construtora: '',
    status: 'EM_ANDAMENTO',
    risco: 'BAIXO',
    roi: '',
    fotos: '',
    evolucao: ''
  });

  useEffect(() => {
    if (id) {
      const fetchObra = async () => {
        try {
          const obra = await api.getObra(id);
          setFormData({
            ...obra,
            fotos: obra.fotos ? obra.fotos.join(', ') : '',
            evolucao: obra.evolucao ? JSON.stringify(obra.evolucao, null, 2) : ''
          });
        } catch (err: any) {
          setError(err.message || 'Erro ao carregar obra');
        }
      };
      fetchObra();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      
      let evolucaoJson = null;
      if (formData.evolucao) {
        try {
          evolucaoJson = JSON.parse(formData.evolucao);
        } catch (e) {
          throw new Error('Evolução deve ser um JSON válido');
        }
      }

      const payload = {
        ...formData,
        progresso: Number(formData.progresso),
        roi: Number(formData.roi),
        lat: Number(formData.lat),
        lng: Number(formData.lng),
        fotos: formData.fotos ? formData.fotos.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
        evolucao: evolucaoJson
      };

      if (id) {
        await api.editarObra(id, payload);
      } else {
        await api.criarObra(payload);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar obra');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = { padding: '0.8rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#fff', width: '100%', boxSizing: 'border-box' as const, marginBottom: '1rem' };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212', color: '#fff', padding: '2rem' }}>
      <div style={{ backgroundColor: '#1e1e1e', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ color: '#06b6d4', marginBottom: '1.5rem' }}>{id ? 'Editar Obra' : 'Criar Nova Obra'}</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome da Obra" value={formData.nome} onChange={handleChange} required style={inputStyle} />
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="number" step="any" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} required style={inputStyle} />
            <input type="number" step="any" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} required style={inputStyle} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="number" name="progresso" placeholder="Progresso (%)" value={formData.progresso} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="construtora" placeholder="Construtora" value={formData.construtora} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="ATRASADA">Atrasada</option>
              <option value="PARALISADA">Paralisada</option>
            </select>
            
            <select name="risco" value={formData.risco} onChange={handleChange} style={inputStyle}>
              <option value="BAIXO">Baixo</option>
              <option value="MEDIO">Médio</option>
              <option value="ALTO">Alto</option>
            </select>
          </div>

          <input type="number" step="any" name="roi" placeholder="ROI (%)" value={formData.roi} onChange={handleChange} style={inputStyle} />
          
          <textarea name="fotos" placeholder="URLs das fotos separadas por vírgula" value={formData.fotos} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} />
          
          <textarea name="evolucao" placeholder='Evolução em JSON (ex: [{"mes":"Jan","progresso":10}])' value={formData.evolucao} onChange={handleChange} style={{ ...inputStyle, minHeight: '120px' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#06b6d4', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', flex: 1 }}>Salvar</button>
            <button type="button" onClick={() => navigate('/')} style={{ padding: '0.8rem 1.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1 }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
