const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get("id");

document.getElementById("logo").src = CONFIG.LOGO_URL;

fetch(CONFIG.SHEET_URL)
.then(response => response.text())
.then(csv => {

    const lines = csv.trim().split(/\r?\n/);

    const headers = lines[0].split(",").map(h => h.replace(/"/g,"").trim());

    let employee = null;

    for(let i=1;i<lines.length;i++){

        const row = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

        if(!row) continue;

        let obj = {};

        headers.forEach((h,index)=>{

            obj[h]=row[index] ? row[index].replace(/"/g,"").trim() : "";

        });

        if(obj["Employee ID"]===employeeId){

            employee=obj;

            break;

        }

    }

    if(employee){

        document.getElementById("employeeid").innerText=employee["Employee ID"];
        document.getElementById("name").innerText=employee["Employee Name"];
        document.getElementById("designation").innerText=employee["Designation"];
        document.getElementById("blood").innerText=employee["Blood Group"];
        document.getElementById("mobile").innerText=employee["Mobile Number"];
        document.getElementById("joining").innerText=employee["Joining Date"];
        document.getElementById("status").innerText=employee["Status"];

        if(employee["Photo Link"]!=""){

            document.getElementById("photo").src=employee["Photo Link"];

        }

    }else{

        document.querySelector(".status").innerHTML="❌ EMPLOYEE NOT FOUND";

    }

})
.catch(err=>{

    console.log(err);

    document.querySelector(".status").innerHTML="❌ DATA LOAD FAILED";

});
