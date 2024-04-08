// Функція для збереження даних опитування в LocalStorage
const saveSurveyToLocalStorage = (surveyData) => {
    const surveys = JSON.parse(localStorage.getItem("surveys")) || [];
    surveys.push(surveyData);
    localStorage.setItem("surveys", JSON.stringify(surveys));
};

// Подія відправки форми
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Зупинити стандартну поведінку форми
    
    // Отримати дані з форми
    const formData = new FormData(this);
    const surveyData = {};
    formData.forEach((value, key) => {
        surveyData[key] = value;
    });

    // Зберегти дані в LocalStorage
    saveSurveyToLocalStorage(surveyData);
    
    // Очистити форму
    this.reset();
});

// Функція для отримання даних опитування з LocalStorage
const getSurveysFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("surveys")) || [];
};

// Функція для фільтрування за факультетом
const filterByFaculty = (faculty) => {
    const surveys = getSurveysFromLocalStorage();
    return surveys.filter(survey => survey.faculty === faculty);
};

// Функція для фільтрування за курсом
const filterByCourse = (course) => {
    const surveys = getSurveysFromLocalStorage();
    return surveys.filter(survey => survey.course === course);
};

// Функція для фільтрування за середнім балом
const filterByAverageGrade = (minGrade, maxGrade) => {
    const surveys = getSurveysFromLocalStorage();
    return surveys.filter(survey => {
        const grade = parseFloat(survey.averageGrade);
        return grade >= minGrade && grade <= maxGrade;
    });
};

// Приклад фільтрації за факультетом
const economicSurveys = filterByFaculty("economic");
console.log("Опитування на факультеті Економічний:", economicSurveys);

// Приклад фільтрації за курсом
const secondYearSurveys = filterByCourse("2");
console.log("Опитування на другому курсі:", secondYearSurveys);

// Приклад фільтрації за середнім балом від 3 до 4
const filteredSurveys = filterByAverageGrade(3, 4);
console.log("Опитування з середнім балом від 3 до 4:", filteredSurveys);
