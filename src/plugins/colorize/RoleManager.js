const Collection = require('discord.js').Collection;

class RoleManager {
  constructor(client) {
    this.client = client;
    this.prefixes = client.config.roles.colour.prefixes;
    this.guildsCache = new Collection();
  }

  static normalizeRoleName(name) {
    const request = name.match(/[^\W_]+/g);
    if (request == null) return null;
    return request.join('').toLowerCase();
  }

  addGuild(guild) {
    this.createGuildIfNotExists(guild);
    this.filterColorRoles(guild.roles).forEach(role => this.setRole(role));
  }

  removeGuild(guild) {
    return this.guildsCache.delete(guild.id);
  }

  createGuildIfNotExists(guild) {
    if (!this.getCachedGuild(guild)) {
      return this.guildsCache.set(guild.id, { roles: new Collection() });
    }

    return false;
  }

  setRole(role) {
    this.createGuildIfNotExists(role.guild);
    return this.colorsFromGuild(role.guild).set(RoleManager.normalizeRoleName(role.name), role);
  }

  getCachedRole(role) {
    const cachedRoles = this.colorsFromGuild(role.guild);
    if (!cachedRoles) return null;
    return cachedRoles.get(RoleManager.normalizeRoleName(role.name));
  }

  getCachedGuild(guild) {
    return this.guildsCache.get(guild.id);
  }

  updateRole(oldRole, newRole) {
    if (!this.isColorRole(newRole)) {
      // Remove old role if the new one isn't a colour anymore
      const cachedRole = this.getCachedRole(oldRole);
      if (cachedRole) this.deleteRole(oldRole);
      return null;
    }

    if (oldRole.name !== newRole.name) this.deleteRole(oldRole);

    return this.setRole(newRole);
  }

  deleteRole(role) {
    return this.colorsFromGuild(role.guild).delete(RoleManager.normalizeRoleName(role.name));
  }

  colorsFromGuild(guild) {
    return this.getCachedGuild(guild).roles;
  }

  isColorRole(role) {
    return this.prefixes.find(prefix => (role.name.startsWith(prefix))
                                        && role.name !== prefix
                                        && role.color !== 0);
  }

  filterColorRoles(roles, excluding) {
    return roles.filter(role => role !== excluding && this.isColorRole(role));
  }

  getRoleByName(guild, name) {
    const normalizedName = RoleManager.normalizeRoleName(name);
    if (normalizedName === null) return null;

    const roles = this.colorsFromGuild(guild);
    if (!roles) return null;
    return roles.get(normalizedName);
  }
}

module.exports = RoleManager;
