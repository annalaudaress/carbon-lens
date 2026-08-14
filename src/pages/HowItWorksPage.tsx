export function HowItWorksPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Title - centralizado */}
        <pre className="text-term-green text-center">{`
╔═══════════════════════════════════════════════════════════════════╗
║              🌿 COMO FUNCIONA O CARBON LENS                      ║
╚═══════════════════════════════════════════════════════════════════╝`}</pre>

        {/* Quick start */}
        <Section title="Começando">
          <p className="text-term-fg leading-relaxed">
            Instale o Carbon Lens CLI no seu terminal e tenha acesso
            completo à análise de sustentabilidade da sua infraestrutura cloud.
          </p>

          <div className="mt-3 border border-term-border p-3 bg-black">
            <div className="text-term-dim mb-1"># Instalação</div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">npm install -g @carbonlens/cli</span></div>
            <div className="text-term-dim mt-2 mb-1"># Autentique com suas credenciais AWS</div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens configure --profile default</span></div>
            <div className="text-term-dim mt-2 mb-1"># Rode seu primeiro scan</div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens scan --region us-east-1</span></div>
            <div className="text-term-dim mt-2 mb-1"># Abra o dashboard</div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens dashboard</span></div>
          </div>

          <p className="text-term-fg leading-relaxed mt-3">
            Após a instalação, você terá acesso a:
          </p>
          <ul className="mt-1 space-y-0.5 text-term-fg">
            <li><span className="text-term-green">►</span> Dashboard interativo no terminal (TUI)</li>
            <li><span className="text-term-green">►</span> Scan automático dos recursos da sua conta AWS</li>
            <li><span className="text-term-green">►</span> Relatórios de sustentabilidade sob demanda</li>
            <li><span className="text-term-green">►</span> Oportunidades de otimização com economia estimada</li>
            <li><span className="text-term-green">►</span> Integração com CI/CD para verificação no deploy</li>
          </ul>
        </Section>

        {/* What is it */}
        <Section title="O que é o Carbon Lens?">
          <p className="text-term-fg leading-relaxed">
            O Carbon Lens é uma solução de <span className="text-term-cyan">Cloud Sustainability</span> que 
            conecta <span className="text-term-green">Cloud + DevOps + FinOps + Sustentabilidade</span>.
          </p>
          <p className="text-term-fg leading-relaxed mt-2">
            A ferramenta se conecta à sua conta AWS, analisa a infraestrutura e mostra:
          </p>
          <ul className="mt-1 space-y-0.5 text-term-fg">
            <li><span className="text-term-green">►</span> Onde você está gastando mais do que deveria</li>
            <li><span className="text-term-green">►</span> Qual o impacto ambiental dos seus recursos</li>
            <li><span className="text-term-green">►</span> O que fazer para reduzir custos e emissões de CO₂</li>
            <li><span className="text-term-green">►</span> Score de sustentabilidade geral e por categoria</li>
          </ul>
        </Section>

        {/* How CO2 is calculated */}
        <Section title="Como o CO₂ é Calculado?">
          <p className="text-term-fg leading-relaxed">
            O Carbon Lens consome dados diretamente do{' '}
            <span className="text-term-cyan">AWS Sustainability Console</span> — o serviço oficial
            da AWS para rastreamento de emissões de carbono (lançado em março/2026, substituindo o antigo CCFT).
          </p>

          <div className="mt-3 border border-term-border p-3">
            <div className="text-term-yellow mb-2">─── Fórmula Base ───</div>
            <pre className="text-term-green pl-2">
{`Emissões (MTCO₂e) = Consumo de Energia (MWh) × Fator de Emissão (kgCO₂e/kWh)`}</pre>
          </div>

          <div className="mt-3 border border-term-border p-3 bg-black">
            <div className="text-term-dim mb-1"># API do AWS Sustainability — acesso programático</div>
            <div className="text-term-fg">
              <span className="text-term-green">$</span>{' '}
              <span className="text-term-yellow">aws sustainability get-estimated-carbon-emissions \</span>
            </div>
            <div className="text-term-yellow pl-4">
              --time-period='{`{"Start":"2026-01-01","End":"2026-08-01"}`}'
            </div>
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
                <span className="text-term-yellow font-bold">Escopo 2 — Emissões Indiretas (Energia)</span>
                <div className="text-term-fg pl-2 mt-0.5">
                  Eletricidade comprada para operar os data centers.
                  <br />
                  Métodos: <span className="text-term-cyan">Market-Based (MBM)</span> e <span className="text-term-cyan">Location-Based (LBM)</span>.
                  <br />
                  Fatores de emissão baseados no grid energético de cada região.
                </div>
              </div>
              <div>
                <span className="text-term-yellow font-bold">Escopo 3 — Cadeia de Valor</span>
                <div className="text-term-fg pl-2 mt-0.5">
                  Fabricação de hardware, construção de data centers,
                  <br />
                  equipamentos e atividades relacionadas a combustíveis e energia.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-term-yellow">─── Modelo de Alocação (v3.0) ───</div>
            <div className="mt-2 pl-2 space-y-1">
              <div><span className="text-term-green">1.</span> AWS estima emissões por cluster e mês</div>
              <div><span className="text-term-green">2.</span> Aloca emissões para server racks por utilização</div>
              <div><span className="text-term-green">3.</span> Mapeia racks → serviços AWS (EC2, S3, Lambda, RDS...)</div>
              <div><span className="text-term-green">4.</span> Distribui emissões de cada serviço → conta do cliente</div>
              <div><span className="text-term-green">5.</span> Capacidade ociosa é distribuída proporcionalmente</div>
            </div>
          </div>
        </Section>

        {/* How Carbon Lens reduces CO2 */}
        <Section title="Como o Carbon Lens Calcula a Redução Potencial?">
          <p className="text-term-fg leading-relaxed">
            Ao identificar oportunidades de otimização, o Carbon Lens estima a redução de CO₂
            baseado em benchmarks reais de consumo energético:
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
              <span className="text-term-dim"> → Dados em Glacier consomem fração da energia</span>
            </div>
            <div>
              <span className="text-term-yellow">Auto-scaling</span>
              <span className="text-term-dim"> → Recursos existem apenas quando necessários</span>
            </div>
            <div>
              <span className="text-term-yellow">Serverless</span>
              <span className="text-term-dim"> → Pay-per-use = emissão proporcional ao uso real</span>
            </div>
          </div>
        </Section>

        {/* Standards */}
        <Section title="Padrões e Normas">
          <p className="text-term-fg mb-2">
            A metodologia do AWS Sustainability é verificada independentemente pela APEX e segue:
          </p>
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
  │  AWS Account │────▶│  Carbon Lens CLI  │────▶│   Dashboard TUI  │
  └──────────────┘     └───────────────────┘     └──────────────────┘
         │                      │                         │
         ▼                      ▼                         ▼
  ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
  │    AWS       │     │ Análise &         │     │ Score, Métricas  │
  │Sustainability│     │ Recomendações     │     │ Oportunidades    │
  │   Console    │     │                   │     │                  │
  └──────────────┘     └───────────────────┘     └──────────────────┘
         │                      │                         │
         ▼                      ▼                         ▼
  ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
  │ Cost Explorer│     │ Motor de          │     │ Relatórios &     │
  │ CloudWatch   │     │ Scoring           │     │ CI/CD Integration│
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
              <div className="text-term-fg">CLI no terminal. Integração com pipelines CI/CD. Verificação no deploy.</div>
            </div>
            <div className="border border-term-border p-3">
              <div className="text-term-green font-bold mb-1">💰 FinOps</div>
              <div className="text-term-fg">Otimização de custos correlacionada com impacto ambiental.</div>
            </div>
            <div className="border border-term-border p-3">
              <div className="text-term-magenta font-bold mb-1">🌱 Sustainability</div>
              <div className="text-term-fg">Métricas de CO₂ via AWS Sustainability API (Scope 1, 2 e 3).</div>
            </div>
          </div>
        </Section>

        {/* CLI commands */}
        <Section title="Comandos Disponíveis">
          <div className="border border-term-border p-3 bg-black space-y-1">
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens dashboard</span> <span className="text-term-dim">    # Abre o painel de sustentabilidade</span></div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens scan</span> <span className="text-term-dim">         # Analisa recursos da conta AWS</span></div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens report</span> <span className="text-term-dim">       # Gera relatório de sustentabilidade</span></div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens opportunities</span> <span className="text-term-dim"># Lista oportunidades de otimização</span></div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens score</span> <span className="text-term-dim">        # Mostra o score atual</span></div>
            <div><span className="text-term-green">$</span> <span className="text-term-yellow">carbonlens configure</span> <span className="text-term-dim">    # Configura credenciais AWS</span></div>
          </div>
        </Section>

        {/* ODS */}
        <Section title="ODS — Objetivos de Desenvolvimento Sustentável">
          <p className="text-term-fg leading-relaxed mb-3">
            O Carbon Lens contribui diretamente para os seguintes Objetivos de Desenvolvimento
            Sustentável da ONU (Agenda 2030):
          </p>
          <div className="space-y-3 pl-2">
            <div className="flex items-start gap-3">
              <span className="text-term-yellow text-lg">7</span>
              <div>
                <span className="text-term-yellow font-bold">ODS 7 — Energia Limpa e Acessível</span>
                <div className="text-term-fg mt-0.5">
                  Ao recomendar migração para regiões com grid energético mais limpo e
                  otimizar o consumo de energia dos recursos cloud.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-term-green text-lg">9</span>
              <div>
                <span className="text-term-green font-bold">ODS 9 — Indústria, Inovação e Infraestrutura</span>
                <div className="text-term-fg mt-0.5">
                  Promovendo infraestrutura cloud sustentável e eficiente,
                  modernização de workloads com tecnologias mais verdes (Graviton, Serverless).
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-term-cyan text-lg">12</span>
              <div>
                <span className="text-term-cyan font-bold">ODS 12 — Consumo e Produção Responsáveis</span>
                <div className="text-term-fg mt-0.5">
                  Eliminando desperdício de recursos computacionais ociosos,
                  rightsizing, lifecycle policies e uso consciente de infraestrutura.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-term-red text-lg">13</span>
              <div>
                <span className="text-term-red font-bold">ODS 13 — Ação Contra a Mudança Global do Clima</span>
                <div className="text-term-fg mt-0.5">
                  Mensuração direta de emissões de CO₂ (Scope 1, 2 e 3) e recomendações
                  acionáveis para redução da pegada de carbono corporativa na cloud.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-term-magenta text-lg">17</span>
              <div>
                <span className="text-term-magenta font-bold">ODS 17 — Parcerias e Meios de Implementação</span>
                <div className="text-term-fg mt-0.5">
                  Integração com AWS Sustainability, The Climate Pledge da Amazon,
                  e padrões internacionais (GHG Protocol, ISO 14040).
                </div>
              </div>
            </div>
          </div>
        </Section>

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
