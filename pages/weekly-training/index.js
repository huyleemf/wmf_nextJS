import BookTrial from "components/Booking/BookTrial";
import AboutInfo from "components/Camp/AboutInfo";
import AboutSecure from "components/Camp/AboutSecure";
import AboutUs from "components/Camp/AboutUs";
import FootballSkill from "components/Camp/FootballSkill";
import InstaBox from "components/Camp/InstaBox";
import QNA from "components/Camp/QNA";
import TrainingInclude from "components/Camp/TrainingInclude";
import WhyWMF from "components/Camp/WhyWMF";
import Testimonial from "components/Testimonial";
import saveList from "hooks/useSaveList";
import DefaultLayout from "layout/DefaultLayout";
import React from "react";
import siteService from "services/siteService";

function WeeklyTraining({ data, listSite }) {
  saveList(listSite);

  return (
    <DefaultLayout seoMeta={data.seoMeta}>
      <AboutUs data={data?.about || {}} />

      <div className="about-info-weekly">
        <AboutInfo lstAcademy={listSite || []} />
      </div>

      <div className="about-secure-weekly">
        <AboutSecure data={data?.academyIntro || []} />
      </div>

      <div className="background-weekly">
        <TrainingInclude data={data?.eachWeek || {}} />

        <Testimonial
          data={data?.testimonial || {}}
          style={"change-color"}
          textColor={"orange"}
        />
      </div>

      <div className="football-weekly">
        <FootballSkill data={data?.skillGain || {}} />
      </div>

      <WhyWMF data={data?.whyWMF || {}} />

      <div className="booking-weekly">
        <BookTrial parentFb={data?.parentFb || {}} />
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
    cate: 6,
  });

  const data = siteDetail.data.data;

  return { props: { data, listSite } };
}

export default WeeklyTraining;
