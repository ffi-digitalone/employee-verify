let employees = [];

fetch(CONFIG.SHEET_URL)
.then(response => response.text())
.then(data => {

    const rows = data.split("\n").map(row => row.split(","));

    const headers = rows[0];

    employees = rows.slice(1).map(row => {

        let obj = {};

        headers.forEach((header,index)=>{
            obj[header.trim()] = row[index]?.trim();
        });

        return obj;

    });

});


function verifyEmployee(){

    const id = document.getElementById("employeeID").value.trim();

    const employee = employees.find(
        emp => emp["Employee ID"] === id
    );


    if(employee){

        document.getElementById("result").innerHTML = `

        <div class="card">

        <img src="${employee["Photo Link"]}" class="photo">

        <h2>${employee["Employee Name"]}</h2>

        <p><b>Employee ID:</b> ${employee["Employee ID"]}</p>

        <p><b>Designation:</b> ${employee["Designation"]}</p>

        <p><b>Blood Group:</b> ${employee["Blood Group"]}</p>

        <p><b>Mobile:</b> ${employee["Mobile Number"]}</p>

        <p><b>Status:</b> ${employee["Status"]}</p>

        <p style="color:green">
        ✔ Verified Digital One Employee
        </p>

        </div>

        `;

    }

    else{

        document.getElementById("result").innerHTML=`

        <div class="error">
        ❌ Employee Not Found
        </div>

        `;

    }

}
