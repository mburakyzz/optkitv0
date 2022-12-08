const strategies = [
    { id: 1, name: 'longCall', img: require('../assets/longCall.png'), options: [{ id: 1, mony: 0, type: 'C', pos: 'L' }] },
    { id: 2, name: 'shortPut', img: require('../assets/shortPut.png'), options: [{ id: 1, mony: 0, type: 'S', pos: 'P' }] },
    { id: 3, name: 'bullCallSpread', img: require('../assets/bullCallSpread.png'), options: [{ id: 1, mony: [1, 2], type: 'C', pos: 'L' }, { id: 2, mony: [4, 5], type: 'C', pos: 'S' }] },
    { id: 4, name: 'callRatioBackSpread', img: require('../assets/callRatioBackSpread.png'), options: [{ id: 1, mony: [3, 4, 5], type: 'C', pos: 'L' }, { id: 2, mony: [3, 4, 5], type: 'C', pos: 'L' }, { id: 3, mony: [1, 2], type: 'C', pos: 'S' }] },
    { id: 5, name: 'bearCallLadder', img: require('../assets/bearCallLadder.png'), options: [{ id: 1, mony: [1, 2], type: 'C', pos: 'S' }, { id: 2, mony: [3], type: 'C', pos: 'L' }, { id: 3, mony: [4, 5], type: 'C', pos: 'L' }] },
    { id: 6, name: 'longPut', img: require('../assets/longPut.png'), options: [{ id: 1, mony: 0, type: 'P', pos: 'L' }] },
    { id: 7, name: 'shortCall', img: require('../assets/shortCall.png'), options: [{ id: 1, mony: 0, type: 'C', pos: 'S' }] },
    { id: 8, name: 'bearCallSpread', img: require('../assets/bearCallSpread.png'), options: [{ id: 1, mony: [1, 2], type: 'S', pos: 'L' }, { id: 2, mony: [4, 5], type: 'C', pos: 'L' }] },
    { id: 9, name: 'putRatioBackSpread', img: require('../assets/putRatioBackSpread.png'), options: [{ id: 1, mony: [1, 2, 3], type: 'P', pos: 'L' }, { id: 2, mony: [1, 2, 3], type: 'P', pos: 'L' }, { id: 3, mony: [4, 5], type: 'P', pos: 'S' }] },
    { id: 10, name: 'bullPutLadder', img: require('../assets/bullPutLadder.png'), options: [{ id: 1, mony: [1, 2], type: 'P', pos: 'L' }, { id: 2, mony: [3], type: 'P', pos: 'L' }, { id: 3, mony: [4, 5], type: 'P', pos: 'S' }] },
    { id: 11, name: 'longStrangle', img: require('../assets/longStrangle.png'), options: [{ id: 1, mony: [3, 4, 5], type: 'C', pos: 'L' }, { id: 2, mony: [1, 2, 3], type: 'P', pos: 'L' }] },
    { id: 12, name: 'reverseIronCondor', img: require('../assets/reverseIronCondor.png'), options: [{ id: 1, mony: [1], type: 'P', pos: 'S' }, { id: 2, mony: [5], type: 'C', pos: 'S' }, { id: 3, mony: [2, 3], type: 'P', pos: 'L' }, { id: 4, mony: [3, 4], type: 'C', pos: 'L' }] },
    { id: 13, name: 'shortStrangle', img: require('../assets/shortStrangle.png'), options: [{ id: 1, mony: [3, 4, 5], type: 'C', pos: 'S' }, { id: 2, mony: [3, 4, 5], type: 'P', pos: 'S' }] },
    { id: 14, name: 'ironCondor', img: require('../assets/ironCondor.png'), options: [{ id: 1, mony: [1], type: 'P', pos: 'L' }, { id: 2, mony: [5], type: 'C', pos: 'L' }, { id: 3, mony: [2, 3], type: 'P', pos: 'S' }, { id: 4, mony: [3, 4], type: 'C', pos: 'S' }] },
]
export default strategies