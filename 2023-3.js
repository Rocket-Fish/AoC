let input = ``


// part 1
{
    // type EngineNumbersList = [{number: String, x: Number, y: Number}]
    let engineNumbersList = [];
    // type SymbolsMap = {[x: Number]: {[y: Number]: true}}
    const symbolsMap = {};

    for(const [y, row] of input.split('\n').entries()) {
        const numbers = [...row.matchAll(/\d{1,}/g)].map((n) => ({number: n[0], x: n.index, y}))
        console.log('numbers', numbers);
        engineNumbersList = engineNumbersList.concat(numbers);

        const symbols = [...row.matchAll(/[\@#\$%&\*\+\-\/=]/g)]
        console.log('symbols', symbols);
        for(const symbol of symbols) {
            symbolsMap[symbol.index] = {
                ...(symbolsMap[symbol.index] ? symbolsMap[symbol.index] : {}), 
                [y]: true
            }
        }
    }

    console.log('engineNumbersList', engineNumbersList);
    console.log('symbolsMap', symbolsMap);

    const result = engineNumbersList.reduce((acc, {number, x, y}) => {
        const searchIndicesRange = {
            x: {min: x-1, max: x+number.length}, // -1+1 (-1 cuz number.length) +1 cuz gotta check next x char
            y: {min: y-1, max: y+1}
        }

        let isAjacentToSymbol = false;
        xLoop: for(let x = searchIndicesRange.x.min; x <= searchIndicesRange.x.max; x++) {
            for(let y = searchIndicesRange.y.min; y <= searchIndicesRange.y.max; y++) {
                if(symbolsMap[x] && symbolsMap[x][y]) {
                    isAjacentToSymbol = true;
                    break xLoop;
                }
            }
        }
        console.log(number, searchIndicesRange, isAjacentToSymbol)
        if(isAjacentToSymbol) return acc + parseInt(number);
        return acc;
    }, 0)
    console.log(result)
}











// part 2

{
    // type engineNumber = {[x]: Number: {[y: Number]: {number: String, originalX: Number, y: Number}}}
    const numbersMap = {};
    // type gearsList = [{x: Number, y: Number}]
    let gearsList = [];


    for(const [y, row] of input.split('\n').entries()) {
        const gears = [...row.matchAll(/\*/g)].map((n) => ({x: n.index, y}))
        gearsList = gearsList.concat(gears);

        const numbers = [...row.matchAll(/\d{1,}/g)]
        console.log('numbers', numbers)
        for(const number of numbers) {
            console.log('number', number)
            for (let i = 0; i < number[0].length; i++) {
                console.log('numbersMapStep', numbersMap[number.index + i])
                numbersMap[number.index + i] = {
                    ...(numbersMap[number.index+i] ? numbersMap[number.index+i] : {}), 
                    [y]: {number: number[0], originalX: number.index, y}
                }
                console.log('numbersMapStep', numbersMap[number.index + i])
                console.log('numbersMapStep++', numbersMap)
            }
        }
        console.log('numbersMapWIP', numbersMap)
    }

    console.log('gearsList', gearsList);
    console.log('numbersMap', numbersMap);

    const result = gearsList.reduce((acc, {x, y}) => {
        const searchIndicesRange = {
            x: {min: x-1, max: x+1},
            y: {min: y-1, max: y+1}
        }

        const ajacencyList = []; // {number: String, originalX: Number, y: Number}[]
        for(let x = searchIndicesRange.x.min; x <= searchIndicesRange.x.max; x++) {
            for(let y = searchIndicesRange.y.min; y <= searchIndicesRange.y.max; y++) {
                if(numbersMap[x] && numbersMap[x][y]) {
                    const foundNumber = numbersMap[x][y]
                    console.log('foundNumber', foundNumber)
                    let isDuplicate = false;
                    for(const existing of ajacencyList) {
                        if(existing.originalX === foundNumber.originalX && existing.y === foundNumber.y) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if(!isDuplicate) ajacencyList.push(numbersMap[x][y])
                }
            }
        }
        console.log(searchIndicesRange, ajacencyList)
        if(ajacencyList.length === 2) return acc + (parseInt(ajacencyList[0].number) * parseInt(ajacencyList[1].number));
        return acc;
    }, 0)
    console.log(result)    
}

