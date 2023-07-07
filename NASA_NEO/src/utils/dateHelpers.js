
// Функції, які повертають потрібні дати
export function getStartDate() {
    let today = new Date();
    return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
      -2
    )}-01`;
  }
  
  export function getTodayDate() {
    let today = new Date();
    return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
      "0" + today.getDate()
    ).slice(-2)}`;
  }
  
  export function getNextDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }