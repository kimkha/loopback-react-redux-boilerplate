const baseUser = require('loopback/common/models/user');

module.exports = function (User) {
  baseUser(User);

  const app = require('../server');

  const findRoles = async (user) => {
    const roleMappings = await app.models.RoleMapping.find({ where : { principalId: user.id }});
    const roleIds = roleMappings.map(m => m.roleId).filter((m, idx, arr) => arr.indexOf(m) === idx); // Find unique roleId
    const conditions = roleIds.map(roleId => ({ id: roleId })); // Format for where condition
    const roleList = await app.models.Role.find({ where: { or: conditions}});

    const roles = roleList.map(role => role.name) // Only return roleName
      .filter((m, idx, arr) => arr.indexOf(m) === idx); // Remove duplicate

    const result = Object.assign({}, user.toJSON(), { roles });
    delete result.password;
    return result;
  };

  User.me = (req, cb) => {
    const { user } = req;
    findRoles(user).then(result => cb(null, result)).catch(error => cb(error));
  };

};
