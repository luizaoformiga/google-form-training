import React from "react";

import { DashBoard, LandingPage } from "@/components";
import { AuthService } from "@/services";

function Home() {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? <DashBoard /> : <LandingPage />;
}

export default Home;
