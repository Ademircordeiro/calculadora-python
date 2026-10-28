"""Calculadora CLI em Python.

Ponto de entrada principal da aplicação. Fornece interface de linha de comando
interativa para o usuário realizar cálculos aritméticos básicos de forma contínua,
com validação de dados e tratamento de exceções.
"""

import sys
from operations import adicao, subtracao, multiplicacao, divisao

OPERACOES = {
    "1": ("Adição", "+", adicao),
    "2": ("Subtração", "-", subtracao),
    "3": ("Multiplicação", "*", multiplicacao),
    "4": ("Divisão", "/", divisao),
}


def formatar_numero(valor: float) -> str:
    """Formata um número float para exibição amigável.

    Exibe números inteiros sem casa decimal (ex: 15 em vez de 15.0)
    e números com casas decimais preservando seus dígitos significativos.

    Args:
        valor (float): Número a ser formatado.

    Returns:
        str: Representação em string do número formatado.
    """
    if valor.is_integer():
        return str(int(valor))
    # Para decimais com dízimas, limita a exibição a até 8 casas sem zeros supérfluos
    return f"{valor:.8f}".rstrip("0").rstrip(".")


def ler_numero(mensagem: str) -> float:
    """Solicita e valida a entrada de um número float.

    Continua solicitando até que o usuário digite um valor numérico válido.
    Suporta tanto ponto '.' quanto vírgula ',' como separador decimal.

    Args:
        mensagem (str): Mensagem de prompt exibida ao usuário.

    Returns:
        float: Valor numérico convertido.
    """
    while True:
        try:
            entrada = input(mensagem).strip()
            # Permite uso de vírgula para casas decimais comum em português
            entrada_normalizada = entrada.replace(",", ".")
            return float(entrada_normalizada)
        except ValueError:
            print(
                "Entrada inválida! Por favor, digite um número válido "
                "(ex: 10, -5, 3.14)."
            )


def exibir_menu() -> None:
    """Exibe o menu principal de opções da calculadora."""
    print("\n" + "=" * 42)
    print("        CALCULADORA EM PYTHON CLI        ")
    print("=" * 42)
    print("  1. Adição (+)")
    print("  2. Subtração (-)")
    print("  3. Multiplicação (*)")
    print("  4. Divisão (/)")
    print("  0. Sair")
    print("=" * 42)


def main() -> None:
    """Função principal que gerencia o fluxo de execução da calculadora CLI."""
    print("Bem-vindo(a) à Calculadora em Python CLI!")

    while True:
        try:
            exibir_menu()
            opcao = input("Selecione uma opção (0 a 4): ").strip()

            if opcao == "0":
                print("\nAplicação encerrada. Até logo!")
                sys.exit(0)

            if opcao not in OPERACOES:
                print(
                    "\nOpção inválida! Escolha uma opção válida entre 0 e 4."
                )
                continue

            nome_op, simbolo, funcao_op = OPERACOES[opcao]
            print(f"\n--- Operação selecionada: {nome_op} ({simbolo}) ---")

            num1 = ler_numero("Digite o primeiro número: ")

            while True:
                num2 = ler_numero("Digite o segundo número: ")
                if opcao == "4" and num2 == 0.0:
                    print(
                        "Erro: Divisão por zero não é permitida. "
                        "Por favor, digite um divisor diferente de zero."
                    )
                    continue
                break

            try:
                resultado = funcao_op(num1, num2)
                n1_fmt = formatar_numero(num1)
                n2_fmt = formatar_numero(num2)
                res_fmt = formatar_numero(resultado)

                print("-" * 42)
                print(f"Resultado: {n1_fmt} {simbolo} {n2_fmt} = {res_fmt}")
                print("-" * 42)
            except ZeroDivisionError as err:
                print(f"\nErro de cálculo: {err}")

        except (KeyboardInterrupt, EOFError):
            print("\n\nOperação cancelada pelo usuário. Até logo!")
            sys.exit(0)


if __name__ == "__main__":
    main()
