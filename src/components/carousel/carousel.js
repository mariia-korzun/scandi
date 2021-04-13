import React, { useState, useEffect } from 'react'

import Slide from '../slide'
import ChangeSlideButton from '../change-slide-button'
import SliderDot from '../slider-dot'
import './carousel.css'

const Carousel = ({ data, contentComponent }) => {
    let TRANSITION_TIME = 0.3//transition
    let SHORT_TRANSITION_TIME = 0.1//shortTransition
    let MAX_SWIPE_TIME = 500//maxSwipeTime
    let MAX_SHIFT = 100//maxShift
    let PREV_SLIDE = -1//prevSlide
    let CURRENT_SLIDE = 0//currentSlide
    let NEXT_SLIDE = 1//nextSlide

    const getNewStyles = (shift, time, direction, changeOpacity = false) => {
        const transition = time ? `left ${time}s linear` : 'none'
        return {
            prev: {
                left: `calc(-100% - ${shift}px)`,
                transition: transition,
                zIndex: direction ? 99 : '',
                opacity: direction ? 1 : changeOpacity ? 1 : 0
            },
            current: {
                left: `${-1 * shift}px`,
                transition: transition,
                zIndex: 99
            },
            next: {
                left: `calc(100% + ${-shift}px)`,
                transition: transition,
                zIndex: direction ? '' : 99,
                opacity: direction ? changeOpacity ? 1 : 0 : 1
            }
        }
    }

    const getNewIndexes = (newCurrentSlideIndex) => {
        return {
            prev: defineNextIndex(false, newCurrentSlideIndex, data),
            current: newCurrentSlideIndex,
            next: defineNextIndex(true, newCurrentSlideIndex, data)
        }
    }


    function getNewValuesArray(oldArray, values, dynamicKey) {
        return oldArray.map(item => {
            switch (item.position) {
                case PREV_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.prev
                    }
                }
                case CURRENT_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.current
                    }
                }
                case NEXT_SLIDE: {
                    return {
                        ...item,
                        [dynamicKey]: values.next
                    }
                }
            }
        })
    }

    function getNewClassesArray(classes, styles) {
        return getNewValuesArray(classes, styles, 'style')
    }

    function getNewIndexesArray(indexes, newIndexes) {
        return getNewValuesArray(indexes, newIndexes, 'index')
    }

    const [shift, setShift] = useState(0)
    const [firstTouch, setFirstTouch] = useState(null)


    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [sliderDotIndex, setSliderDotIndex] = useState(0)
    const [sliderDotEqualCurrentSlide, setSliderDotEqualCurrentSlide] = useState(false)
    const [changeSlide, setChangeSlide] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    let initialStyles = getNewStyles(0, TRANSITION_TIME, true)
    const [classes, setClasses] = useState([
        {
            position: PREV_SLIDE,//prev
            style: initialStyles.prev
        },
        {
            position: CURRENT_SLIDE,//current
            style: initialStyles.current
        },
        {
            position: NEXT_SLIDE,//next
            style: initialStyles.next
        }
    ])

    let initialIndexes = getNewIndexes(currentSlideIndex)
    const [indexes, setIndexes] = useState([
        {
            position: PREV_SLIDE,
            index: initialIndexes.prev
        },
        {
            position: CURRENT_SLIDE,
            index: initialIndexes.current
        },
        {
            position: NEXT_SLIDE,
            index: initialIndexes.next

        }
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
        if (currentSlideIndex === sliderDotIndex) { return }

        let direction = (sliderDotIndex - currentSlideIndex) > 0
        let newStyles = getNewStyles(0, SHORT_TRANSITION_TIME, direction)
        let newClasses = getNewClassesArray(classes, newStyles)
        setClasses(changeOrder(direction, newClasses))
        setDirection(direction)
        setTimeout(() => {
            setChangeSlide(true)
        }, SHORT_TRANSITION_TIME * 1000)
    }, [currentSlideIndex, sliderDotIndex])


    useEffect(() => {
        if (direction !== null && changeSlide === true) {
            let newCurrentSlideIndex = defineNextIndex(direction, currentSlideIndex, data)
            let newIndexes = getNewIndexes(newCurrentSlideIndex)
            let newIndexesArray = getNewIndexesArray(indexes, newIndexes)

            setCurrentSlideIndex(newCurrentSlideIndex)
            if (sliderDotEqualCurrentSlide) {
                setSliderDotIndex(newCurrentSlideIndex)
                setSliderDotEqualCurrentSlide(false)

            }
            setIndexes(changeOrder(direction, newIndexesArray))
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
        let newClasses = getNewClassesArray(classes, newStyles)
        setClasses(newClasses)
        setDirection(newDirection)
        setShift(newShift)

    }
    function handleTouchEnd() {
        if (direction === null) { return }
        let swipeTime = Date.now() - firstTouch.time

        if ((Math.abs(shift) > MAX_SHIFT || swipeTime < MAX_SWIPE_TIME)) {
            let newStyles = getNewStyles(0, TRANSITION_TIME, direction)
            let newClasses = getNewClassesArray(classes, newStyles)
            setDirection(direction)
            setSliderDotEqualCurrentSlide(true)
            setClasses(changeOrder(direction, newClasses))
            setChangeSlide(true)
        }
        else {
            let newStyles = getNewStyles(0, TRANSITION_TIME, direction, true)
            let newClasses = getNewClassesArray(classes, newStyles)
            setClasses(newClasses)
        }

    }

    let Content = contentComponent

    function initiateSlideChange({ changeDirection = false, direction = true, shift = 0, classes, updateDots = true,
        isChangeOrder = true, changeSlide = true, transition = TRANSITION_TIME, changeOpacity = false
    }) {
        if (changeDirection) {
            setDirection(direction)
        }
        let newStyles = getNewStyles(shift, transition, direction, changeOpacity)
        let newClasses = getNewClassesArray(classes, newStyles)
        setClasses(isChangeOrder ? changeOrder(direction, newClasses) : newClasses)

        if (updateDots) { setSliderDotEqualCurrentSlide(updateDots) }
        setChangeSlide(changeSlide)

    }

    return (
        <div className="carousel-container">
            <ChangeSlideButton
                isRight={false}
                disabled={isButtonDisabled}
                onClick={() => {
                    setDirection(false)
                    let newStyles = getNewStyles(0, TRANSITION_TIME, false)
                    let newClasses = getNewClassesArray(classes, newStyles)
                    setSliderDotEqualCurrentSlide(true)
                    setClasses(changeOrder(false, newClasses))
                    setIsButtonDisabled(true)
                    setChangeSlide(true)
                    setTimeout(() => {
                        setIsButtonDisabled(false)
                    }, TRANSITION_TIME * 1000)

                }} />
            <ChangeSlideButton
                isRight={true}
                disabled={isButtonDisabled}
                onClick={() => {
                    setDirection(true)
                    let newStyles = getNewStyles(0, TRANSITION_TIME, true)
                    let newClasses = getNewClassesArray(classes, newStyles)
                    setSliderDotEqualCurrentSlide(true)
                    setClasses(changeOrder(true, newClasses))
                    setIsButtonDisabled(true)
                    setChangeSlide(true)
                    setTimeout(() => {
                        setIsButtonDisabled(false)
                    }, TRANSITION_TIME * 1000)
                }} />

            <div className="carousel"
                onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => handleTouchEnd()}>

                <Slide style={classes[0].style} slideData={data[indexes[0].index]}>
                    <Content />
                </Slide>
                <Slide style={classes[1].style} slideData={data[indexes[1].index]}>
                    <Content />
                </Slide>
                <Slide style={classes[2].style} slideData={data[indexes[2].index]}>
                    <Content />
                </Slide>
            </div>
            <SliderDot data={data} onChange={setSliderDotIndex}
                currentSlideIndex={currentSlideIndex} />
        </div>
    )
}

export default Carousel