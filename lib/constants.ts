export const getAllPlayers = async () => {
    const res = await fetch(`/api/players`);
    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }
    return res.json();
  };
  
  // export const getAllStatistics = async () => {
  //   const res = await fetch(`/api/players/statistics`);
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch statistics");
  //   }
  //   return res.json();
  // };
  


  