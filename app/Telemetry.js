const axios = require('axios');

class Telemetry {
    
    constructor() {}

    getTelemetry(url) {
        if (!url) { throw new Error('A URL is required'); }
        
        return axios.get(url)
            .then(response => response.data)
            .catch(error => { 
                throw error.response.data
            });
    }

    processTelemetry(data) {

        // if telemetry data has not been provided, throw an Error
        if(!data) { throw new Error('Invalid telemetry data provided'); }

        // remove white space from the beginning and end of the string
        data = data.trim();

        /*
            - split the raw telementry string into an Array of values 
            - one for each line in the telemetry string
        */
        data = data.split('\n');

        // remove white space from inside each value
        data = data.map(t => t.replace(/\s/g,''));

        /*
            - deconstruct and spread the upperRightCoordinates into an array - '5 5' becomes ['5','5']
            - deconstruct and spread the commands data into an array
        */
        let [[...upperRightCoordinates], ...commands] = data;

        const roverTelemetry = this.groupRoverTelemetry(commands);

        return { upperRightCoordinates, roverTelemetry };
    }

    // group the position and instructions data for each rover
    groupRoverTelemetry(commands) {

        let groupedCommands = [];
    
        // loop over every second value in the commands data array provided
        for (let i = 0; i < commands.length; i += 2) {

            // take every 2 values from the commands array ( position, instructions )
            const [ position, instructions ] = commands.slice(i, i + 2)
            
            // push them into a new array within the groupedCommands array
            groupedCommands.push({ position, instructions })
        }

        return groupedCommands;
    }  
}

module.exports = Telemetry;