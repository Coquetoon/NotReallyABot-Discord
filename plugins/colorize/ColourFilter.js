const ColourFilter = {}

function splitLines(arr, separator, maxPerLine) {
    if (arr) {
        return rolesArr.splice(0, maxPerLine).join(separator).concat(splitLines());
    }
    return arr;
}

ColourFilter.mentionAll = function (roles, separator='', maxPerLine=-1) {
        if (typeof separator !== 'string') throw new ValueError("The separator must be a string");
        if (maxPerLine === 0) throw new ValueError("maxPerLine can't be 0");

        rolesArr = roles.map(r => r.toString());

        if (maxPerLine < 0)
            return rolesArr.join(separator)
        else
            return splitLines(rolesArr, separator, maxPerLine).join('\n');
}

module.exports = ColourFilter;
