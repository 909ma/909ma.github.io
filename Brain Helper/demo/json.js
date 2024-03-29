// JSON 파일 불러오기
fetch("./data/Subject.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    subjectList = data;
    showSubjectOptions();
    showQuestion(currentQuestionIndex);
  });

// HTML 요소 선택
var subjectSelect = document.getElementById("subjectSelect");
var questionDiv = document.getElementById("question");
var revealButton = document.getElementById("revealButton");
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var gotoInput = document.getElementById("gotoInput");
var gotoButton = document.getElementById("gotoButton");

// 초기 상태 설정
var currentQuestionIndex = 0;

// 과목 목록 표시 함수
function showSubjectOptions() {
  subjectList.forEach(function (subject) {
    var option = document.createElement("option");
    option.value = subject.value;
    option.text = subject.name;
    subjectSelect.appendChild(option);
  });
}

// 질문과 답 표시 함수
function showQuestion(index) {
  var selectedSubjectValue = subjectSelect.value;
  var questionDataUrl = "./data/" + selectedSubjectValue + ".json";

  // JSON 파일 불러오기
  fetch(questionDataUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      questionList = data;
      var questionData = questionList[index];
      questionDiv.innerHTML = "<pre>" + questionData.question + "</pre>" + '<pre class="answer hidden">' + questionData.answer + "</pre>";

      // 이전 버튼 활성화 여부 설정
      prevButton.disabled = index === 0;

      // 다음 버튼 활성화 여부 설정
      nextButton.disabled = index === questionList.length - 1;
    });
}

// 과목 선택 변경 시 이벤트 처리
subjectSelect.addEventListener("change", function () {
  currentQuestionIndex = 0;
  showQuestion(currentQuestionIndex);
});

// 정답 보기 버튼 클릭 시 이벤트 처리
revealButton.addEventListener("click", function () {
  var answerElement = questionDiv.querySelector(".answer");
  answerElement.classList.remove("hidden");
});

// 이전 버튼 클릭 시 이벤트 처리
prevButton.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
  } else if (currentQuestionIndex === 0) {
    currentQuestionIndex = questionList.length - 1;
  }
  showQuestion(currentQuestionIndex);
});

// 다음 버튼 클릭 시 이벤트 처리
nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questionList.length - 1) {
    currentQuestionIndex++;
  } else if (currentQuestionIndex === questionList.length - 1) {
    currentQuestionIndex = 0;
  }
  showQuestion(currentQuestionIndex);
});

// 이동 버튼 클릭 시 이벤트 처리
gotoButton.addEventListener("click", function () {
  var inputNumber = prompt("이동할 문제 번호를 입력하세요.");
  var gotoIndex = parseInt(inputNumber) - 1;

  if (isNaN(gotoIndex) || gotoIndex < 0 || gotoIndex >= questionList.length) {
    alert("유효한 질문 번호를 입력해주세요.");
  } else {
    currentQuestionIndex = gotoIndex;
    showQuestion(currentQuestionIndex);
  }
});

// 키보드 이벤트 처리
document.addEventListener("keydown", function (event) {
  // 왼쪽 화살표 키
  if (event.key === "ArrowLeft") {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
    // 오른쪽 화살표 키
  } else if (event.key === "ArrowRight") {
    if (currentQuestionIndex < questionList.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
    // 아래쪽 화살표 키
  } else if (event.key === "ArrowDown") {
    var answerElement = questionDiv.querySelector(".answer");
    answerElement.classList.remove("hidden");
    // 위쪽 화살표 키
  } else if (event.key === "ArrowUp") {
    var answerElement = questionDiv.querySelector(".answer");
    answerElement.classList.add("hidden");
  }
});
