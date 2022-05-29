export const getHousesAreas = (houses) => {

    const housesAreas = []
    console.log("run getHousesArea")

    for (let i = 0; i < houses.length; i++) {
        let houseArea = houses[i].area;
        housesAreas.push(houseArea)
    }

    return housesAreas
}
