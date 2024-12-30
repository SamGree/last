import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getHours, addHours, set } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const determineTheme = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = getHours(zonedTime);

    setTheme(currentHour >= 6 && currentHour < 18 ? 'dark' : 'light');
  };

  const scheduleNextChange = useCallback(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);

    const currentHour = getHours(zonedTime);
    let nextChange;

    if (currentHour >= 6 && currentHour < 18) {
      nextChange = set(zonedTime, {
        hours: 18,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    } else {
      nextChange = set(zonedTime, {
        hours: 6,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      if (currentHour >= 18) {
        nextChange = addHours(nextChange, 24);
      }
    }

    const timeUntilNextChange = nextChange.getTime() - zonedTime.getTime();

    setTimeout(() => {
      determineTheme();
      scheduleNextChange();
    }, timeUntilNextChange);
  }, []);

  useEffect(() => {
    determineTheme();
    scheduleNextChange();
  }, [scheduleNextChange]);

  const toggleThemeManually = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeManually }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
