//Maybe also add a default 'leniancy' or smth for typos - some words might need to be more exact than others to make sure right
//Work out whether I still need group and what it should be if I do have it - at the moment I am just doing the original group names, but easily changed
//For indecl, should this be part 2 or extra info?

//Is it better to split the words into lists by type, or not as the class defines their type? Look into this. - has a bearing on how I use group

function toggleGroup(source) {
    const group = source.dataset.group;
    const checkboxes = document.querySelectorAll(`input[data-group="${group}"]`);
    
    checkboxes.forEach(cb => {
        cb.checked = source.checked;
    });
}

function All(source) {
    const checkboxes = document.querySelectorAll('input[data-group]');

    checkboxes.forEach(cb => {
        cb.checked = source.checked;
    });
}

function EngLat(id) {
    for (var i = 1;i <= 2; i++) {
        document.getElementById("Check" + i).checked = false;
    }
    document.getElementById(id).checked = true;
}

//Shuffling algorithm - Fisher-Yates Shuffle (I have no idea how it works)
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

//Following two functions wait until enter is pressed to continue and then get the value from the textbox - do not know how they work exactly
function waitingKeypress() {
    return new Promise((resolve) => {
      document.addEventListener('keydown', onKeyHandler);
      function onKeyHandler(e) {
        if (e.keyCode === 13) {
          document.removeEventListener('keydown', onKeyHandler);
          resolve();
        }
      }
    });
  }

async function GetUserInput() {
    const textbox = document.getElementById('textbox');
    textbox.value = "";
    await waitingKeypress();
    //Gets the textbox element
    Answer = document.getElementById('textbox').value.toLowerCase().trim();
    textbox.value = ""; // Clear the textbox after getting the value
    return Answer;
}

function UpdateProgressAndScore(WantedVocab) {
    const progressBar = document.getElementsByClassName('w3-progressbar')[0]; //Needs 0 as getElementsByClassName returns an array
    const Progress = document.getElementById('Progress');
    const Score = document.getElementById('Score');

    progressBar.style.width = `${(TotalQs/WantedVocab.length)*100}%`;
    Progress.innerHTML = `Progress: ${TotalQs}/${WantedVocab.length}`;
    Score.innerHTML = `Score: ${mark}/${TotalQs}`;
}

//I have changed where CorrectTypo is so that it is not used for english to latin - this is for two reasons:

// 1) Accuracy is important as endings of words need to be correct
// 2) CorrectTypo was causing english to latin to not work at all

//I need to work out how to work with the null values
function CheckAnswer(currentValue, englat, Answers, UserAnswer, Prompt, latinRep) { //In middle of complete revamp as need to change Question and CorrectAnswer functionality
    let message = "";
    i = currentValue;
    if (UserAnswer == "skip" || UserAnswer == "") {
        if (englat == "0") {
            message =  `Answer(s): ${Answers.join(", ")}`;
            Incorrect.push([Prompt, " ----- ", Answers.join(", ")]);
        } else {
            message =  `Answer(s): ${latinRep}`;
            Incorrect.push([Prompt + " ----- " + latinRep]);
        }
    } else {
        if (englat == 0) { //Latin to English
            if (Answers.includes(UserAnswer)) {
                //Makes it show you other correct answers if there are any
                if (Answers.length == 1) {
                    message = "That was correct! Well done!";
                } else {
                    message = `That was correct! Well done! Other possible answers include: ${Answers.slice(0, Answers.indexOf(UserAnswer))} ${Answers.slice(Answers.indexOf(UserAnswer)+1)}`; //See if I can improve and simplify this line
                }
                mark += 1;
                ToRemove.push(i);
            } else {
                message = "Unlucky, but that was the wrong answer. Here is the correct answer: " + Answers.join(", ");
                Incorrect.push([Prompt + " ----- " + Answers.join(", ")]); // This is new - does it work? Could it be made into a function? --> Would need to change depending on englat
                }
        } else { //English to Latin
            if (UserAnswer == Answers[0] || UserAnswer == Answers.join(", ")) {
                message = "That was correct! Well done!";
                mark += 1;
                ToRemove.push(i);
            } else {
                message = "Unlucky, but that was the wrong answer. Here is the correct answer: " + latinRep;
                Incorrect.push([Prompt + " ----- " + latinRep]); // This is new - does it work? Could it be made into a function? --> Would need to change depending on englat
            }
        }
        }
    return message
} 

function AddVocab(groups, vocabList) {
    let WantedVocab = vocabList.filter(el => groups.includes(el['group']));
    return WantedVocab;
}

async function TestLoop(WantedVocab, WantedVocabBackup, englat) {
    const ProgressDiv = document.getElementById('ProgressDiv');
    const IncorrectAnswersSect = document.getElementById('Incorrect');
    const Info = document.getElementById('Info');
    const PromptBox = document.getElementById('Prompt')
    //const QueryBox = document.getElementById('queryBox');
    
    IncorrectAnswersSect.style.display="none";
    //QueryBox.style.display = "block";
    ProgressDiv.style.display = "block";
    Info.style.display = "block";

    TotalQs = 0;
    mark = 0;
    Incorrect = [];
    ToRemove = [];

    shuffle(WantedVocab);

    for (i of WantedVocab) { // Word testing loop - perhaps make into a function?

        latinRep = i.latinRep();

        if (englat == 0) { //Latin to English
            var Prompt = latinRep;
            var Answers = i.answers;
        }
        else if (englat == 1) { // English to Latin
            var Prompt = i.englishRep();
            var Answers = i.latinParts();
        }

        Info.innerHTML = "<br>";
        Info.style.visibility="hidden";
        UpdateProgressAndScore(WantedVocab);

        //Gives the prompt for the answer
        PromptBox.innerHTML=Prompt.toUpperCase();
        UserAnswer = await GetUserInput();

        if (englat == 0) { //Try and make CorrectTypo work for english to latin so we dont need to do this
            UserAnswer = CorrectTypo(Answers, UserAnswer);
        }

        message = CheckAnswer(i, englat, Answers, UserAnswer, Prompt, latinRep);

        Info.style.visibility="visible";
        Info.innerHTML = message;

        TotalQs++;

        await waitingKeypress();
    }

    UpdateProgressAndScore(WantedVocab);
    //QueryBox.style.display="none";
    Info.style.display = "none"; // Changed to hidden to clean up finished test screen 
    
    if (mark != TotalQs) {
        IncorrectAnswersSect.innerHTML ="The word(s) you got incorrect, along with their answers, were: <br><br>"; // Changed this from Info to IncorrectSect to clean up layout at end of test
        IncorrectAnswersSect.style.display="block";
        IncorrectAnswersSect.innerHTML += Incorrect.join("<br>");
    }
    else {
        Info.innerHTML ="Amazing! You got every question correct!";
    }

    PromptBox.innerHTML="Would you like to retest with: <br>The previous vocab (say 1), <br>Incorrect vocab (say 2), <br>Different vocab (say 3), <br>or Original vocab (say 4)?";//, or the original vocab (say '4')?
    UserAnswer = await GetUserInput();
    while (! ['1', '2', '3', '4'].includes(UserAnswer)) {
        PromptBox.innerHTML="That is not a valid answer. Would you like to retest with: <br>The previous vocab (say 1), <br>Incorrect vocab (say 2), <br>Different vocab (say 3), <br>or Original vocab (say 4)?"; //, or the original vocab (say '4')?
        UserAnswer = await GetUserInput();
    }

    if (UserAnswer == '1') { //Redo previous vocab
        await TestLoop(WantedVocab, WantedVocabBackup, englat);
    } else if (UserAnswer == '2') { //Only incorrect vocab
        WantedVocab = WantedVocab.filter((el) => !ToRemove.includes(el)); //Filters out the correct answers from the array - Check why this works
        await TestLoop(WantedVocab, WantedVocabBackup, englat)
    } else if (UserAnswer == '3') { //Different vocab
        location.reload();
    } else { //Original vocab
        await TestLoop(WantedVocabBackup, WantedVocabBackup, englat);
    }
}

async function BeginTest() { //Do I need all of the different classes - I could just have a list called LatinParts as the 1st param
    class Word {
        constructor(answers, group, englatmast, latengmast, extraInfo) {
            this.answers = answers;
            this.group = group;
            this.englatmast = englatmast;
            this.latengmast = latengmast;
            this.extraInfo = extraInfo;
        }
        englishRep() {
            return this.answers.join(", ")
        }
    }
    
    class Noun extends Word {
        constructor(nominative, genitive, gender, answers, group, englatmast, latengmast, extraInfo) {
            super(answers, group, englatmast, latengmast, extraInfo);  // Call the parent's constructor passing shared attributes like answers, group, etc, using *args - what mean?
            this.nominative = nominative;
            this.genitive = genitive;
            this.gender = gender;
        }
        latinRep() {
            return [this.nominative, this.genitive].filter(x => x).join(", ") //.filter(x => x) removes any 'falsy' values - e.g. null - for stopping the comma word repetition problem
        }
        latinParts() {
            return [this.nominative, this.genitive]
        }
    }
    
    class Verb extends Word {
        constructor(FirstPP, SecondPP, ThirdPP, FourthPP, answers, group, englatmast, latengmast, extraInfo){
            super(answers, group, englatmast, latengmast, extraInfo);
            this.FirstPP = FirstPP;
            this.SecondPP = SecondPP;
            this.ThirdPP = ThirdPP;
            this.FourthPP = FourthPP;
        }
        latinRep() {
            return [this.FirstPP, this.SecondPP, this.ThirdPP, this.FourthPP].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.FirstPP, this.SecondPP, this.ThirdPP, this.FourthPP]
        }
    }
    
    class TOTAdj extends Word {
        constructor(Second, First, SecondNeuter, answers, group, englatmast, latengmast, extraInfo){
            super(answers, group, englatmast, latengmast, extraInfo);
            this.Second = Second;
            this.First = First;
            this.SecondNeuter = SecondNeuter;
        }
        latinRep() {
            return [this.Second, this.First, this.SecondNeuter].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Second, this.First, this.SecondNeuter]
        }
    }
    
    class TTAdj extends Word {
        constructor(Nom, Gen, answers, group, englatmast, latengmast, extraInfo){
            super(answers, group, englatmast, latengmast, extraInfo);
            this.Nom = Nom;
            this.Gen = Gen;
        }
        latinRep() {
            return [this.Nom, this.Gen].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Nom, this.Gen]
        }
    }
    
    class IrregCompAdj extends Word { //Need to check this constructor is technically accurate
        constructor(Nom, Gen, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo);
            this.nominative = Nom;
            this.genitive = Gen;
        }
        latinRep() {
            return [this.nominative, this.genitive].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.nominative, this.genitive]
        }
    }
    
    class Adverb extends Word { //Need to work out the technical language for this type (Part2 is usually indecl, not always)
        constructor(Part1, Part2, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo);
            this.Part1 = Part1;
            this.Part2 = Part2;
        }
        latinRep() {
            return [this.Part1, this.Part2].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Part1, this.Part2]
        }
    }
    
    class Pronoun extends Word { //Need to work out the technical language for this type - sometimes it has two parts, sometimes 3
        constructor(Part1, Part2, Part3, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo);
            this.Part1 = Part1;
            this.Part2 = Part2;
            this.Part3 = Part3;
        }
        latinRep() {
            return [this.Part1, this.Part2, this.Part3].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Part1, this.Part2, this.Part3]
        }
    }
    
    class Preposition extends Word {
        constructor(Word, Case, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo);
            this.Word = Word;
            this.Case = Case;
        }
        latinRep() {
            return [this.Word, this.Case].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Word, this.Case]
        }
    }
    
    class Conjunction extends Word {
        constructor(Word, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo)
            this.Word = Word;
        }
        latinRep() {
            return [this.Word, this.extraInfo].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.Word]
        }
    }
    
    class Misc extends Word {
        constructor(P1, P2, answers, group, englatmast, latengmast, extraInfo){ 
            super(answers, group, englatmast, latengmast, extraInfo)
            this.P1 = P1;
            this.P2 = P2;
        }
        latinRep() {
            return [this.P1, this.P2, this.extraInfo].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.P1, this.P2]
        }
    }
    
    class Numeral extends Word {
        constructor(P1, P2, P3, answers, group, englatmast, latengmast, extraInfo) {
            super(answers, group, englatmast, latengmast, extraInfo)
            this.P1 = P1
            this.P2 = P2
            this.P3 = P3
        }
        latinRep() {
            return [this.P1, this.P2, this.P3, this.extraInfo].filter(x => x).join(", ")
        }
        latinParts() {
            return [this.P1, this.P2, this.P3]
        }
    }

    var Eduqas = [ //Maybe use a for loop to add the words from a separate text document into an empty list - we could even leave this out and just add the words at the point where we know the chosen word sections

        //Nouns 1
    
        new Noun('ancilla', 'ancillae', 'f', ['slave-girl', 'maid', 'slave girl', 'slavegirl'], 'nouns1', 0, 0, null),
        new Noun('aqua', 'aquae', 'f', ['water'], 'nouns1', 0, 0, null),
        new Noun('cena', 'cenae', 'f', ['dinner', 'meal'], 'nouns1', 0, 0, null),
        new Noun('cura', 'curae', 'f', ['care', 'worry'], 'nouns1', 0, 0, null),
        new Noun('dea', 'deae', 'f', ['goddess'], 'nouns1', 0, 0, null),
        new Noun('domina', 'dominae', 'f', ['mistress'], 'nouns1', 0, 0, null),
        new Noun('epistula', 'epistulae', 'f', ['letter'], 'nouns1', 0, 0, null),
        new Noun('femina', 'feminae', 'f', ['woman'], 'nouns1', 0, 0, null),
        new Noun('filia', 'filiae', 'f', ['daughter'], 'nouns1', 0, 0, null),
        new Noun('hora', 'horae', 'f', ['hour'], 'nouns1', 0, 0, null),
        new Noun('ianua', 'ianuae', 'f', ['door'], 'nouns1', 0, 0, null),
        new Noun('insula', 'insulae', 'f', ['island', 'block of flats'], 'nouns1', 0, 0, null),
        new Noun('ira', 'irae', 'f', ['anger'], 'nouns1', 0, 0, null),
        new Noun('nauta', 'nautae', 'm', ['sailor'], 'nouns1', 0, 0, null),
        new Noun('pecunia', 'pecuniae', 'f', ['money'], 'nouns1', 0, 0, null),
        new Noun('poena', 'poenae', 'f', ['punishment'], 'nouns1', 0, 0, null),
        new Noun('porta', 'portae', 'f', ['gate'], 'nouns1', 0, 0, null),
        new Noun('puella', 'puellae', 'f', ['girl'], 'nouns1', 0, 0, null),
        new Noun('regina', 'reginae', 'f', ['queen'], 'nouns1', 0, 0, null),
        new Noun('Roma', 'Romae', 'f', ['rome'], 'nouns1', 0, 0, '(romae = at/in rome)'),
        new Noun('silva', 'silvae', 'f', ['wood'], 'nouns1', 0, 0, null),
        new Noun('taberna', 'tabernae', 'f', ['shop', 'inn'], 'nouns1', 0, 0, null),
        new Noun('terra', 'terrae', 'f', ['land', 'ground'], 'nouns1', 0, 0, null),
        new Noun('turba', 'turbae', 'f', ['crowd'], 'nouns1', 0, 0, null),
        new Noun('via', 'viae', 'f', ['street', 'road', 'way'], 'nouns1', 0, 0, null),
        new Noun('villa', 'villae', 'f', ['house', 'country house'], 'nouns1', 0, 0, null),
        new Noun('vita', 'vitae', 'f', ['life'], 'nouns1', 0, 0, null),
    
        //Nouns 2
    
        new Noun('amicus', 'amici', 'm', ['friend'], 'nouns2', 0, 0, null),
        new Noun('animus', 'animi', 'm', ['spirit', 'soul', 'mind'], 'nouns2', 0, 0, null),
        new Noun('annus', 'anni', 'm', ['year'], 'nouns2', 0, 0, null),
        new Noun('bellum', 'belli', 'n', ['war'], 'nouns2', 0, 0, null),
        new Noun('caelum', 'caeli', 'm', ['sky', 'heaven'], 'nouns2', 0, 0, null),
        new Noun('cibus', 'cibi', 'm', ['food'], 'nouns2', 0, 0, null),
        new Noun('consilium', 'consilii', 'n', ['plan', 'idea', 'advice'], 'nouns2', 0, 0, null),
        new Noun('deus', 'dei', 'm', ['god'], 'nouns2', 0, 0, null),
        new Noun('dominus', 'domini', 'm', ['master'], 'nouns2', 0, 0, null),
        new Noun('donum', 'doni', 'n', ['gift', 'present'], 'nouns2', 0, 0, null),
        new Noun('equus', 'equi', 'm', ['horse'], 'nouns2', 0, 0, null),
        new Noun('filius', 'filii', 'm', ['son'], 'nouns2', 0, 0, null),
        new Noun('forum', 'fori', 'n', ['forum', 'market-place', 'marketplace'], 'nouns2', 0, 0, null),
        new Noun('gladius', 'gladii', 'm', ['sword'], 'nouns2', 0, 0, null),
        new Noun('hortus', 'horti', 'm', ['garden'], 'nouns2', 0, 0, null),
        new Noun('imperium', 'imperii', 'n', ['empire', 'power', 'command'], 'nouns2', 0, 0, null),
        new Noun('legatus', 'legati', 'm', ['commander'], 'nouns2', 0, 0, null),
        new Noun('liberi', 'liberorum', 'mpl', ['children'], 'nouns2', 0, 0, null),
        new Noun('libertus', 'liberti', 'm', ['freedman', 'ex-slave'], 'nouns2', 0, 0, null),
        new Noun('locus', 'loci', 'm', ['place'], 'nouns2', 0, 0, null),
        new Noun('maritus', 'mariti', 'm', ['husband'], 'nouns2', 0, 0, null),
        new Noun('modus', 'modi', 'm', ['manner', 'way', 'kind'], 'nouns2', 0, 0, null),
        new Noun('murus', 'muri', 'm', ['wall'], 'nouns2', 0, 0, null),
        new Noun('nuntius', 'nuntii', 'm', ['messenger', 'message', 'news'], 'nouns2', 0, 0, null),
        new Noun('periculum', 'periculi', 'n', ['danger'], 'nouns2', 0, 0, null),
        new Noun('praemium', 'praemii', 'n', ['prize', 'reward', 'profit'], 'nouns2', 0, 0, null),
        new Noun('puer', 'pueri', 'm', ['boy'], 'nouns2', 0, 0, null),
        new Noun('servus', 'servi', 'm', ['slave'], 'nouns2', 0, 0, null),
        new Noun('signum', 'signi', 'n', ['sign', 'signal', 'seal'], 'nouns2', 0, 0, null),
        new Noun('templum', 'templi', 'n', ['temple'], 'nouns2', 0, 0, null),
        new Noun('verbum', 'verbi', 'n', ['word'], 'nouns2', 0, 0, null),
        new Noun('vestimenta', 'vestimentorum', 'npl', ['clothes'], 'nouns2', 0, 0, null),
        new Noun('vinum', 'vini', 'n', ['wine'], 'nouns2', 0, 0, null),
        new Noun('vir', 'viri', 'm', ['man'], 'nouns2', 0, 0, null),
    
        //Nouns 3
    
        new Noun('amor', 'amoris', 'm', ['love'], 'nouns3', 0, 0, null),
        new Noun('canis', 'canis', 'm', ['dog'], 'nouns3', 0, 0, null),
        new Noun('caput', 'capitis', 'n', ['head'], 'nouns3', 0, 0, null),
        new Noun('civis', 'civis', 'm/f', ['citizen'], 'nouns3', 0, 0, null),
        new Noun('clamor', 'clamoris', 'm', ['shout'], 'nouns3', 0, 0, null),
        new Noun('comes', 'comitis', 'm/f', ['comrade', 'companion'], 'nouns3', 0, 0, null),
        new Noun('corpus', 'corporis', 'n', ['body'], 'nouns3', 0, 0, null),
        new Noun('custos', 'custodis', 'm/f', ['guard'], 'nouns3', 0, 0, null),
        new Noun('dux', 'ducis', 'm', ['leader'], 'nouns3', 0, 0, null),
        new Noun('flumen', 'fluminis', 'n', ['river'], 'nouns3', 0, 0, null),
        new Noun('frater', 'fratris', 'm', ['brother'], 'nouns3', 0, 0, null),
        new Noun('homo', 'hominis', 'm', ['man', 'human being', 'person'], 'nouns3', 0, 0, null),
        new Noun('hostis', 'hostis', 'm', ['enemy'], 'nouns3', 0, 0, null),
        new Noun('ignis', 'ignis', 'm', ['fire'], 'nouns3', 0, 0, null),
        new Noun('imperator', 'imperatoris', 'm', ['emperor', 'commander', 'general'], 'nouns3', 0, 0, null),
        new Noun('iter', 'itineris', 'n', ['journey', 'route', 'way'], 'nouns3', 0, 0, null),
        new Noun('iuvenis', 'iuvenis', 'm', ['young man'], 'nouns3', 0, 0, null),
        new Noun('labor', 'laboris', 'm', ['work'], 'nouns3', 0, 0, null),
        new Noun('legio', 'legionis', 'f', ['legion'], 'nouns3', 0, 0, null),
        new Noun('lux', 'lucis', 'f', ['light', 'daylight'], 'nouns3', 0, 0, null),
        new Noun('mare', 'maris', 'n', ['sea'], 'nouns3', 0, 0, null),
        new Noun('mater', 'matris', 'f', ['mother'], 'nouns3', 0, 0, null),
        new Noun('miles', 'militis', 'm', ['soldier'], 'nouns3', 0, 0, null),
        new Noun('mons', 'montis', 'm', ['mountain'], 'nouns3', 0, 0, null),
        new Noun('mors', 'mortis', 'f', ['death'], 'nouns3', 0, 0, null),
        new Noun('navis', 'navis', 'f', ['ship'], 'nouns3', 0, 0, null),
        new Noun('nomen', 'nominis', 'n', ['name'], 'nouns3', 0, 0, null),
        new Noun('nox', 'noctis', 'f', ['night'], 'nouns3', 0, 0, null),
        new Noun('pars', 'partis', 'f', ['part'], 'nouns3', 0, 0, null),
        new Noun('pater', 'patris', 'm', ['father'], 'nouns3', 0, 0, null),
        new Noun('pax', 'pacis', 'f', ['peace'], 'nouns3', 0, 0, null),
        new Noun('pes', 'pedis', 'm', ['foot', 'paw'], 'nouns3', 0, 0, null),
        new Noun('princeps', 'principis', 'm', ['chief', 'chieftan', 'emperor'], 'nouns3', 0, 0, null),
        new Noun('rex', 'regis', 'm', ['king'], 'nouns3', 0, 0, null),
        new Noun('sanguis', 'sanguinis', 'm', ['blood'], 'nouns3', 0, 0, null),
        new Noun('senator', 'senatoris', 'm', ['senator'], 'nouns3', 0, 0, null),
        new Noun('senex', 'senis', 'm', ['old man'], 'nouns3', 0, 0, null),
        new Noun('soror', 'sororis', 'f', ['sister'], 'nouns3', 0, 0, null),
        new Noun('tempus', 'temporis', 'n', ['time'], 'nouns3', 0, 0, null),
        new Noun('urbs', 'urbis', 'f', ['city'], 'nouns3', 0, 0, null),
        new Noun('uxor', 'uxoris', 'f', ['wife'], 'nouns3', 0, 0, null),
        new Noun('vox', 'vocis', 'f', ['voice'], 'nouns3', 0, 0, null),
        new Noun('vulnus', 'vulneris', 'n', ['wound'], 'nouns3', 0, 0, null),
    
        //Nouns 4
    
        new Noun('domus', 'domus', 'f', ['home', 'house'], 'nouns4', 0, 0, '(domi = at home)'),
        new Noun('manus', 'manus', 'f', ['hand', 'group of people'], 'nouns4', 0, 0, null),
        new Noun('vultus', 'vultus', 'm', ['expression', 'face'], 'nouns4', 0, 0, null),
    
        //Nouns 5
    
        new Noun('dies', 'diei', 'm', ['day'], 'nouns5', 0, 0, null),
        new Noun('res', 'rei', 'f', ['thing', 'business', 'matter'], 'nouns5', 0, 0, null),
        new Noun('spes', 'spei', 'f', ['hope'], 'nouns5', 0, 0, null),
    
        //Verbs 1
    
        new Verb('adiuvo', 'adiuvare', 'adiuvi', 'adiutus', ['help'], 'verbs1', 0, 0, null),
        new Verb('ambulo', 'ambulare', 'ambulavi', null, ['walk'], 'verbs1', 0, 0, null),
        new Verb('amo', 'amare', 'amavi', 'amatus', ['love', 'like'], 'verbs1', 0, 0, null),
        new Verb('appropinquo (+ dat)', 'appropinquare', 'appropinquavi', null, ['approach', 'come near to'], 'verbs1', 0, 0, null),
        new Verb('celo', 'celare', 'celavi', 'celatus', ['hide'], 'verbs1', 0, 0, null),
        new Verb('clamo', 'clamare', 'clamavi', 'clamatus', ['shout'], 'verbs1', 0, 0, null),
        new Verb('cogito', 'cogitare', 'cogitavi', 'cogitatus', ['think', 'consider'], 'verbs1', 0, 0, null),
        new Verb('curo', 'curare', 'curavi', 'curatus', ['look after', 'care for', 'supervise'], 'verbs1', 0, 0, null),
        new Verb('despero', 'desperare', 'desperavi', 'desperatus', ['despair'], 'verbs1', 0, 0, null),
        new Verb('do', 'dare', 'dedi', 'datus', ['give'], 'verbs1', 0, 0, null),
        new Verb('exspecto', 'exspectare', 'exspectavi', 'exspectatus', ['wait for'], 'verbs1', 0, 0, null),
        new Verb('festino', 'festinare', 'festinavi', null, ['hurry'], 'verbs1', 0, 0, null),
        new Verb('habito', 'habitare', 'habitavi', 'habitatus', ['live'], 'verbs1', 0, 0, null),
        new Verb('impero (+ dat)', 'imperare', 'imperavi', 'imperatus', ['order', 'command'], 'verbs1', 0, 0, null),
        new Verb('intro', 'intrare', 'intravi', 'intratus', ['enter'], 'verbs1', 0, 0, null),
        new Verb('laboro', 'laborare', 'laboravi', null, ['work'], 'verbs1', 0, 0, null),
        new Verb('lacrimo', 'lacrimare', 'lacrimavi', null, ['weep', 'cry'], 'verbs1', 0, 0, null),
        new Verb('laudo', 'laudare', 'laudavi', 'laudatus', ['praise'], 'verbs1', 0, 0, null),
        new Verb('libero', 'liberare', 'liberavi', 'liberatus', ['free', 'set free'], 'verbs1', 0, 0, null),
        new Verb('narro', 'narrare', 'narravi', 'narratus', ['tell', 'relate'], 'verbs1', 0, 0, null),
        new Verb('navigo', 'navigare', 'navigavi', null, ['sail'], 'verbs1', 0, 0, null),
        new Verb('neco', 'necare', 'necavi', 'necatus', ['kill'], 'verbs1', 0, 0, null),
        new Verb('nuntio', 'nuntiare', 'nuntiavi', 'nuntiatus', ['announce', 'report'], 'verbs1', 0, 0, null),
        new Verb('oppugno', 'oppugnare', 'oppugnavi', 'oppugnatus', ['attack'], 'verbs1', 0, 0, null),
        new Verb('oro', 'orare', 'oravi', 'oratus', ['beg', 'beg for'], 'verbs1', 0, 0, null),
        new Verb('paro', 'parare', 'paravi', 'paratus', ['prepare'], 'verbs1', 0, 0, null),
        new Verb('poenas do', 'dare', 'dedi', 'datus', ['pay the penalty', 'be punished', 'pay the price'], 'verbs1', 0, 0, null),
        new Verb('porto', 'portare', 'portavi', 'portatus', ['carry'], 'verbs1', 0, 0, null),
        new Verb('postulo', 'postulare', 'postulavi', 'postulatus', ['demand'], 'verbs1', 0, 0, null),
        new Verb('pugno', 'pugnare', 'pugnavi', null, ['fight'], 'verbs1', 0, 0, null),
        new Verb('puto', 'putare', 'putavi', 'putatus', ['think'], 'verbs1', 0, 0, null),
        new Verb('rogo', 'rogare', 'rogavi', 'rogatus', ['ask', 'ask for'], 'verbs1', 0, 0, null),
        new Verb('saluto', 'salutare', 'salutavi', 'salutatus', ['greet'], 'verbs1', 0, 0, null),
        new Verb('servo', 'servare', 'servavi', 'servatus', ['save', 'look after'], 'verbs1', 0, 0, null),
        new Verb('specto', 'spectare', 'spectavi', 'spectatus', ['look at', 'watch'], 'verbs1', 0, 0, null),
        new Verb('sto', 'stare', 'steti', null, ['stand'], 'verbs1', 0, 0, null),
        new Verb('supero', 'superare', 'superavi', 'superatus', ['overcome', 'overpower'], 'verbs1', 0, 0, null),
        new Verb('voco', 'vocare', 'vocavi', 'vocatus', ['call'], 'verbs1', 0, 0, null),
    
        //Verbs 2
    
        new Verb('appareo', 'apparere', 'apparui', null, ['appear'], 'verbs2', 0, 0, null),
        new Verb('debeo', 'debere', 'debui', 'debitus', ['owe', 'ought', 'should', 'must'], 'verbs2', 0, 0, null),
        new Verb('deleo', 'delere', 'delevi', 'deletus', ['destroy'], 'verbs2', 0, 0, null),
        new Verb('habeo', 'habere', 'habui', 'habitus', ['have'], 'verbs2', 0, 0, null),
        new Verb('iaceo', 'iacere', 'iacui', null, ['lie down'], 'verbs2', 0, 0, null),
        new Verb('iubeo', 'iubere', 'iussi', 'iussus', ['order'], 'verbs2', 0, 0, null),
        new Verb('maneo', 'manere', 'mansi', null, ['remain', 'stay'], 'verbs2', 0, 0, null),
        new Verb('pareo (+ dat)', 'parere', 'parui', null, ['obey'], 'verbs2', 0, 0, null),
        new Verb('pereo', 'perire', 'perii', null, ['die', 'perish'], 'verbs2', 0, 0, null),
        new Verb('persuadeo (+ dat)', 'persuadere', 'persuasi', null, ['persuade'], 'verbs2', 0, 0, null),
        new Verb('placeo (+ dat)', 'placere', 'placui', null, ['please'], 'verbs2', 0, 0, null),
        new Verb('praebeo', 'praebere', 'praebui', 'praebitus', ['provide'], 'verbs2', 0, 0, null),
        new Verb('respondeo', 'respondere', 'respondi', 'responsus', ['reply'], 'verbs2', 0, 0, null),
        new Verb('rideo', 'ridere', 'risi', null, ['laugh', 'smile'], 'verbs2', 0, 0, null),
        new Verb('sedeo', 'sedere', 'sedi', null, ['sit'], 'verbs2', 0, 0, null),
        new Verb('taceo', 'tacere', 'tacui', 'tacitus', ['be silent', 'be quiet'], 'verbs2', 0, 0, null),
        new Verb('teneo', 'tenere', 'tenui', 'tentus', ['hold', 'keep', 'possess'], 'verbs2', 0, 0, null),
        new Verb('terreo', 'terrere', 'terrui', 'territus', ['frighten'], 'verbs2', 0, 0, null),
        new Verb('timeo', 'timere', 'timui', null, ['fear', 'be afraid'], 'verbs2', 0, 0, null),
        new Verb('video', 'videre', 'vidi', 'visus', ['see'], 'verbs2', 0, 0, null),
    
        //Verbs 3
    
        new Verb('accido', 'accidere', 'accidi', null, ['happen'], 'verbs3', 0, 0, null),
        new Verb('ago', 'agere', 'egi', 'actus', ['do', 'act', 'drive'], 'verbs3', 0, 0, null),
        new Verb('bibo', 'bibere', 'bibi', null, ['drink'], 'verbs3', 0, 0, null),
        new Verb('cado', 'cadere', 'cecidi', 'casus', ['fall'], 'verbs3', 0, 0, null),
        new Verb('capio', 'capere', 'cepi', 'captus', ['take', 'catch', 'capture', 'adopt (a plan)'], 'verbs3', 0, 0, null),
        new Verb('cognosco', 'cognoscere', 'cognovi', 'cognitus', ['get to know', 'find out', 'learn'], 'verbs3', 0, 0, null),
        new Verb('cogo', 'cogere', 'coegi', 'coactus', ['force', 'compel'], 'verbs3', 0, 0, null),
        new Verb('conficio', 'conficere', 'confeci', 'confectus', ['finish', 'wear out', 'exhaust'], 'verbs3', 0, 0, null),
        new Verb('conspicio', 'conspicere', 'conspexi', 'conspectus', ['catch sight of', 'notice'], 'verbs3', 0, 0, null),
        new Verb('constituo', 'constituere', 'constitui', 'constitutus', ['decide'], 'verbs3', 0, 0, null),
        new Verb('consumo', 'consumere', 'consumpsi', 'consumptus', ['eat'], 'verbs3', 0, 0, null),
        new Verb('credo (+ dat)', 'credere', 'credidi', 'creditus', ['believe', 'trust', 'have faith in'], 'verbs3', 0, 0, null),
        new Verb('curro', 'currere', 'cucurri', 'cursus', ['run'], 'verbs3', 0, 0, null),
        new Verb('dico', 'dicere', 'dixi', 'dictus', ['say'], 'verbs3', 0, 0, null),
        new Verb('discedo', 'discedere', 'discessi', null, ['depart', 'leave'], 'verbs3', 0, 0, null),
        new Verb('duco', 'ducere', 'duxi', 'ductus', ['lead', 'take'], 'verbs3', 0, 0, null),
        new Verb('effugio', 'effugere', 'effugi', null, ['escape'], 'verbs3', 0, 0, null),
        new Verb('emo', 'emere', 'emi', 'emptus', ['buy'], 'verbs3', 0, 0, null),
        new Verb('facio', 'facere', 'feci', 'factus', ['make', 'do'], 'verbs3', 0, 0, null),
        new Verb('frango', 'frangere', 'fregi', 'fractus', ['break'], 'verbs3', 0, 0, null),
        new Verb('fugio', 'fugere', 'fugi', null, ['run away', 'flee'], 'verbs3', 0, 0, null),
        new Verb('gero', 'gerere', 'gessi', 'gestus', ['wear (clothes)', 'wage (war)'], 'verbs3', 0, 0, null),
        new Verb('iacio', 'iacere', 'ieci', 'iactus', ['throw'], 'verbs3', 0, 0, null),
        new Verb('incendo', 'incendere', 'incendi', 'incensus', ['burn', 'set on fire'], 'verbs3', 0, 0, null),
        new Verb('intellego', 'intellegere', 'intellexi', 'intellectus', ['understand', 'realise'], 'verbs3', 0, 0, null),
        new Verb('lego', 'legere', 'legi', 'lectus', ['read', 'choose'], 'verbs3', 0, 0, null),
        new Verb('mitto', 'mittere', 'misi', 'missus', ['send'], 'verbs3', 0, 0, null),
        new Verb('occido', 'occidere', 'occidi', 'occisus', ['kill'], 'verbs3', 0, 0, null),
        new Verb('ostendo', 'ostendere', 'ostendi', 'ostentus', ['show'], 'verbs3', 0, 0, null),
        new Verb('peto', 'petere', 'petivi', 'petitus', ['make for', 'attack', 'seek', 'beg', 'ask for'], 'verbs3', 0, 0, null),
        new Verb('pono', 'ponere', 'posui', 'positus', ['put', 'place', 'put up'], 'verbs3', 0, 0, null),
        new Verb('procedo', 'procedere', 'processi', null, ['advance', 'proceed'], 'verbs3', 0, 0, null),
        new Verb('promitto', 'promittere', 'promisi', 'promissus', ['promise'], 'verbs3', 0, 0, null),
        new Verb('quaero', 'quaerere', 'quaesivi', 'quaesitus', ['search for', 'look for', 'ask'], 'verbs3', 0, 0, null),
        new Verb('rapio', 'rapere', 'rapui', 'raptus', ['seize', 'grab'], 'verbs3', 0, 0, null),
        new Verb('reddo', 'reddere', 'reddidi', 'redditus', ['give back', 'restore'], 'verbs3', 0, 0, null),
        new Verb('relinquo', 'relinquere', 'reliqui', 'relictus', ['leave', 'leave behind'], 'verbs3', 0, 0, null),
        new Verb('resisto (+ dat)', 'resistere', 'restiti', null, ['resist'], 'verbs3', 0, 0, null),
        new Verb('scribo', 'scribere', 'scripsi', 'scriptus', ['write'], 'verbs3', 0, 0, null),
        new Verb('surgo', 'surgere', 'surrexi', null, ['get up', 'stand up', 'rise'], 'verbs3', 0, 0, null),
        new Verb('trado', 'tradere', 'tradidi', 'traditus', ['hand over'], 'verbs3', 0, 0, null),
        new Verb('traho', 'trahere', 'traxi', 'tractus', ['drag', 'draw', 'pull'], 'verbs3', 0, 0, null),
        new Verb('vendo', 'vendere', 'vendidi', 'venditus', ['sell'], 'verbs3', 0, 0, null),
        new Verb('vinco', 'vincere', 'vici', 'victus', ['conquer', 'win', 'be victorious'], 'verbs3', 0, 0, null),
        new Verb('vivo', 'vivere', 'vixi', null, ['live', 'be alive'], 'verbs3', 0, 0, null),
    
        //Verbs 4
    
        new Verb('accipio', 'accipere', 'accepi', 'acceptus', ['accept', 'take in', 'receive'], 'verbs4', 0, 0, null),
        new Verb('advenio', 'advenire', 'adveni', null, ['arrive'], 'verbs4', 0, 0, null),
        new Verb('aperio', 'aperire', 'aperui', 'apertus', ['open'], 'verbs4', 0, 0, null),
        new Verb('audio', 'audire', 'audivi', 'auditus', ['hear', 'listen to'], 'verbs4', 0, 0, null),
        new Verb('cupio', 'cupere', 'cupivi', null, ['want', 'desire'], 'verbs4', 0, 0, null),
        new Verb('dormio', 'dormire', 'dormivi', null, ['sleep'], 'verbs4', 0, 0, null),
        new Verb('invenio', 'invenire', 'inveni', 'inventus', ['find'], 'verbs4', 0, 0, null),
        new Verb('nescio', 'nescire', 'nescivi', null, ['not know'], 'verbs4', 0, 0, null),
        new Verb('scio', 'scire', 'scivi', 'scitus', ['know'], 'verbs4', 0, 0, null),
        new Verb('sentio', 'sentire', 'sensi', 'sensus', ['feel', 'notice'], 'verbs4', 0, 0, null),
        new Verb('venio', 'venire', 'veni', null, ['come'], 'verbs4', 0, 0, null),
    
        //Irregular Verbs
    
        new Verb('absum', 'abesse', null, null, ['be out', 'be absent', 'be away'], 'IrregVerbs', 0, 0, null),
        new Verb('adsum', 'adesse', null, null, ['be here', 'be present'], 'IrregVerbs', 0, 0, null),
        new Verb('aufero', 'auferre', 'abstuli', 'ablatus', ['take away', 'carry off', 'steal'], 'IrregVerbs', 0, 0, null),
        new Verb('coepi', 'coepisse', 'coeptus', null, ['began'], 'IrregVerbs', 0, 0, null),
        new Verb('eo', 'ire', 'ii', null, ['go'], 'IrregVerbs', 0, 0, null),
        new Verb('fero', 'ferre', 'tuli', 'latus', ['bring', 'carry', 'bear'], 'IrregVerbs', 0, 0, null),
        new Verb('inquit', null, null, null, ['say', 'said'], 'IrregVerbs', 0, 0, null),
        new Verb('nolo', 'nolle', 'nolui', null, ['not want', 'refuse'], 'IrregVerbs', 0, 0, null),
        new Verb('offero', 'offere', 'obtuli', 'oblatus', ['offer'], 'IrregVerbs', 0, 0, null),
        new Verb('possum', 'posse', null, null, ['can', 'be able'], 'IrregVerbs', 0, 0, null),
        new Verb('redeo', 'redire', 'redii', null, ['go back', 'come back', 'return'], 'IrregVerbs', 0, 0, null),
        new Verb('refero', 'referre', 'retuli', 'relatus', ['bring back', 'carry back', 'report', 'tell'], 'IrregVerbs', 0, 0, null),
        new Verb('sum', 'esse', 'fui', null, ['be'], 'IrregVerbs', 0, 0, null),
        new Verb('tollo', 'tollere', 'sustuli', 'sublatus', ['raise', 'lift up'], 'IrregVerbs', 0, 0, null),
        new Verb('volo', 'velle', 'volui', null, ['want'], 'IrregVerbs', 0, 0, null),
    
        //Deponent Verbs 
    
        new Verb('conor', 'conari', 'conatus sum', null, ['try'], 'DepVerbs', 0, 0, null),
        new Verb('egredior', 'egredi', 'egressus sum', null, ['go out'], 'DepVerbs', 0, 0, null),
        new Verb('ingredior', 'ingredi', 'ingressus sum', null, ['enter'], 'DepVerbs', 0, 0, null),
        new Verb('loquor', 'loqui', 'locutus sum', null, ['speak'], 'DepVerbs', 0, 0, null),
        new Verb('morior', 'mori', 'mortuus sum', null, ['die'], 'DepVerbs', 0, 0, null),
        new Verb('progredior', 'progredi', 'progressus sum', null, ['advance'], 'DepVerbs', 0, 0, null),
        new Verb('regredior', 'regredi', 'regressus sum', null, ['go back', 'return'], 'DepVerbs', 0, 0, null),
        new Verb('sequor', 'sequi', 'secutus sum', null, ['follow'], 'DepVerbs', 0, 0, null),
    
        //212 Adjectives
    
        new TOTAdj('altus', 'alta', 'altum', ['high', 'deep'], '212Adj', 0, 0, null),
        new TOTAdj('benignus', 'benigna', 'benignum', ['kind', 'generous'], '212Adj', 0, 0, null),
        new TOTAdj('bonus', 'bona', 'bonum', ['good'], '212Adj', 0, 0, null),
        new TOTAdj('carus', 'cara', 'carum', ['dear'], '212Adj', 0, 0, null),
        new TOTAdj('ceteri', 'ceterae', 'cetera', ['the rest', 'the others', 'rest', 'others'], '212Adj', 0, 0, null),
        new TOTAdj('dirus', 'dira', 'dirum', ['dreadful'], '212Adj', 0, 0, null),
        new TOTAdj('durus', 'dura', 'durum', ['hard', 'harsh'], '212Adj', 0, 0, null),
        new TOTAdj('iratus', 'irata', 'iratum', ['angry'], '212Adj', 0, 0, null),
        new TOTAdj('laetus', 'laeta', 'laetum', ['happy'], '212Adj', 0, 0, null),
        new TOTAdj('latus', 'lata', 'latum', ['wide'], '212Adj', 0, 0, null),
        new TOTAdj('longus', 'longa', 'longum', ['long'], '212Adj', 0, 0, null),
        new TOTAdj('magnus', 'magna', 'magnum', ['big', 'large', 'great'], '212Adj', 0, 0, null),
        new TOTAdj('malus', 'mala', 'malum', ['evil', 'bad'], '212Adj', 0, 0, null),
        new TOTAdj('maximus', 'maxima', 'maximum', ['the biggest', 'the greatest', 'very big', 'very great', 'biggest', 'greatest'], '212Adj', 0, 0, null),
        new TOTAdj('medius', 'media', 'medium', ['middle', 'middle of'], '212Adj', 0, 0, null),
        new TOTAdj('minimus', 'minima', 'minimum', ['very little', 'very small'], '212Adj', 0, 0, null),
        new TOTAdj('miser', 'misera', 'miserum', ['miserable', 'wretched', 'sad'], '212Adj', 0, 0, null),
        new TOTAdj('multus', 'multa', 'multum', ['much', 'many'], '212Adj', 0, 0, null),
        new TOTAdj('novus', 'nova', 'novum', ['new'], '212Adj', 0, 0, null),
        new TOTAdj('nullus', 'nulla', 'nullum', ['not any', 'no'], '212Adj', 0, 0, null),
        new TOTAdj('optimus', 'optima', 'optimum', ['the best', 'very good', 'excellent'], '212Adj', 0, 0, null),
        new TOTAdj('parvus', 'parva', 'parvum', ['small'], '212Adj', 0, 0, null),
        new TOTAdj('pauci', 'paucae', 'pauci', ['few', 'a few'], '212Adj', 0, 0, null),
        new TOTAdj('perterritus', 'perterrita', 'perterritum', ['terrified'], '212Adj', 0, 0, null),
        new TOTAdj('pessimus', 'pessima', 'pessimum', ['the worst', 'very bad'], '212Adj', 0, 0, null),
        new TOTAdj('plenus', 'plena', 'plenum', ['full'], '212Adj', 0, 0, null),
        new TOTAdj('primus', 'prima', 'primum', ['first'], '212Adj', 0, 0, null),
        new TOTAdj('proximus', 'proxima', 'proximum', ['nearest', 'next to'], '212Adj', 0, 0, null),
        new TOTAdj('pulcher', 'pulchra', 'pulchrum', ['beautiful', 'handsome'], '212Adj', 0, 0, null),
        new TOTAdj('quantus?', 'quanta?', 'quantum?', ['how big?, how much?'], '212Adj', 0, 0, null),
        new TOTAdj('Romanus', 'Romana', 'Romanum', ['Roman', 'roman'], '212Adj', 0, 0, null),
        new TOTAdj('sacer', 'sacra', 'sacrum', ['sacred'], '212Adj', 0, 0, null),
        new TOTAdj('saevus', 'saeva', 'saevum', ['savage', 'cruel'], '212Adj', 0, 0, null),
        new TOTAdj('solus', 'sola', 'solum', ['alone', 'lonely', 'only', "on one's own"], '212Adj', 0, 0, null),
        new TOTAdj('stultus', 'stulta', 'stultum', ['stupid', 'foolish'], '212Adj', 0, 0, null),
        new TOTAdj('summus', 'summa', 'summum', ['highest', 'greatest', 'top (of)'], '212Adj', 0, 0, null),
        new TOTAdj('tantus', 'tanta', 'tantum', ['so great', 'such a great', 'so much'], '212Adj', 0, 0, null),
        new TOTAdj('totus', 'tota', 'totum', ['whole'], '212Adj', 0, 0, null),
        new TOTAdj('tutus', 'tuta', 'tutum', ['safe'], '212Adj', 0, 0, null),
        new TOTAdj('verus', 'vera', 'verum', ['true', 'real'], '212Adj', 0, 0, null),
    
        //33 Adjectives
    
        new TTAdj('audax', 'audacis', ['bold', 'daring'], '33Adj', 0, 0, null),
        new TTAdj('brevis', 'breve', ['short', 'brief'], '33Adj', 0, 0, null),
        new TTAdj('celer', 'celere', ['quick', 'fast'], '33Adj', 0, 0, null),
        new TTAdj('crudelis', 'crudele', ['cruel'], '33Adj', 0, 0, null),
        new TTAdj('difficilis', 'difficile', ['difficult'], '33Adj', 0, 0, null),
        new TTAdj('dives', 'divitis', ['rich'], '33Adj', 0, 0, null),
        new TTAdj('facilis', 'facile', ['easy'], '33Adj', 0, 0, null),
        new TTAdj('ferox', 'ferocis', ['fierce', 'ferocious'], '33Adj', 0, 0, null),
        new TTAdj('fidelis', 'fidele', ['faithful', 'loyal'], '33Adj', 0, 0, null),
        new TTAdj('fortis', 'forte', ['brave'], '33Adj', 0, 0, null),
        new TTAdj('gravis', 'grave', ['heavy', 'serious'], '33Adj', 0, 0, null),
        new TTAdj('infelix', 'infelicis', ['unlucky', 'unhappy'], '33Adj', 0, 0, null),
        new TTAdj('ingens', 'ingentis', ['huge'], '33Adj', 0, 0, null),
        new TTAdj('iuvenis', 'iuvenis', ['young'], '33Adj', 0, 0, null),
        new TTAdj('omnis', 'omne', ['all', 'every'], '33Adj', 0, 0, null),
        new TTAdj('senex', 'senis', ['old'], '33Adj', 0, 0, null),
        new TTAdj('talis', 'tale', ['such'], '33Adj', 0, 0, null),
        new TTAdj('tristis', 'triste', ['sad'], '33Adj', 0, 0, null),
    
        //Irregular Comparative Adjectives
    
        new IrregCompAdj('maior', 'maius', ['bigger', 'larger', 'greater'], 'IrregCompAdj', 0, 0, null),
        new IrregCompAdj('melior', 'melius', ['better'], 'IrregCompAdj', 0, 0, null),
        new IrregCompAdj('minor', 'minus', ['smaller', 'less'], 'IrregCompAdj', 0, 0, null),
        new IrregCompAdj('peior', 'peius', ['worse'], 'IrregCompAdj', 0, 0, null),
        new IrregCompAdj('plus', 'pluris', ['more'], 'IrregCompAdj', 0, 0, null),
    
        //Adverbs
    
        new Adverb('adeo', 'indecl', ['so much', 'so greatly'], 'Adverbs', 0, 0, null),
        new Adverb('antea', 'indecl', ['before'], 'Adverbs', 0, 0, null),
        new Adverb('cur?', 'indecl', ['why?'], 'Adverbs', 0, 0, null),
        new Adverb('bene', 'indecl', ['well'], 'Adverbs', 0, 0, null),
        new Adverb('diu', 'indecl', ['for a long time'], 'Adverbs', 0, 0, null),
        new Adverb('forte', 'indecl', ['by chance'], 'Adverbs', 0, 0, null),
        new Adverb('frustra', 'indecl', ['in vain'], 'Adverbs', 0, 0, null),
        new Adverb('heri', 'indecl', ['yesterday'], 'Adverbs', 0, 0, null),
        new Adverb('hic', 'indecl', ['here'], 'Adverbs', 0, 0, null),
        new Adverb('hodie', 'indecl', ['today'], 'Adverbs', 0, 0, null),
        new Adverb('iam', 'indecl', ['now', 'already'], 'Adverbs', 0, 0, null),
        new Adverb('ibi', 'indecl', ['there'], 'Adverbs', 0, 0, null),
        new Adverb('interea', 'indecl', ['meanwhile'], 'Adverbs', 0, 0, null),
        new Adverb('ita', 'indecl', ['in this way', 'so'], 'Adverbs', 0, 0, null),
        new Adverb('ita vero', 'indecl', ['yes'], 'Adverbs', 0, 0, null),
        new Adverb('itaque', 'indecl', ['and so', 'therefore'], 'Adverbs', 0, 0, null),
        new Adverb('lente', 'indecl', ['slowly'], 'Adverbs', 0, 0, null),
        new Adverb('libenter', 'indecl', ['willingly', 'gladly'], 'Adverbs', 0, 0, null),
        new Adverb('magnopere', 'indecl', ['greatly', 'very much'], 'Adverbs', 0, 0, null),
        new Adverb('minime', 'indecl', ['very little', 'least', 'no'], 'Adverbs', 0, 0, null),
        new Adverb('mox', 'indecl', ['soon'], 'Adverbs', 0, 0, null),
        new Adverb('multo', 'multum', ['much'], 'Adverbs', 0, 0, null),
        new Adverb('necesse', 'indecl', ['necessary'], 'Adverbs', 0, 0, null),
        new Adverb('numquam', 'indecl', ['never'], 'Adverbs', 0, 0, null),
        new Adverb('nunc', 'indecl', ['now'], 'Adverbs', 0, 0, null),
        new Adverb('olim', 'indecl', ['once', 'some time ago'], 'Adverbs', 0, 0, null),
        new Adverb('paene', 'indecl', ['almost', 'nearly'], 'Adverbs', 0, 0, null),
        new Adverb('postea', 'indecl', ['afterwards'], 'Adverbs', 0, 0, null),
        new Adverb('postquam', 'indecl', ['after', 'when'], 'Adverbs', 0, 0, null),
        new Adverb('postridie', 'indecl', ['on the next day'], 'Adverbs', 0, 0, null),
        new Adverb('qualis?', 'quale?', ['what sort of?'], 'Adverbs', 0, 0, null),
        new Adverb('quam', 'indecl', ['than', 'how ... ?', 'how ... !', 'how... ?', 'how... !', 'how ...?', 'how ...!', 'how...?', 'how...!'], 'Adverbs', 0, 0, null),
        new Adverb('quis?', 'quid?', ['who? what?'], 'Adverbs', 0, 0, null),
        new Adverb('quo?', 'indecl', ['where to?'], 'Adverbs', 0, 0, null),
        new Adverb('quo modo?', 'indecl', ['how? in what way?'], 'Adverbs', 0, 0, null),
        new Adverb('quot?', 'indecl', ['how many?'], 'Adverbs', 0, 0, null),
        new Adverb('saepe', 'indecl', ['often'], 'Adverbs', 0, 0, null),
        new Adverb('semper', 'indecl', ['always'], 'Adverbs', 0, 0, null),
        new Adverb('sic', 'indecl', ['thus', 'in this way'], 'Adverbs', 0, 0, null),
        new Adverb('sicut', 'indecl', ['just as', 'like'], 'Adverbs', 0, 0, null),
        new Adverb('statim', 'indecl', ['at once', 'immediately'], 'Adverbs', 0, 0, null),
        new Adverb('subito', 'indecl', ['suddenly'], 'Adverbs', 0, 0, null),
        new Adverb('tam', 'indecl', ['so'], 'Adverbs', 0, 0, null),
        new Adverb('tamen', 'indecl', ['however'], 'Adverbs', 0, 0, null),
        new Adverb('tandem', 'indecl', ['at last', 'finally'], 'Adverbs', 0, 0, null),
        new Adverb('tot', 'indecl', ['so many'], 'Adverbs', 0, 0, null),
        new Adverb('ubi', 'indecl', ['where', 'when', 'where?'], 'Adverbs', 0, 0, null),
        new Adverb('umquam', 'indecl', ['ever'], 'Adverbs', 0, 0, null),
        new Adverb('unde', 'indecl', ['from where'], 'Adverbs', 0, 0, null),
        new Adverb('vehementer', 'indecl', ['violently', 'loudly', 'strongly'], 'Adverbs', 0, 0, null),
        new Adverb('vix', 'indecl', ['scarcely', 'hardly', 'with difficulty'], 'Adverbs', 0, 0, null),
    
        //Pronouns 
    
        new Pronoun('aliquis', 'aliquid', null, ['someone', 'something'], 'ProNouns', 0, 0, null),
        new Pronoun('alius', 'alia', 'aliud', ['other', 'another', 'else'], 'ProNouns', 0, 0, null),
        new Pronoun('alter', 'altera', 'alterum', ['the other', 'another', 'the second of two'], 'ProNouns', 0, 0, null),
        new Pronoun('ego', 'mei', null, ['I', 'me'], 'ProNouns', 0, 0, null),
        new Pronoun('hic', 'haec', 'hoc', ['this'], 'ProNouns', 0, 0, null),
        new Pronoun('ille', 'illa', 'illud', ['that', 'he', 'she', 'it'], 'ProNouns', 0, 0, null),
        new Pronoun('is', 'ea', 'id', ['this', 'that', 'he', 'she', 'it', 'them'], 'ProNouns', 0, 0, null),
        new Pronoun('meus', 'mea', 'meum', ['my'], 'ProNouns', 0, 0, null),
        new Pronoun('nos', 'nostrum', null, ['we', 'us'], 'ProNouns', 0, 0, null),
        new Pronoun('noster', 'nostra', 'nostrum', ['our'], 'ProNouns', 0, 0, null),
        new Pronoun('qui', 'quae', 'quod', ['who', 'which'], 'ProNouns', 0, 0, null),
        new Pronoun('se', 'sui', null, ['himself', 'herself', 'itself', 'themselves'], 'ProNouns', 0, 0, null),
        new Pronoun('suus', 'sua', 'suum', ['his', 'her', 'its', 'their (own)'], 'ProNouns', 0, 0, null),
        new Pronoun('tu', 'tui', null, ['you (singular)', 'you singular', 'you (sg)', 'you sg', 'you'], 'ProNouns', 0, 0, null),
        new Pronoun('tuus', 'tua', 'tuum', ['your (singular)', 'yours', 'your', 'your (sg)', 'yours (sg)'], 'ProNouns', 0, 0, null),
        new Pronoun('vester', 'vestra', 'vestrum', ['your (plural)', 'yours', 'your (pl)', 'yours (pl)', 'yours (plural)'], 'ProNouns', 0, 0, null),
        new Pronoun('vos', 'vestrum', null, ['you (plural)', 'you plural', 'you (pl)', 'you pl'], 'ProNouns', 0, 0, null),
        
        //Prepositions
        
        new Preposition('apud', '(+ acc)', ['among', 'with', 'at the house of'], 'Prepositions', 0, 0, null),
        new Preposition('circum', '(+ acc)', ['around'], 'Prepositions', 0, 0, null),
        new Preposition('contra', '(+ acc)', ['against'], 'Prepositions', 0, 0, null),
        new Preposition('cum', '(+ abl)', ['with'], 'Prepositions', 0, 0, null),
        new Preposition('cum', '(+ subjunctive)', ['when', 'since'], 'Prepositions', 0, 0, null),
        new Preposition('de', '(+ abl)', ['from', 'down from', 'about'], 'Prepositions', 0, 0, null),
        new Preposition('e,', 'ex (+ abl)', ['from', 'out of'], 'Prepositions', 0, 0, null),
        new Preposition('in', '(+ acc)', ['into', 'onto'], 'Prepositions', 0, 0, null),
        new Preposition('in', '(+ abl)', ['in', 'on'], 'Prepositions', 0, 0, null),
        new Preposition('inter', '(+ acc)', ['among', 'between'], 'Prepositions', 0, 0, null),
        new Preposition('per', '(+ acc)', ['through', 'along'], 'Prepositions', 0, 0, null),
        new Preposition('post', '(+ acc)', ['after', 'behind'], 'Prepositions', 0, 0, null),
        new Preposition('pro', '(+ abl)', ['in front of', 'for', 'in return for'], 'Prepositions', 0, 0, null),
        new Preposition('prope', '(+ acc)', ['near'], 'Prepositions', 0, 0, null),
        new Preposition('propter', '(+ acc)', ['on account of', 'because of'], 'Prepositions', 0, 0, null),
        new Preposition('sine', '(+ abl)', ['without'], 'Prepositions', 0, 0, null),
        new Preposition('sub', '(+ acc/abl)', ['under', 'beneath'], 'Prepositions', 0, 0, null),
        new Preposition('trans', '(+ acc)', ['across'], 'Prepositions', 0, 0, null),
    
        //Conjunctions
    
        new Conjunction('ac, atque', ['and'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('aut... aut', ['either ... or', 'either...or', 'either... or', 'either ...or', 'either or'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('deinde', ['then'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('dum', ['while'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('enim', ['for'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('et', ['and'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('etiam', ['also', 'even'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('igitur', ['therefore', 'and so'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('iterum', ['again'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('nam', ['for'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('ne', ['that... not', 'so that... not', 'that ... not', 'so that ... not', 'that ...not', 'so that ...not', 'that...not', 'so that...not', 'that not', 'so that not'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('-ne (added to end of word)', ['introduces question'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('nec... nec', ['neither...nor', 'neither nor', 'neither... nor', 'neither ...nor', 'neither ... nor'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('neque... neque', ['neither...nor', 'neither nor', 'neither... nor', 'neither ...nor', 'neither ... nor'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('non', ['not'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('nonne?', ['surely?'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('num', ['whether'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('num?', ['surely ... not?', 'surely...not?', 'surely... not?', 'surely ...not?', 'surely not?'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('quamquam', ['although'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('-que (added to end of word)', ['and'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('quod', ['because'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('quoque', ['also'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('sed', ['but'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('si', ['if'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('simulac, simulatque', ['as soon as'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('ut (+ subjunctive)', ['that', 'so that', 'in order that'], 'Conjunctions', 0, 0, 'indecl'),
        new Conjunction('ut (+ indicative)', ['as'], 'Conjunctions', 0, 0, 'indecl'),
    
        //Miscellaneous
    
        new Misc('nemo', 'neminis', ['no one','nobody'], 'Misc', 0, 0, null),
        new Misc('nihil', null, ['nothing'], 'Misc', 0, 0, 'indecl'),
        new Misc('re-', null, ['back'], 'Misc', 0, 0, 'prefix used with verbs'),
    
        //Numerals
    
        new Numeral('centum', null, null, ['a hundred', '100', "hundred"], 'Nums', 0, 0, 'indecl'),
        new Numeral('decem', null, null, ['ten', '10'], 'Nums', 0, 0, 'indecl'),
        new Numeral('duo', 'duae', 'duo', ['two', '2'], 'Nums', 0, 0, null),
        new Numeral('mille', null, null, ['thousand', '1000'], 'Nums', 0, 0, 'pl = milia'),
        new Numeral('novem', null, null, ['nine', '9'], 'Nums', 0, 0, 'indecl'),
        new Numeral('octo', null, null, ['eight', '8'], 'Nums', 0, 0, 'indecl'),
        new Numeral('quattour', null, null, ['four', '4'], 'Nums', 0, 0, 'indecl'),
        new Numeral('quinque', null, null, ['five', '5'], 'Nums', 0, 0, 'indecl'),
        new Numeral('septem', null, null, ['seven', '7'], 'Nums', 0, 0, 'indecl'),
        new Numeral('sex', null, null, ['six', '6'], 'Nums', 0, 0, 'indecl'),
        new Numeral('tres', 'tria', null, ['three', '3'], 'Nums', 0, 0, null),
        new Numeral('unus', 'una', 'unum', ['one', '1'], 'Nums', 0, 0, null),
    ]
    var englat = 0; //1 for Eng to Lat, 0 for Lat to Eng
    var selectedVocab = [];
    const checkboxes = document.querySelectorAll('input[data-group]');
    const englatRadios = document.getElementsByName('EngLat');
    const TestPage = document.getElementById('TestPage');
    const Choosing = document.getElementById('Choosing');

    for (var i = 0; i < englatRadios.length; i++) {
        if (englatRadios[i].checked) {
            englat = i;
        }
    }
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedVocab.push(checkboxes[i].id);
        }
    }

    if (selectedVocab.length == 0) {
        alert("Please select at least one vocab group to be tested on.");
        location.reload();
    }
    else {
        Choosing.style.display = 'none';
        TestPage.style.display = 'flex';
        let WantedVocab = AddVocab(selectedVocab, Eduqas);
        const WantedVocabBackup = WantedVocab;
        await TestLoop(WantedVocab, WantedVocabBackup, englat);
    }
}

function sendEmailQuery() {

}

function getLevenshteinDistance(s1, s2) { //Found online - for typos --- dont understand how it works but it seems to work well
    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i++) track[0][i] = i;
    for (let j = 0; j <= s2.length; j++) track[j][0] = j;
    for (let j = 1; j <= s2.length; j++) {
        for (let i = 1; i <= s1.length; i++) {
            const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator // substitution
                //Try to allow for swapping of letters when the threshold is one
            );
        }
    }
    return track[s2.length][s1.length];
}

function CorrectTypo(answers, UserAnswer) { //Check implementation in CheckAnswer
    const threshold = Math.ceil(UserAnswer.length / 5); //Maybe add 1 to this?
    const closeMatches = answers.filter(word => {
        return getLevenshteinDistance(UserAnswer, word) <= threshold;
    });
    return closeMatches[0];
}

//Notes: 

//Create a login and register system
//This system will allow users to track their scores over time, use mastery, use an algorithm to come up with personalised tests.
//It could also allow users to create their own vocab lists and share them with others.
//They could create vocab presets personalised for them
//It could help advise them for revision based on their performance
//It could also have a spaced repetition system built in
//Learn, Revise and Test features could be built in
//People would have to be advised not to use the same passwords as they use for other school accounts as this could create a security risk if I could access them
//Similar to SmartRevise it could have a flight path and suggested revision along that path based on their performance

//Add a derivation tester and tips to remember the answers to words
//Add a way for users to provide user feedback or raise queries within the website
//Improve variable setup

//There have been a lot of changes to the code recently, so I need to test to make sure everything still works as intended
//Add a query function for vocab answers
//Add a dev screen where I can see all of the queries and change the vocab
//Fix problem with the all option for vocab groups

//Use classes+constructors for endings testing

//Add a function where you can end the test early to see what you got wrong. 
//Make the incorrect box be shown at all time during the test
//Make a dictionary function - search for the meaning of words

//Add a way to see what words are in which vocab list before you test - showing which words are within which section
//Make an infinite words testing thing
//Make a mixed Englat and Lateng mode

//Add pages that explain grammar
//Allow the user to choose the length of the test - increase or decrease the number of questions

//Add a way to only choose specific words
//Add a way to view the whole list, a dictionary, and the list separated by vocab group
//Add a way that Mr Forrest can create tests of a certain length for his students to do for homework or revision - format it correctly - let him choose whether to allow alternative forms to be tested
//Show the length of each of the vocab groups, and the length of the test before starting it

//Allow multiple answers instead of only one answer - it would have to be correct if they were all correct
//Create a timed mode - threading
//Maybe make it not accept typos that are answers for other words - like do not accept "wide" for "wife", as wide is a correct answer for another word
//Add a genitive testing mode

//For words like senex, which are both nouns and adjectives, put in brackets which one they are so that you do not confuse them




//Make the elements fixed on the testing page - they move up and down when you press enter - make the hidden elements still take up a space no matter what
//I have fixed the comment above, but for two things - side to side movement when content is wide, and movement when line number changes

//It could look cool to have the vocab choice things as either scrolls/stone tablets

//Perhaps use roman standards as a symbol - maybe on the pillars?

//There were some other things I thought of not commented here: for example, for incorrect answers, only showing answers if they are 'individual' of others - they are not, for example, only changes of spaces or ...s. Im sure I wrote this and other stuff somewhere, but where? Answer - on that word doc

// Add a feature where there are number codes for each word, so you could do for example 10 words per day, but keep the same 10 words for the whole day by inputting 1-10 instead of choosing a word category

// Add a home button

// Add settings
