const combineTraits = (arrayOfTraits) => {
    const [allTraitsOfOneType, ...restOfTraits] = arrayOfTraits;
    const traitCombination = [];

    if (arrayOfTraits.length === 0) {
        return [{}];
    }

    const allCombinationsOfRestOfTraits = combineTraits(restOfTraits);
    for (const trait of allTraitsOfOneType) {
        for (const someCombinationOfTheRest of allCombinationsOfRestOfTraits) {
            traitCombination.push({
                ...trait,
                ...someCombinationOfTheRest,
            });
        }
    }

    return traitCombination;
};

const traitCombinatorInator = (traits) => {
    const entries = Object.entries(traits);
    const individualTraits = entries.map((entry) => {
        const [trait, values] = entry;
        return values.map((value) => ({ [trait]: value }));
    });

    return combineTraits(individualTraits);
};

export default traitCombinatorInator;