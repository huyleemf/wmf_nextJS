import BookTrial from "components/Booking/BookTrial";
import QNA from "components/Camp/QNA";
import Intro from "components/Homepage/Intro";
import Testimonial from "components/Testimonial";
import saveList from "hooks/useSaveList";
import DefaultLayout from "layout/DefaultLayout";
import React from "react";
import siteService from "services/siteService";
import BannerTop from "./components/BannerTop";
import CoachInfo from "./components/CoachInfo";
import CoachTeam from "./components/CoachTeam";
import RelateAreas from "./components/RelateAreas";
import TrainingReason from "./components/TrainingReason";
import TrainingService from "./components/TrainingService";

function Franchise({ data, listSite }) {
  saveList(listSite);
  //

  return (
    <DefaultLayout seo={data.seoMeta}>
      <div className="banner-franchise">
        <BannerTop social={data?.social || []} site={data?.site || {}} />
      </div>
      <div className="coaching-franchise">
        <CoachInfo coach={data?.coach || {}} />
      </div>
      <div className="franchise-review">
        <div className="intro-franchise">
          <Intro
            intro={data?.homeIntro?.cfg_value || []}
            weeklyCost={data?.site?.weeklyCost}
            minWeeklyCost={data?.site?.minWeeklyCost}
          />
        </div>
        <Testimonial
          data={data.testimonial || []}
          style={{}}
          textColor={"white"}
        />
      </div>
      <div className="franchise-servive">
        <TrainingService
          site={data?.site || {}}
          service={data?.service || {}}
        />
      </div>
      <div className="franchise-reason">
        <TrainingReason reason={data?.footballBegining || {}} />
      </div>
      <CoachTeam staff={data?.coach?.staff || []} site={data?.site || {}} />
      <BookTrial parentFb={data?.parentFb} />
      <div className="faq-weekly">
        <QNA data={data?.faq || []} />
      </div>
      <RelateAreas site={data?.site || {}} article={data?.article || {}} />
    </DefaultLayout>
  );
}

export async function getStaticPaths() {
  const res = await siteService.getListSite();
  const list = res.data.data.lstSite;

  // Get the paths we want to pre-render based on posts
  const paths = list.map((item) => ({
    params: { franchise: item.ms_alias },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await siteService.getListSite();
  const listSite = res.data.data.lstSite;
  const item = listSite.find((item) => params.franchise === item.ms_alias);

  const dataRes = await siteService.getFranchiseDetail({ id: item.ms_id });

  return {
    props: { data: dataRes.data.data, listSite }, // will be passed to the page component as props
  };
}

export default Franchise;
