# YouTerm

Are you developing in your terminal and suddenly feel in the mood for some music? With YouTerm you can listen any song really fast just typing the track's name. This will open a tab on your system default browser with the YouTube video playing the song.

### Usage

Just type:

```
youterm trackInfo
```

You can type the same you would in the YouTube search box. For instance:

```
youterm hello adele
```
![Adele Example](https://github.com/ferkaz/youterm/blob/master/img/example1.png?raw=true)

This will ask you if you want to listen the most relevant result or if you want to see more results and pick one of them.

![Beatles Example](https://github.com/ferkaz/youterm/blob/master/img/example2.png?raw=true)

If you want to listen the first result without any question, just use the `-f` option:

```
youterm -f hey jude
```

![Beethoven Example](https://github.com/ferkaz/youterm/blob/master/img/example3.png?raw=true)


### Installation

You need to clone the repo and use `npm install`:

```
git clone https://github.com/ferkaz/youterm.git
cd youterm
npm install -g
```

You need a Google API key for the YouTube queries. You can get it for free following the next guide

https://developers.google.com/api-client-library/javascript/start/start-js#get-access-keys-for-your-application

After that, insert your key in `lib/secrets.json`. You can use the example file:

```
mv lib/secrets.json.example lib/secrets.json
```


