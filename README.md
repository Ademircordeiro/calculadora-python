# Calculadora em Python CLI

Calculadora interativa via linha de comando (CLI) desenvolvida em Python para realizar as quatro operações matemáticas básicas (Adição, Subtração, Multiplicação e Divisão). O projeto foi construído seguindo as convenções **PEP 8**, boas práticas de desenvolvimento modular, validações defensivas contra falhas de entrada e cobertura integral de testes unitários com o framework nativo `unittest`.

---

## 1. Objetivo

Fornecer uma ferramenta de cálculo ágil, robusta e modular em linha de comando, capaz de lidar com números inteiros, decimais e negativos, prevenindo erros como divisão por zero e entradas não numéricas sem interromper a execução do programa.

---

## 2. Estrutura do Projeto

```text
.
├── operations.py       # Funções matemáticas puras e isoladas
├── main.py             # Interface de linha de comando (CLI) e loop de interação
├── test_operations.py  # Testes unitários automatizados com unittest
└── README.md           # Documentação completa de execução e especificações
```

### Descrição dos Arquivos

- **`operations.py`**:
  - Implementa as funções `adicao(a, b)`, `subtracao(a, b)`, `multiplicacao(a, b)` e `divisao(a, b)`.
  - Converte e opera sobre tipos `float` para precisão com inteiros e números decimais.
  - Não faz uso de bibliotecas de terceiros ou da função `eval()`.
  - Dispara `ZeroDivisionError` quando o divisor for igual a zero.
- **`main.py`**:
  - Apresenta o menu textual interativo com opções de `1` a `4` para operações e `0` para encerramento.
  - Realiza validação contínua de entradas numéricas, aceitando tanto `.` quanto `,` como separador decimal.
  - Trata exceções amigavelmente (`ValueError`, `ZeroDivisionError`, `KeyboardInterrupt`, `EOFError`).
  - Permite encadeamento consecutivo de cálculos até que o usuário opte por sair.
- **`test_operations.py`**:
  - Contém a suíte `TestOperacoesMatematicas` com 17 testes automatizados cobrindo números positivos, negativos, nulos, decimais, ordens de precedência e captura da exceção de divisão por zero.

---

## 3. Requisitos e Compatibilidade

- **Linguagem**: Python 3.10 ou superior (testado em Python 3.10+).
- **Dependências externas**: Nenhuma. Utiliza apenas bibliotecas padrão (`sys`, `unittest`).
- **Sistemas Operacionais**: Compatível com Linux, macOS e Microsoft Windows.

---

## 4. Instruções de Execução

### 4.1. Executar a Calculadora CLI

No terminal, navegue até a raiz do diretório e execute:

```bash
python main.py
```
*(ou `python3 main.py` em sistemas Linux/macOS)*

#### Exemplo de Interação:

```text
Bem-vindo(a) à Calculadora em Python CLI!

==========================================
        CALCULADORA EM PYTHON CLI        
==========================================
  1. Adição (+)
  2. Subtração (-)
  3. Multiplicação (*)
  4. Divisão (/)
  0. Sair
==========================================
Selecione uma opção (0 a 4): 1

--- Operação selecionada: Adição (+) ---
Digite o primeiro número: 10
Digite o segundo número: 5
------------------------------------------
Resultado: 10 + 5 = 15
------------------------------------------
```

### 4.2. Executar os Testes Automatizados

Para executar todos os testes unitários utilizando o runner nativo do `unittest`:

```bash
python -m unittest
```

Para uma saída detalhada com a listagem de cada caso de teste:

```bash
python -m unittest -v
```

Exemplo de saída esperada dos testes:

```text
test_adicao_com_zero (test_operations.TestOperacoesMatematicas) ... ok
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

OK
```

---

## 5. Tabela de Conformidade com Requisitos

| Requisito | Descrição | Status | Onde está implementado |
|---|---|:---:|---|
| **RF01** | Receber dois números | Concluído | `main.py` (`ler_numero`) |
| **RF02** | Selecionar adição, subtração, multiplicação ou divisão | Concluído | `main.py` (`exibir_menu` & `OPERACOES`) |
| **RF03** | Executar a operação e exibir o resultado | Concluído | `operations.py` e `main.py` |
| **RF04** | Validar entradas numéricas inválidas | Concluído | `main.py` (`ler_numero` com repetição) |
| **RF05** | Impedir divisão por zero com mensagem clara | Concluído | `operations.py` (`ZeroDivisionError`) e `main.py` |
| **RF06** | Permitir cálculos consecutivos | Concluído | `main.py` (loop contínuo) |
| **RF07** | Permitir encerrar a aplicação pelo menu | Concluído | Opção `0` no menu do `main.py` |
| **RT01** | Utilizar Python 3.10+ | Concluído | Tipagem estática e sintaxe moderna |
| **RT02** | Interface de linha de comando (CLI) | Concluído | Entrada e saída via terminal com menus textuais |
| **RT03** | Bibliotecas nativas sem dependências externas | Concluído | Apenas `sys` e `unittest` |
| **RT04** | Operação em função independente | Concluído | `operations.py` |
| **RT05** | Utilizar `float` para inteiros e decimais | Concluído | Assinaturas com tipos `float` em `operations.py` |
| **RT06** | Tratar exceções e entradas inválidas | Concluído | `try/except` para `ValueError` e `ZeroDivisionError` |
| **RT07** | Seguir convenções PEP 8 | Concluído | Nomenclatura, docstrings e espaçamento padronizados |
| **RT08** | Não utilizar `eval()` | Concluído | Operadores matemáticos explícitos (+, -, *, /) |
| **RT09** | Testes automatizados com `unittest` | Concluído | `test_operations.py` |
| **RT10** | Documentação no `README.md` | Concluído | Este documento |

---

## 6. Critérios de Aceitação Validados

1. **Adição**: `10 + 5 = 15`
2. **Subtração**: `10 - 5 = 5`
3. **Multiplicação**: `10 * 5 = 50`
4. **Divisão**: `10 / 5 = 2`
5. **Decimais e Negativos**: Operações como `-4.5 + 6.5 = 2`, `2.5 * 4 = 10`, `7 / 2 = 3.5` e `-10 - 5 = -15` suportadas e validadas.
6. **Divisão por zero**: Bloqueada preventivamente na CLI e com lançamento de erro protegido na biblioteca de operações.
7. **Resiliência a falhas**: Letras, caracteres especiais e formatos inválidos não quebram o programa, solicitando nova tentativa imediatamente.
