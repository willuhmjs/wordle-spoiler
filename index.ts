async function getWordle(date: string) {
    const response = await fetch(
      `https://www.nytimes.com/svc/wordle/v2/${date}.json`
    );
    return await response.json();
  }
  
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }
  
  function getNextDate(date: Date) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
  
    // Check if the date is the last day of the month
    if (nextDay.getDate() === 1) {
      nextDay.setMonth(nextDay.getMonth() + 1);
      nextDay.setDate(1); // Move to the first day of the next month
    }
  
    return nextDay;
  }
  
  async function fetchWordleDataForNext30Days() {
    let currentDate = new Date();
  
    for (let i = 0; i < 30; i++) {
      const formattedDate = formatDate(currentDate);
      const wordle = await getWordle(formattedDate);
      console.log(formattedDate + ": " + wordle.solution);
      currentDate = getNextDate(currentDate);
    }
  }
  
  // Call the function to fetch Wordle data for the next 30 days
  fetchWordleDataForNext30Days().then(() => {
    console.log("Wordle data fetched successfully for the next 30 days.");
  });