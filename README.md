# BBVA IT Ana María Lanz
Coding test for frontend position at BBVA IT.
This project contains my implementation to a weather App
The project has been developed using jQuery, Bootstrap and Axios.
During the coding process I had some issues:

* I got some CORS-related errors in Chrome trying to get data from the API. Chrome bloqued the second request to obtain the next 10 users. I tried with Firefox and everything was ok.

* I didn't find a way to test the axios asyncronows request, so I included my approach to solving this part. For that I included the template I would use to test the function getCoordinates: [testCoordinates.js](test/testCoordinates.js)
