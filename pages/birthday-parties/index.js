/* eslint-disable no-undef */
import AboutUs from "components/Camp/AboutUs";
import BirthdayExtra from "components/Camp/BirthdayExtra";
import BirthdayPackage from "components/Camp/BirthdayPackage";
import FootballSkill from "components/Camp/FootballSkill";
import QNA from "components/Camp/QNA";
import ImageGallery from "components/Homepage/ImageGallery";
import Testimonial from "components/Testimonial";
import DefaultLayout from "layout/DefaultLayout";
import BookTrialParty from "pages/birthday-parties/components/BookTrialParty";
import React, { useRef, useState } from "react";
import siteService from "services/siteService";
import Quote from "components/Quote";
// import Spinner from "component/Spinner";

function BirthdayParty({ data, listSite }) {
  //! state
  const [preferedPackage, setPreferedPackage] = useState("");
  const ref = useRef();

  //! useEffect
  saveList(listSite);
  //! function
  //scroll to enquire section when book button clicked
  function handleScroll() {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  }

  //set prefered package when book button clicked
  function clickPreferedButton(packageTitle) {
    // console.log(packageTitle, 'packageTitle');
    setPreferedPackage(packageTitle);
  }

  return (
    <DefaultLayout seo={data.seoMeta}>
      <AboutUs data={data?.about || {}} />
      <div className="qoute-birthday">
        <Quote data={data?.about2 || {}} />
      </div>

      <div className="birthday-review">
        <Testimonial data={data?.testimonial || {}} textColor={"white"} />
      </div>
      <div className="football-birthday">
        <FootballSkill data={data?.skillGain || {}} />
      </div>

      <BirthdayPackage
        onClick={(preferedPackage) => {
          handleScroll();
          clickPreferedButton(preferedPackage);
        }}
        data={data?.package || {}}
      />

      <BirthdayExtra
        partyInclude={data?.partyInclude || {}}
        partyOptional={data?.partyOptional || {}}
      />

      <BookTrialParty
        ref={ref}
        parentFb={data?.parentFb || {}}
        package={data?.package || {}}
        preferedPackage={preferedPackage}
        listSite={listSite || []}
      />

      <div className="birthday-gallery">
        <ImageGallery
          title={
            "Check out some snaps from our previous Football Birthday Parties"
          }
          gallery={data?.gallery || {}}
          gallery2={data?.gallery2 || {}}
        />
      </div>
      <div className="faq-birthday">
        <QNA data={data?.faq || []} />
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const listRes = await siteService.getListSite();
  const listSite = listRes.data.data.lstSite;

  const siteDetail = await siteService.getDetailSite({
    id: listSite[0].ms_id,
    cate: 15,
  });

  const data = siteDetail.data.data;

  return { props: { data, listSite } };
}

export default BirthdayParty;
