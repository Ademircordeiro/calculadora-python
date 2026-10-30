"""Módulo contendo operações matemáticas básicas e científicas da calculadora.

Este módulo implementa funções puras para operações aritméticas fundamentais,
funções transcendentais, trigonométricas, exponenciais, logarítmicas, combinatórias
e utilitárias, seguindo rigorosamente as convenções PEP 8 e sem dependências
externas além da biblioteca padrão `math`.
"""

import math
from typing import Union

# Constantes Matemáticas
PI: float = math.pi
E: float = math.e
PHI: float = 1.618033988749895  # Proporção Áurea (Golden Ratio)
TAU: float = math.tau


# ==============================================================================
# 1. Operações Aritméticas Básicas
# ==============================================================================

def adicao(a: float, b: float) -> float:
    """Retorna a soma de dois operandos (a + b).

    Args:
        a (float): Primeiro operando.
        b (float): Segundo operando.

    Returns:
        float: Resultado da adição.
    """
    return float(a) + float(b)


def subtracao(a: float, b: float) -> float:
    """Retorna a diferença entre dois operandos (a - b).

    Args:
        a (float): Minuendo.
        b (float): Subtraendo.

    Returns:
        float: Resultado da subtração.
    """
    return float(a) - float(b)


def multiplicacao(a: float, b: float) -> float:
    """Retorna o produto de dois operandos (a * b).

    Args:
        a (float): Primeiro fator.
        b (float): Segundo fator.

    Returns:
        float: Resultado da multiplicação.
    """
    return float(a) * float(b)


def divisao(a: float, b: float) -> float:
    """Retorna o quociente da divisão de a por b (a / b).

    Args:
        a (float): Dividendo.
        b (float): Divisor (não pode ser zero).

    Returns:
        float: Resultado da divisão.

    Raises:
        ZeroDivisionError: Se o divisor (b) for igual a zero.
    """
    if float(b) == 0.0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return float(a) / float(b)


def resto_divisao(a: float, b: float) -> float:
    """Retorna o resto da divisão euclidiana de a por b (a % b).

    Args:
        a (float): Dividendo.
        b (float): Divisor.

    Returns:
        float: Resto da divisão.

    Raises:
        ZeroDivisionError: Se b for igual a zero.
    """
    if float(b) == 0.0:
        raise ZeroDivisionError("Módulo por zero não é permitido.")
    return float(a) % float(b)


# ==============================================================================
# 2. Potenciação e Raízes
# ==============================================================================

def potenciacao(base: float, expoente: float) -> float:
    """Calcula a potência da base elevada ao expoente (base ** expoente).

    Args:
        base (float): Número base.
        expoente (float): Expoente.

    Returns:
        float: Resultado de base ** expoente.

    Raises:
        ValueError: Se a base for negativa e o expoente não for inteiro.
        ZeroDivisionError: Se a base for zero e o expoente for negativo.
    """
    base_f = float(base)
    exp_f = float(expoente)

    if base_f == 0.0 and exp_f < 0.0:
        raise ZeroDivisionError("Zero elevado a expoente negativo é indefinido (divisão por zero).")

    if base_f < 0.0 and not exp_f.is_integer():
        raise ValueError("Expoente fracionário para base negativa gera número complexo.")

    return math.pow(base_f, exp_f)


def quadrado(a: float) -> float:
    """Retorna o quadrado de um número (a ** 2).

    Args:
        a (float): Número a ser elevado ao quadrado.

    Returns:
        float: Resultado de a * a.
    """
    return float(a) ** 2


def cubo(a: float) -> float:
    """Retorna o cubo de um número (a ** 3).

    Args:
        a (float): Número a ser elevado ao cubo.

    Returns:
        float: Resultado de a * a * a.
    """
    return float(a) ** 3


def raiz_quadrada(radicando: float) -> float:
    """Calcula a raiz quadrada principal de um número não-negativo.

    Args:
        radicando (float): Número do qual será extraída a raiz (>= 0).

    Returns:
        float: Raiz quadrada do radicando.

    Raises:
        ValueError: Se o radicando for menor que zero.
    """
    rad_f = float(radicando)
    if rad_f < 0.0:
        raise ValueError("Raiz quadrada de número negativo não pertence aos números reais.")
    return math.sqrt(rad_f)


def raiz_cubica(radicando: float) -> float:
    """Calcula a raiz cúbica de um número real (positivo, zero ou negativo).

    Args:
        radicando (float): Número real.

    Returns:
        float: Raiz cúbica de radicando.
    """
    rad_f = float(radicando)
    if rad_f < 0.0:
        return -math.pow(-rad_f, 1.0 / 3.0)
    return math.pow(rad_f, 1.0 / 3.0)


def raiz_enesiema(radicando: float, indice: float) -> float:
    """Calcula a raiz de índice n de um número real.

    Args:
        radicando (float): Radicando.
        indice (float): Índice da raiz (n != 0).

    Returns:
        float: Raiz n-ésima do radicando.

    Raises:
        ZeroDivisionError: Se o índice for igual a zero.
        ValueError: Se o radicando for negativo e o índice for par.
    """
    rad_f = float(radicando)
    ind_f = float(indice)

    if ind_f == 0.0:
        raise ZeroDivisionError("Índice de raiz não pode ser zero.")

    if rad_f < 0.0:
        # Se for índice inteiro ímpar, raiz real existe
        if ind_f.is_integer() and int(ind_f) % 2 != 0:
            return -math.pow(-rad_f, 1.0 / ind_f)
        raise ValueError("Raiz com índice par de número negativo não é real.")

    return math.pow(rad_f, 1.0 / ind_f)


def exp_base_10(expoente: float) -> float:
    """Retorna 10 elevado ao expoente (10 ** expoente).

    Args:
        expoente (float): Expoente.

    Returns:
        float: 10 ** expoente.
    """
    return math.pow(10.0, float(expoente))


def exp_base_e(expoente: float) -> float:
    """Retorna a base e (número de Euler) elevada ao expoente (e ** expoente).

    Args:
        expoente (float): Expoente.

    Returns:
        float: e ** expoente.
    """
    return math.exp(float(expoente))


# ==============================================================================
# 3. Logaritmos
# ==============================================================================

def logaritmo_base_10(valor: float) -> float:
    """Calcula o logaritmo na base 10 de um número positivo (log10(x)).

    Args:
        valor (float): Número estritamente positivo (x > 0).

    Returns:
        float: Logaritmo na base 10.

    Raises:
        ValueError: Se o valor for menor ou igual a zero.
    """
    val_f = float(valor)
    if val_f <= 0.0:
        raise ValueError("Logaritmo na base 10 é definido apenas para números estritamente positivos (x > 0).")
    return math.log10(val_f)


def logaritmo_natural(valor: float) -> float:
    """Calcula o logaritmo natural (base e) de um número positivo (ln(x)).

    Args:
        valor (float): Número estritamente positivo (x > 0).

    Returns:
        float: Logaritmo natural.

    Raises:
        ValueError: Se o valor for menor ou igual a zero.
    """
    val_f = float(valor)
    if val_f <= 0.0:
        raise ValueError("Logaritmo natural (ln) é definido apenas para números estritamente positivos (x > 0).")
    return math.log(val_f)


def logaritmo_base_2(valor: float) -> float:
    """Calcula o logaritmo na base 2 de um número positivo (log2(x)).

    Args:
        valor (float): Número estritamente positivo (x > 0).

    Returns:
        float: Logaritmo na base 2.

    Raises:
        ValueError: Se o valor for menor ou igual a zero.
    """
    val_f = float(valor)
    if val_f <= 0.0:
        raise ValueError("Logaritmo na base 2 é definido apenas para números estritamente positivos (x > 0).")
    return math.log2(val_f)


# ==============================================================================
# 4. Funções Trigonométricas e Inversas
# ==============================================================================

def _converter_para_radianos(angulo: float, em_graus: bool) -> float:
    """Converte o ângulo para radianos se o parâmetro em_graus for verdadeiro."""
    return math.radians(angulo) if em_graus else angulo


def _limpar_flutuante(valor: float, casas: int = 12) -> float:
    """Arredonda pequenas imprecisões de ponto flutuante típicas de trigonometria."""
    val_arredondado = round(valor, casas)
    if val_arredondado == 0.0:
        return 0.0
    return val_arredondado


def seno(angulo: float, em_graus: bool = False) -> float:
    """Calcula o seno de um ângulo em radianos ou graus.

    Args:
        angulo (float): Valor do ângulo.
        em_graus (bool): Se True, o ângulo está em graus; se False, em radianos.

    Returns:
        float: Seno do ângulo.
    """
    rad = _converter_para_radianos(float(angulo), em_graus)
    return _limpar_flutuante(math.sin(rad))


def cosseno(angulo: float, em_graus: bool = False) -> float:
    """Calcula o cosseno de um ângulo em radianos ou graus.

    Args:
        angulo (float): Valor do ângulo.
        em_graus (bool): Se True, o ângulo está em graus; se False, em radianos.

    Returns:
        float: Cosseno do ângulo.
    """
    rad = _converter_para_radianos(float(angulo), em_graus)
    return _limpar_flutuante(math.cos(rad))


def tangente(angulo: float, em_graus: bool = False) -> float:
    """Calcula a tangente de um ângulo em radianos ou graus.

    Args:
        angulo (float): Valor do ângulo.
        em_graus (bool): Se True, o ângulo está em graus; se False, em radianos.

    Returns:
        float: Tangente do ângulo.

    Raises:
        ValueError: Se o cosseno for zero (assíntota vertical da tangente).
    """
    rad = _converter_para_radianos(float(angulo), em_graus)
    cos_val = math.cos(rad)
    if abs(cos_val) < 1e-15:
        raise ValueError("Tangente indefinida para este ângulo (cosseno igual a zero).")
    return _limpar_flutuante(math.tan(rad))


def arco_seno(valor: float, em_graus: bool = False) -> float:
    """Calcula o arco seno (asin) no intervalo [-1, 1].

    Args:
        valor (float): Valor entre -1 e 1.
        em_graus (bool): Se True, retorna o ângulo em graus; senão, em radianos.

    Returns:
        float: Arco seno do valor.

    Raises:
        ValueError: Se o valor estiver fora do domínio [-1, 1].
    """
    val_f = float(valor)
    if val_f < -1.0 or val_f > 1.0:
        raise ValueError("Arco seno é definido apenas no intervalo [-1, 1].")
    res_rad = math.asin(val_f)
    return math.degrees(res_rad) if em_graus else res_rad


def arco_cosseno(valor: float, em_graus: bool = False) -> float:
    """Calcula o arco cosseno (acos) no intervalo [-1, 1].

    Args:
        valor (float): Valor entre -1 e 1.
        em_graus (bool): Se True, retorna o ângulo em graus; senão, em radianos.

    Returns:
        float: Arco cosseno do valor.

    Raises:
        ValueError: Se o valor estiver fora do domínio [-1, 1].
    """
    val_f = float(valor)
    if val_f < -1.0 or val_f > 1.0:
        raise ValueError("Arco cosseno é definido apenas no intervalo [-1, 1].")
    res_rad = math.acos(val_f)
    return math.degrees(res_rad) if em_graus else res_rad


def arco_tangente(valor: float, em_graus: bool = False) -> float:
    """Calcula o arco tangente (atan) de qualquer valor real.

    Args:
        valor (float): Qualquer número real.
        em_graus (bool): Se True, retorna o ângulo em graus; senão, em radianos.

    Returns:
        float: Arco tangente do valor.
    """
    res_rad = math.atan(float(valor))
    return math.degrees(res_rad) if em_graus else res_rad


# ==============================================================================
# 5. Funções Hiperbólicas
# ==============================================================================

def seno_hiperbolico(x: float) -> float:
    """Calcula o seno hiperbólico (sinh(x))."""
    return math.sinh(float(x))


def cosseno_hiperbolico(x: float) -> float:
    """Calcula o cosseno hiperbólico (cosh(x))."""
    return math.cosh(float(x))


def tangente_hiperbolico(x: float) -> float:
    """Calcula a tangente hiperbólica (tanh(x))."""
    return math.tanh(float(x))


# ==============================================================================
# 6. Funções Especiais e Utilitárias
# ==============================================================================

def fatorial(n: Union[int, float]) -> int:
    """Calcula o fatorial de um número inteiro não-negativo (n!).

    Args:
        n (int | float): Inteiro não-negativo.

    Returns:
        int: Fatorial de n (n!).

    Raises:
        ValueError: Se n for negativo, não for inteiro ou for excessivamente grande (> 170).
    """
    val_f = float(n)
    if not val_f.is_integer() or val_f < 0:
        raise ValueError("Fatorial é definido apenas para números inteiros não-negativos.")

    n_int = int(val_f)
    if n_int > 170:
        raise ValueError("Número muito grande para cálculo de fatorial (limite: 170!).")

    return math.factorial(n_int)


def inverso(valor: float) -> float:
    """Calcula o inverso multiplicativo de um número (1 / x).

    Args:
        valor (float): Número diferente de zero.

    Returns:
        float: 1 / valor.

    Raises:
        ZeroDivisionError: Se o valor for igual a zero.
    """
    val_f = float(valor)
    if val_f == 0.0:
        raise ZeroDivisionError("Inverso de zero é indefinido (divisão por zero).")
    return 1.0 / val_f


def modulo(valor: float) -> float:
    """Retorna o valor absoluto / módulo de um número (|x|).

    Args:
        valor (float): Número real.

    Returns:
        float: Valor absoluto positivo de valor.
    """
    return abs(float(valor))


def porcentagem(valor: float, base: float = 1.0) -> float:
    """Calcula a porcentagem de um valor em relação a uma base (padrão base=1.0 -> valor / 100).

    Args:
        valor (float): Percentual (ex: 15 para 15%).
        base (float): Base de cálculo multiplicativa (padrão: 1.0).

    Returns:
        float: (valor / 100) * base.
    """
    return (float(valor) / 100.0) * float(base)
