// Це для створення реакт компоненту та використання стану і побічних ефектів
import { React, useState, useEffect, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,CircularProgress } from "../../imports";
import axios from "axios"; // Це потрібно залишити, бо `axios` використовується в `useEffect`

import { getStartDate, getTodayDate, getNextDay } from '../../utils/dateHelpers';
import { aggregateData, calculateRisk } from '../../services/dataProcessing';

const API_KEY = import.meta.env.VITE_REACT_APP_NASA_API_KEY
function App() {
  const [data, setData] = useState([]); // Дані про астероїди, які ми отримуємо від API
  const [startDate, setStartDate] = useState(getStartDate()); // Початкова дата, з якої ми отримуємо дані
  const [dayObjects, setDayObjects] = useState([]); // Об'єкти на кожен день місяця
  const [maxRisks, setMaxRisks] = useState([0, 0]); // Максимальні ризики для об'єктів
  const [loading, setLoading] = useState(true);
  // Функція, яка виконується при зміні дати початку або об'єктів дня
  useEffect(() => {
    // Запускаємо цикл, який кожні 5 секунд отримує нові дані

    const intervalId = setInterval(async () => {
      const todayDate = getTodayDate();
      if (startDate > todayDate) {
        // Якщо дата початку більша за сьогодні, скинути на перший день місяця
        setStartDate(getStartDate());
      } else if (dayObjects.length === 0) {
        const response = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=${API_KEY}`
        );

        const { near_earth_objects } = response.data;
        let newDayData = Object.values(near_earth_objects).flat();
        setDayObjects(newDayData);
        setStartDate(getNextDay(startDate));
      }

      if (dayObjects.length > 0) {
        const aggregatedData = aggregateData(dayObjects[0]);
        setDayObjects(dayObjects.slice(1));
        setData((prevData) => {
          const newData = [aggregatedData, ...prevData];
          if (newData.length > 6) {
            newData.pop();
          }
          if(newData.length === 1){
            setLoading(false);
          }
          return newData;
        });

        // обновити стан maxRisks Це допомагає нам відстежувати максимальні ризики з усіх даних.
        const currentRiskScore = calculateRisk(dayObjects[0]);
        if (currentRiskScore > Math.min(...maxRisks)) {
          const newMaxRisks = maxRisks.sort((a, b) => a - b);
          newMaxRisks[0] = currentRiskScore;
          setMaxRisks(newMaxRisks);
        }
        setLoading(false);
      }
    }, 5000);

    // Обчислювати maxRisks при кожній зміні даних
    if (data.length > 0) {
      const riskScores = data.map((dayData) => dayData.riskScore);
      riskScores.sort((a, b) => b - a);
      setMaxRisks(riskScores.slice(0, 2));
    }
    // Зупиняємо цикл, коли компонент демонтується
    return () => clearInterval(intervalId);



  }, [startDate, dayObjects]);
  // Рендеримо таблицю з даними
  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Дата спостереження</TableCell>
            <TableCell>Назва астероїдів</TableCell>
            <TableCell>Максимальний діаметр (км)</TableCell>
            <TableCell>Небезпечність</TableCell>
            <TableCell>Близькість(км)</TableCell>
            <TableCell>Швидкість (км/годину)</TableCell>
            <TableCell>Фактор ризику</TableCell>
          </TableRow>
        </TableHead>

   
        <TableBody>

        {loading ? ( // Если идет загрузка, отобразите лоадер
      <CircularProgress color="secondary" />
    ) : (<>

   
          {data.map((dayData, index) => (
            <TableRow
              style={{
                transition: "background-color 1s ease",
                backgroundColor: maxRisks.includes(dayData.riskScore)
                  ? "red"
                  : "white"
              }}
              key={index}
            >
            
              <TableCell>{dayData.date}</TableCell>
              <TableCell>{dayData.name}</TableCell>
              <TableCell>{Number(dayData.maxDiameter).toFixed(2)}</TableCell>
              <TableCell>{dayData.hazardous}</TableCell>
              <TableCell>{Number(dayData.closest).toFixed(2)}</TableCell>
              <TableCell>{Number(dayData.fastest).toFixed(2)}</TableCell>
              <TableCell>{Number(dayData.riskScore).toFixed(2)}</TableCell>
            </TableRow>
          ))} </>
          )}
        </TableBody>
      </Table>
    </TableContainer>


  );
}
// Експортуємо наш додаток, щоб його можна було використовувати в інших місцях
export default App;