# Nandos Code Challenge: Node.js #

## Running the code ##

**Install dependencies:** `npm install`
\
\
**Run the code:** `npm start`

- The telemetry data that matches that provided in the code challenge document will be pulled from a text file hosted on GitHub.
- The final positions of each rover will be logged in the terminal window

**Run the unit tests:** `npm run test`
\
\
**Check unit test coverage:** `npm run coverage`

\
**app.js**

- Provides a go function that when called creates Telemetry and Plateau objects, and creates new Rover objects based on the number of 2 line position and instructions rows found in the telemetetry data file


\
**Telementary.js**

- Makes a HTTP request to pull the telemetry data file from GitHub 
- Parses the raw data String.
- Procresses the data for use when creating new Plateau and Rover objects.

\
**Rover.js**

- The initial position and instructions (movements) are set when each Rover object is created
- The Rover class provides methods to get and set position and direction data, and stores instructions data
- The class also provides methods to move and change the direction of the Rover

\
**Plateau.js**

- The Plateau class provides methods to get and set the top right coordinates of the plateau and provides a method to get cardinal compass points - N, E, S, W

\
**Additional Information**

- Adding additional position and instruction lines to the raw data string will automatically generate additional Rover objects when the code is run.

- The edges of the Plateau are automatically detected and the message 'Plateau edge reached' is logged out in the terminal if a manouver would take the Rover outside of that boundry.

- The 'upper-right' coordinates of the plateau are dynamic. If larger or smaller values are provided witin the raw data string, then the boundry detection will automatically use those new values and warn if a manouver would take the Rover outside of that boundry.