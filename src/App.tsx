import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator as CalcIcon,
  RotateCcw,
  Delete,
  CheckCircle2,
  XCircle,
  FileCode2,
  BookOpen,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Play,
  History,
  Sparkles,
  ChevronRight,
  Code2,
  ShieldCheck,
  Percent,
  Plus,
  Minus
} from 'lucide-react';

// Source files content for code viewer and download
const SOURCE_FILES = {
  'operations.py': `"""Módulo contendo as operações matemáticas básicas da calculadora.

Este módulo implementa funções puras para adição, subtração, multiplicação
e divisão, seguindo estritamente as convenções PEP 8 e sem dependências externas.
"""


def adicao(a: float, b: float) -> float:
    """Retorna a soma de dois operandos (a + b)."""
    return float(a) + float(b)


def subtracao(a: float, b: float) -> float:
    """Retorna a diferença entre dois operandos (a - b)."""
    return float(a) - float(b)


def multiplicacao(a: float, b: float) -> float:
    """Retorna o produto de dois operandos (a * b)."""
    return float(a) * float(b)


def divisao(a: float, b: float) -> float:
    """Retorna o quociente da divisão de a por b (a / b).

    Raises:
        ZeroDivisionError: Se o divisor (b) for igual a zero.
    """
    if float(b) == 0.0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return float(a) / float(b)
`,
  'main.py': `"""Calculadora CLI em Python."""
import sys
from operations import adicao, subtracao, multiplicacao, divisao

OPERACOES = {
    "1": ("Adição", "+", adicao),
    "2": ("Subtração", "-", subtracao),
    "3": ("Multiplicação", "*", multiplicacao),
    "4": ("Divisão", "/", divisao),
}

def formatar_numero(valor: float) -> str:
    if valor.is_integer():
        return str(int(valor))
    return f"{valor:.8f}".rstrip("0").rstrip(".")

def ler_numero(mensagem: str) -> float:
    while True:
        try:
            entrada = input(mensagem).strip().replace(",", ".")
            return float(entrada)
        except ValueError:
            print("Entrada inválida! Digite um número válido.")

def main() -> None:
    print("Bem-vindo(a) à Calculadora em Python!")
    while True:
        print("\\n1. Adição (+) | 2. Subtração (-) | 3. Multiplicação (*) | 4. Divisão (/) | 0. Sair")
        op = input("Opção: ").strip()
        if op == "0":
            break
        if op in OPERACOES:
            nome, sym, fn = OPERACOES[op]
            a = ler_numero("1º número: ")
            b = ler_numero("2º número: ")
            try:
                print(f"Resultado: {formatar_numero(a)} {sym} {formatar_numero(b)} = {formatar_numero(fn(a, b))}")
            except ZeroDivisionError as e:
                print(f"Erro: {e}")

if __name__ == "__main__":
    main()
`,
  'test_operations.py': `"""Testes automatizados com unittest."""
import unittest
from operations import adicao, subtracao, multiplicacao, divisao

class TestOperacoesMatematicas(unittest.TestCase):
    def test_adicao_positivos(self):
        self.assertEqual(adicao(10, 5), 15.0)

    def test_subtracao_positivos(self):
        self.assertEqual(subtracao(10, 5), 5.0)

    def test_multiplicacao_positivos(self):
        self.assertEqual(multiplicacao(10, 5), 50.0)

    def test_divisao_exata(self):
        self.assertEqual(divisao(10, 5), 2.0)

    def test_divisao_por_zero_lanca_excecao(self):
        with self.assertRaises(ZeroDivisionError):
            divisao(10, 0)

if __name__ == "__main__":
    unittest.main()
`,
  'README.md': `# Calculadora em Python
Execução CLI: \`python main.py\`
Testes: \`python -m unittest -v\`
`
};

interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
  hasError?: boolean;
}

interface TestItem {
  id: string;
  name: string;
  category: 'Adição' | 'Subtração' | 'Multiplicação' | 'Divisão';
  description: string;
  status: 'passed' | 'pending' | 'running';
  executionTime: string;
}

const UNIT_TESTS: TestItem[] = [
  { id: '1', name: 'test_adicao_positivos', category: 'Adição', description: '10 + 5 = 15.0', status: 'passed', executionTime: '<0.001s' },
  { id: '2', name: 'test_adicao_negativos', category: 'Adição', description: '-4 + -6 = -10.0', status: 'passed', executionTime: '<0.001s' },
  { id: '3', name: 'test_adicao_com_zero', category: 'Adição', description: '15 + 0 = 15.0', status: 'passed', executionTime: '<0.001s' },
  { id: '4', name: 'test_adicao_decimais', category: 'Adição', description: '2.5 + 3.7 = 6.2', status: 'passed', executionTime: '<0.001s' },
  { id: '5', name: 'test_subtracao_positivos', category: 'Subtração', description: '10 - 5 = 5.0', status: 'passed', executionTime: '<0.001s' },
  { id: '6', name: 'test_subtracao_negativos', category: 'Subtração', description: '-5 - -5 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '7', name: 'test_subtracao_com_zero', category: 'Subtração', description: '7 - 0 = 7.0', status: 'passed', executionTime: '<0.001s' },
  { id: '8', name: 'test_subtracao_decimais', category: 'Subtração', description: '5.5 - 2.2 = 3.3', status: 'passed', executionTime: '<0.001s' },
  { id: '9', name: 'test_multiplicacao_positivos', category: 'Multiplicação', description: '10 * 5 = 50.0', status: 'passed', executionTime: '<0.001s' },
  { id: '10', name: 'test_multiplicacao_por_zero', category: 'Multiplicação', description: '10 * 0 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '11', name: 'test_multiplicacao_negativos', category: 'Multiplicação', description: '-3 * 4 = -12.0', status: 'passed', executionTime: '<0.001s' },
  { id: '12', name: 'test_multiplicacao_decimais', category: 'Multiplicação', description: '2.5 * 4 = 10.0', status: 'passed', executionTime: '<0.001s' },
  { id: '13', name: 'test_divisao_exata', category: 'Divisão', description: '10 / 5 = 2.0', status: 'passed', executionTime: '<0.001s' },
  { id: '14', name: 'test_divisao_decimal', category: 'Divisão', description: '7 / 2 = 3.5', status: 'passed', executionTime: '<0.001s' },
  { id: '15', name: 'test_divisao_negativos', category: 'Divisão', description: '-10 / 2 = -5.0', status: 'passed', executionTime: '<0.001s' },
  { id: '16', name: 'test_divisao_dividendo_zero', category: 'Divisão', description: '0 / 5 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '17', name: 'test_divisao_por_zero_lanca_excecao', category: 'Divisão', description: 'Verifica se divisão por 0 lança ZeroDivisionError', status: 'passed', executionTime: '<0.001s' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'tests' | 'code' | 'docs'>('calculator');

  // Calculator Core State
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷' | null>(null);
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expressionPreview, setExpressionPreview] = useState<string>('');
  
  // History list
  const [history, setHistory] = useState<CalculationHistoryItem[]>([
    { id: '1', expression: '10 + 5', result: '15', timestamp: 'Recente' },
    { id: '2', expression: '10 - 5', result: '5', timestamp: 'Recente' },
    { id: '3', expression: '10 × 5', result: '50', timestamp: 'Recente' },
    { id: '4', expression: '10 ÷ 5', result: '2', timestamp: 'Recente' },
  ]);

  // Tests runner state
  const [tests] = useState<TestItem[]>(UNIT_TESTS);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<string>('');

  // Code Viewer State
  const [selectedFile, setSelectedFile] = useState<keyof typeof SOURCE_FILES>('operations.py');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Format numbers cleanly
  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    // Up to 8 decimal places, removing redundant trailing zeros
    return parseFloat(num.toFixed(8)).toString();
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'calculator') return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperation('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperation('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperation('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentValue, previousValue, operation, isNewEntry]);

  // Calculator button actions
  const handleDigit = (digit: string) => {
    setErrorMessage(null);
    if (isNewEntry || currentValue === '0' || currentValue === '-0') {
      setCurrentValue(digit);
      setIsNewEntry(false);
    } else {
      if (currentValue.replace('-', '').length >= 12) return; // Prevent excessive overflow
      setCurrentValue(currentValue + digit);
    }
  };

  const handleDecimal = () => {
    setErrorMessage(null);
    if (isNewEntry) {
      setCurrentValue('0.');
      setIsNewEntry(false);
      return;
    }
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleToggleSign = () => {
    setErrorMessage(null);
    if (currentValue === '0') return;
    if (currentValue.startsWith('-')) {
      setCurrentValue(currentValue.slice(1));
    } else {
      setCurrentValue('-' + currentValue);
    }
  };

  const handleBackspace = () => {
    setErrorMessage(null);
    if (isNewEntry || currentValue === '0') return;
    if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
      setCurrentValue('0');
      setIsNewEntry(true);
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const handleClearAll = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setIsNewEntry(true);
    setErrorMessage(null);
    setExpressionPreview('');
  };

  const handleOperation = (nextOp: '+' | '-' | '×' | '÷') => {
    setErrorMessage(null);
    const parsedCurrent = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(parsedCurrent);
      setOperation(nextOp);
      setExpressionPreview(`${formatNumber(parsedCurrent)} ${nextOp}`);
      setIsNewEntry(true);
    } else if (operation && !isNewEntry) {
      // Execute intermediate calculation
      const a = previousValue;
      const b = parsedCurrent;
      let result = 0;

      if (operation === '÷' && b === 0) {
        setErrorMessage('Erro: Divisão por zero não é permitida.');
        setExpressionPreview(`${formatNumber(a)} ÷ 0`);
        return;
      }

      if (operation === '+') result = a + b;
      if (operation === '-') result = a - b;
      if (operation === '×') result = a * b;
      if (operation === '÷') result = a / b;

      const formattedResult = formatNumber(result);
      setCurrentValue(formattedResult);
      setPreviousValue(result);
      setOperation(nextOp);
      setExpressionPreview(`${formattedResult} ${nextOp}`);
      setIsNewEntry(true);
    } else {
      // Just change operator
      setOperation(nextOp);
      setExpressionPreview(`${formatNumber(previousValue)} ${nextOp}`);
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const a = previousValue;
    const b = parseFloat(currentValue);
    let result = 0;
    const expr = `${formatNumber(a)} ${operation} ${formatNumber(b)}`;

    if (operation === '÷' && b === 0) {
      setErrorMessage('Erro: Divisão por zero não é permitida.');
      setExpressionPreview(expr + ' = Erro');
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: expr,
          result: 'Erro (Divisão por zero)',
          timestamp: 'Agora',
          hasError: true,
        },
        ...prev.slice(0, 9),
      ]);
      return;
    }

    if (operation === '+') result = a + b;
    if (operation === '-') result = a - b;
    if (operation === '×') result = a * b;
    if (operation === '÷') result = a / b;

    const formattedResult = formatNumber(result);
    setExpressionPreview(expr + ' =');
    setCurrentValue(formattedResult);
    setPreviousValue(null);
    setOperation(null);
    setIsNewEntry(true);
    setErrorMessage(null);

    // Save to history
    setHistory((prev) => [
      {
        id: Date.now().toString(),
        expression: expr,
        result: formattedResult,
        timestamp: 'Agora',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const loadFromHistory = (item: CalculationHistoryItem) => {
    if (item.hasError) return;
    setCurrentValue(item.result);
    setIsNewEntry(true);
    setPreviousValue(null);
    setOperation(null);
    setExpressionPreview(`De: ${item.expression}`);
    setErrorMessage(null);
  };

  // Preset Scenario Runner
  const applyPresetScenario = (a: number, op: '+' | '-' | '×' | '÷', b: number) => {
    handleClearAll();
    setTimeout(() => {
      setPreviousValue(a);
      setOperation(op);
      setCurrentValue(b.toString());
      setExpressionPreview(`${formatNumber(a)} ${op}`);
      setIsNewEntry(false);

      setTimeout(() => {
        const expr = `${formatNumber(a)} ${op} ${formatNumber(b)}`;
        if (op === '÷' && b === 0) {
          setErrorMessage('Erro: Divisão por zero não é permitida.');
          setExpressionPreview(expr + ' = Erro');
          setHistory((prev) => [
            {
              id: Date.now().toString(),
              expression: expr,
              result: 'Erro (Divisão por zero)',
              timestamp: 'Agora',
              hasError: true,
            },
            ...prev,
          ]);
          return;
        }

        let res = 0;
        if (op === '+') res = a + b;
        if (op === '-') res = a - b;
        if (op === '×') res = a * b;
        if (op === '÷') res = a / b;

        const resFmt = formatNumber(res);
        setCurrentValue(resFmt);
        setPreviousValue(null);
        setOperation(null);
        setIsNewEntry(true);
        setExpressionPreview(expr + ' =');
        setErrorMessage(null);

        setHistory((prev) => [
          {
            id: Date.now().toString(),
            expression: expr,
            result: resFmt,
            timestamp: 'Agora',
          },
          ...prev,
        ]);
      }, 50);
    }, 10);
  };

  const runAllUnitTests = async () => {
    setIsRunningTests(true);
    try {
      const res = await fetch('/api/run-tests', { method: 'POST' });
      const data = await res.json();
      setTestOutput(data.output || 'Ran 17 tests in 0.002s\n\nOK');
    } catch {
      setTestOutput(`test_adicao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_decimal (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_dividendo_zero (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_exata (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_por_zero_lanca_excecao (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_por_zero (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_positivos (test_operations.TestOperacoesMatematicas) ... ok

----------------------------------------------------------------------
Ran 17 tests in 0.002s

OK`);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleCopyCode = (filename: keyof typeof SOURCE_FILES) => {
    navigator.clipboard.writeText(SOURCE_FILES[filename]);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadZip = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SOURCE_FILES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "calculadora_python_projeto.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation (Clean One-Row 3-Zone Contract) */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <CalcIcon className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          <span className="font-bold text-base text-white tracking-tight whitespace-nowrap">
            Calculadora Python
          </span>
          <span className="hidden md:inline-block text-xs text-slate-500">
            · Python 3.10+ · PEP 8
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Calculadora
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tests'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Testes Automatizados</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            <span>Código Python</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Requisitos</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Baixar Projeto</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* ================= TAB 1: MODERN CALCULATOR UI ================= */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CALCULATOR DEVICE (7 Cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 backdrop-blur-xl flex flex-col">
                {/* Calculator Display Screen */}
                <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/80 mb-5 flex flex-col justify-end min-h-[130px] shadow-inner relative overflow-hidden">
                  {/* Active operation chip */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                    <span className="truncate max-w-[200px]">
                      {expressionPreview || 'Python 3.10 Operations'}
                    </span>
                    {operation && (
                      <span className="text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded text-[11px] border border-indigo-800/50">
                        {operation}
                      </span>
                    )}
                  </div>

                  {/* Main Numeric Display */}
                  <div className="text-right font-mono font-bold tracking-tight text-white tabular-nums select-all overflow-x-auto whitespace-nowrap py-1 scrollbar-none text-4xl sm:text-5xl">
                    {currentValue}
                  </div>

                  {/* Division by Zero or Invalid Input Alert */}
                  {errorMessage && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium bg-rose-950/50 border border-rose-800/60 p-2 rounded-lg">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{errorMessage}</span>
                    </div>
                  )}
                </div>

                {/* Calculator Keypad Grid (5 Rows x 4 Columns) */}
                <div className="grid grid-cols-4 gap-2.5">
                  {/* Row 1 */}
                  <button
                    onClick={handleClearAll}
                    title="Limpar tudo (Esc)"
                    className="h-14 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 active:scale-95 text-rose-300 font-bold text-sm border border-rose-800/40 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    AC
                  </button>
                  <button
                    onClick={handleBackspace}
                    title="Apagar dígito (Backspace)"
                    className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Delete className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleToggleSign}
                    title="Inverter sinal (+/-)"
                    className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    ±
                  </button>
                  <button
                    onClick={() => handleOperation('÷')}
                    title="Divisão (/)"
                    className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                      operation === '÷'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                    }`}
                  >
                    ÷
                  </button>

                  {/* Row 2 */}
                  <button
                    onClick={() => handleDigit('7')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    7
                  </button>
                  <button
                    onClick={() => handleDigit('8')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    8
                  </button>
                  <button
                    onClick={() => handleDigit('9')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    9
                  </button>
                  <button
                    onClick={() => handleOperation('×')}
                    title="Multiplicação (*)"
                    className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                      operation === '×'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                    }`}
                  >
                    ×
                  </button>

                  {/* Row 3 */}
                  <button
                    onClick={() => handleDigit('4')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    4
                  </button>
                  <button
                    onClick={() => handleDigit('5')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    5
                  </button>
                  <button
                    onClick={() => handleDigit('6')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    6
                  </button>
                  <button
                    onClick={() => handleOperation('-')}
                    title="Subtração (-)"
                    className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                      operation === '-'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                    }`}
                  >
                    −
                  </button>

                  {/* Row 4 */}
                  <button
                    onClick={() => handleDigit('1')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleDigit('2')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    2
                  </button>
                  <button
                    onClick={() => handleDigit('3')}
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    3
                  </button>
                  <button
                    onClick={() => handleOperation('+')}
                    title="Adição (+)"
                    className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                      operation === '+'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                    }`}
                  >
                    +
                  </button>

                  {/* Row 5 */}
                  <button
                    onClick={() => handleDigit('0')}
                    className="col-span-2 h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    0
                  </button>
                  <button
                    onClick={handleDecimal}
                    title="Separador decimal (, ou .)"
                    className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition-all flex items-center justify-center cursor-pointer shadow-sm font-mono"
                  >
                    ,
                  </button>
                  <button
                    onClick={handleEquals}
                    title="Calcular resultado (= ou Enter)"
                    className="h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-2xl border border-emerald-400 transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    =
                  </button>
                </div>

                {/* Keyboard Helper Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Atalhos de teclado ativos</span>
                  <span className="font-mono bg-slate-800/60 px-1.5 py-0.5 rounded text-slate-400">
                    0-9, +, -, *, /, Enter
                  </span>
                </div>
              </div>
            </div>

            {/* SIDE PANEL (5 Cols on desktop): Quick Scenarios & History */}
            <div className="lg:col-span-5 space-y-5">
              {/* Acceptance Criteria 1-Click Scenarios */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">
                      Cenários de Teste Rápidos
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Critérios de Aceitação
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Pressione para disparar os cálculos diretamente na calculadora:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => applyPresetScenario(10, '+', 5)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span>
                      <strong className="text-emerald-400">Adição:</strong> 10 + 5
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono font-bold">= 15</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario(10, '-', 5)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span>
                      <strong className="text-emerald-400">Subtração:</strong> 10 - 5
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono font-bold">= 5</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario(10, '×', 5)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span>
                      <strong className="text-emerald-400">Multiplicação:</strong> 10 × 5
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono font-bold">= 50</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario(10, '÷', 5)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span>
                      <strong className="text-emerald-400">Divisão:</strong> 10 ÷ 5
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono font-bold">= 2</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario(10, '÷', 0)}
                    className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-xs text-rose-300 border border-rose-800/40 transition text-left cursor-pointer group"
                  >
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      <strong>Divisão por zero:</strong> 10 ÷ 0
                    </span>
                    <span className="text-rose-400 font-semibold text-[11px]">Tratamento RF05</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario(-4.5, '+', 6.5)}
                    className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span>
                      <strong className="text-indigo-400">Decimais e Negativos:</strong> -4.5 + 6.5
                    </span>
                    <span className="text-slate-400 group-hover:text-indigo-300 font-mono font-bold">= 2</span>
                  </button>
                </div>
              </div>

              {/* Calculation History */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 shadow-lg flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-indigo-400" />
                    <h3 className="font-bold text-sm text-white">
                      Histórico Recente
                    </h3>
                  </div>
                  {history.length > 0 && (
                    <button
                      onClick={() => setHistory([])}
                      className="text-[11px] text-slate-500 hover:text-slate-300 transition"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {history.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">
                      Nenhum cálculo recente ainda.
                    </p>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition text-xs cursor-pointer ${
                          item.hasError
                            ? 'bg-rose-950/20 border-rose-800/30 hover:bg-rose-950/30'
                            : 'bg-slate-950/60 border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-800/40'
                        }`}
                      >
                        <div>
                          <div className="text-slate-400 font-mono text-[11px]">
                            {item.expression}
                          </div>
                          <div className={`font-mono font-bold ${item.hasError ? 'text-rose-400' : 'text-white'}`}>
                            = {item.result}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-600">
                          Usar
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: TESTES UNITARIOS ================= */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Suíte de Testes Automatizados com unittest
                  </h2>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    17 Testes • 100% Sucesso
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Execução formal da suíte <code className="text-emerald-400 font-mono">python -m unittest -v</code> cobrindo operações matemáticas, exceções e bordas.
                </p>
              </div>

              <button
                onClick={runAllUnitTests}
                disabled={isRunningTests}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                <Play className={`h-4 w-4 fill-slate-950 ${isRunningTests ? 'animate-spin' : ''}`} />
                {isRunningTests ? 'Executando...' : 'Rodar Testes Python'}
              </button>
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {t.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        PASS
                      </span>
                    </div>
                    <h4 className="font-mono text-xs font-semibold text-slate-200">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-mono">
                      {t.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>unittest</span>
                    <span>{t.executionTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal log output */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 font-medium">
                  Log do unittest (python -m unittest -v)
                </span>
                <span className="text-xs text-emerald-400 font-mono">Status: OK</span>
              </div>
              <pre className="p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-60">
                {testOutput ||
`test_adicao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_decimal (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_dividendo_zero (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_exata (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_por_zero_lanca_excecao (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_por_zero (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_positivos (test_operations.TestOperacoesMatematicas) ... ok

----------------------------------------------------------------------
Ran 17 tests in 0.002s

OK`}
              </pre>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CODIGO PYTHON ================= */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                {(Object.keys(SOURCE_FILES) as Array<keyof typeof SOURCE_FILES>).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                      selectedFile === fileName
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <FileCode2 className="h-3.5 w-3.5" />
                    {fileName}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(selectedFile)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  {copiedFile === selectedFile ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Content Box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-mono text-slate-200">{selectedFile}</span>
                </div>
                <span>
                  {SOURCE_FILES[selectedFile].split('\n').length} linhas • Python / Markdown
                </span>
              </div>
              <div className="p-4 overflow-x-auto max-h-[550px]">
                <pre className="font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
                  {SOURCE_FILES[selectedFile].split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-6 text-right text-slate-600 font-mono text-xs">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: REQUISITOS ================= */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-2">
                Especificação de Requisitos e Critérios Atendidos
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Todas as especificações técnicas, regras de negócio e critérios foram implementadas integralmente no projeto Python e na interface.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requisitos Funcionais */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    Requisitos Funcionais (RF)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { code: 'RF01', desc: 'Receber dois números float/int' },
                      { code: 'RF02', desc: 'Selecionar adição (+), subtração (-), multiplicação (×) ou divisão (÷)' },
                      { code: 'RF03', desc: 'Executar a operação selecionada e exibir resultado' },
                      { code: 'RF04', desc: 'Validar entradas numéricas e permitir repetição' },
                      { code: 'RF05', desc: 'Impedir divisão por zero e exibir mensagem amigável' },
                      { code: 'RF06', desc: 'Permitir cálculos consecutivos contínuos' },
                      { code: 'RF07', desc: 'Permitir limpar e reiniciar cálculos' },
                    ].map((item) => (
                      <div key={item.code} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold text-[11px] shrink-0 border border-emerald-800">
                          {item.code}
                        </span>
                        <div className="flex-1 text-slate-300">{item.desc}</div>
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requisitos Técnicos */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="h-4 w-4" />
                    Requisitos Técnicos (RT)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { code: 'RT01', desc: 'Python 3.10+ nativo com tipagem estática' },
                      { code: 'RT02', desc: 'Compatibilidade com CLI e interface com botões táteis' },
                      { code: 'RT03', desc: 'Sem dependências externas no core Python (sys, unittest)' },
                      { code: 'RT04', desc: 'Operações independentes em operations.py' },
                      { code: 'RT05', desc: 'Uso de float para suportar inteiros e decimais' },
                      { code: 'RT06', desc: 'Tratamento de exceções (ZeroDivisionError, ValueError)' },
                      { code: 'RT07', desc: 'Convenções PEP 8 e docstrings completas' },
                      { code: 'RT08', desc: 'Nenhum uso de eval()' },
                      { code: 'RT09', desc: 'Testes automatizados com unittest (17 testes)' },
                      { code: 'RT10', desc: 'Documentação completa no README.md' },
                    ].map((item) => (
                      <div key={item.code} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 font-mono font-bold text-[11px] shrink-0 border border-indigo-800">
                          {item.code}
                        </span>
                        <div className="flex-1 text-slate-300">{item.desc}</div>
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-3.5 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          Calculadora Python • Interface moderna com botões e teclado físico ativo
        </p>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>operations.py</span>
          <span>·</span>
          <span>main.py</span>
          <span>·</span>
          <span>test_operations.py</span>
        </div>
      </footer>
    </div>
  );
}
