import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Layout from "./Layout.jsx";

// Core pages
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";

// Quiz pages
import Html from "./components/Questions/Html.jsx";
import Css from "./components/Questions/Css.jsx";
import Js from "./components/Questions/Js.jsx";
import ReactQuestion from "./components/Questions/React.jsx";
import PythonQuestion from "./components/Questions/Python.jsx";
import JavaQuestion from "./components/Questions/Java.jsx";
import NodeQuiz from "./components/Questions/Node.jsx";
import TailwindQuiz from "./components/Questions/tailwind.jsx";
import MongodbQuiz from "./components/Questions/mongo.jsx";
import RestApiQuiz from "./components/Questions/RestApi.jsx";

// Learn pages
import HtmlLearn from "./components/Questions/HtmlLearn.jsx";
import CssLearn from "./components/Questions/CssLearn.jsx";
import JsLearn from "./components/Questions/Jslearn.jsx";
import ReactLearn from "./components/Questions/Reactlearn.jsx";
import PythonLearn from "./components/Questions/Pythonlearn.jsx";
import JavaLearn from "./components/Questions/Javalearn.jsx";
import TailwindLearn from "./components/Questions/tailwindlearn.jsx";
import GitGithubLearn from "./components/Questions/Gitlearn.jsx";
import FirebaseLearn from "./components/Questions/Firebase.jsx";
import DSALearn from "./components/Questions/dsalearn.jsx";
import NodeLearn from "./components/Questions/Nodelean.jsx";
import RESTLearn from "./components/Questions/Restlrarn.jsx";

// Cards & content
import QuizCard from "./components/Cards/Card.jsx";
import TutorialsCard from "./components/Tutorials/Tutorials.jsx";

// Other pages
import Leaderboard from "./leaderbord.jsx";
import BlogPage from "./blog.jsx";
import ChallengePage from "./components/Home/Addon.jsx";
import CheatsheetsPage from "./components/cheatsheet.jsx";
import Compountes from "./components/Compountes.jsx";
import NavbarProfile from "./components/Contact/LoginWithgoogle.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<NavbarProfile />} />
      <Route path="challenge" element={<ChallengePage />} />

      {/* Learn */}
      <Route path="htmllearn" element={<HtmlLearn />} />
      <Route path="csslearn" element={<CssLearn />} />
      <Route path="jslearn" element={<JsLearn />} />
      <Route path="reactlearn" element={<ReactLearn />} />
      <Route path="pythonlearn" element={<PythonLearn />} />
      <Route path="javalearn" element={<JavaLearn />} />
      <Route path="tailwindlearn" element={<TailwindLearn />} />
      <Route path="gitgithublearn" element={<GitGithubLearn />} />
      <Route path="firebaselearn" element={<FirebaseLearn />} />
      <Route path="dsalearn" element={<DSALearn />} />
      <Route path="nodelearn" element={<NodeLearn />} />
      <Route path="restapilearn" element={<RESTLearn />} />

      {/* Quiz */}
      <Route path="html" element={<Html />} />
      <Route path="css" element={<Css />} />
      <Route path="js" element={<Js />} />
      <Route path="react" element={<ReactQuestion />} />
      <Route path="python" element={<PythonQuestion />} />
      <Route path="java" element={<JavaQuestion />} />
      <Route path="nodequiz" element={<NodeQuiz />} />
      <Route path="tailwind" element={<TailwindQuiz />} />
      <Route path="mongodbquiz" element={<MongodbQuiz />} />
      <Route path="restquiz" element={<RestApiQuiz />} />

      {/* Other */}
      <Route path="tutorials" element={<TutorialsCard />} />
      <Route path="cards" element={<QuizCard />} />
      <Route path="cheatsheet" element={<CheatsheetsPage />} />
      <Route path="components" element={<Compountes />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="blog" element={<BlogPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);