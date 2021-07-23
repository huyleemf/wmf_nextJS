import AboutUs from "components/Camp/AboutUs";
import FootballSkill from "components/Camp/FootballSkill";
import InstaBox from "components/Camp/InstaBox";
import QNA from "components/camp/QNA";
import WhyWMF from "components/Camp/WhyWMF";
import Intro from "components/HomePage/Intro";
// import Spinner from "component/Spinner";
import Testimonial from "components/Testimonial";
import saveList from "hooks/useSaveList";
import DefaultLayout from "layout/DefaultLayout";
import BookTrialOne from "pages/1-on-1-training/components/BookTrialOne";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import siteService from "services/siteService";
import Provide from "components/Provide";

function OneTraining({ data, listSite }) {
  saveList(listSite);
  const enquireBox = useRef(null);

  return (
    <DefaultLayout seo={data.seoMeta}>
      <div className="about-121">
        <AboutUs data={data?.about || {}} site={data.site} />
      </div>
      <div className="intro-121">
        <Intro intro={data?.trainingIntro?.cfg_value || []} />
      </div>
      <div className="football-121">
        <FootballSkill data={data?.skillGain || {}} oneTraining={true} />
      </div>
      <div className="one-training">
        <Testimonial
          data={data?.testimonial || {}}
          style={"change-color"}
          textColor={"orange"}
        />
      </div>

      <Provide site={data.site || {}} franchisePage />

      <div className="container">
        <div style={{ marginBottom: "120px" }} className="enquire">
          <p className="enquire-header">
            Enquire about 1-to-1 training for your child
          </p>
          <p style={{ marginBottom: "3rem" }}>
            Your child will thank you for it in the future
          </p>
          <Button
            onClick={() => {
              enquireBox.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
            style={{
              backgroundColor: "white",
              color: "#FF7531",
              borderRadius: 6,
              boxShadow: "none",
              border: "none",
              padding: "1.5rem 3rem",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Enquire about 1-to-1 coaching
          </Button>
        </div>
      </div>
      <div className="whywmf-121">
        <WhyWMF data={data?.whyWMF || {}} site={data.site} />
      </div>
      <div className="booking-weekly">
        <BookTrialOne
          _ref={enquireBox}
          parentFb={data?.parentFb || {}}
          site={data.site}
        />
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
    cate: 14,
  });

  const data = siteDetail.data.data;
  return { props: { data, listSite } };
}

export default OneTraining;
