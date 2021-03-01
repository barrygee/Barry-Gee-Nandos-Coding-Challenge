const Rover = require('../app/Rover');
const Plateau = require('../app/Plateau');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Rover Class', () => {

    describe('constructor()', () => {

        it('should throw an error when no commands are provided', () => {
            const newRover = () => new Rover();

            expect(newRover).to.throw(Error, 'Invalid commands data provided');
        });

        it('should split the commands into xPosition, yPosition, direction and instructions properties', () => {
            const commands = { position: '12N', instructions: 'LMLMLMLMM' };
            const rover = new Rover(commands);

            expect(rover.xPosition).to.eql(1);
            expect(rover.yPosition).to.eql(2);
            expect(rover.direction).to.eql('N');
            expect(rover.instructions).to.be.a('array');
            expect(rover.instructions).to.eql(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
        });

    });

    describe('xPosition, yPosition, direction and instructions getters and setters ', () => {

        let commands, rover;

        before(() => {
            commands = { position: '12N', instructions: 'LMLMLMLMM' };
            rover = new Rover(commands);
        })

        it('should get xPosition', () => {  
            expect(rover.xPosition).to.eql(1);
        });

        it('should set xPosition', () => {
            rover.xPosition = 0;

            expect(rover.xPosition).to.eql(0);
        });

        it('should get yPosition', () => {
            expect(rover.yPosition).to.eql(2);
        });

        it('should set yPosition', () => {
            rover.yPosition = 0;

            expect(rover.yPosition).to.eql(0);
        });

        it('should get direction', () => {
            expect(rover.direction).to.eql('N');
        });

        it('should set direction', () => {
            rover.direction = 'S';

            expect(rover.direction).to.eql('S');
        });

        it('should get instructions', () => {
            expect(rover.instructions).to.eql(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
        });

        it('should set instructions', () => {
            rover.instructions = 'RRRMMMLLLMMM';

            expect(rover.instructions).to.eql(['R', 'R', 'R', 'M', 'M', 'M', 'L', 'L', 'L', 'M', 'M', 'M']);
        });

    

        it('should get the rovers final position', () => {
            //...
        });
    });

    describe('drive()', () => {

        let commands, rover, plateau;

        before(() => {
            commands = { position: '12N', instructions: 'LMLMLMLMM' };
            rover = new Rover(commands);
            plateau = new Plateau(['5', '5']);
        })

        it('should throw an error when a Plateau object is not provided', () => {
            expect(rover.drive).to.throw(Error, 'A Plateau object is required');
        });

        it('should return the Rovers final position in the expected format \'# # N\' once the promise resolves', () => {
            return expect(rover.drive(plateau)).to.eventually.equal('1 3 N');
        });

        it('should reject with the expected message when the instruction provided does not equal \'L\', \'R\' or \'M\'', () => {
            rover.instructions = ['X'];
            return expect(rover.drive(plateau)).to.eventually.be.rejectedWith('Invalid instruction provided');
        });
    });

    describe('move()', () => {

        let commands, rover, plateau;

        before(() => {
            commands = { position: '12N', instructions: 'LMLMLMLMM' };
            rover = new Rover(commands);
            plateau = new Plateau(['5', '5']);
        })

        it('should throw an error when Plateau upperRightX, upperRightY values are not provided', () => {
            expect(rover.move).to.throw(Error);
        });

        it('should increase the Rover yPosition by 1 (move the Rover North)', () => {
            rover.yPosition = 0;
            rover.move('N', plateau);
            
            expect(rover.yPosition).to.eq(1)
        });

        it('should not update the Rover yPosition and return the message \'Plateau edge reached\' when a move would take the rover over the top edge of the Plateau boundry', () => {
            rover.yPosition = 5;
            
            expect(rover.move('N', plateau)).to.eql('Plateau edge reached')
            expect(rover.yPosition).to.eql(5);
        });

        it('should increase the Rover xPosition by 1 (move the Rover East)', () => {
            rover.xPosition = 0;
            rover.move('E', plateau);
            
            expect(rover.xPosition).to.eq(1)
        });

        it('should not update the Rover xPosition and return the message \'Plateau edge reached\' when a move would take the rover over the right hand edge of the Plateau boundry', () => {
            rover.xPosition = 5;
            
            expect(rover.move('E', plateau)).to.eql('Plateau edge reached')
            expect(rover.xPosition).to.eql(5);
        });

        it('should decrease the Rover yPosition by 1 (move the Rover South)', () => {
            rover.yPosition = 5;
            rover.move('S', plateau);
            
            expect(rover.yPosition).to.eq(4)
        });

        it('should not update the Rover yPosition and return the message \'Plateau edge reached\' when a move would take the rover over the bottom edge of the Plateau boundry', () => {
            rover.yPosition = 0;
            
            expect(rover.move('S', plateau)).to.eql('Plateau edge reached')
            expect(rover.yPosition).to.eql(0);
        });

        it('should decrease the Rover xPosition by 1 (move the Rover West)', () => {
            rover.xPosition = 5;
            rover.move('W', plateau);
            
            expect(rover.xPosition).to.eq(4)
        });

        it('should not update the Rover xPosition and return the message \'Plateau edge reached\' when a move would take the rover over the left hand edge of the Plateau boundry', () => {
            rover.xPosition = 0;
            
            expect(rover.move('W', plateau)).to.eql('Plateau edge reached')
            expect(rover.xPosition).to.eql(0);
        });
    });

    describe('changeDirection()', () => {

        let commands, rover, plateau;

        before(() => {
            commands = { position: '12N', instructions: 'LMLMLMLMM' };
            rover = new Rover(commands);
            plateau = new Plateau(['5', '5']);
        })

        it('should set the direction to \'N\', the first direction in the array', () => {
            rover.direction = 'W';
            rover.changeDirection('R', rover.direction, plateau);

            expect(rover.direction).to.eql('N');
        });

        it('should set the direction to \'E\'', () => {
            rover.direction = 'N';
            rover.changeDirection('R', rover.direction, plateau);

            expect(rover.direction).to.eql('E');
        });

        it('should set the direction to \'S\'', () => {
            rover.direction = 'W';
            rover.changeDirection('L', rover.direction, plateau);

            expect(rover.direction).to.eql('S');
        });

        it('should set the direction to \'W\', the last direction in the array', () => {
            rover.direction = 'N';
            rover.changeDirection('L', rover.direction, plateau);

            expect(rover.direction).to.eql('W');
        });
    });
});