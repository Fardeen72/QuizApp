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
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Html from "./components/Questions/Html.jsx";
import Card from "./components/Cards/Card.jsx";
import ReactQuesion from "./components/Questions/React.jsx";
import Css from "./components/Questions/Css.jsx";
import JS from "./components/Questions/js.jsx";
import PythonQuestion from "./components/Questions/Python.jsx";
import JavaQuestion from "./components/Questions/Java.jsx";
import HtmlLearn from "./components/Questions/HtmlLearn.jsx";
import CssLearn from "./components/Questions/CssLearn.jsx";
import JsLearn from "./components/Questions/Jslearn.jsx";
import ReactLearn from "./components/Questions/Reactlearn.jsx";
import PythonLearn from "./components/Questions/Pythonlearn.jsx";
import JavaLearn from "./components/Questions/Javalearn.jsx";
import LoginButton from "./components/Contact/LoginWithgoogle.jsx";
import NavbarProfile from "./components/Contact/LoginWithgoogle.jsx";
import Leaderboard from "./leaderbord.jsx";
import CoursesCard from "./components/Tutorials/Tutorials.jsx";
import ChallengePage from "./components/Home/Addon.jsx";
import BlogPage from "./blog.jsx";
import TailwindLearn from "./components/Questions/tailwindlearn.jsx";
import GitGithubLearn from "./components/Questions/Gitlearn.jsx";
import FirebaseLearn from "./components/Questions/Firebase.jsx";
import QuizCard from "./components/Cards/Card.jsx";
import DSALearn from "./components/Questions/dsalearn.jsx";
import NodeLearn from "./components/Questions/Nodelean.jsx";
import RESTLearn from "./components/Questions/Restlrarn.jsx";
import NodeQuiz from "./components/Questions/Node.jsx";
import TailwindQuiz from "./components/Questions/tailwind.jsx";
import MongodbQuiz from "./components/Questions/mongo.jsx";
import SqlLearn from "./components/Tutorials/sqllearn.jsx";
import MongoDBLearn from "./components/Tutorials/monogodblearn.jsx";
import TypeScriptLearn from "./components/Tutorials/typescriptlearm.jsx";
import RestApiQuiz from "./components/Questions/RestApi.jsx";
import CheatsheetsPage from "./components/cheatsheet.jsx";
import Compountes from "./components/Compountes.jsx";
import QuizzCard from "./components/Cards/Card.jsx";
import TutorialsCard from "./components/Tutorials/Tutorials.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="loginbutton" element={<NavbarProfile />} />
      <Route path="challenge" element={<ChallengePage />} />
      <Route path="htmllearn" element={<HtmlLearn />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="leaderboard" element={<Leaderboard />} />
  
      <Route path="tutorials" element={<TutorialsCard />} />
      <Route path="csslearn" element={<CssLearn />} />
      <Route path="jslearn" element={<JsLearn />} />
      <Route path="reactlearn" element={<ReactLearn />} />
      <Route path="quizzses" element={<HtmlLearn />} />
       <Route path="sqllearn" element={<SqlLearn />} />
      <Route path="html" element={<Html />} />
      <Route path="react" element={<ReactQuesion />} />
      <Route path="css" element={<Css />} />
      <Route path="js" element={<JS />} />
      <Route path="tailwindlearn" element={<TailwindLearn />} />
      <Route path="java" element={<JavaQuestion />} />
      <Route path="javalearn" element={<JavaLearn />} />
      <Route path="python" element={<PythonQuestion />} />
      <Route path="pythonlearn" element={<PythonLearn />} />
      <Route path="gitgithublearn" element={<GitGithubLearn />} />
      <Route path="firebaselearn" element={<FirebaseLearn />} />
      <Route path="dsalearn" element={<DSALearn />} />
      <Route path="nodelearn" element={<NodeLearn />} />
      <Route path="restapilearn" element={<RESTLearn />} />
      <Route path="nodequiz" element={<NodeQuiz />} />
      <Route path="tailwind" element={<TailwindQuiz />} />
      <Route path="mongodbquiz" element={<MongodbQuiz />} />
        <Route path="typescriptlearn" element={<TypeScriptLearn/>} />
       <Route path="mongodblearn" element={<MongoDBLearn/>} />
         <Route path="cheatsheet" element={<CheatsheetsPage/>} />
        <Route path="restquiz" element={<RestApiQuiz/>} />
         <Route path="components" element={<Compountes/>} />
           <Route path="cards" element={<QuizzCard/>} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
