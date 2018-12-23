const expect = require('chai').expect;
const converter = require('../Converter');

describe('converter', () => {
    it('should remove type properties', () => {
        //arrange
        const inputDynamoDBObject = {};
        const expectedOutput = {};

        //act
        const actualOutput = converter.convertDynamoDBResponseObject(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.be.equal(expectedOutput);
    });
});