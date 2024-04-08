import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDolist = new ToDoList();
var choices = [];
var page = 0;
var currentSection = 0;
var riskFactors = [1];
const container = document.getElementById("mainQuestions");
const maxNumberOfRiskFactorPages = 5;
const symptomPage = 7;
const testRiskFactor = false;


// Launch app
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState == "complete") {
        initApp();
    }
})

const initApp = () => {
    // Add listeners
    
    const nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", (event) => {
        currentSection = 0;
        clearTheListDisplay();
        
        riskFactors[page] = calculateRiskFactor();
        if (testRiskFactor){
            
            const riskFactorDiv = document.createElement('div');
            riskFactorDiv.id = 'riskFactor_div';
            const pageTitles = ['init', 'Sex/Age', 'Smoker', 'Second Hand Smoke', 'Pollutant Load', 'Genetic Factor'];
            
            for (var i=0; i<riskFactors.length; i++){
                
                if (i < pageTitles.length){
                    const text = 'Page ' + i + ' -> ' + pageTitles[i] + ': ' + riskFactors[i];
                    const pTest = document.createElement('p');
                    const pTestNode = document.createTextNode(text);
                    pTest.appendChild(pTestNode);
                    riskFactorDiv.appendChild(pTest);
                }
                else{
                    alert('oops, something went wrong...');
                }
                
            }

            var finalRiskFactor = riskFactors.reduce((a,b) => a * b, 1);
            const pTest = document.createElement('p');
            pTest.style.fontWeight = 'bold';
            const pTestNode = document.createTextNode('Final Risk Factor: ' + finalRiskFactor);
            pTest.appendChild(pTestNode);
            riskFactorDiv.appendChild(pTest);

            container.appendChild(riskFactorDiv);
        }
        page++;
        
        addNextSubQuestion();
        

    });

    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", (event) => {
        if (page == symptomPage){
            page = maxNumberOfRiskFactorPages;
        }
        else {
            page--;
        }
        
        currentSection = 0;
        
        clearTheListDisplay();
        addNextSubQuestion();
        
    });

    // const itemEntryForm = document.getElementById("itemEntryForm");
    // itemEntryForm.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     processSubmission();
    // });
    
    // const clearItems = document.getElementById("clearItems");
    // clearItems.addEventListener("click", (event) => {
    //     const list = toDolist.getList();
    //     if (list.length) {
    //         const confirmed = confirm("Are you sure you want to clear the entire list?");
    //         if (confirmed) {
    //             toDolist.clearList();
    //             udpatePersistentData(toDolist.getList());
    //             refreshThePage();
    //         }
    //     }
    // });
    
    // Procedural
    // loadListObject(); 
    // refreshThePage();
    //hideButtonById("backButton");
    addNextSubQuestion();
};

const addInitialQuestion = () => {
    const div = document.createElement("div");
    div.id = "mainPage";
    div.className = "item";
    div.innerHTML += "<b>Liegt einer der folgenden ICDs vor?</b><br><br>" +
    "<br>" +
    "<b>C34 Hauptbronchus</b><br><br>" +
    "<b>C34.1 Oberlappen</b><br>(-Bronchus)<br><br>" +
    "<b>C34.2 Mittellappen</b><br>(-Bronchus)<br><br>" +
    "<b>C34.3 Unterlappen</b><br>(-Bronchus)<br><br>" +
    "<b>C34.8 Bronchus und Lunge</b><br>mehrere Teilbereiche überlappend<br><br>" +
    "<b>C34.9 Bronchus und Lunge</b><br>nicht näher bezeichnet<br><br>";
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);
    
}

const askForSex = () => {
    const div = document.createElement("div");
    div.id = "sex_div";
    div.className = "item";
    const pSex = document.createElement("p");
    const pSexNode = document.createTextNode("Bitte das Geschlecht angeben:")
    pSex.appendChild(pSexNode);

    const femaleInput = document.createElement("input");
    femaleInput.type = "radio";
    femaleInput.id = "femaleRadioButton";
    femaleInput.name = "sex_choice";
    femaleInput.value = "female";
    const femaleLabel = document.createElement("label");
    femaleLabel.htmlFor = "femaleRadioButton";
    femaleLabel.textContent = "weiblich";

    const maleInput = document.createElement("input");
    maleInput.type = "radio";
    maleInput.id = "maleRadioButton";
    maleInput.name = "sex_choice";
    maleInput.value = "male";
    const maleLabel = document.createElement("label");
    maleLabel.htmlFor = "maleRadioButton";
    maleLabel.textContent = "männlich";

    const sexForm = document.createElement("form");
    sexForm.name = "sex_form";
    sexForm.appendChild(femaleInput);
    sexForm.appendChild(femaleLabel);
    sexForm.innerHTML += "<br>";
    sexForm.appendChild(maleInput);
    sexForm.appendChild(maleLabel);

    div.appendChild(pSex);
    div.appendChild(sexForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(sexForm, "sex");

    // create on click listener
    storeRadioChoicefromForm(sexForm, "sex");
}

const askForAge = () => {
    const div = document.createElement("div");
    div.id = "age_div";
    div.className = "item";
    const pAge = document.createElement("p");
    const pAgeNode = document.createTextNode("Bitte das Alter angeben:")
    pAge.appendChild(pAgeNode)

    const age3544Input = document.createElement("input");
    age3544Input.type = "radio";
    age3544Input.id = "age3544RadioButton";
    age3544Input.name = "age_choice";
    age3544Input.value = "age3544";
    const age3544Label = document.createElement("label");
    age3544Label.htmlFor = "age3544RadioButton";
    age3544Label.textContent = "35 - 44";

    const age4554Input = document.createElement("input");
    age4554Input.type = "radio";
    age4554Input.id = "age4554RadioButton";
    age4554Input.name = "age_choice";
    age4554Input.value = "age4554";
    const age4554Label = document.createElement("label");
    age4554Label.htmlFor = "age4554RadioButton";
    age4554Label.textContent = "45 - 54";

    const age5564Input = document.createElement("input");
    age5564Input.type = "radio";
    age5564Input.id = "age5564RadioButton";
    age5564Input.name = "age_choice";
    age5564Input.value = "age5564";
    const age5564Label = document.createElement("label");
    age5564Label.htmlFor = "age5564RadioButton";
    age5564Label.textContent = "55 - 64";

    const age6574Input = document.createElement("input");
    age6574Input.type = "radio";
    age6574Input.id = "age6574RadioButton";
    age6574Input.name = "age_choice";
    age6574Input.value = "age6574";
    const age6574Label = document.createElement("label");
    age6574Label.htmlFor = "age6574RadioButton";
    age6574Label.textContent = "65 - 74";

    const age7585Input = document.createElement("input");
    age7585Input.type = "radio";
    age7585Input.id = "age7585RadioButton";
    age7585Input.name = "age_choice";
    age7585Input.value = "age7585";
    const age7585Label = document.createElement("label");
    age7585Label.htmlFor = "age7585RadioButton";
    age7585Label.textContent = "75 - 85";


    const ageForm = document.createElement("form");
    ageForm.name = "age_form";
    ageForm.appendChild(age3544Input);
    ageForm.appendChild(age3544Label);
    ageForm.innerHTML += "<br>";
    ageForm.appendChild(age4554Input);
    ageForm.appendChild(age4554Label);
    ageForm.innerHTML += "<br>";
    ageForm.appendChild(age5564Input);
    ageForm.appendChild(age5564Label);
    ageForm.innerHTML += "<br>";
    ageForm.appendChild(age6574Input);
    ageForm.appendChild(age6574Label);
    ageForm.innerHTML += "<br>";
    ageForm.appendChild(age7585Input);
    ageForm.appendChild(age7585Label);

    div.appendChild(pAge);
    div.appendChild(ageForm);

    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(ageForm, "age");

    // create on click listener
    storeRadioChoicefromForm(ageForm, "age");
}

const askForSmoker = () => {
    const div = document.createElement("div");
    div.id = "smoker_div";
    div.className = "item";
    const pSmoker = document.createElement("p");
    const pSmokerNode = document.createTextNode("Sind Sie Raucher?")
    pSmoker.appendChild(pSmokerNode);

    const yesSmokerInput = document.createElement("input");
    yesSmokerInput.type = "radio";
    yesSmokerInput.id = "yesSmokerRadioButton";
    yesSmokerInput.name = "smoker_choice";
    yesSmokerInput.value = "yesSmoker";
    const yesSmokerLabel = document.createElement("label");
    yesSmokerLabel.htmlFor = "yesSmokerRadioButton";
    yesSmokerLabel.textContent = "Ja";

    const exSmokerInput = document.createElement("input");
    exSmokerInput.type = "radio";
    exSmokerInput.id = "exSmokerRadioButton";
    exSmokerInput.name = "smoker_choice";
    exSmokerInput.value = "exSmoker";
    const exSmokerLabel = document.createElement("label");
    exSmokerLabel.htmlFor = "exSmokerRadioButton";
    exSmokerLabel.textContent = "Ex-Raucher";
    
    const noSmokerInput = document.createElement("input");
    noSmokerInput.type = "radio";
    noSmokerInput.id = "noSmokerRadioButton";
    noSmokerInput.name = "smoker_choice";
    noSmokerInput.value = "noSmoker";
    const noSmokerLabel = document.createElement("label");
    noSmokerLabel.htmlFor = "noSmokerRadioButton";
    noSmokerLabel.textContent = "Nein";

    const smokerForm = document.createElement("form");
    smokerForm.name = "smoker_form";
    smokerForm.appendChild(yesSmokerInput);
    smokerForm.appendChild(yesSmokerLabel);
    smokerForm.innerHTML += "<br>";
    smokerForm.appendChild(exSmokerInput);
    smokerForm.appendChild(exSmokerLabel);
    smokerForm.innerHTML += "<br>";
    smokerForm.appendChild(noSmokerInput);
    smokerForm.appendChild(noSmokerLabel);

    div.appendChild(pSmoker);
    div.appendChild(smokerForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(smokerForm, "smoker");

    // create on click listener
    storeRadioChoicefromForm(smokerForm, "smoker");
}

const askForCigaretteType = () => {
    const div = document.createElement("div");
    div.id = "cigarrette_div";
    div.className = "item";
    
    const cigarretteInput = document.createElement("input");
    cigarretteInput.type = "radio";
    cigarretteInput.id = "cigarretteRadioButton";
    cigarretteInput.name = "cigarrette_choice";
    cigarretteInput.value = "cigarrette";
    const cigarretteLabel = document.createElement("label");
    cigarretteLabel.htmlFor = "cigarretteRadioButton";
    cigarretteLabel.textContent = "Zigarette?";

    const cigarelloInput = document.createElement("input");
    cigarelloInput.type = "radio";
    cigarelloInput.id = "cigarelloRadioButton";
    cigarelloInput.name = "cigarrette_choice";
    cigarelloInput.value = "cigarello";
    const cigarelloLabel = document.createElement("label");
    cigarelloLabel.htmlFor = "cigarelloRadioButton";
    cigarelloLabel.textContent = "Zigarre, Zigarillo, Pfeife?";
    
    const cigaretteTypeForm = document.createElement("form");
    cigaretteTypeForm.name = "cigarrette_form";
    cigaretteTypeForm.appendChild(cigarretteInput);
    cigaretteTypeForm.appendChild(cigarretteLabel);
    cigaretteTypeForm.innerHTML += "<br>";
    cigaretteTypeForm.appendChild(cigarelloInput);
    cigaretteTypeForm.appendChild(cigarelloLabel);
    
    div.appendChild(cigaretteTypeForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(cigaretteTypeForm, "cigarrette");

    // create on click listener
    storeRadioChoicefromForm(cigaretteTypeForm, "cigarrette");
}

const askForPackYears = () => {
    const div = document.createElement("div");
    div.id = "packYears_div";
    div.className = "item";
    
    const packsPerDayInput = document.createElement("input");
    packsPerDayInput.type = "number";
    packsPerDayInput.step = ".1";
    packsPerDayInput.id = "packsPerDayNumber";
    packsPerDayInput.name = "packYears_choice";
    //packsPerDayInput.value = "packsPerDay";
    //packsPerDayInput.value = 5.1;
    const packsPerDayLabel = document.createElement("label");
    packsPerDayLabel.htmlFor = "packsPerDayNumber";
    packsPerDayLabel.textContent = "Packungen pro Tag?";

    const yearsOfSmokingInput = document.createElement("input");
    yearsOfSmokingInput.type = "number";
    yearsOfSmokingInput.step = ".1";
    yearsOfSmokingInput.id = "yearsOfSmokingNumber";
    yearsOfSmokingInput.name = "packYears_choice";
    //yearsOfSmokingInput.value = "yearsOfSmoking";
    //yearsOfSmokingInput.value = 2.2;
    const yeasOfSmokingLabel = document.createElement("label");
    yeasOfSmokingLabel.htmlFor = "yearsOfSmokingNumber";
    yeasOfSmokingLabel.textContent = "Anzahl der Jahre?";
    
    const packYearsForm = document.createElement("form");
    packYearsForm.name = "packYears_form";
    packYearsForm.appendChild(packsPerDayInput);
    packYearsForm.appendChild(packsPerDayLabel);
    packYearsForm.innerHTML += "<br>";
    packYearsForm.appendChild(yearsOfSmokingInput);
    packYearsForm.appendChild(yeasOfSmokingLabel);
    
    div.appendChild(packYearsForm);
    
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreInputNumberChoice(packYearsForm, "packYears");

    // create on click listener
    storeInputNumberChoicefromForm(packYearsForm, "packYears");
}

const askForNicotineAbstinence = () => {
    const div = document.createElement("div");
    div.id = "abstinence_div";
    div.className = "item";
    const pAbstinence = document.createElement("p");
    const pAbstinenceNode = document.createTextNode("Nikotinkarenz >10 Jahre?")
    pAbstinence.appendChild(pAbstinenceNode);

    const yesAbstinenceInput = document.createElement("input");
    yesAbstinenceInput.type = "radio";
    yesAbstinenceInput.id = "yesAbstinenceRadioButton";
    yesAbstinenceInput.name = "abstinence_choice";
    yesAbstinenceInput.value = "yesAbstinence";
    const yesAbstinenceLabel = document.createElement("label");
    yesAbstinenceLabel.htmlFor = "yesAbstinenceRadioButton";
    yesAbstinenceLabel.textContent = "Ja";

    const noAbstinenceInput = document.createElement("input");
    noAbstinenceInput.type = "radio";
    noAbstinenceInput.id = "noAbstinenceRadioButton";
    noAbstinenceInput.name = "abstinence_choice";
    noAbstinenceInput.value = "noAbstinence";
    const noAbstinenceLabel = document.createElement("label");
    noAbstinenceLabel.htmlFor = "noAbstinenceRadioButton";
    noAbstinenceLabel.textContent = "Nein";

    const abstinenceForm = document.createElement("form");
    abstinenceForm.name = "abstinence_form";
    abstinenceForm.appendChild(yesAbstinenceInput);
    abstinenceForm.appendChild(yesAbstinenceLabel);
    abstinenceForm.innerHTML += "<br>";
    abstinenceForm.appendChild(noAbstinenceInput);
    abstinenceForm.appendChild(noAbstinenceLabel);

    div.appendChild(pAbstinence);
    div.appendChild(abstinenceForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(abstinenceForm, "abstinence");

    // create on click listener
    storeRadioChoicefromForm(abstinenceForm, "abstinence");
}

const askForSecondHandSmoke = () => {
    const div = document.createElement("div");
    div.id = "secondHandSmoke_div";
    div.className = "item";
    const pSecondHandSmoke = document.createElement("p");
    const pSecondHandSmokeNode = document.createTextNode("Passivrauchexposition?")
    pSecondHandSmoke.appendChild(pSecondHandSmokeNode);

    const yesSecondHandSmokeInput = document.createElement("input");
    yesSecondHandSmokeInput.type = "radio";
    yesSecondHandSmokeInput.id = "yesSecondHandSmokeRadioButton";
    yesSecondHandSmokeInput.name = "secondHandSmoke_choice";
    yesSecondHandSmokeInput.value = "yesSecondHandSmoke";
    const yesSecondHandSmokeLabel = document.createElement("label");
    yesSecondHandSmokeLabel.htmlFor = "yesSecondHandSmokeRadioButton";
    yesSecondHandSmokeLabel.textContent = "Ja";

    const noSecondHandSmokeInput = document.createElement("input");
    noSecondHandSmokeInput.type = "radio";
    noSecondHandSmokeInput.id = "noSecondHandSmokeRadioButton";
    noSecondHandSmokeInput.name = "secondHandSmoke_choice";
    noSecondHandSmokeInput.value = "noSecondHandSmoke";
    const noSecondHandSmokeLabel = document.createElement("label");
    noSecondHandSmokeLabel.htmlFor = "noSecondHandSmokeRadioButton";
    noSecondHandSmokeLabel.textContent = "Nein";

    const SecondHandSmokeForm = document.createElement("form");
    SecondHandSmokeForm.name = "secondHandSmoke_form";
    SecondHandSmokeForm.appendChild(yesSecondHandSmokeInput);
    SecondHandSmokeForm.appendChild(yesSecondHandSmokeLabel);
    SecondHandSmokeForm.innerHTML += "<br>";
    SecondHandSmokeForm.appendChild(noSecondHandSmokeInput);
    SecondHandSmokeForm.appendChild(noSecondHandSmokeLabel);

    div.appendChild(pSecondHandSmoke);
    div.appendChild(SecondHandSmokeForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(SecondHandSmokeForm, "secondHandSmoke");

    // create on click listener
    storeRadioChoicefromForm(SecondHandSmokeForm, "secondHandSmoke");
}

const askForSecondHandSmokeSource = () => {
    const div = document.createElement("div");
    div.id = "secondHandSmokeSource_div";
    div.className = "item";

    const yesSecondHandSmokeSourceInput = document.createElement("input");
    yesSecondHandSmokeSourceInput.type = "radio";
    yesSecondHandSmokeSourceInput.id = "partnerSecondHandSmokeSourceRadioButton";
    yesSecondHandSmokeSourceInput.name = "secondHandSmokeSource_choice";
    yesSecondHandSmokeSourceInput.value = "partnerSecondHandSmokeSource";
    const yesSecondHandSmokeSourceLabel = document.createElement("label");
    yesSecondHandSmokeSourceLabel.htmlFor = "partnerSecondHandSmokeSourceRadioButton";
    yesSecondHandSmokeSourceLabel.textContent = "Durch den Partner";

    const noSecondHandSmokeSourceInput = document.createElement("input");
    noSecondHandSmokeSourceInput.type = "radio";
    noSecondHandSmokeSourceInput.id = "workSecondHandSmokeSourceRadioButton";
    noSecondHandSmokeSourceInput.name = "secondHandSmokeSource_choice";
    noSecondHandSmokeSourceInput.value = "workSecondHandSmokeSource";
    const noSecondHandSmokeSourceLabel = document.createElement("label");
    noSecondHandSmokeSourceLabel.htmlFor = "workSecondHandSmokeSourceRadioButton";
    noSecondHandSmokeSourceLabel.textContent = "Am Arbeitsplatz";

    const SecondHandSmokeSourceForm = document.createElement("form");
    SecondHandSmokeSourceForm.name = "secondHandSmokeSource_form";
    SecondHandSmokeSourceForm.appendChild(yesSecondHandSmokeSourceInput);
    SecondHandSmokeSourceForm.appendChild(yesSecondHandSmokeSourceLabel);
    SecondHandSmokeSourceForm.innerHTML += "<br>";
    SecondHandSmokeSourceForm.appendChild(noSecondHandSmokeSourceInput);
    SecondHandSmokeSourceForm.appendChild(noSecondHandSmokeSourceLabel);

    div.appendChild(SecondHandSmokeSourceForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(SecondHandSmokeSourceForm, "secondHandSmokeSource");

    // create on click listener
    storeRadioChoicefromForm(SecondHandSmokeSourceForm, "secondHandSmokeSource");
}

const askForSecondHandSmokeDuration = () => {
    const div = document.createElement("div");
    div.id = "secondHandSmokeDuration";
    div.className = "item";
    const pSecondHandSmokeDuration = document.createElement("p");
    const pSecondHandSmokeDurationNode = document.createTextNode("Passivrauchexposition > 20 Jahre?")
    pSecondHandSmokeDuration.appendChild(pSecondHandSmokeDurationNode);

    const longSecondHandSmokeDurationInput = document.createElement("input");
    longSecondHandSmokeDurationInput.type = "radio";
    longSecondHandSmokeDurationInput.id = "longSecondHandSmokeDurationRadioButton";
    longSecondHandSmokeDurationInput.name = "secondHandSmokeDuration_choice";
    longSecondHandSmokeDurationInput.value = "longSecondHandSmokeDuration";
    const longSecondHandSmokeDurationLabel = document.createElement("label");
    longSecondHandSmokeDurationLabel.htmlFor = "longSecondHandSmokeDurationRadioButton";
    longSecondHandSmokeDurationLabel.textContent = "Ja";

    const shortSecondHandSmokeDurationInput = document.createElement("input");
    shortSecondHandSmokeDurationInput.type = "radio";
    shortSecondHandSmokeDurationInput.id = "shortSecondHandSmokeDurationRadioButton";
    shortSecondHandSmokeDurationInput.name = "secondHandSmokeDuration_choice";
    shortSecondHandSmokeDurationInput.value = "shortSecondHandSmokeDuration";
    const shortSecondHandSmokeDurationLabel = document.createElement("label");
    shortSecondHandSmokeDurationLabel.htmlFor = "shortSecondHandSmokeDurationRadioButton";
    shortSecondHandSmokeDurationLabel.textContent = "Nein";

    const secondHandSmokeDurationForm = document.createElement("form");
    secondHandSmokeDurationForm.name = "secondHandSmokeDuration_form";
    secondHandSmokeDurationForm.appendChild(longSecondHandSmokeDurationInput);
    secondHandSmokeDurationForm.appendChild(longSecondHandSmokeDurationLabel);
    secondHandSmokeDurationForm.innerHTML += "<br>";
    secondHandSmokeDurationForm.appendChild(shortSecondHandSmokeDurationInput);
    secondHandSmokeDurationForm.appendChild(shortSecondHandSmokeDurationLabel);

    div.appendChild(pSecondHandSmokeDuration);
    div.appendChild(secondHandSmokeDurationForm);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(secondHandSmokeDurationForm, "secondHandSmokeDuration");

    // create on click listener
    storeRadioChoicefromForm(secondHandSmokeDurationForm, "secondHandSmokeDuration");
}

const askForPollutantLoad = () => {
    const div = document.createElement("div");
    div.id = "pollutantLoad_div";
    div.className = "item";

    const pPollutantLoad = document.createElement("p");
    const pPollutantLoadNode = document.createTextNode("Schadstoffbelastung?")
    pPollutantLoad.appendChild(pPollutantLoadNode);
    pPollutantLoad.style.fontWeight = "bold";

    const pollutantLoadGeneralInput = document.createElement("input");
    pollutantLoadGeneralInput.type = "radio";
    pollutantLoadGeneralInput.id = "pollutantLoadGeneralRadioButton";
    pollutantLoadGeneralInput.name = "pollutantLoad_choice";
    pollutantLoadGeneralInput.value = "pollutantLoadGeneral";
    const pollutantLoadGeneralLabel = document.createElement("label");
    pollutantLoadGeneralLabel.htmlFor = "pollutantLoadGeneralRadioButton";
    pollutantLoadGeneralLabel.textContent = "Allgemeine Luftverunreinigung / Feinstaub über Jahre durch Verbrennungsprozesse in der Industrie, in Kohlekraftwerken, der Heizung von Haushalten im Verkehr";

    const pollutantLoadWorkInput = document.createElement("input");
    pollutantLoadWorkInput.type = "radio";
    pollutantLoadWorkInput.id = "pollutantLoadWorkRadioButton";
    pollutantLoadWorkInput.name = "pollutantLoad_choice";
    pollutantLoadWorkInput.value = "pollutantLoadWork";
    const pollutantLoadWorkLabel = document.createElement("label");
    pollutantLoadWorkLabel.htmlFor = "pollutantLoadWorkRadioButton";
    pollutantLoadWorkLabel.textContent = "Schadstoffbelastung am Arbeitsplatz";

    const pollutantLoadNoneInput = document.createElement("input");
    pollutantLoadNoneInput.type = "radio";
    pollutantLoadNoneInput.id = "pollutantLoadNoneRadioButton";
    pollutantLoadNoneInput.name = "pollutantLoad_choice";
    pollutantLoadNoneInput.value = "pollutantLoadNone";
    const pollutantLoadNoneLabel = document.createElement("label");
    pollutantLoadNoneLabel.htmlFor = "pollutantLoadNoneRadioButton";
    pollutantLoadNoneLabel.textContent = "Keine Schadstoffbelastung";

    const pollutantLoadForm = document.createElement("form");
    pollutantLoadForm.name = "pollutantLoad_form";
    pollutantLoadForm.appendChild(pollutantLoadGeneralInput);
    pollutantLoadForm.appendChild(pollutantLoadGeneralLabel);
    pollutantLoadForm.innerHTML += "<br>";
    pollutantLoadForm.innerHTML += "<br>";
    pollutantLoadForm.appendChild(pollutantLoadWorkInput);
    pollutantLoadForm.appendChild(pollutantLoadWorkLabel);
    pollutantLoadForm.innerHTML += "<br>";
    pollutantLoadForm.innerHTML += "<br>";
    pollutantLoadForm.appendChild(pollutantLoadNoneInput);
    pollutantLoadForm.appendChild(pollutantLoadNoneLabel);
    
    div.appendChild(pPollutantLoad);
    div.innerHTML += "<br>";
    div.appendChild(pollutantLoadForm);
        

    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(pollutantLoadForm, "pollutantLoad");

    // create on click listener
    storeRadioChoicefromForm(pollutantLoadForm, "pollutantLoad");
}

const askForPollutantLoadKind = () => {
    const div = document.createElement("div");
    div.id = "pollutantLoadKind_div";
    div.className = "item";

    const pPollutantLoadKind = document.createElement("p");
    const pPollutantLoadKindNode = document.createTextNode("Welche Art von Schadstoffe?")
    pPollutantLoadKind.appendChild(pPollutantLoadKindNode);
    pPollutantLoadKind.style.fontWeight = "bold";

    const pollutantLoadSiliconInput = document.createElement("input");
    pollutantLoadSiliconInput.type = "radio";
    pollutantLoadSiliconInput.id = "pollutantLoadSiliconRadioButton";
    pollutantLoadSiliconInput.name = "pollutantLoadKind_choice";
    pollutantLoadSiliconInput.value = "pollutantLoadSilicon";
    const pollutantLoadSiliconLabel = document.createElement("label");
    pollutantLoadSiliconLabel.htmlFor = "pollutantLoadSiliconRadioButton";
    pollutantLoadSiliconLabel.textContent = "Siliziumdioxid, kristallin - Quarz-, Cristobalit-, Tridymitstaub";

    const pollutantLoadRadonInput = document.createElement("input");
    pollutantLoadRadonInput.type = "radio";
    pollutantLoadRadonInput.id = "pollutantLoadRadonRadioButton";
    pollutantLoadRadonInput.name = "pollutantLoadKind_choice";
    pollutantLoadRadonInput.value = "pollutantLoadRadon";
    const pollutantLoaRadonLabel = document.createElement("label");
    pollutantLoaRadonLabel.htmlFor = "pollutantLoadRadonRadioButton";
    pollutantLoaRadonLabel.textContent = "Radon, radioaktiven Strahlenquellen und/oder Röntgenstrahlung, Kokereirohgase, PAK-Gemische und/oder PAK-haltigem Steinkohlenteerpech,Chrom-VI-Verbindungen, Cadmium, Arsen, Asbest,Nickel, metallisch und Nickelverbindungen";

    const pollutantLoadKindForm = document.createElement("form");
    pollutantLoadKindForm.name = "pollutantLoadKind_form";
    pollutantLoadKindForm.appendChild(pollutantLoadSiliconInput);
    pollutantLoadKindForm.appendChild(pollutantLoadSiliconLabel);
    pollutantLoadKindForm.innerHTML += "<br>";
    pollutantLoadKindForm.innerHTML += "<br>";
    pollutantLoadKindForm.appendChild(pollutantLoadRadonInput);
    pollutantLoadKindForm.appendChild(pollutantLoaRadonLabel);
    
    div.innerHTML += "<br>";
    div.appendChild(pPollutantLoadKind);
    div.innerHTML += "<br>";
    div.appendChild(pollutantLoadKindForm);
        

    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(pollutantLoadKindForm, "pollutantLoadKind");

    // create on click listener
    storeRadioChoicefromForm(pollutantLoadKindForm, "pollutantLoadKind");
}

const askForGeneticFactor = () => {
    const div = document.createElement("div");
    div.id = "geneticFactor_div";
    div.className = "item";

    const pGeneticFactor = document.createElement("p");
    const pGeneticFactorNode = document.createTextNode("Ist / War mindestens ein Elternteil an Lungen-/Bronchialkarzinom erkrankt?")
    pGeneticFactor.appendChild(pGeneticFactorNode);
    

    const geneticFactorYesInput = document.createElement("input");
    geneticFactorYesInput.type = "radio";
    geneticFactorYesInput.id = "geneticFactorRadioButton";
    geneticFactorYesInput.name = "geneticFactor_choice";
    geneticFactorYesInput.value = "geneticFactorYes";
    const geneticFactorYesLabel = document.createElement("label");
    geneticFactorYesLabel.htmlFor = "geneticFactorRadioButton";
    geneticFactorYesLabel.textContent = "Ja";

    const geneticFactorNoInput = document.createElement("input");
    geneticFactorNoInput.type = "radio";
    geneticFactorNoInput.id = "geneticFactorNoRadioButton";
    geneticFactorNoInput.name = "geneticFactor_choice";
    geneticFactorNoInput.value = "geneticFactorNo";
    const geneticFactorNoLabel = document.createElement("label");
    geneticFactorNoLabel.htmlFor = "geneticFactorNoRadioButton";
    geneticFactorNoLabel.textContent = "Nein";

    const geneticFactorForm = document.createElement("form");
    geneticFactorForm.name = "geneticFactor_form";
    geneticFactorForm.appendChild(geneticFactorYesInput);
    geneticFactorForm.appendChild(geneticFactorYesLabel);
    geneticFactorForm.innerHTML += "<br>";
    geneticFactorForm.appendChild(geneticFactorNoInput);
    geneticFactorForm.appendChild(geneticFactorNoLabel);
    
    div.appendChild(pGeneticFactor);
    div.innerHTML += "<br>";
    div.appendChild(geneticFactorForm);
        

    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreRadioChoice(geneticFactorForm, "geneticFactor");

    // create on click listener
    storeRadioChoicefromForm(geneticFactorForm, "geneticFactor");
}

const askForSymptoms = () => {
    
    const div = document.createElement("div");
    div.id = "symptoms_div";
    div.className = "item";

    const pSymptoms = document.createElement("p");
    pSymptoms.style.fontWeight = 'bold';
    const pSymptomsNode = document.createTextNode("Symptome [Häufigkeit]")
    pSymptoms.appendChild(pSymptomsNode);
    
    const persistentCoughInput = document.createElement("input");
    persistentCoughInput.type = "checkbox";
    persistentCoughInput.id = "symptomPersistentCough";
    persistentCoughInput.name = "symptoms_choice";
    const persistentCoughLabel = document.createElement("label");
    persistentCoughLabel.htmlFor = "symptomPersistentCough";
    persistentCoughLabel.textContent = "hartnäckiger akuter Husten, der trotz adäquater Behandlung mit zum Beispiel Antibiotika mehr als zwei bis drei Wochen anhält [8-75%]";

    const weightLossInput = document.createElement("input");
    weightLossInput.type = "checkbox";
    weightLossInput.id = "symptomWeightLoss";
    weightLossInput.name = "symptoms_choice";
    const weightLossLabel = document.createElement("label");
    weightLossLabel.htmlFor = "symptomWeightLoss";
    weightLossLabel.textContent = "ungewollter Gewichtsverlust [0-68%]";
    
    const dyspnoeaInput = document.createElement("input");
    dyspnoeaInput.type = "checkbox";
    dyspnoeaInput.id = "symptomDyspnoea";
    dyspnoeaInput.name = "symptoms_choice";
    const dyspnoeaLabel = document.createElement("label");
    dyspnoeaLabel.htmlFor = "symptomDyspnoea";
    dyspnoeaLabel.textContent = "Atemnot, pfeifende Atmung [3-60%]";

    const chestPainInput = document.createElement("input");
    chestPainInput.type = "checkbox";
    chestPainInput.id = "symptomChestPain";
    chestPainInput.name = "symptoms_choice";
    const chestPainLabel = document.createElement("label");
    chestPainLabel.htmlFor = "symptomChestPain";
    chestPainLabel.textContent = "Schmerzen im Brustbereich, Knochenschmerzen [6-49%]";

    const sputumInput = document.createElement("input");
    sputumInput.type = "checkbox";
    sputumInput.id = "symptomSputum";
    sputumInput.name = "symptoms_choice";
    const sputumLabel = document.createElement("label");
    sputumLabel.htmlFor = "symptomSputum";
    sputumLabel.textContent = "blutiger und unblutiger Auswurf [6-35%]";

    const feverNigthSweatInput = document.createElement("input");
    feverNigthSweatInput.type = "checkbox";
    feverNigthSweatInput.id = "symptomFeverNigthSweat";
    feverNigthSweatInput.name = "symptoms_choice";
    const feverNigthSweatLabel = document.createElement("label");
    feverNigthSweatLabel.htmlFor = "symptomFeverNigthSweat";
    feverNigthSweatLabel.textContent = "Fieberschübe und Nachtschweiß [0-20%]";

    const fatigueInput = document.createElement("input");
    fatigueInput.type = "checkbox";
    fatigueInput.id = "symptomFatigue";
    fatigueInput.name = "symptoms_choice";
    const fatigueLabel = document.createElement("label");
    fatigueLabel.htmlFor = "symptomFatigue";
    fatigueLabel.textContent = "Abgeschlagenheit [0-10%]";

    const hoarsenessInput = document.createElement("input");
    hoarsenessInput.type = "checkbox";
    hoarsenessInput.id = "symptomHoarseness";
    hoarsenessInput.name = "symptoms_choice";
    const hoarsenessLabel = document.createElement("label");
    hoarsenessLabel.htmlFor = "symptomHoarseness";
    hoarsenessLabel.textContent = "Heiserkeit und/oder Schluckbeschwerden [-]";

    const chronicCoughInput = document.createElement("input");
    chronicCoughInput.type = "checkbox";
    chronicCoughInput.id = "symptomChronicCough";
    chronicCoughInput.name = "symptoms_choice";
    const chronicCoughLabel = document.createElement("label");
    chronicCoughLabel.htmlFor = "symptomChronicCough";
    chronicCoughLabel.textContent = "chronischer Husten, der seinen Charakter verändert [-]";



    const symptomsForm = document.createElement("form");
    symptomsForm.name = "symptoms_form";
    symptomsForm.appendChild(persistentCoughInput);
    symptomsForm.appendChild(persistentCoughLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(weightLossInput);
    symptomsForm.appendChild(weightLossLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(dyspnoeaInput);
    symptomsForm.appendChild(dyspnoeaLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(chestPainInput);
    symptomsForm.appendChild(chestPainLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(sputumInput);
    symptomsForm.appendChild(sputumLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(feverNigthSweatInput);
    symptomsForm.appendChild(feverNigthSweatLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(fatigueInput);
    symptomsForm.appendChild(fatigueLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(hoarsenessInput);
    symptomsForm.appendChild(hoarsenessLabel);
    symptomsForm.innerHTML += "<br>";
    symptomsForm.innerHTML += "<br>";
    symptomsForm.appendChild(chronicCoughInput);
    symptomsForm.appendChild(chronicCoughLabel);

    div.appendChild(pSymptoms);
    div.innerHTML += "<br>";
    div.appendChild(symptomsForm);
        

    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

    // restore choice if existing
    restoreCheckboxChoice(symptomsForm, "symptoms");

    // create on click listener
    storeInputCheckboxChoicefromForm(symptomsForm, "symptoms");

}

const adviceOncConsultation = (inputType) => {
    const nextButton = document.getElementById('nextButton');

    const div = document.createElement("div");
    div.id = "oncConsultation_div";
    div.className = "item";

    const pTitle = document.createElement('p');
    pTitle.style.fontWeight = 'bold';
    const pTitleNode = document.createTextNode(inputType + ': ');
    pTitle.appendChild(pTitleNode);

    var oncConsultationText = 'keine onkologische Beratung';

    if (inputType === 'Risikofaktor'){
        var finalRiskFactor = riskFactors.reduce((a,b) => a * b, 1);
    
        if (finalRiskFactor > 90){
            oncConsultationText = 'onkologische Beratung bei Aufnahme, wiederkehrend alle 7 Tage, vor Entlassung und bei Bedarf poststationär (telefonisch)';
        }
        else if (finalRiskFactor > 75){
            oncConsultationText = 'onkologische Beratung bei Aufnahme und vor Entlassung, spätestens aber 7 Tage nach Erstberatung';
        }
        else if (finalRiskFactor > 50){
            oncConsultationText = 'onkologische Beratung bei Aufnahme';
        }
        if (finalRiskFactor <= 90){
            
            nextButton.innerHTML = "Symptome";
    
            showButtonById('nextButton');
        }
    }
    else if (inputType === 'Symptome'){
        
        var sumOfOneToThree = (isSymptomGiven('symptomPersistentCough')?1:0) + (isSymptomGiven('symptomWeightLoss')?1:0) + (isSymptomGiven('symptomDyspnoea')?1:0);
        var sumOfFourToSix = (isSymptomGiven('symptomChestPain')?1:0) + (isSymptomGiven('symptomSputum')?1:0) + (isSymptomGiven('symptomFeverNigthSweat')?1:0);
        var sumOfSevenToNine = (isSymptomGiven('symptomFatigue')?1:0) + (isSymptomGiven('symptomHoarseness')?1:0) + (isSymptomGiven('symptomChronicCough')?1:0);

        // alert('sumOfOneToThree: ' + sumOfOneToThree + ' | sumOfFourToSix: ' + sumOfFourToSix + ' | sumOfSevenToNine: ' + sumOfSevenToNine)

        if (sumOfOneToThree > 1){
            // severity = 4
            oncConsultationText = 'onkologische Beratung bei Aufnahme, wiederkehrend alle 7 Tage, vor Entlassung und bei Bedarf poststationär (telefonisch)';
        }
        else if (sumOfOneToThree == 1 || sumOfFourToSix > 0){
            // severity = 3
            oncConsultationText = 'onkologische Beratung bei Aufnahme und vor Entlassung, spätestens aber 7 Tage nach Erstberatung';
        }
        else{
            // sumOfOneToThree == 0 && sumOfFourToSix == 0
            if (sumOfSevenToNine > 1){
                // severity = 2;
                oncConsultationText = 'onkologische Beratung bei Aufnahme';
            }
            else if (sumOfSevenToNine == 1){
                // severity = 1;
                oncConsultationText = 'onkologische Beratung wenn gewünscht';
            }
        }
    }
    else if (inputType == 'ICD'){
        hideButtonById('backButton');
        nextButton.innerHTML = 'Zurück';
        oncConsultationText = 'onkologische Beratung bei Aufnahme, wiederkehrend alle 7 Tage, vor Entlassung und bei Bedarf poststationär (telefonisch)';
    }

    
    
    const pOncConsultation = document.createElement("p");
    pOncConsultation.style.fontWeight = 'bold';
    const pOncConsultationNode = document.createTextNode(oncConsultationText);
    pOncConsultation.appendChild(pOncConsultationNode);
    
    div.appendChild(pTitle);
    div.innerHTML += "<br>";
    div.appendChild(pOncConsultation);
    
    //const container = document.getElementById("mainQuestions");
    container.appendChild(div);

}

const isSymptomGiven = (symptomName) => {
    var symptom = choices.find(obj => {
        return obj.formName === symptomName
    })
    
    if (symptom != undefined){
        return symptom.choice === true;
    } 

}

const calculateRiskFactor = () => {
    var riskFactor = 1;

    // page 1: Sex and Age
    var sex = choices.find(obj => {
        return obj.formName === "sex"
    })
    var age = choices.find(obj => {
        return obj.formName === "age"
    })

    if (page == 1 && sex != undefined && age != undefined){
        
        if (sex.choice === 'female'){
            if (age.choice === 'age3544'){
                riskFactor = 4;
            }
            else if (age.choice === 'age4554'){
                riskFactor = 3.9;
            }
            else if (age.choice === 'age5564'){
                riskFactor = 3.7;
            }
            else if (age.choice === 'age6574'){
                riskFactor = 2.9;
            }
            else if (age.choice === 'age7585'){
                riskFactor = 1.9;
            }
        }
        else {
            // male
            if (age.choice === 'age3544'){
                riskFactor = 6.5;
            }
            else if (age.choice === 'age4554'){
                riskFactor = 6.6;
            }
            else if (age.choice === 'age5564'){
                riskFactor = 6.4;
            }
            else if (age.choice === 'age6574'){
                riskFactor = 5.5;
            }
            else if (age.choice === 'age7585'){
                riskFactor = 3.6;
            }
        }
    }


    // page 2: Smoke
    var secondHandSmoke = choices.find(obj => {
        return obj.formName === "smoker"
    })
    
    if (page == 2 && secondHandSmoke != undefined){
        
        if (secondHandSmoke.choice == 'yesSmoker'){
            var cigarette = choices.find(obj => {
                return obj.formName === "cigarrette"
            })
            var packsPerDay = choices.find(obj => {
                return obj.formName === "packsPerDayNumber"
            })
            var yearsOfSmoking = choices.find(obj => {
                return obj.formName === "yearsOfSmokingNumber"
            })

            if (cigarette != undefined){
                
                if (cigarette.choice === 'cigarrette'){
                    if (packsPerDay != undefined && yearsOfSmoking != undefined){
                        var packYears = packsPerDay.choice * yearsOfSmoking.choice;
                        if (packYears > 60){
                            if (sex.choice === 'female'){
                                riskFactor = 8.7;
                            }
                            else {
                                // sex.choice === 'male'
                                riskFactor = 24;
                            }
                        }
                        else {
                            riskFactor = 1;
                        }
                    }
                    else{
                        alert('Pack Years cannot be determined!');
                    }
                }
                else if (cigarette.choice === 'cigarello'){
                    riskFactor = 8;
                }
                else {
                    alert('cigarette type: ' + cigarette.choice + ' not registered!');
                }
                
                
            }
            else{
                alert('choose cigarette type!')
            }
        }
        else if(secondHandSmoke.choice == 'exSmoker'){
            var abstinence = choices.find(obj => {
                return obj.formName === "abstinence"
            })

            if (abstinence != undefined){

                if (abstinence.choice === 'yesAbstinence'){
                    // nicotine abstinence > 10 years
                    riskFactor = 1;
                }
                else{
                    // nicotine abstinence <= 10 years
                    if (sex.choice === 'female'){
                        riskFactor = 2;
                    }
                    else {
                        // sex.choice === 'male'
                        riskFactor = 7.5;
                    }
                }
                
                
            }
        }
    }

    // page 3: Second Hand Smoke
    var secondHandSmoke = choices.find(obj => {
        return obj.formName === "secondHandSmoke"
    })
    
    if (page == 3 && secondHandSmoke != undefined){
        if (secondHandSmoke.choice == 'yesSecondHandSmoke'){

            var secondHandSmokeSource = choices.find(obj => {
                return obj.formName === "secondHandSmokeSource"
            })

            if (secondHandSmokeSource != undefined){
                if (secondHandSmokeSource.choice == 'partnerSecondHandSmokeSource'){
                    if (sex.choice === 'female'){
                        riskFactor = 1.24;
                    }
                    else {
                        // sex.choice === 'male'
                        riskFactor = 1.37;
                    }
                }
                else{
                    // secondHandSmokeSource.choice == 'workSecondHandSmokeSource'
                    var secondHandSmokeDuration = choices.find(obj => {
                        return obj.formName === "secondHandSmokeDuration"
                    })
                    if (secondHandSmokeDuration != undefined){
                        if (secondHandSmokeDuration.choice == 'longSecondHandSmokeDuration'){
                            if (sex.choice === 'female'){
                                riskFactor = 1.19;
                            }
                            else {
                                // sex.choice === 'male'
                                riskFactor = 1.12;
                            }
                        }
                    }
                }
            }
            
        }

    }


    // page 4: Pollutant Load
    var pollutantLoad = choices.find(obj => {
        return obj.formName === "pollutantLoad"
    })
    
    if (page == 4 && pollutantLoad != undefined){
        if (pollutantLoad.choice == 'pollutantLoadGeneral'){
            riskFactor = 1.14;
        }
        else if (pollutantLoad.choice == 'pollutantLoadWork'){

            var pollutantLoadKind = choices.find(obj => {
                return obj.formName === "pollutantLoadKind"
            })

            if (pollutantLoadKind != undefined){
                if (pollutantLoadKind.choice == 'pollutantLoadSilicon'){
                    riskFactor = 2;
                }
                else{
                    // pollutantLoadKind.choice == 'pollutantLoadRadon'
                    riskFactor = 1.5;
                }
            }
            
        }
        else {
            // 'pollutantLoadNone'
        }
    }

    // page 5: Pollutant Load
    var geneticFactor = choices.find(obj => {
        return obj.formName === "geneticFactor"
    })
    
    if (page == 5 && geneticFactor != undefined){
        if (geneticFactor.choice == 'geneticFactorYes'){
            riskFactor = 2;
        }
        else {
            // 'geneticFactorNo'
        }
    }

    //alert(riskFactor);
    return riskFactor;
    
}

const restoreCheckboxChoice = (form, category) => {
    
    var checkboxes = form.elements[category + "_choice"];
    // check for all objects in "choices"
    for (var i in choices) {
        for(var j = 0, max = checkboxes.length; j < max; j++) {
            if (choices[i].formName === checkboxes[j].id) {
                checkboxes[j].checked = choices[i].choice;
                
                addNextSubQuestion(checkboxes[j].id);
            }
        }
    }

}

const restoreInputNumberChoice = (form, category) => {
    
    var numbers = form.elements[category + "_choice"];
    // check for all objects in "choices"
    for (var i in choices) {
        for(var j = 0, max = numbers.length; j < max; j++) {
            if (choices[i].formName === numbers[j].id) {
                numbers[j].value = choices[i].choice;
                
                addNextSubQuestion(numbers[j].id);
            }
        }
    }

}

const restoreRadioChoice = (form, category) => {
    
    // check for all objects in "choices"
    for (var i in choices) {
        if (choices[i].formName == category) {
            
            var radios = form.elements[category + "_choice"];
            for(var j = 0, max = radios.length; j < max; j++) {
                
                if (radios[j].value === choices[i].choice){
                    radios[j].checked = true;
                    addNextSubQuestion(category);
                    return;
                }
            }
        }
    }
    
}

// on change listener
const storeInputNumberChoicefromForm = (form, category) => {
    var numbers = form.elements[category + "_choice"];
    for(var i = 0, max = numbers.length; i < max; i++) {
        
        numbers[i].addEventListener('change',function() {
            setChoice(this.id, this.value);
        }) 
    }
}

// on change listener
const storeInputCheckboxChoicefromForm = (form, category) => {
    var checkboxes = form.elements[category + "_choice"];
    for(var i = 0, max = checkboxes.length; i < max; i++) {
        
        checkboxes[i].addEventListener('change',function() {
            setChoice(this.id, this.checked);
        }) 
    }
}

// on click listeners
const storeRadioChoicefromForm = (form, category) => {
    var radios = form.elements[category + "_choice"];
    for(var i = 0, max = radios.length; i < max; i++) {
        radios[i].onclick = function() {
            setChoice(category,this.value);
        }
    }
}

const setChoice = (findFormName, setChoice) => {
    
    // set object with existing formName
    for (var i in choices) {
        if (choices[i].formName == findFormName) {
            choices[i].choice = setChoice;
            addNextSubQuestion(findFormName);
            return; 
        }
    }
    
    // create new object with formName
    var choice = {formName: findFormName, choice: setChoice};
    choices.push(choice);
    addNextSubQuestion(findFormName);
}

const addNextSubQuestion = (category) => {
    // first question after page switch
    if (currentSection == 0){
        currentSection = 1;
        const nextButton = document.getElementById('nextButton');
        const backButton = document.getElementById('backButton');
        backButton.style.visibility = "visible";
        nextButton.style.visibility = "hidden";
        switch (page){
            case -1:
                backButton.style.visibility = "hidden";
                nextButton.style.visibility = "visible";
                nextButton.innerHTML = "Zurück";
                adviceOncConsultation('ICD');
                break;
            case 0:
                nextButton.innerHTML = "Nein";
                backButton.innerHTML = "Ja";
                addInitialQuestion();
                showButtonById('nextButton');
                showButtonById('backButton');
                break;
            case 1: 
                nextButton.innerHTML = "Weiter";
                backButton.innerHTML = "Zurück";
                askForSex();
                break;
            case 2:
                askForSmoker();
                break;
            case 3:
                askForSecondHandSmoke();
                break;
            case 4:
                askForPollutantLoad();
                break;
            case 5:
                backButton.innerHTML = "Zurück";
                askForGeneticFactor();
                break;
            case 6:
                adviceOncConsultation('Risikofaktor');
                break;
            case 7:
                nextButton.innerHTML = "Weiter";
                backButton.innerHTML = "Risikofaktor";
                askForSymptoms();
                break;
            case 8:
                backButton.innerHTML = "Zurück";
                nextButton.style.visibility = "hidden";
                adviceOncConsultation('Symptome');
                break;
            default:
                // nothing
        }
    }
    else {
        
        switch (category){
            case 'sex':
                if (currentSection != 2){
                    askForAge();
                }
                currentSection = 2;
                break;
            case 'smoker':
                // clear subsequent content
                deleteSubsequentContents('smoker');

                var smoker = choices.find(obj => {
                    return obj.formName === 'smoker'
                })

                switch (smoker.choice){
                    case 'yesSmoker':
                        hideButtonById('nextButton');
                        currentSection = 2;
                        askForCigaretteType();
                        break;
                    case 'exSmoker':
                        hideButtonById('nextButton');
                        currentSection = 2;
                        askForNicotineAbstinence();
                        break;
                    case 'noSmoker':
                        currentSection = 2;
                        showButtonById('nextButton');
                        break;
                    default:
                        alert('choice not found ' + smoker.choice);
                }
                
                break;
            case 'age':
                currentSection = 2;
                showButtonById('nextButton');
                break;
            case 'cigarrette':

                var cigaretteType = choices.find(obj => {
                    return obj.formName === 'cigarrette'
                })

                if (cigaretteType != undefined){
                    if (cigaretteType.choice === 'cigarrette'){
                        if (currentSection != 3){
                            askForPackYears();
                        }
                        currentSection = 3;
                    }
                    else{
                        // cigarello
                        deleteSubsequentContents('cigarrette');
                        showButtonById('nextButton');
                    }
                }
                else {
                    alert('Choose cigarette type!');
                }

                
                
                break;
            case 'packsPerDayNumber':
            case 'yearsOfSmokingNumber':
                currentSection = 3;

                var packsPerDay = choices.find(obj => {
                    return obj.formName === 'packsPerDayNumber'
                })
                var yearsOfSmoking = choices.find(obj => {
                    return obj.formName === 'yearsOfSmokingNumber'
                })
                
                if (packsPerDay != undefined && yearsOfSmoking != undefined){
                    if (packsPerDay.choice <= 0){
                        var packsPerDayEle = document.getElementById('packsPerDayNumber');
                        packsPerDayEle.value = 0;
                        hideButtonById('nextButton');
                    }
                    else if (yearsOfSmoking.choice <= 0){
                        var yearsOfSmokingEle = document.getElementById('yearsOfSmokingNumber');
                        yearsOfSmokingEle.value = 0;
                        hideButtonById('nextButton');
                    }
                    else {
                        showButtonById('nextButton');
                    }
                }
                break;
            case 'abstinence':
                currentSection = 2;
                showButtonById('nextButton');
                break;
            case 'secondHandSmoke':
                
                currentSection = 1;
                var secondHandSmoke = choices.find(obj => {
                    return obj.formName === 'secondHandSmoke'
                })

                if (secondHandSmoke != undefined){
                    if (secondHandSmoke.choice === 'noSecondHandSmoke'){
                        deleteSubsequentContents('secondHandSmoke');
                        showButtonById('nextButton');
                    }
                    else {
                        // secondHandSmoke.choice === 'yesSecondHandSmoke'
                        
                        hideButtonById('nextButton');
                        if (currentSection < 2){
                            askForSecondHandSmokeSource();
                        }
                        currentSection = 2;
                    }
                }
                break;
            case 'secondHandSmokeSource':
                currentSection = 2;
                var secondHandSmokeSource = choices.find(obj => {
                    return obj.formName === 'secondHandSmokeSource'
                })

                if (secondHandSmokeSource != undefined){
                    if (secondHandSmokeSource.choice === 'partnerSecondHandSmokeSource'){
                        deleteSubsequentContents('secondHandSmokeSource');
                        showButtonById('nextButton');
                    }
                    else {
                        // secondHandSmokeSource.choice === 'workSecondHandSmokeSource'
                        hideButtonById('nextButton');
                        
                        if (currentSection < 3){
                            askForSecondHandSmokeDuration();
                        }
                        currentSection = 3;
                        
                    }
                }
                break;
            case 'secondHandSmokeDuration':
                showButtonById('nextButton');
                break;
            case 'pollutantLoad':
                currentSection = 1;
                var pollutantLoad = choices.find(obj => {
                    return obj.formName === 'pollutantLoad'
                })

                if (pollutantLoad != undefined){
                    if (pollutantLoad.choice === 'pollutantLoadGeneral' || pollutantLoad.choice === 'pollutantLoadNone'){
                        deleteSubsequentContents('pollutantLoad');
                        showButtonById('nextButton');
                    }
                    else {
                        // pollutantLoad.choice === 'pollutantLoadWork'
                        
                        hideButtonById('nextButton');
                        if (currentSection < 2){
                            askForPollutantLoadKind();
                        }
                        currentSection = 2;
                    }
                }
                break;
            case 'pollutantLoadKind':
                showButtonById('nextButton');
                break;
            case 'geneticFactor':
                showButtonById('nextButton');
                break;
            case 'symptomPersistentCough':
            case 'symptomWeightLoss':
            case 'symptomDyspnoea':
            case 'symptomChestPain':
            case 'symptomSputum':
            case 'symptomFeverNigthSweat':
            case 'symptomFatigue':
            case 'symptomHoarseness':
            case 'symptomChronicCough':
                showButtonById('nextButton');
                break;
            default:
                alert('category \'' + category + '\' not found in section ' + currentSection);

        }
    }
    

    
}


const hideButtonById = (id) => {
    const button = document.getElementById(id);
    button.style.visibility = "hidden";
}

const showButtonById = (id) => {
    const button = document.getElementById(id);
    button.style.visibility = "visible";
}

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDolist");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDolist.addItemToList(newToDoItem);
    });
};

const refreshThePage = () => {
    
    clearTheListDisplay();
    renderList();
    clearTheItemEntryField();
    setFocusOnItemEntry();
}

const clearTheListDisplay = () => {
    const parentElement = document.getElementById("mainQuestions");
    deleteContents(parentElement);
}



const deleteSubsequentContents = (currentElementID) => {
    var currentElement = document.getElementById(currentElementID + '_div')
    
    let child = container.lastElementChild;
    while (child != currentElement){
        
        container.removeChild(child);
        child = container.lastElementChild;
        
    }
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = toDolist.getList();
    list.forEach(item => {
        buildListItem(item);
    });

};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = "new";
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = "new";
    label.textContent = "ZickeZacke";
    div.appendChild(check);
    div.appendChild(label);
    //const container = document.getElementById("listItems");
    container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        console.log("huhu!")
        udpatePersistentData(toDolist.getList());
        setTimeout(() => {
            refreshThePage();
        }, 1000);
    });
};

const udpatePersistentData = (listArray) => {
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
}

const clearTheItemEntryField = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();

    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDolist.addItemToList(toDoItem);
    udpatePersistentData(toDolist.getList());
    refreshThePage();
};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDolist.getList();
    if (list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};