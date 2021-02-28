const Telemetry = require('../app/Telemetry');

const axios = require('axios');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);


describe('Telemetery Class', () => {

    let telemetry;
    let data;

    // create a new sinon sandbox
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        // create new Telemetry object
        telemetry = new Telemetry();

        // mock data string
        data = `5 5
                1 2 N
                LMLMLMLMM
                3 3 E
                MMRMMRMRRM`; 
    });

    afterEach(() => {
        // reset the sinon stub after each unit test
        sandbox.restore();
    });

    describe('getTelemetry()', () => {

        let url;
        let getStub;

        it('should throw an error when no URL is provided', () => {
            expect(telemetry.getTelemetry).to.throw('A URL is required');
        });

        it('should throw an error when an invalid URL is provided', done => {

            // create a Sinon stub within the sandbox that will intercept http GET request
            getStub = sandbox.stub(axios, 'get').rejects({ response: { data: '404: Not Found' } });
            
            url = 'https://an-invalid.url';

            telemetry.getTelemetry(url)
                     .catch(error => {
                         expect(error).to.be.a('string');
                         expect(error).to.eql('404: Not Found');
                         expect(getStub).to.have.been.calledWith(url);
                         done();
                        })
                        .catch(error => done(error));
        });

        it('should return the expected data when a valid URL is provided', done => {

            // create a Sinon stub within the sandbox that will intercept http GET request
            getStub = sandbox.stub(axios, 'get').resolves({ data });

            url = 'https://raw.githubusercontent.com/barrygee/files/master/nandos-telemetry.txt';

            telemetry.getTelemetry(url)
                     .then(response => {
                         expect(response).to.be.a('string');
                         expect(response).to.eq(data);
                         expect(getStub).to.have.been.calledOnce;
                         expect(getStub).to.have.been.calledWith(url);
                         done();
                     })
                     .catch(done);
        });
    });

    describe('processTelemetry()', () => { 

        it('should throw the expected error message if no data is provided', () => {
            expect(telemetry.processTelemetry).to.throw('Invalid telemetry data provided')
        });

        it('should return the position and instructions data for each Rover in individual JSON objects inside an array', () => {
            const rovers = [
                { position: '12N', instructions: 'LMLMLMLMM' },
                { position: '33E', instructions: 'MMRMMRMRRM' }
            ];
              
            // deconstrcut roverTelemetry from the response
            const { roverTelemetry } = telemetry.processTelemetry(data);

            expect(roverTelemetry)
                .to.be.an.instanceof(Array)
                .and.to.eql(rovers);
        });

        it('should return the position and instructions data for each Rover in individual JSON objects inside an array regardless of the number of those provided in the telemetry data', () => {
            const additionalRoverData = `5 5
                                         1 2 N
                                         LMLMLMLMM
                                         3 3 E
                                         MMRMMRMRRM
                                         0 0 N
                                         MMMRMRMRMM
                                         2 2 W
                                         RMRMRMMLMM
                                         4 3 S
                                         MMMLMLMRMM`
            const rovers = [
                { position: '12N', instructions: 'LMLMLMLMM' },
                { position: '33E', instructions: 'MMRMMRMRRM' },
                { position: '00N', instructions: 'MMMRMRMRMM' },
                { position: '22W', instructions: 'RMRMRMMLMM' },
                { position: '43S', instructions: 'MMMLMLMRMM' }
            ];
              
            // deconstruct roverTelemetry from the response
            const { roverTelemetry } = telemetry.processTelemetry(additionalRoverData);

            expect(roverTelemetry)
                .to.be.an.instanceof(Array)
                .and.to.eql(rovers);
        });

        it('should convert upperRightCoordinates into an array of expected values', () => {
            const { upperRightCoordinates } = telemetry.processTelemetry(data);

            expect(upperRightCoordinates)
                .to.be.an.instanceof(Array)
                .and.to.eql([ '5', '5' ]);
        });

        it('should remove white space from the rover starting position values provided', () => {
            const rovers = telemetry.processTelemetry(data);

            const object2 = rovers.roverTelemetry[0];
            const object3 = rovers.roverTelemetry[1];

            expect(object2.position).to.eq('12N');
            expect(object3.position).to.eq('33E');
        });
    });

    describe('groupRoverTelemetry()', () => {

        let commands, groupedCommands;

        before(() => {
            commands = [ '12N', 'LMLMLMLMM', '33E', 'MMRMMRMRRM' ];

            groupedCommands = [ { position: '12N', instructions: 'LMLMLMLMM' },
                                { position: '33E', instructions: 'MMRMMRMRRM' }];
        })

        it('should throw the expected error message if no commands are provided', () => {
            expect(telemetry.groupRoverTelemetry).to.throw('Commands are required')
        });

        it('should return an array of grouped commands objects when an array of commands in the expected format are provided', () => {
            expect(telemetry.groupRoverTelemetry(commands)).to.eql(groupedCommands)
        });
    });

});