export function makeObjectDeepCopy(objToCopy) {
    if (objToCopy === null) {
        return null;
    }
    
    if (typeof objToCopy !== 'object') {
        return objToCopy;
    }
    
    if (Array.isArray(objToCopy)) {
        const cloneArr = [];
        
        for (let i = 0; i < objToCopy.length; i++) {
            cloneArr[i] = makeObjectDeepCopy(objToCopy[i]);
        }
        
        return cloneArr;
    }

    const cloneObj = {};
    
    for (const key in objToCopy) {
        if (objToCopy.hasOwnProperty(key)) {
            cloneObj[key] = makeObjectDeepCopy(objToCopy[key]);
        }
    }
    
    return cloneObj;
}

export function selectFromInterval(numbersArray, intervalStart, intervalEnd) {
    if(!Array.isArray(numbersArray) || numbersArray.find((el) => typeof el !== 'number')) {
        throw new Error('Invalid array');
    }
    
    if(typeof intervalStart !== 'number' || typeof intervalEnd !== 'number') {
        throw new Error('Invalid indexes');
    }

    let start = intervalStart;
    let end = intervalEnd;

    if (intervalStart > intervalEnd) {
        start = intervalEnd;
        end = intervalStart;
    }

    return numbersArray.filter((_, i) => i >= start && i <= end);
}

export const myIterable = { from: 1, to: 5};

myIterable[Symbol.iterator] = function(){
    if (typeof this.from !== 'number' || typeof this.to !== 'number') {
        throw new Error('Error');
    }
    
    if (this.from > this.to) {
        throw new Error('Error');
    }
    
    return {
        current: this.from,
        last: this.to,
        next(){
            if (this.current<=this.last){
                return { done: false, value: this.current++};
            } else {
                return { done:true};
            }
        }
    };
};
