export const fromNumbersInMonth = (monthNumber) =>{
    const month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    const monthName  = month[monthNumber - 1];
    return monthName;
}