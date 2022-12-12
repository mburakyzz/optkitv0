import strategies from "../database/strategies"

const BinanceFunctions = {
    sa: (x)=>{
        console.log(x)
    },
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
        const max = Math.max(...potentialStrikes)
        const min = Math.min(...potentialStrikes)
        const maxStep = (max-underlying)/5
        const minStep = (underlying-min)/5
        const firstMony = potentialStrikes.filter(x => x <= min+2*minStep && x>=min)
        const secondMony = potentialStrikes.filter(x => x <= min+4*minStep && x > min+2*minStep)
        const thirdMony = potentialStrikes.filter(x => x > min+4*minStep && x < max-4*maxStep)
        const fourthMony = potentialStrikes.filter(x => x >= max-4*maxStep && x <= max-2*maxStep)
        const fifthMony = potentialStrikes.filter(x =>  x > max-4*maxStep)
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
        return(arr)   
    },

    // FILTERS THE TYPE OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
    selectTypes: (selectedStrategy)=>{
        arr = []
        selectedStrategy.forEach(x=>{
            arr.push(x.type)
        })
        return(arr)
    },

    // FILTERS THE POSITION OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
    selectPositions: (selectedStrategy)=>{
        arr = []
        selectedStrategy.forEach(x=>{
            arr.push(x.pos)
        })
        return(arr)
    },

    // GETS THE COSTS FOR SELECTED STRIKES
    selectCosts: async(getOptPrice,selectedTicker,selectedDue,selectedStrikes,selectedTypes)=>{
        const arr =[]
        try{
            const strikes = await selectedStrikes
            const types = await selectedTypes
            for await (i of strikes){
                const arr2 = []
                for await (j of i){
                    const symbol = await selectedTicker+'-'+selectedDue+'-'+j+'-'+types[strikes.indexOf(i)]
                    arr2.push(await getOptPrice(symbol))
                }
                arr.push(arr2)
            }
            return(arr)
        }catch{return(arr)}
    }
    
}

export default BinanceFunctions