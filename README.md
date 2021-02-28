**Running the code**

- Run the code: `npm start`

- Run the unit tests: `npm run test`

- Check unit test coverage: `npm run coverage`

\
**Telementary.js**

- Parses the raw data String.

- Procresses the data for use when creating new Plateau and Rover objects.

\
**Rover.js**

- ...

- The initial position and instructions (movements) are set when each Rover object is created

\
**Plateau.js**

- ...

\
**Additional Information**

- Adding additional position and instruction lines to the raw data String will automatically generate additional Rover objects when the code is run.

- The edges of the Plateau are automatically detected and a console.log is output if a manouver would take the Rover outside of that boundry.

- The 'upper-right' coordinates of the plateau are dynamic. If large or smaller values are provided witin the raw data String, then the boundry detection will automatically use those new values and warn if a manouver would take the Rover outside of that boundry.