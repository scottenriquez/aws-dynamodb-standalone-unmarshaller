const expect = require('chai').expect;
const unmarshaller = require('../Unmarshaller');

describe('unmarshaller', () => {
    it('should remove string attribute types', () => {
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
            property3: 'property3'
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove number attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'N': '55.2'
            },
            "property2": {
                'N': '58'
            },
            'property3': {
                'N': '-12'
            }
        };
        const expectedOutput = {
            property1: 55.2,
            property2: 58,
            property3: -12
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove boolean attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'BOOL': 'true'
            },
            "property2": {
                'BOOL': 'TRUE'
            },
            'property3': {
                'BOOL': false
            },
            'property4': {
                'BOOL': null
            },
            'property5': {
                'BOOL': 'null'
            },
        };
        const expectedOutput = {
            property1: true,
            property2: true,
            property3: false,
            property4: false,
            property5: false
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove binary attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'B': 'aGVsbG93b3JsZA=='
            }
        };
        const expectedOutput = {
            property1: Buffer.from('aGVsbG93b3JsZA==')
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove string set attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'SS': ['one', 'two', 'three']
            }
        };
        const expectedOutput = {
            property1: ['one', 'two', 'three']
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove number set attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'NS': ['1', '22.2', '-3']
            }
        };
        const expectedOutput = {
            property1: [1, 22.2, -3]
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('should remove binary set attribute types', () => {
        //arrange
        const inputDynamoDBObject = {
            'property1': {
                'BS': ['aGVsbG93b3JsZA==']
            }
        };
        const expectedOutput = {
            property1: [Buffer.from('aGVsbG93b3JsZA==')]
        };

        //act
        const actualOutput = unmarshaller.output(inputDynamoDBObject);

        //assert
        expect(actualOutput).to.deep.equal(expectedOutput);
    });
});