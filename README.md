#lineserver

1. install dependencies - npm install 

2. start server - node server.js /absolute/path/to/some/textfile.txt

3. starts child process that streams file chunks which are parsed into lines; lines added to leveldb key/value store

4. where the provided file is large and processing takes some time, the parent process serves the file at GET localhost:1337/lines/:line-number - the file is parsed on demand and the line is (eventually) served as expected; obviously this can be slow where the file is large and/or lines are long

5. once file processing is complete, requests to GET localhost:1337/lines/:line-number are served from the database

6. if the line number provided exceeds the total number of lines available, a 413 error is returned. 