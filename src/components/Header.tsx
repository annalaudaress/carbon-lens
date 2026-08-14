export function Header() {
  return (
    <header className="bg-term-bg border-b border-term-border">
      {/* Top bar - k9s style */}
      <div className="flex items-center justify-between px-2 py-1 bg-term-highlight">
        <div className="flex items-center gap-4">
          <span className="text-term-green font-bold term-glow">
            ╸Carbon Lens╺
          </span>
          <span className="text-term-dim">│</span>
          <span className="text-term-cyan">
            Painel de Sustentabilidade Cloud
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-term-dim">
            ctx: <span className="text-term-yellow">produção</span>
          </span>
          <span className="text-term-dim">│</span>
          <span className="text-term-dim">
            região: <span className="text-term-cyan">us-east-1</span>
          </span>
          <span className="text-term-dim">│</span>
          <span className="text-term-green">● online</span>
        </div>
      </div>
      {/* Breadcrumb bar */}
      <div className="px-2 py-0.5 text-xs text-term-dim flex items-center gap-2">
        <span className="text-term-blue">cloud</span>
        <span>›</span>
        <span className="text-term-blue">sustentabilidade</span>
        <span>›</span>
        <span className="text-term-fg">dashboard</span>
        <span className="ml-auto text-term-dim">
          atualizado: {new Date().toLocaleTimeString('pt-BR')}
        </span>
      </div>
    </header>
  );
}
