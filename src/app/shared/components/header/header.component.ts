import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private id;
  public langu = 'ua';

  constructor(private router: Router, private mainService: MainService, private translate: TranslateService) {
    translate.setDefaultLang('ua');
    this.langu = localStorage.getItem('poll-lang');

    if (this.langu) {
      this.translate.use(this.langu);
    } else {
      this.langu = 'ua';
      translate.use('ua');
    }
    translate.setTranslation('ua', {
      home: {
        title: 'Онлайн-опитування',
        subtitle: 'Вербально-візуальна аналітика',
        new: 'Почати нове опитування',
        find: 'Приєднатись до опитування',
        newTitle: 'Нове опитування',
        newName: 'Назва',
        code: 'Код доступу',
        altsNum: 'Кількість альтернатив',
        typeName: 'Тип шкали оцінювання',
        next: 'Далі',
        altsName: 'Введіть назви альтернатив',
        alt: 'Альтернатива',
        findTitle: 'Приєднатись до опитування',
        connect: 'Приєднатись',
        config: {
          title: 'Власна шкала',
          selectColors: 'Оберіть бально-кольорову структуру',
          selectNames: 'Введіть назви градацій',
          selectOneName: 'Введіть назву градації',
          next: 'Далі'
        }
      },
      alts: [
        ['Категорично проти', 'Проти', 'Байдуже (Утримався)', 'За', 'Категорично \n за'],
        ['1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Назва опитування',
        code: 'Код доступу',
        count: 'Кількість опитаних',
        firstTime: 'Перша відповідь',
        lastTime: 'Остання відповідь',
        link: 'Посилання на опитування',
        title: 'Результати опитування',
        configType: 'Шкала оцінювання',
        next1: 'Детальніше',
        next2: 'Мапа переважань',
        new: 'Новий експерт',
        newTitle: 'Новий експерт',
        newName: 'Ім\'я',
        next3: 'Далі',
        exp: 'Експерт',
        no: 'Ще немає відповідей',
        submit: 'Підтвердити',
        message: {
          forget: 'Не забудьте зберегти код доступу: ',
          leave: 'Покинути опитування?'
        },
        more: 'Детальніше',
        hide: 'Згорнути',
        types: {
          ZZ: 'Загальна згода',
          ZNZ: 'Загальна незгода',
          IN: 'Індиферентність',
          PD: 'Полярність думок',
          CON: 'Конфронтаційність',
          LO: 'Лобізм',
          ALO: 'Антилобізм',
          PO: 'Поміркованість',
          OS: 'Одностайність',
        }
      },
      messages: {
        alts: 'Назви альтернатив повторюються',
        connectError: 'Опитування не знайдено',
        copied: 'Посилання скопійовано',
        createError: 'Опитування з таким ID вже існує',
        routerError: 'Будь ласка, увійдіть до опитування.'
      },
      admin: {
        deleteConfirm: 'Видалити опитування?',
        cancel: 'Відмінити',
        delete: 'Видалити',
        name: 'Назва',
        count: 'Кількість',
        first: 'Перша відповідь',
        last: 'Остання відповідь',
      }
    });
    translate.setTranslation('ru', {
      home: {
        title: 'Онлайн-опросы',
        new: 'Начать новый опрос',
        find: 'Присоединиться к опросу',
        newTitle: 'Новый опрос',
        newName: 'Название',
        code: 'Код доступа',
        altsNum: 'Количество альтернатив',
        typeName: 'Тип шкалы оценивания',
        next: 'Далее',
        altsName: 'Введите названия альтернатив',
        alt: 'Альтернатива',
        findTitle: 'Присоединиться к опросу',
        connect: 'Присоединиться',
        config: {
          title: 'Новая шкала',
          selectColors: 'Выберите балльно-цветную структуру',
          selectNames: 'Введите названия градаций',
          selectOneName: 'Введите названия градации',
          next: 'Далее'
        }
      },
      alts: [
        [ 'Категорически против', 'Против', 'Все равно (Воздержался)', 'За', 'Категорически за'],
        [ '1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Название опроса',
        code: 'Код доступа',
        count: 'Количество опрошенных',
        firstTime: 'Первый ответ',
        lastTime: 'Последний ответ',
        link: 'Ссылка на опрос',
        title: 'Результаты опроса',
        configType: 'Шкала оценивания',
        next1: 'Подробнее',
        next2: 'Карта Предпочтений',
        new: 'Новый эксперт',
        newTitle: 'Новый эксперт',
        newName: 'Имя',
        next3: 'Далее',
        exp: 'Эксперт',
        no: 'Еще нет ответов',
        submit: 'Подтвердить',
        message: {
          forget: 'Не забудьте сохранить код доступа: ',
          leave: 'Выйти из опроса?'
        },
        more: 'Подробнее',
        hide: 'Свернуть',
        types: {
          ZZ: 'Общее согласие',
          ZNZ: 'Общее несогласие',
          IN: 'Индифферентность',
          PD: 'Полярность мнений',
          CON: 'Конфронтационность',
          LO: 'Лоббизм',
          ALO: 'Антилоббизм',
          PO: 'Умеренность',
          OS: 'Единогласие',
        }
      },
      messages: {
        alts: 'Названия альтернатив повторяются',
        connectError: 'Опрос не найден',
        copied: 'Ссылка скопирована',
        createError: 'Опрос с таким ID уже существует',
        routerError: 'Пожалуйста, войдите опросу.'
      },
      admin: {
        deleteConfirm: 'Удалить опрос?',
        cancel: 'Отменить',
        delete: 'Удалить',
        name: 'Название',
        count: 'Количество',
        first: 'Первый ответ',
        last: 'Последний ответ',
      }
    });
    translate.setTranslation('en', {
      home: {
        title: 'Online Polls',
        subtitle: 'Verbal-visual analytics',
        new: 'Start a new poll',
        find: 'Join existing poll',
        newTitle: 'New Poll',
        newName: 'Name',
        code: 'Access code',
        altsNum: 'Number of alternatives',
        typeName: 'Rating scale type',
        next: 'Next',
        altsName: 'Enter alternative names',
        alt: 'Alternative',
        findTitle: 'Join poll',
        connect: 'Join',
        config: {
          title: 'New scale',
          selectColors: 'Choose a point-and-color structure',
          selectNames: 'Enter the names of the gradations',
          selectOneName: 'Enter the names of the gradation',
          next: 'Next'
        }
      },
      alts: [
        ['Strongly against', 'Against', 'Indifferent (Abstain)', 'For', 'Strongly for'],
        ['1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Poll name',
        code: 'Access code',
        count: 'Number of respondents',
        firstTime: 'First answer',
        lastTime: 'Last answer',
        link: 'Poll link',
        title: 'Poll results',
        configType: 'Rating scale',
        next1: 'Details',
        next2: 'Preferences Map',
        new: 'New Expert',
        newTitle: 'New Expert',
        newName: 'Name',
        next3: 'Next',
        exp: 'Expert',
        no: 'There are no answers yet',
        submit: 'Confirm',
        message: {
          forget: 'Don\'t forget to save the access code: ',
          leave: 'Leave poll?'
        },
        more: 'More',
        hide: 'Hide',
        types: {
          ZZ: 'General agreement',
          ZNZ: 'General disagreement',
          IN: 'Indifference',
          PD: 'Polarity of opinions',
          CON: 'Confrontation',
          LO: 'Lobbying',
          ALO: 'Anti-lobbying',
          PO: 'Moderation',
          OS: 'Unanimity'
        }
      },
      messages: {
        alts: 'Alternative names are repeated',
        connectError: 'Poll not found',
        copied: 'Link copied',
        createError: 'Poll with this ID already exists',
        routerError: 'Please log in to the poll.'
      },
      admin: {
        deleteConfirm: 'Delete poll?',
        cancel: 'Cancel',
        delete: 'Delete',
        name: 'Name',
        count: 'Count',
        first: 'First response',
        last: 'Last response',
      }
    });
  }

  ngOnInit(): void {
    this.mainService.options$.subscribe((res: any) => {
      this.id = res.id;
    });
  }

  public home(): void {
    if (this.id) {
      if (confirm(this.translate.instant('poll.message.forget') + this.id + '\n' + this.translate.instant('poll.message.leave'))) {
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }
  }

  public lang(e): void {
    this.translate.use(e.value);
    localStorage.setItem('poll-lang', e.value);
    this.mainService.translateAlternatives();
  }
}
