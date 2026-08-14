import { useState } from 'react';

export function MethodologyPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-term-border">
      <div
        className="bg-term-highlight px-2 py-0.5 border-b border-term-border flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-term-cyan text-xs">
          ┤ Como o CO₂ é Calculado — AWS Customer Carbon Footprint Tool ├
        </span>
        <span className="text-term-yellow text-xs">
          {expanded ? '[-]' : '[+]'}
        </span>
      </div>

      {expanded && (
        <div className="p-3 text-xs space-y-3 font-mono">
          {/* Intro */}
          <div>
            <span className="text-term-green">$ </span>
            <span className="text-term-fg">
              O Carbon Lens utiliza a mesma metodologia do{' '}
              <span className="text-term-cyan">AWS Customer Carbon Footprint Tool (CCFT)</span>
              {' '}para estimar emissões de carbono da infraestrutura cloud.
            </span>
          </div>

          {/* Formula */}
          <div className="text-term-dim">─── Fórmula Base ─────────────────────────────────</div>
          <pre className="text-term-yellow pl-2">{`
  Emissões (MTCO₂e) = Consumo de Energia (MWh) × Fator de Emissão (kgCO₂e/kWh)
          `}</pre>

          {/* Scopes */}
          <div className="text-term-dim">─── Escopos de Emissão (GHG Protocol) ────────────</div>
          
          <div className="space-y-2 pl-2">
            <div>
              <span className="text-term-yellow">Escopo 1 — Emissões Diretas</span>
              <div className="text-term-fg pl-2 mt-0.5">
                Combustão de combustível em geradores de backup nos data centers.
                <br />
                AWS calcula por site, depois agrega por cluster (região).
              </div>
            </div>
            
            <div>
              <span className="text-term-yellow">Escopo 2 — Emissões Indiretas</span>
              <div className="text-term-fg pl-2 mt-0.5">
                Eletricidade comprada para operar os data centers.
                <br />
                Usa o método Market-Based (MBM) com fatores de emissão
                <br />
                específicos da localização geográfica (grid energético local).
              </div>
            </div>
          </div>

          {/* Allocation model */}
          <div className="text-term-dim">─── Modelo de Alocação (v2.0) ────────────────────</div>
          
          <div className="pl-2 space-y-1">
            <div>
              <span className="text-term-green">1.</span>
              <span className="text-term-fg"> Aloca emissões do cluster → server racks</span>
            </div>
            <div>
              <span className="text-term-green">2.</span>
              <span className="text-term-fg"> Aloca emissões dos racks → serviços AWS (EC2, S3, Lambda...)</span>
            </div>
            <div>
              <span className="text-term-green">3.</span>
              <span className="text-term-fg"> Aloca emissões dos serviços → conta do cliente</span>
            </div>
          </div>

          {/* Key points */}
          <div className="text-term-dim">─── Pontos-Chave ─────────────────────────────────</div>
          
          <div className="pl-2 space-y-1">
            <div>
              <span className="text-term-cyan">►</span>
              <span className="text-term-fg"> Capacidade ociosa é distribuída proporcionalmente entre clientes</span>
            </div>
            <div>
              <span className="text-term-cyan">►</span>
              <span className="text-term-fg"> Overhead dos data centers (rede, cooling) é incluído</span>
            </div>
            <div>
              <span className="text-term-cyan">►</span>
              <span className="text-term-fg"> Serviços sem hardware dedicado (Lambda) herdam emissões do infra subjacente</span>
            </div>
            <div>
              <span className="text-term-cyan">►</span>
              <span className="text-term-fg"> Resultado em MTCO₂e (Metric Tons of CO₂ equivalent)</span>
            </div>
            <div>
              <span className="text-term-cyan">►</span>
              <span className="text-term-fg"> Dados atualizados mensalmente com 3 meses de atraso</span>
            </div>
          </div>

          {/* Standards */}
          <div className="text-term-dim">─── Padrões e Normas ─────────────────────────────</div>
          
          <div className="pl-2 space-y-0.5 text-term-dim">
            <div>• GHG Protocol Corporate Standard</div>
            <div>• GHG Protocol Product Standard</div>
            <div>• ISO 14040/14044 (Life Cycle Assessment)</div>
            <div>• ISO 14067 (Carbon footprint of products)</div>
            <div>• ICT Sector Guidance</div>
          </div>

          {/* How Carbon Lens uses this */}
          <div className="text-term-dim">─── Como o Carbon Lens Utiliza ───────────────────</div>
          
          <div className="pl-2 space-y-1">
            <div>
              <span className="text-term-green">$</span>
              <span className="text-term-fg"> O Carbon Lens consome dados do CCFT/AWS Sustainability via API</span>
            </div>
            <div>
              <span className="text-term-green">$</span>
              <span className="text-term-fg"> Correlaciona emissões com utilização real por recurso</span>
            </div>
            <div>
              <span className="text-term-green">$</span>
              <span className="text-term-fg"> Calcula a redução potencial de CO₂ baseado em:</span>
            </div>
            <div className="pl-4">
              <div><span className="text-term-yellow">-</span> Rightsizing → menos energia consumida</div>
              <div><span className="text-term-yellow">-</span> Graviton (ARM) → 60% mais eficiente energeticamente</div>
              <div><span className="text-term-yellow">-</span> Remoção de recursos ociosos → zero emissão</div>
              <div><span className="text-term-yellow">-</span> Consolidação de regiões → grid mais limpo</div>
              <div><span className="text-term-yellow">-</span> Storage lifecycle → menos armazenamento ativo</div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-2 border-l-2 border-term-yellow pl-2">
            <span className="text-term-yellow">NOTA:</span>
            <span className="text-term-dim">
              {' '}O CCFT será descontinuado em 30/06/2026. A AWS lançou o novo serviço
              {' '}<span className="text-term-cyan">AWS Sustainability</span> com funcionalidades adicionais.
            </span>
          </div>

          <div className="text-term-dim">──────────────────────────────────────────────────</div>
        </div>
      )}
    </div>
  );
}
