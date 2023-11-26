// Задача 22:
// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

// Решение:

let count = 0;

// Раньше ограничения на максимальную вложенность document.write() не было, но
// в один момент разработчики нашли уязвимость, с помощью которой можно было сломать браузер и решили
// установить максимальную вложенность равную 21.
// Mozilla firefox - 20 (https://searchfox.org/mozilla-central/source/dom/base/Document.cpp#444)
// Google Chrome - 21 (https://github.com/WebKit/webkit/blob/main/Source/WebCore/dom/Document.cpp#L391)
function tryDocumentWrite() {
  try {
    count++;
    document.write("<script>tryDocumentWrite();</script>");
  } catch (e) {
    console.log(e);
  }
}

tryDocumentWrite();
console.log("Максимальная вложенность document.write():", count - 1); // 21
