const params = new URLSearchParams(window.location.search);
const employeeId = (params.get("id") || "").trim();

document.getElementById("logo").src = CONFIG.LOGO_URL;

fetch(CONFIG.SHEET_URL)
.then(r => r.text())
.then(text => {

  const rows = text.trim().split(/\r?\n/).map(r =>
    r.match(/(".*?"|[^",\r\n]+)(?=\s*,|\s*$)/g)
      .map(c => c.replace(/^"|"$/g, "").trim())
  );

  const headers = rows.shift();

  const data = rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i] || "");
    return obj;
  });

  console.log(data);

  const emp = data.find(e =>
    (e["Employee ID"] || "").trim().toUpperCase() === employeeId.toUpperCase()
  );

  if (!emp) {
    document.getElementById("verifyStatus").innerHTML = "❌ EMPLOYEE NOT FOUND";
    return;
  }

  document.getElementById("verifyStatus").innerHTML = "✅ VERIFIED EMPLOYEE";

  document.getElementById("employeeid").textContent = emp["Employee ID"];
  document.getElementById("name").textContent = emp["Employee Name"];
  document.getElementById("designation").textContent = emp["Designation"];
  document.getElementById("blood").textContent = emp["Blood Group"];
  document.getElementById("mobile").textContent = emp["Mobile Number"];
  document.getElementById("joining").textContent = emp["Joining Date"];
  document.getElementById("status").textContent = emp["Status"];

  if (emp["Photo Link"]) {
    document.getElementById("photo").src = emp["Photo Link"];
  } else {
    document.getElementById("photo").src = CONFIG.DEFAULT_PHOTO;
  }

})
.catch(err => {
  console.error(err);
  document.getElementById("verifyStatus").innerHTML = "❌ DATA LOAD FAILED";
});
