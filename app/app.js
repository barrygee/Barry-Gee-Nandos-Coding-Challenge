const Telemetry = require('./Telemetry');
const Rover = require('./Rover');
const Plateau = require('./Plateau');

const go = async() => {

    try {
        // create new Telemetry object
        const telemetry = new Telemetry();

        // get telemetry data
        const data = await telemetry.getTelemetry('https://raw.githubusercontent.com/barrygee/files/master/nandos-telemetry.txt')
                                    .then(data => data)
                                    .catch(error => {
                                        throw error;
                                    });
    
        // deconstruct values from processed telemetry data
        const { upperRightCoordinates, roverTelemetry } = telemetry.processTelemetry(data);
  
        // create new Plateau object
        const plateau = new Plateau(upperRightCoordinates);

        /*
            Loop through each command and wait until the await rover.drive() has resolved
            before continuing to the next command in the loop.
            This prevents the next Rover from starting until the current one has completed
        */
        for (const commands of roverTelemetry) {

            // create a new Rover object
            const rover = new Rover(commands);

            await rover.drive(plateau)
                       .then(finalPosition => console.log('Rover final position: ', finalPosition));
          }

    } catch(Error) {
        console.log(Error);
    }
};

go();