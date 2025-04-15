// Handle Room Assignment to Patient
document.getElementById("assign-room-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let patientId = document.getElementById("assign-patient-id").value;
    let roomNumber = document.getElementById("assign-room-number").value;
  
    let roomAssignTable = document.getElementById("room-assign-list").getElementsByTagName("tbody")[0];
    let newRow = roomAssignTable.insertRow();
  
    newRow.innerHTML = `
      <td>${patientId}</td>
      <td>${roomNumber}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
  });
  
  // Handle Nurse Assignment to Room
  document.getElementById("assign-nurse-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let roomNumber = document.getElementById("assign-room").value;
    let nurseId = document.getElementById("assign-nurse").value;
  
    let nurseRoomAssignTable = document.getElementById("nurse-room-assign-list").getElementsByTagName("tbody")[0];
    let newRow = nurseRoomAssignTable.insertRow();
  
    newRow.innerHTML = `
      <td>${roomNumber}</td>
      <td>${nurseId}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
  });
  
  // Handle Doctor Assignment to Patient
  document.getElementById("assign-doctor-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let patientId = document.getElementById("assign-patient").value;
    let doctorId = document.getElementById("assign-doctor").value;
  
    let doctorPatientAssignTable = document.getElementById("doctor-patient-assign-list").getElementsByTagName("tbody")[0];
    let newRow = doctorPatientAssignTable.insertRow();
  
    newRow.innerHTML = `
      <td>${patientId}</td>
      <td>${doctorId}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
  });
  
  // Delete row helper function
  function deleteRow(button) {
    button.closest("tr").remove();
  }
  