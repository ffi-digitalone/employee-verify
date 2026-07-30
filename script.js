const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");

fetch(CONFIG.SHEET_URL)
.then(res => res.text())
.then(csv => {

    const rows = csv.trim().split("\n").map(r => r.split(","));
    const headers = rows.shift().map(h => h.trim());

    const employees = rows.map(row => {
        let obj = {};
        headers.forEach((header, i) => {
            obj[header] = row[i] ? row[i].trim().replace(/^"|"$/g, "") : "";
        });
        return obj;
    });

    const emp = employees.find(e => e["Employee ID"] === employeeId);

    if (!emp) {

        document.getElementById("employeeid").innerText = "Not Found";
        document.getElementById("name").innerText = "Employee Not Found";
        document.getElementById("designation").innerText = "-";
        document.getElementById("blood").innerText = "-";
        document.getElementById("mobile").innerText = "-";
        document.getElementById("joining").innerText = "-";
        document.getElementById("status").innerText = "Inactive";

        return;
    }

    document.getElementById("employeeid").innerText = emp["Employee ID"];
    document.getElementById("name").innerText = emp["Employee Name"];
    document.getElementById("designation").innerText = emp["Designation"];
    document.getElementById("blood").innerText = emp["Blood Group"];
    document.getElementById("mobile").innerText = emp["Mobile Number"];
    document.getElementById("joining").innerText = emp["Joining Date"];
    document.getElementById("status").innerText = emp["Status"];

    if (emp["Photo Link"]) {
        document.getElementById("photo").src = emp["Photo Link"];
    }

})
.catch(error => {

    console.error(error);

    document.getElementById("name").innerText = "Loading Failed";

});
