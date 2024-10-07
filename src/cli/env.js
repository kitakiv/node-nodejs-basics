import process from 'process';

const parseEnv = () => {
   const evnVars = process.env;
   const rssKeys = Object.keys(evnVars).filter((key) => key.startsWith('RSS_'));
   const result = rssKeys.reduce((acc, key) => {
       acc.push(`${key}=${process.env[key]}`);
       return acc;
   }, []);
   console.log(result.join('; '));
};

parseEnv();