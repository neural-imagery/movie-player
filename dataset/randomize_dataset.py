# load dataset.csv and randomize the rows

import pandas as pd
import numpy as np

# load dataset.csv
df = pd.read_csv("dataset/dataset.csv", header=0)

# randomize the rows
df = df.sample(frac=1).reset_index(drop=True)

# save the dataset as dataset_randomized.json
df.to_json("dataset/dataset_randomized.json", orient="records")
