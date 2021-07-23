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

const SiteNews = ({ data, listSite }) => {
  //! State
  saveList(listSite);
  //! Function

  //! Render
  return (
    <DefaultLayout>
      <AboutUs data={data?.about || {}} site={data.site} />

      <div className="about-info-weekly">
        <AboutInfo lstAcademy={listSite || []} site={data.site} />
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

      <WhyWMF data={data?.whyWMF || {}} site={data.site} />

      <div className="booking-weekly">
        <BookTrial parentFb={data?.parentFb || {}} site={data.site} />
      </div>

      <div className="insta-weekly">
        <InstaBox instaFeed={data?.instaFeed || {}} />
      </div>

      <div className="faq-weekly">
        <QNA data={data?.faq || []} />
      </div>
    </DefaultLayout>
  );
};

export async function getStaticPaths() {
  const res = await siteService.getListSite();
  const list = res.data.data.lstSite;

  // Get the paths we want to pre-render based on posts
  const paths = list.map((item) => ({
    params: { franchise: item.ms_alias },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const res = await siteService.getListSite();
  const listSite = res.data.data.lstSite;
  const item = listSite.find(
    (item) => context.params.franchise === item.ms_alias
  );

  const siteDetail = await siteService.getDetailSite({
    id: item.ms_id,
    cate: 6,
  });

  const data = siteDetail.data.data;
  return { props: { data, listSite } };
}

export default SiteNews;
