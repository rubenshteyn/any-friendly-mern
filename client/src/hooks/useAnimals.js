import {useMemo} from "react";
export const useAnimals = (animals) => {
    const gettingAnimals = useMemo(() => {
        return animals
    }, [animals])

    return gettingAnimals
}