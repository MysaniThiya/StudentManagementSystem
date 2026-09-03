console.log("Student Management System")

const dashboardBtn = document.getElementById("dashboardBtn")
const studentBtn = document.getElementById("studentBtn")
const courseBtn = document.getElementById("courseBtn") 

const dashboardSection = document.getElementById("dashboardSection")
const studentSection = document.getElementById("studentSection")
const courseSection = document.getElementById("courseSection")

const viewAllStudents = document.getElementById("viewAllStudents")
const viewAllCourses = document.getElementById("viewAllCourses")

const addCourseBtn = document.getElementById("addCourseBtn")
const courseFormContainer = document.getElementById("courseFormContainer")
const cancelCourseBtn = document.getElementById("cancelCourseBtn")
const closeCourseBtn = document.getElementById("closeCourseBtn")

const courseForm = document.getElementById("courseForm")
const courseSubmitButton = courseForm.querySelector('button[type="submit"]')

const addStudentBtn = document.getElementById("addStudentBtn")
const studentFormContainer = document.getElementById("studentFormContainer")
const cancelStudentBtn = document.getElementById("cancelStudentBtn")
const closeStudentBtn = document.getElementById("closeStudentBtn")

const searchInput = document.getElementById("searchInput")

const studentForm = document.getElementById("studentForm")
const studentSubmitButton = studentForm.querySelector('button[type="submit"]')
const studentCourse = document.getElementById("studentCourse")


function showSection(section){
    dashboardSection.style.display = "none"
    studentSection.style.display = "none"
    courseSection.style.display = "none"
    section.style.display = "block"
}

function setActiveButton(button) {
    dashboardBtn.classList.remove("active")
    studentBtn.classList.remove("active")
    courseBtn.classList.remove("active")
    button.classList.add("active")
}

dashboardBtn.addEventListener("click",()=>{
    showSection(dashboardSection)
    setActiveButton(dashboardBtn)
})

studentBtn.addEventListener("click",()=>{
    showSection(studentSection)
    setActiveButton(studentBtn)
})

courseBtn.addEventListener("click",()=>{
    showSection(courseSection)
    setActiveButton(courseBtn)
})

viewAllStudents.addEventListener("click", (event) => {
    event.preventDefault()
    showSection(studentSection)
    setActiveButton(studentBtn)
})

viewAllCourses.addEventListener("click", (event) => {
    event.preventDefault()
    showSection(courseSection)
    setActiveButton(courseBtn)
})

showSection(dashboardSection)
setActiveButton(dashboardBtn)

const totalStudents = document.getElementById("totalStudents")
const totalCourses = document.getElementById("totalCourses")
const activeStudents = document.getElementById("activeStudents")
const activeCourses = document.getElementById("activeCourses")
const recentStudentTableBody = document.getElementById("recentStudentTableBody")
const recentCourseTableBody = document.getElementById("recentCourseTableBody")

async function loadDashboard(){
    const studentResponse = await fetch(`${API_URL}/students`)
    const students = await studentResponse.json()
    const courseResponse = await fetch(`${API_URL}/courses`)
    const courses = await courseResponse.json()

    totalStudents.textContent = students.length
    totalCourses.textContent = courses.length

    const activeStudentCount = students.filter(student => 
        student.status === "active").length
    const activeCourseCount = courses.filter(course => 
        course.status === "active").length
    
    activeStudents.textContent = activeStudentCount
    activeCourses.textContent = activeCourseCount

    recentStudentTableBody.innerHTML = ""
    const recentStudents = students.slice(-5).reverse()

    recentStudents.forEach((student)=>{
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        nameCell.textContent = student.name
        const emailCell = document.createElement("td")
        emailCell.textContent = student.email
        const courseCell = document.createElement("td")
        courseCell.textContent = student.course.name
        const dateCell = document.createElement("td")
        dateCell.textContent = student.enrollmentDate.substring(0,10)
        const statusCell = document.createElement("td")
        const statusBadge = document.createElement("span")
        statusBadge.textContent = student.status
        statusBadge.classList.add("status-badge")
        if (student.status === "active"){
            statusBadge.classList.add("status-active")
        }
        else{
            statusBadge.classList.add("status-inactive")
        }
        statusCell.appendChild(statusBadge)
        row.appendChild(nameCell)
        row.appendChild(emailCell)
        row.appendChild(courseCell)
        row.appendChild(dateCell)
        row.appendChild(statusCell)
        recentStudentTableBody.appendChild(row)
    })

    recentCourseTableBody.innerHTML= ""
    const recentCourses = courses.slice(-5).reverse()

    recentCourses.forEach((course)=>{
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        nameCell.textContent = course.name
        const descriptionCell = document.createElement("td")
        descriptionCell.textContent = course.description
        const durationCell = document.createElement("td")
        durationCell.textContent = course.duration
        const statusCell = document.createElement("td")
        const statusBadge = document.createElement("span")
        statusBadge.textContent = course.status
        statusBadge.classList.add("status-badge")
        if (course.status === "active"){
            statusBadge.classList.add("status-active")
        }
        else{
            statusBadge.classList.add("status-inactive")
        }
        statusCell.appendChild(statusBadge)
        
        row.appendChild(nameCell)
        row.appendChild(descriptionCell)
        row.appendChild(durationCell)
        row.appendChild(statusCell)
        recentCourseTableBody.appendChild(row)
    })

}

//--------------------------------
const API_URL = "http://localhost:3000/api"
let editingCourseId = null
let editingStudentId = null 

//Courses________________________
async function getCourses(){
    const response = await fetch(`${API_URL}/courses`)
    const courses = await response.json() //converts that response into a JavaScript array
    console.log(courses)
    const courseTableBody = document.getElementById("courseTableBody")
    courseTableBody.innerHTML = ""
    courses.forEach((course) => {
        const row = document.createElement("tr")

        const nameCell = document.createElement("td")
        nameCell.textContent = course.name
        
        const descriptionCell = document.createElement("td")
        descriptionCell.textContent = course.description
        
        const durationCell = document.createElement("td")
        durationCell.textContent = course.duration
        
        const statusCell = document.createElement("td")
        const statusBadge = document.createElement("span")
        statusBadge.textContent = course.status
        statusBadge.classList.add("status-badge")
        if (course.status === "active"){
            statusBadge.classList.add("status-active")
        }
        else{
            statusBadge.classList.add("status-inactive")
        }
        
        const actionsCell = document.createElement("td")

        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.classList.add("btn-edit")
        editButton.addEventListener("click",()=>{
            editingCourseId = course._id
            document.getElementById("courseName").value = course.name
            document.getElementById("courseDescription").value = course.description
            document.getElementById("courseDuration").value = course.duration
            document.getElementById("courseStatus").value = course.status
            courseFormContainer.style.display="flex"
            courseSubmitButton.textContent = "Update Course"
        })

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.classList.add("btn-delete")

        deleteButton.addEventListener("click", async()=>{
            const response = await fetch(
                `${API_URL}/courses/${course._id}`,
                { method: "DELETE"}
            )
            const result = await response.json()            
            console.log(result)
            if (response.ok){
                row.remove()
                loadDashboard()
            }
            else{
                alert(result.msg)
            }
        })

        statusCell.appendChild(statusBadge)
        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)

        row.appendChild(nameCell)
        row.appendChild(descriptionCell)
        row.appendChild(durationCell)
        row.appendChild(statusCell)
        row.appendChild(actionsCell)

        courseTableBody.appendChild(row)
    })
}
getCourses()

addCourseBtn.addEventListener("click",()=>{
    courseFormContainer.style.display = "flex"
})

cancelCourseBtn.addEventListener("click",()=>{
    courseFormContainer.style.display = "none"
})

closeCourseBtn.addEventListener("click",()=>{
    courseFormContainer.style.display = "none"
})

courseForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const name = document.getElementById("courseName").value
    const description = document.getElementById("courseDescription").value
    const duration = document.getElementById("courseDuration").value
    const status = document.getElementById("courseStatus").value

    const courseData = {
        name: name,
        description: description,
        duration: Number(duration),
        status: status
    } 
    let response

    if (editingCourseId === null) {
        response = await fetch(`${API_URL}/courses`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(courseData)
        })
    } 
    else {
        response = await fetch(`${API_URL}/courses/${editingCourseId}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(courseData)
            })
    }

    const result = await response.json()
    if (response.ok){
        courseForm.reset()
        courseFormContainer.style.display = "none"
        editingCourseId = null
        courseSubmitButton.textContent = "Add Course"
        getCourses()
        loadDashboard()
    }
    else{
        alert(result.msg)
    }
})
//Students___________________
async function getStudents() {
    const response = await fetch (`${API_URL}/students`)
    const students = await response.json()
    //console.log(students)
    const studentTableBody = document.getElementById("studentTableBody")
    studentTableBody.innerHTML = ""

    students.forEach((student)=>{
        const row = document.createElement("tr")

        const nameCell = document.createElement("td")
        nameCell.textContent = student.name
        const emailCell = document.createElement("td")
        emailCell.textContent = student.email
        const courseCell = document.createElement("td")
        courseCell.textContent = student.course.name
        const enrollmentDateCell = document.createElement("td")
        enrollmentDateCell.textContent = student.enrollmentDate.substring(0, 10)
        const statusCell = document.createElement("td")
        const statusBadge = document.createElement("span")
        statusBadge.textContent = student.status
        statusBadge.classList.add("status-badge")
        if (student.status === "active"){
            statusBadge.classList.add("status-active")
        }
        else{
            statusBadge.classList.add("status-inactive")
        }

        const actionsCell = document.createElement("td")

        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.classList.add("btn-edit")
        editButton.addEventListener("click", async()=>{
            editingStudentId = student._id
            document.getElementById("studentName").value = student.name
            document.getElementById("studentEmail").value = student.email
            document.getElementById("enrollmentDate").value = student.enrollmentDate
            document.getElementById("studentStatus").value = student.status
            await loadCourseOptions()
            document.getElementById("studentCourse").value = student.course._id
            studentFormContainer.style.display = "flex"
            studentSubmitButton.textContent = "Update Student"

        })

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.classList.add("btn-delete")

        deleteButton.addEventListener("click", async()=>{

            const confirmDelete = confirm("Are you sure you want to delete this student?")
            if(!confirmDelete){
                return
            }

            const response = await fetch(
                `${API_URL}/students/${student._id}`,
                {method : "DELETE"})
            const result = await response.json()
            if (response.ok){
                row.remove()
                loadDashboard()
            }
            else{
                alert(result.msg)
            }
        })

        statusCell.appendChild(statusBadge)
        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)

        row.appendChild(nameCell)
        row.appendChild(emailCell)
        row.appendChild(courseCell)
        row.appendChild(enrollmentDateCell)
        row.appendChild(statusCell)
        row.appendChild(actionsCell)

        studentTableBody.appendChild(row)

    })
}
getStudents()
loadDashboard()

addStudentBtn.addEventListener("click",async()=>{
    await loadCourseOptions()
    studentFormContainer.style.display = "flex"
})

closeStudentBtn.addEventListener("click", () => {
    studentFormContainer.style.display = "none"
})

cancelStudentBtn.addEventListener("click",()=>{
    studentFormContainer.style.display = "none"
})

async function loadCourseOptions(){
    const response = await fetch(`${API_URL}/courses`)
    const courses = await response.json()

    studentCourse.innerHTML = '<option value="">Select Course</option>'

    courses.forEach((course)=>{
        const option = document.createElement("option")
        option.value = course._id
        option.textContent = course.name
        studentCourse.appendChild(option)
    })
}

studentForm.addEventListener("submit",async(event)=>{

    event.preventDefault()
    
    const name = document.getElementById("studentName").value
    const email = document.getElementById("studentEmail").value
    const course = document.getElementById("studentCourse").value
    const enrollmentDate = document.getElementById("enrollmentDate").value
    const status = document.getElementById("studentStatus").value

    const studentData = {
        name,
        email,
        course,
        enrollmentDate,
        status
    }

    let response

    if (editingStudentId === null) {
        response = await fetch(`${API_URL}/students`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(studentData)
        })
    }
    else{
        response = await fetch(`${API_URL}/students/${editingStudentId}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(studentData)
    })
    }
    
    const result = await response.json()

    if (response.ok){
        studentForm.reset()
        studentFormContainer.style.display = "none"
        editingStudentId = null
        studentSubmitButton.textContent = "Add Student"
        getStudents()
        loadDashboard()
    }
    else{
        alert(result.msg)
    }
})

searchInput.addEventListener("input", ()=>{
    const searchText = searchInput.value.toLowerCase()

    const rows = document.querySelectorAll("#studentTableBody tr, " +
        "#courseTableBody tr, " +
        "#recentStudentTableBody tr, " +
        "#recentCourseTableBody tr")
    
    rows.forEach((row) => {
        let rowText = ""
        for (let i = 0; i < row.cells.length; i++) {
            // Ignore, last column - Edit/Delete buttons
            if (row.closest("#studentTableBody, #courseTableBody") 
                && i === row.cells.length - 1)
            {
                continue 
            }
            rowText += row.cells[i].textContent.toLowerCase() + " "
        }

        if (rowText.includes(searchText)) {
            row.style.display = ""
        }
        else {
            row.style.display = "none"
        }

    })
})