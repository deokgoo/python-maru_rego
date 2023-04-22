import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
from pickColor import pickColor  # 외부 컬러
import json

# 이미지 파일명
IMAGE_FILE = 'img/maru_end1.jpg'
# 변환된 이미지 파일명
OUTPUT_FILE = 'maru_16.jpg'
# 이미지 크기 조정값
IMAGE_SIZE = (100, 100)

# 이미지 열기
img = Image.open(IMAGE_FILE)

# 이미지 크기 조정하기
img = img.resize(IMAGE_SIZE)

img_array = np.array(img)

# img_array = cv2.GaussianBlur(img_array, (3, 3), 0)

# RGB 색상 공간으로 변환하여 NumPy 배열에 저장
color_array = np.array(pickColor)

# K-means 클러스터링 알고리즘 적용하여 이미지에서 가장 어울리는 색상 선택하기
n_clusters = 32
kmeans = KMeans(n_clusters=n_clusters, random_state=1).fit(color_array)
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

new_img_array = np.zeros_like(img_array)
result_indices = np.zeros((IMAGE_SIZE[0], IMAGE_SIZE[1]), dtype=int)

for i, color_idx in enumerate(best_colors):
    x, y = divmod(i, IMAGE_SIZE[1])
    result_idx = np.argmin(np.linalg.norm(
        pickColor - kmeans.cluster_centers_[color_idx], axis=1))
    result_indices[x, y] = result_idx
    new_img_array[x, y, :] = pickColor[result_idx]

# 결과 저장하기
result_indices = result_indices.tolist()
result_json = json.dumps(result_indices)
with open('color-map.json', 'w') as f:
    f.write(result_json)
