import axios from 'axios';

interface PublicHoliday {
  date: string;
}

const cache = new Map<string, PublicHoliday[]>();

export async function getNextPayday(): Promise<Date> {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const lastWeekdayOfMonth = endOfMonth.getDay() === 0 ? endOfMonth.getDate() - 2 : endOfMonth.getDay() === 6 ? endOfMonth.getDate() - 1 : endOfMonth.getDate();
  const payday = new Date(now.getFullYear(), now.getMonth(), lastWeekdayOfMonth, 4, 0, 0);
  if (payday.getTime() < now.getTime()) {
    payday.setMonth(payday.getMonth() + 1);
  }

  const cacheKey = `${now.getFullYear()}_${'AT'}`;
  let publicHolidays: PublicHoliday[] | undefined = cache.get(cacheKey);

  if (!publicHolidays) {
    const response = await axios.get<PublicHoliday[]>(`https://date.nager.at/api/v3/PublicHolidays/${now.getFullYear()}/AT`);
    publicHolidays = response.data;
    cache.set(cacheKey, publicHolidays);
  }

  const holidayDates = publicHolidays.map(holiday => new Date(holiday.date));

  while (holidayDates.some(holiday => holiday.getTime() === payday.getTime())) {
    payday.setDate(payday.getDate() + 1);
  }

  return payday;
}
