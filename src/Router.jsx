import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="loginbutton" element={<NavbarProfile />} />
      <Route path="addon" element={<ChallengePage />} />
      <Route path="htmllearn" element={<HtmlLearn />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="card" element={<QuizCard />} />
      <Route path="tutorials" element={<QuizCard />} />
      <Route path="csslearn" element={<CssLearn />} />
      <Route path="jslearn" element={<JsLearn />} />
      <Route path="reactlearn" element={<ReactLearn />} />
      <Route path="quizzes" element={<HtmlLearn />} />
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
    </Route>,
  ),
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)