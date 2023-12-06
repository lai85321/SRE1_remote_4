const model = require("./model");
const { faker } = require("@faker-js/faker");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const createFakeData = async (req, res) => {
  try {
    let data = [];
    const num = parseInt(req.query.num);
    for (let i = 0; i < num; i++) {
      let logistics = {};
      let date = faker.date.past();
      let tracking_status = getRandomInt(8);
      logistics.tracking_status = tracking_status;
      logistics.estimated_delivery = date;
      logistics.recipentId = getRandomInt(17) + 1234;
      logistics.currentId = getRandomInt(15) + 1;
      logistics.history = [];
      if (tracking_status != 0) {
        let historyNum = getRandomInt(2) + 1;
        for (let j = 0; j <= historyNum; j++) {
          let history = {};
          date = faker.date.past();
          history.date = date;
          history.status = getRandomInt(8);
          history.locationId = getRandomInt(15);
          logistics.history.push(history);
          console.log(history);
        }
      }
      data.push(logistics);
    }
    model.createFakeData(data);
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
  }
};

const queryData = async (req, res) => {
  try {
    const sno = parseInt(req.query.sno);
    let data = {};
    let logisticsRes = await model.getLogisticsList(sno);
    if (logisticsRes.length === 0) {
      return res
        .status(400)
        .send({ error: `There is no data for sno: ${sno}` });
    }
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
    let response = {};
    const data = await model.getReportList();
    if (data.length === 0) {
      return res.status(400).send({ error: `There is no data for report` });
    }
    console.log(data);
    response.createdAt = Date.now();
    response.trackingSummary = data;
    return res.status(200).send({ data: response });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createFakeData,
  queryData,
  report,
};
