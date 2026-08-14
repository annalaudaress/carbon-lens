import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error' | 'info' | 'ascii';
  content: string;
}

const HELP_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'ascii', content: '  ╔═══════════════════════════════════════════════════╗' },
  { type: 'ascii', content: '  ║           🌿 Carbon Lens CLI v1.0.0              ║' },
  { type: 'ascii', content: '  ║       Cloud Sustainability Analysis Tool         ║' },
  { type: 'ascii', content: '  ╚═══════════════════════════════════════════════════╝' },
  { type: 'info', content: '' },
  { type: 'info', content: '  Uso: carbonlens <comando> [opções]' },
  { type: 'info', content: '' },
  { type: 'info', content: '  Comandos disponíveis:' },
  { type: 'info', content: '' },
  { type: 'success', content: '    dashboard          Abre o painel de sustentabilidade' },
  { type: 'success', content: '    scan               Analisa recursos da conta AWS' },
  { type: 'success', content: '    report             Gera relatório de sustentabilidade' },
  { type: 'success', content: '    opportunities      Lista oportunidades de otimização' },
  { type: 'success', content: '    score              Mostra o score atual' },
  { type: 'success', content: '    help               Mostra esta ajuda' },
  { type: 'success', content: '    version            Mostra a versão' },
  { type: 'success', content: '    clear              Limpa o terminal' },
  { type: 'info', content: '' },
  { type: 'info', content: '  Exemplos:' },
  { type: 'info', content: '    $ carbonlens dashboard' },
  { type: 'info', content: '    $ carbonlens scan --region us-east-1' },
  { type: 'info', content: '    $ carbonlens report --format json' },
  { type: 'info', content: '' },
];

const DASHBOARD_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'info', content: '  Conectando à conta AWS... ✓' },
  { type: 'info', content: '  Carregando dados de sustentabilidade...' },
  { type: 'info', content: '' },
  { type: 'ascii', content: '  ┌─────────────────────────────────────────────────────────────────┐' },
  { type: 'ascii', content: '  │                  CARBON LENS — DASHBOARD                        │' },
  { type: 'ascii', content: '  ├─────────────────────────────────────────────────────────────────┤' },
  { type: 'ascii', content: '  │                                                                 │' },
  { type: 'ascii', content: '  │  Score de Sustentabilidade:  ████████████████████░░░░  84/100   │' },
  { type: 'ascii', content: '  │                                                                 │' },
  { type: 'ascii', content: '  │  ─── Scores por Recurso ───────────────────────────────────     │' },
  { type: 'ascii', content: '  │  ⚡ Compute   ████████████████░░░░  82%  (47 recursos)          │' },
  { type: 'ascii', content: '  │  💾 Storage   ██████████████████░░  91%  (38 recursos)          │' },
  { type: 'ascii', content: '  │  🗄  Database  ███████████████░░░░░  76%  (39 recursos)          │' },
  { type: 'ascii', content: '  │                                                                 │' },
  { type: 'ascii', content: '  │  ─── Impacto ──────────────────────────────────────────────     │' },
  { type: 'ascii', content: '  │  💰 Economia Potencial:    US$ 320/mês                          │' },
  { type: 'ascii', content: '  │  🌱 Redução de CO₂:        28%                                  │' },
  { type: 'ascii', content: '  │  🔍 Recursos Analisados:   124                                  │' },
  { type: 'ascii', content: '  │  ⚙️  Otimizações:           8 encontradas                       │' },
  { type: 'ascii', content: '  │                                                                 │' },
  { type: 'ascii', content: '  └─────────────────────────────────────────────────────────────────┘' },
  { type: 'info', content: '' },
  { type: 'success', content: '  ✓ Dashboard carregado. Use "carbonlens opportunities" para ver detalhes.' },
  { type: 'info', content: '' },
];

const SCAN_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'info', content: '  Iniciando scan na região us-east-1...' },
  { type: 'info', content: '  ⠋ Analisando instâncias EC2...' },
  { type: 'info', content: '  ⠙ Analisando volumes EBS...' },
  { type: 'info', content: '  ⠹ Analisando buckets S3...' },
  { type: 'info', content: '  ⠸ Analisando instâncias RDS...' },
  { type: 'info', content: '  ⠼ Analisando funções Lambda...' },
  { type: 'info', content: '  ⠴ Calculando emissões de CO₂...' },
  { type: 'info', content: '' },
  { type: 'success', content: '  ✓ Scan completo!' },
  { type: 'info', content: '' },
  { type: 'info', content: '  Resultados:' },
  { type: 'info', content: '    Recursos encontrados:   124' },
  { type: 'info', content: '    Otimizações possíveis:  8' },
  { type: 'info', content: '    Economia estimada:      US$ 320/mês' },
  { type: 'info', content: '    Redução CO₂ estimada:   28%' },
  { type: 'info', content: '' },
  { type: 'success', content: '  Use "carbonlens report" para gerar o relatório completo.' },
  { type: 'info', content: '' },
];

const OPPORTUNITIES_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'ascii', content: '  ┌──────┬──────────┬──────────┬─────────────────────────────────┬──────────┬───────┐' },
  { type: 'ascii', content: '  │  #   │ PRIOR.   │ CATEG.   │ OPORTUNIDADE                    │ ECONOMIA │  CO₂  │' },
  { type: 'ascii', content: '  ├──────┼──────────┼──────────┼─────────────────────────────────┼──────────┼───────┤' },
  { type: 'ascii', content: '  │  1.  │ ALTA     │ Compute  │ Otimizar workloads de compute   │ $128/mês │  -12% │' },
  { type: 'ascii', content: '  │  2.  │ CRÍTICA  │ Compute  │ Identificar recursos ociosos    │  $67/mês │   -5% │' },
  { type: 'ascii', content: '  │  3.  │ ALTA     │ Compute  │ Migrar para Graviton            │  $85/mês │   -8% │' },
  { type: 'ascii', content: '  │  4.  │ ALTA     │ Database │ Otimizar capacidade de DB       │  $52/mês │   -4% │' },
  { type: 'ascii', content: '  │  5.  │ MÉDIA   │ Storage  │ Lifecycle policies S3           │  $45/mês │   -4% │' },
  { type: 'ascii', content: '  │  6.  │ MÉDIA   │ Database │ Consolidar read replicas        │  $34/mês │   -3% │' },
  { type: 'ascii', content: '  │  7.  │ MÉDIA   │ Compute  │ Consolidar regiões              │  $28/mês │   -3% │' },
  { type: 'ascii', content: '  │  8.  │ BAIXA    │ Storage  │ S3 Intelligent-Tiering          │  $18/mês │   -2% │' },
  { type: 'ascii', content: '  └──────┴──────────┴──────────┴─────────────────────────────────┴──────────┴───────┘' },
  { type: 'info', content: '' },
  { type: 'info', content: '  Total: 8 oportunidades | Economia total: US$ 457/mês | Redução CO₂: -41%' },
  { type: 'info', content: '' },
];

const REPORT_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'info', content: '  Gerando relatório de sustentabilidade...' },
  { type: 'info', content: '' },
  { type: 'ascii', content: '  ╔══════════════════════════════════════════════════════════╗' },
  { type: 'ascii', content: '  ║          RELATÓRIO DE SUSTENTABILIDADE                  ║' },
  { type: 'ascii', content: '  ║              Carbon Lens Analysis                       ║' },
  { type: 'ascii', content: '  ╠══════════════════════════════════════════════════════════╣' },
  { type: 'ascii', content: '  ║                                                          ║' },
  { type: 'ascii', content: '  ║  Score de Sustentabilidade:   68/100                     ║' },
  { type: 'ascii', content: '  ║  Economia Estimada:           US$ 272/mês                ║' },
  { type: 'ascii', content: '  ║  Redução de CO₂ Estimada:     32%                        ║' },
  { type: 'ascii', content: '  ║                                                          ║' },
  { type: 'ascii', content: '  ║  Recursos analisados:         124                        ║' },
  { type: 'ascii', content: '  ║  Otimizações encontradas:     8                          ║' },
  { type: 'ascii', content: '  ║  Custo mensal atual:          US$ 4.850                  ║' },
  { type: 'ascii', content: '  ║                                                          ║' },
  { type: 'ascii', content: '  ╚══════════════════════════════════════════════════════════╝' },
  { type: 'info', content: '' },
  { type: 'success', content: '  ✓ Relatório gerado com sucesso.' },
  { type: 'info', content: '  Análise: Encontradas 8 oportunidades de otimização em 124 recursos.' },
  { type: 'info', content: '  Implementando todas as recomendações, a economia seria de' },
  { type: 'info', content: '  US$272/mês com redução de 32% nas emissões de CO₂.' },
  { type: 'info', content: '' },
];

const SCORE_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'info', content: '  Score de Sustentabilidade atual:' },
  { type: 'info', content: '' },
  { type: 'ascii', content: '    [████████████████████░░░░]  84/100  ▲ melhorando' },
  { type: 'info', content: '' },
  { type: 'info', content: '    Compute:   82/100  ▲' },
  { type: 'info', content: '    Storage:   91/100  ►' },
  { type: 'info', content: '    Database:  76/100  ▼' },
  { type: 'info', content: '' },
];

const VERSION_OUTPUT: TerminalLine[] = [
  { type: 'info', content: '' },
  { type: 'success', content: '  Carbon Lens CLI v1.0.0' },
  { type: 'info', content: '  Cloud Sustainability Analysis Tool' },
  { type: 'info', content: '  Build: 2026-08-01' },
  { type: 'info', content: '' },
];

const WELCOME: TerminalLine[] = [
  { type: 'ascii', content: '' },
  { type: 'ascii', content: '   ██████╗ █████╗ ██████╗ ██████╗  ██████╗ ███╗   ██╗' },
  { type: 'ascii', content: '  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗████╗  ██║' },
  { type: 'ascii', content: '  ██║     ███████║██████╔╝██████╔╝██║   ██║██╔██╗ ██║' },
  { type: 'ascii', content: '  ██║     ██╔══██║██╔══██╗██╔══██╗██║   ██║██║╚██╗██║' },
  { type: 'ascii', content: '  ╚██████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██║ ╚████║' },
  { type: 'ascii', content: '   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝' },
  { type: 'ascii', content: '               ██╗     ███████╗███╗   ██╗███████╗' },
  { type: 'ascii', content: '               ██║     ██╔════╝████╗  ██║██╔════╝' },
  { type: 'ascii', content: '               ██║     █████╗  ██╔██╗ ██║███████╗' },
  { type: 'ascii', content: '               ██║     ██╔══╝  ██║╚██╗██║╚════██║' },
  { type: 'ascii', content: '               ███████╗███████╗██║ ╚████║███████║' },
  { type: 'ascii', content: '               ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝' },
  { type: 'ascii', content: '' },
  { type: 'success', content: '  🌿 Carbon Lens CLI v1.0.0 — Cloud Sustainability Analysis' },
  { type: 'info', content: '  Digite "help" ou "carbonlens help" para ver os comandos disponíveis.' },
  { type: 'info', content: '' },
];

export function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([...WELCOME]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase().replace('carbonlens ', '').replace('carbonlens', '');

    const newLines: TerminalLine[] = [
      { type: 'input', content: `  $ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
      case '--help':
      case '-h':
        newLines.push(...HELP_OUTPUT);
        break;
      case 'dashboard':
        newLines.push(...DASHBOARD_OUTPUT);
        break;
      case 'scan':
      case 'scan --region us-east-1':
        newLines.push(...SCAN_OUTPUT);
        break;
      case 'opportunities':
      case 'opp':
        newLines.push(...OPPORTUNITIES_OUTPUT);
        break;
      case 'report':
      case 'report --format json':
        newLines.push(...REPORT_OUTPUT);
        break;
      case 'score':
        newLines.push(...SCORE_OUTPUT);
        break;
      case 'version':
      case '--version':
      case '-v':
        newLines.push(...VERSION_OUTPUT);
        break;
      case 'clear':
        setLines([]);
        return;
      case '':
        break;
      default:
        newLines.push(
          { type: 'error', content: `  Comando não reconhecido: "${trimmed}"` },
          { type: 'info', content: '  Digite "help" para ver os comandos disponíveis.' },
          { type: 'info', content: '' },
        );
    }

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'input': return 'text-term-yellow';
      case 'output': return 'text-term-fg';
      case 'success': return 'text-term-green';
      case 'error': return 'text-term-red';
      case 'info': return 'text-term-fg';
      case 'ascii': return 'text-term-cyan';
      default: return 'text-term-fg';
    }
  };

  return (
    <div
      className="flex-1 flex flex-col bg-black overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 font-mono text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre ${getLineColor(line.type)}`}>
            {line.content || '\u00A0'}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span className="text-term-green mr-1">carbonlens $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-term-yellow caret-term-green"
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="cursor-blink text-term-green">▊</span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="bg-term-highlight border-t border-term-border px-2 py-0.5 flex items-center justify-between text-xs">
        <span className="text-term-dim">
          <span className="text-term-yellow">&lt;Tab&gt;</span> autocomplete
          <span className="text-term-dim ml-3">│</span>
          <span className="text-term-yellow ml-3">&lt;↑↓&gt;</span> histórico
        </span>
        <span className="text-term-green">Carbon Lens CLI v1.0.0</span>
      </div>
    </div>
  );
}
