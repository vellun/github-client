export const formatDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
  
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
  
    return `Updated ${day} ${month}`;
  };