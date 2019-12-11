const fs = require('fs');
let names = fs.readFileSync('E:/web/diploma/rating/modules/db/names.csv', 'utf-8')
let lines = names.split(/\r?\n/);

const getNames = () => {
    let names = fs.readFileSync('E:/web/diploma/rating/modules/db/names.csv', 'utf-8')
    return names.split(/\r?\n/);
}

const FACULTIES = [
    {
        faculty : 'Факультет економіки та менеджменту',
         spec : [
            {code: 73, name: 'Менеджмент', gr:'МНД', count:0},
            {code: 76, name: 'Підприємництво, торгівля та біржова діяльність', gr:'ПТБД', count:0},
            {code: 241, name: 'Готельно-ресторанна справа', gr:'ГРС', count:0},
            {code: 242, name: 'Туризм', gr:'ТРЗ', count:0},
            {code: 51, name: 'Економіка', gr:'ЕК', count:0},
        ]
    },
    {
        faculty: 'Факультет обліку і фінансів',
        spec : [
            {code: 72, name: 'Фінанси, банківська справа та страхування', gr:'ФБСТ', count:0},
            {code: 292, name: 'Міжнародні економічні відносини', gr:'МЕВ', count:0}
        ]
    },
    {
        faculty : 'Факультет публічного управління та права',
        spec : [
            {code: 35, name: 'Філологія', gr:'ФІЛ', count:0},
            {code: 71, name: 'Облік і оподаткування', gr:'ОІП', count:0},
            {code: 81, name: 'Право', gr:'ПР', count:0},
            {code: 262, name: 'Правоохоронна діяльність', gr:'ПД', count:0},
            {code: 281, name: 'Публічне управління та адміністрування', gr:'ПУТД', count:0}
        ]

    },
    {
        faculty : 'Гірничо-екологічний факультет',
        spec : [
            {code: 101, name: 'Екологія', gr:'ЕКЛ', count:0},
            {code: 176, name: 'Телекомунікації та радіотехніка', gr:'ТТР', count:0},
            {code: 183, name: 'Технології захисту навколишнього середовища', gr:'ТЗС', count:0},
            {code: 184, name: 'Гірництво', gr:'ГРЦ', count:0}
        ]
    },
    {
        faculty : "Факультет інформаційно-комп’ютерних технологій",
        spec : [
            {code: 121, name: 'Інженерія програмного забезпечення', gr:'ІПЗ', count:0},
            {code: 122, name: 'Комп’ютерні науки', gr:'КН', count:0},
            {code: 123, name: 'Комп’ютерна інженерія', gr:'КІ', count:0},
            {code: 125, name: 'Кібербезпека', gr:'КБР', count:0},
            {code: 131, name: 'Прикладна механіка', gr:'ПМ', count:0},
            {code: 133, name: 'Галузеве машинобудування', gr:'ГМ', count:0},
            {code: 151, name: 'Автоматизація та комп’ютерно-інтегровані технології', gr:'АТТ', count:0},
            {code: 152, name: 'Метрологія та інформаційно-вимірювальна техніка', gr:'МІВТ', count:0},
            {code: 163, name: 'Біомедична інженерія', gr:'БІ', count:0},
            
        ]   
    }
]
const SUBJECT_NAMES = [
    'Логістика' , 'Інтелектуальні мехатронні системи' , 
'Основи мережевих ІТ технологій' , 'Ораторське мистецтво' , 
'Веб-дизайн' , 'Компютерне моделювання теплофізичних процесів' , 'Основи екологічної безпеки' ,
 'Управління бізнесом' , 'Основи кібербезпеки' , 'Поведінкова економіка: як робити правильний вибір' ,
 'Географічні інформаційні системи' , 'Англійська мова' , 'Українська мова' , 
 'Коштовне та декоративне каміння' , 'Управління конфліктами' , 'Фінанси' , 'Тайм-менеджмент' ,
  'Цифрова обробка сигналів та зображень в інформаційних системах' , 
  'Система технологічної документації в машинобудуванні' , "Екологія","Логіка","Математичний аналіз",
  'Теорія корупції та антикорупційна діяльність' , "Економіка", "Практика",
  "Правознавство", "Вища математика", "Основи здоров'я", "Релігіознавство", "Філософія"
]
const TEACHER_NAMES = [
' Расторгуева Владислава Антониновна' ,'Сорокина Инесса Степановна' ,'Туполев Евгений Проклович' ,
'Ковригина Кристина Николаевна' ,'Шалаганова Доминика Емельяновна' ,'Короткин Рюрик Демьянович' ,
'Зайцева Ульяна Марковна' ,'Матвеева Софья Всеволодовна' ,'Юневич Юлий Данилевич' ,
'Лютенкова Евдокия Юлиевна' ,'Яркина Таисия Германовна' ,'Данькин Валерьян Чеславович' ,
'Малюгина Наталия Павеловна' ,'Портнова Роза Мефодиевна' ,'Кирпа Трофим Брониславович' ,
'Гурковский Архип Прокофиевич' ,'Коньяков Родион Богданович' ,'Кривова Марина Елизаровна' ,
'Шпак Терентий Проклович' ,'Лелуха Варвара Кузьмевна' ,'Саитов Юрий Прокофиевич' ,
'Остальцева Кристина Иосифовна' ,'Абалихин Михей Сигизмундович' ,'Капшукова Влада Захаровна' ,
'Силиванова Яна Фомевна' ,'Ярский Вениамин Касьянович' ,'Козлова Лилия Потаповна' ,
'Эллинский Аристарх Мечиславович' ,'Ячиков Капитон Григориевич' ,'Иканова Екатерина Семеновна' ,
'Ильина Лиана Александровна' ,'Лассмана Майя Ивановна' ,'Ягнятев Ираклий Кондратович' ,
'Ямалтдинова Инесса Петровна' ,'Ханинова Анисья Тимофеевна' ,'Ясюлевич Филипп Евстафиевич' ,
'Манторов Валерий Ерофеевич' ,'Грибоедова Екатерина Феликсовна' ,'Уржумцева Регина Александровна' ,
'Калугина Татьяна Казимировна' ,'Быстрова Светлана Игоревна' ,'Яровый Адриан Макарович' ,
'Двойнева Марианна Всеволодовна' ,'Кальченко Семён Зиновиевич' ,'Голотина Варвара Тихоновна' ,
'Горшкова Полина Павеловна' ,'Шушалев Всеволод Сигизмундович' ,'Бершов Фадей Брониславович' ,
'Жилина Юлия Павеловна' ,'Каприянов Матвей Иосифович' ,'Ясько Константин Левович' ,
'Молодцов Вацлав Феликсович' ,'Тамахин Леонид Сергеевич' ,'Алимкин Онуфрий Мирославович' ,
'Колбенева Диана Тимофеевна' ,'Муленко Сократ Давыдович' ,'Листунова Арина Елисеевна' ,
'Гудкова Берта Василиевна' ,'Полынов Самсон Владиславович' ,'Павлова Агата Никитевна' ,
'Крайнева Анисья Мироновна' ,'Созонтов Соломон Наумович' ,'Анрепа Аза Кузьмевна' ,
'Москвин Якуб Владиславович' ,'Борцова Наталья Германовна' ,'Яковченко Рената Игоревна' ,
'Колбенева Алиса Давидовна' ,'Якунькин Александр Ипатиевич' ,'Пороник Даниил Сократович' ,
'Бояринова Ефросинья Геннадиевна' ,'Яна Рада Трофимовна' ,'Яромеев Юлиан Адрианович' ,
'Попова Людмила Станиславовна' ,'Коллеров Артур Чеславович' ,'Кудяшова Лилия Анатолиевна' ,
'Ушаков Эмиль Елисеевич' ,'Кириллов Елисей Казимирович' ,'Плеханова Эмилия Трофимовна' ,
'Лютенкова Эльвира Родионовна' ,'Коротков Максимильян Евлампиевич' ,'Богатов Валерий Юриевич' ,
'Яфракова Ева Ивановна' ,'Полухина Лилия Семеновна' ,'Завражина Ульяна Алексеевна' ,
'Чудов Филипп Анатолиевич' ,'Солодских Потап Никонович' ,'Шашлова Ефросиния Казимировна' ,
'Комзина Тамара Данилевна' ,'Тоболенко Емельян Макарович' ,'Ясюлевича Юлия Виталиевна' ,
'Гершельман Глеб Проклович' ,'Болдаев Дмитрий Гордеевич' ,'Конака Бронислава Потаповна' ,
'Ишеев Изяслав Тихонович' ,'Сыромятников Архип Владиславович' ,'Лихачева Анастасия Тимофеевна' ,
'Ивашкин Тихон Ефремович' ,'Яков Соломон Платонович' ,
'Рошета Дина Евгениевна' ,'Сиянский Мир Афанасиевич'
]

module.exports.getNames = getNames;
module.exports.FACULTIES = FACULTIES;
module.exports.SUBJECT_NAMES = SUBJECT_NAMES;
module.exports.TEACHER_NAMES = TEACHER_NAMES;
