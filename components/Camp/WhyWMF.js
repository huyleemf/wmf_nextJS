import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Utils from "common/Utils";
import { useDispatch, useSelector } from "react-redux";
import ModelManager from "common/ModelManager";
import _ from "lodash";
import { getDetailSite } from "redux/actions/detailSiteAction";

WhyWMF.propTypes = {
  data: PropTypes.object,
};

export default function WhyWMF(props) {
  let replaceContent = "";

  // useEffect(() => {
  //   props.data.cfg_value.map((item, index) => {
  //     if (item.des.includes("of &pound;XXX") || item.des.includes("of £XXX")) {
  //       console.log(item.des);
  //     }
  //   });
  // }, []);

  return (
    <div className="why-wmf">
      {props.data && (
        <div className="container">
          <h2 className="heading">{props.data.cfg_title}</h2>
          <div className="row">
            {props.data.cfg_value &&
              props.data.cfg_value.map((item, index) => {
                const temp = { ...item };

                return (
                  <div className="col-4" key={index}>
                    <div className="list-item">
                      <div className="list-number">{index + 1}</div>
                      <h3>{temp.title}</h3>
                      <p>{temp.des}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
