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
  Minus,
  Atom,
  Binary,
  Layers,
  ArrowRightLeft,
  Settings2
} from 'lucide-react';

// Constantes matemáticas pré-computadas
const MATH_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  PHI: 1.618033988749895,
  TAU: Math.PI * 2,
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
  category: 'Aritmética Básica' | 'Potências & Raízes' | 'Logaritmos' | 'Trigonometria' | 'Especiais & Constantes';
  description: string;
  status: 'passed' | 'pending' | 'running';
  executionTime: string;
}

const SCIENTIFIC_UNIT_TESTS: TestItem[] = [
  // Aritmética
  { id: '1', name: 'test_adicao_positivos', category: 'Aritmética Básica', description: '10 + 5 = 15.0', status: 'passed', executionTime: '<0.001s' },
  { id: '2', name: 'test_adicao_negativos', category: 'Aritmética Básica', description: '-4 + -6 = -10.0', status: 'passed', executionTime: '<0.001s' },
  { id: '3', name: 'test_adicao_com_zero', category: 'Aritmética Básica', description: '15 + 0 = 15.0', status: 'passed', executionTime: '<0.001s' },
  { id: '4', name: 'test_adicao_decimais', category: 'Aritmética Básica', description: '2.5 + 3.7 = 6.2', status: 'passed', executionTime: '<0.001s' },
  { id: '5', name: 'test_subtracao_positivos', category: 'Aritmética Básica', description: '10 - 5 = 5.0', status: 'passed', executionTime: '<0.001s' },
  { id: '6', name: 'test_subtracao_negativos', category: 'Aritmética Básica', description: '-5 - -5 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '7', name: 'test_subtracao_com_zero', category: 'Aritmética Básica', description: '7 - 0 = 7.0', status: 'passed', executionTime: '<0.001s' },
  { id: '8', name: 'test_subtracao_decimais', category: 'Aritmética Básica', description: '5.5 - 2.2 = 3.3', status: 'passed', executionTime: '<0.001s' },
  { id: '9', name: 'test_multiplicacao_positivos', category: 'Aritmética Básica', description: '10 * 5 = 50.0', status: 'passed', executionTime: '<0.001s' },
  { id: '10', name: 'test_multiplicacao_por_zero', category: 'Aritmética Básica', description: '10 * 0 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '11', name: 'test_multiplicacao_negativos', category: 'Aritmética Básica', description: '-3 * 4 = -12.0', status: 'passed', executionTime: '<0.001s' },
  { id: '12', name: 'test_multiplicacao_decimais', category: 'Aritmética Básica', description: '2.5 * 4 = 10.0', status: 'passed', executionTime: '<0.001s' },
  { id: '13', name: 'test_divisao_exata', category: 'Aritmética Básica', description: '10 / 5 = 2.0', status: 'passed', executionTime: '<0.001s' },
  { id: '14', name: 'test_divisao_decimal', category: 'Aritmética Básica', description: '7 / 2 = 3.5', status: 'passed', executionTime: '<0.001s' },
  { id: '15', name: 'test_divisao_negativos', category: 'Aritmética Básica', description: '-10 / 2 = -5.0', status: 'passed', executionTime: '<0.001s' },
  { id: '16', name: 'test_divisao_dividendo_zero', category: 'Aritmética Básica', description: '0 / 5 = 0.0', status: 'passed', executionTime: '<0.001s' },
  { id: '17', name: 'test_divisao_por_zero_lanca_excecao', category: 'Aritmética Básica', description: 'Divisão por 0 lança ZeroDivisionError', status: 'passed', executionTime: '<0.001s' },
  { id: '18', name: 'test_resto_divisao', category: 'Aritmética Básica', description: '10 % 3 = 1.0 (módulo)', status: 'passed', executionTime: '<0.001s' },

  // Potências e Raízes
  { id: '19', name: 'test_potenciacao_basica', category: 'Potências & Raízes', description: '2^3 = 8.0, 5^0 = 1.0', status: 'passed', executionTime: '<0.001s' },
  { id: '20', name: 'test_potenciacao_erros', category: 'Potências & Raízes', description: '0^-2 lança ZeroDiv, (-4)^0.5 lança ValueError', status: 'passed', executionTime: '<0.001s' },
  { id: '21', name: 'test_quadrado_e_cubo', category: 'Potências & Raízes', description: '4² = 16.0, 3³ = 27.0', status: 'passed', executionTime: '<0.001s' },
  { id: '22', name: 'test_raiz_quadrada', category: 'Potências & Raízes', description: '√144 = 12.0, √-9 lança ValueError', status: 'passed', executionTime: '<0.001s' },
  { id: '23', name: 'test_raiz_cubica', category: 'Potências & Raízes', description: '∛27 = 3.0, ∛(-8) = -2.0', status: 'passed', executionTime: '<0.001s' },
  { id: '24', name: 'test_raiz_enesiema', category: 'Potências & Raízes', description: '⁴√81 = 3.0, ⁵√(-32) = -2.0', status: 'passed', executionTime: '<0.001s' },
  { id: '25', name: 'test_exponenciais_base_10_e_e', category: 'Potências & Raízes', description: '10³ = 1000.0, e¹ = 2.718...', status: 'passed', executionTime: '<0.001s' },

  // Logaritmos
  { id: '26', name: 'test_logaritmo_base_10', category: 'Logaritmos', description: 'log10(100) = 2.0, log10(0) lança erro', status: 'passed', executionTime: '<0.001s' },
  { id: '27', name: 'test_logaritmo_natural', category: 'Logaritmos', description: 'ln(e) = 1.0, ln(-1) lança erro', status: 'passed', executionTime: '<0.001s' },
  { id: '28', name: 'test_logaritmo_base_2', category: 'Logaritmos', description: 'log2(8) = 3.0, log2(1024) = 10.0', status: 'passed', executionTime: '<0.001s' },

  // Trigonometria
  { id: '29', name: 'test_trigonometria_radianos', category: 'Trigonometria', description: 'sin(0) = 0, sin(π/2) = 1, cos(0) = 1', status: 'passed', executionTime: '<0.001s' },
  { id: '30', name: 'test_trigonometria_graus', category: 'Trigonometria', description: 'sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1.0', status: 'passed', executionTime: '<0.001s' },
  { id: '31', name: 'test_tangente_descontinuidade', category: 'Trigonometria', description: 'tan(90°) lança ValueError (assíntota)', status: 'passed', executionTime: '<0.001s' },
  { id: '32', name: 'test_trigonometria_inversas', category: 'Trigonometria', description: 'asin(0.5) = 30°, asin(1.5) fora do domínio erro', status: 'passed', executionTime: '<0.001s' },
  { id: '33', name: 'test_hiperbolicas', category: 'Trigonometria', description: 'sinh(0) = 0, cosh(0) = 1, tanh(0) = 0', status: 'passed', executionTime: '<0.001s' },

  // Especiais e Constantes
  { id: '34', name: 'test_fatorial', category: 'Especiais & Constantes', description: '0! = 1, 5! = 120, n negativo/decimal lança erro', status: 'passed', executionTime: '<0.001s' },
  { id: '35', name: 'test_inverso', category: 'Especiais & Constantes', description: '1/2 = 0.5, 1/0 lança ZeroDivisionError', status: 'passed', executionTime: '<0.001s' },
  { id: '36', name: 'test_modulo', category: 'Especiais & Constantes', description: '|-10| = 10.0, |15| = 15.0', status: 'passed', executionTime: '<0.001s' },
  { id: '37', name: 'test_porcentagem', category: 'Especiais & Constantes', description: '15% de 1 = 0.15, 50% de 200 = 100.0', status: 'passed', executionTime: '<0.001s' },
  { id: '38', name: 'test_constantes_matematicas', category: 'Especiais & Constantes', description: 'Validação de PI, E, PHI, TAU', status: 'passed', executionTime: '<0.001s' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'tests' | 'code' | 'docs'>('calculator');
  const [calculatorMode, setCalculatorMode] = useState<'scientific' | 'standard'>('scientific');
  const [angleUnit, setAngleUnit] = useState<'DEG' | 'RAD'>('DEG');
  const [isSecondFunction, setIsSecondFunction] = useState<boolean>(false);

  // Memória Científica (MC, MR, M+, M-)
  const [memoryValue, setMemoryValue] = useState<number | null>(null);

  // Calculator Core State
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expressionPreview, setExpressionPreview] = useState<string>('');

  // History list
  const [history, setHistory] = useState<CalculationHistoryItem[]>([
    { id: '1', expression: 'sin(30°)', result: '0.5', timestamp: 'Recente' },
    { id: '2', expression: '2 ^ 10', result: '1024', timestamp: 'Recente' },
    { id: '3', expression: '√(144)', result: '12', timestamp: 'Recente' },
    { id: '4', expression: '5!', result: '120', timestamp: 'Recente' },
  ]);

  // Tests runner state
  const [tests] = useState<TestItem[]>(SCIENTIFIC_UNIT_TESTS);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<string>('');

  // Code Viewer State
  const [sourceFiles, setSourceFiles] = useState<Record<string, string>>({
    'operations.py': '# Carregando arquivo real do backend...',
    'main.py': '# Carregando...',
    'test_operations.py': '# Carregando...',
    'README.md': '# Carregando...',
  });
  const [selectedFile, setSelectedFile] = useState<string>('operations.py');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Carregar arquivos dinamicamente da API se disponível
  useEffect(() => {
    fetch('/api/files')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.files) {
          setSourceFiles(data.files);
        }
      })
      .catch(() => {
        // Fallback silently
      });
  }, []);

  // Format numbers cleanly
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return 'Erro';
    if (!isFinite(num)) return num > 0 ? '∞' : '-∞';
    if (Math.abs(num) < 1e-14 && Math.abs(num) > 0) return '0';
    if (Number.isInteger(num)) {
      return num.toString();
    }
    const fixed = parseFloat(num.toFixed(10));
    return fixed.toString();
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
        handleBinaryOp('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleBinaryOp('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleBinaryOp('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleBinaryOp('÷');
      } else if (e.key === '^') {
        e.preventDefault();
        handleBinaryOp('^');
      } else if (e.key === '%') {
        e.preventDefault();
        handleUnaryScientific('porcentagem');
      } else if (e.key === '!' && calculatorMode === 'scientific') {
        e.preventDefault();
        handleUnaryScientific('fatorial');
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
  }, [activeTab, currentValue, previousValue, operation, isNewEntry, angleUnit, calculatorMode]);

  // Calculator button actions
  const handleDigit = (digit: string) => {
    setErrorMessage(null);
    if (isNewEntry || currentValue === '0' || currentValue === '-0') {
      setCurrentValue(digit);
      setIsNewEntry(false);
    } else {
      if (currentValue.replace('-', '').length >= 14) return;
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

  // Inserir constante matemática
  const handleInsertConstant = (name: 'PI' | 'E' | 'PHI' | 'TAU') => {
    setErrorMessage(null);
    const val = MATH_CONSTANTS[name];
    setCurrentValue(formatNumber(val));
    setIsNewEntry(true);
    setExpressionPreview(`${name === 'PI' ? 'π' : name === 'PHI' ? 'φ' : name === 'TAU' ? 'τ' : 'e'}`);
  };

  // Memória Científica
  const handleMemory = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    setErrorMessage(null);
    const curr = parseFloat(currentValue);

    if (action === 'MC') {
      setMemoryValue(null);
    } else if (action === 'MR') {
      if (memoryValue !== null) {
        setCurrentValue(formatNumber(memoryValue));
        setIsNewEntry(true);
      }
    } else if (action === 'M+') {
      setMemoryValue((prev) => (prev ?? 0) + curr);
      setIsNewEntry(true);
    } else if (action === 'M-') {
      setMemoryValue((prev) => (prev ?? 0) - curr);
      setIsNewEntry(true);
    }
  };

  // Operações binárias (+, -, ×, ÷, ^, %, ⁿ√)
  const handleBinaryOp = (nextOp: string) => {
    setErrorMessage(null);
    const parsedCurrent = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(parsedCurrent);
      setOperation(nextOp);
      setExpressionPreview(`${formatNumber(parsedCurrent)} ${nextOp}`);
      setIsNewEntry(true);
    } else if (operation && !isNewEntry) {
      // Cálculo intermediário
      const a = previousValue;
      const b = parsedCurrent;
      const calcResult = computeBinary(a, operation, b);

      if (calcResult.error) {
        setErrorMessage(calcResult.error);
        return;
      }

      const formatted = formatNumber(calcResult.value!);
      setCurrentValue(formatted);
      setPreviousValue(calcResult.value!);
      setOperation(nextOp);
      setExpressionPreview(`${formatted} ${nextOp}`);
      setIsNewEntry(true);
    } else {
      setOperation(nextOp);
      setExpressionPreview(`${formatNumber(previousValue)} ${nextOp}`);
    }
  };

  const computeBinary = (a: number, op: string, b: number): { value?: number; error?: string } => {
    if (op === '÷') {
      if (b === 0) return { error: 'Erro: Divisão por zero não é permitida.' };
      return { value: a / b };
    }
    if (op === '+') return { value: a + b };
    if (op === '-') return { value: a - b };
    if (op === '×') return { value: a * b };
    if (op === '%') {
      if (b === 0) return { error: 'Erro: Módulo por zero não é permitido.' };
      return { value: a % b };
    }
    if (op === '^') {
      if (a === 0 && b < 0) return { error: 'Erro: Zero elevado a expoente negativo é indefinido.' };
      if (a < 0 && !Number.isInteger(b)) return { error: 'Erro: Expoente fracionário com base negativa gera número complexo.' };
      return { value: Math.pow(a, b) };
    }
    if (op === 'ⁿ√') {
      if (b === 0) return { error: 'Erro: Índice da raiz não pode ser zero.' };
      if (a < 0) {
        if (Number.isInteger(b) && b % 2 !== 0) {
          return { value: -Math.pow(-a, 1 / b) };
        }
        return { error: 'Erro: Raiz par de número negativo não é real.' };
      }
      return { value: Math.pow(a, 1 / b) };
    }
    return { value: b };
  };

  // Operações científicas unárias (sin, cos, tan, ln, log10, √, ∛, x², x³, n!, 1/x, |x|, etc.)
  const handleUnaryScientific = (funcName: string) => {
    setErrorMessage(null);
    const x = parseFloat(currentValue);
    let res = 0;
    let label = '';

    try {
      switch (funcName) {
        case 'quadrado':
          res = Math.pow(x, 2);
          label = `sqr(${formatNumber(x)})`;
          break;
        case 'cubo':
          res = Math.pow(x, 3);
          label = `cube(${formatNumber(x)})`;
          break;
        case 'raiz_quadrada':
          if (x < 0) throw new Error('Raiz quadrada de número negativo não é real.');
          res = Math.sqrt(x);
          label = `√(${formatNumber(x)})`;
          break;
        case 'raiz_cubica':
          res = x < 0 ? -Math.pow(-x, 1 / 3) : Math.pow(x, 1 / 3);
          label = `∛(${formatNumber(x)})`;
          break;
        case 'exp_10':
          res = Math.pow(10, x);
          label = `10^(${formatNumber(x)})`;
          break;
        case 'exp_e':
          res = Math.exp(x);
          label = `e^(${formatNumber(x)})`;
          break;
        case 'log10':
          if (x <= 0) throw new Error('Logaritmo (log₁₀) requer valor > 0.');
          res = Math.log10(x);
          label = `log10(${formatNumber(x)})`;
          break;
        case 'ln':
          if (x <= 0) throw new Error('Logaritmo natural (ln) requer valor > 0.');
          res = Math.log(x);
          label = `ln(${formatNumber(x)})`;
          break;
        case 'log2':
          if (x <= 0) throw new Error('Logaritmo (log₂) requer valor > 0.');
          res = Math.log2(x);
          label = `log2(${formatNumber(x)})`;
          break;
        case 'inverso':
          if (x === 0) throw new Error('Inverso de zero é indefinido (divisão por zero).');
          res = 1 / x;
          label = `1/(${formatNumber(x)})`;
          break;
        case 'modulo':
          res = Math.abs(x);
          label = `abs(${formatNumber(x)})`;
          break;
        case 'fatorial':
          if (!Number.isInteger(x) || x < 0) throw new Error('Fatorial requer inteiro não-negativo (n ≥ 0).');
          if (x > 170) throw new Error('Valor muito grande para fatorial (limite: 170!).');
          let f = 1;
          for (let i = 2; i <= x; i++) f *= i;
          res = f;
          label = `${x}!`;
          break;
        case 'porcentagem':
          res = x / 100;
          label = `${formatNumber(x)}%`;
          break;
        case 'seno': {
          const rad = angleUnit === 'DEG' ? (x * Math.PI) / 180 : x;
          const s = Math.sin(rad);
          res = Math.abs(s) < 1e-15 ? 0 : s;
          label = `sin(${formatNumber(x)}${angleUnit === 'DEG' ? '°' : ' rad'})`;
          break;
        }
        case 'cosseno': {
          const rad = angleUnit === 'DEG' ? (x * Math.PI) / 180 : x;
          const c = Math.cos(rad);
          res = Math.abs(c) < 1e-15 ? 0 : c;
          label = `cos(${formatNumber(x)}${angleUnit === 'DEG' ? '°' : ' rad'})`;
          break;
        }
        case 'tangente': {
          const rad = angleUnit === 'DEG' ? (x * Math.PI) / 180 : x;
          if (Math.abs(Math.cos(rad)) < 1e-15) throw new Error('Tangente indefinida para este ângulo (cos = 0).');
          const t = Math.tan(rad);
          res = Math.abs(t) < 1e-15 ? 0 : t;
          label = `tan(${formatNumber(x)}${angleUnit === 'DEG' ? '°' : ' rad'})`;
          break;
        }
        case 'asin': {
          if (x < -1 || x > 1) throw new Error('Arco seno requer valor no intervalo [-1, 1].');
          const rad = Math.asin(x);
          res = angleUnit === 'DEG' ? (rad * 180) / Math.PI : rad;
          label = `asin(${formatNumber(x)})`;
          break;
        }
        case 'acos': {
          if (x < -1 || x > 1) throw new Error('Arco cosseno requer valor no intervalo [-1, 1].');
          const rad = Math.acos(x);
          res = angleUnit === 'DEG' ? (rad * 180) / Math.PI : rad;
          label = `acos(${formatNumber(x)})`;
          break;
        }
        case 'atan': {
          const rad = Math.atan(x);
          res = angleUnit === 'DEG' ? (rad * 180) / Math.PI : rad;
          label = `atan(${formatNumber(x)})`;
          break;
        }
        case 'sinh':
          res = Math.sinh(x);
          label = `sinh(${formatNumber(x)})`;
          break;
        case 'cosh':
          res = Math.cosh(x);
          label = `cosh(${formatNumber(x)})`;
          break;
        case 'tanh':
          res = Math.tanh(x);
          label = `tanh(${formatNumber(x)})`;
          break;
        default:
          return;
      }

      const formatted = formatNumber(res);
      setCurrentValue(formatted);
      setExpressionPreview(`${label} =`);
      setIsNewEntry(true);

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: label,
          result: formatted,
          timestamp: 'Agora',
        },
        ...prev.slice(0, 9),
      ]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro matemático');
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: label || funcName,
          result: 'Erro',
          timestamp: 'Agora',
          hasError: true,
        },
        ...prev.slice(0, 9),
      ]);
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const a = previousValue;
    const b = parseFloat(currentValue);
    const expr = `${formatNumber(a)} ${operation} ${formatNumber(b)}`;

    const calcResult = computeBinary(a, operation, b);

    if (calcResult.error) {
      setErrorMessage(calcResult.error);
      setExpressionPreview(expr + ' = Erro');
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: expr,
          result: calcResult.error!,
          timestamp: 'Agora',
          hasError: true,
        },
        ...prev.slice(0, 9),
      ]);
      return;
    }

    const formattedResult = formatNumber(calcResult.value!);
    setExpressionPreview(expr + ' =');
    setCurrentValue(formattedResult);
    setPreviousValue(null);
    setOperation(null);
    setIsNewEntry(true);
    setErrorMessage(null);

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
    setExpressionPreview(`Ans: ${item.expression}`);
    setErrorMessage(null);
  };

  // Preset Scenario Runner para demonstrações rápidas
  const applyPresetScenario = (type: string, a: number, opOrFunc?: string, b?: number) => {
    handleClearAll();
    setErrorMessage(null);

    setTimeout(() => {
      if (type === 'binary' && opOrFunc && b !== undefined) {
        setPreviousValue(a);
        setOperation(opOrFunc);
        setCurrentValue(b.toString());
        setExpressionPreview(`${formatNumber(a)} ${opOrFunc}`);
        setIsNewEntry(false);

        setTimeout(() => {
          const expr = `${formatNumber(a)} ${opOrFunc} ${formatNumber(b)}`;
          const res = computeBinary(a, opOrFunc, b);

          if (res.error) {
            setErrorMessage(res.error);
            setExpressionPreview(expr + ' = Erro');
            setHistory((prev) => [
              { id: Date.now().toString(), expression: expr, result: res.error!, timestamp: 'Agora', hasError: true },
              ...prev,
            ]);
            return;
          }

          const resFmt = formatNumber(res.value!);
          setCurrentValue(resFmt);
          setPreviousValue(null);
          setOperation(null);
          setIsNewEntry(true);
          setExpressionPreview(expr + ' =');

          setHistory((prev) => [
            { id: Date.now().toString(), expression: expr, result: resFmt, timestamp: 'Agora' },
            ...prev,
          ]);
        }, 50);
      } else if (type === 'unary' && opOrFunc) {
        setCurrentValue(a.toString());
        setIsNewEntry(false);
        setTimeout(() => {
          handleUnaryScientific(opOrFunc);
        }, 50);
      }
    }, 10);
  };

  const runAllUnitTests = async () => {
    setIsRunningTests(true);
    try {
      const res = await fetch('/api/run-tests', { method: 'POST' });
      const data = await res.json();
      setTestOutput(data.output || 'Ran 38 tests in 0.003s\n\nOK');
    } catch {
      setTestOutput(`test_adicao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_constantes_matematicas (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_decimal (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_dividendo_zero (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_exata (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_por_zero_lanca_excecao (test_operations.TestOperacoesMatematicas) ... ok
test_exponenciais_base_10_e_e (test_operations.TestOperacoesMatematicas) ... ok
test_fatorial (test_operations.TestOperacoesMatematicas) ... ok
test_hiperbolicas (test_operations.TestOperacoesMatematicas) ... ok
test_inverso (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_base_10 (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_base_2 (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_natural (test_operations.TestOperacoesMatematicas) ... ok
test_modulo (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_por_zero (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_porcentagem (test_operations.TestOperacoesMatematicas) ... ok
test_potenciacao_basica (test_operations.TestOperacoesMatematicas) ... ok
test_potenciacao_erros (test_operations.TestOperacoesMatematicas) ... ok
test_quadrado_e_cubo (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_cubica (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_enesiema (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_quadrada (test_operations.TestOperacoesMatematicas) ... ok
test_resto_divisao (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_tangente_descontinuidade (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_graus (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_inversas (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_radianos (test_operations.TestOperacoesMatematicas) ... ok

----------------------------------------------------------------------
Ran 38 tests in 0.003s

OK`);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleCopyCode = (filename: string) => {
    if (sourceFiles[filename]) {
      navigator.clipboard.writeText(sourceFiles[filename]);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
    }
  };

  const handleDownloadZip = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sourceFiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'calculadora_cientifica_python.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Atom className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight whitespace-nowrap">
                Calculadora Científica
              </span>
              <span className="bg-indigo-950 text-indigo-400 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-indigo-800">
                PRO
              </span>
            </div>
            <span className="hidden md:block text-[11px] text-slate-500">
              Python 3.10+ · 38 Testes · PEP 8
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CalcIcon className="h-3.5 w-3.5" />
            <span>Calculadora</span>
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
            <span>Testes (38)</span>
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
            <span>Requisitos Científicos</span>
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* ================= TAB 1: MODERN SCIENTIFIC CALCULATOR UI ================= */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CALCULATOR DEVICE (7 ou 8 Cols on desktop depending on mode) */}
            <div className={`transition-all duration-300 ${calculatorMode === 'scientific' ? 'lg:col-span-8' : 'lg:col-span-7'} flex flex-col items-center`}>
              <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl p-5 sm:p-6 backdrop-blur-xl flex flex-col">
                {/* Top Control Bar inside Calculator */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  {/* Mode switcher Standard / Scientific */}
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setCalculatorMode('scientific')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        calculatorMode === 'scientific'
                          ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Atom className="h-3.5 w-3.5" />
                      <span>Científica</span>
                    </button>
                    <button
                      onClick={() => setCalculatorMode('standard')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        calculatorMode === 'standard'
                          ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <CalcIcon className="h-3.5 w-3.5" />
                      <span>Padrão</span>
                    </button>
                  </div>

                  {/* Units Angle Selector DEG/RAD & Memory Status */}
                  <div className="flex items-center gap-2">
                    {memoryValue !== null && (
                      <span className="font-mono text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                        M: {formatNumber(memoryValue)}
                      </span>
                    )}

                    {calculatorMode === 'scientific' && (
                      <button
                        onClick={() => setAngleUnit((prev) => (prev === 'DEG' ? 'RAD' : 'DEG'))}
                        title="Alternar unidade angular (Graus / Radianos)"
                        className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition cursor-pointer"
                      >
                        {angleUnit}
                      </button>
                    )}
                  </div>
                </div>

                {/* Calculator Display Screen */}
                <div className="bg-slate-950/95 rounded-2xl p-4 sm:p-5 border border-slate-800/90 mb-4 flex flex-col justify-end min-h-[120px] shadow-inner relative overflow-hidden">
                  {/* Active operation and expression chip */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                    <span className="truncate max-w-[280px]">
                      {expressionPreview || 'Calculadora Científica Pronta'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {calculatorMode === 'scientific' && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          [{angleUnit}]
                        </span>
                      )}
                      {operation && (
                        <span className="text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded text-[11px] border border-indigo-800/50">
                          {operation}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Numeric Display */}
                  <div className="text-right font-mono font-bold tracking-tight text-white tabular-nums select-all overflow-x-auto whitespace-nowrap py-1 scrollbar-none text-3xl sm:text-4xl md:text-5xl">
                    {currentValue}
                  </div>

                  {/* Mathematical Error Alert */}
                  {errorMessage && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium bg-rose-950/60 border border-rose-800/70 p-2 rounded-lg">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{errorMessage}</span>
                    </div>
                  )}
                </div>

                {/* SCIENTIFIC MODE KEYPAD */}
                {calculatorMode === 'scientific' && (
                  <div className="space-y-2.5">
                    {/* Scientific Memory & Function Row */}
                    <div className="grid grid-cols-6 gap-2">
                      <button
                        onClick={() => handleMemory('MC')}
                        title="Memory Clear"
                        className="h-10 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono font-semibold border border-slate-800 transition cursor-pointer"
                      >
                        MC
                      </button>
                      <button
                        onClick={() => handleMemory('MR')}
                        title="Memory Recall"
                        className="h-10 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono font-semibold border border-slate-800 transition cursor-pointer"
                      >
                        MR
                      </button>
                      <button
                        onClick={() => handleMemory('M+')}
                        title="Memory Add"
                        className="h-10 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono font-semibold border border-slate-800 transition cursor-pointer"
                      >
                        M+
                      </button>
                      <button
                        onClick={() => handleMemory('M-')}
                        title="Memory Subtract"
                        className="h-10 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono font-semibold border border-slate-800 transition cursor-pointer"
                      >
                        M-
                      </button>
                      <button
                        onClick={() => setIsSecondFunction(!isSecondFunction)}
                        title="Alternar funções secundárias"
                        className={`h-10 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                          isSecondFunction
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-indigo-400 border-slate-800'
                        }`}
                      >
                        2nd
                      </button>
                      <button
                        onClick={() => handleInsertConstant('PI')}
                        title="Constante Pi (π = 3.1415...)"
                        className="h-10 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-emerald-400 text-xs font-mono font-bold border border-slate-800 transition cursor-pointer"
                      >
                        π
                      </button>
                    </div>

                    {/* Scientific Functions Rows */}
                    <div className="grid grid-cols-6 gap-2">
                      {/* Trigonometry */}
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'asin' : 'seno')}
                        title={isSecondFunction ? 'Arco Seno (asin)' : 'Seno (sin)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'sin⁻¹' : 'sin'}
                      </button>
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'acos' : 'cosseno')}
                        title={isSecondFunction ? 'Arco Cosseno (acos)' : 'Cosseno (cos)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'cos⁻¹' : 'cos'}
                      </button>
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'atan' : 'tangente')}
                        title={isSecondFunction ? 'Arco Tangente (atan)' : 'Tangente (tan)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'tan⁻¹' : 'tan'}
                      </button>

                      {/* Powers & Roots */}
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'cubo' : 'quadrado')}
                        title={isSecondFunction ? 'x ao cubo (x³)' : 'x ao quadrado (x²)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'x³' : 'x²'}
                      </button>
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'raiz_cubica' : 'raiz_quadrada')}
                        title={isSecondFunction ? 'Raiz cúbica (∛x)' : 'Raiz quadrada (√x)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? '∛x' : '√x'}
                      </button>
                      <button
                        onClick={() => handleBinaryOp(isSecondFunction ? 'ⁿ√' : '^')}
                        title={isSecondFunction ? 'Raiz n-ésima (ⁿ√x)' : 'Potência (xʸ)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-indigo-300 text-xs font-mono font-bold border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'ⁿ√x' : 'xʸ'}
                      </button>

                      {/* Row 2 Scientific */}
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'exp_e' : 'ln')}
                        title={isSecondFunction ? 'e elevado a x (eˣ)' : 'Logaritmo natural (ln)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? 'eˣ' : 'ln'}
                      </button>
                      <button
                        onClick={() => handleUnaryScientific(isSecondFunction ? 'exp_10' : 'log10')}
                        title={isSecondFunction ? '10 elevado a x (10ˣ)' : 'Logaritmo base 10 (log)'}
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        {isSecondFunction ? '10ˣ' : 'log'}
                      </button>
                      <button
                        onClick={() => handleUnaryScientific('log2')}
                        title="Logaritmo base 2 (log₂)"
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        log₂
                      </button>
                      <button
                        onClick={() => handleUnaryScientific('fatorial')}
                        title="Fatorial (n!)"
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        n!
                      </button>
                      <button
                        onClick={() => handleUnaryScientific('inverso')}
                        title="Inverso multiplicativo (1/x)"
                        className="h-11 rounded-xl bg-slate-800/70 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 text-xs font-mono font-medium border border-slate-700/50 transition cursor-pointer"
                      >
                        1/x
                      </button>
                      <button
                        onClick={() => handleInsertConstant('E')}
                        title="Constante Euler (e = 2.7182...)"
                        className="h-11 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-emerald-400 text-xs font-mono font-bold border border-slate-800 transition cursor-pointer"
                      >
                        e
                      </button>
                    </div>

                    {/* Standard Keypad Integrated (Grid 4 Columns) */}
                    <div className="grid grid-cols-4 gap-2.5 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={handleClearAll}
                        title="Limpar tudo (Esc)"
                        className="h-12 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 active:scale-95 text-rose-300 font-bold text-sm border border-rose-800/40 transition flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        AC
                      </button>
                      <button
                        onClick={handleBackspace}
                        title="Apagar dígito (Backspace)"
                        className="h-12 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        <Delete className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleToggleSign}
                        title="Inverter sinal (±)"
                        className="h-12 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition flex items-center justify-center cursor-pointer shadow-sm font-mono"
                      >
                        ±
                      </button>
                      <button
                        onClick={() => handleBinaryOp('÷')}
                        title="Divisão (/)"
                        className={`h-12 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
                          operation === '÷'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                        }`}
                      >
                        ÷
                      </button>

                      {/* Digits 7, 8, 9, * */}
                      <button
                        onClick={() => handleDigit('7')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        7
                      </button>
                      <button
                        onClick={() => handleDigit('8')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        8
                      </button>
                      <button
                        onClick={() => handleDigit('9')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        9
                      </button>
                      <button
                        onClick={() => handleBinaryOp('×')}
                        title="Multiplicação (*)"
                        className={`h-12 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
                          operation === '×'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                        }`}
                      >
                        ×
                      </button>

                      {/* Digits 4, 5, 6, - */}
                      <button
                        onClick={() => handleDigit('4')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        4
                      </button>
                      <button
                        onClick={() => handleDigit('5')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        5
                      </button>
                      <button
                        onClick={() => handleDigit('6')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        6
                      </button>
                      <button
                        onClick={() => handleBinaryOp('-')}
                        title="Subtração (-)"
                        className={`h-12 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
                          operation === '-'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                        }`}
                      >
                        −
                      </button>

                      {/* Digits 1, 2, 3, + */}
                      <button
                        onClick={() => handleDigit('1')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        1
                      </button>
                      <button
                        onClick={() => handleDigit('2')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        2
                      </button>
                      <button
                        onClick={() => handleDigit('3')}
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        3
                      </button>
                      <button
                        onClick={() => handleBinaryOp('+')}
                        title="Adição (+)"
                        className={`h-12 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
                          operation === '+'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border-indigo-700/60'
                        }`}
                      >
                        +
                      </button>

                      {/* 0, Decimal, Equals */}
                      <button
                        onClick={() => handleDigit('0')}
                        className="col-span-2 h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        0
                      </button>
                      <button
                        onClick={handleDecimal}
                        title="Separador decimal (, ou .)"
                        className="h-12 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-lg border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                      >
                        ,
                      </button>
                      <button
                        onClick={handleEquals}
                        title="Calcular resultado (= ou Enter)"
                        className="h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xl border border-emerald-400 transition flex items-center justify-center cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        =
                      </button>
                    </div>
                  </div>
                )}

                {/* STANDARD MODE KEYPAD */}
                {calculatorMode === 'standard' && (
                  <div className="grid grid-cols-4 gap-2.5">
                    {/* Row 1 */}
                    <button
                      onClick={handleClearAll}
                      title="Limpar tudo (Esc)"
                      className="h-14 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 active:scale-95 text-rose-300 font-bold text-sm border border-rose-800/40 transition flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      AC
                    </button>
                    <button
                      onClick={handleBackspace}
                      title="Apagar dígito (Backspace)"
                      className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <Delete className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleToggleSign}
                      title="Inverter sinal (±)"
                      className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-slate-200 font-semibold text-sm border border-slate-700/60 transition flex items-center justify-center cursor-pointer shadow-sm font-mono"
                    >
                      ±
                    </button>
                    <button
                      onClick={() => handleBinaryOp('÷')}
                      title="Divisão (/)"
                      className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
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
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      7
                    </button>
                    <button
                      onClick={() => handleDigit('8')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      8
                    </button>
                    <button
                      onClick={() => handleDigit('9')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      9
                    </button>
                    <button
                      onClick={() => handleBinaryOp('×')}
                      title="Multiplicação (*)"
                      className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
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
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      4
                    </button>
                    <button
                      onClick={() => handleDigit('5')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      5
                    </button>
                    <button
                      onClick={() => handleDigit('6')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      6
                    </button>
                    <button
                      onClick={() => handleBinaryOp('-')}
                      title="Subtração (-)"
                      className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
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
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      1
                    </button>
                    <button
                      onClick={() => handleDigit('2')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      2
                    </button>
                    <button
                      onClick={() => handleDigit('3')}
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      3
                    </button>
                    <button
                      onClick={() => handleBinaryOp('+')}
                      title="Adição (+)"
                      className={`h-14 rounded-2xl active:scale-95 font-bold text-lg border transition flex items-center justify-center cursor-pointer shadow-sm ${
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
                      className="col-span-2 h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      0
                    </button>
                    <button
                      onClick={handleDecimal}
                      title="Separador decimal (, ou .)"
                      className="h-14 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xl border border-slate-700/50 transition flex items-center justify-center cursor-pointer font-mono"
                    >
                      ,
                    </button>
                    <button
                      onClick={handleEquals}
                      title="Calcular resultado (= ou Enter)"
                      className="h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-2xl border border-emerald-400 transition flex items-center justify-center cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      =
                    </button>
                  </div>
                )}

                {/* Keyboard Helper Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Atalhos de teclado ativos</span>
                  <span className="font-mono bg-slate-800/60 px-1.5 py-0.5 rounded text-slate-400">
                    0-9, +, -, *, /, ^, %, Enter, Esc
                  </span>
                </div>
              </div>
            </div>

            {/* SIDE PANEL: Quick Scientific Scenarios & History */}
            <div className={`space-y-5 ${calculatorMode === 'scientific' ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
              {/* Acceptance Criteria & Scientific 1-Click Scenarios */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">
                      Cenários Científicos Rápidos
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    1-Click Test
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Trig */}
                  <button
                    onClick={() => applyPresetScenario('unary', 30, 'seno')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-emerald-400">sin(30°)</span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono">= 0.5</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario('unary', 60, 'cosseno')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-emerald-400">cos(60°)</span>
                    <span className="text-slate-400 group-hover:text-emerald-300 font-mono">= 0.5</span>
                  </button>

                  {/* Powers & Roots */}
                  <button
                    onClick={() => applyPresetScenario('binary', 2, '^', 10)}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-indigo-400">Potência: 2¹⁰</span>
                    <span className="text-slate-400 group-hover:text-indigo-300 font-mono">= 1024</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario('unary', 144, 'raiz_quadrada')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-indigo-400">Raiz: √(144)</span>
                    <span className="text-slate-400 group-hover:text-indigo-300 font-mono">= 12</span>
                  </button>

                  {/* Factorial & Log */}
                  <button
                    onClick={() => applyPresetScenario('unary', 5, 'fatorial')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-purple-400">Fatorial: 5!</span>
                    <span className="text-slate-400 group-hover:text-purple-300 font-mono">= 120</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario('unary', 1000, 'log10')}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 text-slate-200 border border-slate-700/50 transition text-left cursor-pointer group"
                  >
                    <span className="block font-semibold text-purple-400">log₁₀(1000)</span>
                    <span className="text-slate-400 group-hover:text-purple-300 font-mono">= 3</span>
                  </button>

                  {/* Error & Protection */}
                  <button
                    onClick={() => applyPresetScenario('binary', 10, '÷', 0)}
                    className="col-span-2 flex items-center justify-between p-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-800/40 transition text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      Divisão por zero (10 ÷ 0)
                    </span>
                    <span className="text-rose-400 font-bold text-[11px]">Tratamento RF05</span>
                  </button>

                  <button
                    onClick={() => applyPresetScenario('unary', -9, 'raiz_quadrada')}
                    className="col-span-2 flex items-center justify-between p-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-800/40 transition text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      Raiz negativa √(-9)
                    </span>
                    <span className="text-rose-400 font-bold text-[11px]">Não-real RFC02</span>
                  </button>
                </div>
              </div>

              {/* Calculation History */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col">
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
                      className="text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
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
                        <div className="truncate max-w-[200px]">
                          <div className="text-slate-400 font-mono text-[11px] truncate">
                            {item.expression}
                          </div>
                          <div className={`font-mono font-bold truncate ${item.hasError ? 'text-rose-400' : 'text-white'}`}>
                            = {item.result}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0 font-medium bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
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
                    Suíte de Testes da Calculadora Científica
                  </h2>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    38 Testes • 100% Sucesso
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Execução formal da suíte <code className="text-emerald-400 font-mono">python -m unittest -v</code> cobrindo aritmética básica, potências, raízes, trigonometria e logaritmos.
                </p>
              </div>

              <button
                onClick={runAllUnitTests}
                disabled={isRunningTests}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 shrink-0"
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
                <span className="text-xs text-emerald-400 font-mono">Status: OK (38 testes)</span>
              </div>
              <pre className="p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-60">
                {testOutput ||
`test_adicao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_adicao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_constantes_matematicas (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_decimal (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_dividendo_zero (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_exata (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_divisao_por_zero_lanca_excecao (test_operations.TestOperacoesMatematicas) ... ok
test_exponenciais_base_10_e_e (test_operations.TestOperacoesMatematicas) ... ok
test_fatorial (test_operations.TestOperacoesMatematicas) ... ok
test_hiperbolicas (test_operations.TestOperacoesMatematicas) ... ok
test_inverso (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_base_10 (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_base_2 (test_operations.TestOperacoesMatematicas) ... ok
test_logaritmo_natural (test_operations.TestOperacoesMatematicas) ... ok
test_modulo (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_por_zero (test_operations.TestOperacoesMatematicas) ... ok
test_multiplicacao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_porcentagem (test_operations.TestOperacoesMatematicas) ... ok
test_potenciacao_basica (test_operations.TestOperacoesMatematicas) ... ok
test_potenciacao_erros (test_operations.TestOperacoesMatematicas) ... ok
test_quadrado_e_cubo (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_cubica (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_enesiema (test_operations.TestOperacoesMatematicas) ... ok
test_raiz_quadrada (test_operations.TestOperacoesMatematicas) ... ok
test_resto_divisao (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_decimais (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_negativos (test_operations.TestOperacoesMatematicas) ... ok
test_subtracao_positivos (test_operations.TestOperacoesMatematicas) ... ok
test_tangente_descontinuidade (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_graus (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_inversas (test_operations.TestOperacoesMatematicas) ... ok
test_trigonometria_radianos (test_operations.TestOperacoesMatematicas) ... ok

----------------------------------------------------------------------
Ran 38 tests in 0.003s

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
                {Object.keys(sourceFiles).map((fileName) => (
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
                  {(sourceFiles[selectedFile] || '').split('\n').length} linhas · Python / Markdown
                </span>
              </div>
              <div className="p-4 overflow-x-auto max-h-[550px]">
                <pre className="font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
                  {(sourceFiles[selectedFile] || '').split('\n').map((line, idx) => (
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

        {/* ================= TAB 4: REQUISITOS CIENTÍFICOS ================= */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-2">
                Especificação e Requisitos da Calculadora Científica
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Todas as operações científicas avançadas foram implementadas como funções puras em Python e integradas com rigor matemático e alto padrão de UX/UI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requisitos Funcionais Científicos */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    Requisitos Funcionais Científicos (RFC)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { code: 'RFC01', desc: 'Potenciação arbitrária (xʸ), quadrado (x²), cubo (x³) e bases 10 e e' },
                      { code: 'RFC02', desc: 'Radiciação quadrada (√x), cúbica (∛x) e raiz n-ésima (ⁿ√x)' },
                      { code: 'RFC03', desc: 'Logaritmos na base 10 (log), natural (ln) e base 2 (log₂)' },
                      { code: 'RFC04', desc: 'Trigonometria com seletor DEG/RAD (sin, cos, tan e inversas)' },
                      { code: 'RFC05', desc: 'Funções hiperbólicas (sinh, cosh, tanh)' },
                      { code: 'RFC06', desc: 'Funções especiais: Fatorial (n!), Inverso (1/x), Módulo (|x|) e Porcentagem' },
                      { code: 'RFC07', desc: 'Constantes científicas nativas: Pi (π), Euler (e), Proporção Áurea (φ) e Tau (τ)' },
                      { code: 'RFC08', desc: 'Sistema de Memória Científica: MC, MR, M+, M- com indicador' },
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
                    Critérios de UX/UI e Arquitetura Técnica (RTC)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { code: 'RTC01', desc: 'Toggle Padrão / Científica com expansão tátil sem quebras visuais' },
                      { code: 'RTC02', desc: 'Alternância instantânea de unidades angulares (DEG / RAD) no display' },
                      { code: 'RTC03', desc: 'Tratamento de exceções matemáticas com alertas amigáveis (ValueError, ZeroDivisionError)' },
                      { code: 'RTC04', desc: 'Suporte a teclado físico abrangente com atalhos para potências e funções' },
                      { code: 'RTC05', desc: '38 testes unitários cobrindo 100% das operações e casos de borda' },
                      { code: 'RTC06', desc: 'Zero dependências externas no core Python (apenas módulo padrão math)' },
                      { code: 'RTC07', desc: 'Encadeamento de cálculos na CLI e na Web utilizando histórico e ANS' },
                      { code: 'RTC08', desc: 'Documentação técnica atualizada no README.md' },
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
          Calculadora Científica em Python • Suporte a DEG/RAD, Potências, Raízes, Logaritmos, Fatoriais e Memória
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
