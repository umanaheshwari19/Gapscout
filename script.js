document.getElementById("assessmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const tech = parseInt(document.getElementById("tech").value);
  const resume = document.getElementById("resume").value;
  const comm = parseInt(document.getElementById("comm").value);
  const projects = document.getElementById("projects").value;
  const confidence = parseInt(document.getElementById("confidence").value);

  let score = 0;

  // Scoring logic
  score += tech * 5; // max 25
  score += comm * 5; // max 25

  score += resume === "yes" ? 15 : 5;

  if (projects === "0") score += 5;
  else if (projects === "1") score += 15;
  else score += 20;

  // Mock interview practice assumed from confidence
  score += confidence * 3; // max 15

  if (score > 100) score = 100;

  let level = "Beginner";
  let timeline = "4–6 weeks";

  if (score > 70) {
    level = "Interview Ready";
    timeline = "1 week (final polish)";
  } else if (score > 40) {
    level = "Intermediate";
    timeline = "2–3 weeks";
  }

  // Confidence vs Readiness Gap
  const confidencePercent = confidence * 20; // convert 1–5 to 20–100
  let gapMessage = "";

  if (confidencePercent > score) {
    gapMessage = "You feel more confident than your readiness score suggests. Consider doing more mock interviews and technical revision.";
  } else if (confidencePercent < score) {
    gapMessage = "You may be underestimating yourself. With a bit of practice, you can perform better in interviews.";
  } else {
    gapMessage = "Your confidence matches your readiness well. Keep it up!";
  }

  // Checklist
  let checklist = [];
  if (tech < 3) checklist.push("Revise core technical concepts.");
  if (comm < 3) checklist.push("Practice explaining your projects out loud.");
  if (resume === "no") checklist.push("Improve your resume using an ATS-friendly format.");
  if (projects === "0") checklist.push("Build at least one mini project.");
  if (checklist.length === 0) checklist.push("Do 1–2 mock interviews to polish your performance.");

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h3>Your Interview Readiness</h3>
    <p><strong>Score:</strong> ${score}/100</p>
    <p><strong>Level:</strong> ${level}</p>
    <p><strong>Estimated Timeline to be Ready:</strong> ${timeline}</p>
    <p><strong>Confidence vs Readiness:</strong> ${gapMessage}</p>
    <p><strong>Next Steps:</strong></p>
    <ul>
      ${checklist.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
});
