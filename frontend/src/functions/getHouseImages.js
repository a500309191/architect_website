import React, { useEffect, useState } from "react";

export const getHouseImages = (images, houseId) => {

    let houseImages = []

    for (let i = 0; i < images.length; i++) {
        let item = images[i];
            if (item.house == houseId) {
           houseImages.push(item)
        }
    }

    return houseImages;
}