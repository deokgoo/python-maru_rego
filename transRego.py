import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
from pickColor import pickColor  # 외부 컬러
from pyrebase import pyrebase
import json


def transRego():
    # 이미지 파일명
    IMAGE_FILE = 'img/bbabi.jpeg'
    # 변환된 이미지 파일명
    OUTPUT_FILE = 'maru_16.jpg'
    # 이미지 크기 조정값
    IMAGE_SIZE = (40, 40)

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

    return result_json

# 파이어베이스 storage로 json을 파일로 저장하는 함수


def firebaseStorageSave(fileName, result_json):
    config = {
        "apiKey": "AIzaSyD-0tK7j1Cwq3qz3Z8Y9X0Jxh9sQ1mH0m8",
        "authDomain": "color-recommend.firebaseapp.com",
        "databaseURL": "https://color-recommend.firebaseio.com",
        "projectId": "color-recommend",
        "storageBucket": "color-recommend.appspot.com",
        "messagingSenderId": "1060424540528",
        "appId": "1:1060424540528:web:8f0f7a0e9f9c9e1d8d9e0a",
        "measurementId": "G-8Y3F3YJZ9X"
    }

    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()

    # as admin
    storage.child(fileName).put(result_json, user['idToken'])
