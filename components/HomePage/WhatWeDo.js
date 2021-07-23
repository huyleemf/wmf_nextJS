import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import Testimonial from "components/Testimonial";
import Gallery from "./ImageGallery";
import type from "redux/actions/actionTypes";
import Utils from "common/Utils";
import PropTypes from "prop-types";
import Link from "next/link";
import PathRoute from "common/PathRoute";
import useEqualElement from "hooks/useEqualElement";
import TrustPilot from "components/TrustPilot";

WhatWeDo.propTypes = {
  gallery: PropTypes.object,
};

const ROUTE = [PathRoute.WeeklyTraining, PathRoute.HolidayCamp];

function WhatWeDo(props) {
  const { whatWeDo, testimonial, gallery, gallery2 } = props;
  const refListItem = useRef(null);
  const [showTrustBox, setShowTrustBox] = useState(false);

  useEffect(() => {
    // console.log(props, "aaa");
    // if (homeReducer.type) {
    //   if (homeReducer.type === type.GET_HOME_SUCCESS) {
    //     setWhatWeDo(homeReducer.data.whatWeDo);
    //   }
    // }
  }, []);

  useEqualElement(refListItem);

  function handleTrustBox() {
    setShowTrustBox(true);
  }

  return (
    <Fragment>
      <div
        style={{
          display: showTrustBox ? "flex" : "none",
          justifyContent: "center",
          position: "fixed",
          zIndex: 1000,
          top: 0,
        }}
      >
        <TrustPilot />
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#8685854f",
          }}
          onClick={() => {
            setShowTrustBox(false);
          }}
        ></div>
      </div>
      <div className="container">
        <h2 className="heading-w">What we do</h2>
        <p className="text-1">{whatWeDo.cfg_des}</p>
      </div>
      <div className="box-bg-orange">
        <div className="container">
          <div className="list-item-card-2">
            <div className="row" ref={refListItem}>
              {whatWeDo.cfg_value &&
                whatWeDo.cfg_value.map((item, index) => (
                  <div className="col-6" key={index}>
                    <div className="item">
                      <img
                        alt=""
                        src={Utils.getThumb(item.icon)}
                        className="img"
                      />
                      <h3 className="title">{item.title}</h3>
                      <p className="description">{item.des}</p>
                      <Link href={ROUTE[index]} passHref>
                        <a className="more">MORE INFORMATION</a>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* box slide review */}
        <Testimonial
          data={testimonial}
          handleTrustBox={() => handleTrustBox()}
          textColor={"white"}
        />

        <div className="homepage-gallery">
          <Gallery gallery={gallery} gallery2={gallery2} />
        </div>
      </div>
    </Fragment>
  );
}

export default WhatWeDo;
