class Prefix {
  constructor(name, { separateBySpace = false, caseSensitive = false } = {}) {
    if (/ /.name) throw new Error(`The prefix can't contain space. Got '${name}'`);

    this.name = name;
    this.separateBySpace = separateBySpace;
    this.caseSensitive = caseSensitive;
  }

  containedIn(content) {
    const prefix = this.name;
    const prefixMatch = /[^\s]+/.exec(content.slice(0, prefix.length));
    const contentPrefix = prefixMatch[0];

    const contained = compare(contentPrefix);

    return contained;
  }

  compare(content) {
    if (this.caseSensitive) {
      return prefix.toLowerCase() === contentPrefix.toLowerCase();
    }

    return prefix === content;
  }
}

exports.default = Prefix;
