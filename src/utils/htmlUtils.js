const htmlUtils = {};

/**
 * Replace all the keys passed in keyvaluepair 
 * with its matching values in the template
 * 
 * @param {String} template 
 * @param {Object} keyValuePair 
 */
//this function is can be modified/replaced if apllication uses templating frameworks like handlebar/Mustache 
htmlUtils.replaceTemplate = (template, keyValuePair) => {
    for (let key in keyValuePair) {
        let regEx = new RegExp('\{\{(?:\\s+)?(' + key + ')(?:\\s+)?\}\}');
        template = template.replace(regEx, keyValuePair[key]);
    }
    return template;
}

export default htmlUtils;