import process from 'process';

const parseEnv = () => {
   const evnVars = process.env;
   const rssKeys = Object.keys(evnVars).filter((key) => key.startsWith('RSS_'));
   const result = rssKeys.reduce((acc, key) => {
       const value = evnVars[key];
       acc.push(`${key} = ${value}`);
       return acc;
   }, []);
   console.log(result.join('; '));
};

parseEnv();