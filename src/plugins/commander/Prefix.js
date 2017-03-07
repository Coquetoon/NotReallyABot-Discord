class Prefix {
  constructor(client, name, { separateBySpace = false, caseSensitive = false } = {}) {
    if (/ /.exec(name)) throw new Error(`The prefix can't contain space. Got '${name}'`);

    this.client = client;
    this.name = name;
    this.separateBySpace = separateBySpace;
    this.caseSensitive = caseSensitive;
  }

  containedIn(content) {
    const prefix = this.name;
    const prefixMatch = /[^\s]+/.exec(content.slice(0, prefix.length));
    const contentPrefix = prefixMatch[0];

    const contained = this.compare(contentPrefix);

    return contained;
  }

  compare(content) {
    if (this.caseSensitive) {
      return this.name.toLowerCase() === content.toLowerCase();
    }

    return this.name === content;
  }
}

module.exports = Prefix;
