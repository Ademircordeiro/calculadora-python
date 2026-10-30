"""Testes automatizados para as operações matemáticas básicas e científicas.

Utiliza a biblioteca padrão unittest para verificar a corretude de todas as funções
aritméticas, transcendentais, trigonométricas, especiais e tratamento de exceções.
"""

import math
import unittest
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


class TestOperacoesMatematicas(unittest.TestCase):
    """Conjunto de testes unitários para o módulo operations."""

    # ==========================================================================
    # 1. Testes de Operações Aritméticas Básicas
    # ==========================================================================

    def test_adicao_positivos(self):
        """Testa a adição com números positivos."""
        self.assertEqual(adicao(10, 5), 15.0)
        self.assertEqual(adicao(1, 1), 2.0)

    def test_adicao_negativos(self):
        """Testa a adição com números negativos."""
        self.assertEqual(adicao(-4, -6), -10.0)
        self.assertEqual(adicao(-5, 10), 5.0)

    def test_adicao_com_zero(self):
        """Testa a adição envolvendo zero."""
        self.assertEqual(adicao(0, 0), 0.0)
        self.assertEqual(adicao(15, 0), 15.0)
        self.assertEqual(adicao(0, -8), -8.0)

    def test_adicao_decimais(self):
        """Testa a adição com números de ponto flutuante (decimais)."""
        self.assertAlmostEqual(adicao(2.5, 3.7), 6.2)
        self.assertAlmostEqual(adicao(0.1, 0.2), 0.3, places=7)

    def test_subtracao_positivos(self):
        """Testa a subtração com números positivos."""
        self.assertEqual(subtracao(10, 5), 5.0)
        self.assertEqual(subtracao(5, 10), -5.0)

    def test_subtracao_negativos(self):
        """Testa a subtração com números negativos."""
        self.assertEqual(subtracao(-5, -5), 0.0)
        self.assertEqual(subtracao(-10, 5), -15.0)
        self.assertEqual(subtracao(10, -5), 15.0)

    def test_subtracao_com_zero(self):
        """Testa a subtração envolvendo zero."""
        self.assertEqual(subtracao(0, 0), 0.0)
        self.assertEqual(subtracao(7, 0), 7.0)
        self.assertEqual(subtracao(0, 7), -7.0)

    def test_subtracao_decimais(self):
        """Testa a subtração com números decimais."""
        self.assertAlmostEqual(subtracao(5.5, 2.2), 3.3)
        self.assertAlmostEqual(subtracao(10.75, 0.25), 10.5)

    def test_multiplicacao_positivos(self):
        """Testa a multiplicação com números positivos."""
        self.assertEqual(multiplicacao(10, 5), 50.0)
        self.assertEqual(multiplicacao(3, 7), 21.0)

    def test_multiplicacao_por_zero(self):
        """Testa a multiplicação por zero."""
        self.assertEqual(multiplicacao(10, 0), 0.0)
        self.assertEqual(multiplicacao(0, 10), 0.0)
        self.assertEqual(multiplicacao(0, 0), 0.0)

    def test_multiplicacao_negativos(self):
        """Testa a multiplicação com números negativos."""
        self.assertEqual(multiplicacao(-3, 4), -12.0)
        self.assertEqual(multiplicacao(3, -4), -12.0)
        self.assertEqual(multiplicacao(-2, -5), 10.0)

    def test_multiplicacao_decimais(self):
        """Testa a multiplicação com números decimais."""
        self.assertAlmostEqual(multiplicacao(2.5, 4), 10.0)
        self.assertAlmostEqual(multiplicacao(1.5, 1.5), 2.25)

    def test_divisao_exata(self):
        """Testa a divisão com quociente exato."""
        self.assertEqual(divisao(10, 5), 2.0)
        self.assertEqual(divisao(20, 4), 5.0)

    def test_divisao_decimal(self):
        """Testa a divisão gerando quociente decimal."""
        self.assertAlmostEqual(divisao(7, 2), 3.5)
        self.assertAlmostEqual(divisao(1, 3), 0.33333333, places=7)

    def test_divisao_negativos(self):
        """Testa a divisão envolvendo números negativos."""
        self.assertEqual(divisao(-10, 2), -5.0)
        self.assertEqual(divisao(10, -2), -5.0)
        self.assertEqual(divisao(-10, -2), 5.0)

    def test_divisao_dividendo_zero(self):
        """Testa zero dividido por qualquer número diferente de zero."""
        self.assertEqual(divisao(0, 5), 0.0)
        self.assertEqual(divisao(0, -3), 0.0)

    def test_divisao_por_zero_lanca_excecao(self):
        """Testa se divisão por zero lança ZeroDivisionError."""
        with self.assertRaises(ZeroDivisionError):
            divisao(10, 0)
        with self.assertRaises(ZeroDivisionError):
            divisao(10, 0.0)

    def test_resto_divisao(self):
        """Testa a operação de resto da divisão (módulo)."""
        self.assertEqual(resto_divisao(10, 3), 1.0)
        self.assertEqual(resto_divisao(15, 5), 0.0)
        with self.assertRaises(ZeroDivisionError):
            resto_divisao(10, 0)

    # ==========================================================================
    # 2. Testes de Potenciação e Raízes
    # ==========================================================================

    def test_potenciacao_basica(self):
        """Testa potenciação com expoentes inteiros e fracionários."""
        self.assertEqual(potenciacao(2, 3), 8.0)
        self.assertEqual(potenciacao(5, 0), 1.0)
        self.assertEqual(potenciacao(2, -1), 0.5)
        self.assertAlmostEqual(potenciacao(4, 0.5), 2.0)

    def test_potenciacao_erros(self):
        """Testa erros de potenciação para base zero e base negativa com expoente fracionário."""
        with self.assertRaises(ZeroDivisionError):
            potenciacao(0, -2)
        with self.assertRaises(ValueError):
            potenciacao(-4, 0.5)

    def test_quadrado_e_cubo(self):
        """Testa funções dedicadas de quadrado e cubo."""
        self.assertEqual(quadrado(4), 16.0)
        self.assertEqual(quadrado(-3), 9.0)
        self.assertEqual(cubo(3), 27.0)
        self.assertEqual(cubo(-2), -8.0)

    def test_raiz_quadrada(self):
        """Testa raiz quadrada exata, decimal e exceção para negativos."""
        self.assertEqual(raiz_quadrada(0), 0.0)
        self.assertEqual(raiz_quadrada(144), 12.0)
        self.assertAlmostEqual(raiz_quadrada(2), 1.41421356, places=7)
        with self.assertRaises(ValueError):
            raiz_quadrada(-9)

    def test_raiz_cubica(self):
        """Testa raiz cúbica de positivos e negativos."""
        self.assertEqual(raiz_cubica(0), 0.0)
        self.assertAlmostEqual(raiz_cubica(27), 3.0)
        self.assertAlmostEqual(raiz_cubica(-8), -2.0)

    def test_raiz_enesiema(self):
        """Testa raiz de índice n qualquer."""
        self.assertAlmostEqual(raiz_enesiema(81, 4), 3.0)
        self.assertAlmostEqual(raiz_enesiema(-32, 5), -2.0)
        with self.assertRaises(ZeroDivisionError):
            raiz_enesiema(16, 0)
        with self.assertRaises(ValueError):
            raiz_enesiema(-16, 2)

    def test_exponenciais_base_10_e_e(self):
        """Testa 10^x e e^x."""
        self.assertEqual(exp_base_10(3), 1000.0)
        self.assertEqual(exp_base_10(0), 1.0)
        self.assertAlmostEqual(exp_base_e(1), E)
        self.assertEqual(exp_base_e(0), 1.0)

    # ==========================================================================
    # 3. Testes de Logaritmos
    # ==========================================================================

    def test_logaritmo_base_10(self):
        """Testa logaritmo na base 10 e validação de valores não-positivos."""
        self.assertEqual(logaritmo_base_10(100), 2.0)
        self.assertEqual(logaritmo_base_10(1), 0.0)
        with self.assertRaises(ValueError):
            logaritmo_base_10(0)
        with self.assertRaises(ValueError):
            logaritmo_base_10(-5)

    def test_logaritmo_natural(self):
        """Testa logaritmo natural (ln) e exceção para valores <= 0."""
        self.assertAlmostEqual(logaritmo_natural(E), 1.0)
        self.assertEqual(logaritmo_natural(1), 0.0)
        with self.assertRaises(ValueError):
            logaritmo_natural(0)
        with self.assertRaises(ValueError):
            logaritmo_natural(-10)

    def test_logaritmo_base_2(self):
        """Testa logaritmo na base 2."""
        self.assertEqual(logaritmo_base_2(8), 3.0)
        self.assertEqual(logaritmo_base_2(1024), 10.0)
        with self.assertRaises(ValueError):
            logaritmo_base_2(0)

    # ==========================================================================
    # 4. Testes de Trigonometria e Inversas
    # ==========================================================================

    def test_trigonometria_radianos(self):
        """Testa seno, cosseno e tangente em radianos."""
        self.assertEqual(seno(0), 0.0)
        self.assertAlmostEqual(seno(PI / 2), 1.0)
        self.assertEqual(cosseno(0), 1.0)
        self.assertAlmostEqual(cosseno(PI), -1.0)
        self.assertEqual(tangente(0), 0.0)
        self.assertAlmostEqual(tangente(PI / 4), 1.0)

    def test_trigonometria_graus(self):
        """Testa seno, cosseno e tangente em graus."""
        self.assertAlmostEqual(seno(30, em_graus=True), 0.5)
        self.assertAlmostEqual(seno(90, em_graus=True), 1.0)
        self.assertAlmostEqual(cosseno(60, em_graus=True), 0.5)
        self.assertAlmostEqual(cosseno(0, em_graus=True), 1.0)
        self.assertAlmostEqual(tangente(45, em_graus=True), 1.0)

    def test_tangente_descontinuidade(self):
        """Testa se tangente lança exceção em 90 graus (assíntota)."""
        with self.assertRaises(ValueError):
            tangente(90, em_graus=True)

    def test_trigonometria_inversas(self):
        """Testa arco seno, arco cosseno e arco tangente."""
        self.assertAlmostEqual(arco_seno(0.5, em_graus=True), 30.0)
        self.assertAlmostEqual(arco_cosseno(0.5, em_graus=True), 60.0)
        self.assertAlmostEqual(arco_tangente(1.0, em_graus=True), 45.0)
        with self.assertRaises(ValueError):
            arco_seno(1.5)
        with self.assertRaises(ValueError):
            arco_cosseno(-1.2)

    def test_hiperbolicas(self):
        """Testa funções hiperbólicas sinh, cosh e tanh."""
        self.assertEqual(seno_hiperbolico(0), 0.0)
        self.assertEqual(cosseno_hiperbolico(0), 1.0)
        self.assertEqual(tangente_hiperbolico(0), 0.0)

    # ==========================================================================
    # 5. Testes de Funções Especiais e Utilitárias
    # ==========================================================================

    def test_fatorial(self):
        """Testa fatorial de números inteiros não-negativos e exceções."""
        self.assertEqual(fatorial(0), 1)
        self.assertEqual(fatorial(1), 1)
        self.assertEqual(fatorial(5), 120)
        self.assertEqual(fatorial(7), 5040)
        with self.assertRaises(ValueError):
            fatorial(-1)
        with self.assertRaises(ValueError):
            fatorial(3.5)
        with self.assertRaises(ValueError):
            fatorial(200)  # Limite de segurança

    def test_inverso(self):
        """Testa cálculo do inverso (1/x) e exceção de divisão por zero."""
        self.assertEqual(inverso(2), 0.5)
        self.assertEqual(inverso(4), 0.25)
        self.assertEqual(inverso(-5), -0.2)
        with self.assertRaises(ZeroDivisionError):
            inverso(0)

    def test_modulo(self):
        """Testa cálculo do módulo / valor absoluto (|x|)."""
        self.assertEqual(modulo(-10), 10.0)
        self.assertEqual(modulo(15), 15.0)
        self.assertEqual(modulo(0), 0.0)

    def test_porcentagem(self):
        """Testa cálculo de porcentagem."""
        self.assertEqual(porcentagem(50, 200), 100.0)
        self.assertEqual(porcentagem(15), 0.15)  # 15% de 1

    def test_constantes_matematicas(self):
        """Verifica a integridade das constantes matemáticas exportadas."""
        self.assertAlmostEqual(PI, 3.1415926535, places=8)
        self.assertAlmostEqual(E, 2.7182818284, places=8)
        self.assertAlmostEqual(PHI, 1.6180339887, places=8)
        self.assertAlmostEqual(TAU, 6.283185307, places=8)


if __name__ == "__main__":
    unittest.main()
