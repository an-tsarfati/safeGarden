const KindergardenClass = require('./../models/kindergarden.model');
const factory = require('./handler.controller');

exports.getAllKindergardenClasss = factory.getAll(KindergardenClass);
exports.getKindergardenClass = factory.getOne(KindergardenClass);
exports.createKindergardenClass = factory.createOne(KindergardenClass);
exports.updateKindergardenClass = factory.updateOne(KindergardenClass);
exports.deleteKindergardenClass = factory.deleteOne(KindergardenClass);
