import matplotlib.pyplot as plt
from sklearn.cluster import AgglomerativeClustering
from sklearn.preprocessing import MultiLabelBinarizer
from scipy.cluster.hierarchy import dendrogram, linkage

# Dados de entrada
cartoes = [
    {"nome": "Cartão Santander Unlimited Mastercard Black", "tags": ["pontos", "limite_alto", "renda_muito_alta"]},
    {"nome": "Cartão Santander AAdvatange Black", "tags": ["pontos", "limite_alto", "renda_alta"]},
    {"nome": "Cartão Santander Pão de Açucar Mastercard Black", "tags": ["pontos", "limite_alto", "renda_media"]},
    {"nome": "Cartão Santander Unique Pontos Mastercad Black", "tags": ["pontos", "limite_alto", "renda_alta"]},
    {"nome": "Cartão Santander American Express - The Platinum", "tags": ["pontos", "limite_alto", "renda_muito_alta"]},
    {"nome": "Cartão C6 Carbon", "tags": ["pontos", "cashback", "limite_alto", "renda_muito_alta"]},
    {"nome": "LATAM Pass Itaú Mastercad Black", "tags": ["pontos", "limite_alto", "renda_alta"]},
    {"nome": "LATAM Pass Itaú Mastercad Platinum", "tags": ["pontos", "renda_media"]},
    {"nome": "LATAM Pass Itaú Mastercad Gold", "tags": ["pontos", "renda_baixa"]},
    {"nome": "Azul Itaú Visa Infinite", "tags": ["pontos", "limite_alto", "renda_alta"]},
    {"nome": "Cartão Santander Free", "tags": ["sem_anuidade", "facil_aprovacao", "negativado", "renda_baixa"]},
    {"nome": "Itaú Uniclass Visa Signature", "tags": ["sem_anuidade", "facil_aprovacao", "limite_alto", "renda_media"]},
    {"nome": "PicPay Card Gold", "tags": ["sem_anuidade", "facil_aprovacao", "negativado", "renda_baixa"]},
    {"nome": "PagBank Visa Internacional", "tags": ["sem_anuidade", "cashback", "facil_aprovacao", "negativado", "renda_baixa"]},
    {"nome": "Cartão Will Bank", "tags": ["sem_anuidade", "facil_aprovacao", "renda_baixa"]},
    {"nome": "Santander Elite Pontos Visa Signature", "tags": ["pontos", "facil_aprovacao", "renda_media"]},
    {"nome": "Picpay Card Platinum", "tags": ["cashback", "renda_baixa"]},
    {"nome": "Vivo Itaú Cashback Mastercard Platinum", "tags": ["cashback", "renda_baixa"]},
    {"nome": "Cartão Olé Consignado", "tags": ["sem_anuidade", "negativado", "renda_baixa"]},
    {"nome": "Cartão de Crédito Neon", "tags": ["sem_anuidade", "cashback", "renda_baixa"]},
    {"nome": "Cartão Nubank", "tags": ["sem_anuidade", "facil_aprovacao", "negativado", "renda_baixa"]},
    {"nome": "Cartão Digio Visa Gold", "tags": ["sem_anuidade", "renda_baixa"]},
    {"nome": "Cartão C6 Bank", "tags": ["sem_anuidade", "pontos", "renda_baixa"]},
    {"nome": "Cartão Azul Itaú Internacional", "tags": ["pontos", "renda_baixa"]},
    {"nome": "LATAM Pass Itaú Mastercard Internacional", "tags": ["pontos", "renda_baixa"]},
    {"nome": "Cartão Inter Consignado", "tags": ["sem_anuidade", "renda_baixa", "negativado"]},
    {"nome": "Cartão de Crédito BMG", "tags": ["sem_anuidade", "cashback", "negativado"]},
    {"nome": "Cartão Azul Itaú Mastercard Gold", "tags": ["pontos", "renda_baixa", "facil_aprovacao"]},
    {"nome": "Cartão Múltiplo Sofisa Direto", "tags": ["sem_anuidade", "renda_baixa", "facil_aprovacao", "cashback"]},
    {"nome": "Itaú Click Mastercard Platinum", "tags": ["sem_anuidade", "renda_baixa", "facil_aprovacao"]},
]

# Extrair as tags únicas
all_tags = set(tag for card in cartoes for tag in card['tags'])

# Codificação One-Hot
mlb = MultiLabelBinarizer(classes=sorted(all_tags))
tags_matrix = mlb.fit_transform([card['tags'] for card in cartoes])

# Criar ligação para o dendrograma
linked = linkage(tags_matrix, method='ward')

# Visualizar dendrograma
plt.figure(figsize=(15, 10)) 
dendrogram(
    linked,
    labels=[card['nome'] for card in cartoes],
    leaf_rotation=90,  
    leaf_font_size=8, 
)
plt.xlabel("Cartões", fontsize=12)
plt.ylabel("Distância Euclidiana", fontsize=12)
plt.title("Dendrograma dos Cartões de Crédito", fontsize=14)
plt.tight_layout() 
plt.show()

# Agrupamento hierárquico com 6 grupos
n_clusters = 6
hierarchical = AgglomerativeClustering(n_clusters=n_clusters, affinity='euclidean', linkage='ward')
labels = hierarchical.fit_predict(tags_matrix)

# Adicionar o grupo de cada cartão
for i, card in enumerate(cartoes):
    card['grupo'] = labels[i]

# Exibir os grupos
for group_id in range(n_clusters):
    print(f"Grupo {group_id + 1}:")
    for card in cartoes:
        if card['grupo'] == group_id:
            print(f"  - {card['nome']} (tags: {', '.join(card['tags'])})")
    print() 


