# bottld

**bottld** is a wine recommendation app created as a team Capstone project during Fullstack Academy's Software Engineering Immersive program.

Starting with [this dataset](https://www.kaggle.com/zynicide/wine-reviews) of 130,000 wines, our team modified a Python script to extract flavor keywords (e.g., "fruit", "woody", "tannin") from reviews included in the dataset. An Approximate Nearest Neighbor algorithm was used to calculate the similarity between each wine, based on the flavors associated with each wine. We used neo4j, a graph database, to map relationships between wines, flavors, and users.

## Features: 
* Wine search function uses fuzzy string matching, with an assortment of filters, to display the most accurate results
* Engine recommends five wines similar to a selected wine
* Users log in with Google credentials
* Registered users can build individual flavor profiles aggregated from the properties of wines they've "liked". The engine generates personalized wine recommendations based on a user's flavor profile.

Demo video: [youtu.be/nLT80sWfHVI](https://youtu.be/nLT80sWfHVI)
