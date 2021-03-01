const Plateau = require('../app/Plateau');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Plateau Class', () => {

    let cardinalCompassPoints;

    before(() => {
        cardinalCompassPoints = ['N', 'E', 'S', 'W'];
    });

    describe('constructor()', () => {

        let upperRightCoordinates;
        
        before(() => {
            upperRightCoordinates = [ '5', '5' ];
        });

        it('should throw an error when no upperRightCoordinates are provided', () => {
            const newPlateau = () => new Plateau();

            expect(newPlateau).to.throw(Error, 'Invalid coordinates data provided');
        });

        it('should set upperRightCoordinates during instantiation', () => {
            const plateau = new Plateau(upperRightCoordinates);

            expect(plateau.upperRightX).to.eql(5);
            expect(plateau.upperRightY).to.eql(5);
        });

        it('should set cardinalCompassPoints during instantiation', () => {
            const plateau = new Plateau(upperRightCoordinates);

            expect(plateau.cardinalCompassPoints).to.be.a('array');
            expect(plateau.cardinalCompassPoints).to.deep.equal(cardinalCompassPoints);
        });

    });

    describe('upperRightCoordinates, upperRightX, upperRightY and cardinalCompassPoints getters and setters ', () => {
        
        let upperRightCoordinates, plateau;

        before(() => {
            upperRightCoordinates = ['5','5'];
            plateau = new Plateau(upperRightCoordinates);
        })

        it('should get upperRightX', () => {
            expect(plateau.upperRightX).to.be.a('number')
            expect(plateau.upperRightX).to.eql(5);
        });

        it('should set upperRightX as a number', () => {
            plateau.upperRightX = '10';

            expect(plateau.upperRightX).to.be.a('number')
            expect(plateau.upperRightX).to.eql(10);
        });

        it('should get upperRightY', () => {
            expect(plateau.upperRightY).to.be.a('number')
            expect(plateau.upperRightY).to.eql(5);
        });

        it('should set upperRightY as a number', () => {
            plateau.upperRightY = '10';

            expect(plateau.upperRightY).to.be.a('number')
            expect(plateau.upperRightY).to.eql(10);
        });

        it('should get cardinalCompassPoints', () => {
            expect(plateau.cardinalCompassPoints).to.be.a('array')
            expect(plateau.cardinalCompassPoints).to.deep.equal(cardinalCompassPoints);
        });

        it('should set cardinalCompassPoints as a array of directions', () => {
            plateau.cardinalCompassPoints = ['T', 'E', 'S', 'T'];

            expect(plateau.cardinalCompassPoints).to.be.a('array')
            expect(plateau.cardinalCompassPoints).to.deep.equal(['T', 'E', 'S', 'T']);
        });
    });

});