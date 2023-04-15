from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
from colors import colors  # 외부 컬러

# 이미지 파일명
IMAGE_FILE = 'maru.jpg'
# 변환된 이미지 파일명
OUTPUT_FILE = 'maru_16.jpg'
# 이미지 크기 조정값
IMAGE_SIZE = (1240, 1754)

# 이미지 열기
img = Image.open(IMAGE_FILE)
# 이미지 크기 조정하기
img = img.resize(IMAGE_SIZE)

# 이미지를 NumPy 배열로 변환하기
img_array = np.array(img)


# RGB 색상 공간으로 변환하여 NumPy 배열에 저장
color_array = np.array(colors)

# K-means 클러스터링 알고리즘 적용
n_clusters = 16
kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(color_array)

# 클러스터 중심값으로 가장 어울리는 16가지 색상 선택
best_colors = [tuple(map(int, c)) for c in kmeans.cluster_centers_.astype(int)]

# k-means clustering 알고리즘 적용하기
n_colors = 16
kmeans = KMeans(n_clusters=n_colors, init=np.array(
    colors[:n_colors]), n_init=1)
kmeans.fit(img_array.reshape(-1, IMAGE_SIZE[0]*IMAGE_SIZE[1]))

# 클러스터링 결과에서 가장 가까운 색상값으로 매핑하기
new_colors = kmeans.cluster_centers_.astype(int)
color_map = {tuple(new_colors[i]): colors[kmeans.labels_[i]]
             for i in range(len(new_colors))}
new_img_array = np.zeros_like(img_array)
for i, color in enumerate(new_colors):
    mask = (kmeans.labels_ == i)
    new_img_array[mask] = color

# 매핑된 픽셀값으로 이미지 생성하기
new_img_array = np.array([color_map[tuple(color)] for color in new_img_array])
new_img_array = new_img_array.reshape(IMAGE_SIZE[0], IMAGE_SIZE[1], 3)
new_img = Image.fromarray(new_img_array.astype(np.uint8), mode='RGB')

# 이미지 저장하기
new_img.save(OUTPUT_FILE)
