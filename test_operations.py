"""Testes automatizados para as operações matemáticas da calculadora.

Utiliza a biblioteca padrão unittest para verificar a corretude das funções
de adição, subtração, multiplicação e divisão sob diferentes cenários.
"""

import unittest
from operations import adicao, subtracao, multiplicacao, divisao


class TestOperacoesMatematicas(unittest.TestCase):
    """Conjunto de testes unitários para o módulo operations."""

    # ------------------ Testes de Adição ------------------
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

    # ------------------ Testes de Subtração ------------------
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

    # ------------------ Testes de Multiplicação ------------------
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

    # ------------------ Testes de Divisão ------------------
    def test_divisao_exata(self):
        """Testa a divisão com quociente exato."""
        self.assertEqual(divisao(10, 5), 2.0)
        self.assertEqual(divisao(20, 4), 5.0)

    def test_divisao_decimal(self):
        """Testa a divisão gerando quociente decimal periódico ou não."""
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

        with self.assertRaises(ZeroDivisionError):
            divisao(-5, 0)


if __name__ == "__main__":
    unittest.main()
