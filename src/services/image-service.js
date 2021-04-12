export default class CarouselService {
    data = [
        {
            id: 1,
            imgURL: 'http://www.raskraska.ru/zifra_digital/img/one_cobalt_blue.gif'
        },
        {
            id: 2,
            imgURL: 'http://www.raskraska.ru/zifra_digital/img/dva_cobalt_blue.gif'
        },
        {
            id: 3,
            imgURL: 'http://www.raskraska.ru/zifra_digital/img/tri_cobalt_blue.gif'
        },
        {
            id: 4,
            imgURL: 'http://www.raskraska.ru/zifra_digital/img/four_cobalt_blue.gif'
        },
        {
            id: 5,
            imgURL: 'http://www.raskraska.ru/zifra_digital/img/five_cobalt_blue.gif'
        }
    ]

    fetchCarouselData() {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(this.data) },
            1000)
        })
    }
}