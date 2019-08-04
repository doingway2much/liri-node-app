# liri-node-app


The liri-node-app that is written in javascript and run in Node JS.  It take is two peramaters one is the LIRI command and the other is the text you want to search for be it a band name or a movie title.

Here are a list of the LIRI commands and what they do:

1. node liri.js concert-this + artist  (Searches for concerts by the artists supplied) 
![img1](https://github.com/doingway2much/liri-node-app/blob/master/img/concert-this.JPG?raw=true)
2. node liri.js do-what-it-says  (Randomly picks something to do from the ramdom.txt file))
![img2](https://github.com/doingway2much/liri-node-app/blob/master/img/do-what-it-says.JPG?raw=true)
3. node liri.js movie-this + movie title  (Searches for the movie name that the user supplied in the second peramater)
![img3](https://github.com/doingway2much/liri-node-app/blob/master/img/movie-this.JPG?raw=true)
4. node liri.js spotify-this-song + song title  (Searches for the song name that the user supplied in the second peramater)
![img4](https://github.com/doingway2much/liri-node-app/blob/master/img/spotify-this-song.JPG?raw=true)


***
# Install Instructions:

1. Clone the GitHub repo using the following command:
```
git clone https://github.com/doingway2much/liri-node-app.git
```

2. Next run the following command to isntall the below packages:
```
npm install
````
*(Please ntoe that the "package.json" files has all the pakages you need otherwise you would have to isntall them indavidualy")*

Packages need for LIRI node
- axios
- dotenv
- moment
- node-spotify-api

3. You will finally neeed a Spotify API key and will have to create a ".env" file with your Spotify API details in the folling format:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

4. Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```
***


