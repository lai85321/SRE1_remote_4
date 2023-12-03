const model = require("./model");
const { faker } = require("@faker-js/faker");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const createFakeData = async (req, res) => {
  try {
    let data = [];
    console.log(req.query.num);
    const num = parseInt(req.query.num);
    console.log(num);
    for (let i = 0; i < num; i++) {
      let logistics = {};
      let date = faker.date.past();
      logistics.tracking_status = getRandomInt(8);
      logistics.estimated_delivery = date;
      logistics.recipentId = getRandomInt(17) + 1234;
      logistics.currentId = getRandomInt(15) + 1;
      logistics.history = [];
      if (logistics.tracking_status != 0) {
        let historyNum = getRandomInt(2) + 1;
        for (let j = 0; j <= historyNum; j++) {
          let history = {};
          date = faker.date.past();
          history.date = date;
          history.status = getRandomInt(8);
          history.locationId = getRandomInt(15);
          logistics.history.push(history);
        }
      }
      data.push(logistics);
    }

    return res.status(200).send({});
  } catch (err) {
    console.log(err);
  }
};

const queryData = async (req, res) => {
  try {
    const sno = parseInt(req.query.sno);
    let data = {};
    let logisticsRes = await model.getLogisticsList(sno);
    let historyRes = await model.getHistoryList(sno);
    data = logisticsRes[0];
    data.history = historyRes;
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

const report = async (req, res) => {
  try {
    return res.status(200).send({});
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createFakeData,
  queryData,
  report,
};