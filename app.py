from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
from colors import colors  # 외부 컬러

# 이미지 파일명
IMAGE_FILE = 'maru3.jpg'
# 변환된 이미지 파일명
OUTPUT_FILE = 'maru_16.jpg'
# 이미지 크기 조정값
IMAGE_SIZE = (80, 80)

# 이미지 열기
img = Image.open(IMAGE_FILE)
# 이미지 크기 조정하기
img = img.resize(IMAGE_SIZE)

# 이미지를 NumPy 배열로 변환하기
img_array = np.array(img)

# RGB 색상 공간으로 변환하여 NumPy 배열에 저장
color_array = np.array(colors)

# K-means 클러스터링 알고리즘 적용하여 이미지에서 가장 어울리는 16가지 색상 선택하기
n_clusters = 16
kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(color_array)
best_colors = kmeans.predict(img_array.reshape(-1, 3))

# 선택된 색상으로 이미지 재구성하기
new_img_array = np.zeros_like(img_array)
for i, color in enumerate(best_colors):
    new_img_array[i//IMAGE_SIZE[1], i %
                  IMAGE_SIZE[1], :] = kmeans.cluster_centers_[color]

# 매핑된 픽셀값으로 이미지 생성하기
new_img = Image.fromarray(new_img_array.astype(np.uint8), mode='RGB')

# 이미지 저장하기
new_img.save(OUTPUT_FILE)
