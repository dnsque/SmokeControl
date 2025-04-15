interface StatsResponse {
  success: boolean;
  data: {
    totalSmokers: string;
    annualDeaths: string;
    percentageAdultMen: string;
    percentageAdultWomen: string;
    percentageEU: string;
    percentageLithuania: string;
    yearOfData: string;
    source: string;
  };
}

export const getGlobalSmokingStats = async (): Promise<StatsResponse> => {
  // In a real application, this would fetch data from an API
  // For now, we're returning mock data
  return {
    success: true,
    data: {
      totalSmokers: '1.3 milijardo',
      annualDeaths: '8 milijonai',
      percentageAdultMen: '36%',
      percentageAdultWomen: '7%',
      percentageEU: '24%',
      percentageLithuania: '28%',
      yearOfData: '2022',
      source: 'PSO',
    }
  };
}; 