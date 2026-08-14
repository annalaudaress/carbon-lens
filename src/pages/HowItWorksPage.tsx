export function HowItWorksPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Title */}
        <pre className="text-term-green">{`
╔═══════════════════════════════════════════════════════════════════╗
║                    🌿 COMO FUNCIONA O CARBON LENS                ║
╚═══════════════════════════════════════════════════════════════════╝`}</pre>

        {/* What is it */}
        <Section title="O que é o Carbon Lens?">
          <p className="text-term-fg leading-relaxed">
            O Carbon Lens é uma solução de <span className="text-term-cyan">Cloud Sustainability</span> que 
            conecta <span className="text-term-green">Cloud + DevOps + FinOps + Sustentabilidade</span>.
          </p>
          <p className="text-term-fg leading-relaxed mt-2">
            A ferramenta analisa a infraestrutura cloud da sua empresa e mostra:
          </p>
          <ul className="mt-1 space-y-0.5 text-term-fg">
            <li><span className="text-term-green">►</span> Onde você está gastando mais do que deveria</li>
            <li><span className="text-term-green">►</span> Qual o impacto ambiental dos seus recursos</li>
            <li><span className="text-term-green">►</span> O que fazer para reduzir custos e emissões de CO₂</li>
          </ul>
        </Section>

        {/* How CO2 is calculated */}
        <Section title="Como o CO₂ é Calculado?">
          <p className="text-term-fg leading-relaxed">
            O Carbon Lens utiliza a metodologia do{' '}
            <span className="text-term-cyan">AWS Customer Carbon Footprint Tool (CCFT)</span>,
            agora evoluindo para o novo serviço <span className="text-term-cyan">AWS Sustainability</span>.
          </p>

          <div className="mt-3 border border-term-border p-3">
            <div className="text-term-yellow mb-2">─── Fórmula Base ───</div>
            <pre className="text-term-green pl-2">
{`Emissões (MTCO₂e) = Consumo de Energia (MWh) × Fator de Emissão (kgCO₂e/kWh)`}</pre>
          </div>

          <div className="mt-3">
            <div className="text-term-yellow">─── Escopos de Emissão (GHG Protocol) ───</div>
            <div className="mt-2 space-y-3 pl-2">
              <div>
                <span className="text-term-yellow font-bold">Escopo 1 — Emissões Diretas</span>
                <div className="text-term-fg pl-2 mt-0.5">
                  Combustão de combustível em geradores de backup nos data centers AWS.
                  <br />
                  Calculado por site e agregado por cluster/região.
                </div>
              </div>
              <div>
                <span className="text-term-yellow font-bold">Escopo 2 — Emissões Indiretas</span>
                <div className="text-term-fg pl-2 mt-0.5">
                  Eletricidade comprada para operar os data centers.
                  <br />
                  Usa o método <span className="text-term-cyan">Market-Based (MBM)</span> com fatores de emissão
                  baseados no grid energético de cada região.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-term-yellow">─── Modelo de Alocação (v2.0) ───</div>
            <div className="mt-2 pl-2 space-y-1">
              <div><span className="text-term-green">1.</span> Emissões do cluster → alocadas para server racks</div>
              <div><span className="text-term-green">2.</span> Emissões dos racks → alocadas para serviços AWS (EC2, S3, Lambda...)</div>
              <div><span className="text-term-green">3.</span> Emissões dos serviços → alocadas para a conta do cliente</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-term-yellow">─── O que é incluído no cálculo ───</div>
            <div className="mt-2 pl-2 space-y-0.5 text-term-fg">
              <div><span className="text-term-cyan">►</span> Capacidade ociosa é distribuída proporcionalmente entre clientes</div>
              <div><span className="text-term-cyan">►</span> Overhead dos data centers (rede, refrigeração) é incluído</div>
              <div><span className="text-term-cyan">►</span> Serviços serverless (Lambda) herdam emissões da infra subjacente</div>
              <div><span className="text-term-cyan">►</span> Resultado em MTCO₂e (Metric Tons of CO₂ equivalent)</div>
              <div><span className="text-term-cyan">►</span> Dados atualizados mensalmente</div>
            </div>
          </div>
        </Section>

        {/* How Carbon Lens reduces CO2 */}
        <Section title="Como o Carbon Lens Calcula a Redução?">
          <p className="text-term-fg leading-relaxed">
            O Carbon Lens estima o potencial de redução de CO₂ baseado nas otimizações recomendadas:
          </p>
          <div className="mt-2 pl-2 space-y-1">
            <div>
              <span className="text-term-yellow">Rightsizing</span>
              <span className="text-term-dim"> → Instâncias menores consomem menos energia</span>
            </div>
            <div>
              <span className="text-term-yellow">Graviton (ARM)</span>
              <span className="text-term-dim"> → 60% mais eficiente energeticamente que x86</span>
            </div>
            <div>
              <span className="text-term-yellow">Remoção de recursos ociosos</span>
              <span className="text-term-dim"> → Zero emissão para o que não está sendo usado</span>
            </div>
            <div>
              <span className="text-term-yellow">Consolidação de regiões</span>
              <span className="text-term-dim"> → Regiões com grid mais limpo = menos CO₂/kWh</span>
            </div>
            <div>
              <span className="text-term-yellow">Storage lifecycle</span>
              <span className="text-term-dim"> → Menos armazenamento ativo = menos energia</span>
            </div>
            <div>
              <span className="text-term-yellow">Auto-scaling</span>
              <span className="text-term-dim"> → Recursos só existem quando necessários</span>
            </div>
          </div>
        </Section>

        {/* Standards */}
        <Section title="Padrões e Normas Utilizados">
          <div className="pl-2 space-y-0.5 text-term-fg">
            <div><span className="text-term-dim">•</span> GHG Protocol Corporate Standard</div>
            <div><span className="text-term-dim">•</span> GHG Protocol Product Standard</div>
            <div><span className="text-term-dim">•</span> ISO 14040/14044 (Life Cycle Assessment)</div>
            <div><span className="text-term-dim">•</span> ISO 14067 (Carbon footprint of products)</div>
            <div><span className="text-term-dim">•</span> ICT Sector Guidance built on GHG Protocol</div>
          </div>
        </Section>

        {/* Architecture */}
        <Section title="Arquitetura da Solução">
          <pre className="text-term-cyan leading-relaxed">{`
  ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
  │  AWS Account │────▶│  Carbon Lens API  │────▶│   Dashboard Web  │
  └──────────────┘     └───────────────────┘     └──────────────────┘
         │                      │                         │
         ▼                      ▼                         ▼
  ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
  │ CCFT / AWS   │     │ Análise &         │     │ Score, Métricas  │
  │ Sustainability│     │ Recomendações     │     │ Oportunidades    │
  └──────────────┘     └───────────────────┘     └──────────────────┘
         │                      │                         │
         ▼                      ▼                         ▼
  ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
  │ Cost Explorer│     │ Motor de          │     │ Relatórios &     │
  │ CloudWatch   │     │ Scoring           │     │ Exportação       │
  └──────────────┘     └───────────────────┘     └──────────────────┘`}</pre>
        </Section>

        {/* Connection */}
        <Section title="Cloud + DevOps + FinOps + Sustainability">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="border border-term-border p-3">
              <div className="text-term-cyan font-bold mb-1">☁️ Cloud</div>
              <div className="text-term-fg">Análise de recursos AWS em tempo real. EC2, S3, RDS, Lambda e mais.</div>
            </div>
            <div className="border border-term-border p-3">
              <div className="text-term-yellow font-bold mb-1">⚙️ DevOps</div>
              <div className="text-term-fg">Integração com pipelines CI/CD. Verificação de sustentabilidade no deploy.</div>
            </div>
            <div className="border border-term-border p-3">
              <div className="text-term-green font-bold mb-1">💰 FinOps</div>
              <div className="text-term-fg">Otimização de custos correlacionada com impacto ambiental.</div>
            </div>
            <div className="border border-term-border p-3">
              <div className="text-term-magenta font-bold mb-1">🌱 Sustainability</div>
              <div className="text-term-fg">Métricas de CO₂, scoring por recurso, metas de redução.</div>
            </div>
          </div>
        </Section>

        {/* Note about CCFT deprecation */}
        <div className="border border-term-yellow p-3 mt-4">
          <span className="text-term-yellow font-bold">⚠ NOTA:</span>
          <span className="text-term-fg">
            {' '}O AWS Customer Carbon Footprint Tool (CCFT) será descontinuado em 30/06/2026.
            O Carbon Lens migra para o novo serviço{' '}
            <span className="text-term-cyan">AWS Sustainability</span> que oferece funcionalidades adicionais.
          </span>
        </div>

        <div className="text-term-dim text-center py-4">
          ──────────────────────────────────────────────────
          <br />
          Carbon Lens v1.0.0 — Construindo um cloud mais sustentável
          <br />
          ──────────────────────────────────────────────────
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-term-border">
      <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border">
        <span className="text-term-cyan text-xs">┤ {title} ├</span>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}
