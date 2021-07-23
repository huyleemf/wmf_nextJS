import React from "react";
import { useRouter } from "next/router";
import DefaultLayout from "layout/DefaultLayout";
import ErrorPage from "components/Error";

function Custom404() {
  return (
    <DefaultLayout>
      <ErrorPage />
    </DefaultLayout>
  );
}

export default Custom404;
