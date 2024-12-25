import pandas as pd
from factor_analyzer import FactorAnalyzer
import numpy as np

# Carregar a planilha Excel
df = pd.read_excel('cartoes.xlsx')

# Remover a coluna 'Cartão' pois ela não será usada na análise
numerical_data = df.drop(columns=["Cartão"])


# Substituir valores NaN ou Infinitos por zero
numerical_data = numerical_data.replace([np.inf, -np.inf], np.nan).fillna(0)
print(numerical_data)

# Verificar se existem colunas constantes (com variância zero) e adicionar pequenas variações
for col in numerical_data.columns:
    if numerical_data[col].std() == 0:  # Variância zero
        numerical_data[col] += np.random.normal(0, 1e-4, size=numerical_data[col].shape)

# Verificar se há colinearidade alta (coeficiente de correlação muito próximo de 1 ou -1)
corr_matrix = numerical_data.corr()
# print("\nMatriz de Correlação:")
# print(corr_matrix)

# Identificar colunas com correlação alta (maior que 0.9 ou menor que -0.9)
highly_correlated = np.where(np.abs(corr_matrix) > 0.9)
highly_correlated = [(numerical_data.columns[x], numerical_data.columns[y]) for x, y in zip(*highly_correlated) if x != y]

# print("\nColunas com alta correlação (> 0.9 ou < -0.9):")
# print(highly_correlated)

# Normalizar os dados (padronizar: média 0, desvio padrão 1)
numerical_data = (numerical_data - numerical_data.mean()) / numerical_data.std()

# Executar análise fatorial com número de fatores igual a 1 (score unidimensional)
fa = FactorAnalyzer(rotation=None, n_factors=1)
fa.fit(numerical_data)

# Obter cargas fatoriais
factor_loadings = fa.loadings_

# Calcular os pesos (normalizar para somar 1)
pesos = np.abs(factor_loadings[:, 0])  # Pegar valores absolutos das cargas fatoriais
pesos_normalizados = pesos / pesos.sum()  # Normalizar os pesos

# Exibir pesos associados às variáveis
variaveis = numerical_data.columns
pesos_por_variavel = dict(zip(variaveis, pesos_normalizados))

print("\nPesos normalizados para cada variável:")
for var, peso in pesos_por_variavel.items():
    print(f"{var}: {peso:.4f}")
