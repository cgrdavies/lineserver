#lineserver

Solution for https://salsify.github.io/line-server.html

How does your system work?
--------------------------

Details are addressed in comments in the source, the following represents a brief outline:

1. When the server is started, node forks a child process that preprocesses the provided file; the child process streams file chunks which are then parsed into lines; lines are then written to a levelDB key/value store

2. Where the provided file is large and processing takes some time, the parent process serves the file at GET localhost:1337/lines/[line-number]. During preprocessing, the file is parsed on demand using a read stream and again parsed into individual lines. The line is (eventually) served as expected. Obviously this can be slow where the file is large, lines are long, or both.

5. Once file preprocessing is complete, requests requests to GET localhost:1337/lines/:line-number are served from levelDB; lookups are performed using the line number as the key

6. If the line number provided exceeds the total number of lines in the file, a 413 status code is returned. If the request is malformed, a 410 status code is returned. 

How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?
--------------------------

As more lines are added and lines get longer, preprocessing takes longer and therefore the system provides slower lookup for longer; additionally, the larger the file, the longer the on-demand parse takes. 

For example, a 3.23GB file was preprocessed in approximately 35 seconds. During preprocessing the response time for an index in the middle of the file was approximately 1700ms. Upon completion of preprocessing, the response time was approximately 35ms. 

How will your system perform with 100 users? 10000 users? 1000000 users?
--------------------------

This depends on the hardware configuration, however, as a single-process, event-driven framework, Node.js is designed to handle many simultaneous connections effectively.

What documentation, websites, papers, etc did you consult in doing this assignment?
--------------------------

Node.js Streams Manual - https://nodejs.org/api/stream.html
Practical Examples of the New Node.js Streams API - https://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/
Readable, Writable, and Transform Streams in Node.js - http://www.sandersdenardi.com/readable-writable-transform-streams-node/
stream-handbook - https://github.com/substack/stream-handbook
A Comparison Of NoSQL Database Management Systems And Models - https://www.digitalocean.com/community/tutorials/a-comparison-of-nosql-database-management-systems-and-models
Levelup - https://github.com/Level/levelup
LevelDB - http://leveldb.org

What third-party libraries or other tools does the system use? How did you choose each library or framework you used?
--------------------------

I chose to work in Node.js because I am most familiar with JavaScript and it appeared to be a suitable tool for the project due to its speed and its simple and effective built-in Streams API. I explicitly chose not to use a framework on top of Node (such as Express or Restify) because I decided the scope of the task didn't justify the extra overhead, and benchmarks showed that using pure Node realized significant performance gains over Express, Restify and their ilk. 

Given that no complex querying was required, an SQL-based database seemed to be excessive. LevelDB appears to be the most mature and well-supported Key/Value store that supports persistence. Benchmarks also show that it is highly rated for both read and write operations. I tested MongoDB but LevelDB delivered far superior performance. 

How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
--------------------------

Including research, writing and testing, I probably spent approximately 11 hours on the exercise. 

If I had time I would have written unit tests. 

Of equal secondary importance in improving the system's performance are: researching and implementation means of improving processing time and lookup performance during processing for large files. 

Finally, I would improve the system's design to more easily allow the addition of new features in the event that additional functionality is required. 

If you were to critique your code, what would you have to say about it?
--------------------------

Although effective and fairly performant, better adherence to Object Oriented JavaScript paradigms/best practices would be preferred. 


