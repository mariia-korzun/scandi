import React, { useState, useEffect } from 'react'

import ChangeSlideButton from '../change-slide-button'
import SliderDot from '../slider-dot'
import './carousel.css'

const Carousel = ({ data }) => {
    let transition = 0.3
    let shortTransition = 0.1
    let maxSwipeTime = 500
    let maxShift = 100
    
    const getNewStyles = (shift, time, direction, changeOpacity = false) => {
        const transition = time ? `left ${time}s linear` : 'none'
        return {
            prevStyle: {
                left: `calc(-100% - ${shift}px)`,
                transition: transition,
                zIndex: direction ? 99 : '',
                opacity: direction ? 1 : changeOpacity ? 1 : 0
            },
            currentStyle: {
                left: `${-1 * shift}px`,
                transition: transition,
                zIndex: 99
            },
            nextStyle: {
                left: `calc(100% + ${-shift}px)`,
                transition: transition,
                zIndex: direction ? '' : 99,
                opacity: direction ? changeOpacity ? 1 : 0 : 1
            }
        }
    }
    let initialStyles = getNewStyles(0, transition, true)


    function getNewClasses(classes, styles) {
        return classes.map(item => {
            switch (item.position) {
                case -1: {
                    return {
                        ...item,
                        style: styles.prevStyle
                    }
                }
                case 0: {
                    return {
                        ...item,
                        style: styles.currentStyle
                    }
                }
                case 1: {
                    return {
                        ...item,
                        style: styles.nextStyle
                    }
                }
            }
        })
    }


    const [shift, setShift] = useState(0)
    const [firstTouch, setFirstTouch] = useState(null)


    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [sliderDotIndex, setSliderDotIndex] = useState(0)
    const [sliderDotEqualCurrentSlide, setSliderDotEqualCurrentSlide] = useState(false)
    const [changeSlide, setChangeSlide] = useState(false)


    const [classes, setClasses] = useState([
        {
            position: -1,//prev
            style: initialStyles.prevStyle
        },
        {
            position: 0,//current
            style: initialStyles.currentStyle
        },
        {
            position: 1,//next
            style: initialStyles.nextStyle
        }
    ])

    // const [indexes, setIndexes] = useState([
    //     { prev: defineNextIndex(false, currentSlideIndex, data) },
    //     { current: currentSlideIndex },
    //     { next: defineNextIndex(true, currentSlideIndex, data) }
    // ])

    const [indexes, setIndexes] = useState([
        defineNextIndex(false, currentSlideIndex, data),
        currentSlideIndex,
        defineNextIndex(true, currentSlideIndex, data)
    ])

    const [direction, setDirection] = useState(null)


    function changeOrder(direction, array) {
        if (direction === null) { return array }
        return direction ? [array[array.length - 1], ...array.slice(0, array.length - 1)] : [...array.slice(1), array[0]]
    }

    function defineNextIndex(direction, currentIndex, array) {
        return direction ? (currentIndex + 1) % array.length : ((currentIndex - 1) + array.length) % array.length
    }

    useEffect(() => {
        if (currentSlideIndex !== sliderDotIndex) {
            let direction = (sliderDotIndex - currentSlideIndex) > 0

            let newStyles = getNewStyles(0, shortTransition, direction)
            let newClasses = getNewClasses(classes, newStyles)
            setClasses(changeOrder(direction, newClasses))
            setDirection(direction)
            setTimeout(() => {
                setChangeSlide(true)
            }, shortTransition*1000)

        }
    }, [currentSlideIndex, sliderDotIndex])


    useEffect(() => {
        if (direction !== null && changeSlide === true) {
            let newCurrentSlideIndex = defineNextIndex(direction, currentSlideIndex, data)
            let newIndexes = indexes.map((item) => {
                switch (item) {
                    case currentSlideIndex: {
                        return newCurrentSlideIndex
                    }
                    case defineNextIndex(false, currentSlideIndex, data): {
                        return defineNextIndex(false, newCurrentSlideIndex, data)
                    }
                    case defineNextIndex(true, currentSlideIndex, data): {
                        return defineNextIndex(true, newCurrentSlideIndex, data)
                    }
                }
            })
            setCurrentSlideIndex(newCurrentSlideIndex)
            if (sliderDotEqualCurrentSlide) {
                setSliderDotIndex(newCurrentSlideIndex)
                setSliderDotEqualCurrentSlide(false)

            }
            //    let a = changeOrder(direction, newIndexes)
            setIndexes(changeOrder(direction, newIndexes))
            setDirection(null)
            setChangeSlide(false)
        }

    }, [changeSlide])

    function handleTouchStart(e) {
        setFirstTouch({
            x: e.touches[0].clientX,
            time: Date.now()
        })
    }
    function handleTouchMove(e) {
        let newShift = firstTouch.x - e.touches[0].clientX
        let newDirection = newShift >= 0
        let newStyles = getNewStyles(newShift, null, newDirection, true)
        let newClasses = getNewClasses(classes, newStyles)
        setClasses(newClasses)
        setDirection(newDirection)
        setShift(newShift)

    }
    function handleTouchEnd() {
        if (direction === null) { return }
        let swipeTime = Date.now() - firstTouch.time



        if ((Math.abs(shift) > maxShift || swipeTime < maxSwipeTime)) {
            let newStyles = getNewStyles(0, transition, direction)
            let newClasses = getNewClasses(classes, newStyles)
            setDirection(direction)
            setSliderDotEqualCurrentSlide(true)
            setClasses(changeOrder(direction, newClasses))
            setChangeSlide(true)
        }
        else {
            let newStyles = getNewStyles(0, transition, direction, true)
            let newClasses = getNewClasses(classes, newStyles)
            setClasses(newClasses)
        }

    }



    return (
        <div>
            <ChangeSlideButton
                text='Prev'
                onClick={() => {
                    setDirection(false)
                    let newStyles = getNewStyles(0, transition, false)
                    let newClasses = getNewClasses(classes, newStyles)
                    setSliderDotEqualCurrentSlide(true)
                    setClasses(changeOrder(false, newClasses))
                    setChangeSlide(true)

                }} />
            <ChangeSlideButton
                text='Next'
                onClick={() => {
                    setDirection(true)
                    let newStyles = getNewStyles(0, transition, true)
                    let newClasses = getNewClasses(classes, newStyles)
                    setSliderDotEqualCurrentSlide(true)
                    setClasses(changeOrder(true, newClasses))
                    setChangeSlide(true)
                }} />

            <div className="carousel-container"
                onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => handleTouchEnd()}>

                <div className={`slide`} style={classes[0].style} >
                    <img src={data[indexes[0]].imgURL} className="slide-img" />
                </div>
                <div className={`slide`} style={classes[1].style} >
                    <img src={data[indexes[1]].imgURL} className="slide-img" />
                </div>
                <div className={`slide`} style={classes[2].style} >
                    <img src={data[indexes[2]].imgURL} className="slide-img" />
                </div>
            </div>
            <SliderDot data={data} onChange={setSliderDotIndex} sliderDotIndex={sliderDotIndex} />
        </div>
    )
}

export default Carousel