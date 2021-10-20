function asyncUpdateDogList(dogList, fileList, currentImagesItems) {
    console.log(dogList.length)
    if (dogList.length > 0) {
        let dogListIndex = dogList.length - 1;
        let dogListItem = dogList[dogListIndex];
        dogList.splice(dogListIndex, 1);
        let error;

        try {
            axios.get(UnityUrl + "?dog_id=" + dogListItem.ID.toString())
                .then(response => {

                    let img_str = coinDogsUrl + response.data.img;
                    let cur_img_str = coinDogsUrl + response.data.current_img;
                    let bio = response.data.bio;
                    let birthday = response.data.birthday;
                    let _filename = filename(img_str);
                    let _cur_img_str_filename = filename(cur_img_str);
                    fileList.push(_filename);
                    currentImagesItems.push(_cur_img_str_filename);

                    let new_img_url = cryptoDogsUrl + cryptoDogsRelatieUrl + _filename;
                    let cur_new_img_url = cryptoDogsUrl + cryptoDogsRelatieUrl + _cur_img_str_filename;
                    DogsModel.findOne({
                        where: {
                            DogID: dogListItem.ID
                        }
                    }).then(dog => {

                        if (!dog) {
                            DogsModel.create(
                                {
                                    BG: dogListItem.BG,
                                    PurchasePrice: dogListItem.PurchasePrice,
                                    BreedingPrice: dogListItem.BreedingPrice,
                                    TopBreedComposition_FullInfo: dogListItem.TopBreedComposition_FullInfo,
                                    AgeInWords: dogListItem.AgeInWords,
                                    PurityPer: dogListItem.PurityPer,
                                    DogID: dogListItem.ID
                                }
                            ).then(function (result) {
                            })
                        }
                        if (true) {
                            DogsModel.update(
                                {
                                    AgeInWords: dogListItem.AgeInWords,
                                    PurityPer: dogListItem.PurityPer,
                                },
                                {
                                    where: {
                                        IsNFT: 1,
                                    }
                                }).then(function (result) {
                                    //res.status(200).send(result);
                                });
                        } if (true) {
                            DogsModel.update(
                                {
                                    TopBreedComposition_FullInfo: dogListItem.TopBreedComposition_FullInfo,
                                    AgeInWords: dogListItem.AgeInWords,
                                },
                                {
                                    where: {
                                        IsNFT: null,
                                    }
                                }).then(function (result) {
                                    //res.status(200).send(result);
                                });
                        }
                    })
                    asyncUpdateDogList(dogList, fileList, currentImagesItems);
                }).catch(err => {
                    asyncUpdateDogList(dogList, fileList, currentImagesItems);
                    throw err;
                });

        } catch (err) {
            error = err;
        }
    }
    else {
        uploadFiles(fileList, currentImagesItems);

    }
}
