const data = require('../sample-data.json');
const server = require('../server');

function signupTestUserAndApp(app) {
  async function createUsers() {
    if (data.SUser) {
      data.SUser.forEach((value) => {
        app.models.SUser.findOrCreate({ where: { username: value.username } }, value).then((inst) => {
          console.log(`User registered: id=${inst.id} username=${inst.username} password=${inst.password}`);
          app.models.Role.create({ name: 'admin' }).then((role) => {
            console.log(`Role created: id=${role.id} name=${role.name}`);
            role.principals.create({
              principalType: app.models.RoleMapping.USER,
              principalId: inst.id,
            }).then((principal) => {
              console.log(`Principal assigned: id=${principal.id} principalId=${principal.principalId}`);
            });
          });
        });
      });
    }
  }

  async function createSample(name) {
    try {
      for (let value of data[name]) {
        const model = app.loopback.findModel(app.models[name]);
        const condition = value.id ? { id: value.id } : value;
        const inst = await model.findOne({ where: condition });
        if (!inst) {
          const obj = await model.create(value);
          console.log(`${name} created: ${JSON.stringify(obj)}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return Promise.all([
    // createUsers(),
  ]);
}

module.exports = signupTestUserAndApp;
