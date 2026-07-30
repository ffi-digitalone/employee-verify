function getDriveImage(url) {

  if (!url) return CONFIG.DEFAULT_PHOTO;

  // open?id=
  if (url.includes("open?id=")) {
    const id = url.split("open?id=")[1].split("&")[0];
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  }

  // file/d/
  if (url.includes("/file/d/")) {
    const id = url.split("/file/d/")[1].split("/")[0];
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  }

  // uc?id=
  if (url.includes("uc?id=")) {
    const id = url.split("uc?id=")[1].split("&")[0];
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  }

  return url;

}
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

  document.getElementById("photo").src =
    getDriveImage(emp["Photo Link"]);
})
.catch(err => {
  console.error(err);
  document.getElementById("verifyStatus").innerHTML = "❌ DATA LOAD FAILED";
});
