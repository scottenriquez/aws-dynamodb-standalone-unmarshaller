const expect = require('chai').expect;
const unmarshaller = require('../Unmarshaller');

describe('unmarshaller', () => {
    it('should remove string type properties', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'S': 'property1'
            },
            "property2": {
                'S': 'property2'
            },
            'property3': {
                'S': 'property3'
            }
        };
        const expectedOutput = {
            property1: 'property1',
            property2: 'property2',
            property3: 'property3',
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);
        console.log(actualOutput);
        console.log(expectedOutput);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });
});