import sys
import cv2
import numpy as np
import os
import pickle
import json

classes = {0: 'NO TUMOR', 1: 'PITUITARY TUMOR', 2: 'GLIOMA TUMOR', 3: 'MENINGIOMA TUMOR'}

os.chdir('upload/')
names = os.listdir('.')
os.rename(names[0], names[0] + '.jpg')
names = os.listdir('.')

img = cv2.imread(names[0], 0)
img = cv2.resize(img, (200,200))
Z = np.array([img])
Z = Z.reshape(1, -1)

results = []

os.chdir('..')

pickle_in = open('all_pickles.pickle', 'rb')
all_pickles = pickle.load(pickle_in)

for key in all_pickles.keys():
    clf = all_pickles[key]
    pred = clf.predict(Z)[0]
    results.append({"algorithm": key.split(".")[0], "result": classes[pred]})

os.chdir('upload/')

os.remove(names[0])
print(json.dumps(results))
