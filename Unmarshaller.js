/**
 * @param input [object] marshalled object
 * @returns {*} unmarshalled object
 */
output = (input) => {
    return unmarshall({'M': input});
};

/**
 * @api private
 * @param input [object] marshalled object
 * @returns {*} unmarshalled object
 */
unmarshall = (input) => {
    let list, map, index;
    for (let type in input) {
        const values = input[type];
        if (type === 'M') {
            map = {};
            for (let key in values) {
                map[key] = unmarshall(values[key]);
            }
            return map;
        }
        else if (type === 'L') {
            list = [];
            for (index = 0; index < values.length; index++) {
                list.push(unmarshall(values[index]));
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
                list.push(Buffer.from(values[index]));
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
            return Buffer.from(values);
        }
        else if (type === 'BOOL') {
            return (values === 'true' || values === 'TRUE' || values === true);
        }
        else if (type === 'NULL') {
            return null;
        }
    }
};

/**
 * @api private
 * @param number [String]
 * @returns {number}
 */
convertNumber = (number) => {
    return Number(number);
};

module.exports = {output};