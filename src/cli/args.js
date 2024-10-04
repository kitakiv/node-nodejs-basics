const parseArgs = () => {
    const arrayArgs = process.argv.slice(2);
    const result = arrayArgs.reduce((acc, arg) => {
        if (arg.includes('--')) {
            arg.replace('--', '');
            acc.push([arg]);
        } else {
            acc.at(-1).push(arg);
        }
        return acc
    }, []);
    const strValues = result.map(argAndValue => argAndValue.join(' is ')).join(', ');

    console.log(strValues);
};

parseArgs();