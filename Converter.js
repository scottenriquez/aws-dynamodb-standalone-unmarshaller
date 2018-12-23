output = (input) => {
    return convertDynamoDBResponseObject({'M': input});
};

convertDynamoDBResponseObject = (input) => {
    let list, map, index;
    for (let type in input) {
        const values = input[type];
        if (type === 'M') {
            map = {};
            for (let key in values) {
                map[key] = convertDynamoDBResponseObject(values[key]);
            }
            return map;
        }
        else if (type === 'L') {
            list = [];
            for (index = 0; index < values.length; index++) {
                list.push(convertDynamoDBResponseObject(values[index]));
            }
            return list;
        }
        else if (type === 'SS') {
            list = [];
            for (index = 0; index < values.length; index++) {
                list.push(values[index] + '');
            }
            return list;
        }
        else if (type === 'NS') {
            list = [];
            for (index = 0; index < values.length; index++) {
                list.push(convertNumber(values[index]));
            }
            return list;
        }
        else if (type === 'BS') {
            list = [];
            for (index = 0; index < values.length; index++) {
                list.push(new Buffer(values[index]));
            }
            return list;
        }
        else if (type === 'S') {
            return values + '';
        }
        else if (type === 'N') {
            return convertNumber(values);
        }
        else if (type === 'B') {
            return Buffer(values);
        }
        else if (type === 'BOOL') {
            return (values === 'true' || values === 'TRUE' || values === true);
        }
        else if (type === 'NULL') {
            return null;
        }
    }
};

convertNumber = (number) => {
    return Number(number);
};

module.exports = {output};