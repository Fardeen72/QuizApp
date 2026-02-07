export const saveGuestProgress = (courseId, percent) => {
  const existing = JSON.parse(localStorage.getItem("guestProgress") || "{}");
  existing[courseId] = Math.max(existing[courseId] || 0, percent);
  localStorage.setItem("guestProgress", JSON.stringify(existing));
  localStorage.setItem("guestQuizUsed", "true");
};

export const getGuestProgress = () => {
  return JSON.parse(localStorage.getItem("guestProgress") || "{}");
};

export const clearGuestProgress = () => {
  localStorage.removeItem("guestProgress");
  localStorage.removeItem("guestQuizUsed");
};

export const hasUsedGuestQuiz = () => {
  return localStorage.getItem("guestQuizUsed") === "true";
};
