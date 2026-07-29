const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");

if(employeeId){
    document.getElementById("employeeid").innerText = employeeId;

    // পরবর্তীতে Google Sheet থেকে ডাটা এনে এখানে দেখানো হবে
    document.getElementById("name").innerText = "Loading...";
    document.getElementById("designation").innerText = "Loading...";
    document.getElementById("blood").innerText = "Loading...";
    document.getElementById("mobile").innerText = "Loading...";
    document.getElementById("joining").innerText = "Loading...";
    document.getElementById("status").innerText = "Active";
}
else{

    document.querySelector(".card").innerHTML = `
    <div style="padding:40px;text-align:center">
        <h2 style="color:red">❌ Invalid Employee ID</h2>
        <p>No Employee ID Found</p>
    </div>
    `;
}
