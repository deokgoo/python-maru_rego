import cv2
import numpy as np
import urllib.request
from urls import urls  # 외부 컬러


def get_most_common_color(urls):
    colors = []
    for url in urls:
        # 이미지 url에서 이미지를 불러옴
        with urllib.request.urlopen(url) as url_response:
            s = url_response.read()
            arr = np.asarray(bytearray(s), dtype=np.uint8)
            img = cv2.imdecode(arr, -1)

        # 이미지에서 가장 많이 포함하는 색상 추출
        pixels = np.float32(img.reshape(-1, 3))
        n_colors = 1
        criteria = (cv2.TERM_CRITERIA_EPS +
                    cv2.TERM_CRITERIA_MAX_ITER, 200, .1)
        flags = cv2.KMEANS_RANDOM_CENTERS
        _, labels, palette = cv2.kmeans(
            pixels, n_colors, None, criteria, 10, flags)
        _, counts = np.unique(labels, return_counts=True)
        dominant = palette[np.argmax(counts)]

        # 추출한 색상을 colors 배열에 추가
        colors.append(list(dominant))

    return colors


with open('colorListFrom.py', 'w') as f:
    f.write('result = ' + str(get_most_common_color(urls)))
