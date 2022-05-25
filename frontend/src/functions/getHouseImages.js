import React, { useEffect, useState } from "react";

export const getHouseImages = (images, houseId) => {

    let houseImages = []

    for (let i = 0; i < images.length; i++) {
        let image = images[i];
            if (image.house == houseId) {
           houseImages.push(image)
        }
    }

    return houseImages;
}