class Rover {
    constructor(commands) {
        if(!commands) { 
            throw new Error('Invalid commands data provided'); 
        } else {
            const [ xPosition, yPosition, direction ] = Array.from(commands.position);
            this.xPosition = xPosition;
            this.yPosition = yPosition;
            this.direction = direction;
    
            this.instructions = Array.from(commands.instructions);
        } 
    }

    get xPosition() {
        return this._xPosition;
    }

    set xPosition(xPosition) {
        this._xPosition = xPosition;
    }

    get yPosition() {
        return this._yPosition;
    }

    set yPosition(yPosition) {
        this._yPosition = yPosition;
    }

    get direction() {
        return this._direction;
    }

    set direction(direction) {
        this._direction = direction;
    }

    get instructions() {
        return this._instructions;
    }

    set instructions(instructions) {
        this._instructions = instructions;
    }

    get finalPosition() {
        return `${this.xPosition} ${this.yPosition} ${this.direction}`;
    }

    drive(plateau) {

        console.log(`Rover starting position: ${this.xPosition} ${this.yPosition} ${this.direction}`);

        return new Promise(resolve => {

            if(!plateau) { throw new Error('A Plateau object is required'); } 

            this.instructions.forEach(instruction => {
                switch(instruction) {
                    case 'M':
                        this.move(plateau);
                        break;

                    case 'L':
                    case 'R':
                        this.changeDirection(instruction, this.direction, plateau)
                        break;

                    default:
                        throw new Error('Invalid instruction provided');
                }
            })
            resolve(this.finalPosition)
        });
            
            // return this.finalPosition;
    }

    // deconstruct the upperRightX, upperRightY values from plateau
    move({ upperRightX, upperRightY }) {

        switch(this.direction) {
            case 'N':
                if (this.yPosition < upperRightY ) {
                    this.yPosition++;
                } else {
                    console.log('Plateau edge reached')
                }
                break;
            
            case 'E':
                if (this.xPosition < upperRightX ) {
                    this.xPosition++;
                } else {
                    console.log('Plateau edge reached')
                }

                break;

            case 'S':
                if (this.yPosition > 0) {
                    this.yPosition--;
                } else {
                    console.log('Plateau edge reached')
                }
              
                break;

            case 'W':
                if (this.xPosition > 0) {
                    this.xPosition--;
                } else {
                    console.log('Plateau edge reached')
                }
              
                break;
            
            default:
                throw new Error('Invalid direction provided');
        }
    }

    /*
        - instruction = 'L' or 'R'
        - currentDirection
        - deconstruct the cardinalCompassPoints array from the plateau object
    */
    changeDirection(instruction, currentDirection, { cardinalCompassPoints }) {

        // find the index in the cardinalCompassPoints array of the direction that matches the current direction value
        const currentDirectionIndex = cardinalCompassPoints.findIndex(direction => direction === currentDirection);

        if (instruction === 'L') {
            // if the currentDirection is not the first position in the cardinalCompassPoints array, set the direction to the previous value along in the cardinalCompassPoints array
            // otherwise set the direction to the last direction in the array - looping to the end of the array
            this.direction = currentDirection !== 'N' ? cardinalCompassPoints[currentDirectionIndex - 1] : 'W';              
        } 

        if (instruction === 'R') {
             // if the currentDirection is not the last position in the cardinalCompassPoints array, set the direction to the next value along in the cardinalCompassPoints array
             // otherwise set the direction to the first direction in the array - looping to the beginning of the array
            this.direction = currentDirection !== 'W' ? cardinalCompassPoints[currentDirectionIndex + 1] : 'N';
        }
    }
}

module.exports = Rover;