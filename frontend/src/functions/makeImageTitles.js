export const makeImageTitles = images => {

    let imageTitles = [];

    //filter loop
    //adds an image of only the house whose image is not in the list
    for (let i = 0; i < images.length; i++) {
        let item = images[i];
        let prev_item = images[i-1];
        if (prev_item == undefined || item.house != prev_item.house) {
            imageTitles.push(item)
        }
    }

    return imageTitles;
}
