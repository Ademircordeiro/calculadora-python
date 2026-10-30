"""Calculadora Científica CLI em Python.

Ponto de entrada principal da aplicação em linha de comando. Fornece interface interativa
amigável com suporte a operações aritméticas, funções transcendentais,
trigonometria (DEG e RAD), potências, raízes, fatoriais e constantes,
com validação rigorosa de dados e encadeamento contínuo de cálculos (UX avançada).
"""

import sys
from typing import Optional, Tuple
from operations import (
    PI,
    E,
    PHI,
    TAU,
    adicao,
    subtracao,
    multiplicacao,
    divisao,
    resto_divisao,
    potenciacao,
    quadrado,
    cubo,
    raiz_quadrada,
    raiz_cubica,
    raiz_enesiema,
    exp_base_10,
    exp_base_e,
    logaritmo_base_10,
    logaritmo_natural,
    logaritmo_base_2,
    seno,
    cosseno,
    tangente,
    arco_seno,
    arco_cosseno,
    arco_tangente,
    seno_hiperbolico,
    cosseno_hiperbolico,
    tangente_hiperbolico,
    fatorial,
    inverso,
    modulo,
    porcentagem,
)


def formatar_numero(valor: float) -> str:
    """Formata um número float para exibição amigável.

    Exibe números inteiros sem zeros decimais (ex: 15 em vez de 15.0)
    e decimais com até 8 casas significativas sem zeros supérfluos.

    Args:
        valor (float): Número a ser formatado.

    Returns:
        str: Representação amigável em string.
    """
    if valor.is_integer():
        return str(int(valor))
    return f"{valor:.8f}".rstrip("0").rstrip(".")


def ler_numero(mensagem: str, permitir_constantes: bool = True) -> float:
    """Solicita e valida a entrada de um número float ou constante matemática.

    Suporta entrada de números com ponto ou vírgula, além de nomes de constantes
    como 'pi', 'e', 'phi' e 'tau'.

    Args:
        mensagem (str): Prompt exibido ao usuário.
        permitir_constantes (bool): Permite atalhos para constantes.

    Returns:
        float: Valor numérico validado.
    """
    while True:
        try:
            entrada = input(mensagem).strip().lower()
            if permitir_constantes:
                if entrada in ("pi", "π"):
                    return PI
                if entrada == "e":
                    return E
                if entrada in ("phi", "φ"):
                    return PHI
                if entrada in ("tau", "τ"):
                    return TAU

            entrada_normalizada = entrada.replace(",", ".")
            return float(entrada_normalizada)
        except ValueError:
            print(
                "Entrada inválida! Digite um número válido "
                "(ex: 10, -5, 3.14) ou constantes (pi, e, phi, tau)."
            )


def exibir_menu_principal() -> None:
    """Exibe o menu categorizado da Calculadora Científica."""
    print("\n" + "=" * 54)
    print("        CALCULADORA CIENTÍFICA EM PYTHON CLI        ")
    print("=" * 54)
    print("  --- Aritmética Básica ---")
    print("   1. Adição (+)           2. Subtração (-)")
    print("   3. Multiplicação (*)     4. Divisão (/)")
    print("   5. Resto da Divisão (%)  6. Módulo (|x|)")
    print("  --- Potências & Raízes ---")
    print("   7. Potência (x^y)        8. Quadrado (x²)")
    print("   9. Cubo (x³)            10. Raiz Quadrada (√x)")
    print("  11. Raiz Cúbica (∛x)      12. Raiz N-ésima (ⁿ√x)")
    print("  13. Base 10 (10^x)       14. Base Euler (e^x)")
    print("  --- Logaritmos ---")
    print("  15. Logaritmo Base 10    16. Logaritmo Natural (ln)")
    print("  17. Logaritmo Base 2")
    print("  --- Trigonometria (Graus ou Radianos) ---")
    print("  18. Seno (sin)           19. Cosseno (cos)")
    print("  20. Tangente (tan)       21. Arco Seno (asin)")
    print("  22. Arco Cosseno (acos)  23. Arco Tangente (atan)")
    print("  --- Funções Especiais ---")
    print("  24. Fatorial (n!)        25. Inverso (1/x)")
    print("  26. Porcentagem (%)      27. Constantes (π, e, φ)")
    print("   0. Sair")
    print("=" * 54)


def executar_calculo(opcao: str, ultimo_resultado: Optional[float] = None) -> Optional[float]:
    """Executa a operação matemática correspondente à opção selecionada.

    Args:
        opcao (str): Opção numérica digitada pelo usuário.
        ultimo_resultado (Optional[float]): Resultado anterior para encadeamento.

    Returns:
        Optional[float]: Novo resultado calculado ou None se opção inválida.
    """
    # Perguntar se o usuário quer usar o último resultado se disponível
    def obter_primeiro_operando(prompt: str) -> float:
        if ultimo_resultado is not None:
            ans = input(
                f"{prompt} [Pressione Enter para usar ANS={formatar_numero(ultimo_resultado)}]: "
            ).strip()
            if ans == "":
                return ultimo_resultado
            return ler_numero(f"Confirmar entrada: {ans}\n", permitir_constantes=True) if False else ler_numero_de_texto(ans)
        return ler_numero(prompt)

    def ler_numero_de_texto(txt: str) -> float:
        txt_norm = txt.lower().replace(",", ".")
        if txt_norm in ("pi", "π"):
            return PI
        if txt_norm == "e":
            return E
        if txt_norm in ("phi", "φ"):
            return PHI
        return float(txt_norm)

    try:
        # 1 a 5: Operações binárias básicas
        if opcao in ("1", "2", "3", "4", "5", "7", "12", "26"):
            a = obter_primeiro_operando("Digite o primeiro número (A): ")
            b = ler_numero("Digite o segundo número (B): ")

            if opcao == "1":
                res = adicao(a, b)
                simb = "+"
            elif opcao == "2":
                res = subtracao(a, b)
                simb = "-"
            elif opcao == "3":
                res = multiplicacao(a, b)
                simb = "*"
            elif opcao == "4":
                res = divisao(a, b)
                simb = "/"
            elif opcao == "5":
                res = resto_divisao(a, b)
                simb = "%"
            elif opcao == "7":
                res = potenciacao(a, b)
                simb = "^"
            elif opcao == "12":
                res = raiz_enesiema(a, b)
                simb = "√[índice B]"
            else:  # 26: Porcentagem A% de B
                res = porcentagem(a, b)
                simb = "% de"

            print("\n" + "-" * 54)
            print(f"Resultado: {formatar_numero(a)} {simb} {formatar_numero(b)} = {formatar_numero(res)}")
            print("-" * 54)
            return res

        # 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 24, 25: Operações unárias
        if opcao in ("6", "8", "9", "10", "11", "13", "14", "15", "16", "17", "24", "25"):
            x = obter_primeiro_operando("Digite o número (x): ")

            if opcao == "6":
                res = modulo(x)
                desc = f"|{formatar_numero(x)}|"
            elif opcao == "8":
                res = quadrado(x)
                desc = f"({formatar_numero(x)})²"
            elif opcao == "9":
                res = cubo(x)
                desc = f"({formatar_numero(x)})³"
            elif opcao == "10":
                res = raiz_quadrada(x)
                desc = f"√({formatar_numero(x)})"
            elif opcao == "11":
                res = raiz_cubica(x)
                desc = f"∛({formatar_numero(x)})"
            elif opcao == "13":
                res = exp_base_10(x)
                desc = f"10^({formatar_numero(x)})"
            elif opcao == "14":
                res = exp_base_e(x)
                desc = f"e^({formatar_numero(x)})"
            elif opcao == "15":
                res = logaritmo_base_10(x)
                desc = f"log10({formatar_numero(x)})"
            elif opcao == "16":
                res = logaritmo_natural(x)
                desc = f"ln({formatar_numero(x)})"
            elif opcao == "17":
                res = logaritmo_base_2(x)
                desc = f"log2({formatar_numero(x)})"
            elif opcao == "24":
                res = fatorial(x)
                desc = f"{formatar_numero(x)}!"
            else:  # 25
                res = inverso(x)
                desc = f"1 / ({formatar_numero(x)})"

            print("\n" + "-" * 54)
            print(f"Resultado: {desc} = {formatar_numero(res)}")
            print("-" * 54)
            return res

        # 18 a 23: Trigonometria com escolha de unidade angular
        if opcao in ("18", "19", "20", "21", "22", "23"):
            unidade = input("Unidade angular: [1] Graus (DEG) | [2] Radianos (RAD) [padrão: 1]: ").strip()
            em_graus = (unidade != "2")
            lbl_u = "°" if em_graus else " rad"

            x = obter_primeiro_operando(f"Digite o valor {'do ângulo' if opcao in ('18','19','20') else 'numérico'}: ")

            if opcao == "18":
                res = seno(x, em_graus=em_graus)
                desc = f"sin({formatar_numero(x)}{lbl_u})"
            elif opcao == "19":
                res = cosseno(x, em_graus=em_graus)
                desc = f"cos({formatar_numero(x)}{lbl_u})"
            elif opcao == "20":
                res = tangente(x, em_graus=em_graus)
                desc = f"tan({formatar_numero(x)}{lbl_u})"
            elif opcao == "21":
                res = arco_seno(x, em_graus=em_graus)
                desc = f"asin({formatar_numero(x)})"
            elif opcao == "22":
                res = arco_cosseno(x, em_graus=em_graus)
                desc = f"acos({formatar_numero(x)})"
            else:  # 23
                res = arco_tangente(x, em_graus=em_graus)
                desc = f"atan({formatar_numero(x)})"

            print("\n" + "-" * 54)
            print(f"Resultado: {desc} = {formatar_numero(res)}{lbl_u if opcao in ('21','22','23') else ''}")
            print("-" * 54)
            return res

        # 27: Constantes Matemáticas
        if opcao == "27":
            print("\n" + "-" * 54)
            print("Constantes Matemáticas:")
            print(f"  • π (Pi):               {PI:.12f}")
            print(f"  • e (Número de Euler):  {E:.12f}")
            print(f"  • φ (Proporção Áurea):  {PHI:.12f}")
            print(f"  • τ (Tau = 2π):         {TAU:.12f}")
            print("-" * 54)
            return None

    except (ZeroDivisionError, ValueError, OverflowError) as err:
        print(f"\n[!] Erro matemático: {err}")
        return None

    return None


def main() -> None:
    """Fluxo principal da Calculadora Científica CLI."""
    print("Bem-vindo(a) à Calculadora Científica em Python!")
    ultimo_resultado: Optional[float] = None

    while True:
        try:
            exibir_menu_principal()
            if ultimo_resultado is not None:
                print(f"Último Resultado (ANS): {formatar_numero(ultimo_resultado)}")

            opcao = input("\nSelecione uma opção (0 a 27): ").strip()

            if opcao == "0":
                print("\nAplicação encerrada. Até logo!")
                sys.exit(0)

            res = executar_calculo(opcao, ultimo_resultado)
            if res is not None:
                ultimo_resultado = res

        except (KeyboardInterrupt, EOFError):
            print("\n\nOperação cancelada pelo usuário. Até logo!")
            sys.exit(0)


if __name__ == "__main__":
    main()
