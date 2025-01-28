window.onload = () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);
};

document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const achievements = document.getElementById('achievements').value;
    const extracurricular = document.getElementById('extracurricular').value;

    alert(`Student Information Submitted:\n\nName: ${name}\nGrade: ${grade}\nAchievements: ${achievements}\nExtracurricular: ${extracurricular}`);
});
async function loadStudentData() {
    try {
        const response = await fetch('/.netlify/functions/getSubmissions');
        const students = await response.json();

        const tableBody = document.getElementById("student-table-body");
        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.data.name}</td>
                <td>${student.data.grade}</td>
                <td>${student.data.achievements}</td>
                <td>${student.data.extracurricular}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading student data:", error);
    }
}


window.addEventListener("DOMContentLoaded", loadStudentData);
