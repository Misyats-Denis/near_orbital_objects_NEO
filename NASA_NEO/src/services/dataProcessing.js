
// Функція, яка об'єднує дані в один об'єкт
export function aggregateData(obj) {
    const date = obj.close_approach_data[0].close_approach_date;
    const name = obj.name;
    const maxDiameter = obj.estimated_diameter.kilometers.estimated_diameter_max;
    const hazardous = obj.is_potentially_hazardous_asteroid ? 1 : 0;
    const closest = obj.close_approach_data[0].miss_distance.kilometers;
    const fastest =
      obj.close_approach_data[0].relative_velocity.kilometers_per_hour;
  
    const riskScore = calculateRisk(obj);
  
    return { date, name, maxDiameter, hazardous, closest, fastest, riskScore };
  }

  // Функція, яка розраховує ризик для об'єкта
  export function calculateRisk(obj) {
    const maxDiameter = obj.estimated_diameter.kilometers.estimated_diameter_max;
    const hazardous = obj.is_potentially_hazardous_asteroid ? 1 : 0.1;
    const fastest =
      obj.close_approach_data[0].relative_velocity.kilometers_per_hour;
  
    return hazardous * maxDiameter * fastest;
  }