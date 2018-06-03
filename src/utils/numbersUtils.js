const numberUtils = {};

/**
 * Convert the given number to fixed two digit 
 * floating point number and return it
 * 
 * @param {Number} number 
 */
numberUtils.toTwoFixedDecimal = (number) => {
    if (isNaN(number)) {
        return 0;
    }
    return parseFloat(Math.round((number) * 1000) / 1000).toFixed(2);
}


export default numberUtils;