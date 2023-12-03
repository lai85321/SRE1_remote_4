const pool = require("./database");

const createFakeData = async (data) => {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    let logistics = [
      [
        data[i].tracking_status,
        new Date(data[i].estimated_delivery),
        data[i].recipentId,
        data[i].currentId,
      ],
    ];
    console.log(logistics);
    const [result] = await pool.query(
      `INSERT INTO logistics ( tracking_status_id, estimated_delivery, recipient_id, current_location_id) VALUES ?`,
      [logistics]
    );
    let historyStr = "";
    for (let j = 0; j < data[i].history.length; j++) {
      let tmp = data[i].history[j];
      historyStr += `(${result.insertId}, '${tmp.date}', '${tmp.status}', '${tmp.locationId}')`;
      let history = [
        [result.insertId, new Date(tmp.date), tmp.status, tmp.locationId],
      ];
      await pool.query(
        `INSERT INTO history ( sno, date, status, location_id) VALUES ?`,
        [history]
      );
    }
  }

  return;
};

const getLogisticsList = async (id) => {
  const sql = `SELECT l.sno, l.tracking_status_id, t.status, l.estimated_delivery, l.recipient_id , r.name,r.address,r.phone
    FROM SRE_logistic.logistics l
    left join SRE_logistic.recipient r on l.recipient_id = r.id
    left join SRE_logistic.tracking_status t on l.tracking_status_id = t.id
    WHERE l.sno=?
    ;`;
  const bind = [id];
  const [result] = await pool.query(sql, bind);
  return result;
};

const getHistoryList = async (id) => {
  const sql = `SELECT * FROM SRE_logistic.history h WHERE h.sno=? ;`;
  const bind = [id];
  const [result] = await pool.query(sql, bind);
  return result;
};

module.exports = {
  createFakeData,
  getLogisticsList,
  getHistoryList,
};
