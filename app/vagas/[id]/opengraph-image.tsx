import { ImageResponse } from 'next/og';
import { buscarVagaPorId } from '@/data/vagas';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { id } = await params;
  const vaga = buscarVagaPorId(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08070E',
          padding: '60px',
          color: '#F3F0FA',
          fontFamily: 'sans-serif',
          border: '16px solid #1B1632',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '42px' }}>💼</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            Leque de <span style={{ color: '#F24487' }}>Vagas</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '20px' }}>
            <span style={{ backgroundColor: '#1B1632', padding: '6px 16px', borderRadius: '8px', color: '#A98CE0' }}>
              🏢 {vaga?.empresa || 'Empresa Parceira'}
            </span>
            <span style={{ backgroundColor: '#1B1632', padding: '6px 16px', borderRadius: '8px', color: '#5fd08a' }}>
              🌱 Aceita Iniciante
            </span>
            <span style={{ backgroundColor: '#1B1632', padding: '6px 16px', borderRadius: '8px', color: '#F24487' }}>
              {vaga?.senioridade || 'Júnior'}
            </span>
          </div>

          <div
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            {vaga?.titulo || 'Oportunidade de Tecnologia'}
          </div>

          <div style={{ fontSize: '24px', color: '#B4AEC6' }}>
            📍 {vaga?.local || 'Remoto'} · 🏷️ {vaga?.area || 'Tecnologia'} · 💰 {vaga?.salario || 'A combinar'} ({vaga?.regime || 'CLT'})
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '18px',
            color: '#8B84A0',
            borderTop: '2px solid #1B1632',
            paddingTop: '20px',
          }}
        >
          <span>Plataforma Oficial de Vagas para Migração de Carreira</span>
          <span>Next.js 16 · Turbopack</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
