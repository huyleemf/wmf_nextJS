import AboutInfoCamp from "components/camp/AboutInfoCamp";
import AboutSecure from "components/camp/AboutSecure";
import AboutUs from "components/Camp/AboutUs";
import CampInclude from "components/camp/CampInclude";
import FootballSkill from "components/camp/FootballSkill";
import InstaBox from "components/camp/InstaBox";
import QNA from "components/camp/QNA";
import WhyWMF from "components/camp/WhyWMF";
import Testimonial from "components/Testimonial";
import saveList from "hooks/useSaveList";
import DefaultLayout from "layout/DefaultLayout";
import BookTrialHoliday from "pages/holiday-camps-home/components/BookTrialHoliday";
import React from "react";
import siteService from "services/siteService";

function HolidayCamp({ data, listSite }) {
  saveList(listSite);
  return (
    <DefaultLayout seo={data.seoMeta}>
      <AboutUs data={data?.about || {}} />

      <div className="about-info-holiday">
        <AboutInfoCamp />
      </div>

      <div className="about-secure-holiday">
        <AboutSecure data={data?.threeBoxes || {}} />
      </div>

      <div className="camp-review">
        <div className="about-camp-holiday">
          <CampInclude data={data?.dayCamp || {}} />
        </div>
        <Testimonial data={data?.testimonial || {}} textColor={"white"} />
      </div>

      <div className="football-holiday">
        <FootballSkill data={data?.skillGain || {}} />
      </div>

      <WhyWMF data={data?.whyWMF || {}} />

      <div className="booking-weekly">
        <BookTrialHoliday parentFb={data?.parentFb || {}} />
      </div>

      <div className="insta-weekly">
        <InstaBox instaFeed={data?.instaFeed || {}} />
      </div>

      <div className="faq-weekly">
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
    cate: 9,
  });

  const data = siteDetail.data.data;

  return { props: { data, listSite } };
}

export default HolidayCamp;
