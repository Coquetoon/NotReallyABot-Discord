const ColourFilter = {}

function splitLines(arr, separator, maxPerLine) {
    if (arr.length > 0) {
        return Array(arr.splice(0, maxPerLine).join(separator))
               .concat(splitLines(arr, separator, maxPerLine));
    }
    return arr;
}

function containsPrefix(role) {
    const client = role.client;

    for (index in client.config.colourPrefixes) {
        if (role.name.startsWith(client.config.colourPrefixes[index])) {
            return true;
        }
    }
    return false;
}

function sortRoles(a, b) {
    return b[0] - a[0];
}

ColourFilter.filter = function(roles) {
    return roles.filter(r => containsPrefix(r) && r.color !== 0);
}

ColourFilter.mentionAll = function (heading,
                                    roles,
                                    sorted=False,
                                    separator='',
                                    maxPerLine=-1) {
        if (typeof separator !== 'string') throw new ValueError("The separator must be a string");
        if (maxPerLine === 0) throw new ValueError("maxPerLine can't be 0");

        let rolesArr;
        var separatedMessages = [];

        if (sorted) {
            unsortedRolesArr = roles.map(r => [r.position, r.toString()]);
            rolesArr = unsortedRolesArr.sort(sortRoles).map(r => r[1]);
        } else {
            rolesArr = roles.map(r => r.toString());
        }
        if (rolesArr.length === 0) {
            separatedMessages.push(heading);
            return separatedMessages;
        }

        var headingLength = heading.length;
        const roleTagLength = rolesArr[0].length;
        const rolesAmount = 60;
        const loops = Math.ceil(rolesArr.length/rolesAmount);

        for (var index = 0; index < loops; index++) {
            let content;
            let parts = rolesArr.splice(0, rolesAmount);

            if (maxPerLine < 0)
                content = parts.join(separator);
            else
                content = splitLines(parts, separator, maxPerLine).join('\n\n');

            if (separatedMessages.length === 0) {
                content = heading + content;
            }

            separatedMessages.push(content);
        }

        return separatedMessages;
}

module.exports = ColourFilter;
