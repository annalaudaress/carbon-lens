import { useState, useRef, useEffect, useCallback } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error' | 'info' | 'ascii' | 'spinner';
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

const DASHBOARD_LINES: TerminalLine[] = [
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

const REPORT_LINES: TerminalLine[] = [
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

// Animated sequences - each step has a delay before it appears
interface AnimatedStep {
  line: TerminalLine;
  delay: number; // ms before this line appears
}

const SCAN_ANIMATED: AnimatedStep[] = [
  { line: { type: 'info', content: '' }, delay: 0 },
  { line: { type: 'info', content: '  Conectando à conta AWS...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ Conectado | Conta: 123456789012 | Região: us-east-1' }, delay: 800 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'spinner', content: '  ⠋ Descobrindo instâncias EC2...' }, delay: 400 },
  { line: { type: 'success', content: '  ✓ EC2: 47 instâncias encontradas' }, delay: 900 },
  { line: { type: 'spinner', content: '  ⠙ Analisando volumes EBS...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ EBS: 23 volumes (8 sem attach)' }, delay: 700 },
  { line: { type: 'spinner', content: '  ⠹ Escaneando buckets S3...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ S3: 38 buckets | 4.7TB total' }, delay: 1100 },
  { line: { type: 'spinner', content: '  ⠸ Verificando instâncias RDS...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ RDS: 12 instâncias (3 Multi-AZ desnecessárias)' }, delay: 800 },
  { line: { type: 'spinner', content: '  ⠼ Inventariando funções Lambda...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ Lambda: 24 funções ativas' }, delay: 600 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'info', content: '  ─── Calculando emissões de CO₂ ───────────────────────' }, delay: 400 },
  { line: { type: 'spinner', content: '  ⠋ Consultando AWS Sustainability API...' }, delay: 500 },
  { line: { type: 'success', content: '  ✓ Dados de emissão recebidos (Scope 1, 2, 3)' }, delay: 1000 },
  { line: { type: 'spinner', content: '  ⠙ Calculando fator de emissão por recurso...' }, delay: 400 },
  { line: { type: 'spinner', content: '  ⠹ Aplicando modelo de alocação v3.0...' }, delay: 600 },
  { line: { type: 'spinner', content: '  ⠸ Correlacionando custos × emissões...' }, delay: 500 },
  { line: { type: 'spinner', content: '  ⠼ Identificando oportunidades de otimização...' }, delay: 700 },
  { line: { type: 'spinner', content: '  ⠴ Priorizando por impacto financeiro e ambiental...' }, delay: 500 },
  { line: { type: 'success', content: '  ✓ Cálculo completo!' }, delay: 400 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'info', content: '  ┌─────────────────────────────────────────┐' }, delay: 100 },
  { line: { type: 'info', content: '  │         RESULTADOS DO SCAN              │' }, delay: 100 },
  { line: { type: 'info', content: '  ├─────────────────────────────────────────┤' }, delay: 100 },
  { line: { type: 'info', content: '  │  Recursos encontrados:    124           │' }, delay: 150 },
  { line: { type: 'info', content: '  │  Otimizações possíveis:   8             │' }, delay: 150 },
  { line: { type: 'info', content: '  │  Economia estimada:       US$ 320/mês   │' }, delay: 150 },
  { line: { type: 'info', content: '  │  Redução CO₂ estimada:    28%           │' }, delay: 150 },
  { line: { type: 'info', content: '  │  Emissão mensal atual:    2.4 MTCO₂e    │' }, delay: 150 },
  { line: { type: 'info', content: '  └─────────────────────────────────────────┘' }, delay: 100 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'success', content: '  Use "carbonlens report" para gerar o relatório completo.' }, delay: 300 },
  { line: { type: 'info', content: '' }, delay: 0 },
];

const DASHBOARD_ANIMATED: AnimatedStep[] = [
  { line: { type: 'info', content: '' }, delay: 0 },
  { line: { type: 'spinner', content: '  ⠋ Conectando à conta AWS...' }, delay: 400 },
  { line: { type: 'success', content: '  ✓ Conectado' }, delay: 700 },
  { line: { type: 'spinner', content: '  ⠙ Carregando dados de sustentabilidade...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ Dados carregados' }, delay: 900 },
  { line: { type: 'spinner', content: '  ⠹ Renderizando dashboard...' }, delay: 300 },
  { line: { type: 'info', content: '' }, delay: 500 },
  ...DASHBOARD_LINES.map((line, i) => ({ line, delay: i < 3 ? 80 : 60 })),
];

const REPORT_ANIMATED: AnimatedStep[] = [
  { line: { type: 'info', content: '' }, delay: 0 },
  { line: { type: 'spinner', content: '  ⠋ Coletando dados de emissão...' }, delay: 500 },
  { line: { type: 'success', content: '  ✓ Scope 1: 0.08 MTCO₂e' }, delay: 700 },
  { line: { type: 'success', content: '  ✓ Scope 2: 1.92 MTCO₂e' }, delay: 500 },
  { line: { type: 'success', content: '  ✓ Scope 3: 0.40 MTCO₂e' }, delay: 500 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'spinner', content: '  ⠙ Calculando score de sustentabilidade...' }, delay: 400 },
  { line: { type: 'info', content: '    ├── Analisando eficiência de compute...' }, delay: 300 },
  { line: { type: 'info', content: '    ├── Analisando políticas de storage...' }, delay: 300 },
  { line: { type: 'info', content: '    ├── Analisando capacidade de database...' }, delay: 300 },
  { line: { type: 'info', content: '    └── Ponderando fatores de região...' }, delay: 300 },
  { line: { type: 'success', content: '  ✓ Score calculado: 68/100' }, delay: 600 },
  { line: { type: 'info', content: '' }, delay: 200 },
  { line: { type: 'spinner', content: '  ⠹ Gerando relatório...' }, delay: 500 },
  { line: { type: 'info', content: '' }, delay: 400 },
  ...REPORT_LINES.map((line) => ({ line, delay: 70 })),
];

export function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([...WELCOME]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const playAnimation = useCallback((steps: AnimatedStep[]) => {
    setIsAnimating(true);
    let currentIndex = 0;
    let totalDelay = 0;

    const playNext = () => {
      if (currentIndex >= steps.length) {
        setIsAnimating(false);
        return;
      }

      const step = steps[currentIndex];
      totalDelay = step.delay;

      animationRef.current = window.setTimeout(() => {
        setLines((prev) => {
          // If previous line was a spinner, replace it
          if (step.line.type === 'success' && prev.length > 0 && prev[prev.length - 1].type === 'spinner') {
            return [...prev.slice(0, -1), step.line];
          }
          return [...prev, step.line];
        });
        currentIndex++;
        playNext();
      }, totalDelay);
    };

    playNext();
  }, []);

  const processCommand = (cmd: string) => {
    if (isAnimating) return; // Don't process while animating

    const trimmed = cmd.trim().toLowerCase().replace('carbonlens ', '').replace('carbonlens', '');

    const inputLine: TerminalLine = { type: 'input', content: `  $ ${cmd}` };
    setLines((prev) => [...prev, inputLine]);

    switch (trimmed) {
      case 'help':
      case '--help':
      case '-h':
        setLines((prev) => [...prev, ...HELP_OUTPUT]);
        break;
      case 'dashboard':
        playAnimation(DASHBOARD_ANIMATED);
        break;
      case 'scan':
      case 'scan --region us-east-1':
        playAnimation(SCAN_ANIMATED);
        break;
      case 'opportunities':
      case 'opp':
        setLines((prev) => [...prev, ...OPPORTUNITIES_OUTPUT]);
        break;
      case 'report':
      case 'report --format json':
        playAnimation(REPORT_ANIMATED);
        break;
      case 'score':
        setLines((prev) => [...prev, ...SCORE_OUTPUT]);
        break;
      case 'version':
      case '--version':
      case '-v':
        setLines((prev) => [...prev, ...VERSION_OUTPUT]);
        break;
      case 'clear':
        setLines([]);
        return;
      case '':
        break;
      default:
        setLines((prev) => [
          ...prev,
          { type: 'error', content: `  Comando não reconhecido: "${trimmed}"` },
          { type: 'info', content: '  Digite "help" para ver os comandos disponíveis.' },
          { type: 'info', content: '' },
        ]);
    }

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
      case 'spinner': return 'text-term-yellow animate-pulse';
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
        {!isAnimating && (
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
        )}

        {/* Animating indicator */}
        {isAnimating && (
          <div className="flex items-center mt-1 text-term-dim">
            <span className="animate-pulse">⣾</span>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="bg-term-highlight border-t border-term-border px-2 py-0.5 flex items-center justify-between text-xs">
        <span className="text-term-dim">
          <span className="text-term-yellow">&lt;Tab&gt;</span> autocomplete
          <span className="text-term-dim ml-3">│</span>
          <span className="text-term-yellow ml-3">&lt;↑↓&gt;</span> histórico
          <span className="text-term-dim ml-3">│</span>
          <span className="text-term-yellow ml-3">clear</span> limpar
        </span>
        <span className="text-term-green">Carbon Lens CLI v1.0.0</span>
      </div>
    </div>
  );
}
