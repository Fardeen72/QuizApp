import { auth, db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const updateCourseProgress = async (courseId, scorePercent) => {
  const user = auth.currentUser;
  if (!user) return;

  let increment = 5;
  if (scorePercent >= 90) increment = 30;
  else if (scorePercent >= 70) increment = 20;
  else if (scorePercent >= 40) increment = 10;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const current = snap.data().progress?.[courseId] || 0;
  const newValue = Math.min(100, current + increment);

  await updateDoc(ref, {
    [`progress.${courseId}`]: newValue,
  });
};
