import replace from 'gulp-replace';  // поиск и замена
import plumber from 'gulp-plumber';  // обработка ошибок
import notify from 'gulp-notify';    // посказки сообщения
import browsersync from 'browser-sync';
import newer from 'gulp-newer';      // проверка обновлений(действительно ли картинка поменялась)
import ifPlugin from 'gulp-if';


//экспортироем объект с плагинами

export const plugins = {
    replace,
    plumber,
    notify,
    browsersync,
    newer,
    if: ifPlugin
}   