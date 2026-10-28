"""Módulo contendo as operações matemáticas básicas da calculadora.

Este módulo implementa funções puras para adição, subtração, multiplicação
e divisão, seguindo estritamente as convenções PEP 8 e sem dependências externas.
"""


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
        a (float): Operando inicial (minuendo).
        b (float): Operando a subtrair (subtraendo).

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
