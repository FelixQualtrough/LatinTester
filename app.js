/*
class Word {
    constructor(answers, group, englatmast, latengmast, extraInfo) {
        this.answers = answers;
        this.group = group;
        this.englatmast = englatmast;
        this.latengmast = latengmast;
        this.extraInfo = extraInfo;
    }
}

class Noun extends Word {
    constructor(nominative, genitive, gender, answers, group, englatmast, latengmast, extraInfo) {
        this.nominative = nominative;
        this.genitive = genitive;
        this.gender = gender;
        super(answers, group, englatmast, latengmast, extraInfo);  // Call the parent's constructor passing shared attributes like answers, group, etc, using *args
    }
}
class Verb extends Word {
    constructor(FirstPP, SecondPP, ThirdPP, FourthPP, answers, group, englatmast, latengmast, extraInfo){
        this.FirstPP = FirstPP;
        this.SecondPP = SecondPP;
        this.ThirdPP = ThirdPP;
        this.FourthPP = FourthPP;
        super(answers, group, englatmast, latengmast, extraInfo);
    }
}
class DepVerb extends Word {
    constructor(FirstPP, SecondPP, ThirdPP, answers, group, englatmast, latengmast, extraInfo) {
        this.FirstPP = FirstPP ;
        this.SecondPP = SecondPP;
        this.ThirdPP = ThirdPP;
        super(answers, group, englatmast, latengmast, extraInfo);
    }
}
class IrregVerb extends Word {
    constructor(FirstPP, SecondPP, ThirdPP, FourthPP, answers, group, englatmast, latengmast, extraInfo) {
        this.FirstPP = FirstPP;
        this.SecondPP = SecondPP;
        this.ThirdPP = ThirdPP;
        this.FourthPP = FourthPP;
        super(answers, group, englatmast, latengmast, extraInfo);
    }
}     
// Types of words:
// Adjectives(Regular 2-1-2 adjectives, Regular 3-3 adjectives, Irregular comparative adjectives)
// Adverbs (mostly indeclinable, some not), Pronouns, Prepositions, Conjuctions (all indeclinable), Misc, Numerals


var Eduqas = [
    Noun('ancilla', 'ancillae', 'f', ['slave-girl','maid'], '1', 0, 0, 'None'),
    Noun('aqua', 'aquae', 'f', ['water'], '1', 0, 0, 'None'),
    Noun('cena', 'cenae', 'f', ['dinner','meal'], '1', 0, 0, 'None'),
    Noun('cura', 'curae', 'f', ['care','worry'], '1', 0, 0, 'None'),
    Noun('dea', 'deae', 'f', ['goddess'], '1', 0, 0, 'None'),
    Noun('domina', 'dominae', 'f', ['mistress'], '1', 0, 0, 'None'),
    Noun('epistula', 'epistulae', 'f', ['letter'], '1', 0, 0, 'None'),
    Noun('femina', 'feminae', 'f', ['woman'], '1', 0, 0, 'None'),
    Noun('filia', 'filiae', 'f', ['daughter'], '1', 0, 0, 'None'),
    Noun('hora', 'horae', 'f', ['hour'], '1', 0, 0, 'None'),
    Noun('ianua', 'ianuae', 'f', ['door'], '1', 0, 0, 'None'),
    Noun('insula', 'insulae', 'f', ['island','block of flats'], '1', 0, 0, 'None'),
    Noun('ira', 'irae', 'f', ['anger'], '1', 0, 0, 'None'),
    Noun('nauta', 'nautae', 'm', ['sailor'], '1', 0, 0, 'None'),
    Noun('pecunia', 'pecuniae', 'f', ['money'], '1', 0, 0, 'None'),
    Noun('poena', 'poenae', 'f', ['punishment'], '1', 0, 0, 'None'),
    Noun('porta', 'portae', 'f', ['gate'], '1', 0, 0, 'None'),
    Noun('puella', 'puellae', 'f', ['girl'], '1', 0, 0, 'None'),
    Noun('regina', 'reginae', 'f', ['queen'], '1', 0, 0, 'None'),
    Noun('Roma', 'Romae', 'f', ['Rome (Romae = at/in Rome)'], '1', 0, 0, 'None'),
    Noun('silva', 'silvae', 'f', ['wood'], '1', 0, 0, 'None'),
    Noun('taberna', 'tabernae', 'f', ['shop','inn'], '1', 0, 0, 'None'),
    Noun('terra', 'terrae', 'f', ['land'], '1', 0, 0, 'None'),
    Noun('turba', 'turbae', 'f', ['crowd'], '1', 0, 0, 'None'),
    Noun('via', 'viae', 'f', ['street','road','way'], '1', 0, 0, 'None'),
    Noun('villa', 'villae', 'f', ['house','country house'], '1', 0, 0, 'None'),
    Noun('vita', 'vitae', 'f', ['life'], '1', 0, 0, 'None'),
]
*/

var englat = 0; //1 for Eng to Lat, 0 for Lat to Eng
var selectedVocab = [];
        function toggle(source, name) {
            checkboxes = document.getElementsByName(name);
            for(var i=0, n=checkboxes.length;i<n;i++) {
                checkboxes[i].checked = source.checked;
            }
        }

        function All(source) {
            checkboxes = document.getElementsByClassName('Vocab');
            for(var i=0, n=checkboxes.length;i<n;i++) {
                checkboxes[i].checked = source.checked;
            }
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

var Eduqas = [
    {
        'nominative' :'ancilla',
        'genitive' : 'ancillae',
        'gender' : 'f',
        'answers' : ['slave-girl','maid', "slave girl", "slavegirl"],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'aqua',
        'genitive' : 'aquae',
        'gender' : 'f',
        'answers' : ['water'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'cena',
        'genitive' : 'cenae',
        'gender' : 'f',
        'answers' : ['dinner','meal'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'cura',
        'genitive' : 'curae',
        'gender' : 'f',
        'answers' : ['care','worry'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'dea',
        'genitive' : 'deae',
        'gender' : 'f',
        'answers' : ['goddess'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'domina',
        'genitive' : 'dominae',
        'gender' : 'f',
        'answers' : ['mistress'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'epistula',
        'genitive' : 'epistulae',
        'gender' : 'f',
        'answers' : ['letter'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'femina',
        'genitive' : 'feminae',
        'gender' : 'f',
        'answers' : ['woman'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'filia',
        'genitive' : 'filiae',
        'gender' : 'f',
        'answers' : ['daughter'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'hora',
        'genitive' : 'horae',
        'gender' : 'f',
        'answers' : ['hour'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'ianua',
        'genitive' : 'ianuae',
        'gender' : 'f',
        'answers' : ['door'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'insula',
        'genitive' : 'insulae',
        'gender' : 'f',
        'answers' : ['island','block of flats'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'ira',
        'genitive' : 'irae',
        'gender' : 'f',
        'answers' : ['anger'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'nauta',
        'genitive' : 'nautae',
        'gender' : 'm',
        'answers' : ['sailor'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'pecunia',
        'genitive' : 'pecuniae',
        'gender' : 'f',
        'answers' : ['money'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'poena',
        'genitive' : 'poenae',
        'gender' : 'f',
        'answers' : ['punishment'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'porta',
        'genitive' : 'portae',
        'gender' : 'f',
        'answers' : ['gate'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'puella',
        'genitive' : 'puellae',
        'gender' : 'f',
        'answers' : ['girl'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'regina',
        'genitive' : 'reginae',
        'gender' : 'f',
        'answers' : ['queen'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'Roma',
        'genitive' : 'Romae',
        'gender' : 'f',
        'answers' : ['rome', 'rome (romae = at/in rome)', '(romae = at/in rome)'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'silva',
        'genitive' : 'silvae',
        'gender' : 'f',
        'answers' : ['wood'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'taberna',
        'genitive' : 'tabernae',
        'gender' : 'f',
        'answers' : ['shop','inn'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'terra',
        'genitive' : 'terrae',
        'gender' : 'f',
        'answers' : ['land'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'turba',
        'genitive' : 'turbae',
        'gender' : 'f',
        'answers' : ['crowd'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'via',
        'genitive' : 'viae',
        'gender' : 'f',
        'answers' : ['street','road','way'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'villa',
        'genitive' : 'villae',
        'gender' : 'f',
        'answers' : ['house','country house'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'vita',
        'genitive' : 'vitae',
        'gender' : 'f',
        'answers' : ['life'],
        'group' : 'nouns1',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'amicus',
        'genitive' : 'amici',
        'gender' : 'm',
        'answers' : ['friend'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'animus',
        'genitive' : 'animi',
        'gender' : 'm',
        'answers' : ['spirit','soul','mind'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'annus',
        'genitive' : 'anni',
        'gender' : 'm',
        'answers' : ['year'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'bellum',
        'genitive' : 'belli',
        'gender' : 'n',
        'answers' : ['war'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'caelum',
        'genitive' : 'caeli',
        'gender' : 'm',
        'answers' : ['sky','heaven'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'cibus',
        'genitive' : 'cibi',
        'gender' : 'm',
        'answers' : ['food'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'consilium',
        'genitive' : 'consilii',
        'gender' : 'n',
        'answers' : ['plan','idea','advice'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'deus',
        'genitive' : 'dei',
        'gender' : 'm',
        'answers' : ['god'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'dominus',
        'genitive' : 'domini',
        'gender' : 'm',
        'answers' : ['master'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'donum',
        'genitive' : 'doni',
        'gender' : 'n',
        'answers' : ['gift','present'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'equus',
        'genitive' : 'equi',
        'gender' : 'm',
        'answers' : ['horse'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'filius',
        'genitive' : 'filii',
        'gender' : 'm',
        'answers' : ['son'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'forum',
        'genitive' : 'fori',
        'gender' : 'n',
        'answers' : ['forum','market-place'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'gladius',
        'genitive' : 'gladii',
        'gender' : 'm',
        'answers' : ['sword'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'hortus',
        'genitive' : 'horti',
        'gender' : 'm',
        'answers' : ['garden'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'imperium',
        'genitive' : 'imperii',
        'gender' : 'n',
        'answers' : ['empire','power','command'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'legatus',
        'genitive' : 'legati',
        'gender' : 'm',
        'answers' : ['commander'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'liberi',
        'genitive' : 'liberorum',
        'gender' : 'mpl',
        'answers' : ['children'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'libertus',
        'genitive' : 'liberti',
        'gender' : 'm',
        'answers' : ['freedman','ex-slave'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'locus',
        'genitive' : 'loci',
        'gender' : 'm',
        'answers' : ['place'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'maritus',
        'genitive' : 'mariti',
        'gender' : 'm',
        'answers' : ['husband'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'modus',
        'genitive' : 'modi',
        'gender' : 'm',
        'answers' : ['manner','way','kind'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'murus',
        'genitive' : 'muri',
        'gender' : 'm',
        'answers' : ['wall'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'nuntius',
        'genitive' : 'nuntii',
        'gender' : 'm',
        'answers' : ['messenger','message','news'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'periculum',
        'genitive' : 'periculi',
        'gender' : 'n',
        'answers' : ['danger'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'praemium',
        'genitive' : 'praemii',
        'gender' : 'n',
        'answers' : ['prize','reward','profit'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'puer',
        'genitive' : 'pueri',
        'gender' : 'm',
        'answers' : ['boy'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'servus',
        'genitive' : 'servi',
        'gender' : 'm',
        'answers' : ['slave'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'signum',
        'genitive' : 'signi',
        'gender' : 'n',
        'answers' : ['sign','signal','seal'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'templum',
        'genitive' : 'templi',
        'gender' : 'n',
        'answers' : ['temple'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'verbum',
        'genitive' : 'verbi',
        'gender' : 'n',
            'answers' : ['word'],
            'group' : 'nouns2',
            'englatmast' : 0,
            'latengmast' : 0
        },
        {
            'nominative' :'vestimenta',
        'genitive' : 'vestimentorum',
        'gender' : 'npl',
        'answers' : ['clothes'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'vinum',
        'genitive' : 'vini',
        'gender' : 'n',
        'answers' : ['wine'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'vir',
        'genitive' : 'viri',
        'gender' : 'm',
        'answers' : ['man'],
        'group' : 'nouns2',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'amor',
        'genitive' : 'amoris',
        'gender' : 'm',
        'answers' : ['love'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'canis',
        'genitive' : 'canis',
        'gender' : 'm',
        'answers' : ['dog'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'caput',
        'genitive' : 'capitis',
        'gender' : 'n',
        'answers' : ['head'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'civis',
        'genitive' : 'civis',
        'gender' : 'm/f',
        'answers' : ['citizen'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'clamor',
        'genitive' : 'clamoris',
        'gender' : 'm',
        'answers' : ['shout'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'comes',
        'genitive' : 'comitis',
        'gender' : 'm/f',
        'answers' : ['comrade','companion'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'corpus',
        'genitive' : 'corporis',
        'gender' : 'n',
        'answers' : ['body'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'custos',
        'genitive' : 'custodis',
        'gender' : 'm/f',
        'answers' : ['guard'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'dux',
        'genitive' : 'ducis',
        'gender' : 'm',
        'answers' : ['leader'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'flumen',
        'genitive' : 'fluminis',
        'gender' : 'n',
        'answers' : ['river'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'frater',
        'genitive' : 'fratris',
        'gender' : 'm',
        'answers' : ['brother'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'homo',
        'genitive' : 'hominis',
        'gender' : 'm',
        'answers' : ['man','human being','person'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'hostis',
        'genitive' : 'hostis',
        'gender' : 'm',
        'answers' : ['enemy'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'ignis',
        'genitive' : 'ignis',
        'gender' : 'm',
        'answers' : ['fire'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'imperator',
        'genitive' : 'imperatoris',
        'gender' : 'm',
        'answers' : ['emperor','commander','general'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'iter',
        'genitive' : 'itineris',
        'gender' : 'n',
        'answers' : ['journey','route','way'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'iuvenis',
        'genitive' : 'iuvenis',
        'gender' : 'm',
        'answers' : ['young man'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'labor',
        'genitive' : 'laboris',
        'gender' : 'm',
        'answers' : ['work'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'legio',
        'genitive' : 'legionis',
        'gender' : 'f',
        'answers' : ['legion'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'lux',
        'genitive' : 'lucis',
        'gender' : 'f',
        'answers' : ['light','daylight'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'mare',
        'genitive' : 'maris',
        'gender' : 'n',
        'answers' : ['sea'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'mater',
        'genitive' : 'matris',
        'gender' : 'f',
        'answers' : ['mother'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'miles',
        'genitive' : 'militis',
        'gender' : 'm',
        'answers' : ['soldier'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'mons',
        'genitive' : 'montis',
        'gender' : 'm',
        'answers' : ['mountain'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'mors',
        'genitive' : 'mortis',
        'gender' : 'f',
        'answers' : ['death'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'navis',
        'genitive' : 'navis',
        'gender' : 'f',
        'answers' : ['ship'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'nomen',
        'genitive' : 'nominis',
        'gender' : 'n',
        'answers' : ['name'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'nox',
        'genitive' : 'noctis',
        'gender' : 'f',
        'answers' : ['night'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'pars',
        'genitive' : 'partis',
        'gender' : 'f',
        'answers' : ['part'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'pater',
        'genitive' : 'patris',
        'gender' : 'm',
        'answers' : ['father'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'pax',
        'genitive' : 'pacis',
        'gender' : 'f',
        'answers' : ['peace'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'pes',
        'genitive' : 'pedis',
        'gender' : 'm',
        'answers' : ['foot','paw'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'princeps',
        'genitive' : 'principis',
        'gender' : 'm',
        'answers' : ['chief','chieftan','emperor'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'rex',
        'genitive' : 'regis',
        'gender' : 'm',
        'answers' : ['king'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'sanguis',
        'genitive' : 'sanguinis',
        'gender' : 'm',
        'answers' : ['blood'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'senator',
        'genitive' : 'senatoris',
        'gender' : 'm',
        'answers' : ['senator'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'senex',
        'genitive' : 'senis',
        'gender' : 'm',
        'answers' : ['old man'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'soror',
        'genitive' : 'sororis',
        'gender' : 'f',
        'answers' : ['sister'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'tempus',
        'genitive' : 'temporis',
        'gender' : 'n',
        'answers' : ['time'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'urbs',
        'genitive' : 'urbis',
        'gender' : 'f',
        'answers' : ['city'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'uxor',
        'genitive' : 'uxoris',
        'gender' : 'f',
        'answers' : ['wife'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'vox',
        'genitive' : 'vocis',
        'gender' : 'f',
        'answers' : ['voice'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'vulnus',
        'genitive' : 'vulneris',
        'gender' : 'n',
        'answers' : ['wound'],
        'group' : 'nouns3',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'domus',
        'genitive' : 'domus',
        'gender' : 'f',
        'answers' : ['home','house (domi = at home)'],
        'group' : 'nouns4',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'manus',
        'genitive' : 'manus',
        'gender' : 'f',
        'answers' : ['hand','group of people'],
        'group' : 'nouns4',
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        'nominative' :'vultus',
        'genitive' : 'vultus',
        'gender' : 'm',
        'answers' : ['expression','face'],
        'group' : 'nouns4',
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        'nominative' :'dies',
        'genitive' : 'diei',
        'gender' : 'm',
        'answers' : ['day'],
        'group' : 'nouns5',
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        'nominative' :'res',
        'genitive' : 'rei',
        'gender' : 'f',
        'answers' : ['thing','business','matter'],
        'group' : 'nouns5',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        'nominative' :'spes',
        'genitive' : 'spei',
        'gender' : 'f',
        'answers' : ['hope'],
        'group' : 'nouns5',
        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'adiuvo',
        '2,3,4pp' : 'adiuvare, adiuvi, adiutus',
        'answers' : ['help'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'ambulo',
        '2,3,4pp' : 'ambulare, ambulavi',
        'answers' : ['walk'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'amo',
        '2,3,4pp' : 'amare, amavi, amatus',
        'answers' : ['love','like'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'appropinquo (+ dat)',
        '2,3,4pp' : 'appropinquare, appropinquavi',
        'answers' : ['approach','come near to'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'celo',
        '2,3,4pp' : 'celare, celavi, celatus',
        'answers' : ['hide'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'clamo',
        '2,3,4pp' : 'clamare, clamavi, clamatus',
        'answers' : ['shout'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'cogito',
        '2,3,4pp' : 'cogitare, cogitavi, cogitatus',
        'answers' : ['think','consider'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'curo',
        '2,3,4pp' : 'curare, curavi, curatus',
        'answers' : ['look after','care for', 'supervise'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'despero',
        '2,3,4pp' : 'desperare, desperavi, desperatus',
        'answers' : ['despair'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'do',
        '2,3,4pp' : 'dare, dedi, datus',
        'answers' : ['give'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'exspecto',
        '2,3,4pp' : 'exspectare, exspectavi, exspectatus',
        'answers' : ['wait for'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'festino',
        '2,3,4pp' : 'festinare, festinavi',
        'answers' : ['hurry'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'habito',
        '2,3,4pp' : 'habitare, habitavi, habitatus',
        'answers' : ['live'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'impero (+ dat)',
        '2,3,4pp' : 'imperare, imperavi, imperatus',
        'answers' : ['order','command'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'intro',
        '2,3,4pp' : 'intrare, intravi, intratus',
        'answers' : ['enter'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'laboro',
        '2,3,4pp' : 'laborare, laboravi',
        'answers' : ['work'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'lacrimo',
        '2,3,4pp' : 'lacrimare, lacrimavi',
        'answers' : ['weep','cry'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'laudo',
        '2,3,4pp' : 'laudare, laudavi, laudatus',
        'answers' : ['praise'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'libero',
        '2,3,4pp' : 'liberare, liberavi, liberatus',
        'answers' : ['free','set free'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'narro',
        '2,3,4pp' : 'narrare, narravi, narratus',
        'answers' : ['tell','relate'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'navigo',
        '2,3,4pp' : 'navigare, navigavi',
        'answers' : ['sail'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'neco',
        '2,3,4pp' : 'necare, necavi, necatus',
        'answers' : ['kill'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'nuntio',
        '2,3,4pp' : 'nuntiare, nuntiavi, nuntiatus',
        'answers' : ['announce','report'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'oppugno',
        '2,3,4pp' : 'oppugnare, oppugnavi, oppugnatus',
        'answers' : ['attack'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'oro',
        '2,3,4pp' : 'orare, oravi, oratus',
        'answers' : ['beg','beg for'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'paro',
        '2,3,4pp' : 'parare, paravi, paratus',
        'answers' : ['prepare'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'poenas do',
        '2,3,4pp' : 'dare, dedi, datus',
        'answers' : ['pay the penalty','be punished', 'pay the price'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'porto',
        '2,3,4pp' : 'portare, portavi, portatus',
        'answers' : ['carry'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'postulo',
        '2,3,4pp' : 'postulare, postulavi, postulatus',
        'answers' : ['demand'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'pugno',
        '2,3,4pp' : 'pugnare, pugnavi',
        'answers' : ['fight'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'puto',
        '2,3,4pp' : 'putare, putavi, putatus',
        'answers' : ['think'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'rogo',
        '2,3,4pp' : 'rogare, rogavi, rogatus',
        'answers' : ['ask','ask for'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'saluto',
        '2,3,4pp' : 'salutare, salutavi, salutatus',
        'answers' : ['greet'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'servo',
        '2,3,4pp' : 'servare, servavi, servatus',
        'answers' : ['save','look after'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'specto',
        '2,3,4pp' : 'spectare, spectavi, spectatus',
        'answers' : ['look at','watch'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'sto',
        '2,3,4pp' : 'stare, steti',
        'answers' : ['stand'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'supero',
        '2,3,4pp' : 'superare, superavi, superatus',
        'answers' : ['overcome','overpower'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'voco',
        '2,3,4pp' : 'vocare, vocavi, vocatus',
        'answers' : ['call'],
        'group' : 'verbs1',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'appareo',
        '2,3,4pp' : 'apparere, apparui',
        'answers' : ['appear'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'debeo',
        '2,3,4pp' : 'debere, debui, debitus',
        'answers' : ['owe','ought','should','must'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'deleo',
        '2,3,4pp' : 'delere, delevi, deletus',
        'answers' : ['destroy'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'habeo',
        '2,3,4pp' : 'habere, habui, habitus',
        'answers' : ['have'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'iaceo',
        '2,3,4pp' : 'iacere, iacui',
        'answers' : ['lie down'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'iubeo',
        '2,3,4pp' : 'iubere, iussi, iussus',
        'answers' : ['order'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'maneo',
        '2,3,4pp' : 'manere, mansi',
        'answers' : ['remain','stay'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'pareo (+ dat)',
        '2,3,4pp' : 'parere, parui',
        'answers' : ['obey'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'pereo',
        '2,3,4pp' : 'perire, perii',
        'answers' : ['die','perish'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'persuadeo (+ dat)',
        '2,3,4pp' : 'persuadere, persuasi',
        'answers' : ['persuade'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'placeo (+ dat)',
        '2,3,4pp' : 'placere, placui',
        'answers' : ['please'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'praebeo',
        '2,3,4pp' : 'praebere, praebui, praebitus',
        'answers' : ['provide'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'respondeo',
        '2,3,4pp' : 'respondere, respondi, responsus',
        'answers' : ['reply'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'rideo',
        '2,3,4pp' : 'ridere, risi',
        'answers' : ['laugh','smile'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'sedeo',
        '2,3,4pp' : 'sedere, sedi',
        'answers' : ['sit'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'taceo',
        '2,3,4pp' : 'tacere, tacui, tacitus',
        'answers' : ['be silent','be quiet'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'teneo',
        '2,3,4pp' : 'tenere, tenui, tentus',
        'answers' : ['hold','keep','possess'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'terreo',
        '2,3,4pp' : 'terrere, terrui, territus',
        'answers' : ['frighten'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'timeo',
        '2,3,4pp' : 'timere, timui',
        'answers' : ['fear','be afraid'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'video',
        '2,3,4pp' : 'videre, vidi, visus',
        'answers' : ['see'],
        'group' : 'verbs2',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'accido',
        '2,3,4pp' : 'accidere, accidi',
        'answers' : ['happen'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'ago',
        '2,3,4pp' : 'agere, egi, actus',
        'answers' : ['do','act','drive'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'bibo',
        '2,3,4pp' : 'bibere, bibi',
        'answers' : ['drink'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'cado',
        '2,3,4pp' : 'cadere, cecidi, casus',
        'answers' : ['fall'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'capio',
        '2,3,4pp' : 'capere, cepi, captus',
        'answers' : ['take','catch','capture','adopt (a plan)'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'cognosco',
        '2,3,4pp' : 'cognoscere, cognovi, cognitus',
        'answers' : ['get to know','find out','learn'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'cogo',
        '2,3,4pp' : 'cogere, coegi, coactus',
        'answers' : ['force','compel'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 2
    },
    {
        '1stpp' :'conficio',
        '2,3,4pp' : 'conficere, confeci, confectus',
        'answers' : ['finish','wear out','exhaust'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'conspicio',
        '2,3,4pp' : 'conspicere, conspexi, conspectus',
        'answers' : ['catch sight of','notice'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 2
    },
    {
        '1stpp' :'constituo',
        '2,3,4pp' : 'constituere, constitui, constitutus',
        'answers' : ['decide'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'consumo',
        '2,3,4pp' : 'consumere, consumpsi, consumptus',
        'answers' : ['eat'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'credo (+ dat)',
        '2,3,4pp' : 'credere, credidi, creditus',
        'answers' : ['believe','trust','have faith in'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'curro',
        '2,3,4pp' : 'currere, cucurri, cursus',
        'answers' : ['run'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'dico',
        '2,3,4pp' : 'dicere, dixi, dictus',
        'answers' : ['say'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'discedo',
        '2,3,4pp' : 'discedere, discessi',
        'answers' : ['depart','leave'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'duco',
        '2,3,4pp' : 'ducere, duxi, ductus',
        'answers' : ['lead','take'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'effugio',
        '2,3,4pp' : 'effugere, effugi',
        'answers' : ['escape'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'emo',
        '2,3,4pp' : 'emere, emi, emptus',
        'answers' : ['buy'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'facio',
        '2,3,4pp' : 'facere, feci, factus',
        'answers' : ['make','do'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'frango',
        '2,3,4pp' : 'frangere, fregi, fractus',
        'answers' : ['break'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'fugio',
        '2,3,4pp' : 'fugere, fugi',
        'answers' : ['run away','flee'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'gero',
        '2,3,4pp' : 'gerere, gessi, gestus',
        'answers' : ['wear (clothes)','wage (war)'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'iacio',
        '2,3,4pp' : 'iacere, ieci, iactus',
        'answers' : ['throw'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'incendo',
        '2,3,4pp' : 'incendere, incendi, incensus',
        'answers' : ['burn','set on fire'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'intellego',
        '2,3,4pp' : 'intellegere, intellexi, intellectus',
        'answers' : ['understand','realise'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'lego',
        '2,3,4pp' : 'legere, legi, lectus',
        'answers' : ['read','choose'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'mitto',
        '2,3,4pp' : 'mittere, misi, missus',
        'answers' : ['send'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'occido',
        '2,3,4pp' : 'occidere, occidi, occisus',
        'answers' : ['kill'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'ostendo',
        '2,3,4pp' : 'ostendere, ostendi, ostentus',
        'answers' : ['show'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'peto',
        '2,3,4pp' : 'petere, petivi, petitus',
        'answers' : ['make for','attack','seek','beg','ask for'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'pono',
        '2,3,4pp' : 'ponere, posui, positus',
        'answers' : ['put','place','put up'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'procedo',
        '2,3,4pp' : 'procedere, processi',
        'answers' : ['advance','proceed'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'promitto',
        '2,3,4pp' : 'promittere, promisi, promissus',
        'answers' : ['promise'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'quaero',
        '2,3,4pp' : 'quaerere, quaesivi, quaesitus',
        'answers' : ['search for','look for','ask'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'rapio',
        '2,3,4pp' : 'rapere, rapui, raptus',
        'answers' : ['seize','grab'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'reddo',
        '2,3,4pp' : 'reddere, reddidi, redditus',
        'answers' : ['give back','restore'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'relinquo',
        '2,3,4pp' : 'relinquere, reliqui, relictus',
        'answers' : ['leave','leave behind'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'resisto (+ dat)',
        '2,3,4pp' : 'resistere, restiti',
        'answers' : ['resist'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'scribo',
        '2,3,4pp' : 'scribere, scripsi, scriptus',
        'answers' : ['write'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'surgo',
        '2,3,4pp' : 'surgere, surrexi',
        'answers' : ['get up','stand up','rise'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'trado',
        '2,3,4pp' : 'tradere, tradidi, traditus',
        'answers' : ['hand over'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'traho',
        '2,3,4pp' : 'trahere, traxi, tractus',
        'answers' : ['drag','draw','pull'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'vendo',
        '2,3,4pp' : 'vendere, vendidi, venditus',
        'answers' : ['sell'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'vinco',
        '2,3,4pp' : 'vincere, vici, victus',
        'answers' : ['conquer','win','be victorious'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'vivo',
        '2,3,4pp' : 'vivere, vixi',
        'answers' : ['live','be alive'],
        'group' : 'verbs3',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'accipio',
        '2,3,4pp' : 'accipere, accepi, acceptus',
        'answers' : ['accept','take in','receive'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 4
    },
    {
        '1stpp' :'advenio',
        '2,3,4pp' : 'advenire, adveni',
        'answers' : ['arrive'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'aperio',
        '2,3,4pp' : 'aperire, aperui, apertus',
        'answers' : ['open'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'audio',
        '2,3,4pp' : 'audire, audivi, auditus',
        'answers' : ['hear','listen to'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 0
    },
    {
        '1stpp' :'cupio',
        '2,3,4pp' : 'cupere, cupivi',
        'answers' : ['want','desire'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 3
    },
    {
        '1stpp' :'dormio',
        '2,3,4pp' : 'dormire, dormivi',
        'answers' : ['sleep'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 2
    },
    {
        '1stpp' :'invenio',
        '2,3,4pp' : 'invenire, inveni, inventus',
        'answers' : ['find'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nescio',
        '2,3,4pp' : 'nescire, nescivi',
        'answers' : ['not know'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 2
    },
    {
        '1stpp' :'scio',
        '2,3,4pp' : 'scire, scivi, scitus',
        'answers' : ['know'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 2
    },
    {
        '1stpp' :'sentio',
        '2,3,4pp' : 'sentire, sensi, sensus',
        'answers' : ['feel','notice'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'venio',
        '2,3,4pp' : 'venire, veni',
        'answers' : ['come'],
        'group' : 'verbs4',

        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'absum',
        '2,3,4pp' : 'abesse',
        'answers' : ['be out','be absent','be away'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'adsum',
        '2,3,4pp' : 'adesse',
        'answers' : ['be here','be present'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'aufero',
        '2,3,4pp' : 'auferre, abstuli, ablatus',
        'answers' : ['take away','carry off','steal'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'coepi',
        '2,3,4pp' : 'coepisse, coeptus',
        'answers' : ['began'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'eo',
        '2,3,4pp' : 'ire, ii',
        'answers' : ['go'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'fero',
        '2,3,4pp' : 'ferre, tuli, latus',
        'answers' : ['bring','carry','bear'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'inquit',
        '2,3,4pp' : '(n/a)',
        'answers' : ['say','said'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nolo',
        '2,3,4pp' : 'nolle, nolui',
        'answers' : ['not want','refuse'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'offero',
        '2,3,4pp' : 'offere, obtuli, oblatus',
        'answers' : ['offer'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'possum',
        '2,3,4pp' : 'posse',
        'answers' : ['can','be able'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'redeo',
        '2,3,4pp' : 'redire, redii',
        'answers' : ['go back','come back','return'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'refero',
        '2,3,4pp' : 'referre, retuli, relatus',
        'answers' : ['bring back','carry back','report','tell'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sum',
        '2,3,4pp' : 'esse, fui',
        'answers' : ['be'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tollo',
        '2,3,4pp' : 'tollere, sustuli, sublatus',
        'answers' : ['raise','lift up'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'volo',
        '2,3,4pp' : 'velle, volui',
        'answers' : ['want'],
        'group' : 'IrregVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'conor',
        '2,3,4pp' : 'conari, conatus sum',
        'answers' : ['try'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'egredior',
        '2,3,4pp' : 'egredi, egressus sum',
        'answers' : ['go out'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ingredior',
        '2,3,4pp' : 'ingredi, ingressus sum',
        'answers' : ['enter'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'loquor',
        '2,3,4pp' : 'loqui, locutus sum',
        'answers' : ['speak'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'morior',
        '2,3,4pp' : 'mori, mortuus sum',
        'answers' : ['die'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'progredior',
        '2,3,4pp' : 'progredi, progressus sum',
        'answers' : ['advance'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'regredior',
        '2,3,4pp' : 'regredi, regressus sum',
        'answers' : ['go back','return'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sequor',
        '2,3,4pp' : 'sequi, secutus sum',
        'answers' : ['follow'],
        'group' : 'DepVerbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'altus',
        '2,3,4pp' : 'alta, altum',
        'answers' : ['high','deep'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'benignus',
        '2,3,4pp' : 'benigna, benignum',
        'answers' : ['kind','generous'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'bonus',
        '2,3,4pp' : 'bona, bonum',
        'answers' : ['good'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'carus',
        '2,3,4pp' : 'cara, carum',
        'answers' : ['dear'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ceteri',
        '2,3,4pp' : 'ceterae, cetera',
        'answers' : ['the rest','the others'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'dirus',
        '2,3,4pp' : 'dira, dirum',
        'answers' : ['dreadful'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'durus',
        '2,3,4pp' : 'dura, durum',
        'answers' : ['hard','harsh'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'iratus',
        '2,3,4pp' : 'irata, iratum',
        'answers' : ['angry'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'laetus',
        '2,3,4pp' : 'laeta, laetum',
        'answers' : ['happy'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'latus',
        '2,3,4pp' : 'lata, latum',
        'answers' : ['wide'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'longus',
        '2,3,4pp' : 'longa, longum',
        'answers' : ['long'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'magnus',
        '2,3,4pp' : 'magna, magnum',
        'answers' : ['big','large','great'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'malus',
        '2,3,4pp' : 'mala, malum',
        'answers' : ['evil','bad'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'maximus',
        '2,3,4pp' : 'maxima, maximum',
        'answers' : ['the biggest','the greatest','very big','very great'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'medius',
        '2,3,4pp' : 'media, medium',
        'answers' : ['middle','middle of'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'minimus',
        '2,3,4pp' : 'minima, minimum',
        'answers' : ['very little','very small'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'miser',
        '2,3,4pp' : 'misera, miserum',
        'answers' : ['miserable','wretched','sad'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'multus',
        '2,3,4pp' : 'multa, multum',
        'answers' : ['much','many'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'novus',
        '2,3,4pp' : 'nova, novum',
        'answers' : ['new'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nullus',
        '2,3,4pp' : 'nulla, nullum',
        'answers' : ['not any','no'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'optimus',
        '2,3,4pp' : 'optima, optimum',
        'answers' : ['the best','very good','excellent'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'parvus',
        '2,3,4pp' : 'parva, parvum',
        'answers' : ['small'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'pauci',
        '2,3,4pp' : 'paucae, pauci',
        'answers' : ['few','a few'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'perterritus',
        '2,3,4pp' : 'perterrita, perterritum',
        'answers' : ['terrified'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'pessimus',
        '2,3,4pp' : 'pessima, pessimum',
        'answers' : ['the worst','very bad'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'plenus',
        '2,3,4pp' : 'plena, plenum',
        'answers' : ['full'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'primus',
        '2,3,4pp' : 'prima, primum',
        'answers' : ['first'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'proximus',
        '2,3,4pp' : 'proxima, proximum',
        'answers' : ['nearest','next to'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'pulcher',
        '2,3,4pp' : 'pulchra, pulchrum',
        'answers' : ['beautiful','handsome'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quantus?',
        '2,3,4pp' : 'quanta? quantum?',
        'answers' : ['how big? how much?'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'Romanus',
        '2,3,4pp' : 'Romana, Romanum',
        'answers' : ['Roman'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sacer',
        '2,3,4pp' : 'sacra, sacrum',
        'answers' : ['sacred'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'saevus',
        '2,3,4pp' : 'saeva, saevum',
        'answers' : ['savage','cruel'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'solus',
        '2,3,4pp' : 'sola, solum',
        'answers' : ['alone','lonely','only',"on one's own"],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'stultus',
        '2,3,4pp' : 'stulta, stultum',
        'answers' : ['stupid','foolish'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'summus',
        '2,3,4pp' : 'summa, summum',
        'answers' : ['highest','greatest','top (of)'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tantus',
        '2,3,4pp' : 'tanta, tantum',
        'answers' : ['so great','such a great','so much'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'totus',
        '2,3,4pp' : 'tota, totum',
        'answers' : ['whole'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tutus',
        '2,3,4pp' : 'tuta, tutum',
        'answers' : ['safe'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'verus',
        '2,3,4pp' : 'vera, verum',
        'answers' : ['true','real'],
        'group' : '212Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'audax',
        '2,3,4pp' : 'audacis',
        'answers' : ['bold','daring'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'brevis',
        '2,3,4pp' : 'breve',
        'answers' : ['short','brief'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'celer',
        '2,3,4pp' : 'celere',
        'answers' : ['quick','fast'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'crudelis',
        '2,3,4pp' : 'crudele',
        'answers' : ['cruel'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'difficilis',
        '2,3,4pp' : 'difficile',
        'answers' : ['difficult'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'dives',
        '2,3,4pp' : 'divitis',
        'answers' : ['rich'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'facilis',
        '2,3,4pp' : 'facile',
        'answers' : ['easy'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ferox',
        '2,3,4pp' : 'ferocis',
        'answers' : ['fierce','ferocious'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'fidelis',
        '2,3,4pp' : 'fidele',
        'answers' : ['faithful','loyal'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'fortis',
        '2,3,4pp' : 'forte',
        'answers' : ['brave'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'gravis',
        '2,3,4pp' : 'grave',
        'answers' : ['heavy','serious'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'infelix',
        '2,3,4pp' : 'infelicis',
        'answers' : ['unlucky','unhappy'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ingens',
        '2,3,4pp' : 'ingentis',
        'answers' : ['huge'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'iuvenis',
        '2,3,4pp' : 'iuvenis',
        'answers' : ['young'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'omnis',
        '2,3,4pp' : 'omne',
        'answers' : ['all','every'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'senex',
        '2,3,4pp' : 'senis',
        'answers' : ['old'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'talis',
        '2,3,4pp' : 'tale',
        'answers' : ['such'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tristis',
        '2,3,4pp' : 'triste',
        'answers' : ['sad'],
        'group' : '33Adj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'maior',
        '2,3,4pp' : 'maius',
        'answers' : ['bigger','larger','greater'],
        'group' : 'IrregCompAdj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'melior',
        '2,3,4pp' : 'melius',
        'answers' : ['better'],
        'group' : 'IrregCompAdj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'minor',
        '2,3,4pp' : 'minus',
        'answers' : ['smaller','less'],
        'group' : 'IrregCompAdj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'peior',
        '2,3,4pp' : 'peius',
        'answers' : ['worse'],
        'group' : 'IrregCompAdj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'plus',
        '2,3,4pp' : 'pluris',
        'answers' : ['more'],
        'group' : 'IrregCompAdj',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'adeo',
        '2,3,4pp' : 'indecl',
        'answers' : ['so much','so greatly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'antea',
        '2,3,4pp' : 'indecl',
        'answers' : ['before'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'cur?',
        '2,3,4pp' : 'indecl',
        'answers' : ['why?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'bene',
        '2,3,4pp' : 'indecl',
        'answers' : ['well'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'diu',
        '2,3,4pp' : 'indecl',
        'answers' : ['for a long time'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'forte',
        '2,3,4pp' : 'indecl',
        'answers' : ['by chance'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'frustra',
        '2,3,4pp' : 'indecl',
        'answers' : ['in vain'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'heri',
        '2,3,4pp' : 'indecl',
        'answers' : ['yesterday'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'hic',
        '2,3,4pp' : 'indecl',
        'answers' : ['here'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'hodie',
        '2,3,4pp' : 'indecl',
        'answers' : ['today'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'iam',
        '2,3,4pp' : 'indecl',
        'answers' : ['now','already'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ibi',
        '2,3,4pp' : 'indecl',
        'answers' : ['there'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'interea',
        '2,3,4pp' : 'indecl',
        'answers' : ['meanwhile'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ita',
        '2,3,4pp' : 'indecl',
        'answers' : ['in this way','so'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ita vero',
        '2,3,4pp' : 'indecl',
        'answers' : ['yes'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'itaque',
        '2,3,4pp' : 'indecl',
        'answers' : ['and so','therefore'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'lente',
        '2,3,4pp' : 'indecl',
        'answers' : ['slowly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'libenter',
        '2,3,4pp' : 'indecl',
        'answers' : ['willingly','gladly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'magnopere',
        '2,3,4pp' : 'indecl',
        'answers' : ['greatly','very much'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'minime',
        '2,3,4pp' : 'indecl',
        'answers' : ['very little','least','no'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'mox',
        '2,3,4pp' : 'indecl',
        'answers' : ['soon'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'multo',
        '2,3,4pp' : 'multum',
        'answers' : ['much'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'necesse',
        '2,3,4pp' : 'indecl',
        'answers' : ['necessary'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'numquam',
        '2,3,4pp' : 'indecl',
        'answers' : ['never'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nunc',
        '2,3,4pp' : 'indecl',
        'answers' : ['now'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'olim',
        '2,3,4pp' : 'indecl',
        'answers' : ['once','some time ago'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'paene',
        '2,3,4pp' : 'indecl',
        'answers' : ['almost','nearly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'postea',
        '2,3,4pp' : 'indecl',
        'answers' : ['afterwards'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'postquam',
        '2,3,4pp' : 'indecl',
        'answers' : ['after','when'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'postridie',
        '2,3,4pp' : 'indecl',
        'answers' : ['on the next day'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'qualis?',
        '2,3,4pp' : 'quale?',
        'answers' : ['what sort of?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quam',
        '2,3,4pp' : 'indecl',
        'answers' : ['than','how… ?','how… !'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quis?',
        '2,3,4pp' : 'quid?',
        'answers' : ['who? what?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quo?',
        '2,3,4pp' : 'indecl',
        'answers' : ['where to?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quo modo?',
        '2,3,4pp' : 'indecl',
        'answers' : ['how? in what way?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quot?',
        '2,3,4pp' : 'indecl',
        'answers' : ['how many?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'saepe',
        '2,3,4pp' : 'indecl',
        'answers' : ['often'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'semper',
        '2,3,4pp' : 'indecl',
        'answers' : ['always'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sic',
        '2,3,4pp' : 'indecl',
        'answers' : ['thus','in this way'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sicut',
        '2,3,4pp' : 'indecl',
        'answers' : ['just as','like'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'statim',
        '2,3,4pp' : 'indecl',
        'answers' : ['at once','immediately'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'subito',
        '2,3,4pp' : 'indecl',
        'answers' : ['suddenly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tam',
        '2,3,4pp' : 'indecl',
        'answers' : ['so'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tamen',
        '2,3,4pp' : 'indecl',
        'answers' : ['however'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tandem',
        '2,3,4pp' : 'indecl',
        'answers' : ['at last','finally'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tot',
        '2,3,4pp' : 'indecl',
        'answers' : ['so many'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ubi',
        '2,3,4pp' : 'indecl',
        'answers' : ['where','when','where?'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'umquam',
        '2,3,4pp' : 'indecl',
        'answers' : ['ever'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'unde',
        '2,3,4pp' : 'indecl',
        'answers' : ['from where'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'vehementer',
        '2,3,4pp' : 'indecl',
        'answers' : ['violently','loudly','strongly'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'vix',
        '2,3,4pp' : 'indecl',
        'answers' : ['scarcely','hardly','with difficulty'],
        'group' : 'Adverbs',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'aliquis',
        '2,3,4pp' : 'aliquid',
        'answers' : ['someone','something'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'alius',
        '2,3,4pp' : 'alia, aliud',
        'answers' : ['other','another','else'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'alter',
        '2,3,4pp' : 'altera, alterum',
        'answers' : ['the other','another','the second of two'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ego',
        '2,3,4pp' : 'mei',
        'answers' : ['I','me'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'hic',
        '2,3,4pp' : 'haec, hoc',
        'answers' : ['this'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ille',
        '2,3,4pp' : 'illa, illud',
        'answers' : ['that','he','she','it'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'is',
        '2,3,4pp' : 'ea, id',
        'answers' : ['this','that','he','she','it','them'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'meus',
        '2,3,4pp' : 'mea, meum',
        'answers' : ['my'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nos',
        '2,3,4pp' : 'nostrum',
        'answers' : ['we','us'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'noster',
        '2,3,4pp' : 'nostra, nostrum',
        'answers' : ['our'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'qui',
        '2,3,4pp' : 'quae, quod',
        'answers' : ['who','which'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'se',
        '2,3,4pp' : 'sui',
        'answers' : ['himself','herself','itself','themselves'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'suus',
        '2,3,4pp' : 'sua, suum',
        'answers' : ['his','her','its','their (own)'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tu',
        '2,3,4pp' : 'tui',
        'answers' : ['you (singular)'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tuus',
        '2,3,4pp' : 'tua, tuum',
        'answers' : ['your (singular)','yours'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'vester',
        '2,3,4pp' : 'vestra, vestrum',
        'answers' : ['your (plural)','yours'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'vos',
        '2,3,4pp' : 'vestrum',
        'answers' : ['you (plural)'],
        'group' : 'Pronouns',
    
        'englatmast' : 0,
        'latengmast' : 1
    },    
    {
        '1stpp' :'apud (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['among', 'with', 'at the house of'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'circum (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['around'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'contra (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['against'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'cum (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['with'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'cum (+ subjunctive)',
        '2,3,4pp' : '',
        'answers' : ['when', 'since'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'de (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['from', 'down from', 'about'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'e, ex (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['from', 'out of'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'in (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['into', 'onto'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'in (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['in', 'on'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'inter (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['among', 'between'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'per (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['through', 'along'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'post (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['after', 'behind'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'pro (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['in front of', 'for', 'in return for'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'prope (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['near'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'propter (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['on account of', 'because of'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sine (+ abl)',
        '2,3,4pp' : '',
        'answers' : ['without'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sub (+ acc/abl)',
        '2,3,4pp' : '',
        'answers' : ['under', 'beneath'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'trans (+ acc)',
        '2,3,4pp' : '',
        'answers' : ['across'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ac, atque',
        '2,3,4pp' : 'indecl',
        'answers' : ['and'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'aut… aut',
        '2,3,4pp' : 'indecl',
        'answers' : ['either… or'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'deinde',
        '2,3,4pp' : 'indecl',
        'answers' : ['then'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'dum',
        '2,3,4pp' : 'indecl',
        'answers' : ['while'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'enim',
        '2,3,4pp' : 'indecl',
        'answers' : ['for'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'et',
        '2,3,4pp' : 'indecl',
        'answers' : ['and'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'etiam',
        '2,3,4pp' : 'indecl',
        'answers' : ['also','even'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'igitur',
        '2,3,4pp' : 'indecl',
        'answers' : ['therefore','and so'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'iterum',
        '2,3,4pp' : 'indecl',
        'answers' : ['again'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nam',
        '2,3,4pp' : 'indecl',
        'answers' : ['for'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ne',
        '2,3,4pp' : 'indecl',
        'answers' : ['that… not','so that… not'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'-ne (added to end of word)',
        '2,3,4pp' : 'indecl',
        'answers' : ['introduces question'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nec… nec',
        '2,3,4pp' : 'indecl',
        'answers' : ['neither…nor'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'neque… neque',
        '2,3,4pp' : 'indecl',
        'answers' : ['neither…nor'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'non',
        '2,3,4pp' : 'indecl',
        'answers' : ['not'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nonne?',
        '2,3,4pp' : 'indecl',
        'answers' : ['surely?'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'num',
        '2,3,4pp' : 'indecl',
        'answers' : ['whether'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'num?',
        '2,3,4pp' : 'indecl',
        'answers' : ['surely… not?'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quamquam',
        '2,3,4pp' : 'indecl',
        'answers' : ['although'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'-que (added to end of word)',
        '2,3,4pp' : 'indecl',
        'answers' : ['and'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quod',
        '2,3,4pp' : 'indecl',
        'answers' : ['because'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quoque',
        '2,3,4pp' : 'indecl',
        'answers' : ['also'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sed',
        '2,3,4pp' : 'indecl',
        'answers' : ['but'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'si',
        '2,3,4pp' : 'indecl',
        'answers' : ['if'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'simulac, simulatque',
        '2,3,4pp' : 'indecl',
        'answers' : ['as soon as'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ut (+ subjunctive)',
        '2,3,4pp' : 'indecl',
        'answers' : ['that','so that','in order that'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'ut (+ indicative)',
        '2,3,4pp' : 'indecl',
        'answers' : ['as'],
        'group' : 'Prepositions',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nemo',
        '2,3,4pp' : 'neminis',
        'answers' : ['no one','nobody'],
        'group' : 'Misc',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'nihil',
        '2,3,4pp' : 'indecl',
        'answers' : ['nothing'],
        'group' : 'Misc',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'re-',
        '2,3,4pp' : 'prefix used with verbs',
        'answers' : ['back'],
        'group' : 'Misc',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'centum',
        '2,3,4pp' : 'indecl',
        'answers' : ['a hundred'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'decem',
        '2,3,4pp' : 'indecl',
        'answers' : ['ten'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'duo',
        '2,3,4pp' : 'duae, duo',
        'answers' : ['two'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'mille',
        '2,3,4pp' : 'pl = milia',
        'answers' : ['thousand'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'novem',
        '2,3,4pp' : 'indecl',
        'answers' : ['nine'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'octo',
        '2,3,4pp' : 'indecl',
        'answers' : ['eight'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quattuor',
        '2,3,4pp' : 'indecl',
        'answers' : ['four'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'quinque',
        '2,3,4pp' : 'indecl',
        'answers' : ['five'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'septem',
        '2,3,4pp' : 'indecl',
        'answers' : ['seven'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'sex',
        '2,3,4pp' : 'indecl',
        'answers' : ['six'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'tres',
        '2,3,4pp' : 'tria',
        'answers' : ['three'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
    {
        '1stpp' :'unus',
        '2,3,4pp' : 'una, unum',
        'answers' : ['one'],
        'group' : 'Nums',
    
        'englatmast' : 0,
        'latengmast' : 1
    },
  ];

var WantedVocab = [];

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
    UserAnswer = document.getElementById('textbox').value.toLowerCase().trim();
    textbox.value = ""; // Clear the textbox after getting the value
}

//Apparently using async and await makes it so that the function waits until the user has inputted something before continuing
async function CheckAnswer(currentValue) {
    const textbox = document.getElementById('textbox');
    document.getElementById('Info').innerHTML="";
    i = currentValue;
    Question = i[0];
    CorrectAnswer = i[1];
    if (Array.isArray(Question)) {
    Question = Question.join(",");
    }
    //Gives the prompt for the answer
    document.getElementById('Prompt').innerHTML=Question.toUpperCase();
    await GetUserInput();
    if (UserAnswer == "skip" || UserAnswer == "") {
        document.getElementById('Info').innerHTML=`Answer(s): ${CorrectAnswer.join(", ")}`;
        if (englat == "0") {
            Incorrect.push([Question, " ----- ", CorrectAnswer.join(", ")]);
        } else {
            Incorrect.push([Question, " ----- ", CorrectAnswer]);
        }
    } else {
        if (Array.isArray(CorrectAnswer)) {
        if (CorrectAnswer.includes(UserAnswer)) {
            //Makes it show you other correct answers if there are any
            if (CorrectAnswer.length == 1) {
                document.getElementById('Info').innerHTML="That was correct! Well done!";
            } else {
                document.getElementById('Info').innerHTML=`That was correct! Well done! Other possible answers include: ${CorrectAnswer.slice(0, CorrectAnswer.indexOf(UserAnswer))} ${CorrectAnswer.slice(CorrectAnswer.indexOf(UserAnswer)+1)}`;
            }
            mark += 1;
            ToRemove.push(i);
        } else {
            document.getElementById('Info').innerHTML="Unlucky, but that was the wrong answer. Here is the correct answer:" + CorrectAnswer;
            Incorrect.push([Question, " ----- ", CorrectAnswer.join(", ")]); // This is new - does it work? Could it be made into a function? --> Would need to change depending on englat
            }
        } else {
        if (UserAnswer == CorrectAnswer || UserAnswer == CorrectAnswer.slice(0,CorrectAnswer.indexOf(","))) {
            document.getElementById('Info').innerHTML="That was correct! Well done!";
            mark += 1;
            ToRemove.push(i);
        } else {
            document.getElementById('Info').innerHTML="Unlucky, but that was the wrong answer. Here is the correct answer:" + CorrectAnswer;
            Incorrect.push([Question + "-----" + CorrectAnswer]); // This is new - does it work? Could it be made into a function? --> Would need to change depending on englat
        }
        }
        }
        TotalQs += 1;
        await waitingKeypress();
} 

function AddToWantedVocab(properties, answers, indexOf) {
    //Changes the order of the list depending on whether it is english to latin or latin to english
    if (englat == "0") {
        WantedVocab.push([properties, answers, indexOf])
    } else if (englat == "1"){
        WantedVocab.push([answers, properties, indexOf])
    }
}
//Adds the wanted vocab to a list - IM PRETTY SURE THIS IS THE MAIN THING THAT WILL NEED TO BE CHANGED FOR EDUQAS - CHECK ANSWER WILL ALSO NEED CHANGING, AND THE KEYS IN THE DICTIONARY MIGHT ALSO NEED CHANGING!
function AddVocab() {
    for (i of Eduqas) {
      if (selectedVocab.includes(String(i["group"]))) {
        if (String(i["group"]).includes("nouns")) {
          AddToWantedVocab([i["nominative"], i["genitive"], i["gender"]].join(", "), i["answers"], Eduqas.indexOf(i));
        } else { 
          AddToWantedVocab([i["1stpp"], i["2,3,4pp"]].join(", "), i["answers"], Eduqas.indexOf(i));
        }
    }
    }   
}

//I have tried .slice() to make a backup copy of the wanted vocab so that I can reset it later on as using const doesn't seem to work
const WantedVocabBackup = WantedVocab

function BeginTest() {
    Choosing = document.getElementById('Choosing');
    Choosing.style.display = 'none';
    TestSect = document.getElementById('Test');
    TestSect.style.display = 'block';
    var checkboxes = document.getElementsByClassName('Vocab');
    var englatRadios = document.getElementsByName('EngLat');
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
}

async function GameLoop() {
    TotalQs = 0;
    mark = 0;
    Incorrect = [];
    ToRemove = [];
    shuffle(WantedVocab);
    //WantedVocab.forEach(CheckAnswer);
    for (i of WantedVocab) {
        await CheckAnswer(i);
    }
    document.getElementById('Info').innerHTML=`Score: ${mark}/${TotalQs}<br>`;
    if (mark != TotalQs) {
        document.getElementById('Info').innerHTML+=`The word(s) you got incorrect, along with their answers, were:<br>${Incorrect.join("<br>")}`;
    }
    //Make it so that after the test, you can redo it with only the ones you got wrong
    document.getElementById('Prompt').innerHTML="Would you like to retest with: <br>The previous vocab (say 1), <br>Incorrect vocab (say 2) <br>Different vocab (say 3)?";//, or the original vocab (say '4')?
    await GetUserInput();
    while (! ['1', '2', '3'].includes(UserAnswer)) {
        document.getElementById('Prompt').innerHTML="That is not a valid answer. Would you like to retest with: <br>The previous vocab (say 1), <br>Incorrect vocab (say 2) <br>Different vocab (say 3)?"; //, or the original vocab (say '4')?
        await GetUserInput();        
    }
    if (UserAnswer == '1') {
        //Redo previous vocab
        GameLoop();
    } else if (UserAnswer == '2') {
        //Only incorrect vocab
        for (i of ToRemove.reverse()) {
           WantedVocab.splice(i, 1);
        }
        GameLoop()
    } else if (UserAnswer == '3') {
        //Different vocab
        location.reload();
    } //else { //Not working so removed for now- need to figure out how to reset WantedVocab to the original array
        //Original vocab 
        //WantedVocab = WantedVocabBackup;
        //GameLoop();
    //}
}
