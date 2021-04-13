export default class ImageService {
    delay = 700

    data = [
        {
            id: 1,
            imgURL: 'https://raw.githubusercontent.com/mariia-korzun/MockFiles/main/numbers/1.png'
        },
        {
            id: 2,
            imgURL: 'https://raw.githubusercontent.com/mariia-korzun/MockFiles/main/numbers/2.png'
        },
        {
            id: 3,
            imgURL: 'https://raw.githubusercontent.com/mariia-korzun/MockFiles/main/numbers/3.png'
        },
        {
            id: 4,
            imgURL: 'https://raw.githubusercontent.com/mariia-korzun/MockFiles/main/numbers/4.png'
        },
        {
            id: 5,
            imgURL: 'https://raw.githubusercontent.com/mariia-korzun/MockFiles/main/numbers/5.png'
        }
    ]

    getImages = () => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(this.data) },
                this.delay)
        })
    }
}