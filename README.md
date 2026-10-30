# Calculadora Científica em Python & Interface Web Avançada

Calculadora Científica completa desenvolvida em **Python 3.10+** e acompanhada de uma **Interface Web Moderna (React + Tailwind CSS + Lucide)**, proporcionando alta fidelidade matemática, excelente experiência de usuário (UX/UI) e cobertura rigorosa de testes unitários com o framework nativo `unittest`.

O projeto foi construído seguindo as convenções **PEP 8**, boas práticas de desenvolvimento modular, validações defensivas contra falhas de domínio numérico e zero dependências externas no núcleo de cálculo em Python (apenas a biblioteca padrão `math`).

---

## 1. Destaques e Funcionalidades

### 1.1. Operações Aritméticas e Especiais
- **Quatro Operações Básicas**: Adição (`+`), Subtração (`-`), Multiplicação (`*`) e Divisão (`/`).
- **Resto da Divisão (Módulo)**: Operador `%` para divisões inteiras e reais.
- **Valor Absoluto (Módulo)**: `|x|` para magnitudes reais.
- **Inverso Multiplicativo**: `1/x` com proteção contra divisão por zero.
- **Porcentagem**: `%` com suporte a cálculo relativo e fracionário.
- **Fatorial**: `n!` para inteiros não-negativos com validação de limite contra estouro de memória.

### 1.2. Potenciação e Radiciação
- **Potenciação Arbitrária**: $x^y$ com suporte a bases e expoentes reais (positivos, nulos e negativos).
- **Potências Rápidas**: $x^2$ (quadrado), $x^3$ (cubo).
- **Bases Especiais**: $10^x$ e $e^x$ ($\exp$).
- **Radiciação**:
  - $\sqrt{x}$ (raiz quadrada) com bloqueio preventivo para $x < 0$ no domínio dos reais.
  - $\sqrt[3]{x}$ (raiz cúbica) com suporte total a números negativos (ex: $\sqrt[3]{-8} = -2$).
  - $\sqrt[y]{x}$ (raiz $n$-ésima) com validação de índice e paridade.

### 1.3. Logaritmos
- **Logaritmo na Base 10**: $\log_{10}(x)$ com validação de $x > 0$.
- **Logaritmo Natural**: $\ln(x)$ (base $e$) com validação de $x > 0$.
- **Logaritmo na Base 2**: $\log_2(x)$.

### 1.4. Trigonometria e Funções Hiperbólicas
- **Alternância Angular**: Seletor instantâneo entre **Graus (DEG)** e **Radianos (RAD)**.
- **Funções Diretas**: $\sin(\theta)$, $\cos(\theta)$, $\tan(\theta)$ (com tratamento de assíntotas verticais em $\theta = 90^\circ, 270^\circ$).
- **Funções Inversas**: $\arcsin(x)$, $\arccos(x)$ (com validação de domínio em $[-1, 1]$), $\arctan(x)$.
- **Funções Hiperbólicas**: $\sinh(x)$, $\cosh(x)$, $\tanh(x)$.

### 1.5. Constantes Matemáticas Integradas
- **$\pi$ (Pi)**: $3.141592653589793$
- **$e$ (Número de Euler)**: $2.718281828459045$
- **$\phi$ (Proporção Áurea / Golden Ratio)**: $1.618033988749895$
- **$\tau$ (Tau = $2\pi$)**: $6.283185307179586$

### 1.6. Recursos de UX/UI
- **Alternância de Modos**: Toggle fluido entre **Modo Científico** e **Modo Padrão**.
- **Sistema de Memória Científica**: Teclas $MC$ (Memory Clear), $MR$ (Memory Recall), $M+$ (Memory Add), $M-$ (Memory Subtract), com badge visual no display quando um valor estiver salvo.
- **Teclado Tátil e Físico**: Suporte a atalhos de teclado (`0-9`, `+`, `-`, `*`, `/`, `^`, `%`, `Enter`, `Esc`, `Backspace`).
- **Encadeamento de Cálculos (ANS)**: Permite reaproveitar o último resultado calculado para a próxima operação sem precisar redigitar.
- **Cenários de Testes Rápidos com 1 Clique**: Botões de teste imediato para os principais critérios de aceitação e operações científicas.
- **Histórico Interativo**: Visualização com data/hora e possibilidade de reinserir o resultado diretamente no visor.

---

## 2. Estrutura do Repositório

```text
.
├── operations.py       # Funções matemáticas puras e constantes científicas
├── main.py             # Interface de linha de comando (CLI) interativa
├── test_operations.py  # Suíte formal de 38 testes automatizados com unittest
├── server.ts           # Servidor Express com API Python e middleware Vite
├── src/
│   ├── App.tsx         # Interface de usuário moderna da Calculadora Científica
│   ├── main.tsx        # Ponto de entrada do React
│   └── index.css       # Estilos globais Tailwind
├── package.json        # Dependências do frontend e scripts
└── README.md           # Documentação completa do projeto
```

---

## 3. Instruções de Execução

### 3.1. Executar a Calculadora Científica CLI (Python)

Na raiz do projeto, execute:

```bash
python3 main.py
```

*(ou `python main.py` no Windows)*

#### Exemplo de Interação na CLI:

```text
======================================================
        CALCULADORA CIENTÍFICA EM PYTHON CLI        
======================================================
  --- Aritmética Básica ---
   1. Adição (+)           2. Subtração (-)
   3. Multiplicação (*)     4. Divisão (/)
   5. Resto da Divisão (%)  6. Módulo (|x|)
  --- Potências & Raízes ---
   7. Potência (x^y)        8. Quadrado (x²)
   9. Cubo (x³)            10. Raiz Quadrada (√x)
  11. Raiz Cúbica (∛x)      12. Raiz N-ésima (ⁿ√x)
  13. Base 10 (10^x)       14. Base Euler (e^x)
  --- Logaritmos ---
  15. Logaritmo Base 10    16. Logaritmo Natural (ln)
  17. Logaritmo Base 2
  --- Trigonometria (Graus ou Radianos) ---
  18. Seno (sin)           19. Cosseno (cos)
  20. Tangente (tan)       21. Arco Seno (asin)
  22. Arco Cosseno (acos)  23. Arco Tangente (atan)
  --- Funções Especiais ---
  24. Fatorial (n!)        25. Inverso (1/x)
  26. Porcentagem (%)      27. Constantes (π, e, φ)
   0. Sair
======================================================

Selecione uma opção (0 a 27): 18
Unidade angular: [1] Graus (DEG) | [2] Radianos (RAD) [padrão: 1]: 1
Digite o valor do ângulo: 30

------------------------------------------------------
Resultado: sin(30°) = 0.5
------------------------------------------------------
Último Resultado (ANS): 0.5
```

### 3.2. Executar os Testes Automatizados (unittest)

Para rodar todos os **38 testes unitários** formalmente:

```bash
python3 -m unittest -v
```

Saída esperada:
```text
Ran 38 tests in 0.003s

OK
```

---

## 4. Cobertura de Testes Unitários

A suíte em `test_operations.py` cobre 100% dos cenários críticos:

| Categoria | Testes Inclusos | Casos de Borda Testados |
| :--- | :--- | :--- |
| **Aritmética Básica** | `test_adicao_*`, `test_subtracao_*`, `test_multiplicacao_*`, `test_divisao_*`, `test_resto_divisao` | Negativos, decimais, zeros, divisão por zero (`ZeroDivisionError`) |
| **Potências & Raízes** | `test_potenciacao_*`, `test_quadrado_e_cubo`, `test_raiz_quadrada`, `test_raiz_cubica`, `test_raiz_enesiema`, `test_exponenciais_*` | Raiz de negativos, base zero com expoente negativo, potências fracionárias |
| **Logaritmos** | `test_logaritmo_base_10`, `test_logaritmo_natural`, `test_logaritmo_base_2` | Bloqueio de valores $\le 0$ com `ValueError` |
| **Trigonometria** | `test_trigonometria_radianos`, `test_trigonometria_graus`, `test_tangente_descontinuidade`, `test_trigonometria_inversas`, `test_hiperbolicas` | Graus e Radianos, assíntota de $\tan(90^\circ)$, domínio de $\arcsin$ fora de $[-1, 1]$ |
| **Funções Especiais & Constantes** | `test_fatorial`, `test_inverso`, `test_modulo`, `test_porcentagem`, `test_constantes_matematicas` | $0! = 1$, números negativos/decimais no fatorial, $1/0$, precisão de $\pi, e, \phi, \tau$ |

---

## 5. Requisitos e Critérios Atendidos

### Requisitos Funcionais Científicos (RFC)
- **RFC01**: Potenciação arbitrária ($x^y$), potências dedicadas ($x^2, x^3$) e exponenciais ($10^x, e^x$).
- **RFC02**: Radiciação quadrada ($\sqrt{x}$), cúbica ($\sqrt[3]{x}$) e raiz $n$-ésima ($\sqrt[y]{x}$).
- **RFC03**: Logaritmos na base 10 ($\log_{10}$), natural ($\ln$) e base 2 ($\log_2$).
- **RFC04**: Funções trigonométricas diretas e inversas com alternador DEG / RAD.
- **RFC05**: Funções hiperbólicas ($\sinh, \cosh, \tanh$).
- **RFC06**: Funções combinatórias e especiais: fatorial ($n!$), inverso ($1/x$), módulo ($|x|$) e porcentagem ($\%$).
- **RFC07**: Constantes científicas integradas ($\pi, e, \phi, \tau$).
- **RFC08**: Sistema de memória científica com operações $MC, MR, M+, M-$.

### Requisitos Técnicos e UX/UI (RTC)
- **RTC01**: Zero dependências de terceiros no núcleo matemático Python (apenas módulo nativo `math`).
- **RTC02**: Compatibilidade integral com terminal CLI interativo e aplicação web.
- **RTC03**: Tratamento defensivo de exceções matemáticas (`ZeroDivisionError`, `ValueError`, `OverflowError`).
- **RTC04**: Design responsivo com paleta Slate e acentos Indigo/Emerald, com suporte tátil e teclado físico.
