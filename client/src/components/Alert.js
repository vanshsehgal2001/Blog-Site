import { connect } from "react-redux";
import React from "react";

const Alert = ({ alerts }) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    return (
      <div
        key={alert.id}
        className={`alert alert-${alert.type}`}
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        {alert.msg}
      </div>
    );
  });
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
