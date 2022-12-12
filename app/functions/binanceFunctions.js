import strategies from "../database/strategies"

const BinanceFunctions = {
    // GETS AVAILABLE OPTION TICKERS
    getPotentialOptions: (rawData,selectedDue,selectedTicker)=>{
        const arr = []
        rawData.forEach(i => {
            if(i.underlying==selectedTicker+'USDT'){
                if(i.symbol.split('-')[1]==selectedDue){
                    arr.push(i.symbol)
                }
            }
        })

        return(arr)
    },
    // FETCHES THE STRIKE PRICES FROM POTENTIAL OPTIONS
    getPotentialStrikes: (potentialOptions)=>{
        const arr = []
        potentialOptions.forEach(i=>{
            const strikePrice = Number(i.split('-')[2])
            if (!arr.includes(strikePrice)){
                arr.push(strikePrice)
            }
        })
        arr.sort(function(a,b){return a-b;})
        return(arr)
    },
    // FILTERS THE MONYNESS OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
    selectStrikePrices: (underlying,potentialStrikes,selectedStrategy)=>{
        try{
            const max = Math.max(...potentialStrikes)
            const min = Math.min(...potentialStrikes)
            const maxStep = (max-underlying)/5
            const minStep = (underlying-min)/5
            const firstMony = potentialStrikes.filter(x => x <= min+2*minStep && x>=min)
            const secondMony = potentialStrikes.filter(x => x <= min+4*minStep && x > min+2*minStep)
            const thirdMony = potentialStrikes.filter(x => x > min+4*minStep && x < max-4*maxStep)
            const fourthMony = potentialStrikes.filter(x => x >= max-4*maxStep && x <= max-2*maxStep)
            const fifthMony = potentialStrikes.filter(x =>  x > max-2*maxStep)
            const arr =[]
            selectedStrategy.forEach(x=>{
                const arr2 = []
                if (x.mony.includes(1)){
                    firstMony.forEach(x=>arr2.push(x))
                }
                if (x.mony.includes(2)){
                    secondMony.forEach(x=>arr2.push(x))
                }
                if (x.mony.includes(3)){
                    thirdMony.forEach(x=>arr2.push(x))
                }
                if (x.mony.includes(4)){
                    fourthMony.forEach(x=>arr2.push(x))
                }
                if (x.mony.includes(5)){
                    fifthMony.forEach(x=>arr2.push(x))
                }
                arr.push(arr2)
            })
            return(JSON.stringify(arr))  
        } catch{return([])}
    },

    // FILTERS THE TYPE OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
    selectTypes: async(selectedStrategy)=>{
        arr = []
        for await(x of selectedStrategy){
            const type = await x.type
            arr.push(type)
        }
        return(JSON.stringify(arr))
    },

    // FILTERS THE POSITION OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
    selectPositions: async(selectedStrategy)=>{
        arr2 = []
        for await(x of selectedStrategy){
            const pos = await x.pos
            arr2.push(pos)
        }
        return(JSON.stringify(arr2))
    },

    // GETS BLACK-SCHOLES OPTION PRICE FOR SELECTED STRIKE PRICES
    selectCosts: async(getOptPrice,selectedTicker,selectedDue,selectedStrikes,selectedTypes,selectedPositions)=>{

        try{
            const arr =[]
            const strikes = await JSON.parse(selectedStrikes)
            const types = await selectedTypes
            const positions = await selectedPositions
            console.log(types)
            for await (i of strikes){
                const arr2 = []
                for await (j of i){
                    const symbol = await selectedTicker+'-'+selectedDue+'-'+j+'-'+types[strikes.indexOf(i)]
                    console.log(symbol)
                    const price = await getOptPrice(symbol)
                    arr2.push(price)
                }
                arr.push(arr2)
            }
            const response = JSON.stringify(arr)
            return(response)
        }catch{console.log(':/')}

    }
    
}

export default BinanceFunctions