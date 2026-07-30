fetch(CONFIG.SHEET_URL)
.then(res => res.text())
.then(csv => {

    const rows = csv.trim().split("\n").map(r => r.split(","));
    const headers = rows.shift().map(h => h.trim());

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const data = rows.map(r => {
        let obj = {};
        headers.forEach((h,i)=>{
            obj[h]=r[i] ? r[i].trim() : "";
        });
        return obj;
    });

    const emp = data.find(e => e["Employee ID"]===id);

    if(!emp){
        alert("Employee Not Found");
        return;
    }

    document.getElementById("employeeid").innerText = emp["Employee ID"];
    document.getElementById("name").innerText = emp["Employee Name"];
    document.getElementById("designation").innerText = emp["Designation"];
    document.getElementById("blood").innerText = emp["Blood Group"];
    document.getElementById("mobile").innerText = emp["Mobile Number"];
    document.getElementById("joining").innerText = emp["Joining Date"];
    document.getElementById("status").innerText = emp["Status"];

    if(emp["Photo Link"]){
        document.getElementById("photo").src = emp["Photo Link"];
    }

});
