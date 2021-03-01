class Plateau {
    constructor(upperRightCoordinates) {

        if(!upperRightCoordinates) { 
            throw new Error('Invalid coordinates data provided'); 
        } else {
            this.upperRightCoordinates = upperRightCoordinates;
        } 
        
        this.cardinalCompassPoints = ['N', 'E', 'S', 'W'];
    }

    set upperRightCoordinates(upperRightCoordinates) {
        // destructure the upperRightX, upperRightY values from the upperRightCoordinates array 
        const [ upperRightX, upperRightY ] = upperRightCoordinates;

        this.upperRightX = upperRightX;
        this.upperRightY = upperRightY;
    }

    get upperRightX() {
        return this._upperRightX;
    }

    set upperRightX(upperRightX) {
        this._upperRightX = parseInt(upperRightX);
    }

    get upperRightY() {
        return this._upperRightY;
    }

    set upperRightY(upperRightY) {
        this._upperRightY = parseInt(upperRightY);
    }

    get cardinalCompassPoints() {
        return this._cardinalCompassPoints;
    }

    set cardinalCompassPoints(cardinalCompassPoints) {
        this._cardinalCompassPoints = cardinalCompassPoints;
    }
}

module.exports = Plateau;