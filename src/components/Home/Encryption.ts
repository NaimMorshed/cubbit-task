const singleChar = (c: number, sum: number) => {
    for (let i: number = 32; i <= 125; i++) {

        if (c === sum) {
            return i;
        } else c++;

        if (i === 125) {
            i = 31;
        }

    }
}

const getSummation = (arr: string[]) => {
    
    let summation: number = 0;
    for (let i: number = 0; i < arr.length; i++) {
        summation += arr[i].charCodeAt(0);
    }

    return summation;
}

export const encrypt = (string: string) => {
    const nameArray: any = string.split("");
    nameArray.reverse();
    const summation = getSummation(nameArray);

    for (let i: number = 0; i < nameArray.length; i++) {
        nameArray[i] = singleChar(nameArray[i].charCodeAt(0), summation);
    }

    for (let i: number = 0; i < nameArray.length; i++) {
        nameArray[i] = String.fromCharCode(nameArray[i]);
    }

    return nameArray.join("");
}