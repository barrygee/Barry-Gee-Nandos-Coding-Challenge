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
        
        // create new rover objects
        roverTelemetry.forEach(commands => {

            // create a new Rover object
            const rover = new Rover(commands);
            console.log(rover.drive(plateau));
        });   

    } catch(Error) {
        console.log(Error);
    }
};

go();