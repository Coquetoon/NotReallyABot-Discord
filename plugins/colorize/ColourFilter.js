const Config = require('../../config.js')

const ColourFilter = {}

function splitLines(arr, separator, maxPerLine) {
    if (arr.length > 0) {
        return Array(arr.splice(0, maxPerLine).join(separator))
               .concat(splitLines(arr, separator, maxPerLine));
    }
    return arr;
}

function containsPrefix(role) {
    for (index in Config.colourPrefixes) {
        if (role.name.startsWith(Config.colourPrefixes[index])) {
            return true;
        }
    }
    return false;
}

ColourFilter.filter = function(roles) {
    return roles.filter(r => containsPrefix(r) && r.color !== 0);
}

ColourFilter.mentionAll = function (roles, separator='', maxPerLine=-1) {
        if (typeof separator !== 'string') throw new ValueError("The separator must be a string");
        if (maxPerLine === 0) throw new ValueError("maxPerLine can't be 0");

        rolesArr = roles.map(r => r.toString());

        if (maxPerLine < 0)
            return rolesArr.join(separator)
        else
            return splitLines(rolesArr, separator, maxPerLine).join('\n\n');
}

module.exports = ColourFilter;
