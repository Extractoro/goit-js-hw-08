/* Ознакомься с документацией библиотеки Vimeo плеера.

Добавь библиотеку как зависимость проекта через npm.

Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, 
но учти что у тебя плеер добавлен как npm пакет, а не через CDN.

Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.

Сохраняй время воспроизведения в локальное хранилище. 
Пусть ключом для хранилища будет строка "videoplayer-current-time".

При перезагрузке страницы воспользуйся методом setCurrentTime() для того 
чтобы возобновить воспроизведение с сохраненной позиции.

Добавь в проект бибилотеку lodash.throttle и сделай так, 
чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду. */
import throttle from 'lodash.throttle'
const video = document.querySelector('iframe')
const player = new Vimeo.Player(video);
const SAVEVIDEOTIME = "videoplayer-current-time"

player.on('play', onPlayTime);
player.on('timeupdate', throttle(onSaveTime, 1000))

function onSaveTime(e) {
    const currentTime = e.seconds
    localStorage.setItem(SAVEVIDEOTIME, JSON.stringify(currentTime))

    if (currentTime === e.duration) {
        player.off('timeupdate')
        localStorage.removeItem(SAVEVIDEOTIME)
    }
};

function onPlayTime() {
    player.on('timeupdate', throttle(onSaveTime, 1000))
}

const savedTime = localStorage.getItem(SAVEVIDEOTIME)
const parsedSavedTime = JSON.parse(savedTime)
player.setCurrentTime(parsedSavedTime)